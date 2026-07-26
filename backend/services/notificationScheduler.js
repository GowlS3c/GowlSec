import prisma from "../lib/prisma.js";

const SIX_HOURS = 6 * 60 * 60 * 1000;
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
const NINETY_DAYS = 90 * 24 * 60 * 60 * 1000;
const MAX_EVENTS_PER_SYNC = 2;

let syncRunning = false;

function formatStart(value) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Paris",
  }).format(new Date(value));
}

async function fetchUpcomingCtfEvents() {
  const now = Date.now();
  const start = Math.floor(now / 1000);
  const finish = Math.floor((now + THIRTY_DAYS) / 1000);
  const url = `https://ctftime.org/api/v1/events/?limit=50&start=${start}&finish=${finish}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "User-Agent": "GowlSec/1.0 (contact: GowlSec@proton.me)",
      },
    });
    if (!response.ok) {
      throw new Error(`CTFtime a répondu avec le statut ${response.status}.`);
    }
    const payload = await response.json();
    return (Array.isArray(payload) ? payload : [])
      .filter((event) => event?.id && event?.title && event?.start)
      .sort((a, b) => new Date(a.start) - new Date(b.start))
      .slice(0, MAX_EVENTS_PER_SYNC);
  } finally {
    clearTimeout(timeout);
  }
}

export async function syncCtfNewsNotifications() {
  if (syncRunning) return;
  syncRunning = true;

  try {
    const [events, users] = await Promise.all([
      fetchUpcomingCtfEvents(),
      prisma.user.findMany({ select: { id: true } }),
    ]);

    for (const event of events) {
      const link = `/ctfnews?event=${event.id}`;
      const existing = await prisma.userNotification.findMany({
        where: { type: "ctf-new", link },
        select: { userId: true },
      });
      const notifiedIds = new Set(existing.map((item) => item.userId));
      const recipients = users.filter((user) => !notifiedIds.has(user.id));

      if (recipients.length > 0) {
        await prisma.userNotification.createMany({
          data: recipients.map((recipient) => ({
            userId: recipient.id,
            type: "ctf-new",
            title: "Nouveau CTF dans CTFNews",
            message: `${event.title} commence le ${formatStart(event.start)}.`,
            link,
          })),
        });
      }
    }

    await prisma.userNotification.deleteMany({
      where: {
        readAt: { not: null },
        createdAt: { lt: new Date(Date.now() - NINETY_DAYS) },
      },
    });
  } catch (error) {
    console.error("Synchronisation des notifications CTFNews impossible :", error);
  } finally {
    syncRunning = false;
  }
}

export function startNotificationScheduler() {
  const startupTimer = setTimeout(syncCtfNewsNotifications, 15_000);
  const interval = setInterval(syncCtfNewsNotifications, SIX_HOURS);
  startupTimer.unref?.();
  interval.unref?.();
  return () => {
    clearTimeout(startupTimer);
    clearInterval(interval);
  };
}
