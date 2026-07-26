import { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import {
  Shield,
  Trophy,
  MessageSquare,
  Lock,
  Send,
  Plus,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Unlock,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Flag,
  Award,
  Activity,
  Mail,
  LogOut,
  Newspaper,
  ExternalLink,
  Gauge,
  Bot,
  Sparkles,
  Pin,
  Ghost,
  Skull,
  Bug,
  Cat,
  Eye,
  EyeOff,
  Loader2,
  Lightbulb,
  FlaskConical,
  Wrench,
  BookOpen,
  Target,
  Rabbit,
  Cpu,
  Flame,
  Bird,
  Hash,
  Megaphone,
  User as UserIcon,
  Pencil,
  ShoppingCart,
  CreditCard,
  Users,
  Clock,
  Wifi,
  Circle,
  MessageCircle,
  Globe,
  KeyRound,
  Zap,
  TrendingUp,
  Radio,
  Crown,
  Search,
  Calendar,
  Compass,
  FileText,
  MapPin,
  Terminal,
  Smile,
  Camera,
  Pipette,
} from "lucide-react";

function XIcon({ size = 16, style, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={style}
    >
      <path
        d="M4 4l16 16M20 4L4 20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
import {
  forgotPassword,
  resetPassword,
  resendVerification,
  verifyEmail,
  login,
  saveSession,
} from "./api/auth";
import ProtectedTab from "./components/ProtectedTab";
import { useAuth } from "./context/AuthContext";
import Register from "./pages/Register";
import { io } from "socket.io-client";
import owlLogoImg from "./assets/owl-logo.png";
import TrustHighlights from "./TrustHighlights";

function GitHubIcon({ size = 16, style, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      style={style}
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.21c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.21C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function CyberTrophyIcon({ size = 18, style, color = C?.gold || "#FFD166" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      style={style}
      aria-hidden
    >
      <path
        d="M9 5h14v5.2c0 5.2-2.9 9.1-7 10.3-4.1-1.2-7-5.1-7-10.3V5Z"
        fill={color}
        fillOpacity="0.2"
        stroke={color}
        strokeWidth="1.8"
      />
      <path
        d="M9 8H5.5v2.4c0 3.4 2.2 5.6 5.4 5.9M23 8h3.5v2.4c0 3.4-2.2 5.6-5.4 5.9"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M16 20.5V25M11.5 28h9M13 25h6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="m16 8.1 1.05 2.15 2.37.34-1.71 1.67.4 2.36L16 13.5l-2.11 1.12.4-2.36-1.71-1.67 2.37-.34L16 8.1Z"
        fill={color}
      />
      <path
        d="M8 3.2h16"
        stroke="#FFF3C4"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:8080", {
  withCredentials: true,
  autoConnect: false,
});

function normalizeHubMessage(message) {
  return {
    id: message.id,
    room: message.room || "general",
    author: message.user?.username || "Utilisateur",
    text: message.content || "",
    createdAt: message.createdAt,
    reactions: message.reactions || {},
  };
}

const COMMUNITY_API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:8080"
).replace(/\/$/, "");

async function communityRequest(path = "", options = {}) {
  const token = localStorage.getItem("gowlsec_token");
  const response = await fetch(`${COMMUNITY_API_URL}/api/community${path}`, {
    method: options.method || "GET",
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(
      data?.message || "Erreur de communication avec le serveur.",
    );
    error.status = response.status;
    error.retryAfterSeconds = Number(data?.retryAfterSeconds || 0);
    error.data = data;
    throw error;
  }

  return data;
}

function MentionedText({ text }) {
  return String(text || "")
    .split(/(@[A-Za-z0-9_-]{2,30})/g)
    .map((part, index) =>
      part.startsWith("@") ? (
        <span
          key={`${part}-${index}`}
          style={{
            color: C.primary,
            background: `${C.primary}18`,
            borderRadius: 4,
            padding: "0 3px",
            fontWeight: 700,
          }}
        >
          {part}
        </span>
      ) : (
        part
      ),
    );
}

const PROFILE_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const PROFILE_IMAGE_MAX_SIZE = 5 * 1024 * 1024;
const PROFILE_STATUSES = [
  { key: "available", label: "Disponible pour un CTF", color: "#2ED9A3" },
  { key: "learning", label: "En apprentissage", color: "#5B6EF5" },
  { key: "looking-team", label: "Recherche une équipe", color: "#FF9F43" },
];
const PROFILE_SPECIALTIES = [
  "Web",
  "Réseau",
  "Linux",
  "Active Directory",
  "OSINT",
  "Forensics",
  "Crypto",
  "Pwn",
];
const PROFILE_BADGE_KEYS = [
  { key: "founder", label: "Fondateur" },
  { key: "first-ctf", label: "Premier CTF" },
  { key: "mentor", label: "Mentor" },
  { key: "web-hacker", label: "Web Hacker" },
  { key: "network", label: "Réseau" },
  { key: "top-10", label: "Top 10" },
];
const CUSTOM_ROLES = ["", "Mentor", "Organisateur CTF", "Modérateur"];

function resolveProfileImageUrl(value) {
  if (!value) return "";
  if (/^(https?:|data:|blob:)/i.test(value)) return value;
  return `${COMMUNITY_API_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

async function updateProfileRequest(formData) {
  const token = localStorage.getItem("gowlsec_token");
  const response = await fetch(`${COMMUNITY_API_URL}/api/users/me`, {
    method: "PATCH",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
    body: formData,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message || "Impossible d’enregistrer les modifications du profil.",
    );
  }

  return data?.user || data?.profile || data;
}

const API_GET_CACHE = new Map();
const API_GET_INFLIGHT = new Map();

async function apiRequest(path, options = {}) {
  const method = String(options.method || "GET").toUpperCase();
  const token = localStorage.getItem("gowlsec_token");
  const cacheMs =
    method === "GET" ? Math.max(0, Number(options.cacheMs ?? 5000)) : 0;
  const cacheKey = `${token || "guest"}:${path}`;
  const cached = API_GET_CACHE.get(cacheKey);

  if (cacheMs > 0 && cached && Date.now() - cached.savedAt < cacheMs) {
    return cached.data;
  }
  if (method === "GET" && API_GET_INFLIGHT.has(cacheKey)) {
    return API_GET_INFLIGHT.get(cacheKey);
  }

  const execute = async () => {
    const response = await fetch(`${COMMUNITY_API_URL}${path}`, {
      method,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      const error = new Error(data?.message || "La requête a échoué.");
      const retryHeader = Number(response.headers.get("retry-after") || 0);
      error.status = response.status;
      error.retryAfterSeconds = Number(
        data?.retryAfterSeconds || retryHeader || 0,
      );
      throw error;
    }

    if (method === "GET" && cacheMs > 0) {
      API_GET_CACHE.set(cacheKey, { data, savedAt: Date.now() });
    } else if (method !== "GET") {
      API_GET_CACHE.clear();
    }
    return data;
  };

  if (method !== "GET") return execute();

  const request = execute();
  API_GET_INFLIGHT.set(cacheKey, request);
  try {
    return await request;
  } finally {
    API_GET_INFLIGHT.delete(cacheKey);
  }
}

function formatAnnouncementForNews(announcement) {
  return {
    id: `announcement-${announcement.id}`,
    announcementId: announcement.id,
    ref: `ANN-${String(announcement.id).padStart(4, "0")}`,
    category: announcement.category || "announcement",
    title: announcement.title,
    summary: announcement.content,
    source:
      announcement.author?.username || announcement.author || "Équipe GowlSec",
    url: announcement.link || "",
    date: announcement.publishedAt || announcement.createdAt,
    backendAnnouncement: true,
  };
}

const SEED_NEWS = [
  {
    id: 1,
    title: "GowlSec est en ligne",
    summary:
      "La plateforme communautaire de cybersécurité GowlSec ouvre officiellement ses portes.",
    category: "update",
    source: "Équipe GowlSec",
    date: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Bienvenue à toute la communauté",
    summary:
      "Forum, labs, teams, classement, trophées et bien plus : explore les salons pour progresser ensemble.",
    category: "announcement",
    source: "Équipe GowlSec",
    date: new Date().toISOString(),
  },
];

const C = {
  bg: "#000000",
  panel: "#111B27",
  panel2: "#192536",
  line: "#2A3A4D",
  text: "#F2F6FA",
  muted: "#9EACBD",
  primary: "#5B6EF5",
  alert: "#FF4D5E",
  warn: "#FF9F43",
  ok: "#2ED9A3",
  gold: "#FFD166",
  discord: "#5865F2",
};

const DISPLAY_FONT = "'Sora', sans-serif";
const BODY_FONT = "'Source Sans 3', sans-serif";
const MONO_FONT = "'IBM Plex Mono', monospace";

/* ---------------------------------------------------------------------
   Fond animé — ciel étoilé avec étoiles filantes occasionnelles.
   Canvas plein écran, fixé derrière tout le contenu, non interactif,
   respecte prefers-reduced-motion.
--------------------------------------------------------------------- */
function ShootingStarsBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars = [];
    let meteors = [];
    let raf = null;
    let t = 0;

    function resize() {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(
        60,
        Math.min(160, Math.round((width * height) / 9000)),
      );
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.1 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.25,
        speed: Math.random() * 1.6 + 0.6,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function spawnMeteor() {
      const fromTop = Math.random() < 0.6;
      const x = fromTop ? Math.random() * width : -40;
      const y = fromTop ? -40 : Math.random() * height * 0.5;
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.35; // ~45° en diagonale
      const speed = Math.random() * 5 + 7;
      meteors.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: Math.random() * 70 + 90,
        life: 0,
        maxLife: 70 + Math.random() * 30,
        c: Math.random() < 0.5 ? C.primary : C.gold,
      });
    }

    function draw(animate, dt) {
      ctx.clearRect(0, 0, width, height);

      // étoiles scintillantes
      for (const s of stars) {
        const tw = animate
          ? Math.sin(t * s.speed * 0.02 + s.phase) * 0.35 + 0.65
          : 1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `#ffffff${Math.round(s.baseAlpha * tw * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.fill();
      }

      // étoiles filantes
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        if (animate) {
          m.x += m.vx;
          m.y += m.vy;
          m.life += 1;
        }
        const progress = m.life / m.maxLife;
        const fade =
          progress < 0.15
            ? progress / 0.15
            : 1 - Math.max(0, (progress - 0.6) / 0.4);
        const tailX = m.x - m.vx * (m.len / Math.hypot(m.vx, m.vy));
        const tailY = m.y - m.vy * (m.len / Math.hypot(m.vx, m.vy));
        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(
          0,
          `${m.c}${Math.round(Math.max(0, Math.min(1, fade)) * 255)
            .toString(16)
            .padStart(2, "0")}`,
        );
        grad.addColorStop(1, `${m.c}00`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        // tête lumineuse
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `#ffffff${Math.round(
          Math.max(0, Math.min(1, fade)) * 255,
        )
          .toString(16)
          .padStart(2, "0")}`;
        ctx.fill();

        if (m.life > m.maxLife || m.x > width + 80 || m.y > height + 80) {
          meteors.splice(i, 1);
        }
      }
    }

    function loop() {
      t += 1;
      if (meteors.length < 3 && Math.random() < 0.012) spawnMeteor();
      draw(true);
      raf = requestAnimationFrame(loop);
    }

    resize();
    if (reduceMotion) {
      draw(false);
    } else {
      raf = requestAnimationFrame(loop);
    }

    function onResize() {
      resize();
      draw(false);
    }
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="gowl-bg-network" />;
}

const QUESTION_TYPES = [
  { key: "urgent", label: "Urgent avant examen", color: C.alert },
  { key: "accompagnement", label: "Besoin d'accompagnement", color: C.warn },
  { key: "blocage", label: "Blocage technique", color: C.primary },
  { key: "question", label: "Question rapide", color: C.ok },
];

const DIFFICULTIES = [
  { key: "facile", label: "Facile", color: C.ok },
  { key: "moyen", label: "Moyen", color: C.primary },
  { key: "difficile", label: "Difficile", color: C.warn },
  { key: "insane", label: "Insane", color: C.alert },
];

const NEWS_CATEGORIES = [
  { key: "update", label: "Mise à jour", color: C.primary, icon: RefreshCw },
  { key: "announcement", label: "Annonce", color: C.gold, icon: Megaphone },
  { key: "congrats", label: "Félicitations", color: C.ok, icon: Award },
  { key: "event", label: "Événement", color: C.alert, icon: Calendar },
];

const PLATFORMS = [
  "TryHackMe",
  "Root-Me",
  "Hack The Box",
  "Offsec",
  "PentesterLab",
  "PortSwigger",
  "CyberDefenders",
  "CTFTime",
  "Autre",
];

const PLATFORM_BADGES = {
  TryHackMe: { initials: "THM", color: "#FF3B3B" },
  "Root-Me": { initials: "RM", color: "#1A1A1A" },
  "Hack The Box": { initials: "HTB", color: "#9FEF00" },
  Offsec: { initials: "OSCP", color: "#E4141B" },
  PentesterLab: { initials: "PL", color: "#5B6EF5" },
  PortSwigger: { initials: "PS", color: "#FF6633" },
  CyberDefenders: { initials: "CD", color: "#3AA0FF" },
  CTFTime: { initials: "CTF", color: "#FFD166" },
  Autre: { initials: "GS", color: "#8A93A3" },
};
function getPlatformBadge(platform) {
  return PLATFORM_BADGES[platform] || PLATFORM_BADGES["Autre"];
}

const LAB_PLATFORMS = [
  { key: "htb", label: "Hack The Box" },
  { key: "thm", label: "TryHackMe" },
  { key: "rootme", label: "Root-Me" },
  { key: "autre", label: "Autre" },
];

const TEAM_MAX_MEMBERS = 16;
const LAB_MAX_MEMBERS = 8;

const ROOM_ICONS = [
  { key: "web", icon: Globe, label: "Web", color: "#3AA0FF" },
  { key: "hash", icon: Hash, label: "Discussion", color: "#5B6EF5" },
  { key: "ctf", icon: Flag, label: "CTF", color: "#FFD166" },
  { key: "security", icon: Shield, label: "Sécurité", color: "#FF4D5E" },
  { key: "bug", icon: Bug, label: "Bug / Reverse", color: "#2ED9A3" },
  { key: "network", icon: Wifi, label: "Réseau", color: "#818CF8" },
  { key: "system", icon: Cpu, label: "Système", color: "#FF9F43" },
  { key: "radio", icon: Radio, label: "Live", color: "#FF6FB0" },
  { key: "flame", icon: Flame, label: "Détente", color: "#FB923C" },
  { key: "ghost", icon: Ghost, label: "Anonymat", color: "#A78BFA" },
];
function getRoomIcon(key) {
  return ROOM_ICONS.find((i) => i.key === key) || ROOM_ICONS[1];
}

const DEFAULT_ROOMS = [
  {
    key: "general",
    label: "Général",
    desc: "Discussion libre de la communauté",
    isPublic: true,
    icon: "web",
  },
  {
    key: "updates",
    label: "Updates",
    desc: "Nouveautés, correctifs et annonces officielles de GowlSec",
    isPublic: true,
    icon: "radio",
    owner: "system",
    adminOnly: true,
    official: true,
  },
];

function isRetiredHubRoom(room) {
  const key = String(room?.key || "").trim().toLowerCase();
  const label = String(room?.label || "").trim().toLowerCase();
  return key === "cfd" || label === "cfd";
}

const EMPTY_PLATFORM_ACCOUNTS = {
  hackTheBox: "",
  rootMe: "",
  tryHackMe: "",
  otherName: "",
  otherUrl: "",
};

function getPlatformProfileUrl(platform, value) {
  const clean = String(value || "").trim();
  if (!clean) return "";
  if (/^https?:\/\//i.test(clean)) return clean;
  if (platform === "hackTheBox")
    return `https://app.hackthebox.com/profile/${encodeURIComponent(clean)}`;
  if (platform === "rootMe")
    return `https://www.root-me.org/${encodeURIComponent(clean)}`;
  if (platform === "tryHackMe")
    return `https://tryhackme.com/p/${encodeURIComponent(clean)}`;
  return "";
}

const AVATAR_OPTIONS = [
  { key: "bird", icon: Bird, color: "#1F2937" },
  { key: "ghost", icon: Ghost, color: "#5B6EF5" },
  { key: "skull", icon: Skull, color: "#FF4D5E" },
  { key: "bug", icon: Bug, color: "#2ED9A3" },
  { key: "cat", icon: Cat, color: "#FF9F43" },
  { key: "cpu", icon: Cpu, color: "#58A6FF" },
  { key: "rabbit", icon: Rabbit, color: "#F477B7" },
  { key: "flame", icon: Flame, color: "#FFD166" },
];
const AVATAR_MAP = Object.fromEntries(AVATAR_OPTIONS.map((a) => [a.key, a]));

const BANNER_OPTIONS = [
  { key: "indigo", css: "linear-gradient(135deg,#5B6EF5,#1F2A6B)" },
  { key: "crimson", css: "linear-gradient(135deg,#FF4D5E,#4A0E17)" },
  { key: "forest", css: "linear-gradient(135deg,#2ED9A3,#0B3B2E)" },
  { key: "sunset", css: "linear-gradient(135deg,#FF9F43,#5C2400)" },
  { key: "night", css: "linear-gradient(135deg,#3A4256,#05060A)" },
];
const BANNER_MAP = Object.fromEntries(
  BANNER_OPTIONS.map((b) => [b.key, b.css]),
);

const TEAM_EMOJIS = [
  "🛡️",
  "🦉",
  "🐺",
  "🦅",
  "🐉",
  "🔥",
  "⚡",
  "🎯",
  "💀",
  "🧠",
  "🕸️",
  "🐍",
  "👾",
  "🔐",
  "🚀",
  "🎮",
];

const SHOP_PRODUCTS = [
  {
    id: "Vip-cyber",
    icon: Crown,
    title: "Pack VIP",
    tagline:
      "Rejoignez l'espace VIP de la communauté et profitez d'avantages exclusifs réservés aux membres..",
    features: [
      "Accès au salon de discussion privé réservé aux membres VIP",
      "Badge VIP exclusif affiché sur votre profil",
      "Photo de profil animée",
      "Bannière de profil personnalisée",
      "Pack d'émojis et gif exclusifs utilisables sur le site",
      "Icône VIP exclusive",
    ],
    format:
      "Icône de membre fondateur, disponible uniquement durant la première année",
    price: 9.99,
  },
  {
    id: "init-cyber",
    icon: Shield,
    title: "Initiation Cybersécurité",
    tagline: "Pack Découverte.",
    features: [
      "Vocabulaire et fondamentaux du hacking éthique",
      "Les bases de la cybersécurité",
      "Maîtrisez Linux",
      "Installation et prise en main d'un environnement Parrot OS ou Kali Linux en dual boot.",
      "Accès au salon Discord dédié aux membres",
    ],
    format:
      "Les coachings se déroulent à distance via Discord, TeamSpeak ou Telegram, avec partage d'écran si nécessaire pour un accompagnement pratique et interactif. Durée : 1 semaine – créneaux à définir ensemble selon vos disponibilités.",
    price: 29.99,
  },
];

const EVENT_TYPES = [
  { key: "ctf", label: "CTF", color: C.alert },
  { key: "coaching", label: "Coaching boutique", color: C.gold },
  { key: "discord", label: "Live Discord", color: C.discord },
  { key: "autre", label: "Autre", color: C.primary },
];

const LEARNING_PATHS = [
  {
    key: "fondations",
    title: "Prise en main de GowlSec",
    accent: C.primary,
    level: "Débutant",
    duration: "Premiers objectifs",
    objective:
      "Construire un profil crédible, découvrir l’entraide et commencer à contribuer réellement.",
    challenge:
      "Toutes les étapes sont validées automatiquement à partir de tes actions sur GowlSec.",
    skills: ["Profil", "Hub", "Questions", "Entraide"],
    steps: [
      {
        id: "f1",
        label: "Construire un profil complet",
        desc: "Bio de 80 caractères, 3 spécialités et au moins un réseau renseigné.",
        tab: "profil",
        duration: "Profil",
        xp: 40,
        metric: "profileComplete",
        target: 1,
      },
      {
        id: "f2",
        label: "Créer une streak de 3 jours",
        desc: "Reviens et reste actif trois jours consécutifs.",
        tab: "profil",
        duration: "3 jours",
        xp: 60,
        metric: "currentStreak",
        target: 3,
      },
      {
        id: "f3",
        label: "Participer au Hub",
        desc: "Publie 5 messages utiles dans les salons communautaires.",
        tab: "salons",
        duration: "5 messages",
        xp: 50,
        metric: "hubMessages",
        target: 5,
      },
      {
        id: "f4",
        label: "Poser une première question",
        desc: "Explique ton contexte, tes essais et ton blocage.",
        tab: "forum",
        duration: "1 question",
        xp: 70,
        metric: "questions",
        target: 1,
      },
      {
        id: "f5",
        label: "Aider deux membres",
        desc: "Publie 2 réponses constructives dans la section Questions.",
        tab: "forum",
        duration: "2 réponses",
        xp: 90,
        metric: "answers",
        target: 2,
      },
    ],
  },
  {
    key: "web",
    title: "Membre actif",
    accent: C.ok,
    level: "Régulier",
    duration: "Plusieurs semaines",
    objective:
      "Devenir un membre identifiable, utile et fiable dans les échanges communautaires.",
    challenge:
      "La quantité seule ne suffit pas : les recommandations reçues récompensent aussi la qualité.",
    skills: ["Communication", "Mentorat", "Réseau", "Confiance"],
    steps: [
      {
        id: "w1",
        label: "Faire vivre les salons",
        desc: "Atteins 25 messages publiés sur le Hub.",
        tab: "salons",
        duration: "25 messages",
        xp: 100,
        metric: "hubMessages",
        target: 25,
      },
      {
        id: "w2",
        label: "Répondre régulièrement",
        desc: "Apporte 10 réponses aux questions de la communauté.",
        tab: "forum",
        duration: "10 réponses",
        xp: 140,
        metric: "answers",
        target: 10,
      },
      {
        id: "w3",
        label: "Recommander deux membres",
        desc: "Remercie un mentor ou confirme une compétence avec sincérité.",
        tab: "profil",
        duration: "2 recommandations",
        xp: 120,
        metric: "recommendationsWritten",
        target: 2,
      },
      {
        id: "w4",
        label: "Créer des échanges privés",
        desc: "Envoie 5 messages privés utiles à d’autres membres.",
        tab: "messages",
        duration: "5 messages",
        xp: 100,
        metric: "directMessages",
        target: 5,
      },
      {
        id: "w5",
        label: "Gagner la confiance",
        desc: "Reçois 2 recommandations de membres différents.",
        tab: "profil",
        duration: "2 recommandations",
        xp: 180,
        metric: "recommendationsReceived",
        target: 2,
      },
    ],
  },
  {
    key: "infra",
    title: "Pratique en labs",
    accent: C.alert,
    level: "Intermédiaire",
    duration: "Progression pratique",
    objective:
      "Transformer l’apprentissage en preuves concrètes grâce aux labs, trophées et write-ups.",
    challenge:
      "Travaille uniquement sur des environnements légaux et documente ce que tu apprends.",
    skills: ["Labs", "Méthodologie", "Compte rendu", "Preuves"],
    steps: [
      {
        id: "i1",
        label: "Rejoindre un lab",
        desc: "Crée ou rejoins une première session de lab GowlSec.",
        tab: "labs",
        duration: "1 participation",
        xp: 120,
        metric: "labParticipations",
        target: 1,
      },
      {
        id: "i2",
        label: "Collaborer dans les labs",
        desc: "Publie 10 messages dans les discussions de lab.",
        tab: "labs",
        duration: "10 messages",
        xp: 140,
        metric: "labMessages",
        target: 10,
      },
      {
        id: "i3",
        label: "Organiser une session",
        desc: "Crée ton propre salon lab avec un objectif précis.",
        tab: "labs",
        duration: "1 lab créé",
        xp: 180,
        metric: "labsOwned",
        target: 1,
      },
      {
        id: "i4",
        label: "Accumuler des preuves",
        desc: "Ajoute 2 trophées ou réussites vérifiables à ton profil.",
        tab: "trophies",
        duration: "2 trophées",
        xp: 220,
        metric: "trophies",
        target: 2,
      },
      {
        id: "i5",
        label: "Partager un write-up",
        desc: "Publie une résolution claire, légale et reproductible.",
        tab: "writeups",
        duration: "1 write-up",
        xp: 260,
        metric: "writeups",
        target: 1,
      },
    ],
  },
  {
    key: "team",
    title: "Compétiteur CTF",
    accent: C.warn,
    level: "Confirmé",
    duration: "Plusieurs compétitions",
    objective:
      "Trouver une équipe stable, participer à plusieurs CTF et transmettre les enseignements.",
    challenge:
      "Une inscription ne suffit pas : ce module demande de la régularité et des comptes rendus.",
    skills: ["Matchmaking", "Équipe", "CTF", "Débrief"],
    steps: [
      {
        id: "t1",
        label: "Publier ton CV CTF",
        desc: "Indique tes spécialités, disponibilités et compétences recherchées.",
        tab: "coequipiers",
        duration: "CV actif",
        xp: 140,
        metric: "teamFinderProfile",
        target: 1,
      },
      {
        id: "t2",
        label: "Rejoindre une équipe",
        desc: "Crée ou rejoins une team GowlSec.",
        tab: "equipes",
        duration: "1 équipe",
        xp: 180,
        metric: "teamParticipations",
        target: 1,
      },
      {
        id: "t3",
        label: "Participer à 3 CTF",
        desc: "Inscris-toi depuis CTFNews et joue réellement avec la communauté.",
        tab: "actus",
        duration: "3 CTF",
        xp: 260,
        metric: "ctfRegistrations",
        target: 3,
      },
      {
        id: "t4",
        label: "Devenir un habitué",
        desc: "Atteins 7 participations CTF enregistrées.",
        tab: "actus",
        duration: "7 CTF",
        xp: 360,
        metric: "ctfRegistrations",
        target: 7,
      },
      {
        id: "t5",
        label: "Transmettre les méthodes",
        desc: "Publie 3 write-ups issus de tes entraînements ou compétitions.",
        tab: "writeups",
        duration: "3 write-ups",
        xp: 420,
        metric: "writeups",
        target: 3,
      },
    ],
  },
  {
    key: "certif",
    title: "Référence GowlSec",
    accent: C.gold,
    level: "Expert",
    duration: "Objectif long terme",
    objective:
      "Prouver une contribution durable et devenir une personne de confiance pour la communauté.",
    challenge:
      "Ce rang est volontairement difficile : il récompense la constance, pas le spam.",
    skills: ["Mentorat", "Régularité", "Expertise", "Réputation"],
    steps: [
      {
        id: "c1",
        label: "Devenir mentor actif",
        desc: "Publie 30 réponses utiles dans la section Questions.",
        tab: "forum",
        duration: "30 réponses",
        xp: 500,
        metric: "answers",
        target: 30,
      },
      {
        id: "c2",
        label: "Animer durablement le Hub",
        desc: "Atteins 150 messages publiés sans enfreindre les règles.",
        tab: "salons",
        duration: "150 messages",
        xp: 600,
        metric: "hubMessages",
        target: 150,
      },
      {
        id: "c3",
        label: "Construire un vrai portfolio",
        desc: "Publie 8 write-ups complets et pédagogiques.",
        tab: "writeups",
        duration: "8 write-ups",
        xp: 750,
        metric: "writeups",
        target: 8,
      },
      {
        id: "c4",
        label: "Tenir une streak majeure",
        desc: "Atteins une meilleure streak de 30 jours.",
        tab: "profil",
        duration: "30 jours",
        xp: 850,
        metric: "longestStreak",
        target: 30,
      },
      {
        id: "c5",
        label: "Collectionner les distinctions",
        desc: "Débloque au moins 4 badges officiels GowlSec.",
        tab: "profil",
        duration: "4 badges",
        xp: 1000,
        metric: "badges",
        target: 4,
      },
    ],
  },
];

const SUPPORT_CATEGORIES = [
  { key: "question", label: "Question", color: C.primary, icon: MessageCircle },
  { key: "boutique", label: "Boutique", color: C.gold, icon: ShoppingCart },
  {
    key: "probleme",
    label: "Problème technique",
    color: C.alert,
    icon: AlertTriangle,
  },
  { key: "autre", label: "Autre", color: C.ok, icon: Mail },
];

const SUPPORT_STATUS = {
  open: { label: "Ouvert", color: C.warn },
  in_progress: { label: "En cours", color: C.primary },
  resolved: { label: "Résolu", color: C.ok },
};

const SUPPORT_FAQ = [
  {
    q: "Comment rejoindre une team ou un salon lab ?",
    a: "Rends-toi dans l'onglet Team ou Labs, puis clique sur « Rejoindre » sur la carte de ton choix. Certains salons sont privés et nécessitent une invitation du créateur.",
  },
  {
    q: "J'ai un souci avec ma commande boutique",
    a: "Choisis la catégorie « Boutique » ci-dessous et indique ton numéro de commande si tu l'as : ça accélère grandement le traitement.",
  },
  {
    q: "Comment gagner des points de classement ?",
    a: "Les points s'obtiennent en validant des labs, en répondant aux questions du forum et en participant aux événements listés dans l'onglet Événements.",
  },
  {
    q: "Je n'arrive pas à me connecter",
    a: "Vérifie ton adresse e-mail et ton mot de passe, ou utilise « Mot de passe oublié » sur la fenêtre de connexion. Si le souci persiste, ouvre un ticket en catégorie « Problème technique ».",
  },
];

// Le statut admin doit être déterminé par le backend (ex: profile.role === "admin"),
// jamais par un e-mail ou un mot de passe codé en dur dans le bundle JS client :
// n'importe qui peut l'extraire depuis l'inspecteur du navigateur.

const ONLINE_WINDOW_MS = 2 * 60 * 1000;

/* ---------------------------------------------------------------------
   Internationalisation — sélection de langue à l'entrée du site
--------------------------------------------------------------------- */
const LANGUAGES = [
  { key: "fr", label: "Français", short: "FR" },
  { key: "en", label: "English", short: "EN" },
  { key: "ru", label: "Русский", short: "RU" },
  { key: "zh", label: "中文", short: "中文" },
];

const I18N = {
  fr: {
    chooseLangTitle: "Choisis ta langue",
    chooseLangSub:
      "La communauté GowlSec parle plusieurs langues — sélectionne la tienne pour continuer.",
    chooseLangCta: "Continuer",
    tagline: "Pentest · CTF · Cybersécurité",
    tabs: {
      accueil: "Accueil",
      actus: "CTFNews",
      forum: "Question",
      salons: "Hub",
      equipes: "Team",
      labs: "Labs",
      classement: "Classement",
      trophies: "Trophées",
      writeups: "Write-ups",
      evenements: "Événements",
      parcours: "Parcours",
      boutique: "Boutique",
      assistant: "Assistant IA",
      support: "Support",
    },
    live: "en ligne",
    admin: "Admin",
    heroTitle1: "Communauté francophone ",
    heroTitle2: "pentest, CTF, réseau et cybersécurité",
    heroSub:
      "Ici, on apprend, on échange et on progresse ensemble autour du pentest, des CTF, du réseau et de la cybersécurité — que tu sois débutant ou confirmé.",
    membersJoined: "membres inscrits",
    joinFirst: "Rejoins les tout premiers membres",
    peerHelp: "entraide entre pairs, pas de cours magistral",
    ctaAsk: "Poser une question",
    ctaHub: "Rejoindre le Hub",
    quickStartTitle: "Démarrage rapide",
    quickStartSubtitle:
      "Trois actions simples pour entrer dans la communauté et avancer plus vite.",
    quickStartForumTitle: "Poser une question",
    quickStartForumDesc:
      "Partage ton blocage et fais remonter ton besoin en quelques secondes.",
    quickStartHubTitle: "Rejoindre le Hub",
    quickStartHubDesc:
      "Échange en direct sur un sujet précis avec la communauté GowlSec.",
    quickStartTeamTitle: "Créer une team",
    quickStartTeamDesc:
      "Forme une escouade pour un CTF, un lab ou une préparation d’examen.",
    statNews: "actus",
    statQuestions: "questions",
    statTrophies: "trophées",
    statTeams: "teams",
    statLabs: "labs",
    activityTitle: "Ça bouge en ce moment",
    activityEmpty: "La communauté démarre — sois le premier à agir.",
    scanLabel: "Terminal de démonstration — usage pédagogique",
    watchAll: "Voir CTFNews",
    trending: "Ça circule en ce moment",
    live2: "EN DIRECT",
    watching: "veille active",
    footer: "GowlSec — communauté pentest & CTF · à but pédagogique",
    forumTitle: "Question",
    forumSub: "Pose une question ou demande un accompagnement.",
    forumHeroEyebrow: "Nouvelle question",
    forumHeroTitle: "Débloque-toi en quelques minutes",
    forumHeroSub:
      "Décris ton contexte et ce que tu as déjà essayé : la communauté et les mentors répondent en direct, pas de question trop bête.",
    newQuestion: "Nouvelle question",
    cancel: "Annuler",
    publish: "Publier",
    hubTitle: "Hub",
    hubSub: "Entraide en direct, par thème.",
    hubHeroEyebrow: "Le Hub",
    hubHeroTitle: "Discute en direct, par thème",
    hubHeroSub:
      "Choisis un salon pour rejoindre la conversation en cours — chacun a sa propre ambiance et son propre sujet.",
    teamTitle: "Team",
    teamSub:
      "Crée ta team (16 membres max), publique ou privée : recrute et publie tes annonces.",
    teamHeroEyebrow: "Nouvelle team",
    teamHeroTitle: "Monte ton escouade de hackers",
    teamHeroSub:
      "Choisis un nom, un logo, jusqu'à 16 membres. Publique pour recruter en ouvert, privée pour rester entre vous.",
    newTeam: "Créer une équipe",
    labsTitle: "Labs",
    labsSub:
      "Crée ou rejoins un salon pour avancer ensemble sur un lab HTB, TryHackMe, Root-Me... (8 personnes max)",
    labsHeroEyebrow: "Nouveau salon lab",
    labsHeroTitle: "Ouvre une session de lab protégée",
    labsHeroSub:
      "Réunis jusqu'à 8 personnes autour d'un même lab HTB, TryHackMe ou Root-Me, avec son propre fil de discussion.",
    newLab: "Créer un lab",
    cardForumDesc: "Pose une question sur ton pentest.",
    cardHubDesc: "Discute en direct par thème avec la communauté.",
    cardTeamDesc: "Crée ou rejoins une team (16 max), publique ou privée.",
    cardLabsDesc:
      "Rejoins un salon pour avancer à plusieurs sur un lab (8 max).",
    cardClassementDesc: "Qui cumule le plus de points sur GowlSec.",
    cardBoutiqueDesc: "Des formations pour bien démarrer, dès 29€.",
    cardAssistantDesc: "Un coup de main immédiat en cas de blocage.",
  },
  en: {
    chooseLangTitle: "Choose your language",
    chooseLangSub:
      "The GowlSec community speaks several languages — pick yours to continue.",
    chooseLangCta: "Continue",
    tagline: "",
    tabs: {
      accueil: "Home",
      actus: "CTFNews",
      forum: "Question",
      salons: "Hub",
      equipes: "Team",
      labs: "Labs",
      classement: "Leaderboard",
      trophies: "Trophies",
      boutique: "Shop",
      assistant: "AI Assistant",
      support: "Support",
      admin: "Admin",
    },
    live: "online",
    admin: "Admin",
    heroTitle1: "The pentest & CTF community ",
    heroTitle2: "that never sleeps",
    heroSub:
      "Here, you don't learn alone. Ask a question at 2am, find a team for a CTF, tackle a lab together, or get unblocked live on the Hub — the community answers.",
    membersJoined: "registered members",
    joinFirst: "Join the very first members",
    peerHelp: "peer-to-peer help, not a lecture",
    ctaAsk: "Ask a question",
    ctaHub: "Join the Hub",
    quickStartTitle: "Quick start",
    quickStartSubtitle:
      "Three simple actions to jump into the community and move faster.",
    quickStartForumTitle: "Ask a question",
    quickStartForumDesc:
      "Share your blocker and surface your need in a few seconds.",
    quickStartHubTitle: "Join the Hub",
    quickStartHubDesc:
      "Talk live about a specific topic with the GowlSec ecosystem.",
    quickStartTeamTitle: "Create a team",
    quickStartTeamDesc: "Form a squad for a CTF, a lab, or exam prep.",
    statNews: "news",
    statQuestions: "questions",
    statTrophies: "trophies",
    statTeams: "teams",
    statLabs: "labs",
    activityTitle: "Happening right now",
    activityEmpty:
      "The community is just getting started — be the first to act.",
    scanLabel: "crow scanning the database",
    watchAll: "See all news",
    trending: "Trending now",
    live2: "LIVE",
    watching: "active watch",
    footer: "GowlSec — pentest & CTF community · for learning purposes",
    forumTitle: "Question",
    forumSub: "Ask a question or request guidance.",
    forumHeroEyebrow: "New question",
    forumHeroTitle: "Get unblocked in minutes",
    forumHeroSub:
      "Describe your context and what you've already tried: the community and mentors answer live — no question is too silly.",
    newQuestion: "New question",
    cancel: "Cancel",
    publish: "Publish",
    hubTitle: "Hub",
    hubSub: "Live peer support, by topic.",
    hubHeroEyebrow: "The Hub",
    hubHeroTitle: "Chat live, by topic",
    hubHeroSub:
      "Pick a room to join the ongoing conversation — each one has its own vibe and subject.",
    teamTitle: "Team",
    teamSub:
      "Create your team (16 members max), public or private, recruit, post announcements.",
    teamHeroEyebrow: "New team",
    teamHeroTitle: "Build your hacker squad",
    teamHeroSub:
      "Pick a name, a logo, up to 16 members. Public to recruit openly, private to stay just among you.",
    newTeam: "Create a team",
    labsTitle: "Labs",
    labsSub:
      "Create or join a room to work together on an HTB, TryHackMe, Root-Me lab... (8 people max)",
    labsHeroEyebrow: "New lab room",
    labsHeroTitle: "Open a protected lab session",
    labsHeroSub:
      "Bring together up to 8 people around the same HTB, TryHackMe or Root-Me lab, with its own discussion thread.",
    newLab: "Create a lab",
    cardForumDesc: "Ask a question about your pentest.",
    cardHubDesc: "Chat live by topic with the community.",
    cardTeamDesc: "Create or join a team (16 max), public or private.",
    cardLabsDesc: "Join a room to progress together on a lab (8 max).",
    cardClassementDesc: "Who's stacking the most points on GowlSec.",
    cardBoutiqueDesc: "Courses to get you started, from €29.",
    cardAssistantDesc: "Instant help whenever you're stuck.",
  },
  ru: {
    chooseLangTitle: "Выберите язык",
    chooseLangSub:
      "Сообщество GowlSec говорит на нескольких языках — выберите свой, чтобы продолжить.",
    chooseLangCta: "Продолжить",
    tagline: "",
    tabs: {
      accueil: "Главная",
      actus: "CTFNews",
      forum: "Вопрос",
      salons: "Хаб",
      equipes: "Команда",
      labs: "Лабы",
      classement: "Рейтинг",
      trophies: "Трофеи",
      boutique: "Магазин",
      assistant: "ИИ-ассистент",
      support: "Поддержка",
      admin: "Админ",
    },
    live: "онлайн",
    admin: "Админ",
    heroTitle1: "Сообщество пентеста и CTF, ",
    heroTitle2: "которое никогда не спит",
    heroSub:
      "Здесь никто не учится в одиночку. Задай вопрос в 2 часа ночи, найди команду для CTF, проходите лабу вместе или получи помощь в прямом эфире на Хабе — сообщество ответит.",
    membersJoined: "зарегистрированных участников",
    joinFirst: "Присоединяйся к первым участникам",
    peerHelp: "взаимопомощь, а не лекция",
    ctaAsk: "Задать вопрос",
    ctaHub: "Перейти в Хаб",
    quickStartTitle: "Быстрый старт",
    quickStartSubtitle:
      "Три простых шага, чтобы быстрее войти в сообщество и двигаться вперёд.",
    quickStartForumTitle: "Задать вопрос",
    quickStartForumDesc:
      "Поделись своей проблемой и задай вопрос за несколько секунд.",
    quickStartHubTitle: "Войти в Хаб",
    quickStartHubDesc:
      "Общайся в прямом эфире по конкретной теме с экосистемой GowlSec.",
    quickStartTeamTitle: "Создать команду",
    quickStartTeamDesc: "Собери отряд для CTF, лабы или подготовки к экзамену.",
    statNews: "новости",
    statQuestions: "вопросы",
    statTrophies: "трофеи",
    statTeams: "команды",
    statLabs: "лабы",
    activityTitle: "Происходит прямо сейчас",
    activityEmpty: "Сообщество только начинается — стань первым.",
    scanLabel: "ворон ищет в базе данных",
    watchAll: "Все новости",
    trending: "Сейчас обсуждают",
    live2: "ПРЯМОЙ ЭФИР",
    watching: "активное наблюдение",
    footer: "GowlSec — сообщество пентеста и CTF · в учебных целях",
    forumTitle: "Вопрос",
    forumSub: "Задай вопрос или попроси помощи.",
    forumHeroEyebrow: "Новый вопрос",
    forumHeroTitle: "Получи помощь за пару минут",
    forumHeroSub:
      "Опиши контекст и что ты уже пробовал: сообщество и наставники отвечают в прямом эфире — глупых вопросов не бывает.",
    newQuestion: "Новый вопрос",
    cancel: "Отмена",
    publish: "Опубликовать",
    hubTitle: "Хаб",
    hubSub: "Живое общение по темам.",
    hubHeroEyebrow: "Хаб",
    hubHeroTitle: "Общайся в прямом эфире по темам",
    hubHeroSub:
      "Выбери комнату, чтобы присоединиться к разговору — у каждой своя атмосфера и своя тема.",
    teamTitle: "Команда",
    teamSub:
      "Создай команду (макс. 16 участников), публичную или приватную, набирай людей, публикуй объявления.",
    teamHeroEyebrow: "Новая команда",
    teamHeroTitle: "Собери свой отряд хакеров",
    teamHeroSub:
      "Выбери название, логотип, до 16 участников. Публичная — для открытого набора, приватная — только для своих.",
    newTeam: "Создать команду",
    labsTitle: "Лабы",
    labsSub:
      "Создай или присоединись к комнате, чтобы вместе проходить лабу HTB, TryHackMe, Root-Me... (макс. 8 человек)",
    labsHeroEyebrow: "Новая лаб-комната",
    labsHeroTitle: "Открой защищённую сессию лабы",
    labsHeroSub:
      "Собери до 8 человек вокруг одной лабы HTB, TryHackMe или Root-Me, со своим отдельным чатом.",
    newLab: "Создать лаб",
    cardForumDesc: "Задай вопрос по своему пентесту.",
    cardHubDesc: "Общайся в прямом эфире по темам с сообществом.",
    cardTeamDesc:
      "Создай или вступи в команду (макс. 16), публичную или приватную.",
    cardLabsDesc:
      "Присоединись к комнате, чтобы вместе проходить лабу (макс. 8).",
    cardClassementDesc: "Кто набирает больше всего очков на GowlSec.",
    cardBoutiqueDesc: "Курсы для старта — от 29€.",
    cardAssistantDesc: "Мгновенная помощь, когда ты застрял.",
  },
  zh: {
    chooseLangTitle: "选择你的语言",
    chooseLangSub: "GowlSec 社区使用多种语言 — 请选择你的语言以继续。",
    chooseLangCta: "继续",
    tagline: "",
    tabs: {
      accueil: "首页",
      actus: "CTFNews",
      forum: "提问",
      salons: "社区中心",
      equipes: "战队",
      labs: "实验室",
      classement: "排行榜",
      trophies: "奖杯",
      boutique: "商店",
      assistant: "AI 助手",
      support: "支持",
      admin: "管理",
    },
    live: "在线",
    admin: "管理",
    heroTitle1: "永不打烊的 ",
    heroTitle2: "渗透测试与 CTF 社区",
    heroSub:
      "在这里，你不是一个人学习。凌晨两点提问、组队参加 CTF、和大家一起攻克实验室，或在社区中心实时获得帮助——社区会回应你。",
    membersJoined: "位注册成员",
    joinFirst: "加入最早的一批成员",
    peerHelp: "同伴互助，而非单向授课",
    ctaAsk: "提出问题",
    ctaHub: "加入社区中心",
    quickStartTitle: "快速开始",
    quickStartSubtitle: "三个简单动作，帮助你更快融入社区并推进进度。",
    quickStartForumTitle: "提出问题",
    quickStartForumDesc: "用几秒钟分享你的阻塞点并发出请求。",
    quickStartHubTitle: "加入社区中心",
    quickStartHubDesc: "围绕特定主题与 GowlSec 生态实时交流。",
    quickStartTeamTitle: "创建战队",
    quickStartTeamDesc: "为 CTF、实验室或备考组建一支小队。",
    statNews: "资讯",
    statQuestions: "问题",
    statTrophies: "奖杯",
    statTeams: "战队",
    statLabs: "实验室",
    activityTitle: "实时动态",
    activityEmpty: "社区刚刚起步 — 快来成为第一个行动的人。",
    scanLabel: "乌鸦正在搜索数据库",
    watchAll: "查看全部资讯",
    trending: "近期热议",
    live2: "直播中",
    watching: "持续监控",
    footer: "GowlSec — 渗透测试与 CTF 社区 · 仅供学习交流",
    forumTitle: "提问",
    forumSub: "提出问题或请求指导。",
    forumHeroEyebrow: "新的提问",
    forumHeroTitle: "几分钟内获得帮助",
    forumHeroSub:
      "描述你的背景和已经尝试过的方法：社区成员和导师会实时回复 — 没有问题是愚蠢的。",
    newQuestion: "新的提问",
    cancel: "取消",
    publish: "发布",
    hubTitle: "社区中心",
    hubSub: "按主题实时互助交流。",
    hubHeroEyebrow: "社区中心",
    hubHeroTitle: "按主题实时聊天",
    hubHeroSub:
      "选择一个房间加入正在进行的对话 — 每个房间都有自己的氛围和主题。",
    teamTitle: "战队",
    teamSub: "创建你的战队（最多16人），公开或私密，招募成员，发布公告。",
    teamHeroEyebrow: "新建战队",
    teamHeroTitle: "组建你的黑客小队",
    teamHeroSub: "选择名称、队徽，最多16名成员。公开招募或私密仅限内部。",
    newTeam: "创建战队",
    labsTitle: "实验室",
    labsSub:
      "创建或加入房间，一起攻克 HTB、TryHackMe、Root-Me 的实验室...（最多8人）",
    labsHeroEyebrow: "新建实验室房间",
    labsHeroTitle: "开启一个受保护的实验室会话",
    labsHeroSub:
      "召集最多8人围绕同一个 HTB、TryHackMe 或 Root-Me 实验室，拥有专属讨论区。",
    newLab: "创建实验室",
    cardForumDesc: "就你的渗透测试提出问题。",
    cardHubDesc: "按主题与社区实时聊天。",
    cardTeamDesc: "创建或加入战队（最多16人），公开或私密。",
    cardLabsDesc: "加入房间，与他人一起攻克实验室（最多8人）。",
    cardClassementDesc: "看看谁在 GowlSec 上积累了最多积分。",
    cardBoutiqueDesc: "从 29€ 起的入门课程。",
    cardAssistantDesc: "遇到困难时立即获得帮助。",
  },
};
function t(lang, key) {
  const dict = I18N[lang] || I18N.fr;
  return dict[key] ?? I18N.fr[key] ?? key;
}

function shadeColor(hex, percent) {
  try {
    const num = parseInt(hex.replace("#", ""), 16);
    let r = (num >> 16) + Math.round(2.55 * percent);
    let g = ((num >> 8) & 0x00ff) + Math.round(2.55 * percent);
    let b = (num & 0x0000ff) + Math.round(2.55 * percent);
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
  } catch {
    return hex;
  }
}
function uid() {
  return (
    crypto?.randomUUID?.() ||
    `${Date.now()}-${Math.random().toString(16).slice(2)}`
  );
}
function timeAgo(iso) {
  const d = new Date(iso);
  if (!iso || Number.isNaN(d.getTime())) return "récemment";
  const diff = Math.max(0, Date.now() - d.getTime());
  const m = Math.floor(diff / 60000);
  if (m < 1) return "à l'instant";
  if (m < 60) return `il y a ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `il y a ${h} h`;
  const j = Math.floor(h / 24);
  if (j < 30) return `il y a ${j} j`;
  return new Date(iso).toLocaleDateString("fr-FR");
}
function dayOfYear(d = new Date()) {
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d - start) / 86400000);
}
async function hashText(text, salt = "") {
  try {
    const enc = new TextEncoder().encode(text);
    const saltEnc = new TextEncoder().encode(salt || "gowlsec-default-salt");
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc,
      "PBKDF2",
      false,
      ["deriveBits"],
    );
    const derived = await crypto.subtle.deriveBits(
      { name: "PBKDF2", hash: "SHA-256", salt: saltEnc, iterations: 200000 },
      keyMaterial,
      256,
    );
    return Array.from(new Uint8Array(derived))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    return `plain:${text}`;
  }
}

/* Message unique et clair (pas de checklist permanente) — retourne null si le mot de passe est valide */
function passwordErrorMessage(pw) {
  if (!pw) return null;
  if (pw.length < 8)
    return "Le mot de passe doit contenir au moins 8 caractères.";
  if (!/[A-Z]/.test(pw)) return "Une majuscule est obligatoire.";
  if (!/[a-z]/.test(pw)) return "Une minuscule est obligatoire.";
  if (!/[0-9]/.test(pw)) return "Un chiffre est obligatoire.";
  if (!/[^A-Za-z0-9]/.test(pw)) return "Un caractère spécial est obligatoire.";
  return null;
}

/* ---------------------------------------------------------------------
   Storage helpers (shared = visible à tous ; personal = propre à l'appareil)
--------------------------------------------------------------------- */
async function loadCollection(key, fallback, shared = true) {
  try {
    const res = await window.storage.get(key, shared);
    if (!res) return fallback;
    return JSON.parse(res.value);
  } catch {
    return fallback;
  }
}
async function saveCollection(key, value, shared = true) {
  try {
    await window.storage.set(key, JSON.stringify(value), shared);
  } catch {
    /* best effort */
  }
}

async function saveLocalSession(profile, rememberMe = false) {
  try {
    await window.storage.set(
      "gowlsec:session",
      JSON.stringify({
        profileId: profile?.id || null,
        rememberMe: !!rememberMe,
        updatedAt: new Date().toISOString(),
      }),
      false,
    );
  } catch {
    /* best effort */
  }
}

async function clearSession() {
  try {
    await window.storage.set(
      "gowlsec:session",
      JSON.stringify({
        profileId: null,
        rememberMe: false,
        updatedAt: new Date().toISOString(),
      }),
      false,
    );
  } catch {
    /* best effort */
  }
}

/* ---------------------------------------------------------------------
   UI atoms
--------------------------------------------------------------------- */
function Chip({ label, color }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs rounded"
      style={{
        color,
        border: `1px solid ${color}55`,
        background: `${color}14`,
        fontFamily: MONO_FONT,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: color }}
      />
      {label}
    </span>
  );
}
function isAdminProfile(profile) {
  return (
    !!profile &&
    (String(profile.role || "").toLowerCase() === "admin" ||
      profile.isAdmin === true)
  );
}
function AdminBadge() {
  return (
    <span
      className="inline-flex items-center justify-center rounded-md"
      style={{
        width: 22,
        height: 22,
        color: "#8BE9FD",
        background: "linear-gradient(145deg, #5B6EF529, #22D3A633)",
        border: "1px solid #5B9BFF66",
        boxShadow: "0 0 16px #5B6EF530, inset 0 1px 0 #FFFFFF18",
      }}
      title="Administrateur"
    >
      <Cpu size={12} strokeWidth={2.2} />
    </span>
  );
}
function FounderBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wide"
      style={{
        color: "#B8F3FF",
        background:
          "linear-gradient(135deg, rgba(91,110,245,0.2), rgba(46,217,163,0.14))",
        border: "1px solid #8BE9FD70",
        boxShadow: "0 0 14px rgba(139,233,253,0.14)",
        fontFamily: MONO_FONT,
      }}
      title="Fondateur officiel de GowlSec"
    >
      <Crown size={10} /> Fondateur
    </span>
  );
}
function Panel({ children, className = "", style = {}, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-lg relative ${className}`}
      style={{
        background: C.panel,
        border: `1px solid ${C.line}`,
        boxShadow: "inset 0 1px 0 0 #ffffff0A",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-5">
      {eyebrow && (
        <span
          className="text-[10px] uppercase tracking-[0.18em]"
          style={{ color: C.primary, fontFamily: MONO_FONT }}
        >
          {eyebrow}
        </span>
      )}
      <h1
        className="text-xl sm:text-2xl font-extrabold mt-1"
        style={{ color: C.text, fontFamily: DISPLAY_FONT }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className="text-xs sm:text-sm leading-relaxed mt-1.5 max-w-3xl"
          style={{ color: C.muted }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
function Field({ label, children }) {
  return (
    <label className="block mb-3">
      <span
        className="block mb-1 text-xs uppercase tracking-wide"
        style={{ color: C.muted, fontFamily: MONO_FONT }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}
const inputStyle = {
  background: C.panel2,
  border: `1px solid ${C.line}`,
  color: C.text,
  fontFamily: BODY_FONT,
};

function PrimaryButton({
  children,
  onClick,
  type = "button",
  disabled,
  style = {},
}) {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick?.(e);
  };
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-opacity disabled:opacity-40"
      style={{
        background: C.primary,
        color: "#fff",
        fontFamily: BODY_FONT,
        ...style,
      }}
    >
      {children}
    </button>
  );
}
function GhostButton({ children, onClick, danger }) {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick?.(e);
  };
  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs transition-colors"
      style={{
        border: `1px solid ${danger ? C.alert + "66" : C.line}`,
        color: danger ? C.alert : C.muted,
        background: "transparent",
        fontFamily: BODY_FONT,
      }}
    >
      {children}
    </button>
  );
}
function GuestGate({
  text = "Connecte-toi pour participer.",
  accent = C.primary,
}) {
  return (
    <div
      className="rounded-xl border p-4 mb-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between"
      style={{ borderColor: `${accent}40`, background: `${accent}0C` }}
    >
      <p
        className="text-sm flex items-center gap-2"
        style={{ color: C.text, fontFamily: BODY_FONT }}
      >
        <Lock size={14} color={accent} /> {text}
      </p>
      <div className="flex items-center gap-2 shrink-0">
        <GhostButton
          onClick={() =>
            window.dispatchEvent(new CustomEvent("open-auth-login"))
          }
        >
          Se connecter
        </GhostButton>
        <PrimaryButton
          onClick={() =>
            window.dispatchEvent(new CustomEvent("open-auth-register"))
          }
          style={{ background: accent }}
        >
          S'inscrire
        </PrimaryButton>
      </div>
    </div>
  );
}
function EmptyState({ text, icon, accent = C.primary, cta, onCta }) {
  return (
    <div
      className="col-span-full flex flex-col items-center justify-center text-center py-12 px-6 rounded-xl relative overflow-hidden gowl-empty-state"
      style={{
        border: `1px solid ${accent}33`,
        background: `linear-gradient(180deg, ${accent}0D, ${C.bg}40)`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${accent}22 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
          opacity: 0.5,
          maskImage:
            "radial-gradient(ellipse at center, black, transparent 75%)",
        }}
      />
      <span
        aria-hidden
        className="absolute"
        style={{
          top: 10,
          left: 10,
          width: 14,
          height: 14,
          borderTop: `2px solid ${accent}55`,
          borderLeft: `2px solid ${accent}55`,
          borderRadius: "4px 0 0 0",
        }}
      />
      <span
        aria-hidden
        className="absolute"
        style={{
          bottom: 10,
          right: 10,
          width: 14,
          height: 14,
          borderBottom: `2px solid ${accent}55`,
          borderRight: `2px solid ${accent}55`,
          borderRadius: "0 0 4px 0",
        }}
      />
      {icon && (
        <span
          className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-3.5 gowl-empty-icon"
          style={{
            background: `${accent}1A`,
            border: `1px solid ${accent}4D`,
            color: accent,
            boxShadow: `0 0 0 5px ${accent}0A`,
          }}
        >
          {icon}
        </span>
      )}
      <p
        className="relative text-sm max-w-sm leading-relaxed"
        style={{ color: C.muted, fontFamily: BODY_FONT }}
      >
        {text}
      </p>
      {cta && (
        <div className="relative mt-4">
          <PrimaryButton onClick={onCta}>{cta}</PrimaryButton>
        </div>
      )}
    </div>
  );
}
function StatCardsRow({ items, vertical = false }) {
  return (
    <div
      className={
        vertical
          ? "flex flex-col gap-3"
          : "flex flex-wrap items-stretch gap-3 mb-6"
      }
    >
      {items.map((s, i) => (
        <div
          key={i}
          className={
            vertical
              ? "rounded-xl px-4 py-3 gowl-glass relative overflow-hidden"
              : "flex-1 min-w-[150px] rounded-xl px-4 py-3 gowl-glass relative overflow-hidden"
          }
          style={{ border: `1px solid ${s.accent}44` }}
        >
          <span className="gowl-inner-line" />
          <div
            className="flex items-center gap-2 mb-1"
            style={{ color: s.accent }}
          >
            {s.icon}
            <span className="text-[10px] uppercase gowl-mono-tag">
              {s.label}
            </span>
          </div>
          <p
            className="text-2xl font-extrabold truncate gowl-count-pop"
            style={{ color: C.text, fontFamily: DISPLAY_FONT }}
          >
            {s.value}
          </p>
        </div>
      ))}
    </div>
  );
}
function InfoSidebar({ children }) {
  return (
    <aside className="w-full lg:w-[240px] shrink-0 flex flex-col gap-3">
      {children}
    </aside>
  );
}
function StatChip({ icon, label, value }) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-md"
      style={{ border: `1px solid ${C.line}`, background: C.panel }}
    >
      <span style={{ color: C.primary }}>{icon}</span>
      <span
        className="text-sm font-semibold"
        style={{ color: C.text, fontFamily: BODY_FONT }}
      >
        {value}
      </span>
      <span
        className="text-xs"
        style={{ color: C.muted, fontFamily: BODY_FONT }}
      >
        {label}
      </span>
    </div>
  );
}
function ProfileStat({ icon, label, value, accent = C.primary }) {
  return (
    <div
      className="rounded-lg px-3 py-2.5 gowl-glass gowl-profile-stat relative overflow-hidden"
      style={{ border: `1px solid ${accent}33` }}
    >
      <span className="gowl-inner-line" />
      <div className="flex items-center gap-1.5 mb-1" style={{ color: accent }}>
        <span
          className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
          style={{ background: `${accent}1F` }}
        >
          {icon}
        </span>
        <span
          className="text-[9px] font-bold uppercase gowl-mono-tag truncate"
          style={{ color: C.muted }}
        >
          {label}
        </span>
      </div>
      <p
        className="text-lg font-extrabold gowl-count-pop leading-none"
        style={{ color: C.text, fontFamily: DISPLAY_FONT }}
      >
        {value}
      </p>
    </div>
  );
}

const ACTIVITY_META = {
  question: { Icon: MessageSquare, color: C.primary },
  trophy: { Icon: Trophy, color: C.gold },
  team: { Icon: Users, color: C.warn },
  lab: { Icon: Bug, color: C.alert },
  message: { Icon: Hash, color: C.ok },
};

function Avatar({ profile, size = 32 }) {
  const canOpenProfile = Boolean(profile?.username);
  const points = Math.max(0, Number(profile?.points || 0));
  const levelInfo = getLevelInfo(points);
  const levelIndex = Math.max(
    0,
    LEVELS.findIndex((level) => level.key === levelInfo.level.key),
  );
  const levelColor = levelInfo.level.color || C.muted;
  const framePadding = levelIndex > 0 ? Math.max(1.5, size * 0.055) : 0;
  const badgeSize = Math.max(12, Math.round(size * 0.36));
  const EvolutionIcon =
    levelIndex >= 5 ? Crown : levelIndex >= 3 ? Sparkles : Zap;
  const openProfile = (event) => {
    if (!canOpenProfile) return;
    event.stopPropagation();
    window.dispatchEvent(
      new CustomEvent("gowlsec:open-profile", { detail: { profile } }),
    );
  };
  const interactiveProps = canOpenProfile
    ? {
        role: "button",
        tabIndex: 0,
        title: `Voir le profil de ${profile.username}`,
        onClick: openProfile,
        onKeyDown: (event) => {
          if (event.key === "Enter" || event.key === " ") openProfile(event);
        },
      }
    : {};
  return (
    <div
      {...interactiveProps}
      className={`gowl-avatar-frame gowl-avatar-level-${levelInfo.level.key} relative rounded-full shrink-0 ${canOpenProfile ? "gowl-avatar-clickable" : ""}`}
      style={{
        width: size,
        height: size,
        padding: framePadding,
        background:
          levelIndex >= 4
            ? `conic-gradient(from 35deg, ${levelColor}, ${C.primary}, ${C.ok}, ${levelColor})`
            : levelIndex > 0
              ? `linear-gradient(145deg, ${levelColor}, ${levelColor}66)`
              : "transparent",
        boxShadow:
          levelIndex >= 5
            ? `0 0 ${Math.max(12, size * 0.38)}px ${C.gold}66`
            : levelIndex >= 3
              ? `0 0 ${Math.max(8, size * 0.28)}px ${levelColor}45`
              : levelIndex > 0
                ? `0 0 0 1px ${levelColor}28`
                : "none",
      }}
      aria-label={`${profile?.username || "Profil"} · niveau ${levelInfo.level.label}`}
    >
      <div
        className="w-full h-full rounded-full overflow-hidden flex items-center justify-center"
        style={{
          background: profile?.avatarImage
            ? C.panel
            : (AVATAR_MAP[profile?.avatarKey] || AVATAR_OPTIONS[0]).color,
          border: levelIndex > 0 ? `1px solid ${C.bg}` : "none",
        }}
      >
        {profile?.avatarImage ? (
        <img
          src={resolveProfileImageUrl(profile.avatarImage)}
          alt="avatar"
          className="w-full h-full object-cover"
        />
        ) : (
          (() => {
            const selectedAvatar =
              AVATAR_MAP[profile?.avatarKey] || AVATAR_OPTIONS[0];
            const Icon = selectedAvatar.icon;
            return <Icon size={Math.round(size * 0.55)} color="#fff" />;
          })()
        )}
      </div>
      {levelIndex >= 2 && (
        <span
          className="gowl-avatar-evolution-badge absolute rounded-full flex items-center justify-center"
          style={{
            width: badgeSize,
            height: badgeSize,
            right: -Math.max(2, size * 0.04),
            top: -Math.max(2, size * 0.04),
            color: levelColor,
            background: C.panel,
            border: `1px solid ${levelColor}99`,
            boxShadow: `0 2px 8px ${C.bg}`,
          }}
          title={`${levelInfo.level.label} · ${points} points`}
        >
          <EvolutionIcon size={Math.max(7, Math.round(badgeSize * 0.55))} />
        </span>
      )}
    </div>
  );
}

function PublicProfileModal({
  profile,
  loading,
  onClose,
  currentUser,
  onMessage,
}) {
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationText, setRecommendationText] = useState("");
  const [recommendationType, setRecommendationType] = useState("thanks");
  const [recommendationSkill, setRecommendationSkill] = useState("Web");
  const [recommendationStatus, setRecommendationStatus] = useState("");

  useEffect(() => {
    if (!profile?.username) return;
    let active = true;
    apiRequest(
      `/api/social/profiles/${encodeURIComponent(profile.username)}/recommendations`,
    )
      .then((data) => {
        if (active) setRecommendations(data.recommendations || []);
      })
      .catch(() => {
        if (active) setRecommendations([]);
      });
    return () => {
      active = false;
    };
  }, [profile?.username]);

  if (!profile && !loading) return null;
  const safeProfile = profile || {};
  const banner = safeProfile.bannerImage
    ? `url(${resolveProfileImageUrl(safeProfile.bannerImage)}) center/cover no-repeat`
    : safeProfile.bannerColor
      ? `linear-gradient(135deg, ${safeProfile.bannerColor}, ${shadeColor(safeProfile.bannerColor, -35)})`
      : BANNER_MAP[safeProfile.banner] ||
        `linear-gradient(135deg, ${C.primary}, ${C.panel2})`;
  const socials = safeProfile.socials || {};
  const publicPlatformAccounts =
    safeProfile.platformAccounts || EMPTY_PLATFORM_ACCOUNTS;
  const streak =
    Number(safeProfile.currentStreak ?? safeProfile.activityStreak ?? 0) || 0;
  const badges = Array.isArray(safeProfile.badges)
    ? safeProfile.badges.filter((badge) => badge.unlocked !== false)
    : [];
  const statusMeta =
    PROFILE_STATUSES.find((item) => item.key === safeProfile.profileStatus) ||
    PROFILE_STATUSES[1];
  const pinnedKeys = Array.isArray(safeProfile.pinnedBadges)
    ? safeProfile.pinnedBadges
    : [];
  const pinned = badges.filter((badge) => pinnedKeys.includes(badge.key));
  const isOwnProfile = currentUser?.username === safeProfile.username;

  async function submitRecommendation(event) {
    event.preventDefault();
    if (!recommendationText.trim()) return;
    try {
      const data = await apiRequest(
        `/api/social/profiles/${encodeURIComponent(safeProfile.username)}/recommendations`,
        {
          method: "POST",
          body: {
            type: recommendationType,
            skill: recommendationType === "skill" ? recommendationSkill : "",
            message: recommendationText.trim(),
          },
        },
      );
      setRecommendations((current) => [data.recommendation, ...current]);
      setRecommendationText("");
      setRecommendationStatus("Recommandation publiée.");
    } catch (error) {
      setRecommendationStatus(error.message);
    }
  }

  async function reportProfile() {
    const reason = window.prompt("Pourquoi signales-tu ce profil ?");
    if (!reason) return;
    try {
      await apiRequest("/api/social/reports", {
        method: "POST",
        body: {
          targetType: "profile",
          targetId: String(safeProfile.id || safeProfile.username),
          reason,
          details: "",
        },
      });
      window.alert("Signalement transmis à la modération.");
    } catch (error) {
      window.alert(error.message);
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4"
      style={{ background: "rgba(4,9,15,0.76)", backdropFilter: "blur(9px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl overflow-y-auto max-h-[92vh]"
        style={{
          background: C.panel,
          border: `1px solid ${C.line}`,
          boxShadow: "0 32px 90px -35px rgba(0,0,0,0.9)",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        {loading ? (
          <div
            className="py-20 flex items-center justify-center gap-2"
            style={{ color: C.muted }}
          >
            <Loader2 size={16} className="animate-spin" /> Chargement du profil…
          </div>
        ) : (
          <>
            <div className="h-28 relative" style={{ background: banner }}>
              <span
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent, rgba(11,17,25,0.52))",
                }}
              />
              <button
                type="button"
                onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  color: C.text,
                  background: `${C.bg}CC`,
                  border: `1px solid ${C.line}`,
                }}
              >
                <X size={14} />
              </button>
            </div>
            <div className="px-5 pb-5 relative">
              <div className="-mt-9 flex items-end justify-between gap-3 relative z-10">
                <span
                  className="rounded-full p-[3px]"
                  style={{ background: C.panel }}
                >
                  <Avatar
                    profile={{ ...safeProfile, username: null }}
                    size={68}
                  />
                </span>
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold mb-1"
                  style={{
                    color: streak ? C.warn : C.muted,
                    background: C.panel2,
                    border: `1px solid ${streak ? `${C.warn}45` : C.line}`,
                    fontFamily: MONO_FONT,
                  }}
                >
                  <Flame size={12} fill={streak ? C.warn : "none"} /> {streak}{" "}
                  jour{streak > 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <h3
                  className="text-xl font-extrabold"
                  style={{ color: C.text, fontFamily: DISPLAY_FONT }}
                >
                  {safeProfile.username}
                </h3>
                {safeProfile.isFounder && <FounderBadge />}
                {isAdminProfile(safeProfile) && <AdminBadge />}
                {safeProfile.customRole && (
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold"
                    style={{
                      color: C.gold,
                      background: `${C.gold}12`,
                      border: `1px solid ${C.gold}35`,
                      fontFamily: MONO_FONT,
                    }}
                  >
                    <Shield size={9} /> {safeProfile.customRole}
                  </span>
                )}
              </div>
              <p
                className="text-[10px] mt-1"
                style={{ color: C.muted, fontFamily: MONO_FONT }}
              >
                Membre depuis{" "}
                {timeAgo(safeProfile.joinedAt || safeProfile.createdAt)}
              </p>
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span
                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px]"
                  style={{
                    color: statusMeta.color,
                    background: `${statusMeta.color}14`,
                    border: `1px solid ${statusMeta.color}40`,
                    fontFamily: MONO_FONT,
                  }}
                >
                  <Circle size={7} fill={statusMeta.color} /> {statusMeta.label}
                </span>
                {safeProfile.age && (
                  <span
                    className="text-[10px]"
                    style={{ color: C.muted, fontFamily: MONO_FONT }}
                  >
                    {safeProfile.age} ans
                  </span>
                )}
              </div>
              {safeProfile.privateProfile ? (
                <div
                  className="rounded-xl px-3 py-4 mt-4 text-center"
                  style={{
                    background: C.panel2,
                    border: `1px solid ${C.line}`,
                  }}
                >
                  <Lock
                    size={16}
                    className="mx-auto mb-2"
                    style={{ color: C.muted }}
                  />
                  <p className="text-xs" style={{ color: C.muted }}>
                    Ce membre a choisi de garder son profil privé.
                  </p>
                </div>
              ) : safeProfile.bio ? (
                <p
                  className="text-sm leading-relaxed mt-4"
                  style={{ color: C.muted, fontFamily: BODY_FONT }}
                >
                  {safeProfile.bio}
                </p>
              ) : (
                <p className="text-xs mt-4" style={{ color: C.muted }}>
                  Aucune biographie renseignée.
                </p>
              )}

              {!isOwnProfile && currentUser && (
                <div className="flex gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => onMessage?.(safeProfile.username)}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold"
                    style={{ color: "#fff", background: C.primary }}
                  >
                    <MessageCircle size={13} /> Message privé
                  </button>
                  <button
                    type="button"
                    onClick={reportProfile}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
                    style={{ color: C.muted, border: `1px solid ${C.line}` }}
                  >
                    <Flag size={13} /> Signaler
                  </button>
                </div>
              )}

              <div className="grid grid-cols-3 gap-2 mt-4">
                {[
                  {
                    label: "Points",
                    value: safeProfile.points || 0,
                    color: C.ok,
                  },
                  { label: "Badges", value: badges.length, color: C.gold },
                  {
                    label: "Meilleure streak",
                    value: safeProfile.longestStreak || streak,
                    color: C.warn,
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg p-2.5 text-center"
                    style={{
                      background: C.panel2,
                      border: `1px solid ${C.line}`,
                    }}
                  >
                    <span
                      className="block text-base font-extrabold"
                      style={{ color: stat.color, fontFamily: DISPLAY_FONT }}
                    >
                      {stat.value}
                    </span>
                    <span
                      className="block text-[8px] uppercase tracking-wider mt-0.5"
                      style={{ color: C.muted, fontFamily: MONO_FONT }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {pinned.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {pinned.map((badge) => (
                    <span
                      key={badge.key}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[9px]"
                      style={{
                        color: badge.color || C.gold,
                        background: `${badge.color || C.gold}12`,
                        border: `1px solid ${badge.color || C.gold}35`,
                        fontFamily: MONO_FONT,
                      }}
                    >
                      <Pin size={10} /> {badge.label}
                    </span>
                  ))}
                </div>
              )}
              {(safeProfile.specialties || []).length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {safeProfile.specialties.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 rounded-md text-[9px]"
                      style={{
                        color: C.primary,
                        background: `${C.primary}12`,
                        border: `1px solid ${C.primary}30`,
                        fontFamily: MONO_FONT,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
              <div
                className="flex flex-wrap gap-2 mt-4 pt-4"
                style={{ borderTop: `1px solid ${C.line}` }}
              >
                {socials.github && (
                  <a
                    href={`https://github.com/${String(socials.github).replace(/^@/, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs"
                    style={{ color: C.text, border: `1px solid ${C.line}` }}
                  >
                    <GitHubIcon size={12} /> GitHub
                  </a>
                )}
                {socials.twitter && (
                  <a
                    href={`https://x.com/${String(socials.twitter).replace(/^@/, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs"
                    style={{ color: C.text, border: `1px solid ${C.line}` }}
                  >
                    <XIcon size={12} /> X
                  </a>
                )}
                {socials.discord && (
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs"
                    style={{ color: C.text, border: `1px solid ${C.line}` }}
                  >
                    <MessageCircle size={12} /> {socials.discord}
                  </span>
                )}
                {[
                  ["hackTheBox", "Hack The Box", publicPlatformAccounts.hackTheBox, Target, C.ok],
                  ["rootMe", "Root-Me", publicPlatformAccounts.rootMe, Skull, C.alert],
                  ["tryHackMe", "TryHackMe", publicPlatformAccounts.tryHackMe, Zap, C.warn],
                ]
                  .filter(([, , value]) => value)
                  .map(([key, label, value, PlatformIcon, color]) => (
                    <a
                      key={key}
                      href={getPlatformProfileUrl(key, value)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs"
                      style={{ color, border: `1px solid ${color}44` }}
                    >
                      <PlatformIcon size={12} /> {label}
                    </a>
                  ))}
                {publicPlatformAccounts.otherName &&
                  publicPlatformAccounts.otherUrl && (
                    <a
                      href={publicPlatformAccounts.otherUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs"
                      style={{ color: C.primary, border: `1px solid ${C.primary}44` }}
                    >
                      <ExternalLink size={12} /> {publicPlatformAccounts.otherName}
                    </a>
                  )}
              </div>

              {(safeProfile.certifications || []).length > 0 && (
                <div
                  className="mt-4 pt-4"
                  style={{ borderTop: `1px solid ${C.line}` }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Award size={13} style={{ color: C.gold }} />
                    <h4
                      className="text-xs font-bold"
                      style={{ color: C.text, fontFamily: DISPLAY_FONT }}
                    >
                      Certifications
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {safeProfile.certifications.map((certification) => (
                      <span
                        key={certification}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px]"
                        style={{
                          color: C.gold,
                          background: `${C.gold}10`,
                          border: `1px solid ${C.gold}35`,
                          fontFamily: MONO_FONT,
                        }}
                      >
                        <Award size={10} /> {certification}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div
                className="mt-4 pt-4"
                style={{ borderTop: `1px solid ${C.line}` }}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h4
                    className="text-xs font-bold"
                    style={{ color: C.text, fontFamily: DISPLAY_FONT }}
                  >
                    Recommandations
                  </h4>
                  <span
                    className="text-[10px]"
                    style={{ color: C.muted, fontFamily: MONO_FONT }}
                  >
                    {recommendations.length} avis
                  </span>
                </div>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {recommendations.slice(0, 8).map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg p-2.5"
                      style={{
                        background: C.panel2,
                        border: `1px solid ${C.line}`,
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Avatar profile={item.author} size={20} />
                        <span
                          className="text-[10px] font-bold"
                          style={{ color: C.text }}
                        >
                          {item.author?.username}
                        </span>
                        {item.skill && (
                          <span
                            className="text-[9px]"
                            style={{ color: C.ok, fontFamily: MONO_FONT }}
                          >
                            confirme {item.skill}
                          </span>
                        )}
                      </div>
                      <p
                        className="text-[11px] mt-1.5"
                        style={{ color: C.muted }}
                      >
                        {item.message}
                      </p>
                    </div>
                  ))}
                </div>
                {!isOwnProfile && currentUser && (
                  <form
                    onSubmit={submitRecommendation}
                    className="mt-3 space-y-2"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={recommendationType}
                        onChange={(event) =>
                          setRecommendationType(event.target.value)
                        }
                        className="px-2 py-2 rounded-lg text-xs"
                        style={{ ...inputStyle, background: C.panel2 }}
                      >
                        <option value="thanks">Remercier</option>
                        <option value="skill">Confirmer une compétence</option>
                      </select>
                      {recommendationType === "skill" && (
                        <select
                          value={recommendationSkill}
                          onChange={(event) =>
                            setRecommendationSkill(event.target.value)
                          }
                          className="px-2 py-2 rounded-lg text-xs"
                          style={{ ...inputStyle, background: C.panel2 }}
                        >
                          {PROFILE_SPECIALTIES.map((skill) => (
                            <option key={skill}>{skill}</option>
                          ))}
                        </select>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <input
                        value={recommendationText}
                        onChange={(event) =>
                          setRecommendationText(
                            event.target.value.slice(0, 500),
                          )
                        }
                        placeholder="Ton retour bienveillant…"
                        className="flex-1 px-3 py-2 rounded-lg text-xs"
                        style={{ ...inputStyle, background: C.panel2 }}
                      />
                      <button
                        type="submit"
                        className="px-3 py-2 rounded-lg text-xs font-bold"
                        style={{ color: "#04120D", background: C.ok }}
                      >
                        Publier
                      </button>
                    </div>
                    {recommendationStatus && (
                      <p className="text-[10px]" style={{ color: C.muted }}>
                        {recommendationStatus}
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
function MemberAvatarStack({ profiles = [], max = 6 }) {
  const shown = profiles.slice(0, max);
  return (
    <div className="flex -space-x-2.5">
      {shown.length === 0
        ? AVATAR_OPTIONS.slice(0, 5).map((a, i) => {
            const Icon = a.icon;
            return (
              <div
                key={a.key}
                className="rounded-full flex items-center justify-center"
                style={{
                  width: 30,
                  height: 30,
                  background: a.color,
                  border: `2px solid ${C.bg}`,
                  zIndex: 10 - i,
                }}
              >
                <Icon size={15} color="#fff" />
              </div>
            );
          })
        : shown.map((p, i) => (
            <div
              key={p.username || p.id || i}
              className="rounded-full"
              style={{ border: `2px solid ${C.bg}`, zIndex: 10 - i }}
            >
              <Avatar profile={p} size={30} />
            </div>
          ))}
    </div>
  );
}
function TeamLogo({ team, size = 40 }) {
  if (team.logoType === "image" && team.logoValue) {
    return (
      <img
        src={team.logoValue}
        alt=""
        className="rounded-md object-cover shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="rounded-md flex items-center justify-center shrink-0"
      style={{
        width: size,
        height: size,
        background: C.panel2,
        border: `1px solid ${C.line}`,
        fontSize: Math.round(size * 0.5),
      }}
    >
      {team.logoValue || "🛡️"}
    </div>
  );
}

/* ---------------------------------------------------------------------
   Logo — écusson hibou (cybersécurité)
--------------------------------------------------------------------- */
function OwlLogo({ size = 26, glow = false }) {
  return (
    <span
      className="relative inline-flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      {glow && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${C.primary}55, transparent 70%)`,
            filter: "blur(4px)",
            transform: "scale(1.6)",
          }}
        />
      )}
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        className="relative"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Logo GowlSec"
      >
        <defs>
          <linearGradient id="gowlShield" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={C.primary} />
            <stop offset="1" stopColor={C.ok} />
          </linearGradient>
        </defs>
        <path
          d="M32 3 L56 12 V29 C56 45 46 55 32 61 C18 55 8 45 8 29 V12 Z"
          fill="#0A0C10"
          stroke="url(#gowlShield)"
          strokeWidth="2.5"
        />
        <path
          d="M32 12 C24 12 18 19 18 27 C18 34 22 39 27 41 L27 45 C27 47 29 49 32 49 C35 49 37 47 37 45 L37 41 C42 39 46 34 46 27 C46 19 40 12 32 12 Z"
          fill="#10151D"
          stroke={C.gold}
          strokeWidth="1.6"
        />
        <circle cx="25.5" cy="26" r="5.4" fill="#fff" />
        <circle cx="38.5" cy="26" r="5.4" fill="#fff" />
        <circle cx="25.5" cy="26" r="2.4" fill="#0A0C10" />
        <circle cx="38.5" cy="26" r="2.4" fill="#0A0C10" />
        <polygon points="32,31 29,36 35,36" fill={C.gold} />
        <path
          d="M20 15 C22 10 26 8 32 8 C38 8 42 10 44 15 C39 12 35 11 32 11 C29 11 25 12 20 15 Z"
          fill={C.primary}
        />
      </svg>
    </span>
  );
}

/* ---------------------------------------------------------------------
   Indicateur "en ligne" — header
--------------------------------------------------------------------- */
function OnlineIndicator() {
  const [count, setCount] = useState(null);
  useEffect(() => {
    let active = true;
    async function refresh() {
      try {
        const listing = await window.storage.list("gowlsec:presence:", true);
        const keys = listing?.keys || [];
        const results = await Promise.all(
          keys.map(async (k) => {
            try {
              const r = await window.storage.get(k, true);
              return r ? JSON.parse(r.value) : null;
            } catch {
              return null;
            }
          }),
        );
        if (!active) return;
        const now = Date.now();
        setCount(
          results
            .filter(Boolean)
            .filter(
              (p) => now - new Date(p.lastSeen).getTime() < ONLINE_WINDOW_MS,
            ).length,
        );
      } catch {
        /* best effort */
      }
    }
    refresh();
    const interval = setInterval(refresh, 30000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);
  if (count === null) return null;
  return (
    <span
      className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
      style={{
        border: `1px solid ${C.line}`,
        color: C.muted,
        fontFamily: MONO_FONT,
      }}
    >
      <Circle size={7} fill={C.ok} color={C.ok} /> {count} en ligne
    </span>
  );
}

/* ---------------------------------------------------------------------
   Badge "live" pulsant — pour dynamiser l'accueil
--------------------------------------------------------------------- */
function LivePulseBadge({ count }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
      style={{
        background: `${C.ok}14`,
        border: `1px solid ${C.ok}40`,
        color: C.ok,
        fontFamily: MONO_FONT,
      }}
    >
      <span className="relative inline-flex w-2 h-2">
        <span
          className="absolute inline-flex w-full h-full rounded-full"
          style={{
            background: C.ok,
            animation: "gowl-ping-ring 1.8s cubic-bezier(0,0,0.2,1) infinite",
          }}
        />
        <span
          className="relative inline-flex w-2 h-2 rounded-full"
          style={{ background: C.ok }}
        />
      </span>
      {count === null ? "communauté active" : `${count} en ligne maintenant`}
    </span>
  );
}

function NavMoreMenu({ tabs, tab, setTab, lang }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, right: 0 });
  const activeInMenu = tabs.some((t) => t.key === tab);

  useEffect(() => {
    if (open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 6, right: window.innerWidth - r.right });
    }
  }, [open]);

  if (tabs.length === 0) return null;
  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={() => setOpen((o) => !o)}
        className={`gowl-navtab flex items-center gap-1 px-3.5 py-2 text-[13.5px] font-semibold whitespace-nowrap rounded-lg${activeInMenu ? " active" : ""}`}
        style={{ fontFamily: BODY_FONT }}
      >
        Plus{" "}
        <ChevronDown
          size={14}
          style={{
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.15s ease",
          }}
        />
      </button>
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => setOpen(false)}
            />
            <div
              className="fixed py-1.5 rounded-xl z-[9999] min-w-[190px]"
              style={{
                top: pos.top,
                right: pos.right,
                background: C.bg,
                border: `1px solid ${C.line}`,
                boxShadow: "0 16px 40px -12px rgba(0,0,0,0.65)",
              }}
            >
              {tabs.map((t) => {
                const active = tab === t.key;
                const Icon = t.icon;
                return (
                  <button
                    key={t.key}
                    onClick={() => {
                      setTab(t.key);
                      setOpen(false);
                    }}
                    className={`gowl-moremenu-item flex items-center gap-2.5 w-full px-3.5 py-2 text-[13px] text-left${active ? " active" : ""}`}
                    style={{
                      color: active ? C.primary : C.text,
                      fontFamily: BODY_FONT,
                    }}
                  >
                    {Icon && <Icon size={14} />}{" "}
                    {I18N[lang || "fr"].tabs[t.key] || t.label}
                  </button>
                );
              })}
            </div>
          </>,
          document.body,
        )}
    </div>
  );
}

/* ---------------------------------------------------------------------
   Sélection de langue — écran d'entrée + mini switcher dans le header
--------------------------------------------------------------------- */
function LanguageGate({ onChoose }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: `${C.bg}F5`, backdropFilter: "blur(6px)" }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-6 gowl-fade-up relative overflow-hidden"
        style={{
          background: C.panel,
          border: `1px solid ${C.line}`,
          boxShadow: "0 24px 60px -20px rgba(0,0,0,0.6)",
        }}
      >
        <div
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 260,
            height: 260,
            top: -110,
            right: -90,
            background: `radial-gradient(circle, ${C.primary}30, transparent 70%)`,
            filter: "blur(10px)",
          }}
        />
        <div className="flex items-center gap-2.5 mb-5 relative">
          <img
            src={owlLogoImg}
            alt="Logo GowlSec"
            className="w-7 h-7 object-contain"
          />
          <span
            className="font-extrabold text-lg"
            style={{ color: C.text, fontFamily: DISPLAY_FONT }}
          >
            GowlSec
          </span>
        </div>
        <h2
          className="text-lg font-bold mb-1.5 relative"
          style={{ color: C.text, fontFamily: DISPLAY_FONT }}
        >
          Choose your language · Choisis ta langue
        </h2>
        <p
          className="text-xs mb-5 relative"
          style={{ color: C.muted, fontFamily: BODY_FONT }}
        >
          选择语言 · Выберите язык
        </p>
        <div className="grid grid-cols-2 gap-2.5 relative">
          {LANGUAGES.map((l) => (
            <button
              key={l.key}
              onClick={() => onChoose(l.key)}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-left transition-all hover:-translate-y-0.5"
              style={{ background: C.panel2, border: `1px solid ${C.line}` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = C.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = C.line;
              }}
            >
              <span className="text-2xl">{l.flag}</span>
              <span
                className="text-sm font-semibold"
                style={{ color: C.text, fontFamily: BODY_FONT }}
              >
                {l.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
function LangSwitcher({ lang, onChoose }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, right: 0 });
  const current = LANGUAGES.find((l) => l.key === lang) || LANGUAGES[0];

  useEffect(() => {
    if (open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 6, right: window.innerWidth - r.right });
    }
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold"
        style={{
          background: C.panel2,
          border: `1px solid ${C.line}`,
          color: C.text,
          fontFamily: MONO_FONT,
        }}
      >
        <span>{current.flag}</span> {current.short}
      </button>
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => setOpen(false)}
            />
            <div
              className="fixed py-1 rounded-lg z-[9999] min-w-[140px]"
              style={{
                top: pos.top,
                right: pos.right,
                background: C.panel,
                border: `1px solid ${C.line}`,
                boxShadow: "0 12px 30px -10px rgba(0,0,0,0.6)",
              }}
            >
              {LANGUAGES.map((l) => (
                <button
                  key={l.key}
                  onClick={() => {
                    onChoose(l.key);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-left"
                  style={{
                    color: l.key === lang ? C.primary : C.text,
                    background:
                      l.key === lang ? `${C.primary}14` : "transparent",
                    fontFamily: BODY_FONT,
                  }}
                >
                  <span>{l.flag}</span> {l.label}
                </button>
              ))}
            </div>
          </>,
          document.body,
        )}
    </div>
  );
}

/* ---------------------------------------------------------------------
   Auth widget (haut à droite) — Discord + email/mot de passe
--------------------------------------------------------------------- */
/* ---------------------------------------------------------------------
   Toast — notifications élégantes (remplace le texte rouge brut)
--------------------------------------------------------------------- */
function AuthToast({ toast, onDone }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onDone, 4200);
    return () => clearTimeout(t);
  }, [toast, onDone]);

  if (!toast) return null;
  const isError = toast.type === "error";
  const accent = isError ? C.alert : C.ok;
  return (
    <div
      className="gowl-toast fixed left-1/2 z-[100000000] flex items-start gap-2.5 px-4 py-3 rounded-2xl"
      style={{
        top: "1.25rem",
        transform: "translateX(-50%)",
        background: `linear-gradient(160deg, ${C.panel} 0%, #0b0e13 100%)`,
        border: `1px solid ${accent}55`,
        boxShadow: `0 18px 40px -12px rgba(0,0,0,0.65), 0 0 0 1px ${accent}22, 0 0 24px -6px ${accent}66`,
        maxWidth: "min(420px, calc(100vw - 2rem))",
      }}
      role="alert"
    >
      <span className="mt-0.5 shrink-0" style={{ color: accent }}>
        {isError ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
      </span>
      <p
        className="text-sm leading-snug"
        style={{ color: C.text, fontFamily: BODY_FONT }}
      >
        {toast.message}
      </p>
      <button
        onClick={onDone}
        className="ml-1 shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        style={{ color: C.muted }}
      >
        <X size={13} />
      </button>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Champ mot de passe réutilisable — oeil pour afficher/masquer,
   validation en direct sans checklist permanente
--------------------------------------------------------------------- */
function PasswordField({
  label,
  value,
  onChange,
  show,
  onToggleShow,
  placeholder,
  validate = false,
  autoComplete,
}) {
  const msg = validate ? passwordErrorMessage(value) : null;
  const isValid = validate && value && !msg;
  return (
    <Field label={label}>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="gowl-auth-input w-full pl-3 pr-10 py-2.5 rounded-xl text-sm"
          style={{ ...inputStyle, background: `${C.panel2}CC` }}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={onToggleShow}
          className="gowl-eye-btn absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ color: C.muted }}
          aria-label={
            show ? "Masquer le mot de passe" : "Afficher le mot de passe"
          }
        >
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
      {validate &&
        value &&
        (msg ? (
          <p
            className="gowl-fade-in flex items-center gap-1.5 text-xs mt-1.5"
            style={{ color: C.alert, fontFamily: BODY_FONT }}
          >
            <AlertTriangle size={12} className="shrink-0" /> {msg}
          </p>
        ) : (
          <p
            className="gowl-fade-in flex items-center gap-1.5 text-xs mt-1.5"
            style={{ color: C.ok, fontFamily: BODY_FONT }}
          >
            <CheckCircle2 size={12} className="shrink-0" /> Mot de passe valide
          </p>
        ))}
    </Field>
  );
}

/* ---------------------------------------------------------------------
   Conseils & Ressources — contenu qui tourne chaque jour (+ légère
   rotation automatique pendant que le panneau est ouvert)
--------------------------------------------------------------------- */
const TIP_SECTIONS = [
  {
    key: "astuce",
    label: "Astuce du jour",
    emoji: "💡",
    icon: <Lightbulb size={13} />,
    color: C.gold,
    items: [
      "Utilise toujours des mots de passe uniques avec un gestionnaire comme Bitwarden.",
      "Ne réutilise jamais le même mot de passe sur plusieurs sites.",
      "Vérifie toujours l'URL avant de saisir tes identifiants.",
      "Chiffre ton disque avec BitLocker ou LUKS pour protéger tes données.",
      "Fais des sauvegardes régulières et hors-ligne de tes fichiers importants.",
    ],
  },
  {
    key: "lab",
    label: "Lab recommandé",
    emoji: "🧪",
    icon: <FlaskConical size={13} />,
    color: C.primary,
    items: [
      "Hack The Box – Meow (débutant, prise en main Linux).",
      "TryHackMe – Pre Security (bases réseau et sécurité).",
      "Root-Me – Web-Client (fondamentaux du web).",
      "TryHackMe – Blue (exploitation Windows EternalBlue).",
      "Hack The Box – Lame (SMB & élévation de privilèges).",
    ],
  },
  {
    key: "outil",
    label: "Outil recommandé",
    emoji: "🛠️",
    icon: <Wrench size={13} />,
    color: C.ok,
    items: [
      "Nmap – scanner de ports et de services réseau.",
      "Burp Suite – proxy d'interception pour le pentest web.",
      "Wireshark – analyse fine du trafic réseau.",
      "Gobuster – brute-force de répertoires et sous-domaines.",
      "ffuf – fuzzing HTTP rapide et flexible.",
    ],
  },
  {
    key: "ressource",
    label: "Ressource du jour",
    emoji: "📚",
    icon: <BookOpen size={13} />,
    color: C.warn,
    items: [
      "OWASP Top 10 – les failles web les plus critiques à connaître.",
      "PortSwigger Web Security Academy – cours gratuit sur le pentest web.",
      "HackTricks – wiki de techniques offensives très complet.",
      "GTFOBins – techniques d'élévation de privilèges sous Linux.",
      "MITRE ATT&CK – la matrice de référence des tactiques d'attaque.",
    ],
  },
  {
    key: "defi",
    label: "Défi du jour",
    emoji: "🎯",
    icon: <Target size={13} />,
    color: C.alert,
    items: [
      "Trouve les ports ouverts d'une machine locale avec Nmap.",
      "Identifie la techno d'un serveur web avec whatweb ou curl -I.",
      "Décode une chaîne encodée en Base64 sans outil en ligne.",
      "Trouve un sous-domaine caché avec un outil de brute-force DNS.",
      "Analyse une capture réseau et retrouve un mot de passe en clair.",
    ],
  },
  {
    key: "conseil",
    label: "Conseil sécurité",
    emoji: "💬",
    icon: <Shield size={13} />,
    color: C.discord,
    items: [
      "Active l'authentification à deux facteurs (2FA) sur tes comptes importants.",
      "Ne clique jamais sur un lien suspect reçu par e-mail.",
      "Vérifie régulièrement les autorisations de tes applications connectées.",
      "Mets à jour tes systèmes et logiciels dès que possible.",
      "Méfie-toi des réseaux Wi-Fi publics non chiffrés.",
    ],
  },
];

function TipCard({ section, dayIndex }) {
  const [pos, setPos] = useState(dayIndex % section.items.length);
  useEffect(() => {
    setPos(dayIndex % section.items.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayIndex]);
  useEffect(() => {
    const delay = 9000 + Math.random() * 4000;
    const id = setInterval(() => {
      setPos((p) => (p + 1) % section.items.length);
    }, delay);
    return () => clearInterval(id);
  }, [section.items.length]);

  return (
    <div
      className="gowl-tip-card relative overflow-hidden rounded-xl px-3 py-2.5"
      style={{
        background: `${C.panel}CC`,
        border: `1px solid ${section.color}2E`,
        "--gowl-tip-accent": section.color,
      }}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <span
          className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
          style={{ background: `${section.color}1E`, color: section.color }}
        >
          {section.icon}
        </span>
        <span
          className="text-[10px] font-bold uppercase tracking-[0.18em]"
          style={{ color: section.color, fontFamily: MONO_FONT }}
        >
          {section.emoji} {section.label}
        </span>
      </div>
      <p
        key={pos}
        className="gowl-fade-in text-xs leading-snug pl-0.5"
        style={{ color: C.text, fontFamily: BODY_FONT }}
      >
        {section.items[pos]}
      </p>
    </div>
  );
}

function DiscordLogo({ size = 17 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 127.14 96.36"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
    </svg>
  );
}

function AuthWidget({
  currentUser,
  setCurrentUser,
  profiles,
  setProfiles,
  credentials,
  setCredentials,
  setTab,
}) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [forgotStep, setForgotStep] = useState("email");
  const [forgotEmail, setForgotEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [portalTarget, setPortalTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const [showPw, setShowPw] = useState({
    password: false,
    newPassword: false,
    newPasswordConfirm: false,
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
  const menuBtnRef = useRef(null);
  const resetToken = new URLSearchParams(window.location.search).get("token");

  useEffect(() => {
    if (typeof document !== "undefined") {
      setPortalTarget(document.body);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const openRegister = () => {
      setMode("register");
      openModal();
    };
    const openLogin = () => {
      setMode("login");
      openModal();
    };
    window.addEventListener("open-auth-register", openRegister);
    window.addEventListener("open-auth-login", openLogin);
    return () => {
      window.removeEventListener("open-auth-register", openRegister);
      window.removeEventListener("open-auth-login", openLogin);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") closeModal();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (menuOpen && menuBtnRef.current) {
      const r = menuBtnRef.current.getBoundingClientRect();
      setMenuPos({ top: r.bottom + 6, right: window.innerWidth - r.right });
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  function reset() {
    setEmail("");
    setPassword("");
    setBusy(false);
    setRememberMe(false);
    setForgotStep("email");
    setForgotEmail("");
    setNewPassword("");
    setNewPasswordConfirm("");
    setShowPw({
      password: false,
      newPassword: false,
      newPasswordConfirm: false,
    });
  }

  function openModal() {
    setClosing(false);
    setOpen(true);
    reset();
    setToast(null);
  }

  function closeModal() {
    if (!open || closing) return;
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
      reset();
      setToast(null);
    }, 200);
  }

  function notify(type, message) {
    setToast({ type, message });
  }

  function connectDiscord() {
    notify(
      "success",
      "La connexion via Discord arrive bientôt — utilise l'e-mail en attendant.",
    );
  }

  async function submitLogin(e) {
    e.preventDefault();

    setBusy(true);

    try {
      const result = await login({
        email: email.trim().toLowerCase(),
        password,
      });

      saveSession(result);

      notify("success", "Connexion réussie.");

      setCurrentUser(result.user);
      closeModal();
    } catch (err) {
      notify("error", err.message || "Erreur de connexion.");
    } finally {
      setBusy(false);
    }
  }

  async function submitForgotStart(e) {
    e.preventDefault();

    try {
      setBusy(true);

      await forgotPassword(forgotEmail);

      notify("success", "Email de réinitialisation envoyé.");

      setForgotStep("emailSent");
    } catch (error) {
      notify("error", error.message);
    } finally {
      setBusy(false);
    }
  }

  async function submitForgotReset(e) {
    e.preventDefault();

    if (newPassword !== newPasswordConfirm) {
      notify("error", "Les mots de passe ne correspondent pas.");

      return;
    }

    try {
      await resetPassword({
        token: resetToken,
        password: newPassword,
      });

      setForgotStep("done");
    } catch (error) {
      notify("error", error.message);
    }
  }

  async function handleResendVerification() {
    try {
      const email = localStorage.getItem("verification_email");

      if (!email) {
        throw new Error("Aucun email trouvé.");
      }

      await resendVerification(email);

      notify("success", "E-mail de vérification renvoyé.");
    } catch (error) {
      notify("error", error.message);
    }
  }

  if (currentUser) {
    return (
      <div className="relative">
        <button
          ref={menuBtnRef}
          onClick={() => setMenuOpen((v) => !v)}
          className="gowl-userchip flex items-center gap-2 rounded-lg pl-1.5 pr-2.5 py-1.5"
          style={{ background: `${C.panel2}CC`, border: `1px solid ${C.line}` }}
        >
          <Avatar profile={currentUser} size={28} />
          <span
            className="text-sm hidden sm:inline"
            style={{ color: C.text, fontFamily: BODY_FONT }}
          >
            {currentUser.username}
          </span>
          {isAdminProfile(currentUser) && <AdminBadge />}
          <ChevronDown
            size={13}
            style={{
              color: C.muted,
              transform: menuOpen ? "rotate(180deg)" : "none",
              transition: "transform 0.15s ease",
            }}
          />
        </button>
        {menuOpen &&
          typeof document !== "undefined" &&
          createPortal(
            <>
              <div
                className="fixed inset-0 z-[9998]"
                onClick={() => setMenuOpen(false)}
              />
              <div
                className="fixed w-64 max-w-[90vw] rounded-xl z-[9999] overflow-hidden gowl-fade-up"
                style={{
                  top: menuPos.top,
                  right: menuPos.right,
                  background: C.bg,
                  border: `1px solid ${C.line}`,
                  boxShadow: "0 16px 40px -12px rgba(0,0,0,0.65)",
                }}
              >
                <div
                  className="px-3.5 py-3 flex items-center gap-2.5"
                  style={{
                    borderBottom: `1px solid ${C.line}`,
                    background: C.bg,
                  }}
                >
                  <Avatar profile={currentUser} size={36} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="text-sm font-bold truncate"
                        style={{ color: C.text, fontFamily: DISPLAY_FONT }}
                      >
                        {currentUser.username}
                      </span>
                      {isAdminProfile(currentUser) && <AdminBadge />}
                    </div>
                    {currentUser.isPremium ? (
                      <span
                        className="inline-flex items-center gap-1 text-[10px] font-semibold"
                        style={{ color: C.primary, fontFamily: MONO_FONT }}
                      >
                        <Sparkles size={10} /> Premium
                      </span>
                    ) : (
                      <span
                        className="text-[10px] gowl-mono-tag"
                        style={{ color: C.muted }}
                      >
                        {currentUser.provider === "discord"
                          ? "Discord"
                          : "E-mail"}
                      </span>
                    )}
                  </div>
                </div>
                <div className="py-1.5">
                  <button
                    onClick={() => {
                      setTab("profil");
                      setMenuOpen(false);
                    }}
                    className="gowl-usermenu-item"
                  >
                    <span
                      className="gowl-usermenu-icon"
                      style={{ color: C.primary }}
                    >
                      <UserIcon size={14} />
                    </span>{" "}
                    Mon profil
                  </button>
                  <button
                    onClick={() => {
                      setTab("trophies");
                      setMenuOpen(false);
                    }}
                    className="gowl-usermenu-item"
                  >
                    <span
                      className="gowl-usermenu-icon"
                      style={{ color: C.gold }}
                    >
                      <Trophy size={14} />
                    </span>{" "}
                    Trophées
                  </button>
                  <button
                    onClick={() => {
                      setTab("boutique");
                      setMenuOpen(false);
                    }}
                    className="gowl-usermenu-item"
                  >
                    <span
                      className="gowl-usermenu-icon"
                      style={{ color: C.ok }}
                    >
                      <ShoppingCart size={14} />
                    </span>{" "}
                    Boutique
                  </button>
                  {isAdminProfile(currentUser) && (
                    <button
                      onClick={() => {
                        setTab("admin");
                        setMenuOpen(false);
                      }}
                      className="gowl-usermenu-item"
                    >
                      <span
                        className="gowl-usermenu-icon"
                        style={{ color: C.warn }}
                      >
                        <Shield size={14} />
                      </span>{" "}
                      Administration
                    </button>
                  )}
                </div>
                <div
                  className="py-1.5"
                  style={{ borderTop: `1px solid ${C.line}` }}
                >
                  <button
                    onClick={async () => {
                      setMenuOpen(false);
                      saveSession(null);
                      await clearSession();
                      setCurrentUser(null);
                    }}
                    className="gowl-usermenu-item gowl-usermenu-danger"
                  >
                    <span
                      className="gowl-usermenu-icon"
                      style={{ color: C.alert }}
                    >
                      <LogOut size={14} />
                    </span>{" "}
                    Se déconnecter
                  </button>
                </div>
              </div>
            </>,
            document.body,
          )}
      </div>
    );
  }

  return (
    <div className="relative z-[200]">
      <button
        onClick={() => (open ? closeModal() : openModal())}
        className="gowl-cta-btn inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold border"
        style={{
          background: "linear-gradient(120deg, #5B6EF5 0%, #2ED9A3 100%)",
          color: "#fff",
          borderColor: "rgba(255,255,255,0.12)",
          fontFamily: BODY_FONT,
          boxShadow: "0 8px 24px rgba(91,110,245,0.25)",
        }}
      >
        <Lock size={14} /> Connexion
      </button>
      {open &&
        portalTarget &&
        createPortal(
          <div
            className={`gowl-auth-backdrop fixed inset-0 flex items-center justify-center p-4 ${closing ? "gowl-backdrop-out" : "gowl-backdrop-in"}`}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999999,
              background: "rgba(3, 6, 12, 0.72)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              isolation: "isolate",
            }}
            onClick={closeModal}
          >
            <AuthToast toast={toast} onDone={() => setToast(null)} />
            <div
              className={`gowl-auth-panel relative w-full max-w-md rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto ${closing ? "gowl-modal-out" : "gowl-modal-in"}`}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: C.bg,
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: `1px solid ${C.line}`,
                boxShadow: `0 0 0 1px ${C.primary}14 inset, 0 32px 100px -20px rgba(0,0,0,0.85), 0 0 60px -20px ${C.primary}33`,
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at top right, ${C.primary}22, transparent 34%), radial-gradient(circle at bottom left, ${C.ok}10, transparent 36%)`,
                }}
              />
              <div className="relative">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-5 gap-3">
                    <div>
                      <div
                        className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.28em] mb-2.5"
                        style={{
                          background: `${C.primary}16`,
                          color: C.primary,
                          border: `1px solid ${C.primary}33`,
                          fontFamily: MONO_FONT,
                        }}
                      >
                        <Radio size={12} /> Portail sécurisé
                      </div>
                      <h3
                        className="text-xl sm:text-2xl font-semibold"
                        style={{ color: C.text, fontFamily: DISPLAY_FONT }}
                      >
                        {mode === "forgot"
                          ? "Réinitialiser le mot de passe"
                          : "Rejoignez la stack GowlSec"}
                      </h3>
                      <p
                        className="text-sm mt-1.5"
                        style={{ color: C.muted, fontFamily: BODY_FONT }}
                      >
                        {mode === "forgot"
                          ? "Retrouve l'accès à ton compte en quelques secondes."
                          : "Connexion fluide, inscription premium et expérience cyber startup pensée pour durer."}
                      </p>
                    </div>
                    <button
                      onClick={closeModal}
                      className="gowl-icon-btn w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: `${C.panel2}CC`,
                        color: C.muted,
                        border: `1px solid ${C.line}`,
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>

                  {mode !== "forgot" && (
                    <>
                      <div
                        className="rounded-2xl border p-3.5 mb-4 relative"
                        style={{
                          background: `${C.panel2}CC`,
                          borderColor: `${C.primary}22`,
                        }}
                      >
                        <button
                          onClick={connectDiscord}
                          className="gowl-discord-btn w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold relative"
                          style={{
                            background:
                              "linear-gradient(135deg, #5865F2 0%, #7289DA 100%)",
                            color: "#fff",
                            fontFamily: BODY_FONT,
                            boxShadow: "0 10px 24px rgba(88, 101, 242, 0.28)",
                          }}
                        >
                          <DiscordLogo size={17} />
                          <span>Continuer avec Discord</span>
                          <span className="gowl-discord-soon">Bientôt</span>
                        </button>
                        <p
                          className="text-xs mt-2.5 flex items-center gap-1.5"
                          style={{ color: C.muted, fontFamily: BODY_FONT }}
                        >
                          <Clock
                            size={12}
                            style={{ flexShrink: 0, opacity: 0.8 }}
                          />
                          Connexion Discord bientôt disponible — utilise
                          l'e-mail en attendant.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className="flex-1 h-px"
                          style={{ background: C.line }}
                        />
                        <span
                          className="text-[11px] uppercase tracking-[0.22em]"
                          style={{ color: C.muted, fontFamily: MONO_FONT }}
                        >
                          ou par e-mail
                        </span>
                        <div
                          className="flex-1 h-px"
                          style={{ background: C.line }}
                        />
                      </div>

                      <div
                        className="gowl-tab-switch relative flex gap-1 mb-4 p-1 rounded-xl"
                        style={{
                          background: `${C.panel2}CC`,
                          border: `1px solid ${C.line}`,
                        }}
                      >
                        <span
                          aria-hidden
                          className="gowl-tab-indicator absolute top-1 bottom-1 rounded-lg"
                          style={{
                            width: "calc(50% - 4px)",
                            left: mode === "login" ? 4 : "calc(50% + 0px)",
                            background:
                              "linear-gradient(120deg, #5B6EF5 0%, #2ED9A3 100%)",
                          }}
                        />
                        <button
                          onClick={() => setMode("login")}
                          className="relative z-[1] flex-1 text-xs py-1.8 rounded-lg transition-colors duration-200"
                          style={{
                            color: mode === "login" ? "#fff" : C.muted,
                            fontFamily: BODY_FONT,
                          }}
                        >
                          Connexion
                        </button>
                        <button
                          onClick={() => setMode("register")}
                          className="relative z-[1] flex-1 text-xs py-1.8 rounded-lg transition-colors duration-200"
                          style={{
                            color: mode === "register" ? "#fff" : C.muted,
                            fontFamily: BODY_FONT,
                          }}
                        >
                          Inscription
                        </button>
                      </div>
                    </>
                  )}

                  {mode === "login" ? (
                    <form
                      onSubmit={submitLogin}
                      className="space-y-2.5 gowl-fade-in"
                    >
                      <Field label="E-mail">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="root@gowlsec.fr"
                          autoComplete="email"
                          className="gowl-auth-input w-full px-3 py-2.5 rounded-xl text-sm"
                          style={{ ...inputStyle, background: `${C.panel2}CC` }}
                        />
                      </Field>
                      <PasswordField
                        label="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        show={showPw.password}
                        onToggleShow={() =>
                          setShowPw((s) => ({ ...s, password: !s.password }))
                        }
                        autoComplete="current-password"
                      />
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <label
                          className="flex items-center gap-2 text-xs cursor-pointer"
                          style={{ color: C.muted, fontFamily: BODY_FONT }}
                        >
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            style={{ accentColor: C.primary }}
                          />
                          Se souvenir de moi sur cet appareil
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setMode("forgot");
                            setForgotStep("email");
                            setForgotEmail(email);
                          }}
                          className="text-xs underline underline-offset-2 gowl-link"
                          style={{ color: C.primary, fontFamily: BODY_FONT }}
                        >
                          Mot de passe oublié ?
                        </button>
                      </div>
                      <PrimaryButton
                        type="submit"
                        disabled={busy}
                        style={{
                          background:
                            "linear-gradient(120deg, #5B6EF5 0%, #2ED9A3 100%)",
                          width: "100%",
                          justifyContent: "center",
                        }}
                      >
                        {busy ? (
                          <>
                            <Loader2 size={15} className="animate-spin" />{" "}
                            Connexion…
                          </>
                        ) : (
                          "Se connecter"
                        )}
                      </PrimaryButton>
                    </form>
                  ) : mode === "forgot" ? (
                    forgotStep === "done" ? (
                      <div className="space-y-3 gowl-fade-in">
                        <div
                          className="rounded-xl border p-3 flex items-start gap-2"
                          style={{
                            borderColor: `${C.ok}44`,
                            background: `${C.ok}12`,
                          }}
                        >
                          <CheckCircle2 size={16} color={C.ok} />
                          <p
                            className="text-sm"
                            style={{ color: C.text, fontFamily: BODY_FONT }}
                          >
                            Mot de passe mis à jour. Tu peux te reconnecter dès
                            maintenant.
                          </p>
                        </div>
                        <PrimaryButton
                          onClick={() => {
                            setMode("login");
                            setPassword("");
                          }}
                          style={{
                            background:
                              "linear-gradient(120deg, #5B6EF5 0%, #2ED9A3 100%)",
                            width: "100%",
                            justifyContent: "center",
                          }}
                        >
                          Retour à la connexion
                        </PrimaryButton>
                      </div>
                    ) : forgotStep === "email" ? (
                      <form
                        onSubmit={submitForgotStart}
                        className="space-y-2.5 gowl-fade-in"
                      >
                        <p
                          className="text-xs mb-1"
                          style={{ color: C.muted, fontFamily: BODY_FONT }}
                        >
                          Indique l'e-mail de ton compte pour recevoir un lien
                          de réinitialisation.
                        </p>
                        <Field label="E-mail du compte">
                          <input
                            type="email"
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            placeholder="toi@exemple.fr"
                            className="gowl-auth-input w-full px-3 py-2.5 rounded-xl text-sm"
                            style={{
                              ...inputStyle,
                              background: `${C.panel2}CC`,
                            }}
                          />
                        </Field>
                        <PrimaryButton
                          type="submit"
                          style={{
                            background:
                              "linear-gradient(120deg, #5B6EF5 0%, #2ED9A3 100%)",
                            width: "100%",
                            justifyContent: "center",
                          }}
                        >
                          Envoyer le lien
                        </PrimaryButton>
                        <button
                          type="button"
                          onClick={() => setMode("login")}
                          className="text-xs underline underline-offset-2 block gowl-link"
                          style={{ color: C.muted, fontFamily: BODY_FONT }}
                        >
                          Retour à la connexion
                        </button>
                      </form>
                    ) : forgotStep === "emailSent" ? (
                      <div className="space-y-3 gowl-fade-in">
                        <div
                          className="rounded-xl border p-3 flex items-start gap-2"
                          style={{
                            borderColor: `${C.ok}44`,
                            background: `${C.ok}12`,
                          }}
                        >
                          <CheckCircle2 size={16} color={C.ok} />
                          <p
                            className="text-sm"
                            style={{ color: C.text, fontFamily: BODY_FONT }}
                          >
                            Un lien de réinitialisation a été envoyé. Vérifie ta
                            boîte mail.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setMode("login")}
                          className="text-xs underline underline-offset-2 block gowl-link"
                          style={{ color: C.muted, fontFamily: BODY_FONT }}
                        >
                          Retour à la connexion
                        </button>
                      </div>
                    ) : (
                      <form
                        onSubmit={submitForgotReset}
                        className="space-y-2.5 gowl-fade-in"
                      >
                        <PasswordField
                          label="Nouveau mot de passe"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          show={showPw.newPassword}
                          onToggleShow={() =>
                            setShowPw((s) => ({
                              ...s,
                              newPassword: !s.newPassword,
                            }))
                          }
                          validate
                          autoComplete="new-password"
                        />
                        <PasswordField
                          label="Confirmer le nouveau mot de passe"
                          value={newPasswordConfirm}
                          onChange={(e) =>
                            setNewPasswordConfirm(e.target.value)
                          }
                          show={showPw.newPasswordConfirm}
                          onToggleShow={() =>
                            setShowPw((s) => ({
                              ...s,
                              newPasswordConfirm: !s.newPasswordConfirm,
                            }))
                          }
                          autoComplete="new-password"
                        />
                        <PrimaryButton
                          type="submit"
                          style={{
                            background:
                              "linear-gradient(120deg, #5B6EF5 0%, #2ED9A3 100%)",
                            width: "100%",
                            justifyContent: "center",
                          }}
                        >
                          Définir le nouveau mot de passe
                        </PrimaryButton>
                        <button
                          type="button"
                          onClick={() => setMode("login")}
                          className="text-xs underline underline-offset-2 block gowl-link"
                          style={{ color: C.muted, fontFamily: BODY_FONT }}
                        >
                          Annuler
                        </button>
                      </form>
                    )
                  ) : (
                    <div className="space-y-2.5 gowl-fade-in">
                      <Register />
                      <button
                        type="button"
                        onClick={handleResendVerification}
                        className="text-xs underline underline-offset-2 block gowl-link"
                        style={{ color: C.muted, fontFamily: BODY_FONT }}
                      >
                        Renvoyer l'e-mail de vérification
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>,
          portalTarget,
        )}
      <style>{`
        @keyframes gowl-backdrop-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes gowl-backdrop-fade-out { from { opacity: 1; } to { opacity: 0; } }
        @keyframes gowl-modal-pop-in {
          from { opacity: 0; transform: translateY(14px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes gowl-modal-pop-out {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(10px) scale(0.97); }
        }
        @keyframes gowl-toast-in { from { opacity: 0; transform: translate(-50%, -14px); } to { opacity: 1; transform: translate(-50%, 0); } }
        @keyframes gowl-fade-in-kf { from { opacity: 0; transform: translateY(-3px); } to { opacity: 1; transform: translateY(0); } }

        .gowl-backdrop-in { animation: gowl-backdrop-fade-in 0.22s ease-out both; }
        .gowl-backdrop-out { animation: gowl-backdrop-fade-out 0.2s ease-in both; }
        .gowl-modal-in { animation: gowl-modal-pop-in 0.32s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .gowl-modal-out { animation: gowl-modal-pop-out 0.2s ease-in both; }
        .gowl-toast { animation: gowl-toast-in 0.28s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .gowl-fade-in { animation: gowl-fade-in-kf 0.18s ease-out both; }

        .gowl-cta-btn { transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease; }
        .gowl-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(91,110,245,0.38); filter: brightness(1.05); }
        .gowl-cta-btn:active { transform: translateY(0); }

        .gowl-icon-btn, .gowl-eye-btn, .gowl-link, .gowl-userchip, .gowl-discord-btn, .gowl-avatar-pick, .gowl-tab-switch button {
          transition: transform 0.18s ease, background-color 0.18s ease, color 0.18s ease, opacity 0.18s ease, filter 0.18s ease, box-shadow 0.18s ease;
        }
        .gowl-icon-btn:hover { background: ${C.line}66; color: ${C.text}; transform: rotate(90deg); }
        .gowl-eye-btn:hover { background: ${C.line}77; color: ${C.text}; }
        .gowl-userchip:hover { border-color: ${C.primary}66; transform: translateY(-1px); }
        .gowl-link:hover { opacity: 0.8; }
        .gowl-discord-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 30px rgba(88,101,242,0.42); filter: brightness(1.06); }
        .gowl-discord-btn:active:not(:disabled) { transform: translateY(0); }
        .gowl-avatar-pick:hover { filter: brightness(1.15); transform: scale(1.1) !important; }

        .gowl-tab-indicator { transition: left 0.28s cubic-bezier(0.16, 1, 0.3, 1); }

        .gowl-auth-input { transition: border-color 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease; }
        .gowl-auth-input:focus { outline: none; border-color: ${C.primary}88 !important; box-shadow: 0 0 0 3px ${C.primary}22; }

        .gowl-auth-panel { will-change: transform, opacity; }
        .gowl-discord-btn { filter: saturate(0.9); transition: filter 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease; }
        .gowl-discord-btn:hover { filter: saturate(1.05) brightness(1.04); transform: translateY(-1px); box-shadow: 0 14px 30px rgba(88, 101, 242, 0.4); }
        .gowl-discord-btn:active { transform: translateY(0); }
        .gowl-discord-soon { position: absolute; top: -8px; right: -6px; font-size: 9.5px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; padding: 2px 7px; border-radius: 999px; background: ${C.warn}; color: #1a1206; box-shadow: 0 2px 6px rgba(0,0,0,0.35), 0 0 0 2px ${C.panel}; }

        .gowl-tip-card { transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease; }
        .gowl-tip-card:hover { transform: translateY(-2px); border-color: var(--gowl-tip-accent, ${C.primary})66 !important; box-shadow: 0 10px 22px -10px var(--gowl-tip-accent, ${C.primary})77; }

        @keyframes gowl-stat-glow-kf { 0%, 100% { box-shadow: 0 0 0 0 var(--gowl-stat-accent, ${C.primary})33; } 50% { box-shadow: 0 0 16px 1px var(--gowl-stat-accent, ${C.primary})33; } }
        .gowl-stat-glow { animation: gowl-stat-glow-kf 3.2s ease-in-out infinite; transition: transform 0.2s ease; }
        .gowl-stat-glow:hover { transform: translateY(-2px); }

        @media (prefers-reduced-motion: reduce) {
          .gowl-stat-glow { animation: none !important; }
          .gowl-backdrop-in, .gowl-backdrop-out, .gowl-modal-in, .gowl-modal-out, .gowl-toast, .gowl-fade-in { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function AuthSidebarInfo({ profiles }) {
  const [online, setOnline] = useState(
    () => 9 + Math.floor(Math.random() * 15),
  );
  useEffect(() => {
    const id = setInterval(() => {
      setOnline((o) =>
        Math.max(4, Math.min(40, o + (Math.random() > 0.5 ? 1 : -1))),
      );
    }, 4000);
    return () => clearInterval(id);
  }, []);
  const dayIndex = useMemo(() => dayOfYear(), []);
  return (
    <div
      className="hidden lg:flex flex-col gap-3 p-5 sm:p-6"
      style={{
        borderLeft: `1px solid rgba(255,255,255,0.06)`,
        background: `linear-gradient(180deg, ${C.panel2}CC 0%, rgba(10,12,16,0.9) 100%)`,
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        <div
          className="gowl-stat-glow rounded-2xl px-3 py-3 relative overflow-hidden"
          style={{
            border: `1px solid ${C.ok}33`,
            background: `linear-gradient(140deg, ${C.ok}14, ${C.panel2}CC)`,
            backdropFilter: "blur(10px)",
            "--gowl-stat-accent": C.ok,
          }}
        >
          <div
            className="absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(255,255,255,0.08), transparent 40%)",
            }}
          />
          <div
            className="relative flex items-center gap-1.5 mb-2"
            style={{ color: C.ok }}
          >
            <span className="gowl-live-dot" style={{ background: C.ok }} />
            <span
              className="text-[10px] uppercase tracking-[0.2em]"
              style={{ fontFamily: MONO_FONT }}
            >
              En ligne
            </span>
          </div>
          <p
            key={online}
            className="gowl-count-pop relative text-xl font-extrabold"
            style={{ color: C.text, fontFamily: DISPLAY_FONT }}
          >
            {online}
          </p>
          <p
            className="relative text-[10px] mt-1"
            style={{ color: C.muted, fontFamily: BODY_FONT }}
          >
            Utilisateur en ligne
          </p>
        </div>
        <div
          className="gowl-stat-glow rounded-2xl px-3 py-3 relative overflow-hidden"
          style={{
            border: `1px solid ${C.primary}33`,
            background: `linear-gradient(140deg, ${C.primary}14, ${C.panel2}CC)`,
            backdropFilter: "blur(10px)",
            "--gowl-stat-accent": C.primary,
          }}
        >
          <div
            className="absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(255,255,255,0.08), transparent 40%)",
            }}
          />
          <div
            className="relative flex items-center gap-1.5 mb-2"
            style={{ color: C.primary }}
          >
            <Users size={12} />
            <span
              className="text-[10px] uppercase tracking-[0.2em]"
              style={{ fontFamily: MONO_FONT }}
            >
              Membres
            </span>
          </div>
          <p
            key={profiles.length}
            className="gowl-count-pop relative text-xl font-extrabold"
            style={{ color: C.text, fontFamily: DISPLAY_FONT }}
          >
            {profiles.length}
          </p>
          <p
            className="relative text-[10px] mt-1"
            style={{ color: C.muted, fontFamily: BODY_FONT }}
          >
            comptes créés
          </p>
        </div>
      </div>
      <div>
        <span
          className="text-[10px] font-bold uppercase tracking-[0.24em] flex items-center gap-1.5 mb-2"
          style={{ color: C.muted, fontFamily: MONO_FONT }}
        >
          <Sparkles size={11} /> Conseils &amp; Ressources
        </span>
        <div className="flex flex-col gap-2">
          {TIP_SECTIONS.map((section) => (
            <TipCard key={section.key} section={section} dayIndex={dayIndex} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Profil
--------------------------------------------------------------------- */
function ProfileTab({
  currentUser,
  setCurrentUser,
  profiles,
  setProfiles,
  questions,
  trophies,
  labs = [],
  teams = [],
  messages = [],
  setTab,
}) {
  const [editing, setEditing] = useState(false);
  const [avatarKey, setAvatarKey] = useState(currentUser?.avatarKey);
  const [avatarImage, setAvatarImage] = useState(
    currentUser?.avatarImage || "",
  );
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarImgWarn, setAvatarImgWarn] = useState("");
  const [banner, setBanner] = useState(currentUser?.banner);
  const [bannerImage, setBannerImage] = useState(
    currentUser?.bannerImage || "",
  );
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerImgWarn, setBannerImgWarn] = useState("");
  const [bannerColor, setBannerColor] = useState(
    currentUser?.bannerColor || "",
  );
  const [github, setGithub] = useState(currentUser?.socials?.github || "");
  const [twitter, setTwitter] = useState(currentUser?.socials?.twitter || "");
  const [discord, setDiscord] = useState(currentUser?.socials?.discord || "");
  const [hackTheBox, setHackTheBox] = useState(
    currentUser?.platformAccounts?.hackTheBox || "",
  );
  const [rootMe, setRootMe] = useState(
    currentUser?.platformAccounts?.rootMe || "",
  );
  const [tryHackMe, setTryHackMe] = useState(
    currentUser?.platformAccounts?.tryHackMe || "",
  );
  const [otherPlatformName, setOtherPlatformName] = useState(
    currentUser?.platformAccounts?.otherName || "",
  );
  const [otherPlatformUrl, setOtherPlatformUrl] = useState(
    currentUser?.platformAccounts?.otherUrl || "",
  );
  const [certifications, setCertifications] = useState(
    Array.isArray(currentUser?.certifications)
      ? currentUser.certifications.slice(0, 12)
      : [],
  );
  const [certificationDraft, setCertificationDraft] = useState("");
  const [bio, setBio] = useState((currentUser?.bio || "").slice(0, 300));
  const [profileStatus, setProfileStatus] = useState(
    currentUser?.profileStatus || "learning",
  );
  const [specialties, setSpecialties] = useState(
    Array.isArray(currentUser?.specialties) ? currentUser.specialties : [],
  );
  const [age, setAge] = useState(currentUser?.age || "");
  const [isProfilePublic, setIsProfilePublic] = useState(
    currentUser?.isProfilePublic !== false,
  );
  const [showAge, setShowAge] = useState(currentUser?.showAge !== false);
  const [showSocials, setShowSocials] = useState(
    currentUser?.showSocials !== false,
  );
  const [showCertifications, setShowCertifications] = useState(
    currentUser?.showCertifications !== false,
  );
  const [pinnedBadges, setPinnedBadges] = useState(
    Array.isArray(currentUser?.pinnedBadges)
      ? currentUser.pinnedBadges.slice(0, 3)
      : [],
  );
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ type: "idle", message: "" });
  const [profileCtfRegistrations, setProfileCtfRegistrations] = useState({});
  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  useEffect(() => {
    if (!currentUser || editing) return;
    setProfileStatus(currentUser.profileStatus || "learning");
    setSpecialties(
      Array.isArray(currentUser.specialties) ? currentUser.specialties : [],
    );
  }, [
    currentUser?.id,
    currentUser?.profileStatus,
    currentUser?.specialties?.join("\u0000"),
    editing,
  ]);

  useEffect(() => {
    let active = true;
    loadCollection("gowlsec:ctf-registrations", {}, true).then(
      (registrations) => {
        if (active)
          setProfileCtfRegistrations(
            registrations && typeof registrations === "object"
              ? registrations
              : {},
          );
      },
    );
    return () => {
      active = false;
    };
  }, []);

  function normalizeSocialUsername(value, provider) {
    let username = (value || "").trim();

    if (provider === "github") {
      username = username.replace(/^https?:\/\/(?:www\.)?github\.com\//i, "");
    }

    if (provider === "twitter") {
      username = username.replace(
        /^https?:\/\/(?:www\.)?(?:x\.com|twitter\.com)\//i,
        "",
      );
    }

    return username.replace(/^@+/, "").split(/[/?#]/)[0].trim();
  }

  function resetProfileDraft() {
    setAvatarKey(currentUser?.avatarKey);
    setAvatarImage(currentUser?.avatarImage || "");
    setAvatarFile(null);
    setAvatarImgWarn("");
    setBanner(currentUser?.banner);
    setBannerImage(currentUser?.bannerImage || "");
    setBannerFile(null);
    setBannerImgWarn("");
    setBannerColor(currentUser?.bannerColor || "");
    setGithub(currentUser?.socials?.github || "");
    setTwitter(currentUser?.socials?.twitter || "");
    setDiscord(currentUser?.socials?.discord || "");
    setHackTheBox(currentUser?.platformAccounts?.hackTheBox || "");
    setRootMe(currentUser?.platformAccounts?.rootMe || "");
    setTryHackMe(currentUser?.platformAccounts?.tryHackMe || "");
    setOtherPlatformName(currentUser?.platformAccounts?.otherName || "");
    setOtherPlatformUrl(currentUser?.platformAccounts?.otherUrl || "");
    setCertifications(
      Array.isArray(currentUser?.certifications)
        ? currentUser.certifications.slice(0, 12)
        : [],
    );
    setCertificationDraft("");
    setBio((currentUser?.bio || "").slice(0, 300));
    setProfileStatus(currentUser?.profileStatus || "learning");
    setSpecialties(
      Array.isArray(currentUser?.specialties) ? currentUser.specialties : [],
    );
    setAge(currentUser?.age || "");
    setIsProfilePublic(currentUser?.isProfilePublic !== false);
    setShowAge(currentUser?.showAge !== false);
    setShowSocials(currentUser?.showSocials !== false);
    setShowCertifications(currentUser?.showCertifications !== false);
    setPinnedBadges(
      Array.isArray(currentUser?.pinnedBadges)
        ? currentUser.pinnedBadges.slice(0, 3)
        : [],
    );
    setSaveStatus({ type: "idle", message: "" });
  }

  function toggleProfileEditor() {
    if (editing) resetProfileDraft();
    setEditing((isEditing) => !isEditing);
  }

  function addCertification() {
    const clean = certificationDraft.trim().slice(0, 80);
    if (!clean || certifications.some((item) => item.toLowerCase() === clean.toLowerCase()))
      return;
    setCertifications((current) => [...current, clean].slice(0, 12));
    setCertificationDraft("");
    setSaveStatus({ type: "idle", message: "" });
  }

  function openProfileImagePicker(type) {
    setEditing(true);
    setSaveStatus({ type: "idle", message: "" });
    const input =
      type === "avatar" ? avatarInputRef.current : bannerInputRef.current;
    input?.click();
  }

  function handleProfileImage(event, type) {
    const file = event.target.files?.[0];
    if (!file) return;

    const setWarning = type === "avatar" ? setAvatarImgWarn : setBannerImgWarn;

    if (!PROFILE_IMAGE_TYPES.includes(file.type)) {
      setWarning("Format refusé. Utilise une image PNG, JPG ou WebP.");
      event.target.value = "";
      return;
    }

    if (file.size > PROFILE_IMAGE_MAX_SIZE) {
      setWarning("Cette image dépasse la limite de 5 Mo.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const preview = typeof reader.result === "string" ? reader.result : "";

      if (type === "avatar") {
        setAvatarFile(file);
        setAvatarImage(preview);
        setAvatarImgWarn("");
      } else {
        setBannerFile(file);
        setBannerImage(preview);
        setBannerColor("");
        setBannerImgWarn("");
      }

      setSaveStatus({ type: "idle", message: "" });
    };
    reader.onerror = () => setWarning("Impossible de lire cette image.");
    reader.readAsDataURL(file);
  }

  if (!currentUser) {
    return (
      <div className="max-w-sm mx-auto text-center py-16">
        <UserIcon
          size={28}
          className="mx-auto mb-3"
          style={{ color: C.primary }}
        />
        <h2
          className="text-lg font-bold mb-2"
          style={{ color: C.text, fontFamily: DISPLAY_FONT }}
        >
          Pas encore connecté
        </h2>
        <p
          className="text-sm"
          style={{ color: C.muted, fontFamily: BODY_FONT }}
        >
          Connecte-toi (e-mail ou Discord) pour créer et voir ton profil.
        </p>
      </div>
    );
  }

  const myQuestions = questions.filter(
    (q) => q.author === currentUser.username,
  ).length;
  const myTrophies = trophies.filter(
    (t) => t.author === currentUser.username,
  ).length;
  const bannerCss = bannerImage
    ? `url(${resolveProfileImageUrl(bannerImage)}) center/cover no-repeat`
    : bannerColor
      ? `linear-gradient(135deg, ${bannerColor}, ${shadeColor(bannerColor, -35)})`
      : BANNER_MAP[banner] || "transparent";
  const socials = currentUser.socials || {};
  const platformAccounts =
    currentUser.platformAccounts || EMPTY_PLATFORM_ACCOUNTS;

  const myPoints = useMemo(
    () => computeUserPoints(currentUser.username, questions, trophies, labs),
    [currentUser.username, questions, trophies, labs],
  );
  const levelInfo = useMemo(() => getLevelInfo(myPoints), [myPoints]);
  const isMaxLevel = !levelInfo.next;

  const myActivity = useMemo(() => {
    const items = [
      ...questions
        .filter((q) => q.author === currentUser.username)
        .map((q) => ({
          kind: "question",
          id: q.id,
          text: `a posé la question « ${q.title} »`,
          createdAt: q.createdAt,
          tab: "forum",
        })),
      ...trophies
        .filter((t) => t.author === currentUser.username)
        .map((t) => ({
          kind: "trophy",
          id: t.id,
          text: `a débloqué le trophée ${t.platform} — ${t.title}`,
          createdAt: t.createdAt,
          tab: "trophies",
        })),
      ...teams
        .filter((t) => t.owner === currentUser.username)
        .map((t) => ({
          kind: "team",
          id: t.id,
          text: `a créé la team ${t.name}`,
          createdAt: t.createdAt,
          tab: "equipes",
        })),
      ...labs
        .filter((l) => l.owner === currentUser.username)
        .map((l) => ({
          kind: "lab",
          id: l.id,
          text: `a ouvert le salon lab ${l.title}`,
          createdAt: l.createdAt,
          tab: "labs",
        })),
      ...messages
        .filter((m) => m.author === currentUser.username)
        .slice(-15)
        .map((m) => ({
          kind: "message",
          id: m.id,
          text: `a discuté sur le Hub`,
          createdAt: m.createdAt,
          tab: "salons",
        })),
    ];
    return items
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);
  }, [currentUser.username, questions, trophies, teams, labs, messages]);

  const profileBadges = useMemo(() => {
    const username = currentUser.username;
    const myAnswers = questions.reduce(
      (count, question) =>
        count +
        (question.answers || []).filter((answer) => answer.author === username)
          .length,
      0,
    );
    const myOwnedLabs = labs.filter((lab) => lab.owner === username);
    const myTrophyItems = trophies.filter(
      (trophy) => trophy.author === username,
    );
    const ctfParticipationCount = Object.values(profileCtfRegistrations).filter(
      (registrations) =>
        Array.isArray(registrations) &&
        registrations.some((entry) => entry.username === username),
    ).length;
    const webSignals = myTrophyItems.filter((trophy) =>
      /web|portswigger|pentesterlab|xss|sql|api/i.test(
        `${trophy.platform} ${trophy.title} ${trophy.note || ""}`,
      ),
    ).length;
    const networkSignals = [
      ...myTrophyItems.map(
        (trophy) => `${trophy.platform} ${trophy.title} ${trophy.note || ""}`,
      ),
      ...myOwnedLabs.map(
        (lab) => `${lab.title} ${lab.platform || ""} ${lab.description || ""}`,
      ),
    ].filter((value) =>
      /réseau|network|active directory|windows|linux|tcp|udp|dns|smb/i.test(
        value,
      ),
    ).length;
    const rankedUsers = Array.from(
      new Set([...profiles.map((profile) => profile.username), username]),
    )
      .map((name) => ({
        name,
        points: computeUserPoints(name, questions, trophies, labs),
      }))
      .sort((a, b) => b.points - a.points);
    const rank = rankedUsers.findIndex((entry) => entry.name === username) + 1;

    const backendBadges = Array.isArray(currentUser.badges)
      ? currentUser.badges
      : [];
    return [
      ...(currentUser.isFounder
        ? [
            {
              key: "founder",
              label: "Fondateur",
              description: "Fondateur officiel de GowlSec",
              icon: Crown,
              color: "#8BE9FD",
              unlocked: true,
              progress: "Unique",
            },
          ]
        : []),
      {
        key: "first-ctf",
        label: "Premier CTF",
        description: "Participer à un premier CTF",
        icon: Flag,
        color: C.gold,
        unlocked: ctfParticipationCount >= 1,
        progress: `${Math.min(ctfParticipationCount, 1)}/1`,
      },
      {
        key: "mentor",
        label: "Mentor",
        description: "Publier au moins 3 réponses",
        icon: Users,
        color: C.ok,
        unlocked: myAnswers >= 3,
        progress: `${Math.min(myAnswers, 3)}/3`,
      },
      {
        key: "web-hacker",
        label: "Web Hacker",
        description: "Valider 2 réussites orientées web",
        icon: Bug,
        color: C.alert,
        unlocked: webSignals >= 2,
        progress: `${Math.min(webSignals, 2)}/2`,
      },
      {
        key: "network",
        label: "Réseau",
        description: "Valider 2 activités réseau",
        icon: Wifi,
        color: C.primary,
        unlocked: networkSignals >= 2,
        progress: `${Math.min(networkSignals, 2)}/2`,
      },
      {
        key: "top-10",
        label: "Top 10",
        description: "Entrer dans le Top 10 GowlSec",
        icon: Crown,
        color: C.warn,
        unlocked: myPoints > 0 && rank > 0 && rank <= 10,
        progress: myPoints > 0 ? `#${rank}` : "0 pt",
      },
    ].map((badge) => {
      const backendBadge = backendBadges.find((item) => item.key === badge.key);
      return backendBadge
        ? {
            ...badge,
            ...backendBadge,
            icon: badge.icon,
            color: backendBadge.color || badge.color,
          }
        : badge;
    });
  }, [
    currentUser.username,
    currentUser.isFounder,
    currentUser.badges,
    profiles,
    questions,
    trophies,
    labs,
    myPoints,
    profileCtfRegistrations,
  ]);

  async function save() {
    if (saving || avatarImgWarn || bannerImgWarn) return;

    const githubUsername = normalizeSocialUsername(github, "github");
    const twitterUsername = normalizeSocialUsername(twitter, "twitter");
    const cleanBio = bio.trim().slice(0, 300);
    const formData = new FormData();

    formData.append("bio", cleanBio);
    formData.append("github", githubUsername);
    formData.append("twitter", twitterUsername);
    formData.append("discord", discord.trim());
    formData.append("hackTheBox", hackTheBox.trim());
    formData.append("rootMe", rootMe.trim());
    formData.append("tryHackMe", tryHackMe.trim());
    formData.append("otherPlatformName", otherPlatformName.trim());
    formData.append("otherPlatformUrl", otherPlatformUrl.trim());
    formData.append("certifications", JSON.stringify(certifications.slice(0, 12)));
    formData.append("avatarKey", avatarKey || "bird");
    formData.append("bannerKey", banner || "indigo");
    formData.append("bannerColor", bannerColor.trim());
    formData.append("profileStatus", profileStatus);
    formData.append("specialties", JSON.stringify(specialties));
    formData.append("age", age ? String(age) : "");
    formData.append("isProfilePublic", String(isProfilePublic));
    formData.append("showAge", String(showAge));
    formData.append("showSocials", String(showSocials));
    formData.append("showCertifications", String(showCertifications));
    formData.append("pinnedBadges", JSON.stringify(pinnedBadges.slice(0, 3)));
    formData.append("removeAvatar", String(!avatarFile && !avatarImage));
    formData.append("removeBanner", String(!bannerFile && !bannerImage));
    if (avatarFile) formData.append("avatar", avatarFile);
    if (bannerFile) formData.append("banner", bannerFile);

    setSaving(true);
    setSaveStatus({ type: "loading", message: "Enregistrement en cours..." });

    try {
      const savedProfile = await updateProfileRequest(formData);
      const updated = {
        ...currentUser,
        ...(savedProfile || {}),
        avatarKey: savedProfile?.avatarKey || avatarKey,
        avatarImage:
          savedProfile?.avatarImage || savedProfile?.avatarUrl || avatarImage,
        banner: savedProfile?.banner || savedProfile?.bannerKey || banner,
        bannerImage:
          savedProfile?.bannerImage || savedProfile?.bannerUrl || bannerImage,
        bannerColor: savedProfile?.bannerColor ?? bannerColor.trim(),
        bio: savedProfile?.bio ?? cleanBio,
        profileStatus: savedProfile?.profileStatus ?? profileStatus,
        specialties: savedProfile?.specialties ?? specialties,
        age: savedProfile?.age ?? (age ? Number(age) : null),
        isProfilePublic: savedProfile?.isProfilePublic ?? isProfilePublic,
        showAge: savedProfile?.showAge ?? showAge,
        showSocials: savedProfile?.showSocials ?? showSocials,
        showCertifications:
          savedProfile?.showCertifications ?? showCertifications,
        pinnedBadges: savedProfile?.pinnedBadges || pinnedBadges.slice(0, 3),
        socials: savedProfile?.socials || {
          github: githubUsername,
          twitter: twitterUsername,
          discord: discord.trim(),
        },
        platformAccounts: savedProfile?.platformAccounts || {
          hackTheBox: hackTheBox.trim(),
          rootMe: rootMe.trim(),
          tryHackMe: tryHackMe.trim(),
          otherName: otherPlatformName.trim(),
          otherUrl: otherPlatformUrl.trim(),
        },
        certifications:
          savedProfile?.certifications || certifications.slice(0, 12),
      };
      const profileExists = profiles.some(
        (profile) => profile.id === currentUser.id,
      );
      const next = profileExists
        ? profiles.map((profile) =>
            profile.id === currentUser.id ? updated : profile,
          )
        : [...profiles, updated];

      setGithub(updated.socials?.github || "");
      setTwitter(updated.socials?.twitter || "");
      setDiscord(updated.socials?.discord || "");
      setHackTheBox(updated.platformAccounts?.hackTheBox || "");
      setRootMe(updated.platformAccounts?.rootMe || "");
      setTryHackMe(updated.platformAccounts?.tryHackMe || "");
      setOtherPlatformName(updated.platformAccounts?.otherName || "");
      setOtherPlatformUrl(updated.platformAccounts?.otherUrl || "");
      setCertifications(updated.certifications || []);
      setProfileStatus(updated.profileStatus || "learning");
      setSpecialties(
        Array.isArray(updated.specialties) ? updated.specialties : [],
      );
      setAvatarImage(updated.avatarImage || "");
      setBannerImage(updated.bannerImage || "");
      setAvatarFile(null);
      setBannerFile(null);
      setProfiles(next);
      setCurrentUser(updated);
      await saveCollection("gowlsec:profiles", next);
      setSaveStatus({
        type: "success",
        message: "Profil mis à jour avec succès.",
      });
      setEditing(false);
    } catch (error) {
      setSaveStatus({
        type: "error",
        message: error.message || "Impossible d’enregistrer le profil.",
      });
    } finally {
      setSaving(false);
    }
  }

  const joinedValid =
    currentUser.joinedAt &&
    !Number.isNaN(new Date(currentUser.joinedAt).getTime());
  const badgeCount = profileBadges.filter((badge) => badge.unlocked).length;
  const activityStreak =
    Number(currentUser.currentStreak ?? currentUser.activityStreak ?? 0) || 0;
  const statusMeta =
    PROFILE_STATUSES.find(
      (item) =>
        item.key ===
        (editing ? profileStatus : currentUser.profileStatus || profileStatus),
    ) || PROFILE_STATUSES[1];
  const displayedSpecialties = editing
    ? specialties
    : Array.isArray(currentUser.specialties)
      ? currentUser.specialties
      : [];
  const visiblePinnedBadges = profileBadges.filter(
    (badge) =>
      (currentUser.pinnedBadges || pinnedBadges).includes(badge.key) &&
      badge.unlocked,
  );

  return (
    <div className="max-w-6xl mx-auto">
      <input
        ref={avatarInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onClick={(event) => {
          event.currentTarget.value = "";
        }}
        onChange={(event) => handleProfileImage(event, "avatar")}
      />
      <input
        ref={bannerInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onClick={(event) => {
          event.currentTarget.value = "";
        }}
        onChange={(event) => handleProfileImage(event, "banner")}
      />

      <div
        className={`grid gap-5 items-start ${editing ? "xl:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)]" : "max-w-2xl mx-auto"}`}
      >
        <div className="min-w-0">
          <Panel
            className="overflow-hidden mb-4 gowl-profile-card"
            style={{
              border: `1px solid ${levelInfo.level.color}3D`,
              background: `${C.panel}E8`,
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="relative h-24 sm:h-32 w-full overflow-hidden">
              <button
                type="button"
                onClick={() => openProfileImagePicker("banner")}
                className="group block h-full w-full relative overflow-hidden text-left gowl-profile-banner-picker"
                style={{ background: "transparent" }}
                aria-label="Modifier la bannière"
              >
                <div
                  className="absolute inset-0"
                  style={{ background: bannerCss }}
                />
                <span
                  aria-hidden
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${levelInfo.level.color}33, transparent 70%)`,
                    filter: "blur(6px)",
                  }}
                />
                <span
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(#ffffff1c 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                    opacity: 0.3,
                    maskImage:
                      "linear-gradient(180deg, black, transparent 88%)",
                  }}
                />
                <span
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(180deg, transparent 30%, rgba(8,10,14,0.6) 100%)`,
                  }}
                />
                <span className="gowl-profile-banner-overlay absolute inset-0 flex items-center justify-center">
                  <span
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold"
                    style={{
                      color: "#fff",
                      background: "rgba(5,10,16,0.78)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      fontFamily: BODY_FONT,
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <Camera size={14} /> Modifier la bannière
                  </span>
                </span>
                {isAdminProfile(currentUser) && (
                  <span
                    className="absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase gowl-mono-tag"
                    style={{
                      background: `${C.bg}B0`,
                      color: C.gold,
                      border: `1px solid ${C.gold}55`,
                    }}
                  >
                    <Cpu size={11} /> Admin
                  </span>
                )}
              </button>

              <label
                className="group absolute z-20 bottom-2 right-2 inline-flex items-center gap-2 rounded-lg px-2.5 py-2 cursor-pointer overflow-hidden"
                style={{
                  color: "#fff",
                  background: "rgba(5,10,16,0.82)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontFamily: BODY_FONT,
                  backdropFilter: "blur(8px)",
                }}
                title="Changer la couleur de la bannière"
              >
                <Pipette size={13} aria-hidden />
                <span className="hidden sm:inline text-[11px] font-semibold">
                  Couleur
                </span>
                <span
                  className="w-4 h-4 rounded-md shrink-0"
                  style={{
                    background: bannerColor || "#5B6EF5",
                    border: "1px solid rgba(255,255,255,0.35)",
                  }}
                />
                <input
                  type="color"
                  value={bannerColor || "#5B6EF5"}
                  onChange={(event) => {
                    setEditing(true);
                    setBannerColor(event.target.value);
                    setBannerImage("");
                    setBannerFile(null);
                    setBannerImgWarn("");
                    setSaveStatus({ type: "idle", message: "" });
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  aria-label="Choisir la couleur de la bannière"
                />
              </label>
            </div>

            <div className="px-4 sm:px-5 pb-4 relative z-30">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 -mt-8">
                <div className="flex items-end gap-3">
                  <button
                    type="button"
                    onClick={() => openProfileImagePicker("avatar")}
                    className="group relative shrink-0 rounded-full flex items-center justify-center gowl-profile-avatar-picker"
                    style={{
                      width: 64,
                      height: 64,
                      padding: 0,
                      border: 0,
                      background: "transparent",
                      lineHeight: 1,
                    }}
                    aria-label="Modifier la photo de profil"
                  >
                    <div
                      className="rounded-full p-[2px]"
                      style={{
                        background: `conic-gradient(${levelInfo.level.color} ${levelInfo.pct * 3.6}deg, ${C.line} 0deg)`,
                        boxShadow: `0 6px 16px -8px ${levelInfo.level.color}CC`,
                      }}
                    >
                      <div
                        className="rounded-full p-[2px]"
                        style={{ background: "#0A0C10" }}
                      >
                        <Avatar
                          profile={{ avatarKey, avatarImage }}
                          size={56}
                        />
                      </div>
                    </div>
                    <span
                      className="gowl-profile-avatar-overlay absolute inset-[4px] rounded-full flex flex-col items-center justify-center text-center pointer-events-none"
                      style={{
                        color: "#fff",
                        background: "rgba(5,10,16,0.78)",
                        lineHeight: 1,
                      }}
                    >
                      <Camera size={14} />
                      <span
                        className="text-[8px] font-bold uppercase mt-0.5"
                        style={{ fontFamily: MONO_FONT }}
                      >
                        Modifier
                      </span>
                    </span>
                    <span
                      className="absolute bottom-1 right-1 w-3 h-3 rounded-full gowl-live-dot"
                      style={{ background: C.ok, border: `2px solid #0A0C10` }}
                      title="En ligne"
                    />
                    {isMaxLevel && (
                      <span
                        className="absolute -top-1 -left-1 w-5 h-5 rounded-full flex items-center justify-center gowl-count-pop"
                        style={{
                          background: "#0A0C10",
                          border: `1.5px solid ${levelInfo.level.color}`,
                          color: levelInfo.level.color,
                          boxShadow: `0 4px 10px -3px ${levelInfo.level.color}AA`,
                        }}
                        title="Niveau maximum"
                      >
                        <Crown size={10} />
                      </span>
                    )}
                  </button>
                  <div className="pb-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap relative z-30">
                      <h2
                        className="text-lg font-extrabold leading-tight gowl-profile-name relative z-30"
                        style={{
                          fontFamily: DISPLAY_FONT,
                          backgroundImage: `linear-gradient(90deg, ${C.text}, ${levelInfo.level.color})`,
                        }}
                      >
                        {currentUser.username}
                      </h2>
                      {currentUser.isFounder && <FounderBadge />}
                      {isAdminProfile(currentUser) && <AdminBadge />}
                      {currentUser.customRole && (
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold"
                          style={{
                            color: C.gold,
                            background: `${C.gold}12`,
                            border: `1px solid ${C.gold}35`,
                            fontFamily: MONO_FONT,
                          }}
                        >
                          <Shield size={9} /> {currentUser.customRole}
                        </span>
                      )}
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold gowl-streak"
                        style={{
                          color: activityStreak ? C.warn : C.muted,
                          background: activityStreak ? `${C.warn}16` : C.panel2,
                          border: `1px solid ${activityStreak ? `${C.warn}45` : C.line}`,
                          fontFamily: MONO_FONT,
                        }}
                        title={`${activityStreak} jour${activityStreak > 1 ? "s" : ""} d’activité consécutive`}
                      >
                        <Flame
                          size={11}
                          fill={activityStreak ? C.warn : "none"}
                        />{" "}
                        {activityStreak}
                      </span>
                    </div>
                    <p
                      className="text-[11px] mt-0.5"
                      style={{ color: C.muted, fontFamily: MONO_FONT }}
                    >
                      Membre depuis{" "}
                      {joinedValid
                        ? timeAgo(currentUser.joinedAt)
                        : "peu de temps"}{" "}
                      ·{" "}
                      {currentUser.provider === "discord"
                        ? "Discord"
                        : "E-mail"}
                    </p>
                  </div>
                </div>
                <GhostButton onClick={toggleProfileEditor}>
                  <Pencil size={12} />{" "}
                  {editing ? "Annuler" : "Modifier le profil"}
                </GhostButton>
              </div>

              <div className="flex items-center gap-2 flex-wrap mt-2.5">
                <span
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold"
                  style={{
                    color: statusMeta.color,
                    background: `${statusMeta.color}14`,
                    border: `1px solid ${statusMeta.color}40`,
                    fontFamily: MONO_FONT,
                  }}
                >
                  <Circle size={7} fill={statusMeta.color} /> {statusMeta.label}
                </span>
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase gowl-mono-tag"
                  style={{
                    background: `${levelInfo.level.color}1A`,
                    color: levelInfo.level.color,
                    border: `1px solid ${levelInfo.level.color}44`,
                  }}
                >
                  <Gauge size={10} /> Niveau {levelInfo.level.label}
                </span>
                {currentUser.isPremium && (
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase"
                    style={{
                      background: `${C.primary}1A`,
                      color: C.primary,
                      border: `1px solid ${C.primary}44`,
                      fontFamily: MONO_FONT,
                    }}
                  >
                    <Sparkles size={10} /> Premium
                    {currentUser.premiumUntil && (
                      <span className="opacity-80 normal-case font-normal">
                        · jusqu'au{" "}
                        {new Date(currentUser.premiumUntil).toLocaleDateString(
                          "fr-FR",
                        )}
                      </span>
                    )}
                  </span>
                )}
                {badgeCount === 0 && !currentUser.bio && (
                  <span
                    className="text-[11px]"
                    style={{ color: C.muted, fontFamily: BODY_FONT }}
                  >
                    Aucun badge pour l'instant — continue à participer pour
                    progresser.
                  </span>
                )}
              </div>

              {currentUser.bio && (
                <p
                  className="text-xs mt-2 max-w-xl leading-relaxed"
                  style={{ color: C.text, fontFamily: BODY_FONT }}
                >
                  {currentUser.bio}
                </p>
              )}

              <div className="grid grid-cols-2 gap-2 mt-3">
                <ProfileStat
                  icon={<Trophy size={13} />}
                  label="trophées"
                  value={myTrophies}
                  accent={C.gold}
                />
                <ProfileStat
                  icon={<Zap size={13} />}
                  label="points"
                  value={myPoints}
                  accent={C.ok}
                />
              </div>

              {displayedSpecialties.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {displayedSpecialties.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 rounded-md text-[9px]"
                      style={{
                        color: C.primary,
                        background: `${C.primary}12`,
                        border: `1px solid ${C.primary}30`,
                        fontFamily: MONO_FONT,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
              {visiblePinnedBadges.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {visiblePinnedBadges.map((badge) => (
                    <span
                      key={badge.key}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[9px]"
                      style={{
                        color: badge.color,
                        background: `${badge.color}12`,
                        border: `1px solid ${badge.color}35`,
                        fontFamily: MONO_FONT,
                      }}
                    >
                      <Pin size={9} /> {badge.label}
                    </span>
                  ))}
                </div>
              )}

              <div
                className="mt-3 rounded-xl p-3 gowl-profile-badges"
                style={{ background: C.panel2, border: `1px solid ${C.line}` }}
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div>
                    <span
                      className="text-[9px] uppercase tracking-[0.16em] font-bold"
                      style={{ color: C.gold, fontFamily: MONO_FONT }}
                    >
                      Collection
                    </span>
                    <h3
                      className="text-sm font-bold mt-0.5"
                      style={{ color: C.text, fontFamily: DISPLAY_FONT }}
                    >
                      Badges de profil
                    </h3>
                  </div>
                  <span
                    className="text-[10px] px-2 py-1 rounded-full"
                    style={{
                      color: badgeCount ? C.ok : C.muted,
                      background: badgeCount ? `${C.ok}12` : C.bg,
                      border: `1px solid ${badgeCount ? `${C.ok}35` : C.line}`,
                      fontFamily: MONO_FONT,
                    }}
                  >
                    {badgeCount}/{profileBadges.length} obtenu
                    {badgeCount > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {profileBadges.map((badge) => {
                    const BadgeIcon = badge.icon;
                    return (
                      <div
                        key={badge.key}
                        className={`gowl-profile-badge ${badge.unlocked ? "is-unlocked" : "is-locked"}`}
                        style={{ "--badge-color": badge.color }}
                      >
                        <span className="gowl-profile-badge-icon">
                          <BadgeIcon size={15} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-1.5">
                            <span
                              className="text-[11px] font-bold truncate"
                              style={{
                                color: badge.unlocked ? C.text : C.muted,
                                fontFamily: DISPLAY_FONT,
                              }}
                            >
                              {badge.label}
                            </span>
                            {badge.unlocked && (
                              <CheckCircle2
                                size={10}
                                style={{ color: badge.color }}
                              />
                            )}
                          </span>
                          <span
                            className="block text-[9px] mt-0.5 truncate"
                            style={{ color: C.muted, fontFamily: BODY_FONT }}
                          >
                            {badge.description}
                          </span>
                        </span>
                        <span
                          className="text-[9px] shrink-0"
                          style={{
                            color: badge.unlocked ? badge.color : C.muted,
                            fontFamily: MONO_FONT,
                          }}
                        >
                          {badge.progress}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div
                className="mt-2.5 p-2.5 rounded-lg gowl-glass relative overflow-hidden"
                style={{ border: `1px solid ${levelInfo.level.color}44` }}
              >
                <span className="gowl-inner-line" />
                <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                  <span
                    className="text-[11px] font-bold uppercase tracking-wide flex items-center gap-1.5"
                    style={{
                      color: levelInfo.level.color,
                      fontFamily: MONO_FONT,
                    }}
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${levelInfo.level.color}22` }}
                    >
                      <Gauge size={10} />
                    </span>
                    Niveau {levelInfo.level.label}
                  </span>
                  <span
                    className="text-[10px]"
                    style={{ color: C.muted, fontFamily: MONO_FONT }}
                  >
                    {levelInfo.next
                      ? `${levelInfo.pointsToNext} pts avant ${levelInfo.next.label}`
                      : "Niveau maximum atteint"}
                  </span>
                </div>
                <div
                  className="w-full h-2 rounded-full overflow-hidden"
                  style={{ background: C.bg }}
                >
                  <div
                    className="h-full rounded-full gowl-bar-fill"
                    style={{
                      width: `${levelInfo.pct}%`,
                      background: `linear-gradient(90deg, ${levelInfo.level.color}99, ${levelInfo.level.color})`,
                    }}
                  />
                </div>
              </div>

              <div
                className="flex flex-wrap gap-2 mt-3 pt-3"
                style={{ borderTop: `1px solid ${C.line}` }}
              >
                {socials.github ? (
                  <a
                    href={
                      socials.github.startsWith("http")
                        ? socials.github
                        : `https://github.com/${socials.github.replace(/^@/, "")}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs gowl-social-link"
                    style={{
                      border: `1px solid ${C.line}`,
                      color: C.text,
                      fontFamily: BODY_FONT,
                    }}
                  >
                    <GitHubIcon size={13} /> GitHub
                  </a>
                ) : (
                  !editing && (
                    <GhostButton onClick={() => setEditing(true)}>
                      <GitHubIcon size={12} /> Ajouter GitHub
                    </GhostButton>
                  )
                )}
                {socials.twitter ? (
                  <a
                    href={
                      socials.twitter.startsWith("http")
                        ? socials.twitter
                        : `https://x.com/${socials.twitter.replace(/^@/, "")}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs gowl-social-link"
                    style={{
                      border: `1px solid ${C.line}`,
                      color: C.text,
                      fontFamily: BODY_FONT,
                    }}
                  >
                    <XIcon size={13} /> X (Twitter)
                  </a>
                ) : (
                  !editing && (
                    <GhostButton onClick={() => setEditing(true)}>
                      <XIcon size={12} /> Ajouter X
                    </GhostButton>
                  )
                )}
                {socials.discord && (
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs"
                    style={{
                      border: `1px solid ${C.line}`,
                      color: C.text,
                      fontFamily: BODY_FONT,
                    }}
                  >
                    <MessageCircle size={13} /> {socials.discord}
                  </span>
                )}
                {[
                  {
                    key: "hackTheBox",
                    label: "Hack The Box",
                    value: platformAccounts.hackTheBox,
                    icon: Target,
                    color: C.ok,
                  },
                  {
                    key: "rootMe",
                    label: "Root-Me",
                    value: platformAccounts.rootMe,
                    icon: Skull,
                    color: C.alert,
                  },
                  {
                    key: "tryHackMe",
                    label: "TryHackMe",
                    value: platformAccounts.tryHackMe,
                    icon: Zap,
                    color: C.warn,
                  },
                ]
                  .filter((item) => item.value)
                  .map(({ key, label, value, icon: PlatformIcon, color }) => (
                    <a
                      key={key}
                      href={getPlatformProfileUrl(key, value)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs gowl-social-link"
                      style={{ color, border: `1px solid ${color}44` }}
                    >
                      <PlatformIcon size={12} /> {label}
                    </a>
                  ))}
                {platformAccounts.otherName && platformAccounts.otherUrl && (
                  <a
                    href={platformAccounts.otherUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs gowl-social-link"
                    style={{ color: C.primary, border: `1px solid ${C.primary}44` }}
                  >
                    <ExternalLink size={12} /> {platformAccounts.otherName}
                  </a>
                )}
              </div>
              {(currentUser.certifications || []).length > 0 && (
                <div
                  className="mt-3 pt-3"
                  style={{ borderTop: `1px solid ${C.line}` }}
                >
                  <span
                    className="text-[10px] uppercase tracking-wider flex items-center gap-1.5 mb-2"
                    style={{ color: C.gold, fontFamily: MONO_FONT }}
                  >
                    <Award size={11} /> Certifications affichées
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentUser.certifications.map((certification) => (
                      <span
                        key={certification}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px]"
                        style={{
                          color: C.gold,
                          background: `${C.gold}10`,
                          border: `1px solid ${C.gold}35`,
                          fontFamily: MONO_FONT,
                        }}
                      >
                        <Award size={10} /> {certification}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Panel>

          {!editing && saveStatus.type === "success" && (
            <div
              className="mb-4 rounded-xl px-3.5 py-3 flex items-center gap-2.5 gowl-fade-in"
              style={{
                color: C.ok,
                background: `${C.ok}0F`,
                border: `1px solid ${C.ok}33`,
              }}
            >
              <CheckCircle2 size={14} />
              <span className="text-xs" style={{ fontFamily: BODY_FONT }}>
                {saveStatus.message}
              </span>
            </div>
          )}

          <Panel className="p-4 mb-6 gowl-glass">
            <div className="flex items-center gap-2 mb-3">
              <Activity size={14} style={{ color: C.ok }} />
              <span
                className="text-xs font-bold uppercase tracking-wide gowl-mono-tag"
                style={{ color: C.muted }}
              >
                Fil d'activité
              </span>
            </div>
            {myActivity.length === 0 ? (
              <EmptyState
                text="Aucune activité pour l'instant — pose une question, ajoute un trophée ou ouvre un salon lab."
                icon={<Activity size={20} />}
                accent={C.ok}
              />
            ) : (
              <div className="relative gowl-timeline">
                {myActivity.map((item) => {
                  const meta =
                    ACTIVITY_META[item.kind] || ACTIVITY_META.question;
                  const MetaIcon = meta.Icon;
                  return (
                    <button
                      key={`${item.kind}-${item.id}`}
                      onClick={() => setTab(item.tab)}
                      className="flex items-center gap-2.5 w-full text-left px-2.5 py-2 rounded-md gowl-activity-row mb-1.5"
                      style={{
                        background: C.panel2,
                        borderLeft: `2px solid ${meta.color}66`,
                      }}
                    >
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          background: `${meta.color}22`,
                          color: meta.color,
                        }}
                      >
                        <MetaIcon size={13} />
                      </span>
                      <p
                        className="text-xs truncate flex-1"
                        style={{ color: C.text, fontFamily: BODY_FONT }}
                      >
                        {item.text}
                      </p>
                      <span
                        className="text-[10px] shrink-0 gowl-mono-tag"
                        style={{ color: C.muted }}
                      >
                        {timeAgo(item.createdAt)}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </Panel>
        </div>

        {editing && (
          <aside className="min-w-0 xl:sticky xl:top-28">
            <Panel
              className="overflow-hidden mb-6 gowl-profile-editor"
              style={{
                borderColor: `${C.primary}3D`,
                background: `${C.panel}F5`,
              }}
            >
              <div
                className="px-4 sm:px-5 py-4 flex items-center justify-between gap-3"
                style={{
                  borderBottom: `1px solid ${C.line}`,
                  background: `linear-gradient(135deg, ${C.primary}18, ${C.ok}08 58%, transparent)`,
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: `${C.primary}1F`,
                      color: C.primary,
                      border: `1px solid ${C.primary}33`,
                    }}
                  >
                    <Pencil size={15} />
                  </span>
                  <div>
                    <h3
                      className="text-sm font-bold"
                      style={{ color: C.text, fontFamily: DISPLAY_FONT }}
                    >
                      Personnaliser mon profil
                    </h3>
                    <p
                      className="text-[11px] mt-0.5"
                      style={{ color: C.muted, fontFamily: BODY_FONT }}
                    >
                      Les informations enregistrées seront visibles par la
                      communauté.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={toggleProfileEditor}
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    color: C.muted,
                    background: C.panel2,
                    border: `1px solid ${C.line}`,
                  }}
                  aria-label="Fermer"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="p-4 sm:p-5 space-y-5">
                <section>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <label
                      htmlFor="profile-bio"
                      className="text-[11px] font-bold uppercase tracking-wider"
                      style={{ color: C.text, fontFamily: MONO_FONT }}
                    >
                      À propos de moi
                    </label>
                    <span
                      className="text-[10px]"
                      style={{
                        color: bio.length >= 280 ? C.warn : C.muted,
                        fontFamily: MONO_FONT,
                      }}
                    >
                      {bio.length}/300
                    </span>
                  </div>
                  <textarea
                    id="profile-bio"
                    value={bio}
                    onChange={(event) => {
                      setBio(event.target.value.slice(0, 300));
                      setSaveStatus({ type: "idle", message: "" });
                    }}
                    rows={4}
                    maxLength={300}
                    placeholder="Présente ton parcours, tes spécialités, les CTF que tu pratiques ou tes objectifs..."
                    className="w-full px-3.5 py-3 rounded-xl text-sm resize-none gowl-profile-input"
                    style={{
                      ...inputStyle,
                      lineHeight: 1.6,
                      background: "rgba(5,10,16,0.82)",
                    }}
                  />
                </section>

                <section
                  className="rounded-xl p-3.5 space-y-4"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: `1px solid ${C.line}`,
                  }}
                >
                  <div>
                    <h4
                      className="text-[11px] font-bold uppercase tracking-wider"
                      style={{ color: C.text, fontFamily: MONO_FONT }}
                    >
                      Statut et spécialités
                    </h4>
                    <p className="text-[11px] mt-1" style={{ color: C.muted }}>
                      Aide les membres à savoir comment collaborer avec toi.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    {PROFILE_STATUSES.map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        aria-pressed={profileStatus === item.key}
                        onClick={() => {
                          setProfileStatus(item.key);
                          setSaveStatus({ type: "idle", message: "" });
                        }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-left"
                        style={{
                          color:
                            profileStatus === item.key ? item.color : C.muted,
                          background:
                            profileStatus === item.key
                              ? `${item.color}14`
                              : C.panel2,
                          border: `1px solid ${profileStatus === item.key ? `${item.color}55` : C.line}`,
                        }}
                      >
                        <Circle
                          size={8}
                          fill={
                            profileStatus === item.key
                              ? item.color
                              : "transparent"
                          }
                        />{" "}
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <div>
                    <span
                      className="block text-[10px] uppercase tracking-wide mb-2"
                      style={{ color: C.muted, fontFamily: MONO_FONT }}
                    >
                      Mes spécialités
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {PROFILE_SPECIALTIES.map((skill) => {
                        const active = specialties.includes(skill);
                        return (
                          <button
                            key={skill}
                            type="button"
                            aria-pressed={active}
                            onClick={() => {
                              setSpecialties((current) =>
                                active
                                  ? current.filter((item) => item !== skill)
                                  : [...current, skill],
                              );
                              setSaveStatus({ type: "idle", message: "" });
                            }}
                            className="px-2 py-1 rounded-md text-[10px]"
                            style={{
                              color: active ? C.ok : C.muted,
                              background: active ? `${C.ok}12` : C.panel2,
                              border: `1px solid ${active ? `${C.ok}40` : C.line}`,
                              fontFamily: MONO_FONT,
                            }}
                          >
                            {skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <label className="block">
                    <span
                      className="block text-[10px] uppercase tracking-wide mb-1.5"
                      style={{ color: C.muted, fontFamily: MONO_FONT }}
                    >
                      Âge (facultatif)
                    </span>
                    <input
                      type="number"
                      min="13"
                      max="100"
                      value={age}
                      onChange={(event) => setAge(event.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-sm"
                      style={{
                        ...inputStyle,
                        background: "rgba(5,10,16,0.82)",
                      }}
                      placeholder="Ex. 22"
                    />
                  </label>
                </section>

                <section
                  className="rounded-xl p-3.5"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: `1px solid ${C.line}`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Lock size={13} style={{ color: C.primary }} />
                    <h4
                      className="text-[11px] font-bold uppercase tracking-wider"
                      style={{ color: C.text, fontFamily: MONO_FONT }}
                    >
                      Confidentialité
                    </h4>
                  </div>
                  {[
                    [
                      "Profil visible publiquement",
                      isProfilePublic,
                      setIsProfilePublic,
                    ],
                    ["Afficher mon âge", showAge, setShowAge],
                    ["Afficher mes réseaux", showSocials, setShowSocials],
                    [
                      "Afficher mes certifications",
                      showCertifications,
                      setShowCertifications,
                    ],
                  ].map(([label, value, setter]) => (
                    <label
                      key={label}
                      className="flex items-center justify-between gap-3 py-2 text-xs"
                      style={{
                        color: C.text,
                        borderTop: `1px solid ${C.line}`,
                      }}
                    >
                      <span>{label}</span>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(event) => setter(event.target.checked)}
                        className="accent-green-500"
                      />
                    </label>
                  ))}
                </section>

                <section
                  className="rounded-xl p-3.5"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: `1px solid ${C.line}`,
                  }}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div>
                      <h4
                        className="text-[11px] font-bold uppercase tracking-wider"
                        style={{ color: C.text, fontFamily: MONO_FONT }}
                      >
                        Badges épinglés
                      </h4>
                      <p
                        className="text-[10px] mt-1"
                        style={{ color: C.muted }}
                      >
                        Choisis jusqu’à 3 badges obtenus.
                      </p>
                    </div>
                    <span
                      className="text-[10px]"
                      style={{
                        color: pinnedBadges.length === 3 ? C.warn : C.muted,
                        fontFamily: MONO_FONT,
                      }}
                    >
                      {pinnedBadges.length}/3
                    </span>
                  </div>
                  <div className="grid gap-2">
                    {profileBadges
                      .filter((badge) => badge.unlocked)
                      .map((badge) => {
                        const active = pinnedBadges.includes(badge.key);
                        return (
                          <button
                            type="button"
                            key={badge.key}
                            onClick={() =>
                              setPinnedBadges((current) =>
                                active
                                  ? current.filter((key) => key !== badge.key)
                                  : current.length < 3
                                    ? [...current, badge.key]
                                    : current,
                              )
                            }
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-left"
                            style={{
                              color: active ? badge.color : C.muted,
                              background: active
                                ? `${badge.color}12`
                                : C.panel2,
                              border: `1px solid ${active ? `${badge.color}45` : C.line}`,
                            }}
                          >
                            <Pin size={11} /> {badge.label}
                          </button>
                        );
                      })}
                  </div>
                </section>

                {(avatarImgWarn || bannerImgWarn) && (
                  <div
                    className="rounded-lg px-3 py-2 flex items-start gap-2"
                    style={{
                      color: C.alert,
                      background: `${C.alert}0F`,
                      border: `1px solid ${C.alert}33`,
                    }}
                  >
                    <AlertTriangle size={13} className="mt-0.5 shrink-0" />
                    <p
                      className="text-[11px]"
                      style={{ fontFamily: BODY_FONT }}
                    >
                      {avatarImgWarn || bannerImgWarn}
                    </p>
                  </div>
                )}

                <section>
                  <div className="mb-3">
                    <h4
                      className="text-[11px] font-bold uppercase tracking-wider"
                      style={{ color: C.text, fontFamily: MONO_FONT }}
                    >
                      Présence en ligne
                    </h4>
                    <p
                      className="text-[11px] mt-1"
                      style={{ color: C.muted, fontFamily: BODY_FONT }}
                    >
                      Indique uniquement tes noms d’utilisateur. Les liens sont
                      générés automatiquement.
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <label
                      className="gowl-profile-social-field rounded-xl p-3"
                      style={{
                        background: "rgba(255,255,255,0.025)",
                        border: `1px solid ${C.line}`,
                      }}
                    >
                      <span className="flex items-center gap-2 mb-2">
                        <span
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{
                            color: C.text,
                            background: "rgba(255,255,255,0.06)",
                          }}
                        >
                          <GitHubIcon size={14} />
                        </span>
                        <span>
                          <span
                            className="block text-xs font-semibold"
                            style={{ color: C.text, fontFamily: BODY_FONT }}
                          >
                            GitHub
                          </span>
                          <span
                            className="block text-[10px]"
                            style={{ color: C.muted, fontFamily: MONO_FONT }}
                          >
                            github.com/ton-pseudo
                          </span>
                        </span>
                      </span>
                      <div
                        className="flex items-center rounded-lg overflow-hidden"
                        style={{
                          background: "rgba(5,10,16,0.82)",
                          border: `1px solid ${C.line}`,
                        }}
                      >
                        <span
                          className="hidden sm:block px-3 text-[11px] shrink-0"
                          style={{ color: C.muted, fontFamily: MONO_FONT }}
                        >
                          github.com/
                        </span>
                        <input
                          value={github}
                          onChange={(event) => {
                            setGithub(event.target.value);
                            setSaveStatus({ type: "idle", message: "" });
                          }}
                          placeholder="ton-pseudo"
                          className="w-full min-w-0 px-3 py-2.5 text-sm bg-transparent outline-none"
                          style={{ color: C.text, fontFamily: BODY_FONT }}
                        />
                      </div>
                    </label>

                    <label
                      className="gowl-profile-social-field rounded-xl p-3"
                      style={{
                        background: "rgba(255,255,255,0.025)",
                        border: `1px solid ${C.line}`,
                      }}
                    >
                      <span className="flex items-center gap-2 mb-2">
                        <span
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{
                            color: C.text,
                            background: "rgba(255,255,255,0.06)",
                          }}
                        >
                          <XIcon size={14} />
                        </span>
                        <span>
                          <span
                            className="block text-xs font-semibold"
                            style={{ color: C.text, fontFamily: BODY_FONT }}
                          >
                            X / Twitter
                          </span>
                          <span
                            className="block text-[10px]"
                            style={{ color: C.muted, fontFamily: MONO_FONT }}
                          >
                            x.com/ton-pseudo
                          </span>
                        </span>
                      </span>
                      <div
                        className="flex items-center rounded-lg overflow-hidden"
                        style={{
                          background: "rgba(5,10,16,0.82)",
                          border: `1px solid ${C.line}`,
                        }}
                      >
                        <span
                          className="px-3 text-[11px] shrink-0"
                          style={{ color: C.muted, fontFamily: MONO_FONT }}
                        >
                          @
                        </span>
                        <input
                          value={twitter}
                          onChange={(event) => {
                            setTwitter(event.target.value);
                            setSaveStatus({ type: "idle", message: "" });
                          }}
                          placeholder="ton-pseudo"
                          className="w-full min-w-0 px-1 pr-3 py-2.5 text-sm bg-transparent outline-none"
                          style={{ color: C.text, fontFamily: BODY_FONT }}
                        />
                      </div>
                    </label>

                    <label
                      className="gowl-profile-social-field rounded-xl p-3"
                      style={{
                        background: "rgba(255,255,255,0.025)",
                        border: `1px solid ${C.discord}33`,
                      }}
                    >
                      <span className="flex items-center gap-2 mb-2">
                        <span
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{
                            color: C.discord,
                            background: `${C.discord}18`,
                          }}
                        >
                          <DiscordLogo size={14} />
                        </span>
                        <span>
                          <span
                            className="block text-xs font-semibold"
                            style={{ color: C.text, fontFamily: BODY_FONT }}
                          >
                            Discord
                          </span>
                          <span
                            className="block text-[10px]"
                            style={{ color: C.muted, fontFamily: MONO_FONT }}
                          >
                            Nom affiché uniquement, sans faux lien
                          </span>
                        </span>
                      </span>
                      <input
                        value={discord}
                        onChange={(event) => {
                          setDiscord(event.target.value.slice(0, 80));
                          setSaveStatus({ type: "idle", message: "" });
                        }}
                        maxLength={80}
                        placeholder="ton nom d’utilisateur Discord"
                        className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                        style={{
                          ...inputStyle,
                          background: "rgba(5,10,16,0.82)",
                        }}
                      />
                    </label>
                  </div>
                </section>

                <section
                  className="rounded-xl p-3.5 space-y-4"
                  style={{
                    background: `linear-gradient(145deg, ${C.primary}0B, rgba(255,255,255,0.02))`,
                    border: `1px solid ${C.primary}30`,
                  }}
                >
                  <div>
                    <h4
                      className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-2"
                      style={{ color: C.text, fontFamily: MONO_FONT }}
                    >
                      <Target size={13} style={{ color: C.primary }} /> Profils cybersécurité
                    </h4>
                    <p className="text-[11px] mt-1" style={{ color: C.muted }}>
                      Ajoute tes identifiants publics. Les liens de profil sont générés automatiquement.
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      {
                        label: "Hack The Box",
                        hint: "ID de profil HTB",
                        value: hackTheBox,
                        setter: setHackTheBox,
                        icon: Target,
                        color: C.ok,
                      },
                      {
                        label: "Root-Me",
                        hint: "nom d’utilisateur Root-Me",
                        value: rootMe,
                        setter: setRootMe,
                        icon: Skull,
                        color: C.alert,
                      },
                      {
                        label: "TryHackMe",
                        hint: "nom d’utilisateur TryHackMe",
                        value: tryHackMe,
                        setter: setTryHackMe,
                        icon: Zap,
                        color: C.warn,
                      },
                    ].map(({ label, hint, value, setter, icon: PlatformIcon, color }) => (
                      <label key={label} className="block">
                        <span
                          className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide mb-1.5"
                          style={{ color, fontFamily: MONO_FONT }}
                        >
                          <PlatformIcon size={11} /> {label}
                        </span>
                        <input
                          value={value}
                          maxLength={80}
                          onChange={(event) => setter(event.target.value.slice(0, 80))}
                          placeholder={hint}
                          className="w-full px-3 py-2.5 rounded-lg text-sm"
                          style={{ ...inputStyle, background: "rgba(5,10,16,0.82)" }}
                        />
                      </label>
                    ))}
                  </div>
                  <div className="grid sm:grid-cols-[0.7fr_1.3fr] gap-3">
                    <label className="block">
                      <span
                        className="block text-[10px] uppercase tracking-wide mb-1.5"
                        style={{ color: C.muted, fontFamily: MONO_FONT }}
                      >
                        Autre plateforme
                      </span>
                      <input
                        value={otherPlatformName}
                        maxLength={60}
                        onChange={(event) => setOtherPlatformName(event.target.value.slice(0, 60))}
                        placeholder="Ex. PortSwigger Academy"
                        className="w-full px-3 py-2.5 rounded-lg text-sm"
                        style={{ ...inputStyle, background: "rgba(5,10,16,0.82)" }}
                      />
                    </label>
                    <label className="block">
                      <span
                        className="block text-[10px] uppercase tracking-wide mb-1.5"
                        style={{ color: C.muted, fontFamily: MONO_FONT }}
                      >
                        Lien du profil
                      </span>
                      <input
                        type="url"
                        value={otherPlatformUrl}
                        maxLength={300}
                        onChange={(event) => setOtherPlatformUrl(event.target.value.slice(0, 300))}
                        placeholder="https://…"
                        className="w-full px-3 py-2.5 rounded-lg text-sm"
                        style={{ ...inputStyle, background: "rgba(5,10,16,0.82)" }}
                      />
                    </label>
                  </div>
                </section>

                <section
                  className="rounded-xl p-3.5"
                  style={{
                    background: `linear-gradient(145deg, ${C.gold}0C, rgba(255,255,255,0.02))`,
                    border: `1px solid ${C.gold}30`,
                  }}
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div>
                      <h4
                        className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-2"
                        style={{ color: C.text, fontFamily: MONO_FONT }}
                      >
                        <Award size={13} style={{ color: C.gold }} /> Certifications
                      </h4>
                      <p className="text-[10px] mt-1" style={{ color: C.muted }}>
                        OSCP, eJPT, CPTS, CEH… jusqu’à 12 certifications.
                      </p>
                    </div>
                    <span className="text-[10px]" style={{ color: C.gold, fontFamily: MONO_FONT }}>
                      {certifications.length}/12
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      value={certificationDraft}
                      maxLength={80}
                      onChange={(event) => setCertificationDraft(event.target.value.slice(0, 80))}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          addCertification();
                        }
                      }}
                      placeholder="Ex. eJPTv2 — INE Security"
                      className="flex-1 min-w-0 px-3 py-2.5 rounded-lg text-sm"
                      style={{ ...inputStyle, background: "rgba(5,10,16,0.82)" }}
                    />
                    <button
                      type="button"
                      onClick={addCertification}
                      disabled={!certificationDraft.trim() || certifications.length >= 12}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold disabled:opacity-40"
                      style={{ color: C.gold, border: `1px solid ${C.gold}55`, background: `${C.gold}12` }}
                    >
                      <Plus size={12} /> Ajouter
                    </button>
                  </div>
                  {certifications.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {certifications.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px]"
                          style={{ color: C.gold, background: `${C.gold}12`, border: `1px solid ${C.gold}38`, fontFamily: MONO_FONT }}
                        >
                          <Award size={10} /> {item}
                          <button
                            type="button"
                            onClick={() => setCertifications((current) => current.filter((certification) => certification !== item))}
                            aria-label={`Retirer ${item}`}
                            style={{ color: C.muted }}
                          >
                            <X size={10} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </section>

                {saveStatus.type !== "idle" && (
                  <div
                    className="rounded-xl px-3.5 py-3 flex items-center gap-2.5"
                    style={{
                      color:
                        saveStatus.type === "error"
                          ? C.alert
                          : saveStatus.type === "success"
                            ? C.ok
                            : C.primary,
                      background:
                        saveStatus.type === "error"
                          ? `${C.alert}0F`
                          : saveStatus.type === "success"
                            ? `${C.ok}0F`
                            : `${C.primary}0F`,
                      border: `1px solid ${saveStatus.type === "error" ? C.alert : saveStatus.type === "success" ? C.ok : C.primary}33`,
                    }}
                  >
                    {saveStatus.type === "loading" ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : saveStatus.type === "success" ? (
                      <CheckCircle2 size={14} />
                    ) : (
                      <AlertTriangle size={14} />
                    )}
                    <span className="text-xs" style={{ fontFamily: BODY_FONT }}>
                      {saveStatus.message}
                    </span>
                  </div>
                )}

                <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={toggleProfileEditor}
                    disabled={saving}
                    className="px-4 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50"
                    style={{
                      color: C.muted,
                      background: C.panel2,
                      border: `1px solid ${C.line}`,
                      fontFamily: BODY_FONT,
                    }}
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    onClick={save}
                    disabled={saving || !!avatarImgWarn || !!bannerImgWarn}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed gowl-profile-save"
                    style={{
                      color: "#04120D",
                      background: C.ok,
                      border: `1px solid ${C.ok}`,
                      boxShadow: `0 10px 24px -12px ${C.ok}CC`,
                      fontFamily: BODY_FONT,
                    }}
                  >
                    {saving ? (
                      <Loader2 size={15} className="animate-spin" />
                    ) : (
                      <CheckCircle2 size={15} />
                    )}
                    {saving
                      ? "Enregistrement..."
                      : "Enregistrer les modifications"}
                  </button>
                </div>
              </div>
            </Panel>
          </aside>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Bandeau d'actus (défilement auto, sans images)
--------------------------------------------------------------------- */
function NewsMarquee({ news }) {
  if (news.length === 0) return null;
  const loop = [...news, ...news];
  return (
    <div
      className="rounded-lg relative overflow-hidden gowl-news-marquee"
      style={{ border: `1px solid ${C.line}`, background: C.bg }}
    >
      <style>{`
        @keyframes gowl-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .gowl-marquee-track { animation: gowl-marquee 40s linear infinite; }
        .gowl-marquee-track:hover { animation-play-state: paused; }
        .gowl-marquee-item { transition: background 0.15s ease; }
        .gowl-marquee-item:hover { background: ${C.panel2} !important; }
      `}</style>
      <div
        className="flex items-center gap-2 px-3 py-1.5 shrink-0 relative z-10"
        style={{ borderBottom: `1px solid ${C.line}`, background: `${C.bg}F0` }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full gowl-cursor-blink"
          style={{ background: C.alert }}
        />
        <span
          className="text-[10px] font-bold uppercase tracking-[0.18em]"
          style={{ color: C.alert, fontFamily: MONO_FONT }}
        >
          En direct
        </span>
        <span
          className="text-[10px]"
          style={{ color: C.muted, fontFamily: MONO_FONT }}
        >
          · flux CTFNews GowlSec
        </span>
      </div>
      <div className="flex gowl-marquee-track" style={{ width: "max-content" }}>
        {loop.map((n, i) => {
          const cat =
            NEWS_CATEGORIES.find((c) => c.key === n.category) ||
            NEWS_CATEGORIES[3];
          const CatIcon = cat.icon;
          return (
            <div
              key={`${n.id}-${i}`}
              className="flex items-center gap-3 px-4 py-2.5 shrink-0 gowl-marquee-item"
              style={{ width: 340, borderRight: `1px solid ${C.line}` }}
            >
              <div
                className="w-9 h-9 rounded-md flex items-center justify-center shrink-0"
                style={{
                  background: `${cat.color}1A`,
                  color: cat.color,
                  border: `1px solid ${cat.color}33`,
                }}
              >
                <CatIcon size={15} />
              </div>
              <div className="min-w-0">
                <Chip label={cat.label} color={cat.color} />
                <p
                  className="text-xs mt-1 truncate"
                  style={{ color: C.text, fontFamily: BODY_FONT }}
                >
                  {n.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------
   News
--------------------------------------------------------------------- */
function NewsCard({ item, isAdmin, onDelete }) {
  const cat =
    NEWS_CATEGORIES.find((c) => c.key === item.category) || NEWS_CATEGORIES[3];
  const CatIcon = cat.icon;
  return (
    <Panel
      className="overflow-hidden flex flex-col h-full gowl-news-card"
      style={{ borderColor: `${cat.color}33` }}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{
          background: `linear-gradient(90deg, ${cat.color}, transparent)`,
        }}
      />
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{
                background: `${cat.color}1A`,
                color: cat.color,
                border: `1px solid ${cat.color}33`,
              }}
            >
              <CatIcon size={14} />
            </span>
            <div className="min-w-0">
              <Chip label={cat.label} color={cat.color} />
            </div>
          </div>
          {isAdmin && !item.external && (
            <button
              onClick={() => onDelete(item.id)}
              className="gowl-news-delete shrink-0 w-6 h-6 rounded-md flex items-center justify-center"
              style={{ color: C.muted }}
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
        <h3
          className="text-sm font-semibold mb-1.5 leading-snug"
          style={{ color: C.text, fontFamily: DISPLAY_FONT }}
        >
          {item.title}
        </h3>
        <p
          className="text-sm flex-1 leading-relaxed whitespace-pre-line"
          style={{
            color: C.muted,
            fontFamily: BODY_FONT,
            display: "-webkit-box",
            WebkitLineClamp: 9,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {item.summary}
        </p>
        <div
          className="mt-3 pt-2.5 flex items-center justify-between gap-2"
          style={{ borderTop: `1px solid ${C.line}` }}
        >
          <span
            className="text-[11px] truncate"
            style={{ color: C.muted, fontFamily: MONO_FONT }}
          >
            {item.ref} · {item.source} · {timeAgo(item.date)}
          </span>
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-xs font-semibold shrink-0"
              style={{ color: cat.color, fontFamily: BODY_FONT }}
            >
              Lire <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>
    </Panel>
  );
}

function calendarDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function ctfEventsForCalendarDay(events, day) {
  const dayStart = new Date(day.getFullYear(), day.getMonth(), day.getDate());
  const dayEnd = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);

  return events.filter((event) => {
    const start = new Date(event.start || event.date);
    if (Number.isNaN(start.getTime())) return false;

    const parsedFinish = new Date(event.finish);
    const finish =
      Number.isNaN(parsedFinish.getTime()) || parsedFinish <= start
        ? new Date(start.getTime() + 60 * 1000)
        : parsedFinish;

    return start < dayEnd && finish > dayStart;
  });
}

function ctfDurationHours(event) {
  const start = new Date(event.start || event.date).getTime();
  const finish = new Date(event.finish).getTime();
  if (Number.isNaN(start) || Number.isNaN(finish) || finish <= start) return 0;
  return Math.round((finish - start) / 3600000);
}

function ctfDifficulty(event) {
  const explicit = String(event.difficulty || "").toLowerCase();
  if (/début|easy|beginner/.test(explicit)) return "Débutant";
  if (/avanc|hard|expert/.test(explicit)) return "Avancé";
  if (/inter|medium/.test(explicit)) return "Intermédiaire";
  const weight = Number(event.weight || 0);
  if (weight >= 50) return "Avancé";
  if (weight > 0 && weight <= 20) return "Débutant";
  return "Intermédiaire";
}

function ctfCountdownLabel(event, now = Date.now()) {
  const start = new Date(event.start || event.date).getTime();
  const finish = new Date(event.finish).getTime();
  if (Number.isNaN(start)) return "Date à confirmer";
  if (!Number.isNaN(finish) && now >= start && now <= finish)
    return "En direct maintenant";
  if (!Number.isNaN(finish) && now > finish) return "CTF terminé";
  const diff = start - now;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.max(0, Math.floor((diff % 3600000) / 60000));
  if (days > 0) return `Début dans ${days} j ${hours} h`;
  if (hours > 0) return `Début dans ${hours} h ${minutes} min`;
  return `Début dans ${minutes} min`;
}

const CTF_CALENDAR_COLORS = {
  surface: "#1D2D3E",
  surfaceRaised: "#24384D",
  control: "#2B4057",
  controlHover: "#334B64",
  border: "#405873",
  text: "#F1F6FB",
  muted: "#A8BACB",
  outside: "#1A2938",
  hasCtf:
    "linear-gradient(145deg, rgba(32, 211, 159, 0.22), rgba(32, 211, 159, 0.10)), #24384D",
  hasCtfSelected:
    "linear-gradient(145deg, rgba(32, 211, 159, 0.34), rgba(32, 211, 159, 0.16)), #294457",
  noCtf:
    "linear-gradient(145deg, rgba(224, 91, 116, 0.16), rgba(224, 91, 116, 0.07)), #29394B",
  noCtfSelected:
    "linear-gradient(145deg, rgba(224, 91, 116, 0.26), rgba(224, 91, 116, 0.12)), #324154",
};

function NewsTab({
  news,
  setNews,
  isAdmin,
  profiles = [],
  notifications = [],
  setNotifications,
  full,
  currentUser = null,
  teams = [],
  setTab,
}) {
  const [filter, setFilter] = useState("Tous");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState(NEWS_CATEGORIES[0].key);
  const [source, setSource] = useState("");
  const [url, setUrl] = useState("");
  const [recipient, setRecipient] = useState("");
  const today = new Date();
  const [calendarMonth, setCalendarMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(() =>
    calendarDateKey(today),
  );
  const [selectedCtfId, setSelectedCtfId] = useState(null);
  const [ctfFilters, setCtfFilters] = useState({
    difficulty: "Tous",
    format: "Tous",
    duration: "Tous",
    participants: "Tous",
    reward: "Tous",
  });
  const [ctfRegistrations, setCtfRegistrations] = useState({});
  const [ctfResults, setCtfResults] = useState({});
  const [selectedTeam, setSelectedTeam] = useState("");
  const [ctfActionMessage, setCtfActionMessage] = useState("");
  const [resultDraft, setResultDraft] = useState({
    team: "",
    rank: "",
    highlight: "",
  });
  const [clockNow, setClockNow] = useState(Date.now());
  const didAutoFocusCtf = useRef(false);

  useEffect(() => {
    let active = true;
    Promise.all([
      loadCollection("gowlsec:ctf-registrations", {}, true),
      loadCollection("gowlsec:ctf-results", {}, true),
    ]).then(([registrations, results]) => {
      if (!active) return;
      setCtfRegistrations(
        registrations && typeof registrations === "object" ? registrations : {},
      );
      setCtfResults(results && typeof results === "object" ? results : {});
    });
    const timer = setInterval(() => setClockNow(Date.now()), 60000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, []);

  const ctfEvents = useMemo(
    () =>
      news
        .filter(
          (item) => item.external && String(item.id).startsWith("ctftime-"),
        )
        .sort(
          (a, b) => new Date(a.start || a.date) - new Date(b.start || b.date),
        ),
    [news],
  );

  useEffect(() => {
    if (didAutoFocusCtf.current || ctfEvents.length === 0) return;
    const now = Date.now();
    const nextEvent =
      ctfEvents.find((event) => {
        const finish = new Date(
          event.finish || event.start || event.date,
        ).getTime();
        return !Number.isNaN(finish) && finish >= now;
      }) || ctfEvents[0];
    const start = new Date(nextEvent.start || nextEvent.date);
    if (!Number.isNaN(start.getTime())) {
      didAutoFocusCtf.current = true;
      setCalendarMonth(new Date(start.getFullYear(), start.getMonth(), 1));
      setSelectedCalendarDay(calendarDateKey(start));
      setSelectedCtfId(nextEvent.id);
    }
  }, [ctfEvents]);

  useEffect(() => {
    if (ctfEvents.length === 0) return;
    let active = true;
    const eventIds = ctfEvents.map((event) => event.id).join(",");
    apiRequest(`/api/ctf-community?eventIds=${encodeURIComponent(eventIds)}`)
      .then((data) => {
        if (!active) return;
        const registrationMap = {};
        (data.registrations || []).forEach((entry) => {
          if (!registrationMap[entry.eventId])
            registrationMap[entry.eventId] = [];
          registrationMap[entry.eventId].push(entry);
        });
        const resultMap = {};
        (data.results || []).forEach((entry) => {
          if (!resultMap[entry.eventId]) resultMap[entry.eventId] = [];
          resultMap[entry.eventId].push(entry);
        });
        setCtfRegistrations(registrationMap);
        setCtfResults(resultMap);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [ctfEvents]);

  const formatOptions = useMemo(
    () =>
      Array.from(
        new Set(ctfEvents.map((event) => event.format || "CTF")),
      ).slice(0, 12),
    [ctfEvents],
  );

  const filteredCtfEvents = useMemo(
    () =>
      ctfEvents.filter((event) => {
        const difficulty = ctfDifficulty(event);
        const duration = ctfDurationHours(event);
        const participantCount =
          Number(event.participantCount || 0) +
          (ctfRegistrations[event.id]?.length || 0);
        const hasReward = Boolean(
          event.reward || Number(event.weight || 0) > 0,
        );

        if (
          ctfFilters.difficulty !== "Tous" &&
          difficulty !== ctfFilters.difficulty
        )
          return false;
        if (
          ctfFilters.format !== "Tous" &&
          (event.format || "CTF") !== ctfFilters.format
        )
          return false;
        if (ctfFilters.duration === "24h max" && (!duration || duration > 24))
          return false;
        if (
          ctfFilters.duration === "Week-end" &&
          (duration <= 24 || duration > 72)
        )
          return false;
        if (ctfFilters.duration === "Long" && duration <= 72) return false;
        if (
          ctfFilters.participants === "Moins de 100" &&
          participantCount >= 100
        )
          return false;
        if (
          ctfFilters.participants === "100 à 500" &&
          (participantCount < 100 || participantCount > 500)
        )
          return false;
        if (ctfFilters.participants === "500+" && participantCount < 500)
          return false;
        if (ctfFilters.reward === "Avec récompense" && !hasReward) return false;
        return true;
      }),
    [ctfEvents, ctfFilters, ctfRegistrations],
  );

  const ctfOverview = useMemo(() => {
    const now = Date.now();
    const monthStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      1,
    ).getTime();
    const monthEnd = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1,
    ).getTime();
    const normalized = ctfEvents
      .map((event) => {
        const start = new Date(event.start || event.date).getTime();
        const rawFinish = new Date(event.finish).getTime();
        const finish = Number.isNaN(rawFinish) ? start : rawFinish;
        return { event, start, finish };
      })
      .filter(({ start }) => !Number.isNaN(start));

    const live = normalized.filter(
      ({ start, finish }) => start <= now && finish >= now,
    );
    const upcoming = normalized.filter(({ start }) => start > now);
    const thisMonth = normalized.filter(
      ({ start, finish }) => start < monthEnd && finish >= monthStart,
    );

    return {
      live,
      upcoming,
      thisMonth,
      next: live[0]?.event || upcoming[0]?.event || null,
    };
  }, [ctfEvents]);

  const calendarDays = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const leadingDays = (firstDay.getDay() + 6) % 7;
    const totalDays = new Date(year, month + 1, 0).getDate();
    const visibleDays = Math.ceil((leadingDays + totalDays) / 7) * 7;

    return Array.from(
      { length: visibleDays },
      (_, index) => new Date(year, month, index - leadingDays + 1),
    );
  }, [calendarMonth]);

  const selectedDayDate = useMemo(() => {
    const parsed = new Date(`${selectedCalendarDay}T00:00:00`);
    return Number.isNaN(parsed.getTime()) ? today : parsed;
  }, [selectedCalendarDay]);

  const selectedDayEvents = useMemo(
    () => ctfEventsForCalendarDay(filteredCtfEvents, selectedDayDate),
    [filteredCtfEvents, selectedDayDate],
  );

  useEffect(() => {
    if (selectedDayEvents.length === 0) {
      setSelectedCtfId(null);
      return;
    }
    if (!selectedDayEvents.some((event) => event.id === selectedCtfId)) {
      setSelectedCtfId(selectedDayEvents[0].id);
    }
  }, [selectedDayEvents, selectedCtfId]);

  const selectedCtf =
    selectedDayEvents.find((event) => event.id === selectedCtfId) ||
    selectedDayEvents[0] ||
    null;
  const selectedCtfRegistrations = selectedCtf
    ? ctfRegistrations[selectedCtf.id] || []
    : [];
  const selectedCtfResults = selectedCtf
    ? ctfResults[selectedCtf.id] || []
    : [];
  const myTeams = teams.filter(
    (team) =>
      currentUser &&
      (team.owner === currentUser.username ||
        (team.members || []).includes(currentUser.username)),
  );
  const isParticipating = Boolean(
    currentUser &&
    selectedCtfRegistrations.some(
      (entry) => entry.username === currentUser.username,
    ),
  );

  function changeCalendarMonth(offset) {
    const nextMonth = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth() + offset,
      1,
    );
    setCalendarMonth(nextMonth);
    setSelectedCalendarDay(calendarDateKey(nextMonth));
  }

  function returnToCurrentDay() {
    const now = new Date();
    setCalendarMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedCalendarDay(calendarDateKey(now));
  }

  function focusCtfEvent(event) {
    const start = new Date(event.start || event.date);
    if (Number.isNaN(start.getTime())) return;
    setCalendarMonth(new Date(start.getFullYear(), start.getMonth(), 1));
    setSelectedCalendarDay(calendarDateKey(start));
    setSelectedCtfId(event.id);
  }

  async function toggleCtfParticipation() {
    if (!selectedCtf) return;
    if (!currentUser) {
      setCtfActionMessage("Connecte-toi pour indiquer ta participation.");
      return;
    }

    const registrations = ctfRegistrations[selectedCtf.id] || [];
    const alreadyRegistered = registrations.some(
      (entry) => entry.username === currentUser.username,
    );
    const selectedTeamObject = myTeams.find(
      (team) => team.name === selectedTeam,
    );
    try {
      const response = await apiRequest(
        `/api/ctf-community/${encodeURIComponent(selectedCtf.id)}/participations`,
        {
          method: alreadyRegistered ? "DELETE" : "POST",
          body: alreadyRegistered
            ? undefined
            : {
                eventTitle: selectedCtf.title,
                startsAt: selectedCtf.start || selectedCtf.date,
                teamId: selectedTeamObject?.id || null,
                teamName: selectedTeam || "Solo",
              },
        },
      );
      const nextEventRegistrations = alreadyRegistered
        ? registrations.filter(
            (entry) => entry.username !== currentUser.username,
          )
        : [
            ...registrations,
            response.registration || {
              username: currentUser.username,
              team: selectedTeam || "Solo",
              joinedAt: new Date().toISOString(),
              eventId: selectedCtf.id,
            },
          ];
      setCtfRegistrations((current) => ({
        ...current,
        [selectedCtf.id]: nextEventRegistrations,
      }));
      if (response.user)
        window.dispatchEvent(
          new CustomEvent("gowlsec:user-updated", { detail: response.user }),
        );
      setCtfActionMessage(
        alreadyRegistered
          ? "Ta participation a été retirée."
          : "Participation enregistrée et badge mis à jour.",
      );
    } catch (error) {
      setCtfActionMessage(
        error.message || "Impossible de modifier ta participation.",
      );
    }
  }

  async function addCtfResult(event) {
    event.preventDefault();
    if (!selectedCtf || !resultDraft.team.trim() || !resultDraft.rank) return;
    try {
      const response = await apiRequest(
        `/api/ctf-community/${encodeURIComponent(selectedCtf.id)}/results`,
        {
          method: "POST",
          body: {
            teamName: resultDraft.team.trim(),
            rank: Math.max(1, Number(resultDraft.rank) || 1),
            highlight: resultDraft.highlight.trim(),
          },
        },
      );
      const result = response.result || response;
      setCtfResults((current) => ({
        ...current,
        [selectedCtf.id]: [...selectedCtfResults, result].sort(
          (a, b) => a.rank - b.rank,
        ),
      }));
      setResultDraft({ team: "", rank: "", highlight: "" });
    } catch (error) {
      setCtfActionMessage(
        error.message || "Impossible de publier ce résultat.",
      );
    }
  }

  async function submit(e) {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) return;
    const now = new Date().toISOString();
    const n = {
      id: uid(),
      ref: `HZ-2026-${String(200 + news.length).slice(-3)}`,
      category,
      title: title.trim(),
      summary: summary.trim(),
      source: source.trim() || "Équipe GowlSec",
      url: url.trim(),
      date: now,
    };
    const next = [n, ...news];
    setNews(next);
    saveCollection("gowlsec:news", next);

    if (setNotifications) {
      const targetProfile = recipient
        ? profiles.find((p) => p.username === recipient)
        : null;
      const notif = {
        id: uid(),
        targetUserId: targetProfile ? targetProfile.id : null,
        targetUsername: targetProfile ? targetProfile.username : null,
        category,
        title: n.title,
        message: n.summary,
        createdAt: now,
      };
      const nextNotifs = [notif, ...notifications];
      setNotifications(nextNotifs);
      saveCollection("gowlsec:notifications", nextNotifs);
    }

    setTitle("");
    setSummary("");
    setSource("");
    setUrl("");
    setCategory(NEWS_CATEGORIES[0].key);
    setRecipient("");
    setShowForm(false);
  }
  async function removeNews(id) {
    const next = news.filter((n) => n.id !== id);
    setNews(next);
    saveCollection("gowlsec:news", next);
  }
  const filtered =
    filter === "Tous" ? news : news.filter((n) => n.category === filter);
  const shown = full ? filtered : filtered.slice(0, 6);

  return (
    <div>
      <div className="flex items-end justify-between gap-4 mb-5 flex-wrap">
        <div>
          <span
            className="text-[9px] uppercase tracking-[0.18em] font-bold"
            style={{ color: C.ok, fontFamily: MONO_FONT }}
          >
            Calendrier communautaire
          </span>
          <h2
            className="text-2xl font-extrabold mt-1"
            style={{ color: C.text, fontFamily: DISPLAY_FONT }}
          >
            CTFNews
          </h2>
          <p
            className="text-sm mt-1"
            style={{ color: C.muted, fontFamily: BODY_FONT }}
          >
            Trouve un CTF, inscris ton équipe et retrouve les résultats GowlSec
            au même endroit.
          </p>
        </div>
        <span
          className="text-[10px] px-2.5 py-1.5 rounded-full"
          style={{
            color: C.primary,
            background: `${C.primary}12`,
            border: `1px solid ${C.primary}36`,
            fontFamily: MONO_FONT,
          }}
        >
          {filteredCtfEvents.length}/{ctfEvents.length} CTF affichés
        </span>
      </div>

      <Panel
        className="overflow-hidden gowl-ctf-calendar"
        style={{ borderColor: C.line, background: C.panel }}
      >
        <div
          className="p-4"
          style={{ borderBottom: `1px solid ${C.line}`, background: C.panel2 }}
        >
          <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
            <div className="flex items-center gap-2.5">
              <span
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{
                  color: C.primary,
                  background: `${C.primary}15`,
                  border: `1px solid ${C.primary}35`,
                }}
              >
                <Calendar size={16} />
              </span>
              <div>
                <h3
                  className="text-sm font-bold capitalize"
                  style={{ color: C.text, fontFamily: DISPLAY_FONT }}
                >
                  {calendarMonth.toLocaleDateString("fr-FR", {
                    month: "long",
                    year: "numeric",
                  })}
                </h3>
                <p
                  className="text-[10px] mt-0.5"
                  style={{ color: C.muted, fontFamily: MONO_FONT }}
                >
                  Données CTFTime · mises à jour automatiquement
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => changeCalendarMonth(-1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  color: CTF_CALENDAR_COLORS.text,
                  background: CTF_CALENDAR_COLORS.control,
                  border: `1px solid ${CTF_CALENDAR_COLORS.border}`,
                }}
                aria-label="Mois précédent"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                type="button"
                onClick={returnToCurrentDay}
                className="h-8 px-3 rounded-lg text-[11px] font-semibold"
                style={{
                  color: CTF_CALENDAR_COLORS.text,
                  background: CTF_CALENDAR_COLORS.control,
                  border: `1px solid ${CTF_CALENDAR_COLORS.border}`,
                  fontFamily: BODY_FONT,
                }}
              >
                Aujourd’hui
              </button>
              <button
                type="button"
                onClick={() => changeCalendarMonth(1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  color: CTF_CALENDAR_COLORS.text,
                  background: CTF_CALENDAR_COLORS.control,
                  border: `1px solid ${CTF_CALENDAR_COLORS.border}`,
                }}
                aria-label="Mois suivant"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-2 gowl-ctf-filters">
            {[
              {
                key: "difficulty",
                label: "Difficulté",
                accent: "#AEB9FF",
                options: ["Tous", "Débutant", "Intermédiaire", "Avancé"],
              },
              {
                key: "format",
                label: "Format",
                accent: "#84C5E5",
                options: ["Tous", ...formatOptions],
              },
              {
                key: "duration",
                label: "Durée",
                accent: "#8AD2BF",
                options: ["Tous", "24h max", "Week-end", "Long"],
              },
              {
                key: "participants",
                label: "Participants",
                accent: "#B3C6D8",
                options: ["Tous", "Moins de 100", "100 à 500", "500+"],
              },
              {
                key: "reward",
                label: "Récompense",
                accent: "#D8C58A",
                options: ["Tous", "Avec récompense"],
              },
            ].map((filterItem) => (
              <label
                key={filterItem.key}
                className="min-w-0 rounded-xl p-2"
                style={{
                  background: CTF_CALENDAR_COLORS.surface,
                  border: `1px solid ${CTF_CALENDAR_COLORS.border}`,
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.035)",
                }}
              >
                <span
                  className="block text-[8px] uppercase tracking-wider mb-1"
                  style={{ color: filterItem.accent, fontFamily: MONO_FONT }}
                >
                  {filterItem.label}
                </span>
                <select
                  value={ctfFilters[filterItem.key]}
                  onChange={(event) =>
                    setCtfFilters((current) => ({
                      ...current,
                      [filterItem.key]: event.target.value,
                    }))
                  }
                  className="w-full h-9 px-2 rounded-lg text-[11px]"
                  style={{
                    ...inputStyle,
                    color: CTF_CALENDAR_COLORS.text,
                    background: CTF_CALENDAR_COLORS.control,
                    borderColor: CTF_CALENDAR_COLORS.border,
                    colorScheme: "dark",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.035)",
                  }}
                >
                  {filterItem.options.map((option) => (
                    <option
                      key={option}
                      value={option}
                      style={{
                        color: CTF_CALENDAR_COLORS.text,
                        background: CTF_CALENDAR_COLORS.control,
                      }}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          {Object.values(ctfFilters).some((value) => value !== "Tous") && (
            <button
              type="button"
              onClick={() =>
                setCtfFilters({
                  difficulty: "Tous",
                  format: "Tous",
                  duration: "Tous",
                  participants: "Tous",
                  reward: "Tous",
                })
              }
              className="inline-flex items-center gap-1 mt-2 text-[10px]"
              style={{ color: C.primary, fontFamily: MONO_FONT }}
            >
              <RefreshCw size={10} /> Réinitialiser les filtres
            </button>
          )}
        </div>

        <div className="grid xl:grid-cols-[1.35fr_0.85fr]">
          <div
            className="p-3 sm:p-4 xl:border-r"
            style={{ borderColor: C.line, background: C.panel }}
          >
            <div className="flex items-center gap-3 mb-2 px-1 flex-wrap">
              <span
                className="inline-flex items-center gap-1.5 text-[9px]"
                style={{ color: C.muted, fontFamily: MONO_FONT }}
              >
                <span
                  className="w-2.5 h-2.5 rounded"
                  style={{
                    background: "#17483B",
                    border: `1px solid ${C.ok}66`,
                  }}
                />{" "}
                CTF programmé
              </span>
              <span
                className="inline-flex items-center gap-1.5 text-[9px]"
                style={{ color: C.muted, fontFamily: MONO_FONT }}
              >
                <span
                  className="w-2.5 h-2.5 rounded"
                  style={{
                    background: "#44232D",
                    border: `1px solid ${C.alert}55`,
                  }}
                />{" "}
                Aucun CTF
              </span>
            </div>
            <div className="grid grid-cols-7 mb-1">
              {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(
                (label) => (
                  <span
                    key={label}
                    className="py-1.5 text-center text-[9px] sm:text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: C.muted, fontFamily: MONO_FONT }}
                  >
                    {label}
                  </span>
                ),
              )}
            </div>
            <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
              {calendarDays.map((day) => {
                const key = calendarDateKey(day);
                const dayEvents = ctfEventsForCalendarDay(
                  filteredCtfEvents,
                  day,
                );
                const inCurrentMonth =
                  day.getMonth() === calendarMonth.getMonth();
                const isSelected = key === selectedCalendarDay;
                const isToday = key === calendarDateKey(today);
                const hasCtf = dayEvents.length > 0;
                return (
                  <button
                    type="button"
                    key={key}
                    onClick={() => {
                      setSelectedCalendarDay(key);
                      if (!inCurrentMonth)
                        setCalendarMonth(
                          new Date(day.getFullYear(), day.getMonth(), 1),
                        );
                    }}
                    className="relative min-h-[58px] sm:min-h-[86px] rounded-lg p-1.5 sm:p-2 text-left overflow-hidden gowl-ctf-day"
                    style={{
                      color: inCurrentMonth ? C.text : C.muted,
                      opacity: inCurrentMonth ? 1 : 0.5,
                      background: !inCurrentMonth
                        ? CTF_CALENDAR_COLORS.outside
                        : hasCtf
                          ? isSelected
                            ? CTF_CALENDAR_COLORS.hasCtfSelected
                            : CTF_CALENDAR_COLORS.hasCtf
                          : isSelected
                            ? CTF_CALENDAR_COLORS.noCtfSelected
                            : CTF_CALENDAR_COLORS.noCtf,
                      border: `1px solid ${isSelected ? (hasCtf ? C.ok : C.alert) : hasCtf ? `${C.ok}66` : `${C.alert}48`}`,
                      boxShadow: isSelected
                        ? `0 0 0 2px ${hasCtf ? `${C.ok}22` : `${C.alert}1F`}, inset 0 1px 0 rgba(255,255,255,0.05)`
                        : "inset 0 1px 0 rgba(255,255,255,0.025)",
                    }}
                  >
                    <span className="flex items-center justify-between gap-1">
                      <span
                        className="w-5 h-5 rounded-full inline-flex items-center justify-center text-[10px] font-bold"
                        style={{
                          color: isToday ? C.bg : "inherit",
                          background: isToday ? C.ok : "transparent",
                          fontFamily: MONO_FONT,
                        }}
                      >
                        {day.getDate()}
                      </span>
                      {dayEvents.length > 0 && (
                        <span
                          className="text-[8px] sm:text-[9px] font-bold rounded-full px-1.5 py-0.5"
                          style={{
                            color: C.ok,
                            background: `${C.ok}1F`,
                            fontFamily: MONO_FONT,
                          }}
                        >
                          {dayEvents.length}
                        </span>
                      )}
                    </span>
                    <span className="mt-1.5 hidden sm:flex flex-col gap-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <span
                          key={event.id}
                          className="block truncate rounded px-1 py-0.5 text-[8px] font-semibold"
                          style={{
                            color: C.text,
                            background: "rgba(22, 54, 51, 0.72)",
                            borderLeft: `2px solid ${C.ok}`,
                            fontFamily: BODY_FONT,
                          }}
                        >
                          {event.title}
                        </span>
                      ))}
                    </span>
                    {dayEvents.length > 0 && (
                      <span
                        className="sm:hidden absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                        style={{ background: C.ok }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="p-4 min-w-0" style={{ background: C.panel2 }}>
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <span
                  className="text-[9px] uppercase tracking-[0.18em] font-bold"
                  style={{ color: C.primary, fontFamily: MONO_FONT }}
                >
                  Programme
                </span>
                <h4
                  className="text-sm font-bold capitalize mt-1"
                  style={{ color: C.text, fontFamily: DISPLAY_FONT }}
                >
                  {selectedDayDate.toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </h4>
              </div>
              <span
                className="text-[10px] rounded-full px-2 py-1 shrink-0"
                style={{
                  color: selectedDayEvents.length ? C.ok : C.muted,
                  background: CTF_CALENDAR_COLORS.control,
                  border: `1px solid ${CTF_CALENDAR_COLORS.border}`,
                  fontFamily: MONO_FONT,
                }}
              >
                {selectedDayEvents.length} CTF
              </span>
            </div>

            {selectedDayEvents.length === 0 ? (
              <div
                className="rounded-xl px-3 py-8 text-center"
                style={{
                  background: CTF_CALENDAR_COLORS.surface,
                  border: `1px dashed ${CTF_CALENDAR_COLORS.border}`,
                }}
              >
                <Calendar
                  size={21}
                  className="mx-auto mb-2"
                  style={{ color: C.muted }}
                />
                <p
                  className="text-xs"
                  style={{ color: C.muted, fontFamily: BODY_FONT }}
                >
                  Aucun CTF ne correspond à cette journée et aux filtres
                  choisis.
                </p>
              </div>
            ) : (
              <>
                {selectedDayEvents.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2 mb-3">
                    {selectedDayEvents.map((event) => (
                      <button
                        key={event.id}
                        type="button"
                        onClick={() => setSelectedCtfId(event.id)}
                        className="shrink-0 max-w-[190px] truncate rounded-lg px-3 py-2 text-[10px] font-semibold"
                        style={{
                          color:
                            selectedCtf?.id === event.id ? C.text : C.muted,
                          background:
                            selectedCtf?.id === event.id
                              ? `${C.primary}18`
                              : CTF_CALENDAR_COLORS.control,
                          border: `1px solid ${selectedCtf?.id === event.id ? `${C.primary}60` : C.line}`,
                          fontFamily: BODY_FONT,
                        }}
                      >
                        {event.title}
                      </button>
                    ))}
                  </div>
                )}

                {selectedCtf &&
                  (() => {
                    const start = new Date(
                      selectedCtf.start || selectedCtf.date,
                    );
                    const finish = new Date(selectedCtf.finish);
                    const duration = ctfDurationHours(selectedCtf);
                    const difficulty = ctfDifficulty(selectedCtf);
                    const isFinished =
                      !Number.isNaN(finish.getTime()) &&
                      clockNow > finish.getTime();
                    const totalParticipants =
                      Number(selectedCtf.participantCount || 0) +
                      selectedCtfRegistrations.length;
                    const reward =
                      selectedCtf.reward ||
                      (selectedCtf.weight
                        ? `${selectedCtf.weight} points CTFTime`
                        : "Non annoncée");
                    const difficultyColor =
                      difficulty === "Débutant"
                        ? C.ok
                        : difficulty === "Avancé"
                          ? C.alert
                          : C.warn;
                    return (
                      <div
                        className="rounded-xl overflow-hidden gowl-ctf-detail"
                        style={{
                          background: CTF_CALENDAR_COLORS.surface,
                          border: `1px solid ${CTF_CALENDAR_COLORS.border}`,
                        }}
                      >
                        <div
                          className="p-4"
                          style={{ borderBottom: `1px solid ${C.line}` }}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <span
                                className="text-[9px] font-bold uppercase tracking-wider"
                                style={{
                                  color: isFinished ? C.muted : C.ok,
                                  fontFamily: MONO_FONT,
                                }}
                              >
                                {ctfCountdownLabel(selectedCtf, clockNow)}
                              </span>
                              <h3
                                className="text-base font-bold leading-snug mt-1"
                                style={{
                                  color: C.text,
                                  fontFamily: DISPLAY_FONT,
                                }}
                              >
                                {selectedCtf.title}
                              </h3>
                            </div>
                            <Flag
                              size={18}
                              className="shrink-0"
                              style={{ color: C.primary }}
                            />
                          </div>
                          <p
                            className="text-xs mt-3 leading-relaxed"
                            style={{ color: C.muted, fontFamily: BODY_FONT }}
                          >
                            {selectedCtf.description ||
                              selectedCtf.summary ||
                              "Description à venir."}
                          </p>
                        </div>

                        <div
                          className="grid grid-cols-2 gap-px"
                          style={{ background: C.line }}
                        >
                          {[
                            {
                              icon: Clock,
                              label: "Horaires",
                              value: Number.isNaN(start.getTime())
                                ? "À confirmer"
                                : `${start.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })} ${start.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}${Number.isNaN(finish.getTime()) ? "" : ` → ${finish.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })} ${finish.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}`}`,
                            },
                            {
                              icon: Gauge,
                              label: "Difficulté",
                              value: difficulty,
                              color: difficultyColor,
                            },
                            {
                              icon: Globe,
                              label: "Format",
                              value: `${selectedCtf.format || "CTF"} · ${selectedCtf.location || "En ligne"}`,
                            },
                            {
                              icon: Clock,
                              label: "Durée",
                              value: duration
                                ? `${duration} heure${duration > 1 ? "s" : ""}`
                                : "À confirmer",
                            },
                            {
                              icon: Users,
                              label: "Participants",
                              value: totalParticipants
                                ? `${totalParticipants} inscrit${totalParticipants > 1 ? "s" : ""}`
                                : "Ouvert aux inscriptions",
                            },
                            { icon: Award, label: "Récompense", value: reward },
                          ].map((meta) => (
                            <div
                              key={meta.label}
                              className="p-3 min-w-0"
                              style={{ background: C.panel }}
                            >
                              <span
                                className="flex items-center gap-1 text-[8px] uppercase tracking-wider"
                                style={{
                                  color: C.muted,
                                  fontFamily: MONO_FONT,
                                }}
                              >
                                <meta.icon size={9} /> {meta.label}
                              </span>
                              <span
                                className="block text-[10px] mt-1 leading-snug"
                                style={{
                                  color: meta.color || C.text,
                                  fontFamily: BODY_FONT,
                                }}
                              >
                                {meta.value}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="p-4">
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span
                              className="text-[9px] uppercase tracking-wider font-bold"
                              style={{ color: C.muted, fontFamily: MONO_FONT }}
                            >
                              Participants GowlSec
                            </span>
                            <span
                              className="text-[10px]"
                              style={{
                                color: C.primary,
                                fontFamily: MONO_FONT,
                              }}
                            >
                              {selectedCtfRegistrations.length}
                            </span>
                          </div>
                          {selectedCtfRegistrations.length > 0 ? (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {selectedCtfRegistrations
                                .slice(0, 12)
                                .map((entry) => {
                                  const profile = profiles.find(
                                    (item) => item.username === entry.username,
                                  );
                                  return (
                                    <span
                                      key={entry.username}
                                      className="inline-flex items-center gap-1.5 pr-2 rounded-full text-[9px]"
                                      style={{
                                        color: C.text,
                                        background: C.panel2,
                                        border: `1px solid ${C.line}`,
                                        fontFamily: MONO_FONT,
                                      }}
                                    >
                                      <Avatar
                                        profile={
                                          profile || {
                                            username: entry.username,
                                          }
                                        }
                                        size={22}
                                      />{" "}
                                      {entry.username}
                                      <span style={{ color: C.muted }}>
                                        · {entry.team}
                                      </span>
                                    </span>
                                  );
                                })}
                            </div>
                          ) : (
                            <p
                              className="text-[10px] mb-3"
                              style={{ color: C.muted, fontFamily: BODY_FONT }}
                            >
                              Sois le premier membre GowlSec à participer.
                            </p>
                          )}

                          {!isParticipating && myTeams.length > 0 && (
                            <select
                              value={selectedTeam}
                              onChange={(event) =>
                                setSelectedTeam(event.target.value)
                              }
                              className="w-full h-9 px-2 rounded-lg text-[11px] mb-2"
                              style={{ ...inputStyle, background: C.panel2 }}
                            >
                              <option value="">Participer en solo</option>
                              {myTeams.map((team) => (
                                <option key={team.id} value={team.name}>
                                  {team.name}
                                </option>
                              ))}
                            </select>
                          )}
                          <div className="grid sm:grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={toggleCtfParticipation}
                              className="h-9 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5"
                              style={{
                                color: isParticipating ? C.alert : C.bg,
                                background: isParticipating
                                  ? `${C.alert}12`
                                  : C.ok,
                                border: `1px solid ${isParticipating ? `${C.alert}55` : C.ok}`,
                                fontFamily: BODY_FONT,
                              }}
                            >
                              {isParticipating ? (
                                <X size={12} />
                              ) : (
                                <CheckCircle2 size={12} />
                              )}
                              {isParticipating
                                ? "Se désinscrire"
                                : "Je participe"}
                            </button>
                            <button
                              type="button"
                              onClick={() => setTab?.("equipes")}
                              className="h-9 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5"
                              style={{
                                color: C.text,
                                background: C.panel2,
                                border: `1px solid ${C.line}`,
                                fontFamily: BODY_FONT,
                              }}
                            >
                              <Users size={12} /> Créer une équipe
                            </button>
                          </div>
                          {ctfActionMessage && (
                            <p
                              className="text-[9px] text-center mt-2"
                              style={{
                                color: ctfActionMessage.includes("enregistrée")
                                  ? C.ok
                                  : C.muted,
                                fontFamily: MONO_FONT,
                              }}
                            >
                              {ctfActionMessage}
                            </p>
                          )}

                          <a
                            href={selectedCtf.officialUrl || selectedCtf.url}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-3 h-9 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5"
                            style={{
                              color: C.primary,
                              border: `1px solid ${C.primary}45`,
                              background: `${C.primary}0B`,
                              fontFamily: BODY_FONT,
                            }}
                          >
                            <ExternalLink size={12} /> Voir la fiche officielle
                          </a>
                        </div>

                        <div
                          className="p-4"
                          style={{
                            borderTop: `1px solid ${C.line}`,
                            background: C.panel,
                          }}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <span
                                className="text-[9px] uppercase tracking-wider font-bold"
                                style={{ color: C.gold, fontFamily: MONO_FONT }}
                              >
                                Résultats communautaires
                              </span>
                              <p
                                className="text-[10px] mt-0.5"
                                style={{
                                  color: C.muted,
                                  fontFamily: BODY_FONT,
                                }}
                              >
                                {isFinished
                                  ? "Classements et meilleurs moments GowlSec."
                                  : "Disponible après la fin du CTF."}
                              </p>
                            </div>
                            <Trophy size={15} style={{ color: C.gold }} />
                          </div>
                          {selectedCtfResults.length > 0 && (
                            <div className="flex flex-col gap-2 mt-3">
                              {selectedCtfResults.map((result) => (
                                <div
                                  key={result.id}
                                  className="flex items-start gap-2 rounded-lg p-2.5"
                                  style={{
                                    background: C.bg,
                                    border: `1px solid ${C.line}`,
                                  }}
                                >
                                  <span
                                    className="text-sm"
                                    style={{
                                      color:
                                        result.rank <= 3 ? C.gold : C.muted,
                                      fontFamily: DISPLAY_FONT,
                                    }}
                                  >
                                    #{result.rank}
                                  </span>
                                  <span className="min-w-0">
                                    <span
                                      className="block text-[11px] font-bold"
                                      style={{ color: C.text }}
                                    >
                                      {result.team}
                                    </span>
                                    {result.highlight && (
                                      <span
                                        className="block text-[9px] mt-0.5"
                                        style={{ color: C.muted }}
                                      >
                                        {result.highlight}
                                      </span>
                                    )}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                          {isFinished && selectedCtfResults.length === 0 && (
                            <p
                              className="text-[10px] mt-3"
                              style={{ color: C.muted, fontFamily: BODY_FONT }}
                            >
                              Aucun résultat GowlSec publié pour le moment.
                            </p>
                          )}
                          {isAdmin && isFinished && (
                            <form
                              onSubmit={addCtfResult}
                              className="grid grid-cols-[1fr_64px] gap-2 mt-3"
                            >
                              <input
                                value={resultDraft.team}
                                onChange={(event) =>
                                  setResultDraft((draft) => ({
                                    ...draft,
                                    team: event.target.value,
                                  }))
                                }
                                placeholder="Nom de l’équipe"
                                className="h-8 px-2 rounded-md text-[10px]"
                                style={inputStyle}
                              />
                              <input
                                type="number"
                                min="1"
                                value={resultDraft.rank}
                                onChange={(event) =>
                                  setResultDraft((draft) => ({
                                    ...draft,
                                    rank: event.target.value,
                                  }))
                                }
                                placeholder="Rang"
                                className="h-8 px-2 rounded-md text-[10px]"
                                style={inputStyle}
                              />
                              <input
                                value={resultDraft.highlight}
                                onChange={(event) =>
                                  setResultDraft((draft) => ({
                                    ...draft,
                                    highlight: event.target.value,
                                  }))
                                }
                                placeholder="Meilleur moment (optionnel)"
                                className="h-8 px-2 rounded-md text-[10px] col-span-2"
                                style={inputStyle}
                              />
                              <button
                                type="submit"
                                className="h-8 rounded-md text-[10px] font-bold col-span-2"
                                style={{ color: C.bg, background: C.gold }}
                              >
                                Publier le résultat
                              </button>
                            </form>
                          )}
                        </div>
                      </div>
                    );
                  })()}
              </>
            )}
          </aside>
        </div>
      </Panel>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Forum — question / accompagnement
--------------------------------------------------------------------- */
function ForumTab({
  pseudo,
  questions,
  setQuestions,
  isAdmin,
  lang = "fr",
  currentUser = null,
  profiles = [],
}) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [type, setType] = useState(QUESTION_TYPES[3].key);
  const [openId, setOpenId] = useState(null);
  const [replyDraft, setReplyDraft] = useState({});
  const [filter, setFilter] = useState("all");
  const [cooldownNow, setCooldownNow] = useState(Date.now());
  const [questionCooldown, setQuestionCooldown] = useState({
    durationSeconds: 30 * 60,
    availableAt: null,
  });
  const [questionFeedback, setQuestionFeedback] = useState("");

  useEffect(() => {
    const interval = window.setInterval(() => setCooldownNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    let active = true;
    apiRequest("/api/social/progress")
      .then((data) => {
        if (!active || !data.cooldowns?.question) return;
        setQuestionCooldown(data.cooldowns.question);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [currentUser?.id, questions.length]);

  const questionRemainingSeconds = questionCooldown.availableAt
    ? Math.max(
        0,
        Math.ceil(
          (new Date(questionCooldown.availableAt).getTime() - cooldownNow) /
            1000,
        ),
      )
    : 0;
  const questionCooldownPct = Math.min(
    100,
    Math.max(
      0,
      Math.round(
        (questionRemainingSeconds /
          Math.max(1, questionCooldown.durationSeconds || 1800)) *
          100,
      ),
    ),
  );
  const cooldownClock = `${String(Math.floor(questionRemainingSeconds / 60)).padStart(2, "0")}:${String(questionRemainingSeconds % 60).padStart(2, "0")}`;

  const findProfile = (username) =>
    profiles.find((p) => p.username === username);

  const filteredQuestions = questions.filter((q) => {
    if (filter === "unresolved") return !q.resolved;
    if (filter === "resolved") return q.resolved;
    return true;
  });

  async function submitQuestion(e) {
    e.preventDefault();
    if (!currentUser) return;
    if (!title.trim() || !body.trim()) return;
    try {
      const result = await communityRequest("/questions", {
        method: "POST",
        body: { title: title.trim(), body: body.trim(), type },
      });
      setQuestions((current) => [result.question, ...current]);
      setTitle("");
      setBody("");
      setType(QUESTION_TYPES[3].key);
      setShowForm(false);
      setOpenId(result.question.id);
      setQuestionCooldown({
        durationSeconds: 30 * 60,
        availableAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      });
      setQuestionFeedback(
        "Question publiée. Le cooldown protège le forum contre le spam.",
      );
    } catch (error) {
      if (error.retryAfterSeconds) {
        setQuestionCooldown({
          durationSeconds: 30 * 60,
          availableAt: new Date(
            Date.now() + error.retryAfterSeconds * 1000,
          ).toISOString(),
        });
      }
      setQuestionFeedback(error.message);
      setShowForm(false);
    }
  }
  async function toggleQuestion(qid) {
    if (openId === qid) {
      setOpenId(null);
      return;
    }
    const next = questions.map((q) =>
      q.id === qid ? { ...q, views: (q.views || 0) + 1 } : q,
    );
    setQuestions(next);
    saveCollection("gowlsec:questions", next);
    setOpenId(qid);
  }
  async function toggleResolved(qid) {
    const next = questions.map((q) =>
      q.id === qid ? { ...q, resolved: !q.resolved } : q,
    );
    setQuestions(next);
    saveCollection("gowlsec:questions", next);
  }
  async function addAnswer(qid) {
    if (!currentUser) {
      window.dispatchEvent(new CustomEvent("open-auth-login"));
      return;
    }
    const text = (replyDraft[qid] || "").trim();
    if (!text) return;
    const next = questions.map((q) =>
      q.id === qid
        ? {
            ...q,
            answers: [
              ...q.answers,
              {
                id: uid(),
                author: pseudo,
                body: text,
                createdAt: new Date().toISOString(),
              },
            ],
          }
        : q,
    );
    setQuestions(next);
    saveCollection("gowlsec:questions", next);
    setReplyDraft((d) => ({ ...d, [qid]: "" }));
  }
  async function removeQuestion(qid) {
    try {
      await communityRequest(`/questions/${qid}`, { method: "DELETE" });
      const next = questions.filter((q) => q.id !== qid);
      setQuestions(next);
      saveCollection("gowlsec:questions", next);
      setQuestionFeedback("Question supprimée définitivement.");
      if (openId === qid) setOpenId(null);
    } catch (error) {
      setQuestionFeedback(error.message);
    }
  }

  return (
    <div className="gowl-community-view gowl-view-forum">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1 min-w-0 w-full">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <SectionHeader
              icon={<MessageSquare size={19} />}
              eyebrow="Salon d'entraide"
              title={t(lang, "forumTitle")}
              subtitle={t(lang, "forumSub")}
              accent={C.primary}
            />
            {!currentUser ? (
              <PrimaryButton
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-auth-login"))
                }
              >
                Connexion
              </PrimaryButton>
            ) : (
              <PrimaryButton
                disabled={questionRemainingSeconds > 0}
                onClick={() => setShowForm((s) => !s)}
              >
                {questionRemainingSeconds > 0 ? (
                  <Clock size={15} />
                ) : showForm ? (
                  <X size={15} />
                ) : (
                  <Plus size={15} />
                )}{" "}
                {questionRemainingSeconds > 0
                  ? `Disponible dans ${cooldownClock}`
                  : showForm
                    ? t(lang, "cancel")
                    : t(lang, "newQuestion")}
              </PrimaryButton>
            )}
          </div>
          {currentUser && (
            <Panel
              className="mb-4 overflow-hidden"
              style={{
                background: questionRemainingSeconds
                  ? `linear-gradient(135deg, ${C.warn}12, ${C.panel})`
                  : `linear-gradient(135deg, ${C.ok}10, ${C.panel})`,
                borderColor: questionRemainingSeconds
                  ? `${C.warn}40`
                  : `${C.ok}35`,
              }}
            >
              <div className="p-3.5 flex items-center gap-3">
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    color: questionRemainingSeconds ? C.warn : C.ok,
                    background: questionRemainingSeconds
                      ? `${C.warn}16`
                      : `${C.ok}14`,
                    border: `1px solid ${questionRemainingSeconds ? `${C.warn}3D` : `${C.ok}35`}`,
                  }}
                >
                  {questionRemainingSeconds ? (
                    <Clock size={18} />
                  ) : (
                    <CheckCircle2 size={18} />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold" style={{ color: C.text }}>
                        {questionRemainingSeconds
                          ? "Cooldown de publication actif"
                          : "Tu peux publier une question"}
                      </p>
                      <p className="text-[10px] mt-0.5" style={{ color: C.muted }}>
                        {questionRemainingSeconds
                          ? "Une question toutes les 30 minutes pour préserver la qualité du forum."
                          : "Décris précisément ton contexte pour recevoir une réponse utile."}
                      </p>
                    </div>
                    <span
                      className="text-lg font-extrabold shrink-0"
                      style={{
                        color: questionRemainingSeconds ? C.warn : C.ok,
                        fontFamily: MONO_FONT,
                      }}
                    >
                      {questionRemainingSeconds ? cooldownClock : "PRÊT"}
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden mt-2.5"
                    style={{ background: C.panel2 }}
                  >
                    <div
                      className="h-full rounded-full transition-[width] duration-1000"
                      style={{
                        width: `${questionRemainingSeconds ? questionCooldownPct : 100}%`,
                        background: questionRemainingSeconds ? C.warn : C.ok,
                      }}
                    />
                  </div>
                  {questionFeedback && (
                    <p className="text-[10px] mt-2" style={{ color: C.muted }}>
                      {questionFeedback}
                    </p>
                  )}
                </div>
              </div>
            </Panel>
          )}
          {!currentUser && (
            <GuestGate
              text="Connecte-toi pour poser des questions, répondre et participer à la communauté."
              accent={C.primary}
            />
          )}
          {showForm && (
            <ModalOverlay onClose={() => setShowForm(false)}>
              <CreationHero
                scene={<ForumScene />}
                accent={C.primary}
                eyebrow={t(lang, "forumHeroEyebrow")}
                title={t(lang, "forumHeroTitle")}
                subtitle={t(lang, "forumHeroSub")}
                onClose={() => setShowForm(false)}
              >
                <form onSubmit={submitQuestion} className="space-y-2.5">
                  <Field label="Type de demande">
                    <div className="flex flex-wrap gap-2">
                      {QUESTION_TYPES.map((t2) => (
                        <button
                          type="button"
                          key={t2.key}
                          onClick={() => setType(t2.key)}
                          style={{ opacity: type === t2.key ? 1 : 0.5 }}
                        >
                          <Chip label={t2.label} color={t2.color} />
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label="Titre">
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Ex : Blocage sur l'escalade de privilèges (Linux)"
                      className="w-full px-2.5 py-1.75 rounded-md text-sm"
                      style={inputStyle}
                    />
                  </Field>
                  <Field label="Détails">
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      rows={3}
                      placeholder="Contexte, ce que tu as déjà essayé, où tu bloques..."
                      className="w-full px-2.5 py-1.75 rounded-md text-sm resize-none"
                      style={inputStyle}
                    />
                  </Field>
                  <PrimaryButton type="submit" className="!py-2">
                    <Send size={14} /> {t(lang, "publish")}
                  </PrimaryButton>
                </form>
              </CreationHero>
            </ModalOverlay>
          )}
          {questions.length > 0 && (
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {[
                { key: "all", label: "Toutes", count: questions.length },
                {
                  key: "unresolved",
                  label: "Non résolues",
                  count: questions.filter((q) => !q.resolved).length,
                },
                {
                  key: "resolved",
                  label: "Résolues",
                  count: questions.filter((q) => q.resolved).length,
                },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className="gowl-qfilter"
                  data-active={filter === f.key}
                  style={{
                    "--gowl-accent":
                      f.key === "resolved"
                        ? C.ok
                        : f.key === "unresolved"
                          ? C.warn
                          : C.primary,
                  }}
                >
                  {f.label}{" "}
                  <span className="gowl-qfilter-count">{f.count}</span>
                </button>
              ))}
            </div>
          )}
          <div className="space-y-3">
            {questions.length === 0 && (
              <EmptyState
                icon={<MessageSquare size={20} />}
                accent={C.primary}
                text="Aucune question pour l'instant. Sois le premier à demander de l'aide à la communauté."
                cta="Poser une question"
                onCta={() => setShowForm(true)}
              />
            )}
            {questions.length > 0 && filteredQuestions.length === 0 && (
              <EmptyState
                icon={<CheckCircle2 size={20} />}
                accent={C.ok}
                text="Aucune question ne correspond à ce filtre pour l'instant."
              />
            )}
            {filteredQuestions.map((q) => {
              const qt =
                QUESTION_TYPES.find((t) => t.key === q.type) ||
                QUESTION_TYPES[3];
              const open = openId === q.id;
              const authorProfile = findProfile(q.author);
              return (
                <Panel
                  key={q.id}
                  className="p-0 gowl-hud-card gowl-glass gowl-qcard overflow-hidden"
                  style={{
                    "--gowl-accent": qt.color,
                    borderLeft: `3px solid ${qt.color}88`,
                  }}
                >
                  {q.resolved && (
                    <span className="gowl-qcard-resolved">
                      <CheckCircle2 size={11} /> Résolue
                    </span>
                  )}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className="flex-1 min-w-0 cursor-pointer"
                        onClick={() => toggleQuestion(q.id)}
                      >
                        <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                          <Avatar profile={authorProfile} size={22} />
                          <span
                            className="text-xs font-semibold"
                            style={{ color: C.text, fontFamily: BODY_FONT }}
                          >
                            {q.author}
                          </span>
                          <span
                            className="text-xs"
                            style={{ color: C.muted, fontFamily: MONO_FONT }}
                          >
                            · {timeAgo(q.createdAt)}
                          </span>
                          <Chip label={qt.label} color={qt.color} />
                        </div>
                        <h3 className="gowl-qtitle mb-1">{q.title}</h3>
                        {!open && (
                          <p
                            className="text-sm line-clamp-1"
                            style={{ color: C.muted, fontFamily: BODY_FONT }}
                          >
                            {q.body}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => toggleQuestion(q.id)}
                        className="gowl-qtoggle shrink-0"
                        style={{ color: C.muted }}
                      >
                        {open ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      <span className="gowl-qstat">
                        <Eye size={12} /> {q.views || 0}
                      </span>
                      <span className="gowl-qstat">
                        <MessageSquare size={12} /> {q.answers.length} réponse
                        {q.answers.length > 1 ? "s" : ""}
                      </span>
                      <div className="flex-1" />
                      {q.author === pseudo && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleResolved(q.id);
                          }}
                          className="text-xs px-2.5 py-1 rounded-full font-medium"
                          style={{
                            background: q.resolved
                              ? `${C.ok}22`
                              : "transparent",
                            border: `1px solid ${q.resolved ? C.ok : C.line}`,
                            color: q.resolved ? C.ok : C.muted,
                            fontFamily: MONO_FONT,
                          }}
                        >
                          {q.resolved ? "Résolue" : "Marquer résolue"}
                        </button>
                      )}
                      {(isAdmin || q.author === pseudo) && (
                        <GhostButton
                          danger
                          onClick={(e) => {
                            e.stopPropagation();
                            removeQuestion(q.id);
                          }}
                        >
                          <Trash2 size={12} />
                        </GhostButton>
                      )}
                    </div>
                  </div>
                  {open && (
                    <div className="gowl-qthread px-4 pb-4 pt-3">
                      <p
                        className="text-sm mb-4 whitespace-pre-wrap leading-relaxed"
                        style={{ color: C.text, fontFamily: BODY_FONT }}
                      >
                        {q.body}
                      </p>
                      {q.answers.length > 0 && (
                        <div className="space-y-3 mb-4">
                          {q.answers.map((a) => {
                            const answerProfile = findProfile(a.author);
                            return (
                              <div key={a.id} className="gowl-qanswer">
                                <Avatar profile={answerProfile} size={26} />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                                    <span
                                      className="text-xs font-semibold"
                                      style={{
                                        color: C.text,
                                        fontFamily: BODY_FONT,
                                      }}
                                    >
                                      {a.author}
                                    </span>
                                    <span
                                      className="text-[11px]"
                                      style={{
                                        color: C.muted,
                                        fontFamily: MONO_FONT,
                                      }}
                                    >
                                      {timeAgo(a.createdAt)}
                                    </span>
                                  </div>
                                  <p
                                    className="text-sm leading-relaxed"
                                    style={{
                                      color: C.text,
                                      fontFamily: BODY_FONT,
                                    }}
                                  >
                                    {a.body}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      <div className="gowl-qcomposer">
                        <Avatar profile={findProfile(pseudo)} size={26} />
                        <input
                          value={replyDraft[q.id] || ""}
                          onChange={(e) =>
                            setReplyDraft((d) => ({
                              ...d,
                              [q.id]: e.target.value,
                            }))
                          }
                          onKeyDown={(e) =>
                            e.key === "Enter" && addAnswer(q.id)
                          }
                          onFocus={() => {
                            if (!currentUser)
                              window.dispatchEvent(
                                new CustomEvent("open-auth-login"),
                              );
                          }}
                          placeholder={
                            currentUser
                              ? "Écris une réponse utile et détaillée..."
                              : "Connecte-toi pour répondre..."
                          }
                          className="flex-1 px-3 py-1.5 rounded-md text-sm"
                          style={{
                            ...inputStyle,
                            background: "transparent",
                            border: "none",
                            boxShadow: "none",
                          }}
                        />
                        <PrimaryButton onClick={() => addAnswer(q.id)}>
                          <Send size={13} /> Répondre
                        </PrimaryButton>
                      </div>
                    </div>
                  )}
                </Panel>
              );
            })}
          </div>
        </div>
        <InfoSidebar>
          <StatCardsRow
            vertical
            items={[
              {
                icon: <Flag size={13} />,
                label: "Questions",
                value: questions.length,
                accent: C.primary,
              },
              {
                icon: <MessageSquare size={13} />,
                label: "Réponses données",
                value: questions.reduce((s, q) => s + q.answers.length, 0),
                accent: C.ok,
              },
              {
                icon: <CheckCircle2 size={13} />,
                label: "Résolues",
                value: questions.filter((q) => q.resolved).length,
                accent: C.gold,
              },
            ]}
          />
        </InfoSidebar>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Hub (multi-rooms) — discussion en direct + réactions
--------------------------------------------------------------------- */
const REACTION_EMOJIS = ["👍", "🔥", "💀", "🐛", "😂"];

function RoomsTab({
  pseudo,
  messages,
  setMessages,
  isAdmin,
  lang = "fr",
  profiles = [],
  currentUser = null,
}) {
  const [room, setRoom] = useState("general");
  const [text, setText] = useState("");
  const [rooms, setRooms] = useState(DEFAULT_ROOMS);
  const [newRoomName, setNewRoomName] = useState("");
  const [showRoomCreator, setShowRoomCreator] = useState(false);
  const [roomSearch, setRoomSearch] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [newRoomType, setNewRoomType] = useState("public");
  const [newRoomIcon, setNewRoomIcon] = useState("hash");
  const [newRoomPassword, setNewRoomPassword] = useState("");
  const [banUsername, setBanUsername] = useState("");
  const [banFeedback, setBanFeedback] = useState("");
  const [transferUsername, setTransferUsername] = useState("");
  const [roomActionFeedback, setRoomActionFeedback] = useState("");
  const [roomJoinPassword, setRoomJoinPassword] = useState({});
  const [roomJoinError, setRoomJoinError] = useState("");
  const [roomAccess, setRoomAccess] = useState({ general: true });
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const bottomRef = useRef(null);
  const roomMessages = messages.filter((m) => (m.room || "general") === room);
  const current =
    rooms.find((r) => r.key === room) || rooms[0] || DEFAULT_ROOMS[0];
  const visibleRooms = rooms.filter(
    (item) =>
      !isRetiredHubRoom(item) &&
      `${item.label} ${item.desc || ""} ${item.key}`
        .toLowerCase()
        .includes(roomSearch.trim().toLowerCase()),
  );
  const isOwner = current.owner === pseudo;
  const isAnnouncementOnly = current.adminOnly === true && !isAdmin;
  const isBanned = (current.bannedUsers || []).includes(pseudo);
  const accessLocked =
    current.isPublic === false &&
    !isOwner &&
    !isAdmin &&
    !roomAccess[current.key] &&
    current.key !== "general";
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [roomMessages.length, room]);
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const result = await communityRequest();
        if (!active) return;
        const remoteRooms = Array.isArray(result.rooms)
          ? result.rooms.filter((remote) => !isRetiredHubRoom(remote))
          : [];
        const saved = [
          ...DEFAULT_ROOMS,
          ...remoteRooms.filter(
            (remote) => !DEFAULT_ROOMS.some((room) => room.key === remote.key),
          ),
        ];
        const normalized = saved.map((room) => ({
          ...room,
          owner: room.owner || "system",
          passwordHash: room.passwordHash || null,
          bannedUsers: Array.isArray(room.bannedUsers) ? room.bannedUsers : [],
          icon: room.icon || (room.key === "general" ? "web" : "hash"),
          adminOnly: room.adminOnly === true || room.key === "updates",
          official: room.official === true || room.key === "updates",
        }));
        setRooms(normalized);
        setRoomAccess((prev) => ({
          ...prev,
          general: true,
          ...Object.fromEntries(
            normalized
              .filter((r) => r.isPublic !== false)
              .map((r) => [r.key, true]),
          ),
        }));
      } catch (error) {
        console.error("Chargement des salons impossible :", error);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  async function send() {
    if (!currentUser) return;
    if (!text.trim()) return;
    const activeRoom =
      rooms.find((r) => r.key === room) || rooms[0] || DEFAULT_ROOMS[0];
    if (activeRoom.adminOnly && !isAdmin) {
      setRoomActionFeedback(
        "Ce salon est réservé aux annonces officielles des administrateurs.",
      );
      return;
    }
    if ((activeRoom.bannedUsers || []).includes(pseudo)) return;
    if (
      activeRoom.isPublic === false &&
      !isOwner &&
      !isAdmin &&
      !roomAccess[activeRoom.key] &&
      activeRoom.key !== "general"
    )
      return;
    const content = text.trim();

    socket.emit("hub-message:send", { content, room }, (response) => {
      if (!response?.success) {
        setRoomActionFeedback(
          response?.message || "Impossible d'envoyer le message.",
        );
        return;
      }

      setText("");
      setShowEmojiPicker(false);
      setRoomActionFeedback("");
    });
  }
  function removeMsg(id) {
    const messageId = Number(id);
    const target = messages.find((message) => Number(message.id) === messageId);

    if (!Number.isInteger(messageId) || messageId <= 0) {
      setRoomActionFeedback("Identifiant du message invalide.");
      return;
    }

    if (!target || (!isAdmin && target.author !== pseudo)) {
      setRoomActionFeedback(
        "Tu n’as pas la permission de supprimer ce message.",
      );
      return;
    }

    socket.emit("hub-message:delete", { id: messageId }, (response) => {
      if (!response?.success) {
        setRoomActionFeedback(
          response?.message || "Impossible de supprimer le message.",
        );
        return;
      }

      setMessages((currentMessages) =>
        currentMessages.filter((message) => Number(message.id) !== messageId),
      );
      setRoomActionFeedback("");
    });
  }
  function startEditMsg(m) {
    setEditingId(m.id);
    setEditText(m.text);
  }
  function cancelEditMsg() {
    setEditingId(null);
    setEditText("");
  }
  async function saveEditMsg(id) {
    const value = editText.trim();
    if (!value) return;
    const target = messages.find((m) => m.id === id);
    if (!target || (!isAdmin && target.author !== pseudo)) return;
    const next = messages.map((m) =>
      m.id === id
        ? {
            ...m,
            text: value,
            edited: true,
            editedAt: new Date().toISOString(),
          }
        : m,
    );
    setMessages(next);
    saveCollection("gowlsec:chat", next);
    try {
      socket.emit("hub-message:edit", { id, content: value });
    } catch {
      /* best effort — édition locale déjà appliquée */
    }
    setEditingId(null);
    setEditText("");
  }
  async function toggleReaction(id, emoji) {
    const next = messages.map((m) => {
      if (m.id !== id) return m;
      const reactions = { ...(m.reactions || {}) };
      const users = reactions[emoji] || [];
      reactions[emoji] = users.includes(pseudo)
        ? users.filter((u) => u !== pseudo)
        : [...users, pseudo];
      if (reactions[emoji].length === 0) delete reactions[emoji];
      return { ...m, reactions };
    });
    setMessages(next);
    saveCollection("gowlsec:chat", next);
  }

  async function createRoom(e) {
    e.preventDefault();
    if (!currentUser) return;
    const name = newRoomName.trim();
    if (!name) return;
    if (newRoomType === "private" && !newRoomPassword.trim()) return;
    try {
      const result = await communityRequest("/rooms", {
        method: "POST",
        body: {
          label: name,
          description:
            newRoomType === "public" ? "Salon public" : "Salon privé",
          icon: newRoomIcon,
          isPublic: newRoomType === "public",
          password: newRoomPassword.trim(),
        },
      });
      setRooms((currentRooms) => [...currentRooms, result.room]);
      setRoom(result.room.key);
      setRoomAccess((prev) => ({ ...prev, [result.room.key]: true }));
      setNewRoomName("");
      setNewRoomPassword("");
      setNewRoomType("public");
      setNewRoomIcon("hash");
      setShowRoomCreator(false);
    } catch (error) {
      setRoomActionFeedback(error.message);
    }
  }

  async function openRoom(targetRoom) {
    if (targetRoom.key === room) return;
    if (
      targetRoom.isPublic !== false ||
      targetRoom.owner === pseudo ||
      isAdmin ||
      roomAccess[targetRoom.key]
    ) {
      setRoom(targetRoom.key);
      setRoomJoinError("");
      return;
    }
    const attempt = (roomJoinPassword[targetRoom.key] || "").trim();
    if (!attempt) {
      setRoomJoinError("Mot de passe requis pour rejoindre ce salon privé.");
      return;
    }
    const hash = await hashText(attempt);
    if (hash !== targetRoom.passwordHash) {
      setRoomJoinError("Mot de passe incorrect.");
      setRoomJoinPassword((prev) => ({ ...prev, [targetRoom.key]: "" }));
      return;
    }
    setRoomAccess((prev) => ({ ...prev, [targetRoom.key]: true }));
    setRoomJoinPassword((prev) => ({ ...prev, [targetRoom.key]: attempt }));
    setRoomJoinError("");
    setRoom(targetRoom.key);
  }

  async function banUser(e) {
    e.preventDefault();
    const target = banUsername.trim();
    if (!target || !isOwner) return;
    const targetRoom =
      rooms.find((r) => r.key === room) || rooms[0] || DEFAULT_ROOMS[0];
    if ((targetRoom.bannedUsers || []).includes(target)) {
      setBanFeedback(`"${target}" est déjà banni.`);
      return;
    }
    const nextRooms = rooms.map((r) =>
      r.key === room
        ? { ...r, bannedUsers: [...(r.bannedUsers || []), target] }
        : r,
    );
    setRooms(nextRooms);
    saveCollection("gowlsec:rooms", nextRooms);
    setBanUsername("");
    setBanFeedback(`"${target}" a été banni du salon.`);
  }

  async function transferRoomOwner() {
    if (!isOwner) return;
    const target = transferUsername.trim();
    if (!target || target === pseudo) {
      setRoomActionFeedback(
        "Choisis un autre pseudo pour transférer la propriété.",
      );
      return;
    }
    const knownUsernames = (profiles || [])
      .map((profile) => profile.username)
      .filter(Boolean);
    if (knownUsernames.length > 0 && !knownUsernames.includes(target)) {
      setRoomActionFeedback("Ce pseudo n'est pas reconnu dans la communauté.");
      return;
    }
    const nextRooms = rooms.map((r) =>
      r.key === room ? { ...r, owner: target } : r,
    );
    setRooms(nextRooms);
    saveCollection("gowlsec:rooms", nextRooms);
    setTransferUsername("");
    setRoomActionFeedback(`La propriété a été transférée à "${target}".`);
  }

  async function deleteRoom() {
    if (!isOwner) return;
    const targetRoom =
      rooms.find((r) => r.key === room) || rooms[0] || DEFAULT_ROOMS[0];
    if (!targetRoom.id) {
      setRoomActionFeedback(
        "Les salons système ne peuvent pas être supprimés.",
      );
      return;
    }
    if (
      !window.confirm(
        `Supprimer définitivement le salon « ${targetRoom.label} » et ses messages ?`,
      )
    )
      return;
    try {
      await communityRequest(`/rooms/${targetRoom.id}`, { method: "DELETE" });
      const nextRooms = rooms.filter((r) => r.key !== targetRoom.key);
      const nextMessages = messages.filter((m) => m.room !== targetRoom.key);
      setRooms(nextRooms);
      setMessages(nextMessages);
      setRoom(
        nextRooms.find((item) => item.key === "general")?.key ||
          nextRooms[0]?.key ||
          "general",
      );
      setRoomActionFeedback(
        `Le salon « ${targetRoom.label} » a été supprimé définitivement.`,
      );
    } catch (error) {
      setRoomActionFeedback(
        error.message || "Impossible de supprimer le salon.",
      );
    }
  }

  async function reportHubMessage(message) {
    if (!currentUser) return;
    const reason = window.prompt("Pourquoi signales-tu ce message ?");
    if (!reason) return;
    try {
      await apiRequest("/api/social/reports", {
        method: "POST",
        body: {
          targetType: "message",
          targetId: String(message.id),
          reason,
          details: `#${message.room || room} · ${String(message.text || "").slice(0, 300)}`,
        },
      });
      window.alert("Signalement transmis à la modération.");
    } catch (error) {
      window.alert(error.message);
    }
  }

  return (
    <div className="gowl-community-view gowl-view-hub">
      <Panel
        className="overflow-hidden mb-6 gowl-community-card"
        style={{
          border: `1px solid ${C.line}`,
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <div className="grid md:grid-cols-[0.92fr_1.3fr]">
          <div
            className="relative flex flex-col justify-center px-6 pt-6 pb-5"
            style={{
              background: "rgba(255,255,255,0.03)",
              borderRight: `1px solid ${C.line}`,
            }}
          >
            <HubScene />
            <span
              className="text-[11px] font-bold uppercase tracking-widest mb-1.5"
              style={{ color: C.ok, fontFamily: MONO_FONT }}
            >
              {t(lang, "hubHeroEyebrow")}
            </span>
            <h3
              className="text-lg font-bold mb-1.5 leading-tight"
              style={{ color: C.text, fontFamily: DISPLAY_FONT }}
            >
              {t(lang, "hubHeroTitle")}
            </h3>
            <p
              className="text-xs leading-relaxed"
              style={{ color: C.muted, fontFamily: BODY_FONT }}
            >
              {t(lang, "hubHeroSub")}
            </p>
          </div>
          <div className="p-5">
            {!currentUser ? (
              <GuestGate
                text="Connecte-toi pour créer un salon."
                accent={C.ok}
              />
            ) : showRoomCreator ? (
              <form
                onSubmit={createRoom}
                className="rounded-xl border p-4 gowl-fade-up"
                style={{
                  background: C.panel2,
                  borderColor: C.line,
                }}
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div>
                    <span
                      className="text-[9px] uppercase tracking-widest"
                      style={{ color: C.ok, fontFamily: MONO_FONT }}
                    >
                      Nouveau salon
                    </span>
                    <p className="text-xs mt-0.5" style={{ color: C.muted }}>
                      Configure un espace public ou privé.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowRoomCreator(false)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ color: C.muted, border: `1px solid ${C.line}` }}
                    aria-label="Fermer la création"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="mb-3">
                  <label
                    className="block text-[11px] uppercase tracking-wide mb-1.5"
                    style={{ color: C.muted, fontFamily: MONO_FONT }}
                  >
                    Logo du salon
                  </label>
                  <div className="gowl-roomicon-grid">
                    {ROOM_ICONS.map((ic) => {
                      const IconEl = ic.icon;
                      const active = newRoomIcon === ic.key;
                      return (
                        <button
                          type="button"
                          key={ic.key}
                          onClick={() => setNewRoomIcon(ic.key)}
                          title={ic.label}
                          className="gowl-roomicon-btn"
                          data-active={active}
                          style={{ "--gowl-accent": ic.color }}
                        >
                          <IconEl size={17} />
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                  <div className="flex-1">
                    <label
                      className="block text-[11px] uppercase tracking-wide mb-1"
                      style={{ color: C.muted, fontFamily: MONO_FONT }}
                    >
                      Nom du salon
                    </label>
                    <input
                      value={newRoomName}
                      onChange={(e) => setNewRoomName(e.target.value)}
                      placeholder="Ex. CTF juniors"
                      className="w-full px-3 py-2 rounded-md text-sm"
                      style={{
                        ...inputStyle,
                        background: "rgba(5,10,16,0.75)",
                        border: `1px solid ${C.line}`,
                      }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setNewRoomType("public")}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-sm font-semibold transition-opacity"
                      style={{
                        background:
                          newRoomType === "public"
                            ? `${C.primary}22`
                            : C.panel2,
                        color: newRoomType === "public" ? C.primary : C.muted,
                        border: `1px solid ${newRoomType === "public" ? C.primary : "transparent"}`,
                        fontFamily: BODY_FONT,
                      }}
                    >
                      <Globe size={14} />
                      Public
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewRoomType("private")}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-sm font-semibold transition-opacity"
                      style={{
                        background:
                          newRoomType === "private" ? `${C.alert}22` : C.panel2,
                        color: newRoomType === "private" ? C.alert : C.muted,
                        border: `1px solid ${newRoomType === "private" ? C.alert : "transparent"}`,
                        fontFamily: BODY_FONT,
                      }}
                    >
                      <KeyRound size={14} />
                      Privé
                    </button>
                  </div>
                  <PrimaryButton type="submit" style={{ background: C.ok }}>
                    <CheckCircle2 size={14} /> Créer
                  </PrimaryButton>
                </div>
                {newRoomType === "private" && (
                  <div className="mt-2">
                    <label
                      className="block text-[11px] uppercase tracking-wide mb-1"
                      style={{ color: C.muted, fontFamily: MONO_FONT }}
                    >
                      Mot de passe du salon
                    </label>
                    <input
                      type="password"
                      value={newRoomPassword}
                      onChange={(e) => setNewRoomPassword(e.target.value)}
                      placeholder="Définis un mot de passe"
                      className="w-full px-3 py-2 rounded-md text-sm"
                      style={{
                        ...inputStyle,
                        background: "rgba(5,10,16,0.75)",
                        border: `1px solid ${C.line}`,
                      }}
                    />
                  </div>
                )}
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setShowRoomCreator(true)}
                className="w-full min-h-[132px] rounded-xl flex flex-col items-center justify-center gap-2 text-center p-5 gowl-hud-card"
                style={{
                  color: C.text,
                  background: `linear-gradient(145deg, ${C.ok}12, ${C.panel2})`,
                  border: `1px dashed ${C.ok}55`,
                  "--gowl-accent": C.ok,
                }}
              >
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ color: C.ok, background: `${C.ok}18` }}
                >
                  <Plus size={18} />
                </span>
                <span className="text-sm font-bold">Créer un salon</span>
                <span className="text-[10px]" style={{ color: C.muted }}>
                  Choisis son thème, sa visibilité et son identité.
                </span>
              </button>
            )}
          </div>
        </div>
      </Panel>
      <div className="grid md:grid-cols-[270px_1fr] gap-4">
        <Panel
          className="p-2.5 h-fit md:sticky md:top-20 gowl-community-card"
          style={{ borderColor: C.line, background: C.panel }}
        >
          <div className="px-2 pt-1 pb-2.5 flex items-center justify-between">
            <span
              className="text-[10.5px] font-bold uppercase tracking-widest"
              style={{ color: C.muted, fontFamily: MONO_FONT }}
            >
              Salons · {rooms.length}
            </span>
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: C.ok, boxShadow: `0 0 8px ${C.ok}` }}
              title="Hub en ligne"
            />
          </div>
          <div className="relative mb-2">
            <Search
              size={12}
              className="absolute left-3 top-2.5"
              style={{ color: C.muted }}
            />
            <input
              value={roomSearch}
              onChange={(event) => setRoomSearch(event.target.value)}
              placeholder="Rechercher un salon"
              className="w-full pl-8 pr-3 py-2 rounded-lg text-[11px]"
              style={{ ...inputStyle, background: C.panel2 }}
            />
          </div>
          <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
            {visibleRooms.map((r) => {
              const active = r.key === room;
              const roomMsgCount = messages.filter(
                (m) => (m.room || "general") === r.key,
              ).length;
              const ri = getRoomIcon(r.icon);
              const RIcon = ri.icon;
              return (
                <button
                  key={r.key}
                  onClick={() => openRoom(r)}
                  className="gowl-hub-roomitem"
                  data-active={active}
                >
                  <span
                    className="gowl-hub-roomitem-icon"
                    style={{ color: ri.color }}
                  >
                    <RIcon size={13} />
                  </span>
                  <span className="gowl-hub-roomitem-label">{r.label}</span>
                  {r.isPublic === false && (
                    <KeyRound
                      size={11}
                      style={{ opacity: 0.55, flexShrink: 0 }}
                    />
                  )}
                  {r.adminOnly && (
                    <Megaphone
                      size={11}
                      style={{ color: C.gold, flexShrink: 0 }}
                      title="Annonces officielles"
                    />
                  )}
                  {roomMsgCount > 0 && (
                    <span className="gowl-hub-roomitem-count">
                      {roomMsgCount}
                    </span>
                  )}
                </button>
              );
            })}
            {visibleRooms.length === 0 && (
              <p className="text-[10px] p-3 text-center" style={{ color: C.muted }}>
                Aucun salon trouvé.
              </p>
            )}
          </div>
        </Panel>
        <Panel
          className="flex flex-col overflow-hidden gowl-community-card"
          style={{
            height: 620,
            borderColor: C.line,
            background: C.panel,
          }}
        >
          <div className="gowl-hub-header">
            <span
              className="gowl-hub-header-icon"
              style={{
                background: `${getRoomIcon(current.icon).color}1E`,
                color: getRoomIcon(current.icon).color,
              }}
            >
              {(() => {
                const HIcon = getRoomIcon(current.icon).icon;
                return <HIcon size={15} />;
              })()}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span
                  className="text-sm font-bold truncate"
                  style={{ color: C.text, fontFamily: DISPLAY_FONT }}
                >
                  {current.label}
                </span>
                {current.isPublic === false && (
                  <span
                    className="gowl-hub-header-tag"
                    style={{
                      color: C.warn,
                      borderColor: `${C.warn}55`,
                      background: `${C.warn}14`,
                    }}
                  >
                    Privé
                  </span>
                )}
                {current.official && (
                  <span
                    className="gowl-hub-header-tag"
                    style={{
                      color: C.gold,
                      borderColor: `${C.gold}55`,
                      background: `${C.gold}14`,
                    }}
                  >
                    Officiel
                  </span>
                )}
              </div>
              <span
                className="text-xs"
                style={{ color: C.muted, fontFamily: BODY_FONT }}
              >
                {current.desc}
              </span>
            </div>
            <span className="gowl-hub-header-live">
              <span className="gowl-live-dot" style={{ background: C.ok }} /> En
              direct
            </span>
          </div>
          <div
            className="flex-1 overflow-y-auto px-4 py-3"
            style={{
              background: `radial-gradient(circle at 90% 0%, ${C.primary}0B, transparent 32%), ${C.panel2}66`,
            }}
          >
            {isOwner && (
              <div
                className="rounded-xl border p-3 mb-3"
                style={{
                  borderColor: C.line,
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                  <div className="flex-1">
                    <label
                      className="block text-[11px] uppercase tracking-wide mb-1"
                      style={{ color: C.muted, fontFamily: MONO_FONT }}
                    >
                      Transférer la propriété
                    </label>
                    <input
                      value={transferUsername}
                      onChange={(e) => setTransferUsername(e.target.value)}
                      placeholder="Nom d'utilisateur"
                      className="w-full px-3 py-2 rounded-md text-sm"
                      style={{
                        ...inputStyle,
                        background: "rgba(5,10,16,0.75)",
                        border: `1px solid ${C.line}`,
                      }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={transferRoomOwner}
                      className="px-3 py-2 rounded-md text-sm"
                      style={{
                        background: C.primary,
                        color: "#fff",
                        fontFamily: BODY_FONT,
                      }}
                    >
                      Transférer
                    </button>
                    <button
                      type="button"
                      onClick={deleteRoom}
                      className="px-3 py-2 rounded-md text-sm"
                      style={{
                        background: C.alert,
                        color: "#fff",
                        fontFamily: BODY_FONT,
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
                {roomActionFeedback && (
                  <p
                    className="text-xs mt-2"
                    style={{ color: C.muted, fontFamily: BODY_FONT }}
                  >
                    {roomActionFeedback}
                  </p>
                )}
              </div>
            )}
            {accessLocked ? (
              <div
                className="rounded-xl border p-4"
                style={{
                  borderColor: C.line,
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <KeyRound size={14} style={{ color: C.warn }} />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: C.text, fontFamily: BODY_FONT }}
                  >
                    Salon privé
                  </span>
                </div>
                <p
                  className="text-base mb-3"
                  style={{ color: C.muted, fontFamily: BODY_FONT }}
                >
                  Ce salon est protégé par un mot de passe. Entrez-le pour
                  rejoindre la discussion.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="password"
                    value={roomJoinPassword[current.key] || ""}
                    onChange={(e) =>
                      setRoomJoinPassword((prev) => ({
                        ...prev,
                        [current.key]: e.target.value,
                      }))
                    }
                    placeholder="Mot de passe du salon"
                    className="flex-1 px-3 py-2 rounded-md text-sm"
                    style={{
                      ...inputStyle,
                      background: "rgba(5,10,16,0.75)",
                      border: `1px solid ${C.line}`,
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => openRoom(current)}
                    className="px-3 py-2 rounded-md text-sm"
                    style={{
                      background: C.primary,
                      color: "#fff",
                      fontFamily: BODY_FONT,
                    }}
                  >
                    Rejoindre
                  </button>
                </div>
                {roomJoinError && (
                  <p
                    className="text-xs mt-2"
                    style={{ color: C.alert, fontFamily: BODY_FONT }}
                  >
                    {roomJoinError}
                  </p>
                )}
              </div>
            ) : (
              <>
                {roomMessages.length === 0 && (
                  <div className="gowl-hub-empty">
                    <span className="gowl-hub-empty-icon">
                      <MessageSquare size={20} />
                    </span>
                    <p className="gowl-hub-empty-title">
                      Aucun message dans ce salon
                    </p>
                    <p className="gowl-hub-empty-sub">
                      Envoie le premier message pour lancer la discussion.
                    </p>
                  </div>
                )}
                {roomMessages.map((m, idx) => {
                  const reactions = m.reactions || {};
                  const authorProfile = profiles.find(
                    (p) => p.username === m.author,
                  );
                  const isSelf = !!pseudo && m.author === pseudo;
                  const isEditing = editingId === m.id;
                  const prevMsg = roomMessages[idx - 1];
                  const grouped =
                    !!prevMsg &&
                    prevMsg.author === m.author &&
                    new Date(m.createdAt).getTime() -
                      new Date(prevMsg.createdAt).getTime() <
                      5 * 60 * 1000;
                  const hhmm = new Date(m.createdAt).toLocaleTimeString(
                    "fr-FR",
                    { hour: "2-digit", minute: "2-digit" },
                  );
                  return (
                    <div
                      key={m.id}
                      className="gowl-hub-msg group"
                      data-grouped={grouped}
                      data-self={isSelf}
                    >
                      <div className="gowl-hub-msg-gutter">
                        {grouped ? (
                          <span className="gowl-hub-msg-hovertime">{hhmm}</span>
                        ) : (
                          <Avatar profile={authorProfile} size={30} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0 relative">
                        {!isEditing && currentUser && (
                          <span className="gowl-hub-msg-hoveractions opacity-0 group-hover:opacity-100 transition-opacity">
                            {isSelf && (
                              <button
                                onClick={() => startEditMsg(m)}
                                title="Modifier"
                                className="gowl-hub-msg-action"
                                style={{ color: C.muted }}
                              >
                                <Pencil size={11} />
                              </button>
                            )}
                            {(isSelf || isAdmin) && (
                              <button
                                onClick={() => removeMsg(m.id)}
                                title="Supprimer"
                                className="gowl-hub-msg-action"
                                style={{ color: C.alert }}
                              >
                                <Trash2 size={11} />
                              </button>
                            )}
                            {!isSelf && (
                              <button
                                onClick={() => reportHubMessage(m)}
                                title="Signaler"
                                className="gowl-hub-msg-action"
                                style={{ color: C.warn }}
                              >
                                <Flag size={11} />
                              </button>
                            )}
                          </span>
                        )}
                        {!grouped && (
                          <div className="gowl-hub-msg-author">
                            <span
                              className="text-[13px] font-bold"
                              style={{ color: C.text, fontFamily: BODY_FONT }}
                            >
                              {m.author}
                            </span>
                            {isAdminProfile(authorProfile) && <AdminBadge />}
                            <span
                              className="text-[11px]"
                              style={{ color: C.muted, fontFamily: MONO_FONT }}
                            >
                              {timeAgo(m.createdAt)}
                            </span>
                            {m.edited && (
                              <span
                                className="text-[10px] italic"
                                style={{
                                  color: C.muted,
                                  fontFamily: BODY_FONT,
                                }}
                              >
                                (modifié)
                              </span>
                            )}
                          </div>
                        )}
                        {isEditing ? (
                          <div className="gowl-hub-msg-edit">
                            <textarea
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  saveEditMsg(m.id);
                                }
                                if (e.key === "Escape") cancelEditMsg();
                              }}
                              autoFocus
                              rows={2}
                              className="w-full px-2.5 py-2 rounded-md text-sm resize-none"
                              style={inputStyle}
                            />
                            <div className="flex items-center gap-2 mt-1.5">
                              <button
                                onClick={() => saveEditMsg(m.id)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold"
                                style={{
                                  background: C.primary,
                                  color: "#fff",
                                  fontFamily: BODY_FONT,
                                }}
                              >
                                <CheckCircle2 size={12} /> Enregistrer
                              </button>
                              <button
                                onClick={cancelEditMsg}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs"
                                style={{
                                  border: `1px solid ${C.line}`,
                                  color: C.muted,
                                  fontFamily: BODY_FONT,
                                }}
                              >
                                <X size={12} /> Annuler
                              </button>
                              <span
                                className="text-[10px]"
                                style={{
                                  color: C.muted,
                                  fontFamily: MONO_FONT,
                                }}
                              >
                                Entrée pour valider · Échap pour annuler
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="gowl-hub-msg-bubble">
                            <MentionedText text={m.text} />{" "}
                            {grouped && m.edited && (
                              <span
                                className="text-[10px] italic ml-1"
                                style={{
                                  color: C.muted,
                                  fontFamily: BODY_FONT,
                                }}
                              >
                                (modifié)
                              </span>
                            )}
                          </div>
                        )}
                        <div className="flex items-center gap-1.5 flex-wrap mt-1.5">
                          {Object.entries(reactions).map(([em, users]) => (
                            <button
                              key={em}
                              onClick={() => toggleReaction(m.id, em)}
                              className="gowl-hub-reaction"
                              data-active={users.includes(pseudo)}
                            >
                              {em} <span>{users.length}</span>
                            </button>
                          ))}
                          <div className="gowl-hub-reaction-picker opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                            {REACTION_EMOJIS.filter(
                              (em) => !(reactions[em] || []).length,
                            ).map((em) => (
                              <button
                                key={em}
                                onClick={() => toggleReaction(m.id, em)}
                                className="gowl-hub-reaction-add"
                              >
                                {em}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={bottomRef} />
              </>
            )}
          </div>
          <div className="p-3" style={{ borderTop: `1px solid ${C.line}` }}>
            {!currentUser && (
              <GuestGate
                text="Connecte-toi pour écrire dans ce salon."
                accent={C.primary}
              />
            )}
            {isOwner && (
              <form
                onSubmit={banUser}
                className="flex flex-col sm:flex-row gap-2 mb-3"
              >
                <input
                  value={banUsername}
                  onChange={(e) => setBanUsername(e.target.value)}
                  placeholder={`Bannir quelqu'un de #${current.label}`}
                  className="flex-1 px-3 py-2 rounded-md text-sm"
                  style={{
                    ...inputStyle,
                    background: "rgba(5,10,16,0.75)",
                    border: `1px solid ${C.line}`,
                  }}
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-md text-sm"
                  style={{
                    background: C.alert,
                    color: "#fff",
                    fontFamily: BODY_FONT,
                  }}
                >
                  Bannir
                </button>
              </form>
            )}
            {banFeedback && (
              <p
                className="text-xs mb-2"
                style={{ color: C.muted, fontFamily: BODY_FONT }}
              >
                {banFeedback}
              </p>
            )}
            {isAnnouncementOnly ? (
              <div
                className="rounded-xl p-3 flex items-center gap-3"
                style={{
                  color: C.gold,
                  background: `linear-gradient(135deg, ${C.gold}12, ${C.panel}CC)`,
                  border: `1px solid ${C.gold}38`,
                }}
              >
                <span
                  className="w-9 h-9 rounded-lg shrink-0 inline-flex items-center justify-center"
                  style={{ background: `${C.gold}18` }}
                >
                  <Megaphone size={16} />
                </span>
                <div>
                  <p className="text-xs font-bold" style={{ color: C.text }}>
                    Canal officiel en lecture seule
                  </p>
                  <p className="text-[11px] mt-0.5" style={{ color: C.muted }}>
                    Seuls les administrateurs peuvent publier les nouveautés de GowlSec.
                  </p>
                </div>
              </div>
            ) : isBanned ? (
              <div
                className="rounded-xl p-3 text-sm"
                style={{
                  background: `${C.panel}CC`,
                  border: `1px solid ${C.line}`,
                  color: C.alert,
                }}
              >
                Vous avez été banni de ce salon.
              </div>
            ) : (
              <div
                className="gowl-hub-composer"
                style={{ opacity: currentUser ? 1 : 0.6 }}
              >
                <button
                  type="button"
                  title="Mentionner un membre"
                  className="gowl-hub-composer-icon"
                  onClick={() =>
                    setText((current) => `${current}${current ? " " : ""}@`)
                  }
                >
                  <UserIcon size={15} />
                </button>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, 1000))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  onFocus={() => {
                    if (!currentUser)
                      window.dispatchEvent(new CustomEvent("open-auth-login"));
                  }}
                  rows={1}
                  disabled={!currentUser}
                  readOnly={!currentUser}
                  placeholder={
                    currentUser
                      ? `Écrire dans #${current.label}...`
                      : "Connecte-toi pour écrire..."
                  }
                  className="gowl-hub-composer-input disabled:cursor-not-allowed"
                  style={inputStyle}
                />
                <span
                  className="hidden sm:inline text-[9px] shrink-0"
                  style={{
                    color: text.length > 900 ? C.warn : C.muted,
                    fontFamily: MONO_FONT,
                  }}
                >
                  {text.length}/1000
                </span>
                <button
                  type="button"
                  title="Emoji"
                  className="gowl-hub-composer-icon"
                  onClick={() => setShowEmojiPicker((value) => !value)}
                >
                  <Smile size={16} />
                </button>
                {showEmojiPicker && (
                  <div
                    className="absolute bottom-[52px] right-10 rounded-xl p-2 flex gap-1 z-20 gowl-fade-up"
                    style={{
                      background: C.panel2,
                      border: `1px solid ${C.line}`,
                      boxShadow: "0 16px 35px -15px rgba(0,0,0,0.8)",
                    }}
                  >
                    {REACTION_EMOJIS.map((emoji) => (
                      <button
                        type="button"
                        key={emoji}
                        onClick={() => {
                          setText((current) => `${current}${emoji}`);
                          setShowEmojiPicker(false);
                        }}
                        className="w-8 h-8 rounded-lg hover:scale-110 transition-transform"
                        style={{ background: C.panel }}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() =>
                    currentUser
                      ? send()
                      : window.dispatchEvent(new CustomEvent("open-auth-login"))
                  }
                  title="Envoyer"
                  className="gowl-hub-composer-send"
                  data-active={text.trim().length > 0}
                  style={{ fontFamily: BODY_FONT }}
                >
                  <Send size={14} />
                </button>
              </div>
            )}
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Team — création de teams (max 16, publique ou privée) + annonces
--------------------------------------------------------------------- */
function TeamsTab({
  pseudo,
  teams,
  setTeams,
  announcements,
  setAnnouncements,
  isAdmin,
  lang = "fr",
  currentUser = null,
}) {
  const [showCreate, setShowCreate] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logoType, setLogoType] = useState("emoji");
  const [logoValue, setLogoValue] = useState(TEAM_EMOJIS[0]);
  const [visibility, setVisibility] = useState("public");
  const [password, setPassword] = useState("");
  const [draft, setDraft] = useState("");
  const [joinPwd, setJoinPwd] = useState({});
  const [joinError, setJoinError] = useState({});

  async function createTeam(e) {
    e.preventDefault();
    if (!currentUser) return;
    if (!name.trim()) return;
    if (visibility === "private" && !password.trim()) return;
    try {
      const result = await communityRequest("/teams", {
        method: "POST",
        body: {
          name: name.trim(),
          description: description.trim(),
          logoType,
          logoValue: logoType === "emoji" ? logoValue : logoValue.trim(),
          visibility,
          password: password.trim(),
          maxMembers: TEAM_MAX_MEMBERS,
        },
      });
      setTeams((current) => [result.team, ...current]);
      setName("");
      setDescription("");
      setLogoType("emoji");
      setLogoValue(TEAM_EMOJIS[0]);
      setVisibility("public");
      setPassword("");
      setShowCreate(false);
      setSelectedId(result.team.id);
    } catch (error) {
      window.alert(error.message);
    }
  }
  async function joinTeam(team) {
    if (!currentUser) return;
    if (team.members.includes(pseudo)) return;
    if (team.members.length >= (team.maxMembers || TEAM_MAX_MEMBERS)) {
      setJoinError((e) => ({
        ...e,
        [team.id]: `Équipe complète (${team.maxMembers || TEAM_MAX_MEMBERS} membres max).`,
      }));
      return;
    }
    if (team.visibility === "private") {
      const attempt = (joinPwd[team.id] || "").trim();
      if (!attempt) {
        setJoinError((e) => ({ ...e, [team.id]: "Mot de passe requis." }));
        return;
      }
      const hash = await hashText(attempt);
      if (hash !== team.passwordHash) {
        setJoinError((e) => ({ ...e, [team.id]: "Mot de passe incorrect." }));
        return;
      }
    }
    const next = teams.map((t) =>
      t.id === team.id ? { ...t, members: [...t.members, pseudo] } : t,
    );
    setTeams(next);
    await saveCollection("gowlsec:teams", next);
    setJoinError((e) => ({ ...e, [team.id]: "" }));
    setJoinPwd((p) => ({ ...p, [team.id]: "" }));
  }
  async function leaveTeam(teamId) {
    const next = teams.map((t) =>
      t.id === teamId
        ? { ...t, members: t.members.filter((m) => m !== pseudo) }
        : t,
    );
    setTeams(next);
    await saveCollection("gowlsec:teams", next);
  }
  async function removeTeam(teamId) {
    try {
      await communityRequest(`/teams/${teamId}`, { method: "DELETE" });
      const next = teams.filter((t) => t.id !== teamId);
      setTeams(next);
      await saveCollection("gowlsec:teams", next);
      const nextAnn = announcements.filter((a) => a.teamId !== teamId);
      setAnnouncements(nextAnn);
      await saveCollection("gowlsec:team_announcements", nextAnn);
      setSelectedId(null);
    } catch (error) {
      window.alert(error.message);
    }
  }
  async function postAnnouncement(teamId) {
    if (!currentUser) return;
    const text = draft.trim();
    if (!text) return;
    const a = {
      id: uid(),
      teamId,
      author: pseudo,
      text,
      createdAt: new Date().toISOString(),
    };
    const next = [a, ...announcements];
    setAnnouncements(next);
    await saveCollection("gowlsec:team_announcements", next);
    setDraft("");
  }
  async function removeAnnouncement(id) {
    const next = announcements.filter((a) => a.id !== id);
    setAnnouncements(next);
    await saveCollection("gowlsec:team_announcements", next);
  }

  const selected = teams.find((t) => t.id === selectedId);

  if (selected) {
    const isMember = selected.members.includes(pseudo);
    const isPrivate = selected.visibility === "private";
    const isFull =
      selected.members.length >= (selected.maxMembers || TEAM_MAX_MEMBERS);
    const teamAnnouncements = announcements.filter(
      (a) => a.teamId === selected.id,
    );
    return (
      <div className="gowl-community-view gowl-view-teams">
        <GhostButton onClick={() => setSelectedId(null)}>
          ← Retour aux équipes
        </GhostButton>
        <Panel className="p-4 mt-3 gowl-community-card">
          <div className="flex items-start gap-3 flex-wrap">
            <TeamLogo team={selected} size={44} />
            <div className="flex-1 min-w-[200px]">
              <div className="flex items-center gap-2 flex-wrap">
                <h2
                  className="text-lg font-bold"
                  style={{ color: C.text, fontFamily: DISPLAY_FONT }}
                >
                  {selected.name}
                </h2>
                <Chip
                  label={isPrivate ? "Privée" : "Publique"}
                  color={isPrivate ? C.warn : C.ok}
                />
              </div>
              <p
                className="text-xs mt-1"
                style={{ color: C.muted, fontFamily: BODY_FONT }}
              >
                {selected.description || "Aucune description."}
              </p>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span
                  className="text-[11px] flex items-center gap-1"
                  style={{ color: C.muted, fontFamily: MONO_FONT }}
                >
                  <Users size={11} /> {selected.members.length}/
                  {selected.maxMembers || TEAM_MAX_MEMBERS} membres
                </span>
                <span
                  className="text-[11px]"
                  style={{ color: C.muted, fontFamily: MONO_FONT }}
                >
                  Capitaine : {selected.owner}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              {isMember ? (
                selected.owner !== pseudo && (
                  <GhostButton onClick={() => leaveTeam(selected.id)}>
                    Quitter
                  </GhostButton>
                )
              ) : isFull ? (
                <span
                  className="text-xs"
                  style={{ color: C.alert, fontFamily: BODY_FONT }}
                >
                  Équipe complète
                </span>
              ) : isPrivate ? (
                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    value={joinPwd[selected.id] || ""}
                    onChange={(e) =>
                      setJoinPwd((p) => ({
                        ...p,
                        [selected.id]: e.target.value,
                      }))
                    }
                    placeholder="mot de passe"
                    className="px-2 py-1 rounded-md text-[11px] w-28"
                    style={inputStyle}
                  />
                  <PrimaryButton onClick={() => joinTeam(selected)}>
                    <KeyRound size={12} /> Rejoindre
                  </PrimaryButton>
                </div>
              ) : (
                <PrimaryButton onClick={() => joinTeam(selected)}>
                  <Plus size={12} /> Rejoindre
                </PrimaryButton>
              )}
              {(isAdmin || selected.owner === pseudo) && (
                <GhostButton danger onClick={() => removeTeam(selected.id)}>
                  <Trash2 size={12} /> Supprimer
                </GhostButton>
              )}
            </div>
          </div>
          {joinError[selected.id] && (
            <p
              className="text-[11px] mt-2 text-right"
              style={{ color: C.alert, fontFamily: BODY_FONT }}
            >
              {joinError[selected.id]}
            </p>
          )}
        </Panel>

        <div className="mt-4">
          <h3
            className="text-[11px] font-bold uppercase tracking-wide mb-2"
            style={{ color: C.muted, fontFamily: MONO_FONT }}
          >
            Annonces
          </h3>
          {isMember && (
            <Panel className="p-2.5 mb-3">
              <div className="flex gap-2">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && postAnnouncement(selected.id)
                  }
                  placeholder="Publier une annonce à l'équipe..."
                  className="flex-1 px-2.5 py-1.5 rounded-md text-sm"
                  style={inputStyle}
                />
                <PrimaryButton onClick={() => postAnnouncement(selected.id)}>
                  <Megaphone size={13} />
                </PrimaryButton>
              </div>
            </Panel>
          )}
          <div className="space-y-2">
            {teamAnnouncements.length === 0 && (
              <EmptyState text="Aucune annonce pour cette équipe." />
            )}
            {teamAnnouncements.map((a) => (
              <Panel
                key={a.id}
                className="p-2.5 flex items-start justify-between gap-3"
              >
                <div>
                  <div
                    className="text-[11px] mb-1"
                    style={{ color: C.primary, fontFamily: MONO_FONT }}
                  >
                    {a.author} · {timeAgo(a.createdAt)}
                  </div>
                  <p
                    className="text-xs"
                    style={{ color: C.text, fontFamily: BODY_FONT }}
                  >
                    {a.text}
                  </p>
                </div>
                {(isAdmin ||
                  a.author === pseudo ||
                  selected.owner === pseudo) && (
                  <button
                    onClick={() => removeAnnouncement(a.id)}
                    style={{ color: C.alert }}
                    className="shrink-0"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </Panel>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gowl-community-view gowl-view-teams">
      <div className="flex flex-col lg:flex-row gap-4 items-start">
        <div className="flex-1 min-w-0 w-full">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <SectionHeader
              icon={<Users size={19} />}
              eyebrow="Escouades"
              title={t(lang, "teamTitle")}
              subtitle={t(lang, "teamSub")}
              accent={C.warn}
            />
            {!currentUser ? (
              <PrimaryButton
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-auth-login"))
                }
              >
                Connexion
              </PrimaryButton>
            ) : (
              <PrimaryButton onClick={() => setShowCreate((s) => !s)}>
                {showCreate ? <X size={15} /> : <Plus size={15} />}{" "}
                {showCreate ? t(lang, "cancel") : t(lang, "newTeam")}
              </PrimaryButton>
            )}
          </div>
          {!currentUser && (
            <GuestGate
              text="Connecte-toi pour créer ou rejoindre une team."
              accent={C.warn}
            />
          )}
          {showCreate && (
            <ModalOverlay onClose={() => setShowCreate(false)}>
              <CreationHero
                scene={<TeamScene />}
                accent={C.warn}
                eyebrow={t(lang, "teamHeroEyebrow")}
                title={t(lang, "teamHeroTitle")}
                subtitle={t(lang, "teamHeroSub")}
                onClose={() => setShowCreate(false)}
              >
                <form onSubmit={createTeam} className="space-y-2.5">
                  <Field label="Nom de l'équipe">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex : Les Corbeaux Noirs"
                      className="w-full px-2.5 py-1.75 rounded-md text-sm"
                      style={inputStyle}
                    />
                  </Field>
                  <Field label="Description">
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={2}
                      placeholder="Objectif de l'équipe, niveau, disponibilités..."
                      className="w-full px-2.5 py-1.75 rounded-md text-sm resize-none"
                      style={inputStyle}
                    />
                  </Field>
                  <Field label="Logo de l'équipe">
                    <div
                      className="flex gap-1 mb-2 p-1 rounded-md w-fit"
                      style={{ background: C.panel2 }}
                    >
                      <button
                        type="button"
                        onClick={() => setLogoType("emoji")}
                        className="text-xs px-2.5 py-1 rounded"
                        style={{
                          background:
                            logoType === "emoji" ? C.primary : "transparent",
                          color: logoType === "emoji" ? "#fff" : C.muted,
                          fontFamily: BODY_FONT,
                        }}
                      >
                        Émoji
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setLogoType("image");
                          setLogoValue("");
                        }}
                        className="text-xs px-2.5 py-1 rounded"
                        style={{
                          background:
                            logoType === "image" ? C.primary : "transparent",
                          color: logoType === "image" ? "#fff" : C.muted,
                          fontFamily: BODY_FONT,
                        }}
                      >
                        Logo perso (URL)
                      </button>
                    </div>
                    {logoType === "emoji" ? (
                      <div className="flex flex-wrap gap-2">
                        {TEAM_EMOJIS.map((em) => (
                          <button
                            type="button"
                            key={em}
                            onClick={() => setLogoValue(em)}
                            className="w-8 h-8 rounded-md flex items-center justify-center text-base"
                            style={{
                              background: C.panel2,
                              outline:
                                logoValue === em
                                  ? `2px solid ${C.primary}`
                                  : `1px solid ${C.line}`,
                              outlineOffset: 1,
                            }}
                          >
                            {em}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <input
                        value={logoValue}
                        onChange={(e) => setLogoValue(e.target.value)}
                        placeholder="https://..."
                        className="w-full px-2.5 py-1.75 rounded-md text-sm"
                        style={inputStyle}
                      />
                    )}
                  </Field>
                  <Field label="Visibilité (16 membres max)">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setVisibility("public")}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.75 rounded-md text-sm"
                        style={{
                          background:
                            visibility === "public" ? C.primary : C.panel2,
                          color: visibility === "public" ? "#fff" : C.muted,
                          fontFamily: BODY_FONT,
                        }}
                      >
                        <Globe size={14} /> Publique
                      </button>
                      <button
                        type="button"
                        onClick={() => setVisibility("private")}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.75 rounded-md text-sm"
                        style={{
                          background:
                            visibility === "private" ? C.primary : C.panel2,
                          color: visibility === "private" ? "#fff" : C.muted,
                          fontFamily: BODY_FONT,
                        }}
                      >
                        <Lock size={14} /> Privée
                      </button>
                    </div>
                  </Field>
                  {visibility === "private" && (
                    <Field label="Mot de passe de l'équipe">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Requis pour une équipe privée"
                        className="w-full px-2.5 py-1.75 rounded-md text-sm"
                        style={inputStyle}
                      />
                    </Field>
                  )}
                  <PrimaryButton type="submit" className="!py-2">
                    <CheckCircle2 size={14} /> Créer l'équipe
                  </PrimaryButton>
                </form>
              </CreationHero>
            </ModalOverlay>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            {teams.length === 0 && (
              <EmptyState
                icon={<Users size={20} />}
                accent={C.warn}
                text="Aucune équipe pour l'instant. Sois le premier à en créer une."
                cta="Créer une équipe"
                onCta={() => setShowCreate(true)}
              />
            )}
            {teams.map((t) => {
              const isPrivate = t.visibility === "private";
              const fillPct = Math.min(
                100,
                Math.round(
                  (t.members.length / (t.maxMembers || TEAM_MAX_MEMBERS)) * 100,
                ),
              );
              return (
                <Panel
                  key={t.id}
                  className="p-3 pt-4 cursor-pointer gowl-hud-card gowl-glass relative overflow-hidden"
                  style={{ "--gowl-accent": isPrivate ? C.warn : C.ok }}
                  onClick={() => setSelectedId(t.id)}
                >
                  <div
                    aria-hidden
                    className="absolute top-0 left-0 right-0 h-[3px]"
                    style={{
                      background: `linear-gradient(90deg, ${isPrivate ? C.warn : C.ok}, transparent)`,
                    }}
                  />
                  <div className="flex items-center gap-2.5 mb-2">
                    <TeamLogo team={t} size={32} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3
                          className="font-semibold text-[13px] truncate"
                          style={{ color: C.text, fontFamily: DISPLAY_FONT }}
                        >
                          {t.name}
                        </h3>
                      </div>
                      <span
                        className="text-[11px] flex items-center gap-1"
                        style={{ color: C.muted, fontFamily: MONO_FONT }}
                      >
                        <Users size={10} /> {t.members.length}/
                        {t.maxMembers || TEAM_MAX_MEMBERS} membres
                      </span>
                    </div>
                    <Chip
                      label={isPrivate ? "Privée" : "Publique"}
                      color={isPrivate ? C.warn : C.ok}
                    />
                  </div>
                  <div
                    className="w-full rounded-full overflow-hidden mb-3"
                    style={{ height: 4, background: C.panel2 }}
                  >
                    <div
                      className="gowl-bar-fill h-full rounded-full"
                      style={{
                        width: `${fillPct}%`,
                        background: `linear-gradient(90deg, ${isPrivate ? C.warn : C.ok}, ${isPrivate ? C.warn : C.ok}88)`,
                      }}
                    />
                  </div>
                  <p
                    className="text-[11px] line-clamp-2"
                    style={{ color: C.muted, fontFamily: BODY_FONT }}
                  >
                    {t.description || "Aucune description."}
                  </p>
                  <div
                    className="mt-2 pt-1.5 flex items-center justify-between"
                    style={{ borderTop: `1px solid ${C.line}` }}
                  >
                    <span
                      className="text-[11px]"
                      style={{ color: C.primary, fontFamily: MONO_FONT }}
                    >
                      Capitaine : {t.owner}
                    </span>
                    <span
                      className="text-[11px]"
                      style={{ color: C.muted, fontFamily: MONO_FONT }}
                    >
                      {timeAgo(t.createdAt)}
                    </span>
                  </div>
                </Panel>
              );
            })}
          </div>
        </div>
        <InfoSidebar>
          <StatCardsRow
            vertical
            items={[
              {
                icon: <Users size={13} />,
                label: "Équipes actives",
                value: teams.length,
                accent: C.warn,
              },
              {
                icon: <UserIcon size={13} />,
                label: "Membres cumulés",
                value: teams.reduce((s, tm) => s + tm.members.length, 0),
                accent: C.primary,
              },
              {
                icon: <Unlock size={13} />,
                label: "Places libres",
                value: teams.reduce(
                  (s, tm) =>
                    s +
                    Math.max(
                      0,
                      (tm.maxMembers || TEAM_MAX_MEMBERS) - tm.members.length,
                    ),
                  0,
                ),
                accent: C.ok,
              },
            ]}
          />
        </InfoSidebar>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Labs — salons de session pour HTB / TryHackMe / Root-Me (8 max)
--------------------------------------------------------------------- */
function LabsTab({
  pseudo,
  labs,
  setLabs,
  labMessages,
  setLabMessages,
  isAdmin,
  lang = "fr",
  currentUser = null,
}) {
  const [showCreate, setShowCreate] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState(LAB_PLATFORMS[0].key);
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [password, setPassword] = useState("");
  const [joinPwd, setJoinPwd] = useState({});
  const [joinError, setJoinError] = useState({});
  const [chatText, setChatText] = useState("");
  const bottomRef = useRef(null);

  async function createLab(e) {
    e.preventDefault();
    if (!currentUser) return;
    if (!title.trim()) return;
    if (visibility === "private" && !password.trim()) return;
    try {
      const result = await communityRequest("/labs", {
        method: "POST",
        body: {
          title: title.trim(),
          platform,
          description: description.trim(),
          visibility,
          password: password.trim(),
          maxMembers: LAB_MAX_MEMBERS,
        },
      });
      setLabs((current) => [result.lab, ...current]);
      setTitle("");
      setPlatform(LAB_PLATFORMS[0].key);
      setDescription("");
      setVisibility("public");
      setPassword("");
      setShowCreate(false);
      setSelectedId(result.lab.id);
    } catch (error) {
      window.alert(error.message);
    }
  }
  async function joinLab(lab) {
    if (!currentUser) return;
    if (lab.members.includes(pseudo)) return;
    if (lab.members.length >= (lab.maxMembers || LAB_MAX_MEMBERS)) {
      setJoinError((e) => ({
        ...e,
        [lab.id]: `Salon complet (${lab.maxMembers || LAB_MAX_MEMBERS} personnes max).`,
      }));
      return;
    }
    if (lab.visibility === "private") {
      const attempt = (joinPwd[lab.id] || "").trim();
      if (!attempt) {
        setJoinError((e) => ({ ...e, [lab.id]: "Mot de passe requis." }));
        return;
      }
      const hash = await hashText(attempt);
      if (hash !== lab.passwordHash) {
        setJoinError((e) => ({ ...e, [lab.id]: "Mot de passe incorrect." }));
        return;
      }
    }
    const next = labs.map((l) =>
      l.id === lab.id ? { ...l, members: [...l.members, pseudo] } : l,
    );
    setLabs(next);
    await saveCollection("gowlsec:labs", next);
    setJoinError((e) => ({ ...e, [lab.id]: "" }));
    setJoinPwd((p) => ({ ...p, [lab.id]: "" }));
  }
  async function leaveLab(labId) {
    const next = labs.map((l) =>
      l.id === labId
        ? { ...l, members: l.members.filter((m) => m !== pseudo) }
        : l,
    );
    setLabs(next);
    await saveCollection("gowlsec:labs", next);
  }
  async function removeLab(labId) {
    try {
      await communityRequest(`/labs/${labId}`, { method: "DELETE" });
      const next = labs.filter((l) => l.id !== labId);
      setLabs(next);
      await saveCollection("gowlsec:labs", next);
      const nextMsgs = labMessages.filter((m) => m.labId !== labId);
      setLabMessages(nextMsgs);
      await saveCollection("gowlsec:lab_messages", nextMsgs);
      setSelectedId(null);
    } catch (error) {
      window.alert(error.message);
    }
  }
  async function toggleLabFinished(labId) {
    const next = labs.map((l) =>
      l.id === labId ? { ...l, finished: !l.finished } : l,
    );
    setLabs(next);
    await saveCollection("gowlsec:labs", next);
  }
  async function sendLabMessage(labId) {
    if (!currentUser) return;
    const text = chatText.trim();
    if (!text) return;
    const m = {
      id: uid(),
      labId,
      author: pseudo,
      text,
      createdAt: new Date().toISOString(),
    };
    const next = [...labMessages, m];
    setLabMessages(next);
    await saveCollection("gowlsec:lab_messages", next);
    setChatText("");
  }
  async function removeLabMessage(id) {
    const next = labMessages.filter((m) => m.id !== id);
    setLabMessages(next);
    await saveCollection("gowlsec:lab_messages", next);
  }

  const selected = labs.find((l) => l.id === selectedId);
  const selectedMessages = selected
    ? labMessages.filter((m) => m.labId === selected.id)
    : [];
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedMessages.length, selectedId]);

  if (selected) {
    const isMember = selected.members.includes(pseudo);
    const isPrivate = selected.visibility === "private";
    const isFull =
      selected.members.length >= (selected.maxMembers || LAB_MAX_MEMBERS);
    const plat =
      LAB_PLATFORMS.find((p) => p.key === selected.platform) ||
      LAB_PLATFORMS[3];
    return (
      <div className="gowl-community-view gowl-view-labs">
        <GhostButton onClick={() => setSelectedId(null)}>
          ← Retour aux labs
        </GhostButton>
        <Panel className="p-5 mt-4 gowl-community-card">
          <div className="flex items-start gap-4 flex-wrap">
            <div
              className="w-14 h-14 rounded-md flex items-center justify-center shrink-0"
              style={{ background: `${C.primary}1A`, color: C.primary }}
            >
              <Bug size={26} />
            </div>
            <div className="flex-1 min-w-[200px]">
              <div className="flex items-center gap-2 flex-wrap">
                <h2
                  className="text-xl font-bold"
                  style={{ color: C.text, fontFamily: DISPLAY_FONT }}
                >
                  {selected.title}
                </h2>
                <Chip
                  label={isPrivate ? "Privé" : "Public"}
                  color={isPrivate ? C.warn : C.ok}
                />
                <Chip label={plat.label} color={C.primary} />
                {selected.finished && <Chip label="Terminé" color={C.ok} />}
              </div>
              <p
                className="text-sm mt-1"
                style={{ color: C.muted, fontFamily: BODY_FONT }}
              >
                {selected.description || "Aucune description."}
              </p>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span
                  className="text-xs flex items-center gap-1"
                  style={{ color: C.muted, fontFamily: MONO_FONT }}
                >
                  <Users size={12} /> {selected.members.length}/
                  {selected.maxMembers || LAB_MAX_MEMBERS} membres
                </span>
                <span
                  className="text-xs"
                  style={{ color: C.muted, fontFamily: MONO_FONT }}
                >
                  Créé par : {selected.owner}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              {isMember ? (
                selected.owner !== pseudo && (
                  <GhostButton onClick={() => leaveLab(selected.id)}>
                    Quitter
                  </GhostButton>
                )
              ) : isFull ? (
                <span
                  className="text-xs"
                  style={{ color: C.alert, fontFamily: BODY_FONT }}
                >
                  Salon complet
                </span>
              ) : isPrivate ? (
                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    value={joinPwd[selected.id] || ""}
                    onChange={(e) =>
                      setJoinPwd((p) => ({
                        ...p,
                        [selected.id]: e.target.value,
                      }))
                    }
                    placeholder="mot de passe"
                    className="px-2.5 py-1.5 rounded-md text-xs w-32"
                    style={inputStyle}
                  />
                  <PrimaryButton onClick={() => joinLab(selected)}>
                    <KeyRound size={13} /> Rejoindre
                  </PrimaryButton>
                </div>
              ) : (
                <PrimaryButton onClick={() => joinLab(selected)}>
                  <Plus size={14} /> Rejoindre
                </PrimaryButton>
              )}
              {(isAdmin || selected.owner === pseudo) && (
                <button
                  onClick={() => toggleLabFinished(selected.id)}
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{
                    background: selected.finished ? `${C.ok}22` : "transparent",
                    border: `1px solid ${selected.finished ? C.ok : C.line}`,
                    color: selected.finished ? C.ok : C.muted,
                    fontFamily: MONO_FONT,
                  }}
                >
                  {selected.finished ? (
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle2 size={12} /> Terminé
                    </span>
                  ) : (
                    "Marquer terminé"
                  )}
                </button>
              )}
              {(isAdmin || selected.owner === pseudo) && (
                <GhostButton danger onClick={() => removeLab(selected.id)}>
                  <Trash2 size={12} /> Supprimer
                </GhostButton>
              )}
            </div>
          </div>
          {joinError[selected.id] && (
            <p
              className="text-xs mt-2 text-right"
              style={{ color: C.alert, fontFamily: BODY_FONT }}
            >
              {joinError[selected.id]}
            </p>
          )}
          <div
            className="flex flex-wrap gap-1.5 mt-3 pt-3"
            style={{ borderTop: `1px solid ${C.line}` }}
          >
            {selected.members.map((m) => (
              <span
                key={m}
                className="text-xs px-2 py-1 rounded-md"
                style={{
                  background: C.panel2,
                  color: C.text,
                  fontFamily: MONO_FONT,
                }}
              >
                {m}
              </span>
            ))}
          </div>
        </Panel>

        <Panel className="flex flex-col mt-5" style={{ height: 420 }}>
          <div
            className="flex items-center gap-2 px-4 py-2.5"
            style={{ borderBottom: `1px solid ${C.line}` }}
          >
            <MessageSquare size={14} style={{ color: C.ok }} />
            <span
              className="text-xs"
              style={{ color: C.muted, fontFamily: MONO_FONT }}
            >
              Discussion du salon lab
            </span>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
            {selectedMessages.length === 0 && (
              <EmptyState text="Aucun message. Rejoins le salon pour discuter du lab." />
            )}
            {selectedMessages.map((m) => (
              <div key={m.id} className="flex items-start gap-2.5 group">
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center text-xs shrink-0"
                  style={{
                    background: C.panel2,
                    color: C.primary,
                    border: `1px solid ${C.line}`,
                    fontFamily: MONO_FONT,
                  }}
                >
                  {m.author.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span
                      className="text-[13px] font-bold"
                      style={{ color: C.text, fontFamily: BODY_FONT }}
                    >
                      {m.author}
                    </span>
                    <span
                      className="text-[11px]"
                      style={{ color: C.muted, fontFamily: MONO_FONT }}
                    >
                      {timeAgo(m.createdAt)}
                    </span>
                    {isAdmin && (
                      <button
                        onClick={() => removeLabMessage(m.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: C.alert }}
                      >
                        <Trash2 size={11} />
                      </button>
                    )}
                  </div>
                  <div className="gowl-hub-msg-bubble">{m.text}</div>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          {isMember ? (
            <div
              className="flex items-center gap-2 p-3"
              style={{ borderTop: `1px solid ${C.line}` }}
            >
              <input
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && sendLabMessage(selected.id)
                }
                placeholder="Écrire dans le salon..."
                className="flex-1 px-3 py-2 rounded-md text-sm"
                style={inputStyle}
              />
              <PrimaryButton onClick={() => sendLabMessage(selected.id)}>
                <Send size={14} />
              </PrimaryButton>
            </div>
          ) : (
            <div
              className="p-3 text-center"
              style={{ borderTop: `1px solid ${C.line}` }}
            >
              {!currentUser ? (
                <button
                  type="button"
                  onClick={() =>
                    window.dispatchEvent(new CustomEvent("open-auth-login"))
                  }
                  className="text-xs underline underline-offset-2"
                  style={{ color: C.primary, fontFamily: BODY_FONT }}
                >
                  Connecte-toi pour rejoindre ce salon
                </button>
              ) : (
                <span
                  className="text-xs"
                  style={{ color: C.muted, fontFamily: BODY_FONT }}
                >
                  Rejoins le salon pour participer à la discussion.
                </span>
              )}
            </div>
          )}
        </Panel>
      </div>
    );
  }

  return (
    <div className="gowl-community-view gowl-view-labs">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1 min-w-0 w-full">
          <div className="flex flex-col gap-3 mb-5 md:flex-row md:items-start md:justify-between">
            <SectionHeader
              icon={<Bug size={19} />}
              eyebrow="Sessions live"
              title={t(lang, "labsTitle")}
              subtitle={t(lang, "labsSub")}
              accent={C.alert}
            />
            {!currentUser ? (
              <PrimaryButton
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-auth-login"))
                }
              >
                Connexion
              </PrimaryButton>
            ) : (
              <PrimaryButton onClick={() => setShowCreate((s) => !s)}>
                {showCreate ? <X size={15} /> : <Plus size={15} />}{" "}
                {showCreate ? t(lang, "cancel") : t(lang, "newLab")}
              </PrimaryButton>
            )}
          </div>
          {!currentUser && (
            <GuestGate
              text="Connecte-toi pour ouvrir ou rejoindre un salon lab."
              accent={C.alert}
            />
          )}
          {showCreate && (
            <ModalOverlay onClose={() => setShowCreate(false)}>
              <CreationHero
                scene={<LabScene />}
                accent={C.alert}
                eyebrow={t(lang, "labsHeroEyebrow")}
                title={t(lang, "labsHeroTitle")}
                subtitle={t(lang, "labsHeroSub")}
                onClose={() => setShowCreate(false)}
              >
                <form onSubmit={createLab} className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    <Field label="Titre du salon">
                      <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ex : Blue (THM) — session du soir"
                        className="w-full px-2.5 py-1.75 rounded-md text-sm"
                        style={inputStyle}
                      />
                    </Field>
                    <Field label="Plateforme">
                      <select
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        className="w-full px-2.5 py-1.75 rounded-md text-sm"
                        style={inputStyle}
                      >
                        {LAB_PLATFORMS.map((p) => (
                          <option key={p.key} value={p.key}>
                            {p.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <Field label="Description">
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={2}
                      placeholder="Objectif de la session, niveau requis, horaires..."
                      className="w-full px-2.5 py-1.75 rounded-md text-sm resize-none"
                      style={inputStyle}
                    />
                  </Field>
                  <Field label="Visibilité (8 personnes max)">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setVisibility("public")}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.75 rounded-md text-sm"
                        style={{
                          background:
                            visibility === "public" ? C.primary : C.panel2,
                          color: visibility === "public" ? "#fff" : C.muted,
                          fontFamily: BODY_FONT,
                        }}
                      >
                        <Globe size={14} /> Public
                      </button>
                      <button
                        type="button"
                        onClick={() => setVisibility("private")}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.75 rounded-md text-sm"
                        style={{
                          background:
                            visibility === "private" ? C.primary : C.panel2,
                          color: visibility === "private" ? "#fff" : C.muted,
                          fontFamily: BODY_FONT,
                        }}
                      >
                        <Lock size={14} /> Privé
                      </button>
                    </div>
                  </Field>
                  {visibility === "private" && (
                    <Field label="Mot de passe du salon">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Requis pour un salon privé"
                        className="w-full px-2.5 py-1.75 rounded-md text-sm"
                        style={inputStyle}
                      />
                    </Field>
                  )}
                  <PrimaryButton type="submit" className="!py-2">
                    <CheckCircle2 size={14} /> Créer
                  </PrimaryButton>
                </form>
              </CreationHero>
            </ModalOverlay>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            {labs.length === 0 && (
              <EmptyState
                icon={<Bug size={20} />}
                accent={C.alert}
                text="Aucun salon lab pour l'instant. Sois le premier à en créer un pour avancer à plusieurs."
                cta="Créer"
                onCta={() => setShowCreate(true)}
              />
            )}
            {labs.map((l) => {
              const isPrivate = l.visibility === "private";
              const plat =
                LAB_PLATFORMS.find((p) => p.key === l.platform) ||
                LAB_PLATFORMS[3];
              const fillPct = Math.min(
                100,
                Math.round(
                  (l.members.length / (l.maxMembers || LAB_MAX_MEMBERS)) * 100,
                ),
              );
              return (
                <Panel
                  key={l.id}
                  className="p-4 pt-5 cursor-pointer gowl-hud-card gowl-glass relative overflow-hidden"
                  style={{ "--gowl-accent": C.alert }}
                  onClick={() => setSelectedId(l.id)}
                >
                  <div
                    aria-hidden
                    className="absolute top-0 left-0 right-0 h-[3px]"
                    style={{
                      background: `linear-gradient(90deg, ${C.alert}, transparent)`,
                    }}
                  />
                  {l.finished && (
                    <span className="gowl-qcard-resolved">
                      <CheckCircle2 size={11} /> Terminé
                    </span>
                  )}
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-10 h-10 rounded-md flex items-center justify-center shrink-0"
                      style={{
                        background: `${C.alert}1A`,
                        border: `1px solid ${C.alert}44`,
                        color: C.alert,
                      }}
                    >
                      <Bug size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3
                        className="font-semibold text-sm truncate"
                        style={{ color: C.text, fontFamily: DISPLAY_FONT }}
                      >
                        {l.title}
                      </h3>
                      <span
                        className="text-xs flex items-center gap-1"
                        style={{ color: C.muted, fontFamily: MONO_FONT }}
                      >
                        <Users size={11} /> {l.members.length}/
                        {l.maxMembers || LAB_MAX_MEMBERS} membres
                      </span>
                    </div>
                    <Chip
                      label={isPrivate ? "Privé" : "Public"}
                      color={isPrivate ? C.warn : C.ok}
                    />
                  </div>
                  <div
                    className="w-full rounded-full overflow-hidden mb-3"
                    style={{ height: 4, background: C.panel2 }}
                  >
                    <div
                      className="gowl-bar-fill h-full rounded-full"
                      style={{
                        width: `${fillPct}%`,
                        background: `linear-gradient(90deg, ${C.alert}, ${C.alert}88)`,
                      }}
                    />
                  </div>
                  <p
                    className="text-xs line-clamp-2 mb-2"
                    style={{ color: C.muted, fontFamily: BODY_FONT }}
                  >
                    {l.description || "Aucune description."}
                  </p>
                  <Chip label={plat.label} color={C.primary} />
                  <div
                    className="mt-3 pt-2 flex items-center justify-between"
                    style={{ borderTop: `1px solid ${C.line}` }}
                  >
                    <span
                      className="text-xs"
                      style={{ color: C.primary, fontFamily: MONO_FONT }}
                    >
                      {l.owner}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: C.muted, fontFamily: MONO_FONT }}
                    >
                      {timeAgo(l.createdAt)}
                    </span>
                  </div>
                </Panel>
              );
            })}
          </div>
        </div>
        <InfoSidebar>
          <StatCardsRow
            vertical
            items={[
              {
                icon: <Bug size={13} />,
                label: "Salons ouverts",
                value: labs.length,
                accent: C.alert,
              },
              {
                icon: <CheckCircle2 size={13} />,
                label: "Labs terminés",
                value: labs.filter((l) => l.finished).length,
                accent: C.ok,
              },
              {
                icon: <Users size={13} />,
                label: "Hackers connectés",
                value: labs.reduce((s, l) => s + l.members.length, 0),
                accent: C.primary,
              },
              {
                icon: <Unlock size={13} />,
                label: "Places libres",
                value: labs.reduce(
                  (s, l) =>
                    s +
                    Math.max(
                      0,
                      (l.maxMembers || LAB_MAX_MEMBERS) - l.members.length,
                    ),
                  0,
                ),
                accent: C.ok,
              },
            ]}
          />
        </InfoSidebar>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Classement — points calculés depuis trophées, forum et labs créés
--------------------------------------------------------------------- */
const TROPHY_POINTS = { facile: 10, moyen: 20, difficile: 35, insane: 50 };
const RANK_MEDALS = ["🥇", "🥈", "🥉"];

/* Points d'un membre — calcul partagé entre Classement et Profil (niveaux/XP) */
function computeUserPoints(username, questions, trophies, labs) {
  if (!username) return 0;
  let total = 0;
  trophies.forEach((t) => {
    if (t.author === username) total += TROPHY_POINTS[t.difficulty] || 10;
  });
  questions.forEach((q) => {
    if (q.author === username) total += 2;
    (q.answers || []).forEach((a) => {
      if (a.author === username) total += 3;
    });
  });
  labs.forEach((l) => {
    if (l.owner === username) total += 5;
  });
  return total;
}

/* Niveaux/XP — paliers construits sur les mêmes points que le classement */
const LEVELS = [
  { key: "debutant", label: "Débutant", min: 0, color: C.muted },
  { key: "initie", label: "Initié", min: 100, color: C.primary },
  { key: "operateur", label: "Opérateur", min: 350, color: C.ok },
  { key: "expert", label: "Expert", min: 900, color: C.warn },
  { key: "elite", label: "Élite", min: 2000, color: C.alert },
  { key: "legende", label: "Légende", min: 5000, color: C.gold },
];
function getLevelInfo(points) {
  let idx = 0;
  for (let i = 0; i < LEVELS.length; i++) {
    if (points >= LEVELS[i].min) idx = i;
  }
  const current = LEVELS[idx];
  const next = LEVELS[idx + 1] || null;
  const span = next ? next.min - current.min : 1;
  const progressed = next ? points - current.min : span;
  const pct = next
    ? Math.min(100, Math.max(0, Math.round((progressed / span) * 100)))
    : 100;
  return {
    level: current,
    next,
    pct,
    pointsToNext: next ? next.min - points : 0,
  };
}

function LeaderboardTab({
  questions,
  trophies,
  labs,
  teams,
  profiles,
  currentUser = null,
}) {
  const [period, setPeriod] = useState("all");
  const [search, setSearch] = useState("");
  const rankedRows = useMemo(() => {
    const scores = {};
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    const isIncluded = (date) =>
      period === "all" ||
      (date && new Date(date).getTime() >= monthStart.getTime());
    function add(author, points, kind) {
      if (!author) return;
      if (!scores[author])
        scores[author] = { author, total: 0, trophies: 0, forum: 0, labs: 0 };
      scores[author].total += points;
      scores[author][kind] += points;
    }
    profiles.forEach((profile) => {
      if (!profile.username) return;
      scores[profile.username] = {
        author: profile.username,
        total: 0,
        trophies: 0,
        forum: 0,
        labs: 0,
      };
    });
    trophies.forEach((t) => {
      if (isIncluded(t.createdAt))
        add(t.author, TROPHY_POINTS[t.difficulty] || 10, "trophies");
    });
    questions.forEach((q) => {
      if (isIncluded(q.createdAt)) add(q.author, 2, "forum");
      (q.answers || []).forEach((a) => {
        if (isIncluded(a.createdAt)) add(a.author, 3, "forum");
      });
    });
    labs.forEach((l) => {
      if (isIncluded(l.createdAt)) add(l.owner, 5, "labs");
    });
    if (period === "all") {
      profiles.forEach((profile) => {
        const row = scores[profile.username];
        if (row && Number(profile.points || 0) > row.total)
          row.total = Number(profile.points);
      });
    }
    return Object.values(scores)
      .filter((row) => row.total > 0)
      .sort(
        (a, b) =>
          b.total - a.total ||
          b.trophies - a.trophies ||
          b.forum - a.forum ||
          a.author.localeCompare(b.author),
      );
  }, [questions, trophies, labs, profiles, period]);

  const rows = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return rankedRows;
    return rankedRows.filter((row) =>
      row.author.toLowerCase().includes(query),
    );
  }, [rankedRows, search]);

  const podium = search.trim() ? [] : rows.slice(0, 3);
  const rest = search.trim() ? rows : rows.slice(3);
  const podiumOrder = podium.length === 3 ? [1, 0, 2] : podium.map((_, i) => i);
  const podiumStyle = [
    { h: 148, color: C.gold, label: "1ER", size: 64 },
    { h: 112, color: "#C7CCD6", label: "2E", size: 50 },
    { h: 90, color: "#D48A4C", label: "3E", size: 46 },
  ];
  const totalCommunityPoints = rankedRows.reduce((s, r) => s + r.total, 0);
  const maxTotal = rankedRows[0]?.total || 1;
  const currentUserRank = currentUser
    ? rankedRows.findIndex((row) => row.author === currentUser.username) + 1
    : 0;
  const currentUserRow = currentUserRank
    ? rankedRows[currentUserRank - 1]
    : null;
  const currentUserLevel = getLevelInfo(currentUserRow?.total || 0);

  function Breakdown({ r, height = 5 }) {
    const parts = [
      { v: r.trophies, color: C.alert },
      { v: r.forum, color: C.primary },
      { v: r.labs, color: C.ok },
    ].filter((p) => p.v > 0);
    if (parts.length === 0) return null;
    return (
      <div
        className="flex w-full rounded-full overflow-hidden"
        style={{ height, background: C.panel2 }}
      >
        {parts.map((p, i) => (
          <div
            key={i}
            className="gowl-bar-fill"
            style={{ width: `${(p.v / r.total) * 100}%`, background: p.color }}
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex-1 min-w-0 w-full">
          <div className="mb-5 flex items-center justify-between flex-wrap gap-3">
            <SectionHeader
              icon={<Trophy size={19} className="gowl-rank-glow" />}
              eyebrow="Live ranking"
              title="Classement"
              accent={C.gold}
              subtitle="Compare ta progression, découvre les membres les plus actifs et suis ton prochain niveau."
            />
          </div>
          <Panel
            className="p-3 mb-4"
            style={{
              background: `linear-gradient(135deg, ${C.gold}0D, ${C.panel})`,
              borderColor: `${C.gold}30`,
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2">
                {[
                  { key: "all", label: "Classement général" },
                  { key: "month", label: "Ce mois" },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.key}
                    onClick={() => setPeriod(item.key)}
                    className="px-3 py-2 rounded-lg text-[11px] font-bold transition-colors"
                    style={{
                      color: period === item.key ? C.bg : C.muted,
                      background: period === item.key ? C.gold : C.panel2,
                      border: `1px solid ${period === item.key ? C.gold : C.line}`,
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="relative flex-1 sm:max-w-xs sm:ml-auto">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: C.muted }}
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Rechercher un membre"
                  className="w-full h-9 pl-9 pr-3 rounded-lg text-xs"
                  style={{ ...inputStyle, background: C.panel2 }}
                />
              </div>
            </div>
          </Panel>
          {currentUser && (
            <Panel
              className="p-4 mb-5 overflow-hidden relative"
              style={{
                background: `linear-gradient(115deg, ${currentUserLevel.level.color}18, ${C.panel} 58%)`,
                borderColor: `${currentUserLevel.level.color}45`,
              }}
            >
              <div className="relative flex items-center gap-3">
                <Avatar
                  profile={{ ...currentUser, points: currentUserRow?.total || 0 }}
                  size={46}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-bold" style={{ color: C.text }}>
                      Ton classement
                    </p>
                    <Chip
                      label={currentUserLevel.level.label}
                      color={currentUserLevel.level.color}
                    />
                  </div>
                  <p className="text-[11px] mt-1" style={{ color: C.muted }}>
                    {currentUserRank
                      ? `Tu es #${currentUserRank} avec ${currentUserRow.total} points.`
                      : "Effectue une première action pour entrer au classement."}
                    {currentUserLevel.next && currentUserRow
                      ? ` Encore ${currentUserLevel.pointsToNext} points avant ${currentUserLevel.next.label}.`
                      : ""}
                  </p>
                  <div
                    className="h-1.5 rounded-full overflow-hidden mt-2 max-w-md"
                    style={{ background: C.panel2 }}
                  >
                    <div
                      className="h-full rounded-full gowl-bar-fill"
                      style={{
                        width: `${currentUserLevel.pct}%`,
                        background: `linear-gradient(90deg, ${currentUserLevel.level.color}, ${C.gold})`,
                      }}
                    />
                  </div>
                </div>
                <span
                  className="text-2xl font-black shrink-0"
                  style={{ color: C.gold, fontFamily: DISPLAY_FONT }}
                >
                  {currentUserRank ? `#${currentUserRank}` : "—"}
                </span>
              </div>
            </Panel>
          )}
          {rows.length === 0 ? (
            <EmptyState
              icon={<Trophy size={20} />}
              accent={C.gold}
              text={
                search.trim()
                  ? "Aucun membre ne correspond à cette recherche."
                  : period === "month"
                    ? "Aucun point gagné ce mois-ci pour le moment."
                    : "Personne au classement pour l'instant. Ajoute un trophée, pose une question ou ouvre un salon lab pour décrocher la première place !"
              }
            />
          ) : (
            <>
              {podium.length > 0 && (
                <Panel
                  className="p-6 mb-6 overflow-hidden relative"
                  style={{
                    border: `1px solid ${C.gold}33`,
                    background: `linear-gradient(180deg, ${C.gold}12, ${C.panel}80 55%)`,
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                  }}
                >
                  <div
                    aria-hidden
                    className="gowl-podium-spot"
                    style={{
                      width: 220,
                      height: 220,
                      left: "50%",
                      top: -40,
                      marginLeft: -110,
                      background: C.gold,
                    }}
                  />
                  <div className="relative flex items-end justify-center gap-3 sm:gap-7">
                    {podiumOrder.map((idx) => {
                      const r = podium[idx];
                      if (!r) return null;
                      const ps = podiumStyle[idx];
                      const profile = profiles.find(
                        (p) => p.username === r.author,
                      );
                      return (
                        <div
                          key={r.author}
                          className="flex flex-col items-center relative"
                          style={{ width: 118 }}
                        >
                          {idx === 0 && (
                            <Crown
                              size={26}
                              className="gowl-crown-float mb-1"
                              style={{ color: C.gold, fill: `${C.gold}55` }}
                            />
                          )}
                          <span
                            className="text-2xl mb-1.5 gowl-medal-pop"
                            style={{ animationDelay: `${idx * 0.12}s` }}
                          >
                            {RANK_MEDALS[idx]}
                          </span>
                          <span
                            className="gowl-rank-ring"
                            style={{ "--gowl-accent": ps.color }}
                          >
                            <Avatar
                              profile={{
                                ...(profile || {}),
                                username: r.author,
                                points: r.total,
                              }}
                              size={ps.size}
                            />
                          </span>
                          <p
                            className="text-xs font-bold mt-2.5 truncate max-w-full"
                            style={{ color: C.text, fontFamily: DISPLAY_FONT }}
                          >
                            {r.author}
                          </p>
                          <p
                            className="text-base font-extrabold gowl-count-pop"
                            style={{
                              color: ps.color,
                              fontFamily: DISPLAY_FONT,
                            }}
                          >
                            {r.total}{" "}
                            <span
                              className="text-[10px] font-semibold"
                              style={{ color: C.muted }}
                            >
                              pts
                            </span>
                          </p>
                          <span
                            className="text-[9px] font-bold uppercase"
                            style={{
                              color: getLevelInfo(r.total).level.color,
                              fontFamily: MONO_FONT,
                            }}
                          >
                            {getLevelInfo(r.total).level.label}
                          </span>
                          <div className="w-16 mt-1.5 mb-1">
                            <Breakdown r={r} height={4} />
                          </div>
                          <div
                            className="gowl-podium-bar w-full mt-1.5 rounded-t-lg flex flex-col items-center justify-start pt-2 relative overflow-hidden"
                            style={{
                              height: ps.h,
                              background: `linear-gradient(180deg, ${ps.color}2E, ${ps.color}08)`,
                              border: `1px solid ${ps.color}55`,
                              borderBottom: "none",
                              animationDelay: `${idx * 0.1}s`,
                            }}
                          >
                            <div
                              aria-hidden
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                height: 3,
                                background: ps.color,
                                boxShadow: `0 0 12px 1px ${ps.color}CC`,
                              }}
                            />
                            <span
                              className="text-xs font-extrabold gowl-mono-tag"
                              style={{ color: ps.color }}
                            >
                              {ps.label}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Panel>
              )}
              <div className="space-y-2">
                {rest.map((r) => {
                  const rank =
                    rankedRows.findIndex((row) => row.author === r.author) + 1;
                  const profile = profiles.find((p) => p.username === r.author);
                  const memberLevel = getLevelInfo(r.total);
                  const pct = Math.max(
                    6,
                    Math.round((r.total / maxTotal) * 100),
                  );
                  return (
                    <Panel
                      key={r.author}
                      className="p-3 gowl-hud-card relative overflow-hidden"
                      style={{
                        "--gowl-accent": C.gold,
                        background:
                          rank % 2 === 0 ? `${C.panel}80` : `${C.panel2}66`,
                        backdropFilter: "blur(14px)",
                        WebkitBackdropFilter: "blur(14px)",
                      }}
                    >
                      <div
                        aria-hidden
                        className="absolute left-0 top-0 bottom-0 gowl-bar-fill"
                        style={{
                          width: `${pct}%`,
                          background: `linear-gradient(90deg, ${C.gold}14, transparent)`,
                        }}
                      />
                      <div className="relative flex items-center gap-3">
                        <span
                          className="w-8 text-center text-sm font-bold shrink-0"
                          style={{
                            color: rank < 10 ? C.text : C.muted,
                            fontFamily: MONO_FONT,
                          }}
                        >
                          #{rank}
                        </span>
                        <span
                          className="gowl-rank-ring"
                          style={{
                            "--gowl-accent": rank < 10 ? C.primary : C.line,
                          }}
                        >
                          <Avatar
                            profile={{
                              ...(profile || {}),
                              username: r.author,
                              points: r.total,
                            }}
                            size={34}
                          />
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p
                              className="text-sm font-semibold truncate"
                              style={{ color: C.text, fontFamily: BODY_FONT }}
                            >
                              {r.author}
                            </p>
                            <Chip
                              label={memberLevel.level.label}
                              color={memberLevel.level.color}
                            />
                            {r.trophies > 0 && (
                              <span
                                className="text-[10px] flex items-center gap-1"
                                style={{
                                  color: C.alert,
                                  fontFamily: MONO_FONT,
                                }}
                              >
                                <Trophy size={9} /> {r.trophies}
                              </span>
                            )}
                            {r.forum > 0 && (
                              <span
                                className="text-[10px] flex items-center gap-1"
                                style={{
                                  color: C.primary,
                                  fontFamily: MONO_FONT,
                                }}
                              >
                                <MessageSquare size={9} /> {r.forum}
                              </span>
                            )}
                            {r.labs > 0 && (
                              <span
                                className="text-[10px] flex items-center gap-1"
                                style={{ color: C.ok, fontFamily: MONO_FONT }}
                              >
                                <Bug size={9} /> {r.labs}
                              </span>
                            )}
                          </div>
                          <div className="mt-1.5 max-w-[220px]">
                            <Breakdown r={r} />
                          </div>
                        </div>
                        <span
                          className="text-lg font-extrabold shrink-0"
                          style={{ color: C.gold, fontFamily: DISPLAY_FONT }}
                        >
                          {r.total}
                        </span>
                      </div>
                    </Panel>
                  );
                })}
              </div>
            </>
          )}
        </div>
        <InfoSidebar>
          {rankedRows.length > 0 && (
            <StatCardsRow
              vertical
              items={[
                {
                  icon: <TrendingUp size={13} />,
                  label: "Total communauté",
                  value: `${totalCommunityPoints.toLocaleString("fr-FR")} pts`,
                  accent: C.gold,
                },
                {
                  icon: <Users size={13} />,
                  label: "Joueurs classés",
                  value: rankedRows.length,
                  accent: C.primary,
                },
                {
                  icon: <Crown size={13} />,
                  label: "En tête",
                  value: rankedRows[0]?.author || "—",
                  accent: C.ok,
                },
              ]}
            />
          )}
          <Panel
            className="p-4 gowl-glass"
            style={{ border: `1px solid ${C.line}` }}
          >
            <span
              className="text-[10px] font-bold uppercase gowl-mono-tag block mb-3"
              style={{ color: C.muted }}
            >
              Comment gagner des points
            </span>
            <div className="flex flex-col gap-3">
              {[
                {
                  icon: <Trophy size={16} />,
                  color: C.alert,
                  label: "Trophées",
                  desc: "10 à 50 pts selon la difficulté (facile → insane).",
                },
                {
                  icon: <MessageSquare size={16} />,
                  color: C.primary,
                  label: "Forum",
                  desc: "2 pts par question posée, 3 pts par réponse donnée.",
                },
                {
                  icon: <Bug size={16} />,
                  color: C.ok,
                  label: "Salons labs",
                  desc: "5 pts pour chaque salon lab ouvert.",
                },
              ].map((it) => (
                <div
                  key={it.label}
                  className="flex items-start gap-2.5 p-3 rounded-lg"
                  style={{
                    background: `${C.panel2}66`,
                    border: `1px solid ${it.color}33`,
                  }}
                >
                  <span
                    className="w-8 h-8 rounded-md flex items-center justify-center shrink-0"
                    style={{ background: `${it.color}1A`, color: it.color }}
                  >
                    {it.icon}
                  </span>
                  <div className="min-w-0">
                    <p
                      className="text-xs font-bold"
                      style={{ color: C.text, fontFamily: DISPLAY_FONT }}
                    >
                      {it.label}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: C.muted, fontFamily: BODY_FONT }}
                    >
                      {it.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </InfoSidebar>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Trophées
--------------------------------------------------------------------- */
function TrophyTab({
  pseudo,
  trophies,
  setTrophies,
  isAdmin,
  currentUser = null,
}) {
  const [showForm, setShowForm] = useState(false);
  const [platform, setPlatform] = useState(PLATFORMS[0]);
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState(DIFFICULTIES[0].key);
  const [note, setNote] = useState("");
  const [certification, setCertification] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [cooldownNow, setCooldownNow] = useState(Date.now());
  const [trophyCooldown, setTrophyCooldown] = useState({
    durationSeconds: 3 * 60 * 60,
    availableAt: null,
  });
  const [trophyFeedback, setTrophyFeedback] = useState("");

  useEffect(() => {
    const interval = window.setInterval(() => setCooldownNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  async function refreshTrophyCooldown() {
    if (!currentUser) return null;
    try {
      const data = await apiRequest("/api/social/progress");
      const cooldown = data.cooldowns?.trophy;
      if (cooldown) setTrophyCooldown(cooldown);
      return cooldown || null;
    } catch {
      return null;
    }
  }

  useEffect(() => {
    refreshTrophyCooldown();
  }, [currentUser?.id, trophies.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const trophyRemainingSeconds = trophyCooldown.availableAt
    ? Math.max(
        0,
        Math.ceil(
          (new Date(trophyCooldown.availableAt).getTime() - cooldownNow) / 1000,
        ),
      )
    : 0;
  const trophyCooldownPct = Math.min(
    100,
    Math.max(
      0,
      Math.round(
        (trophyRemainingSeconds /
          Math.max(1, trophyCooldown.durationSeconds || 10800)) *
          100,
      ),
    ),
  );
  const trophyCooldownClock = [
    Math.floor(trophyRemainingSeconds / 3600),
    Math.floor((trophyRemainingSeconds % 3600) / 60),
    trophyRemainingSeconds % 60,
  ]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");

  function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === "string" ? reader.result : "";
      setImageUrl(dataUrl);
      setImageName(file.name);
    };
    reader.readAsDataURL(file);
  }

  async function submit(e) {
    e.preventDefault();
    if (!currentUser) return;
    if (!title.trim()) return;
    try {
      const result = await communityRequest("/trophies", {
        method: "POST",
        body: {
          platform,
          title: title.trim(),
          difficulty,
          note: note.trim(),
          certification: certification.trim(),
          imageUrl: imageUrl || "",
        },
      });
      setTrophies((current) => [result.trophy, ...current]);
      setTitle("");
      setNote("");
      setCertification("");
      setImageUrl("");
      setImageName("");
      setDifficulty(DIFFICULTIES[0].key);
      setShowForm(false);
      setTrophyCooldown({
        durationSeconds: 3 * 60 * 60,
        availableAt: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
      });
      setTrophyFeedback(
        "Trophée ajouté. Le prochain pourra être publié dans 3 heures.",
      );
    } catch (error) {
      let cooldown = null;
      if (error.retryAfterSeconds) {
        cooldown = {
          durationSeconds: 3 * 60 * 60,
          availableAt: new Date(
            Date.now() + error.retryAfterSeconds * 1000,
          ).toISOString(),
        };
        setTrophyCooldown(cooldown);
      } else {
        cooldown = await refreshTrophyCooldown();
      }
      setTrophyFeedback(error.message);
      if (cooldown?.availableAt) setShowForm(false);
    }
  }
  async function removeTrophy(id) {
    try {
      await communityRequest(`/trophies/${id}`, { method: "DELETE" });
      const next = trophies.filter((t) => t.id !== id);
      setTrophies(next);
      saveCollection("gowlsec:trophies", next);
      setTrophyFeedback("Trophée supprimé définitivement.");
    } catch (error) {
      setTrophyFeedback(error.message);
    }
  }
  const filtered = trophies;

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <SectionHeader
          icon={<CyberTrophyIcon size={22} color={C.gold} />}
          eyebrow="Achievements"
          title="Salon trophées"
          subtitle="Affiche tes badges, certifications et réussites partagées."
          accent={C.alert}
        />
        {!currentUser ? (
          <PrimaryButton
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-auth-login"))
            }
          >
            Connexion
          </PrimaryButton>
        ) : (
          <PrimaryButton
            disabled={trophyRemainingSeconds > 0}
            onClick={() => setShowForm((s) => !s)}
          >
            {trophyRemainingSeconds > 0 ? (
              <Clock size={15} />
            ) : showForm ? (
              <X size={15} />
            ) : (
              <CyberTrophyIcon size={17} color="#fff" />
            )}{" "}
            {trophyRemainingSeconds > 0
              ? `Disponible dans ${trophyCooldownClock}`
              : showForm
                ? "Annuler"
                : "Ajouter un trophée"}
          </PrimaryButton>
        )}
      </div>
      {!currentUser && (
        <GuestGate
          text="Connecte-toi pour ajouter des trophées et participer à l'espace communauté."
          accent={C.alert}
        />
      )}
      {currentUser && (
        <Panel
          className="mb-4 overflow-hidden"
          style={{
            background: trophyRemainingSeconds
              ? `linear-gradient(135deg, ${C.gold}12, ${C.panel})`
              : `linear-gradient(135deg, ${C.ok}10, ${C.panel})`,
            borderColor: trophyRemainingSeconds ? `${C.gold}40` : `${C.ok}35`,
          }}
        >
          <div className="p-3.5 flex items-center gap-3">
            <span
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{
                color: trophyRemainingSeconds ? C.gold : C.ok,
                background: trophyRemainingSeconds
                  ? `${C.gold}16`
                  : `${C.ok}14`,
                border: `1px solid ${trophyRemainingSeconds ? `${C.gold}3D` : `${C.ok}35`}`,
              }}
            >
              {trophyRemainingSeconds ? (
                <Clock size={18} />
              ) : (
                <CyberTrophyIcon size={20} color={C.ok} />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold" style={{ color: C.text }}>
                    {trophyRemainingSeconds
                      ? "Cooldown des trophées actif"
                      : "Tu peux publier un trophée"}
                  </p>
                  <p className="text-[10px] mt-0.5" style={{ color: C.muted }}>
                    {trophyRemainingSeconds
                      ? "Un trophée toutes les 3 heures pour éviter le spam et conserver des réussites de qualité."
                      : "Partage une réussite réelle avec son contexte et sa difficulté."}
                  </p>
                </div>
                <span
                  className="text-lg font-extrabold shrink-0"
                  style={{
                    color: trophyRemainingSeconds ? C.gold : C.ok,
                    fontFamily: MONO_FONT,
                  }}
                >
                  {trophyRemainingSeconds ? trophyCooldownClock : "PRÊT"}
                </span>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden mt-2.5"
                style={{ background: C.panel2 }}
              >
                <div
                  className="h-full rounded-full transition-[width] duration-1000"
                  style={{
                    width: `${trophyRemainingSeconds ? trophyCooldownPct : 100}%`,
                    background: trophyRemainingSeconds ? C.gold : C.ok,
                  }}
                />
              </div>
              {trophyFeedback && (
                <p className="text-[10px] mt-2" style={{ color: C.muted }}>
                  {trophyFeedback}
                </p>
              )}
            </div>
          </div>
        </Panel>
      )}
      {showForm && (
        <ModalOverlay onClose={() => setShowForm(false)}>
          <CreationHero
            scene={<TrophyScene />}
            accent={C.alert}
            eyebrow="Nouveau trophée"
            title="Ajoute un badge ou une réussite"
            subtitle="Partage une machine résolue, un challenge validé ou un accomplissement de parcours."
            onClose={() => setShowForm(false)}
          >
            <form onSubmit={submit} className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-2.5">
                <Field label="Plateforme">
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full px-2.5 py-1.75 rounded-md text-sm"
                    style={inputStyle}
                  >
                    {PLATFORMS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Nom de la machine / badge">
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex : Blue, Vulnversity..."
                    className="w-full px-2.5 py-1.75 rounded-md text-sm"
                    style={inputStyle}
                  />
                </Field>
              </div>
              <Field label="Difficulté">
                <div className="flex flex-wrap gap-2">
                  {DIFFICULTIES.map((d) => (
                    <button
                      type="button"
                      key={d.key}
                      onClick={() => setDifficulty(d.key)}
                      style={{ opacity: difficulty === d.key ? 1 : 0.5 }}
                    >
                      <Chip label={d.label} color={d.color} />
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Certification">
                <input
                  value={certification}
                  onChange={(e) => setCertification(e.target.value)}
                  placeholder="Ex : OSCP, eJPT, PNPT..."
                  className="w-full px-2.5 py-1.75 rounded-md text-sm"
                  style={inputStyle}
                />
              </Field>
              <Field label="Photo du trophée">
                <label
                  className="flex cursor-pointer items-center justify-center rounded-md border border-dashed px-3 py-2.5 text-sm"
                  style={{
                    borderColor: C.line,
                    background: C.panel2,
                    color: C.muted,
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <span>
                    {imageName
                      ? `Fichier prêt : ${imageName}`
                      : "Choisir une image"}
                  </span>
                </label>
                {imageUrl && (
                  <div
                    className="mt-2 overflow-hidden rounded-lg border"
                    style={{ borderColor: C.line }}
                  >
                    <img
                      src={imageUrl}
                      alt="Aperçu du trophée"
                      className="h-36 w-full object-cover"
                    />
                  </div>
                )}
              </Field>
              <Field label="Note (optionnel)">
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-2.5 py-1.75 rounded-md text-sm"
                  style={inputStyle}
                />
              </Field>
              <PrimaryButton type="submit" className="!py-2">
                <CheckCircle2 size={14} /> Ajouter au salon
              </PrimaryButton>
            </form>
          </CreationHero>
        </ModalOverlay>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 && (
          <EmptyState text="Aucun trophée ici pour le moment." />
        )}
        {filtered.map((t) => {
          const d =
            DIFFICULTIES.find((x) => x.key === t.difficulty) || DIFFICULTIES[0];
          const pf = getPlatformBadge(t.platform);
          return (
            <Panel
              key={t.id}
              className="p-4 relative gowl-hud-card gowl-glass gowl-sweep-wrap"
              style={{
                "--gowl-accent": d.color,
                borderColor: `${d.color}55`,
                background: `linear-gradient(165deg, ${d.color}14, ${C.panel})`,
              }}
            >
              {(isAdmin || t.author === pseudo) && (
                <button
                  onClick={() => removeTrophy(t.id)}
                  className="absolute top-3 right-3 z-10"
                  style={{ color: C.alert }}
                >
                  <Trash2 size={13} />
                </button>
              )}
              {t.imageUrl ? (
                <div
                  className="mb-3 relative overflow-hidden rounded-lg border"
                  style={{ borderColor: `${d.color}44` }}
                >
                  <img
                    src={t.imageUrl}
                    alt={t.title}
                    className="h-36 w-full object-cover"
                  />
                  <span
                    className="absolute top-2 left-2 w-7 h-7 rounded-md flex items-center justify-center overflow-hidden"
                    style={{
                      background: `${C.bg}CC`,
                      border: `1px solid ${pf.color}66`,
                    }}
                    title={t.platform}
                  >
                    <CyberTrophyIcon size={17} color={pf.color} />
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="gowl-trophy-badge overflow-hidden rounded-full"
                    style={{
                      background: `linear-gradient(155deg, ${pf.color}33, ${pf.color}0A)`,
                      border: `1px solid ${pf.color}77`,
                    }}
                    title={t.platform}
                  >
                    <CyberTrophyIcon size={25} color={pf.color} />
                  </div>
                  <div className="min-w-0">
                    <span
                      className="text-[10px] uppercase gowl-mono-tag block"
                      style={{ color: C.muted }}
                    >
                      {t.platform}
                    </span>
                    <h3
                      className="font-semibold text-sm truncate"
                      style={{ color: C.text, fontFamily: DISPLAY_FONT }}
                    >
                      {t.title}
                    </h3>
                  </div>
                </div>
              )}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Chip label={d.label} color={d.color} />
                {t.certification && (
                  <Chip label={t.certification} color={C.primary} />
                )}
              </div>
              {t.note && (
                <p
                  className="text-xs mt-2"
                  style={{ color: C.muted, fontFamily: BODY_FONT }}
                >
                  {t.note}
                </p>
              )}
              <div
                className="mt-3 pt-2 flex items-center justify-between"
                style={{ borderTop: `1px solid ${C.line}` }}
              >
                <span
                  className="text-xs"
                  style={{ color: C.primary, fontFamily: MONO_FONT }}
                >
                  {t.author}
                </span>
                <span
                  className="text-xs"
                  style={{ color: C.muted, fontFamily: MONO_FONT }}
                >
                  {timeAgo(t.createdAt)}
                </span>
              </div>
            </Panel>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Espaces bientôt disponibles
--------------------------------------------------------------------- */
function ComingSoonTab({
  icon: Icon,
  title,
  description,
  topics,
  accent,
  secondary,
  eyebrow,
  setTab,
}) {
  return (
    <div className="max-w-3xl mx-auto">
      <Panel
        className="overflow-hidden relative gowl-coming-soon"
        style={{
          "--coming-accent": accent,
          borderColor: `${accent}48`,
          background: `linear-gradient(155deg, ${C.panel}, ${C.bg})`,
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(${accent}2B 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
            opacity: 0.38,
            maskImage:
              "radial-gradient(circle at 50% 34%, black, transparent 72%)",
          }}
        />
        <span
          aria-hidden
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${accent}30, transparent 70%)`,
            filter: "blur(12px)",
          }}
        />

        <div className="relative px-5 py-12 sm:px-10 sm:py-16 text-center">
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] mb-6"
            style={{
              color: accent,
              background: `${accent}12`,
              border: `1px solid ${accent}40`,
              fontFamily: MONO_FONT,
            }}
          >
            <Clock size={12} /> {eyebrow || "Bientôt disponible"}
          </span>

          <span
            className="relative w-20 h-20 rounded-3xl mx-auto mb-5 flex items-center justify-center gowl-ai-orb"
            style={{
              color: accent,
              background: `linear-gradient(145deg, ${accent}24, ${secondary}16)`,
              border: `1px solid ${accent}55`,
              boxShadow: `0 0 0 9px ${accent}08, 0 24px 55px -24px ${accent}`,
            }}
          >
            <Icon size={34} strokeWidth={1.7} />
            <span
              className="absolute -right-1 -bottom-1 w-6 h-6 rounded-full flex items-center justify-center"
              style={{
                color: C.bg,
                background: secondary,
                border: `3px solid ${C.bg}`,
              }}
            >
              <Sparkles size={11} />
            </span>
          </span>

          <h2
            className="text-2xl sm:text-3xl font-extrabold mb-3"
            style={{ color: C.text, fontFamily: DISPLAY_FONT }}
          >
            {title}
          </h2>
          <p
            className="text-sm sm:text-base leading-relaxed max-w-xl mx-auto"
            style={{ color: C.muted, fontFamily: BODY_FONT }}
          >
            {description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-7">
            {topics.map((label) => (
              <span
                key={label}
                className="px-2.5 py-1 rounded-md text-[10px]"
                style={{
                  color: C.muted,
                  background: C.panel2,
                  border: `1px solid ${C.line}`,
                  fontFamily: MONO_FONT,
                }}
              >
                {label}
              </span>
            ))}
          </div>

          <div
            className="max-w-md mx-auto mt-11 pt-7"
            style={{ borderTop: `1px solid ${C.line}` }}
          >
            <p
              className="text-[10px] mb-3"
              style={{ color: C.muted, fontFamily: MONO_FONT }}
            >
              L’ouverture sera annoncée dans les nouveautés GowlSec.
            </p>
            <button
              type="button"
              onClick={() => {
                setTab("accueil");
                setTimeout(
                  () =>
                    document
                      .getElementById("gowlsec-updates")
                      ?.scrollIntoView({ behavior: "smooth", block: "center" }),
                  80,
                );
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-bold gowl-ai-news-cta"
              style={{
                color: C.bg,
                background: `linear-gradient(135deg, ${accent}, ${secondary})`,
                border: `1px solid ${accent}`,
                boxShadow: `0 14px 30px -16px ${accent}`,
                fontFamily: BODY_FONT,
              }}
            >
              <Newspaper size={15} /> Rester au courant{" "}
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function SupportTab({ setTab }) {
  return (
    <ComingSoonTab
      icon={MessageCircle}
      title="Support GowlSec"
      description="Un espace clair pour trouver une réponse, ouvrir une demande et suivre sa résolution avec l’équipe GowlSec."
      topics={["Centre d’aide", "Tickets", "FAQ", "Suivi des demandes"]}
      accent={C.ok}
      secondary={C.primary}
      setTab={setTab}
    />
  );
}

function ShopTab({ setTab }) {
  return (
    <ComingSoonTab
      icon={ShoppingCart}
      title="Boutique GowlSec"
      description="Des ressources, formations et créations pensées pour accompagner la progression de la communauté."
      topics={["Formations", "Ressources", "Merch", "Offres membres"]}
      accent={C.gold}
      secondary={C.warn}
      setTab={setTab}
    />
  );
}

/* ---------------------------------------------------------------------
   Assistant IA
--------------------------------------------------------------------- */
function LegacyAIAssistantTab({ pseudo }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Salut ${pseudo} ! Je suis l'assistant GowlSec. Je peux t'aider à structurer ta démarche en cybersécurité : méthodologie, Linux, web, réseau, CTF, écriture de rapport, et déblocage de labs légaux. Pose une question précise et je te guiderai étape par étape.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, loading]);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    const apiKey =
      typeof window !== "undefined"
        ? window.localStorage.getItem("gowlsec:ai-key")
        : "";
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    const buildLocalReply = (question) => {
      const q = question.toLowerCase();
      if (q.includes("linux") || q.includes("commande")) {
        return `Comprendre le problème\n- Identifie précisément la commande, le message d'erreur et le contexte.\n\nHypothèses\n- Vérifie si l'utilisateur a les permissions adéquates.\n- Confirme si la commande est exécutée sur un environnement légal et contrôlé.\n\nActions concrètes\n1. Répète la commande avec la sortie complète.\n2. Vérifie l'état du système avec whoami, id, pwd et ls.\n3. Si un service est concerné, teste journalctl ou systemctl.\n\nVérifications\n- Compare la sortie attendue avec le résultat réel.\n- Note chaque étape pour éviter les erreurs répétées.\n\nPoints à retenir\n- La méthode la plus rapide est souvent de reproduire le problème de façon isolée et d'observer les logs.`;
      }
      if (
        q.includes("web") ||
        q.includes("sql") ||
        q.includes("xss") ||
        q.includes("csrf") ||
        q.includes("api")
      ) {
        return `Comprendre le problème\n- Définis le périmètre : frontend, backend, API, base de données ou authentification.\n\nHypothèses\n- Vérifie si l'anomalie vient d'une validation insuffisante, d'un manque de droits ou d'un mauvais flux de données.\n\nActions concrètes\n1. Reproduis le scénario dans un environnement contrôlé.\n2. Inspecte les requêtes réseau, les headers et les réponses.\n3. Vérifie les validations côté client et côté serveur.\n\nVérifications\n- Teste un cas normal puis un cas anormal.\n- Compare les résultats avant/après chaque correction.\n\nPoints à retenir\n- En sécurité web, la moindre hypothèse doit être validée par une reproduction claire.`;
      }
      if (q.includes("ctf") || q.includes("lab") || q.includes("challenge")) {
        return `Comprendre le problème\n- Clarifie le type de challenge : web, réseau, forensics, reverse, cryptographie ou système.\n\nHypothèses\n- Identifie les indices fournis, le contexte du lab et les outils qui pourraient être utiles.\n\nActions concrètes\n1. Commence par lister les artefacts et les fichiers fournis.\n2. Observe les métadonnées, les logs et les messages implicites.\n3. Applique une méthode progressive : reconnaissance, analyse, exploitation contrôlée, validation.\n\nVérifications\n- Vérifie chaque découverte avant de passer à l'étape suivante.\n- Documente ce que tu as appris pour ne pas repartir à zéro.\n\nPoints à retenir\n- Un bon CTF repose sur la méthode, pas sur la vitesse.`;
      }
      return `Comprendre le problème\n- Décris précisément le contexte, le symptôme observable et le résultat attendu.\n\nHypothèses\n- Vérifie si le blocage vient d'une mauvaise configuration, d'un manque de permissions ou d'une compréhension incomplète du sujet.\n\nActions concrètes\n1. Isole la zone problématique.\n2. Rassemble les informations disponibles : logs, captures, messages d'erreur, structure du système.\n3. Teste une hypothèse à la fois et note les résultats.\n\nVérifications\n- Confirme la correction avec un scénario de validation simple.\n- Si besoin, reformule la question avec plus de détails.\n\nPoints à retenir\n- En cybersécurité, une méthode claire vaut souvent mieux qu'une solution improvisée.`;
    };

    try {
      try {
        if (apiKey) {
          const response = await fetch(
            "https://api.anthropic.com/v1/messages",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
                "anthropic-version": "2023-06-01",
              },
              body: JSON.stringify({
                model: "claude-sonnet-4-6",
                max_tokens: 1400,
                system: `Tu es l'assistant IA de GowlSec, une communauté francophone de pentest et de CTF. Tu réponds en français, de manière claire, précise et pédagogique. Tu aides sur la méthodologie de pentest, l'analyse de vulnérabilités web, la compréhension du réseau, Linux, les bases de l'OSINT, la préparation d'examens, la rédaction de rapports, les stratégies de résolution de labs/CTF légaux, ainsi que l'organisation d'un workflow d'apprentissage. Tu dois :
- privilégier une approche éthique et sécurisée ;
- refuser toute demande d'attaque contre un système réel sans autorisation ;
- proposer des étapes concrètes, des hypothèses, des commandes utiles et des bonnes pratiques ;
- adapter le niveau à débutant, intermédiaire ou avancé ;
- si le contexte est flou, demander un minimum de détails avant de proposer une solution ;
- structurer la réponse avec : Comprendre le problème, Hypothèses, Actions concrètes, Vérifications, Points à retenir.
Reste concis mais suffisamment détaillé pour être utile.`,
                messages: next.map((m) => ({
                  role: m.role,
                  content: m.content,
                })),
              }),
            },
          );

          if (!response.ok) throw new Error("API unavailable");

          const data = await response.json();
          const textBlocks = (data?.content || [])
            .filter((b) => b.type === "text")
            .map((b) => b.text);
          const reply = textBlocks.join("\n").trim();
          if (reply) {
            setMessages((m) => [...m, { role: "assistant", content: reply }]);
            return;
          }
        }
      } catch {
        // fallback local response below
      }

      const fallback = buildLocalReply(input.trim());
      setMessages((m) => [...m, { role: "assistant", content: fallback }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${C.primary}28, ${C.ok}22)`,
            border: `1px solid ${C.primary}33`,
          }}
        >
          <Bot size={20} style={{ color: C.primary }} />
        </div>
        <div>
          <h2
            className="text-xl font-bold"
            style={{ color: C.text, fontFamily: DISPLAY_FONT }}
          >
            Assistant IA
          </h2>
          <p
            className="text-sm"
            style={{ color: C.muted, fontFamily: BODY_FONT }}
          >
            Une aide rapide en cas de blocage, disponible à toute heure.
          </p>
        </div>
      </div>
      <Panel
        className="flex flex-col overflow-hidden"
        style={{
          height: 520,
          border: `1px solid ${C.primary}22`,
          boxShadow: `0 22px 60px -36px rgba(91,110,245,0.45)`,
        }}
      >
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className="max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm whitespace-pre-wrap"
                style={{
                  background:
                    m.role === "user"
                      ? "linear-gradient(135deg, #5B6EF5 0%, #2ED9A3 100%)"
                      : "rgba(255,255,255,0.05)",
                  color: m.role === "user" ? "#fff" : C.text,
                  fontFamily: BODY_FONT,
                  border: m.role === "user" ? "none" : `1px solid ${C.line}`,
                  boxShadow:
                    m.role === "user"
                      ? "0 12px 24px -16px rgba(91,110,245,0.6)"
                      : "none",
                }}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div
                className="px-3.5 py-2.5 rounded-2xl text-sm flex items-center gap-2"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: C.muted,
                  border: `1px solid ${C.line}`,
                  fontFamily: BODY_FONT,
                }}
              >
                <Sparkles size={13} className="animate-pulse" /> l'assistant
                réfléchit...
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <div
          className="flex items-center gap-2 p-3"
          style={{
            borderTop: `1px solid ${C.line}`,
            background: `linear-gradient(90deg, rgba(91,110,245,0.12), rgba(46,217,163,0.1))`,
            backdropFilter: "blur(10px)",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Décris ton problème..."
            disabled={loading}
            className="flex-1 px-3 py-2 rounded-md text-sm"
            style={{
              ...inputStyle,
              background: "rgba(5,10,16,0.75)",
              border: "1px solid rgba(91,110,245,0.28)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          />
          <PrimaryButton onClick={send} disabled={loading}>
            <Send size={14} />
          </PrimaryButton>
        </div>
      </Panel>
    </div>
  );
}

function AIAssistantTab({ setTab }) {
  return (
    <ComingSoonTab
      icon={Bot}
      title="Assistant IA GowlSec"
      description="Une aide éthique et structurée pour progresser, comprendre un blocage et organiser ta démarche dans des environnements autorisés."
      topics={["Méthodologie", "Labs légaux", "CTF", "Réseau", "Rapports"]}
      accent={C.primary}
      secondary={C.ok}
      setTab={setTab}
    />
  );
}

/* ---------------------------------------------------------------------
   Admin
--------------------------------------------------------------------- */
function AdminList({ title, icon, items, onDelete, accent = C.primary }) {
  const [q, setQ] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [actionError, setActionError] = useState("");
  const filtered = q.trim()
    ? items.filter((it) =>
        `${it.primary} ${it.secondary}`
          .toLowerCase()
          .includes(q.trim().toLowerCase()),
      )
    : items;

  async function confirmDelete(id) {
    setDeletingId(id);
    setActionError("");
    try {
      await onDelete(id);
      setPendingDeleteId(null);
    } catch (error) {
      setActionError(error?.message || "Impossible de supprimer cet élément.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <Panel
      className="p-4 mb-4 overflow-hidden"
      style={{
        borderColor: `${accent}35`,
        background: `linear-gradient(145deg, ${accent}09, ${C.panel} 42%)`,
      }}
    >
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span style={{ color: accent }}>{icon}</span>
        <span
          className="text-sm font-semibold"
          style={{ color: C.text, fontFamily: DISPLAY_FONT }}
        >
          {title}
        </span>
        <span
          className="text-xs"
          style={{ color: C.muted, fontFamily: MONO_FONT }}
        >
          ({filtered.length}
          {filtered.length !== items.length ? `/${items.length}` : ""})
        </span>
        {items.length > 4 && (
          <div className="ml-auto relative">
            <Search
              size={12}
              className="absolute left-2 top-1/2 -translate-y-1/2"
              style={{ color: C.muted }}
            />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Filtrer..."
              className="pl-6 pr-2 py-1 rounded-md text-xs w-36"
              style={inputStyle}
            />
          </div>
        )}
      </div>
      {actionError && (
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs mb-3"
          style={{
            color: C.alert,
            background: `${C.alert}12`,
            border: `1px solid ${C.alert}38`,
          }}
        >
          <AlertTriangle size={13} /> {actionError}
        </div>
      )}
      {items.length === 0 ? (
        <p
          className="text-xs"
          style={{ color: C.muted, fontFamily: BODY_FONT }}
        >
          Rien ici.
        </p>
      ) : filtered.length === 0 ? (
        <p
          className="text-xs"
          style={{ color: C.muted, fontFamily: BODY_FONT }}
        >
          Aucun résultat pour « {q} ».
        </p>
      ) : (
        <div className="space-y-1.5 max-h-64 overflow-y-auto">
          {filtered.map((it) => (
            <div
              key={it.id}
              className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg"
              style={{
                background: C.panel2,
                border: `1px solid ${pendingDeleteId === it.id ? `${C.alert}55` : C.line}`,
              }}
            >
              <div className="min-w-0">
                <p
                  className="text-xs truncate"
                  style={{ color: C.text, fontFamily: BODY_FONT }}
                >
                  {it.primary}
                </p>
                <p
                  className="text-xs truncate"
                  style={{ color: C.muted, fontFamily: MONO_FONT }}
                >
                  {it.secondary}
                </p>
              </div>
              {pendingDeleteId === it.id ? (
                <div className="shrink-0 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => confirmDelete(it.id)}
                    disabled={deletingId === it.id}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold"
                    style={{
                      color: "#fff",
                      background: C.alert,
                      opacity: deletingId === it.id ? 0.7 : 1,
                    }}
                  >
                    {deletingId === it.id ? (
                      <Loader2 size={11} className="animate-spin" />
                    ) : (
                      <Trash2 size={11} />
                    )}
                    Supprimer
                  </button>
                  <button
                    type="button"
                    onClick={() => setPendingDeleteId(null)}
                    disabled={deletingId === it.id}
                    className="px-2 py-1 rounded-md text-[10px]"
                    style={{ color: C.muted, border: `1px solid ${C.line}` }}
                  >
                    Annuler
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setActionError("");
                    setPendingDeleteId(it.id);
                  }}
                  title="Supprimer définitivement"
                  style={{ color: C.alert }}
                  className="shrink-0 w-8 h-8 inline-flex items-center justify-center rounded-lg"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}

function AdminTab({
  isAdmin,
  setIsAdmin,
  questions,
  setQuestions,
  messages,
  setMessages,
  trophies,
  setTrophies,
  writeups,
  setWriteups,
  events,
  setEvents,
  profiles,
  setProfiles,
  teams,
  setTeams,
  teamAnnouncements,
  setTeamAnnouncements,
  orders,
  setOrders,
  labs,
  setLabs,
  labMessages,
  setLabMessages,
  tickets,
  setTickets,
  supportThreads,
  setSupportThreads,
  currentUser,
  news = [],
  setNews,
}) {
  const [presence, setPresence] = useState([]);
  const [loadingPresence, setLoadingPresence] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [adminReply, setAdminReply] = useState("");
  const [adminNotice, setAdminNotice] = useState("");
  const [section, setSection] = useState("overview");
  const [userQuery, setUserQuery] = useState("");
  const [userFilter, setUserFilter] = useState("all");
  const [confirmClear, setConfirmClear] = useState(false);
  const [roleNotice, setRoleNotice] = useState("");
  const [announcementDraft, setAnnouncementDraft] = useState({
    title: "",
    content: "",
    category: "announcement",
    link: "",
  });
  const [announcementStatus, setAnnouncementStatus] = useState({
    type: "idle",
    message: "",
  });
  const [adminRooms, setAdminRooms] = useState([]);
  const [loadingAdminRooms, setLoadingAdminRooms] = useState(false);
  const [moderationStatus, setModerationStatus] = useState({
    type: "idle",
    message: "",
  });

  async function refreshAdminRooms() {
    setLoadingAdminRooms(true);
    try {
      const data = await communityRequest();
      setAdminRooms(Array.isArray(data?.rooms) ? data.rooms : []);
    } catch (error) {
      setModerationStatus({
        type: "error",
        message: error.message || "Impossible de charger les salons Hub.",
      });
    } finally {
      setLoadingAdminRooms(false);
    }
  }

  async function deleteCommunityResource(resource, id, onSuccess, label) {
    setModerationStatus({
      type: "loading",
      message: `Suppression de ${label || "l’élément"}…`,
    });
    try {
      await communityRequest(`/${resource}/${id}`, { method: "DELETE" });
      await onSuccess?.();
      setModerationStatus({
        type: "success",
        message: `${label || "Élément"} supprimé définitivement.`,
      });
    } catch (error) {
      if (error?.status === 404) {
        await onSuccess?.();
        setModerationStatus({
          type: "success",
          message: `${label || "Élément"} était déjà supprimé.`,
        });
        return;
      }
      setModerationStatus({
        type: "error",
        message: error.message || "Suppression impossible.",
      });
      throw error;
    }
  }

  async function deleteAdminRoom(roomId) {
    const room = adminRooms.find((item) => item.id === roomId);
    await deleteCommunityResource(
      "rooms",
      roomId,
      async () => {
        setAdminRooms((current) =>
          current.filter((item) => item.id !== roomId),
        );
        if (room?.key) {
          setMessages((current) =>
            current.filter((message) => message.room !== room.key),
          );
        }
      },
      "Salon Hub",
    );
  }

  async function deleteAdminHubMessage(id) {
    const messageId = Number(id);
    setModerationStatus({
      type: "loading",
      message: "Suppression du message Hub…",
    });
    await new Promise((resolve, reject) => {
      socket.emit("hub-message:delete", { id: messageId }, (response) => {
        if (response?.success) resolve(response);
        else
          reject(
            new Error(response?.message || "Suppression du message impossible."),
          );
      });
    })
      .then(() => {
        setMessages((current) =>
          current.filter((message) => Number(message.id) !== messageId),
        );
        setModerationStatus({
          type: "success",
          message: "Message Hub supprimé définitivement.",
        });
      })
      .catch((error) => {
        setModerationStatus({ type: "error", message: error.message });
        throw error;
      });
  }

  async function publishSiteAnnouncement(event) {
    event.preventDefault();
    if (!announcementDraft.title.trim() || !announcementDraft.content.trim()) {
      setAnnouncementStatus({
        type: "error",
        message: "Le titre et le contenu sont obligatoires.",
      });
      return;
    }
    setAnnouncementStatus({
      type: "loading",
      message: "Publication en cours…",
    });
    try {
      const response = await apiRequest("/api/announcements", {
        method: "POST",
        body: announcementDraft,
      });
      const formatted = formatAnnouncementForNews(
        response.announcement || response,
      );
      setNews?.((current) => [
        formatted,
        ...current.filter((item) => item.id !== formatted.id),
      ]);
      const updateMessage = [
        `📢 ${announcementDraft.title.trim()}`,
        announcementDraft.content.trim(),
        announcementDraft.link.trim(),
      ]
        .filter(Boolean)
        .join("\n");
      socket.emit(
        "hub-message:send",
        { room: "updates", content: updateMessage.slice(0, 1000) },
        () => {},
      );
      setAnnouncementStatus({
        type: "success",
        message: "Annonce publiée sur l’accueil et dans #updates.",
      });
      setAnnouncementDraft({
        title: "",
        content: "",
        category: "announcement",
        link: "",
      });
    } catch (error) {
      setAnnouncementStatus({
        type: "error",
        message: error.message || "Impossible de publier l’annonce.",
      });
    }
  }

  async function removeSiteAnnouncement(item) {
    try {
      if (item.announcementId)
        await apiRequest(`/api/announcements/${item.announcementId}`, {
          method: "DELETE",
        });
      setNews?.((current) =>
        current.filter((newsItem) => newsItem.id !== item.id),
      );
      setAnnouncementStatus({ type: "success", message: "Annonce supprimée." });
    } catch (error) {
      setAnnouncementStatus({
        type: "error",
        message: error.message || "Suppression impossible.",
      });
    }
  }

  async function refreshPresence() {
    setLoadingPresence(true);
    try {
      const listing = await window.storage.list("gowlsec:presence:", true);
      const keys = listing?.keys || [];
      const results = await Promise.all(
        keys.map(async (k) => {
          try {
            const r = await window.storage.get(k, true);
            return r ? JSON.parse(r.value) : null;
          } catch {
            return null;
          }
        }),
      );
      setPresence(results.filter(Boolean));
    } catch {
      /* best effort */
    }
    setLoadingPresence(false);
  }
  useEffect(() => {
    if (isAdmin) refreshPresence();
  }, [isAdmin]);
  useEffect(() => {
    if (isAdmin) refreshAdminRooms();
  }, [isAdmin]);
  useEffect(() => {
    if (!selectedTicketId && tickets[0]) setSelectedTicketId(tickets[0].id);
    else if (
      selectedTicketId &&
      !tickets.find((ticket) => ticket.id === selectedTicketId) &&
      tickets[0]
    ) {
      setSelectedTicketId(tickets[0].id);
    }
  }, [tickets, selectedTicketId]);

  const selectedTicket =
    tickets.find((ticket) => ticket.id === selectedTicketId) ||
    tickets[0] ||
    null;
  const selectedThread =
    supportThreads.find((thread) => thread.ticketId === selectedTicket?.id) ||
    null;

  async function clearAll() {
    setQuestions([]);
    setMessages([]);
    setTrophies([]);
    setTickets([]);
    setSupportThreads([]);
    saveCollection("gowlsec:questions", []);
    saveCollection("gowlsec:chat", []);
    saveCollection("gowlsec:trophies", []);
    saveCollection("gowlsec:tickets", []);
    saveCollection("gowlsec:support_threads", []);
    setConfirmClear(false);
  }

  async function updateTicketStatus(nextStatus) {
    if (!selectedTicket) return;
    const nextTickets = tickets.map((ticket) =>
      ticket.id === selectedTicket.id
        ? { ...ticket, status: nextStatus, updatedAt: new Date().toISOString() }
        : ticket,
    );
    setTickets(nextTickets);
    await saveCollection("gowlsec:tickets", nextTickets);
  }

  async function sendAdminReply(e) {
    e.preventDefault();
    if (!selectedTicket || !adminReply.trim())
      return setAdminNotice("Écris un message pour répondre au ticket.");
    const now = new Date().toISOString();
    const nextTickets = tickets.map((ticket) =>
      ticket.id === selectedTicket.id
        ? {
            ...ticket,
            status: ticket.status === "resolved" ? "resolved" : "in_progress",
            updatedAt: now,
          }
        : ticket,
    );
    const nextThreads = supportThreads.map((thread) => {
      if (thread.ticketId !== selectedTicket.id) return thread;
      return {
        ...thread,
        messages: [
          ...thread.messages,
          {
            id: uid(),
            sender: "admin",
            author: "Admin Web",
            text: adminReply.trim(),
            createdAt: now,
          },
        ],
        status: "in_progress",
        updatedAt: now,
      };
    });
    setTickets(nextTickets);
    setSupportThreads(nextThreads);
    await Promise.all([
      saveCollection("gowlsec:tickets", nextTickets),
      saveCollection("gowlsec:support_threads", nextThreads),
    ]);
    setAdminReply("");
    setAdminNotice("Réponse envoyée au membre.");
  }

  async function toggleAdminRole(profile) {
    if (!setProfiles) return;
    if (currentUser && profile.username === currentUser.username) {
      setRoleNotice("Tu ne peux pas modifier ton propre rôle depuis ici.");
      return;
    }
    const nextRole = isAdminProfile(profile) ? "member" : "admin";
    const next = profiles.map((p) =>
      p.id === profile.id ? { ...p, role: nextRole } : p,
    );
    setProfiles(next);
    await saveCollection("gowlsec:profiles", next);
    setRoleNotice(
      `${profile.username} est maintenant ${nextRole === "admin" ? "administrateur" : "membre"}.`,
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-sm mx-auto text-center py-10">
        <Lock size={28} className="mx-auto mb-3" style={{ color: C.primary }} />
        <h2
          className="text-lg font-bold mb-1"
          style={{ color: C.text, fontFamily: DISPLAY_FONT }}
        >
          Panel admin
        </h2>
        <p
          className="text-sm mb-5"
          style={{ color: C.muted, fontFamily: BODY_FONT }}
        >
          Accès réservé aux comptes admin. Connecte-toi avec un compte admin
          pour continuer.
        </p>
        <PrimaryButton
          onClick={() => window.dispatchEvent(new Event("open-auth-login"))}
        >
          <Unlock size={14} /> Se connecter
        </PrimaryButton>
      </div>
    );
  }

  const now = Date.now();
  const onlineCount = presence.filter(
    (p) => now - new Date(p.lastSeen).getTime() < ONLINE_WINDOW_MS,
  ).length;
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const adminCount = profiles.filter((p) => isAdminProfile(p)).length;
  const premiumCount = profiles.filter((p) => p.isPremium).length;
  const openTickets = tickets.filter(
    (t) => (t.status || "open") !== "resolved",
  ).length;
  const totalContentCount =
    questions.length +
    messages.length +
    trophies.length +
    writeups.length +
    teams.length +
    teamAnnouncements.length +
    labs.length +
    labMessages.length +
    events.length +
    adminRooms.length;

  const filteredProfiles = profiles.filter((p) => {
    if (userFilter === "online") {
      const pres = presence.find((x) => x.userId === p.id);
      if (!(pres && now - new Date(pres.lastSeen).getTime() < ONLINE_WINDOW_MS))
        return false;
    }
    if (userFilter === "admin" && !isAdminProfile(p)) return false;
    if (!userQuery.trim()) return true;
    const needle = userQuery.trim().toLowerCase();
    return (
      (p.username || "").toLowerCase().includes(needle) ||
      (p.email || "").toLowerCase().includes(needle)
    );
  });

  const SECTIONS = [
    { key: "overview", label: "Vue d'ensemble", icon: <Gauge size={14} /> },
    { key: "users", label: "Utilisateurs", icon: <Users size={14} /> },
    { key: "content", label: "Modération", icon: <Activity size={14} /> },
    {
      key: "shop",
      label: "Boutique & Support",
      icon: <ShoppingCart size={14} />,
    },
    {
      key: "danger",
      label: "Zone dangereuse",
      icon: <AlertTriangle size={14} />,
    },
  ];

  return (
    <div>
      <Panel
        className="p-5 mb-5 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${C.primary}18, ${C.panel} 48%, ${C.ok}0D)`,
          borderColor: `${C.primary}55`,
          boxShadow: `0 18px 50px -34px ${C.primary}AA, inset 0 1px 0 #FFFFFF10`,
        }}
      >
        <div className="flex items-center justify-between flex-wrap gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <span
              className="w-12 h-12 rounded-xl inline-flex items-center justify-center"
              style={{
                color: "#8BE9FD",
                background: "linear-gradient(145deg, #5B6EF533, #22D3A629)",
                border: "1px solid #5B9BFF66",
                boxShadow: "0 0 26px #5B6EF52E, inset 0 1px 0 #FFFFFF18",
              }}
            >
              <Cpu size={23} strokeWidth={1.9} />
            </span>
            <div>
              <span
                className="text-[9px] uppercase tracking-[0.2em] font-bold"
                style={{ color: C.ok, fontFamily: MONO_FONT }}
              >
                ● Systèmes opérationnels
              </span>
              <h2
                className="text-xl font-extrabold flex items-center gap-2 mt-0.5"
                style={{ color: C.text, fontFamily: DISPLAY_FONT }}
              >
                GowlSec Control Center <AdminBadge />
              </h2>
              <p
                className="text-xs mt-1"
                style={{ color: C.muted, fontFamily: BODY_FONT }}
              >
                Administration, modération et supervision de la communauté.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="px-2.5 py-1.5 rounded-lg text-[10px]"
              style={{
                color: C.ok,
                background: `${C.ok}12`,
                border: `1px solid ${C.ok}38`,
                fontFamily: MONO_FONT,
              }}
            >
              {onlineCount} en ligne
            </span>
            <GhostButton onClick={() => setIsAdmin(false)}>
              <Lock size={12} /> Fermer
            </GhostButton>
          </div>
        </div>
      </Panel>

      <div
        className="flex items-center gap-1.5 mb-6 flex-wrap p-1 rounded-xl"
        style={{
          background: C.panel2,
          border: `1px solid ${C.line}`,
          width: "fit-content",
        }}
      >
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            onClick={() => setSection(s.key)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
            style={{
              background: section === s.key ? C.primary : "transparent",
              color: section === s.key ? "#fff" : C.muted,
              fontFamily: BODY_FONT,
            }}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {section === "overview" && (
        <div>
          <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            <StatChip
              icon={<Wifi size={14} />}
              label="en ligne"
              value={onlineCount}
            />
            <StatChip
              icon={<UserIcon size={14} />}
              label="profils"
              value={profiles.length}
            />
            <StatChip
              icon={<Cpu size={14} />}
              label="admins"
              value={adminCount}
            />
            <StatChip
              icon={<Crown size={14} />}
              label="premium"
              value={premiumCount}
            />
            <StatChip
              icon={<Mail size={14} />}
              label="tickets ouverts"
              value={openTickets}
            />
            <StatChip
              icon={<ShoppingCart size={14} />}
              label="ventes"
              value={orders.length}
            />
          </div>
          <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            <StatChip
              icon={<Calendar size={14} />}
              label="événements"
              value={events.length}
            />
            <StatChip
              icon={<Flag size={14} />}
              label="questions"
              value={questions.length}
            />
            <StatChip
              icon={<MessageSquare size={14} />}
              label="messages"
              value={messages.length}
            />
            <StatChip
              icon={<Trophy size={14} />}
              label="trophées"
              value={trophies.length}
            />
            <StatChip
              icon={<Users size={14} />}
              label="teams"
              value={teams.length}
            />
            <StatChip
              icon={<Bug size={14} />}
              label="labs"
              value={labs.length}
            />
            <StatChip
              icon={<Hash size={14} />}
              label="salons Hub"
              value={adminRooms.length}
            />
            <StatChip
              icon={<BookOpen size={14} />}
              label="write-ups"
              value={writeups.length}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Panel className="p-4">
              <div className="flex items-center justify-between mb-1">
                <span
                  className="text-sm"
                  style={{ color: C.muted, fontFamily: BODY_FONT }}
                >
                  Chiffre d'affaires simulé
                </span>
                <TrendingUp size={14} style={{ color: C.ok }} />
              </div>
              <span
                className="text-2xl font-extrabold"
                style={{ color: C.ok, fontFamily: DISPLAY_FONT }}
              >
                {totalRevenue}€
              </span>
              <p
                className="text-xs mt-1"
                style={{ color: C.muted, fontFamily: BODY_FONT }}
              >
                {orders.length} commande{orders.length > 1 ? "s" : ""} au total.
              </p>
            </Panel>
            <Panel className="p-4">
              <div className="flex items-center justify-between mb-1">
                <span
                  className="text-sm"
                  style={{ color: C.muted, fontFamily: BODY_FONT }}
                >
                  Contenu communautaire
                </span>
                <Activity size={14} style={{ color: C.primary }} />
              </div>
              <span
                className="text-2xl font-extrabold"
                style={{ color: C.text, fontFamily: DISPLAY_FONT }}
              >
                {totalContentCount}
              </span>
              <p
                className="text-xs mt-1"
                style={{ color: C.muted, fontFamily: BODY_FONT }}
              >
                Éléments publiés tous salons confondus.
              </p>
            </Panel>
          </div>

          <Panel className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Newspaper size={15} style={{ color: C.gold }} />
              <span
                className="text-sm font-semibold"
                style={{ color: C.text, fontFamily: DISPLAY_FONT }}
              >
                Activité récente
              </span>
            </div>
            <div className="space-y-1.5 max-h-72 overflow-y-auto">
              {[
                ...questions.map((x) => ({
                  id: `q-${x.id}`,
                  icon: <Flag size={12} />,
                  text: `${x.author} a posé une question : « ${x.title} »`,
                  createdAt: x.createdAt,
                  accent: C.primary,
                })),
                ...trophies.map((x) => ({
                  id: `t-${x.id}`,
                  icon: <Trophy size={12} />,
                  text: `${x.author} a débloqué le trophée ${x.title}`,
                  createdAt: x.createdAt,
                  accent: C.gold,
                })),
                ...labs.map((x) => ({
                  id: `l-${x.id}`,
                  icon: <Bug size={12} />,
                  text: `${x.owner} a ouvert le salon lab ${x.title}`,
                  createdAt: x.createdAt,
                  accent: C.alert,
                })),
                ...teams.map((x) => ({
                  id: `tm-${x.id}`,
                  icon: <Users size={12} />,
                  text: `${x.owner} a créé la team ${x.name}`,
                  createdAt: x.createdAt,
                  accent: C.warn,
                })),
                ...orders.map((x) => ({
                  id: `o-${x.id}`,
                  icon: <ShoppingCart size={12} />,
                  text: `${x.buyer} a commandé pour ${x.total}€`,
                  createdAt: x.createdAt,
                  accent: C.ok,
                })),
              ]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 12)
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md"
                    style={{ background: C.panel2 }}
                  >
                    <span style={{ color: item.accent }}>{item.icon}</span>
                    <p
                      className="text-xs flex-1 truncate"
                      style={{ color: C.text, fontFamily: BODY_FONT }}
                    >
                      {item.text}
                    </p>
                    <span
                      className="text-[10px] shrink-0"
                      style={{ color: C.muted, fontFamily: MONO_FONT }}
                    >
                      {timeAgo(item.createdAt)}
                    </span>
                  </div>
                ))}
              {totalContentCount + orders.length === 0 && (
                <p
                  className="text-xs"
                  style={{ color: C.muted, fontFamily: BODY_FONT }}
                >
                  Aucune activité pour l'instant.
                </p>
              )}
            </div>
          </Panel>
        </div>
      )}

      {section === "users" && (
        <Panel className="p-4">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Activity size={15} style={{ color: C.ok }} />
              <span
                className="text-sm font-semibold"
                style={{ color: C.text, fontFamily: DISPLAY_FONT }}
              >
                Utilisateurs ({filteredProfiles.length}
                {filteredProfiles.length !== profiles.length
                  ? `/${profiles.length}`
                  : ""}
                )
              </span>
            </div>
            <GhostButton onClick={refreshPresence}>
              <RefreshCw
                size={12}
                className={loadingPresence ? "animate-spin" : ""}
              />{" "}
              Actualiser
            </GhostButton>
          </div>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <div className="relative flex-1 min-w-[180px]">
              <Search
                size={13}
                className="absolute left-2.5 top-1/2 -translate-y-1/2"
                style={{ color: C.muted }}
              />
              <input
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="Rechercher par pseudo ou e-mail..."
                className="w-full pl-8 pr-3 py-1.5 rounded-md text-xs"
                style={inputStyle}
              />
            </div>
            <div className="flex gap-1.5">
              {[
                { key: "all", label: "Tous" },
                { key: "online", label: "En ligne" },
                { key: "admin", label: "Admins" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setUserFilter(f.key)}
                  className="px-2.5 py-1.5 rounded-md text-xs font-medium"
                  style={{
                    background: userFilter === f.key ? C.primary : C.panel2,
                    color: userFilter === f.key ? "#fff" : C.muted,
                    fontFamily: BODY_FONT,
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          {roleNotice && (
            <p
              className="text-xs mb-2"
              style={{ color: C.ok, fontFamily: BODY_FONT }}
            >
              {roleNotice}
            </p>
          )}
          {profiles.length === 0 ? (
            <p
              className="text-xs"
              style={{ color: C.muted, fontFamily: BODY_FONT }}
            >
              Aucun profil enregistré.
            </p>
          ) : filteredProfiles.length === 0 ? (
            <p
              className="text-xs"
              style={{ color: C.muted, fontFamily: BODY_FONT }}
            >
              Aucun résultat pour ce filtre.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table
                className="w-full text-xs"
                style={{ fontFamily: BODY_FONT }}
              >
                <thead>
                  <tr style={{ color: C.muted, fontFamily: MONO_FONT }}>
                    <th className="text-left font-normal pb-2">Statut</th>
                    <th className="text-left font-normal pb-2">Utilisateur</th>
                    <th className="text-left font-normal pb-2">E-mail</th>
                    <th className="text-left font-normal pb-2">Connexion</th>
                    <th className="text-left font-normal pb-2">Points</th>
                    <th className="text-left font-normal pb-2">
                      Membre depuis
                    </th>
                    <th className="text-right font-normal pb-2">Rôle</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProfiles.map((p) => {
                    const pres = presence.find((x) => x.userId === p.id);
                    const online =
                      pres &&
                      now - new Date(pres.lastSeen).getTime() <
                        ONLINE_WINDOW_MS;
                    const points = computeUserPoints(
                      p.username,
                      questions,
                      trophies,
                      labs,
                    );
                    const admin = isAdminProfile(p);
                    const isSelf =
                      currentUser && p.username === currentUser.username;
                    return (
                      <tr
                        key={p.id}
                        style={{ borderTop: `1px solid ${C.line}` }}
                      >
                        <td className="py-2">
                          <span className="inline-flex items-center gap-1.5">
                            <Circle
                              size={8}
                              fill={online ? C.ok : C.muted}
                              color={online ? C.ok : C.muted}
                            />
                            {online ? "En ligne" : "Hors ligne"}
                          </span>
                        </td>
                        <td className="py-2" style={{ color: C.text }}>
                          <span className="inline-flex items-center gap-1.5">
                            {p.username}
                            {admin && <AdminBadge />}
                          </span>
                        </td>
                        <td className="py-2" style={{ color: C.text }}>
                          {p.email || "—"}
                        </td>
                        <td className="py-2">
                          {p.provider === "discord" ? "Discord" : "E-mail"}
                        </td>
                        <td
                          className="py-2"
                          style={{ color: C.gold, fontFamily: MONO_FONT }}
                        >
                          {points} pts
                        </td>
                        <td className="py-2" style={{ color: C.muted }}>
                          {timeAgo(p.joinedAt)}
                        </td>
                        <td className="py-2 text-right">
                          <button
                            onClick={() => toggleAdminRole(p)}
                            disabled={isSelf}
                            title={
                              isSelf
                                ? "Tu ne peux pas modifier ton propre rôle"
                                : admin
                                  ? "Rétrograder en membre"
                                  : "Promouvoir administrateur"
                            }
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium disabled:opacity-30 disabled:cursor-not-allowed"
                            style={{
                              background: admin
                                ? `${C.alert}18`
                                : `${C.gold}18`,
                              color: admin ? C.alert : C.gold,
                              border: `1px solid ${admin ? C.alert + "44" : C.gold + "44"}`,
                              fontFamily: MONO_FONT,
                            }}
                          >
                            {admin ? (
                              <>
                                <Unlock size={11} /> Rétrograder
                              </>
                            ) : (
                              <>
                                <Cpu size={11} /> Promouvoir
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Panel>
      )}

      {section === "content" && (
        <div>
          <div
            className="flex items-center justify-between gap-3 flex-wrap p-3.5 rounded-xl mb-4"
            style={{
              background: `linear-gradient(135deg, ${C.primary}12, ${C.panel2})`,
              border: `1px solid ${C.primary}35`,
            }}
          >
            <div className="flex items-center gap-2.5">
              <Activity size={15} style={{ color: C.primary }} />
              <div>
                <p
                  className="text-xs font-bold"
                  style={{ color: C.text, fontFamily: DISPLAY_FONT }}
                >
                  Centre de modération
                </p>
                <p
                  className="text-[10px] mt-0.5"
                  style={{ color: C.muted, fontFamily: MONO_FONT }}
                >
                  Les suppressions sont appliquées au serveur et persistent après F5.
                </p>
              </div>
            </div>
            <GhostButton onClick={refreshAdminRooms} disabled={loadingAdminRooms}>
              <RefreshCw
                size={12}
                className={loadingAdminRooms ? "animate-spin" : ""}
              />{" "}
              Actualiser les salons
            </GhostButton>
          </div>

          {moderationStatus.type !== "idle" && (
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs mb-4"
              style={{
                color:
                  moderationStatus.type === "error"
                    ? C.alert
                    : moderationStatus.type === "success"
                      ? C.ok
                      : C.primary,
                background:
                  moderationStatus.type === "error"
                    ? `${C.alert}12`
                    : moderationStatus.type === "success"
                      ? `${C.ok}12`
                      : `${C.primary}12`,
                border: `1px solid ${
                  moderationStatus.type === "error"
                    ? `${C.alert}38`
                    : moderationStatus.type === "success"
                      ? `${C.ok}38`
                      : `${C.primary}38`
                }`,
              }}
            >
              {moderationStatus.type === "loading" ? (
                <Loader2 size={13} className="animate-spin" />
              ) : moderationStatus.type === "error" ? (
                <AlertTriangle size={13} />
              ) : (
                <CheckCircle2 size={13} />
              )}
              {moderationStatus.message}
            </div>
          )}

          <Panel
            className="overflow-hidden mb-5"
            style={{ borderColor: `${C.gold}45` }}
          >
            <div
              className="px-4 py-3.5 flex items-center justify-between gap-3"
              style={{
                borderBottom: `1px solid ${C.line}`,
                background: `linear-gradient(135deg, ${C.gold}12, ${C.primary}08)`,
              }}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{
                    color: C.gold,
                    background: `${C.gold}15`,
                    border: `1px solid ${C.gold}35`,
                  }}
                >
                  <Megaphone size={16} />
                </span>
                <div>
                  <h3
                    className="text-sm font-bold"
                    style={{ color: C.text, fontFamily: DISPLAY_FONT }}
                  >
                    Publier une annonce
                  </h3>
                  <p
                    className="text-[10px] mt-0.5"
                    style={{ color: C.muted, fontFamily: MONO_FONT }}
                  >
                    Visible immédiatement dans les nouveautés de l’accueil
                  </p>
                </div>
              </div>
              <span
                className="text-[9px] uppercase tracking-wider"
                style={{ color: C.gold, fontFamily: MONO_FONT }}
              >
                Admin uniquement
              </span>
            </div>
            <div className="grid lg:grid-cols-[1fr_0.8fr]">
              <form
                onSubmit={publishSiteAnnouncement}
                className="p-4"
                style={{ borderRight: `1px solid ${C.line}` }}
              >
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Titre">
                    <input
                      value={announcementDraft.title}
                      onChange={(event) =>
                        setAnnouncementDraft((draft) => ({
                          ...draft,
                          title: event.target.value.slice(0, 150),
                        }))
                      }
                      maxLength={150}
                      placeholder="Ex : Nouveau calendrier CTFNews"
                      className="w-full px-3 py-2 rounded-lg text-sm"
                      style={inputStyle}
                    />
                  </Field>
                  <Field label="Catégorie">
                    <select
                      value={announcementDraft.category}
                      onChange={(event) =>
                        setAnnouncementDraft((draft) => ({
                          ...draft,
                          category: event.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 rounded-lg text-sm"
                      style={inputStyle}
                    >
                      {NEWS_CATEGORIES.filter(
                        (category) => category.key !== "event",
                      ).map((category) => (
                        <option key={category.key} value={category.key}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field label="Contenu">
                  <textarea
                    value={announcementDraft.content}
                    onChange={(event) =>
                      setAnnouncementDraft((draft) => ({
                        ...draft,
                        content: event.target.value.slice(0, 2000),
                      }))
                    }
                    maxLength={2000}
                    rows={5}
                    placeholder="Explique clairement la nouveauté, ce qui change et comment l’utiliser…"
                    className="w-full px-3 py-2 rounded-lg text-sm resize-none"
                    style={inputStyle}
                  />
                  <span
                    className="block text-right text-[9px] mt-1"
                    style={{ color: C.muted, fontFamily: MONO_FONT }}
                  >
                    {announcementDraft.content.length}/2000
                  </span>
                </Field>
                <Field label="Lien optionnel">
                  <input
                    value={announcementDraft.link}
                    onChange={(event) =>
                      setAnnouncementDraft((draft) => ({
                        ...draft,
                        link: event.target.value,
                      }))
                    }
                    placeholder="https://…"
                    className="w-full px-3 py-2 rounded-lg text-sm"
                    style={inputStyle}
                  />
                </Field>
                {announcementStatus.type !== "idle" && (
                  <p
                    className="text-xs mb-3"
                    style={{
                      color:
                        announcementStatus.type === "error"
                          ? C.alert
                          : announcementStatus.type === "success"
                            ? C.ok
                            : C.primary,
                    }}
                  >
                    {announcementStatus.message}
                  </p>
                )}
                <PrimaryButton
                  type="submit"
                  disabled={announcementStatus.type === "loading"}
                >
                  {announcementStatus.type === "loading" ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Megaphone size={14} />
                  )}{" "}
                  Publier sur l’accueil
                </PrimaryButton>
              </form>
              <aside className="p-4" style={{ background: C.panel2 }}>
                <span
                  className="text-[9px] uppercase tracking-wider"
                  style={{ color: C.muted, fontFamily: MONO_FONT }}
                >
                  Aperçu
                </span>
                <div
                  className="rounded-xl p-4 mt-2"
                  style={{ background: C.panel, border: `1px solid ${C.line}` }}
                >
                  <span
                    className="text-[9px] uppercase tracking-wider font-bold"
                    style={{
                      color: (
                        NEWS_CATEGORIES.find(
                          (category) =>
                            category.key === announcementDraft.category,
                        ) || NEWS_CATEGORIES[0]
                      ).color,
                      fontFamily: MONO_FONT,
                    }}
                  >
                    {
                      (
                        NEWS_CATEGORIES.find(
                          (category) =>
                            category.key === announcementDraft.category,
                        ) || NEWS_CATEGORIES[0]
                      ).label
                    }
                  </span>
                  <h4
                    className="text-base font-bold mt-2"
                    style={{ color: C.text, fontFamily: DISPLAY_FONT }}
                  >
                    {announcementDraft.title || "Titre de l’annonce"}
                  </h4>
                  <p
                    className="text-xs leading-relaxed mt-2 whitespace-pre-wrap"
                    style={{ color: C.muted, fontFamily: BODY_FONT }}
                  >
                    {announcementDraft.content ||
                      "Le contenu complet de ton annonce apparaîtra ici avant la publication."}
                  </p>
                </div>
                <div className="mt-4">
                  <span
                    className="text-[9px] uppercase tracking-wider"
                    style={{ color: C.muted, fontFamily: MONO_FONT }}
                  >
                    Annonces publiées
                  </span>
                  <div className="mt-2 space-y-2 max-h-44 overflow-y-auto">
                    {news
                      .filter((item) => !item.external)
                      .map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-2 rounded-lg p-2"
                          style={{
                            background: C.panel,
                            border: `1px solid ${C.line}`,
                          }}
                        >
                          <span
                            className="text-[10px] flex-1 truncate"
                            style={{ color: C.text }}
                          >
                            {item.title}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeSiteAnnouncement(item)}
                            className="shrink-0"
                            style={{ color: C.alert }}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    {news.filter((item) => !item.external).length === 0 && (
                      <p className="text-[10px]" style={{ color: C.muted }}>
                        Aucune annonce publiée.
                      </p>
                    )}
                  </div>
                </div>
              </aside>
            </div>
          </Panel>

          <AdminList
            title="Salons Hub"
            icon={<Hash size={14} />}
            accent={C.ok}
            items={adminRooms
              .filter((room) => room.key !== "updates")
              .map((room) => ({
              id: room.id,
              primary: `#${room.label || room.key}`,
              secondary: `${room.isPublic === false ? "Privé" : "Public"} · propriétaire ${room.owner || "système"}`,
              }))}
            onDelete={deleteAdminRoom}
          />
          <AdminList
            title="Événements"
            icon={<Calendar size={14} />}
            accent={C.gold}
            items={events.map((e) => ({
              id: e.id,
              primary: e.title,
              secondary: `${e.author} · ${new Date(e.date).toLocaleDateString("fr-FR")}`,
            }))}
            onDelete={(id) =>
              deleteCommunityResource(
                "events",
                id,
                async () => {
                  const next = events.filter((event) => event.id !== id);
                  setEvents(next);
                  await saveCollection("gowlsec:events", next);
                },
                "Événement",
              )
            }
          />
          <AdminList
            title="Questions"
            icon={<Flag size={14} />}
            accent={C.primary}
            items={questions.map((q) => ({
              id: q.id,
              primary: q.title,
              secondary: `${q.author} · ${timeAgo(q.createdAt)}`,
            }))}
            onDelete={(id) =>
              deleteCommunityResource(
                "questions",
                id,
                async () => {
                  const next = questions.filter((question) => question.id !== id);
                  setQuestions(next);
                  await saveCollection("gowlsec:questions", next);
                },
                "Question",
              )
            }
          />
          <AdminList
            title="Messages des salons"
            icon={<MessageSquare size={14} />}
            accent={C.primary}
            items={messages.map((m) => ({
              id: m.id,
              primary: m.text,
              secondary: `#${m.room || "general"} · ${m.author}`,
            }))}
            onDelete={deleteAdminHubMessage}
          />
          <AdminList
            title="Trophées"
            icon={<Trophy size={14} />}
            accent={C.gold}
            items={trophies.map((t) => ({
              id: t.id,
              primary: `${t.platform} — ${t.title}`,
              secondary: `${t.author} · ${timeAgo(t.createdAt)}`,
            }))}
            onDelete={(id) =>
              deleteCommunityResource(
                "trophies",
                id,
                async () => {
                  const next = trophies.filter((trophy) => trophy.id !== id);
                  setTrophies(next);
                  await saveCollection("gowlsec:trophies", next);
                },
                "Trophée",
              )
            }
          />
          <AdminList
            title="Write-ups"
            icon={<BookOpen size={14} />}
            accent={C.ok}
            items={writeups.map((writeup) => ({
              id: writeup.id,
              primary: `${writeup.platform} — ${writeup.title}`,
              secondary: `${writeup.author} · ${timeAgo(writeup.createdAt)}`,
            }))}
            onDelete={(id) =>
              deleteCommunityResource(
                "writeups",
                id,
                async () => {
                  const next = writeups.filter((writeup) => writeup.id !== id);
                  setWriteups(next);
                  await saveCollection("gowlsec:writeups", next);
                },
                "Write-up",
              )
            }
          />
          <AdminList
            title="Team"
            icon={<Users size={14} />}
            accent={C.warn}
            items={teams.map((t) => ({
              id: t.id,
              primary: `${t.name} (${t.visibility === "private" ? "privée" : "publique"})`,
              secondary: `${t.members.length}/${t.maxMembers || TEAM_MAX_MEMBERS} membre(s) · capitaine ${t.owner}`,
            }))}
            onDelete={(id) =>
              deleteCommunityResource(
                "teams",
                id,
                async () => {
                  const next = teams.filter((team) => team.id !== id);
                  setTeams(next);
                  await saveCollection("gowlsec:teams", next);
                  const nextAnnouncements = teamAnnouncements.filter(
                    (announcement) => announcement.teamId !== id,
                  );
                  setTeamAnnouncements(nextAnnouncements);
                  await saveCollection(
                    "gowlsec:team_announcements",
                    nextAnnouncements,
                  );
                },
                "Team",
              )
            }
          />
          <AdminList
            title="Annonces d’équipe"
            icon={<Megaphone size={14} />}
            accent={C.warn}
            items={teamAnnouncements.map((announcement) => ({
              id: announcement.id,
              primary: announcement.text,
              secondary: `${announcement.author} · team #${announcement.teamId}`,
            }))}
            onDelete={(id) =>
              deleteCommunityResource(
                "team-announcements",
                id,
                async () => {
                  const next = teamAnnouncements.filter(
                    (announcement) => announcement.id !== id,
                  );
                  setTeamAnnouncements(next);
                  await saveCollection("gowlsec:team_announcements", next);
                },
                "Annonce d’équipe",
              )
            }
          />
          <AdminList
            title="Salons labs"
            icon={<Bug size={14} />}
            accent={C.alert}
            items={labs.map((l) => ({
              id: l.id,
              primary: `${l.title}${l.finished ? " · Terminé" : ""} (${l.visibility === "private" ? "privé" : "public"})`,
              secondary: `${l.members.length}/${l.maxMembers || LAB_MAX_MEMBERS} membre(s) · ${l.owner}`,
            }))}
            onDelete={(id) =>
              deleteCommunityResource(
                "labs",
                id,
                async () => {
                  const next = labs.filter((lab) => lab.id !== id);
                  setLabs(next);
                  await saveCollection("gowlsec:labs", next);
                  const nextMessages = labMessages.filter(
                    (message) => message.labId !== id,
                  );
                  setLabMessages(nextMessages);
                  await saveCollection("gowlsec:lab_messages", nextMessages);
                },
                "Salon lab",
              )
            }
          />
          <AdminList
            title="Messages des labs"
            icon={<MessageSquare size={14} />}
            accent={C.alert}
            items={labMessages.map((message) => ({
              id: message.id,
              primary: message.text,
              secondary: `${message.author} · lab #${message.labId}`,
            }))}
            onDelete={(id) =>
              deleteCommunityResource(
                "lab-messages",
                id,
                async () => {
                  const next = labMessages.filter((message) => message.id !== id);
                  setLabMessages(next);
                  await saveCollection("gowlsec:lab_messages", next);
                },
                "Message de lab",
              )
            }
          />
        </div>
      )}

      {section === "shop" && (
        <div>
          <AdminList
            title="Commandes boutique"
            icon={<ShoppingCart size={14} />}
            accent={C.ok}
            items={orders.map((o) => ({
              id: o.id,
              primary: `${o.items.join(", ")} — ${o.total}€`,
              secondary: `${o.buyer} · ${o.email} · ${timeAgo(o.createdAt)}`,
            }))}
            onDelete={(id) => {
              const next = orders.filter((o) => o.id !== id);
              setOrders(next);
              saveCollection("gowlsec:orders", next);
            }}
          />
          <AdminList
            title="Tickets support"
            icon={<Mail size={14} />}
            accent={C.primary}
            items={tickets.map((t) => ({
              id: t.id,
              primary: `${t.title} · ${t.category}`,
              secondary: `${t.author} · ${t.email || "sans e-mail"} · ${timeAgo(t.createdAt)}`,
            }))}
            onDelete={(id) => {
              const next = tickets.filter((t) => t.id !== id);
              setTickets(next);
              saveCollection("gowlsec:tickets", next);
            }}
          />

          <Panel className="p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle size={15} style={{ color: C.primary }} />
              <span
                className="text-sm font-semibold"
                style={{ color: C.text, fontFamily: DISPLAY_FONT }}
              >
                Support privé
              </span>
            </div>
            {tickets.length === 0 ? (
              <p
                className="text-xs"
                style={{ color: C.muted, fontFamily: BODY_FONT }}
              >
                Aucun ticket à traiter.
              </p>
            ) : (
              <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-4">
                <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                  {tickets.map((ticket) => {
                    const active = selectedTicket?.id === ticket.id;
                    const st =
                      SUPPORT_STATUS[ticket.status || "open"] ||
                      SUPPORT_STATUS.open;
                    return (
                      <button
                        key={ticket.id}
                        type="button"
                        onClick={() => setSelectedTicketId(ticket.id)}
                        className="w-full rounded-lg p-3 text-left"
                        style={{
                          background: active ? `${C.primary}22` : C.panel2,
                          border: `1px solid ${active ? C.primary : C.line}`,
                        }}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span
                            className="text-[10px] uppercase tracking-[0.2em]"
                            style={{ color: C.primary, fontFamily: MONO_FONT }}
                          >
                            {ticket.category}
                          </span>
                          <span
                            className="text-[10px]"
                            style={{ color: C.muted, fontFamily: MONO_FONT }}
                          >
                            {timeAgo(ticket.createdAt)}
                          </span>
                        </div>
                        <p
                          className="text-sm font-semibold"
                          style={{ color: C.text, fontFamily: BODY_FONT }}
                        >
                          {ticket.title}
                        </p>
                        <p
                          className="text-[11px] mt-1 flex items-center gap-1.5"
                          style={{ color: C.muted, fontFamily: MONO_FONT }}
                        >
                          {ticket.author} ·{" "}
                          <span style={{ color: st.color }}>{st.label}</span>
                        </p>
                      </button>
                    );
                  })}
                </div>
                {selectedTicket && (
                  <div
                    className="rounded-lg p-3"
                    style={{
                      background: C.panel2,
                      border: `1px solid ${C.line}`,
                    }}
                  >
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div>
                        <h3
                          className="text-sm font-semibold"
                          style={{ color: C.text, fontFamily: BODY_FONT }}
                        >
                          {selectedTicket.title}
                        </h3>
                        <p
                          className="text-xs mt-1"
                          style={{ color: C.muted, fontFamily: BODY_FONT }}
                        >
                          {selectedTicket.message}
                        </p>
                      </div>
                      <select
                        value={selectedTicket.status || "open"}
                        onChange={(e) => updateTicketStatus(e.target.value)}
                        className="px-2 py-1 rounded-md text-xs"
                        style={inputStyle}
                      >
                        <option value="open">Ouvert</option>
                        <option value="in_progress">En cours</option>
                        <option value="resolved">Résolu</option>
                      </select>
                    </div>
                    <div className="space-y-2 mb-3 max-h-[220px] overflow-y-auto pr-1">
                      {(selectedThread?.messages || []).map((message) => (
                        <div
                          key={message.id}
                          className={`rounded-md px-3 py-2 ${message.sender === "admin" ? "ml-4" : "mr-4"}`}
                          style={{
                            background:
                              message.sender === "admin"
                                ? `${C.primary}22`
                                : `${C.ok}14`,
                            border: `1px solid ${message.sender === "admin" ? C.primary : C.ok}33`,
                          }}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span
                              className="text-[11px] font-semibold"
                              style={{ color: C.text, fontFamily: BODY_FONT }}
                            >
                              {message.author}
                            </span>
                            <span
                              className="text-[10px]"
                              style={{ color: C.muted, fontFamily: MONO_FONT }}
                            >
                              {timeAgo(message.createdAt)}
                            </span>
                          </div>
                          <p
                            className="text-xs"
                            style={{ color: C.text, fontFamily: BODY_FONT }}
                          >
                            {message.text}
                          </p>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={sendAdminReply}>
                      <textarea
                        value={adminReply}
                        onChange={(e) => setAdminReply(e.target.value)}
                        rows={3}
                        placeholder="Répondre en privé à ce membre..."
                        className="w-full px-3 py-2 rounded-md text-sm mb-2"
                        style={inputStyle}
                      />
                      {adminNotice && (
                        <p
                          className="text-xs mb-2"
                          style={{ color: C.ok, fontFamily: BODY_FONT }}
                        >
                          {adminNotice}
                        </p>
                      )}
                      <PrimaryButton type="submit">
                        <Send size={14} /> Répondre
                      </PrimaryButton>
                    </form>
                  </div>
                )}
              </div>
            )}
          </Panel>

          <Panel className="p-4">
            <div className="flex items-center justify-between">
              <span
                className="text-sm"
                style={{ color: C.muted, fontFamily: BODY_FONT }}
              >
                Chiffre d'affaires simulé
              </span>
              <span
                className="text-lg font-bold"
                style={{ color: C.ok, fontFamily: DISPLAY_FONT }}
              >
                {totalRevenue}€
              </span>
            </div>
          </Panel>
        </div>
      )}

      {section === "danger" && (
        <Panel className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={15} style={{ color: C.alert }} />
            <span
              className="text-sm font-semibold"
              style={{ color: C.text, fontFamily: DISPLAY_FONT }}
            >
              Zone dangereuse
            </span>
          </div>
          <p
            className="text-xs mb-3"
            style={{ color: C.muted, fontFamily: BODY_FONT }}
          >
            Supprime définitivement tout le contenu partagé : questions,
            messages du Hub, trophées, tickets et fils de support. Cette action
            est irréversible.
          </p>
          {!confirmClear ? (
            <GhostButton danger onClick={() => setConfirmClear(true)}>
              <Trash2 size={12} /> Tout réinitialiser
            </GhostButton>
          ) : (
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-xs"
                style={{ color: C.alert, fontFamily: BODY_FONT }}
              >
                Confirmer la suppression définitive ?
              </span>
              <GhostButton danger onClick={clearAll}>
                <Trash2 size={12} /> Oui, tout supprimer
              </GhostButton>
              <GhostButton onClick={() => setConfirmClear(false)}>
                Annuler
              </GhostButton>
            </div>
          )}
        </Panel>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------
   Recherche globale — transversale forum / teams / labs / actus / trophées
--------------------------------------------------------------------- */
const SEARCH_GROUPS = [
  {
    kind: "question",
    label: "Questions",
    icon: MessageSquare,
    accent: C.primary,
  },
  { kind: "team", label: "Teams", icon: Users, accent: C.warn },
  { kind: "lab", label: "Salons lab", icon: Bug, accent: C.alert },
  { kind: "news", label: "CTFNews", icon: Flag, accent: C.gold },
  { kind: "trophy", label: "Trophées", icon: Trophy, accent: C.gold },
];

function GlobalSearchModal({
  onClose,
  setTab,
  questions,
  teams,
  labs,
  news,
  trophies,
}) {
  const [q, setQ] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const allResults = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (query.length < 2) return [];
    const out = [];
    questions.forEach((item) => {
      if (
        item.title.toLowerCase().includes(query) ||
        item.body?.toLowerCase().includes(query)
      ) {
        out.push({
          kind: "question",
          id: item.id,
          title: item.title,
          sub: `Question de ${item.author}`,
          tab: "forum",
          accent: C.primary,
          icon: <MessageSquare size={15} />,
        });
      }
    });
    teams.forEach((item) => {
      if (item.name?.toLowerCase().includes(query)) {
        out.push({
          kind: "team",
          id: item.id,
          title: item.name,
          sub: `Team de ${item.owner}`,
          tab: "equipes",
          accent: C.warn,
          icon: <Users size={15} />,
        });
      }
    });
    labs.forEach((item) => {
      if (item.title?.toLowerCase().includes(query)) {
        out.push({
          kind: "lab",
          id: item.id,
          title: item.title,
          sub: `Salon lab de ${item.owner}`,
          tab: "labs",
          accent: C.alert,
          icon: <Bug size={15} />,
        });
      }
    });
    news.forEach((item) => {
      if (
        item.title.toLowerCase().includes(query) ||
        item.summary?.toLowerCase().includes(query)
      ) {
        out.push({
          kind: "news",
          id: item.id,
          title: item.title,
          sub: "CTFNews",
          tab: "actus",
          accent: C.gold,
          icon: <Flag size={15} />,
        });
      }
    });
    trophies.forEach((item) => {
      if (
        item.title?.toLowerCase().includes(query) ||
        item.platform?.toLowerCase().includes(query)
      ) {
        out.push({
          kind: "trophy",
          id: item.id,
          title: `${item.platform} — ${item.title}`,
          sub: `Trophée de ${item.author}`,
          tab: "trophies",
          accent: C.gold,
          icon: <Trophy size={15} />,
        });
      }
    });
    return out.slice(0, 40);
  }, [q, questions, teams, labs, news, trophies]);

  const counts = useMemo(() => {
    const c = {};
    allResults.forEach((r) => {
      c[r.kind] = (c[r.kind] || 0) + 1;
    });
    return c;
  }, [allResults]);

  const results = useMemo(
    () =>
      activeFilter === "all"
        ? allResults
        : allResults.filter((r) => r.kind === activeFilter),
    [allResults, activeFilter],
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [q, activeFilter]);

  function openResult(r) {
    setTab(r.tab);
    onClose();
  }

  function onKeyDown(e) {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const r = results[activeIndex];
      if (r) openResult(r);
    }
  }

  return (
    <div className="gowl-search-overlay" onClick={onClose}>
      <div
        className="gowl-search-modal"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="gowl-search-bar">
          <span className="gowl-search-bar-icon">
            <Search size={17} />
          </span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher dans le forum, les teams, les labs, les actus, les trophées..."
            className="gowl-search-input"
          />
          {q.length > 0 && (
            <button
              className="gowl-search-clear"
              onClick={() => {
                setQ("");
                inputRef.current?.focus();
              }}
              title="Effacer"
              aria-label="Effacer la recherche"
            >
              <X size={13} />
            </button>
          )}
          <button className="gowl-search-close" onClick={onClose}>
            ESC
          </button>
        </div>

        {q.trim().length >= 2 && allResults.length > 0 && (
          <div className="gowl-search-filters">
            <button
              className="gowl-search-filter"
              data-active={activeFilter === "all"}
              onClick={() => setActiveFilter("all")}
              style={{ "--gowl-accent": C.primary }}
            >
              Tout · {allResults.length}
            </button>
            {SEARCH_GROUPS.filter((g) => counts[g.kind]).map((g) => {
              const GIcon = g.icon;
              return (
                <button
                  key={g.kind}
                  className="gowl-search-filter"
                  data-active={activeFilter === g.kind}
                  onClick={() => setActiveFilter(g.kind)}
                  style={{ "--gowl-accent": g.accent }}
                >
                  <GIcon size={11} /> {g.label} · {counts[g.kind]}
                </button>
              );
            })}
          </div>
        )}

        <div className="gowl-search-body">
          {q.trim().length < 2 ? (
            <div className="gowl-search-hint">
              <SearchTerminalIcon />
              <p>Tape au moins 2 caractères pour lancer la recherche.</p>
            </div>
          ) : results.length === 0 ? (
            <div className="gowl-search-hint">
              <Eye size={22} className="gowl-search-hint-icon" />
              <p>Aucun résultat pour « {q.trim()} ».</p>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: MONO_FONT,
                  color: C.muted,
                  opacity: 0.7,
                }}
              >
                0 correspondance dans l'index — essaie un autre mot-clé
              </span>
            </div>
          ) : (
            <>
              <p className="gowl-search-count">
                $ {results.length} résultat{results.length > 1 ? "s" : ""}{" "}
                trouvé{results.length > 1 ? "s" : ""}
              </p>
              <div className="gowl-search-results">
                {results.map((r, i) => (
                  <button
                    key={`${r.kind}-${r.id}`}
                    className="gowl-search-result"
                    data-active={i === activeIndex}
                    style={{
                      "--gowl-accent": r.accent,
                      animationDelay: `${Math.min(i, 8) * 0.02}s`,
                      ...(i === activeIndex
                        ? {
                            background: `color-mix(in srgb, ${r.accent} 10%, ${C.panel2})`,
                            borderColor: r.accent,
                          }
                        : {}),
                    }}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => openResult(r)}
                  >
                    <span className="gowl-search-result-icon">{r.icon}</span>
                    <span className="gowl-search-result-text">
                      <span className="gowl-search-result-title">
                        {r.title}
                      </span>
                      <span className="gowl-search-result-sub">{r.sub}</span>
                    </span>
                    <ChevronRight
                      size={14}
                      className="gowl-search-result-arrow"
                      style={{ opacity: i === activeIndex ? 1 : undefined }}
                    />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="gowl-search-footer">
          <span>
            <kbd>↑</kbd> <kbd>↓</kbd> naviguer
          </span>
          <span>
            <kbd>↵</kbd> ouvrir
          </span>
          <span>
            <kbd>Esc</kbd> fermer
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Centre de notifications — cloche du header
--------------------------------------------------------------------- */
function NotificationBell({
  currentUser,
  questions,
  teams,
  labs,
  notifications = [],
  setTab,
}) {
  const [open, setOpen] = useState(false);
  const [lastSeen, setLastSeen] = useState(null);
  const [serverNotifications, setServerNotifications] = useState([]);
  const btnRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, right: 0 });

  useEffect(() => {
    if (!currentUser) return;
    (async () => {
      try {
        const res = await window.storage.get(
          `gowlsec:notif_seen:${currentUser.id}`,
          false,
        );
        if (res?.value) setLastSeen(res.value);
      } catch {
        /* best effort */
      }
    })();
  }, [currentUser?.id]);

  useEffect(() => {
    if (open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 6, right: window.innerWidth - r.right });
    }
  }, [open]);

  useEffect(() => {
    if (!currentUser) {
      setServerNotifications([]);
      return;
    }
    let active = true;
    async function refreshNotifications() {
      try {
        const data = await apiRequest("/api/social/notifications");
        if (active)
          setServerNotifications(
            Array.isArray(data.notifications) ? data.notifications : [],
          );
      } catch {
        /* Les notifications locales restent disponibles hors ligne. */
      }
    }
    refreshNotifications();
    const interval = window.setInterval(refreshNotifications, 60000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, [currentUser?.id]);

  const items = useMemo(() => {
    if (!currentUser) return [];
    const out = [];
    questions
      .filter((q) => q.author === currentUser.username)
      .forEach((q) => {
        (q.answers || [])
          .filter((a) => a.author !== currentUser.username)
          .forEach((a) => {
            out.push({
              id: `answer-${a.id}`,
              text: `${a.author} a répondu à ta question « ${q.title} »`,
              createdAt: a.createdAt,
              tab: "forum",
              icon: <MessageSquare size={13} />,
              accent: C.primary,
            });
          });
      });
    teams
      .filter((t) => t.owner === currentUser.username)
      .forEach((t) => {
        (t.members || [])
          .filter((m) => m !== currentUser.username)
          .forEach((m) => {
            out.push({
              id: `team-${t.id}-${m}`,
              text: `${m} a rejoint ta team ${t.name}`,
              createdAt: t.createdAt,
              tab: "equipes",
              icon: <Users size={13} />,
              accent: C.warn,
            });
          });
      });
    labs
      .filter((l) => l.owner === currentUser.username)
      .forEach((l) => {
        (l.members || [])
          .filter((m) => m !== currentUser.username)
          .forEach((m) => {
            out.push({
              id: `lab-${l.id}-${m}`,
              text: `${m} a rejoint ton salon lab ${l.title}`,
              createdAt: l.createdAt,
              tab: "labs",
              icon: <Bug size={13} />,
              accent: C.alert,
            });
          });
      });
    notifications
      .filter((n) => !n.targetUserId || n.targetUserId === currentUser.id)
      .forEach((n) => {
        const cat =
          NEWS_CATEGORIES.find((c) => c.key === n.category) ||
          NEWS_CATEGORIES[1];
        const Icon = cat.icon || Mail;
        out.push({
          id: `notif-${n.id}`,
          text: n.targetUserId ? n.title : `${n.title}`,
          sub: n.message,
          createdAt: n.createdAt,
          tab: n.category === "event" ? "evenements" : "actus",
          icon: <Icon size={13} />,
          accent: cat.color,
        });
      });
    serverNotifications.forEach((notification) => {
      const meta = {
        mention: { icon: <Hash size={13} />, accent: C.primary, tab: "salons" },
        "team-invitation": {
          icon: <Users size={13} />,
          accent: C.warn,
          tab: "messages",
        },
        "direct-message": {
          icon: <MessageCircle size={13} />,
          accent: C.ok,
          tab: "messages",
        },
        "ctf-reminder": {
          icon: <Flag size={13} />,
          accent: C.alert,
          tab: "actus",
        },
        "ctf-new": {
          icon: <Calendar size={13} />,
          accent: C.ok,
          tab: "actus",
        },
        announcement: {
          icon: <Megaphone size={13} />,
          accent: C.primary,
          tab: "accueil",
        },
        "site-update": {
          icon: <Radio size={13} />,
          accent: C.gold,
          tab: "salons",
        },
        "badge-unlocked": {
          icon: <Award size={13} />,
          accent: C.gold,
          tab: "profil",
        },
        recommendation: {
          icon: <Pin size={13} />,
          accent: C.primary,
          tab: "profil",
        },
      }[notification.type] || {
        icon: <Mail size={13} />,
        accent: C.primary,
        tab: "accueil",
      };
      out.push({
        id: `server-${notification.id}`,
        serverId: notification.id,
        text: notification.title,
        sub: notification.message,
        createdAt: notification.createdAt,
        tab: meta.tab,
        icon: meta.icon,
        accent: meta.accent,
        source: "server",
        readAt: notification.readAt,
      });
    });
    return out
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 30);
  }, [
    currentUser,
    questions,
    teams,
    labs,
    notifications,
    serverNotifications,
  ]);

  const unreadCount = useMemo(() => {
    return items.filter((item) =>
      item.source === "server"
        ? !item.readAt
        : !lastSeen || new Date(item.createdAt) > new Date(lastSeen),
    ).length;
  }, [items, lastSeen]);

  const unreadItems = useMemo(
    () =>
      items.filter((item) =>
        item.source === "server"
          ? !item.readAt
          : !lastSeen || new Date(item.createdAt) > new Date(lastSeen),
      ),
    [items, lastSeen],
  );
  const readItems = useMemo(
    () =>
      items.filter((item) =>
        item.source === "server"
          ? Boolean(item.readAt)
          : Boolean(lastSeen) &&
            new Date(item.createdAt) <= new Date(lastSeen),
      ),
    [items, lastSeen],
  );

  async function toggle() {
    const next = !open;
    setOpen(next);
  }

  async function markAllRead() {
    if (!currentUser) return;
    const now = new Date().toISOString();
    setLastSeen(now);
    setServerNotifications((items) =>
      items.map((item) => ({ ...item, readAt: item.readAt || now })),
    );
    apiRequest("/api/social/notifications/read", { method: "PATCH" }).catch(
      () => {},
    );
    try {
      await window.storage.set(
        `gowlsec:notif_seen:${currentUser.id}`,
        now,
        false,
      );
    } catch {
      /* best effort */
    }
  }

  if (!currentUser) return null;

  function NotifRow({ n, unread }) {
    return (
      <button
        onClick={() => {
          if (n.source === "server" && n.serverId && !n.readAt) {
            const readAt = new Date().toISOString();
            setServerNotifications((current) =>
              current.map((item) =>
                item.id === n.serverId ? { ...item, readAt } : item,
              ),
            );
            apiRequest(`/api/social/notifications/${n.serverId}/read`, {
              method: "PATCH",
            }).catch(() => {});
          }
          setTab(n.tab);
          setOpen(false);
        }}
        className="flex items-start gap-2.5 w-full text-left px-3.5 py-2.5 gowl-notif-row"
        style={{
          borderBottom: `1px solid ${C.line}`,
          borderLeft: unread
            ? `2px solid ${n.accent}`
            : "2px solid transparent",
          background: unread ? `${n.accent}0C` : "transparent",
        }}
      >
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: `${n.accent}1F`, color: n.accent }}
        >
          {n.icon}
        </span>
        <div className="min-w-0 flex-1">
          <p
            className="text-xs leading-snug font-semibold"
            style={{ color: C.text, fontFamily: BODY_FONT }}
          >
            {n.text}
          </p>
          {n.sub && (
            <p
              className="text-[11px] leading-snug mt-0.5"
              style={{ color: C.muted, fontFamily: BODY_FONT }}
            >
              {n.sub}
            </p>
          )}
          <span
            className="text-[10px] gowl-mono-tag"
            style={{ color: C.muted }}
          >
            {timeAgo(n.createdAt)}
          </span>
        </div>
        {unread && (
          <span
            className="w-2 h-2 rounded-full shrink-0 mt-1.5"
            style={{ background: n.accent }}
          />
        )}
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={toggle}
        title="Notifications"
        className="relative w-9 h-9 rounded-lg flex items-center justify-center gowl-notif-bell"
        data-ring={unreadCount > 0}
        style={{ background: C.panel2, border: `1px solid ${C.line}` }}
      >
        <Mail size={17} />
        {unreadCount > 0 && (
          <span
            className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center text-[9px] font-bold gowl-count-pop"
            style={{
              background: C.alert,
              color: "#fff",
              fontFamily: MONO_FONT,
              boxShadow: `0 0 0 2px ${C.panel2}`,
            }}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => setOpen(false)}
            />
            <div
              className="fixed w-[360px] max-w-[92vw] rounded-2xl z-[9999] overflow-hidden gowl-fade-up"
              style={{
                top: pos.top,
                right: pos.right,
                background: C.panel,
                border: `1px solid ${C.line}`,
                boxShadow: `0 22px 55px -20px rgba(0,0,0,0.82), 0 0 0 1px ${C.primary}12`,
              }}
            >
              <div
                className="px-3 py-2.5 flex items-center gap-2.5"
                style={{
                  borderBottom: `1px solid ${C.line}`,
                  background: C.panel2,
                }}
              >
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${C.primary}1A`, color: C.primary }}
                >
                  <Mail size={15} />
                </span>
                <div className="min-w-0 flex-1">
                  <span
                    className="text-xs font-bold"
                    style={{ color: C.text, fontFamily: DISPLAY_FONT }}
                  >
                    Notifications
                  </span>
                  <p
                    className="text-[10px] gowl-mono-tag"
                    style={{ color: C.muted }}
                  >
                    {unreadCount > 0
                      ? `${unreadCount} non lue${unreadCount > 1 ? "s" : ""}`
                      : "Tout est à jour"}
                  </p>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="shrink-0 text-[10px] font-semibold px-2 py-1 rounded-md gowl-notif-markread"
                    style={{
                      color: C.primary,
                      border: `1px solid ${C.primary}44`,
                    }}
                  >
                    Tout marquer comme lu
                  </button>
                )}
              </div>
              <div className="max-h-96 overflow-y-auto">
                {items.length === 0 ? (
                  <div className="text-center py-8 px-4">
                    <span
                      className="w-11 h-11 rounded-2xl flex items-center justify-center mx-auto mb-2.5"
                      style={{ background: `${C.primary}14`, color: C.primary }}
                    >
                      <Mail size={20} />
                    </span>
                    <p
                      className="text-xs"
                      style={{ color: C.muted, fontFamily: BODY_FONT }}
                    >
                      Rien de nouveau pour l'instant.
                    </p>
                  </div>
                ) : (
                  <>
                    {unreadItems.length > 0 && (
                      <>
                        <div className="px-3.5 pt-2.5 pb-1">
                          <span
                            className="text-[10px] font-bold uppercase gowl-mono-tag"
                            style={{ color: C.primary }}
                          >
                            Nouveau
                          </span>
                        </div>
                        {unreadItems.map((n) => (
                          <NotifRow key={n.id} n={n} unread />
                        ))}
                      </>
                    )}
                    {readItems.length > 0 && (
                      <>
                        <div className="px-3.5 pt-2.5 pb-1">
                          <span
                            className="text-[10px] font-bold uppercase gowl-mono-tag"
                            style={{ color: C.muted }}
                          >
                            Plus tôt
                          </span>
                        </div>
                        {readItems.map((n) => (
                          <NotifRow key={n.id} n={n} unread={false} />
                        ))}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </>,
          document.body,
        )}
    </div>
  );
}

/* ---------------------------------------------------------------------
   Write-ups communautaires — résolutions de labs partagées
--------------------------------------------------------------------- */
function WriteupsTab({
  pseudo,
  writeups,
  setWriteups,
  isAdmin,
  currentUser = null,
}) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [platform, setPlatform] = useState(PLATFORMS[0]);
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState(DIFFICULTIES[0].key);
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [expanded, setExpanded] = useState({});

  function resetForm() {
    setEditingId(null);
    setPlatform(PLATFORMS[0]);
    setTitle("");
    setDifficulty(DIFFICULTIES[0].key);
    setSummary("");
    setContent("");
    setLink("");
    setShowForm(false);
  }
  function startEdit(w) {
    if (!currentUser || (!isAdmin && w.author !== pseudo)) return;
    setEditingId(w.id);
    setPlatform(w.platform);
    setTitle(w.title);
    setDifficulty(w.difficulty);
    setSummary(w.summary || "");
    setContent(w.content);
    setLink(w.link || "");
    setShowForm(true);
  }
  async function submit(e) {
    e.preventDefault();
    if (!currentUser || !title.trim() || !content.trim()) return;
    if (editingId) {
      const target = writeups.find((w) => w.id === editingId);
      if (!target || (!isAdmin && target.author !== pseudo)) return;
      const next = writeups.map((w) =>
        w.id === editingId
          ? {
              ...w,
              platform,
              title: title.trim(),
              difficulty,
              summary: summary.trim(),
              content: content.trim(),
              link: link.trim(),
              edited: true,
              editedAt: new Date().toISOString(),
            }
          : w,
      );
      setWriteups(next);
      saveCollection("gowlsec:writeups", next);
      resetForm();
      return;
    }
    try {
      const result = await communityRequest("/writeups", {
        method: "POST",
        body: {
          platform,
          title: title.trim(),
          difficulty,
          summary: summary.trim(),
          content: content.trim(),
          link: link.trim(),
        },
      });
      setWriteups((current) => [result.writeup, ...current]);
      resetForm();
    } catch (error) {
      window.alert(error.message);
    }
  }
  async function remove(id) {
    const target = writeups.find((w) => w.id === id);
    if (!target || (!isAdmin && target.author !== pseudo)) return;
    try {
      await communityRequest(`/writeups/${id}`, { method: "DELETE" });
      const next = writeups.filter((w) => w.id !== id);
      setWriteups(next);
      saveCollection("gowlsec:writeups", next);
    } catch (error) {
      window.alert(error.message);
    }
  }

  return (
    <div className="gowl-community-view gowl-view-writeups">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <SectionHeader
          icon={<FileText size={19} />}
          eyebrow="Community content"
          title="Write-ups"
          subtitle="Résolutions de labs (HTB, TryHackMe, Root-Me...) partagées par la communauté."
          accent={C.primary}
        />
        {!currentUser ? (
          <PrimaryButton
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-auth-login"))
            }
          >
            Connexion
          </PrimaryButton>
        ) : (
          <PrimaryButton
            onClick={() =>
              showForm ? resetForm() : (setEditingId(null), setShowForm(true))
            }
          >
            {showForm ? <X size={15} /> : <Plus size={15} />}{" "}
            {showForm ? "Annuler" : "Publier un write-up"}
          </PrimaryButton>
        )}
      </div>
      {!currentUser && (
        <GuestGate
          text="Connecte-toi pour publier un write-up."
          accent={C.primary}
        />
      )}
      {showForm && (
        <ModalOverlay onClose={resetForm}>
          <CreationHero
            scene={<LabScene />}
            accent={C.primary}
            eyebrow={editingId ? "Modifier le write-up" : "Nouveau write-up"}
            title={
              editingId ? "Mets à jour ta résolution" : "Partage ta résolution"
            }
            subtitle="Détaille ta méthodologie une fois le lab validé : ça aide toute la communauté à progresser."
            onClose={resetForm}
          >
            <form onSubmit={submit} className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-2.5">
                <Field label="Plateforme">
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full px-2.5 py-1.75 rounded-md text-sm"
                    style={inputStyle}
                  >
                    {PLATFORMS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Nom du lab / challenge">
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex : Blue, Vulnversity..."
                    className="w-full px-2.5 py-1.75 rounded-md text-sm"
                    style={inputStyle}
                  />
                </Field>
              </div>
              <Field label="Difficulté">
                <div className="flex flex-wrap gap-2">
                  {DIFFICULTIES.map((d) => (
                    <button
                      type="button"
                      key={d.key}
                      onClick={() => setDifficulty(d.key)}
                      style={{ opacity: difficulty === d.key ? 1 : 0.5 }}
                    >
                      <Chip label={d.label} color={d.color} />
                    </button>
                  ))}
                </div>
              </Field>
              <div
                className="flex items-start gap-2 px-2.5 py-2 rounded-md text-xs"
                style={{
                  background: `${C.warn}14`,
                  border: `1px solid ${C.warn}44`,
                  color: C.warn,
                  fontFamily: BODY_FONT,
                }}
              >
                <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                <span>
                  Ne partage pas les flags : donne uniquement ton avis et ta
                  méthodologie sur le lab.
                </span>
              </div>
              <Field label="Résumé (1-2 lignes)">
                <input
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-2.5 py-1.75 rounded-md text-sm"
                  style={inputStyle}
                />
              </Field>
              <Field label="Méthodologie / write-up complet">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                  placeholder="Reconnaissance, énumération, exploitation, élévation de privilèges..."
                  className="w-full px-2.5 py-1.75 rounded-md text-sm resize-none"
                  style={inputStyle}
                />
              </Field>
              <Field label="Lien externe (optionnel)">
                <input
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-2.5 py-1.75 rounded-md text-sm"
                  style={inputStyle}
                />
              </Field>
              <PrimaryButton type="submit">
                <CheckCircle2 size={14} />{" "}
                {editingId ? "Enregistrer" : "Publier"}
              </PrimaryButton>
            </form>
          </CreationHero>
        </ModalOverlay>
      )}
      <div className="space-y-3">
        {writeups.length === 0 && (
          <EmptyState
            icon={<FileText size={20} />}
            accent={C.primary}
            text="Aucun write-up publié pour le moment. Sois le premier à partager une résolution !"
          />
        )}
        {writeups.map((w) => {
          const d =
            DIFFICULTIES.find((x) => x.key === w.difficulty) || DIFFICULTIES[0];
          const isOpen = !!expanded[w.id];
          const canManage = isAdmin || (currentUser && w.author === pseudo);
          return (
            <Panel
              key={w.id}
              className="p-4 gowl-community-card gowl-glass"
            >
              {canManage && (
                <div className="absolute top-3 right-3 z-10 flex items-center gap-2.5">
                  <button
                    onClick={() => startEdit(w)}
                    title="Modifier"
                    style={{ color: C.muted }}
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={() => remove(w.id)}
                    title="Supprimer"
                    style={{ color: C.alert }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              )}
              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                <span
                  className="text-[10px] uppercase gowl-mono-tag"
                  style={{ color: C.muted }}
                >
                  {w.platform}
                </span>
                <Chip label={d.label} color={d.color} />
              </div>
              <h3
                className="font-semibold text-sm mb-1"
                style={{ color: C.text, fontFamily: DISPLAY_FONT }}
              >
                {w.title}
              </h3>
              {w.summary && (
                <p
                  className="text-xs mb-2"
                  style={{ color: C.muted, fontFamily: BODY_FONT }}
                >
                  {w.summary}
                </p>
              )}
              {w.edited && (
                <p
                  className="text-[10px] italic mb-1"
                  style={{ color: C.muted, fontFamily: BODY_FONT }}
                >
                  (modifié)
                </p>
              )}
              {isOpen && (
                <div
                  className="mt-2 p-3 rounded-md whitespace-pre-wrap text-xs"
                  style={{
                    background: C.panel2,
                    color: C.text,
                    fontFamily: BODY_FONT,
                  }}
                >
                  {w.content}
                </div>
              )}
              <div
                className="flex items-center justify-between mt-3 pt-2"
                style={{ borderTop: `1px solid ${C.line}` }}
              >
                <span
                  className="text-xs"
                  style={{ color: C.primary, fontFamily: MONO_FONT }}
                >
                  {w.author} · {timeAgo(w.createdAt)}
                </span>
                <div className="flex items-center gap-2">
                  {w.link && (
                    <a href={w.link} target="_blank" rel="noreferrer">
                      <GhostButton>
                        <ExternalLink size={11} /> Lien
                      </GhostButton>
                    </a>
                  )}
                  <GhostButton
                    onClick={() =>
                      setExpanded((e) => ({ ...e, [w.id]: !e[w.id] }))
                    }
                  >
                    {isOpen ? (
                      <ChevronUp size={12} />
                    ) : (
                      <ChevronDown size={12} />
                    )}{" "}
                    {isOpen ? "Réduire" : "Lire"}
                  </GhostButton>
                </div>
              </div>
            </Panel>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Calendrier d'événements — CTF, coachings boutique, lives Discord
--------------------------------------------------------------------- */
function timeUntil(iso) {
  const diff = new Date(iso).getTime() - Date.now();
  if (diff <= 0) return "en cours / passé";
  const days = Math.floor(diff / 86400000);
  if (days > 0) return `dans ${days} j`;
  const hours = Math.floor(diff / 3600000);
  if (hours > 0) return `dans ${hours} h`;
  return `dans ${Math.max(1, Math.floor(diff / 60000))} min`;
}
function EventsTab({ pseudo, events, setEvents, isAdmin, currentUser = null }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState(EVENT_TYPES[0].key);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!currentUser || !title.trim() || !date) return;
    const ev = {
      id: uid(),
      author: pseudo,
      title: title.trim(),
      type,
      date: new Date(date).toISOString(),
      description: description.trim(),
      link: link.trim(),
      createdAt: new Date().toISOString(),
    };
    const next = [ev, ...events];
    setEvents(next);
    saveCollection("gowlsec:events", next);
    setTitle("");
    setDate("");
    setDescription("");
    setLink("");
    setType(EVENT_TYPES[0].key);
    setShowForm(false);
  }
  function remove(id) {
    const next = events.filter((e) => e.id !== id);
    setEvents(next);
    saveCollection("gowlsec:events", next);
  }

  const sorted = useMemo(
    () => [...events].sort((a, b) => new Date(a.date) - new Date(b.date)),
    [events],
  );
  const upcoming = sorted.filter(
    (e) => new Date(e.date).getTime() >= Date.now(),
  );
  const past = sorted.filter((e) => new Date(e.date).getTime() < Date.now());

  function EventCard({ e }) {
    const et = EVENT_TYPES.find((x) => x.key === e.type) || EVENT_TYPES[0];
    return (
      <Panel className="p-4 relative" style={{ borderColor: `${et.color}44` }}>
        {isAdmin && (
          <button
            onClick={() => remove(e.id)}
            className="absolute top-3 right-3 z-10"
            style={{ color: C.alert }}
          >
            <Trash2 size={13} />
          </button>
        )}
        <div className="flex items-center gap-2 mb-1.5">
          <Chip label={et.label} color={et.color} />
          <span
            className="text-[11px]"
            style={{ color: C.muted, fontFamily: MONO_FONT }}
          >
            {new Date(e.date).toLocaleString("fr-FR")}
          </span>
        </div>
        <h3
          className="font-semibold text-sm mb-1"
          style={{ color: C.text, fontFamily: DISPLAY_FONT }}
        >
          {e.title}
        </h3>
        {e.description && (
          <p
            className="text-xs mb-2"
            style={{ color: C.muted, fontFamily: BODY_FONT }}
          >
            {e.description}
          </p>
        )}
        <div
          className="flex items-center justify-between mt-2 pt-2"
          style={{ borderTop: `1px solid ${C.line}` }}
        >
          <span
            className="text-xs font-semibold"
            style={{ color: et.color, fontFamily: MONO_FONT }}
          >
            {timeUntil(e.date)}
          </span>
          {e.link && (
            <a href={e.link} target="_blank" rel="noreferrer">
              <GhostButton>
                <ExternalLink size={11} /> Détails
              </GhostButton>
            </a>
          )}
        </div>
      </Panel>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <SectionHeader
          icon={<Calendar size={19} />}
          eyebrow="Community"
          title="Événements"
          subtitle="CTF à venir, sessions de coaching de la boutique, lives Discord."
          accent={C.gold}
        />
        {!currentUser ? (
          <PrimaryButton
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-auth-login"))
            }
          >
            Connexion
          </PrimaryButton>
        ) : (
          <PrimaryButton onClick={() => setShowForm((s) => !s)}>
            {showForm ? <X size={15} /> : <Plus size={15} />}{" "}
            {showForm ? "Annuler" : "Ajouter un événement"}
          </PrimaryButton>
        )}
      </div>
      {!currentUser && (
        <GuestGate
          text="Connecte-toi pour proposer un événement."
          accent={C.gold}
        />
      )}
      {showForm && (
        <ModalOverlay onClose={() => setShowForm(false)}>
          <CreationHero
            scene={<TrophyScene />}
            accent={C.gold}
            eyebrow="Nouvel événement"
            title="Fédère la communauté autour d'un rendez-vous"
            subtitle="CTF, coaching, live Discord... donne date et lieu."
            onClose={() => setShowForm(false)}
          >
            <form onSubmit={submit} className="space-y-3">
              <Field label="Titre">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex : CTFtime — Cyber Apocalypse"
                  className="w-full px-2.5 py-1.75 rounded-md text-sm"
                  style={inputStyle}
                />
              </Field>
              <Field label="Type">
                <div className="flex flex-wrap gap-2">
                  {EVENT_TYPES.map((t) => (
                    <button
                      type="button"
                      key={t.key}
                      onClick={() => setType(t.key)}
                      style={{ opacity: type === t.key ? 1 : 0.5 }}
                    >
                      <Chip label={t.label} color={t.color} />
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Date et heure">
                <input
                  type="datetime-local"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-2.5 py-1.75 rounded-md text-sm"
                  style={inputStyle}
                />
              </Field>
              <Field label="Description">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full px-2.5 py-1.75 rounded-md text-sm resize-none"
                  style={inputStyle}
                />
              </Field>
              <Field label="Lien (optionnel)">
                <input
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-2.5 py-1.75 rounded-md text-sm"
                  style={inputStyle}
                />
              </Field>
              <PrimaryButton type="submit">
                <CheckCircle2 size={14} /> Publier l'événement
              </PrimaryButton>
            </form>
          </CreationHero>
        </ModalOverlay>
      )}
      <div className="mb-2">
        <span
          className="text-[10px] font-bold uppercase gowl-mono-tag"
          style={{ color: C.muted }}
        >
          À venir
        </span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {upcoming.length === 0 && (
          <EmptyState
            icon={<Calendar size={20} />}
            accent={C.gold}
            text="Aucun événement à venir pour le moment."
          />
        )}
        {upcoming.map((e) => (
          <EventCard key={e.id} e={e} />
        ))}
      </div>
      {past.length > 0 && (
        <>
          <div className="mb-2">
            <span
              className="text-[10px] font-bold uppercase gowl-mono-tag"
              style={{ color: C.muted }}
            >
              Passés
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 opacity-60">
            {past.slice(0, 6).map((e) => (
              <EventCard key={e.id} e={e} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------
   Parcours guidés — labs + ressources + défis regroupés en chemin structuré
--------------------------------------------------------------------- */
const LEARNING_PATH_ICONS = {
  fondations: Terminal,
  web: Globe,
  infra: Shield,
  team: Users,
  certif: Award,
};

function LearningPathsTab({ currentUser, setTab }) {
  const [progressData, setProgressData] = useState({
    metrics: {},
    loading: Boolean(currentUser),
    error: "",
  });
  const [idx, setIdx] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const [dragX, setDragX] = useState(0);
  const dragRef = useRef({ startX: 0, dragging: false });

  useEffect(() => {
    if (!currentUser) return;
    let active = true;
    async function refreshProgress() {
      try {
        const data = await apiRequest("/api/social/progress");
        if (active)
          setProgressData({
            metrics: data.metrics || {},
            loading: false,
            error: "",
          });
      } catch (error) {
        if (active)
          setProgressData((current) => ({
            ...current,
            loading: false,
            error: error.message,
          }));
      }
    }
    refreshProgress();
    const interval = window.setInterval(refreshProgress, 30000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, [currentUser?.id]);

  const progress = useMemo(
    () =>
      Object.fromEntries(
        LEARNING_PATHS.flatMap((path) =>
          path.steps.map((step) => [
            step.id,
            Number(progressData.metrics?.[step.metric] || 0) >= step.target,
          ]),
        ),
      ),
    [progressData.metrics],
  );

  const pathStats = LEARNING_PATHS.map((path) => {
    const done = path.steps.filter((s) => progress[s.id]).length;
    return {
      done,
      total: path.steps.length,
      pct: Math.round((done / path.steps.length) * 100),
    };
  });
  const overallDone = pathStats.reduce((acc, s) => acc + s.done, 0);
  const overallTotal = pathStats.reduce((acc, s) => acc + s.total, 0);
  const overallPct = overallTotal
    ? Math.round((overallDone / overallTotal) * 100)
    : 0;

  // Place la pile sur le premier parcours non terminé, une seule fois au chargement
  useEffect(() => {
    if (initialized) return;
    const firstUnfinished = pathStats.findIndex((s) => s.pct < 100);
    setIdx(
      firstUnfinished === -1 ? LEARNING_PATHS.length - 1 : firstUnfinished,
    );
    setInitialized(true);
  }, [progress, initialized]); // eslint-disable-line react-hooks/exhaustive-deps

  const total = LEARNING_PATHS.length;
  const goTo = (i) => setIdx(((i % total) + total) % total);
  const goNext = () => {
    setDragX(0);
    goTo(idx + 1);
  };
  const goPrev = () => {
    setDragX(0);
    goTo(idx - 1);
  };

  function onPointerDown(e) {
    dragRef.current = { startX: e.clientX, dragging: true };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }
  function onPointerMove(e) {
    if (!dragRef.current.dragging) return;
    setDragX(e.clientX - dragRef.current.startX);
  }
  function onPointerUp() {
    if (!dragRef.current.dragging) return;
    dragRef.current.dragging = false;
    if (dragX > 70) goPrev();
    else if (dragX < -70) goNext();
    else setDragX(0);
  }

  const activePath = LEARNING_PATHS[idx] || LEARNING_PATHS[0];
  const activeStats = pathStats[idx] || {
    done: 0,
    total: activePath.steps.length,
    pct: 0,
  };
  const ActiveIcon = LEARNING_PATH_ICONS[activePath.key] || MapPin;
  const totalXp = LEARNING_PATHS.flatMap((path) => path.steps).reduce(
    (sum, step) => sum + (step.xp || 0),
    0,
  );
  const earnedXp = LEARNING_PATHS.flatMap((path) => path.steps).reduce(
    (sum, step) => sum + (progress[step.id] ? step.xp || 0 : 0),
    0,
  );
  const nextStep =
    activePath.steps.find((step) => !progress[step.id]) ||
    activePath.steps[activePath.steps.length - 1];

  return (
    <div className="max-w-7xl mx-auto gowl-academy-world">
      <SectionHeader
        icon={<Compass size={19} />}
        eyebrow="GowlSec Academy"
        title="Ta progression dans GowlSec"
        subtitle="Chaque objectif correspond à une action réelle du site et se valide automatiquement. Aucun bouton ne permet de tricher."
        accent={C.ok}
      />
      {!currentUser && (
        <GuestGate
          text="Connecte-toi pour suivre ta progression sur les parcours."
          accent={C.ok}
        />
      )}
      {currentUser && (
        <div
          className="mt-4 rounded-xl px-4 py-3 flex items-center gap-3"
          style={{
            color: progressData.error ? C.alert : C.ok,
            background: progressData.error ? `${C.alert}0E` : `${C.ok}0D`,
            border: `1px solid ${progressData.error ? `${C.alert}38` : `${C.ok}32`}`,
          }}
        >
          {progressData.loading ? (
            <Loader2 size={16} className="animate-spin shrink-0" />
          ) : progressData.error ? (
            <AlertTriangle size={16} className="shrink-0" />
          ) : (
            <CheckCircle2 size={16} className="shrink-0" />
          )}
          <div className="min-w-0">
            <p className="text-xs font-bold">
              {progressData.loading
                ? "Synchronisation de tes actions…"
                : progressData.error
                  ? "Progression temporairement indisponible"
                  : "Progression automatique activée"}
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: C.muted }}>
              {progressData.error ||
                "Les données sont revérifiées toutes les 15 secondes et à chaque ouverture du parcours."}
            </p>
          </div>
        </div>
      )}

      <style>{`
        .gowl-academy-world {
          position: relative;
          isolation: isolate;
          padding: clamp(14px, 2.2vw, 28px);
          border-radius: 26px;
          overflow: hidden;
          border: 1px solid rgba(91, 110, 245, .28);
          background:
            radial-gradient(760px 380px at 8% -8%, rgba(91,110,245,.28), transparent 62%),
            radial-gradient(620px 360px at 100% 30%, rgba(46,217,163,.16), transparent 66%),
            linear-gradient(145deg, rgba(25,42,61,.97), rgba(16,29,43,.96));
          box-shadow: 0 30px 80px -50px rgba(91,110,245,.65), inset 0 1px 0 rgba(255,255,255,.05);
        }
        .gowl-academy-world::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -2;
          opacity: .26;
          background-image:
            linear-gradient(rgba(139,233,253,.13) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,233,253,.13) 1px, transparent 1px),
            radial-gradient(circle at 20% 30%, rgba(255,255,255,.7) 0 1px, transparent 1.5px),
            radial-gradient(circle at 76% 18%, rgba(255,255,255,.55) 0 1px, transparent 1.5px);
          background-size: 54px 54px, 54px 54px, 180px 180px, 230px 230px;
          mask-image: linear-gradient(to bottom, #000, transparent 86%);
        }
        .gowl-academy-world::after {
          content: "";
          position: absolute;
          width: 480px;
          height: 480px;
          right: -310px;
          top: 22%;
          z-index: -1;
          border-radius: 999px;
          border: 1px solid rgba(139,233,253,.18);
          box-shadow: 0 0 80px rgba(46,217,163,.1), inset 0 0 60px rgba(91,110,245,.08);
        }
        .academy-stage { position: relative; transition: transform .2s ease, border-color .2s ease, background .2s ease, box-shadow .2s ease; }
        .academy-stage::before { content: ""; position: absolute; left: -15px; top: 50%; width: 8px; height: 8px; border-radius: 50%; background: rgba(139,233,253,.22); transform: translateY(-50%); }
        .academy-stage:hover { transform: translateX(4px); }
        .academy-stage.is-active { box-shadow: 0 12px 30px -22px currentColor, inset 0 1px 0 rgba(255,255,255,.05); }
        .academy-step { transition: border-color .2s ease, transform .2s ease, background .2s ease, box-shadow .2s ease; backdrop-filter: blur(10px); }
        .academy-step:hover { transform: translateY(-2px); box-shadow: 0 16px 34px -26px rgba(139,233,253,.45); }
        .academy-step.is-next { box-shadow: 0 0 0 1px rgba(139,233,253,.12), 0 16px 38px -28px rgba(139,233,253,.7); }
        .academy-step.is-done { opacity: .88; }
        @media (max-width: 640px) { .gowl-academy-world { padding: 12px; border-radius: 18px; } }
      `}</style>

      <Panel
        className="mt-5 mb-5 p-4 sm:p-5 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${C.primary}16, ${C.panel} 42%, ${C.ok}0C)`,
          borderColor: `${C.primary}38`,
        }}
      >
        <div className="grid sm:grid-cols-[1fr_auto] gap-4 items-center">
          <div>
            <div className="flex items-center justify-between gap-3 mb-2">
              <span
                className="text-[10px] uppercase tracking-[0.18em]"
                style={{ color: C.primary, fontFamily: MONO_FONT }}
              >
                Progression globale
              </span>
              <span
                className="text-sm font-extrabold"
                style={{ color: C.ok, fontFamily: MONO_FONT }}
              >
                {overallPct}%
              </span>
            </div>
            <div
              className="h-2.5 rounded-full overflow-hidden"
              style={{ background: C.panel2 }}
            >
              <div
                className="h-full rounded-full gowl-bar-fill"
                style={{
                  width: `${overallPct}%`,
                  background: `linear-gradient(90deg, ${C.primary}, ${C.ok}, ${C.gold})`,
                }}
              />
            </div>
            <p className="text-xs mt-2" style={{ color: C.muted }}>
              {overallDone}/{overallTotal} checkpoints validés · prochaine étape
              : <span style={{ color: C.text }}>{nextStep?.label}</span>
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 min-w-[260px]">
            {[
              ["XP acquis", earnedXp, C.gold],
              ["XP total", totalXp, C.primary],
              ["Modules", LEARNING_PATHS.length, C.ok],
            ].map(([label, value, color]) => (
              <div
                key={label}
                className="rounded-xl px-3 py-2 text-center"
                style={{ background: C.panel2, border: `1px solid ${color}30` }}
              >
                <span
                  className="block text-base font-extrabold"
                  style={{ color, fontFamily: DISPLAY_FONT }}
                >
                  {value}
                </span>
                <span
                  className="block text-[8px] uppercase mt-0.5"
                  style={{ color: C.muted, fontFamily: MONO_FONT }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <div className="grid lg:grid-cols-[300px_1fr] gap-5 items-start">
        <Panel className="p-3 lg:sticky lg:top-24">
          <div className="px-2 py-2 mb-2">
            <span
              className="text-[10px] uppercase tracking-widest"
              style={{ color: C.muted, fontFamily: MONO_FONT }}
            >
              Roadmap · {LEARNING_PATHS.length} modules
            </span>
          </div>
          <div className="space-y-2">
            {LEARNING_PATHS.map((path, pathIndex) => {
              const Icon = LEARNING_PATH_ICONS[path.key] || MapPin;
              const stats = pathStats[pathIndex];
              const active = pathIndex === idx;
              const complete = stats.pct === 100;
              return (
                <button
                  key={path.key}
                  type="button"
                  onClick={() => goTo(pathIndex)}
                  className={`academy-stage ${active ? "is-active" : ""} w-full rounded-xl p-3 text-left`}
                  style={{
                    background: active ? `${path.accent}14` : C.panel2,
                    border: `1px solid ${active ? `${path.accent}60` : C.line}`,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        color: path.accent,
                        background: `${path.accent}18`,
                      }}
                    >
                      {complete ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <Icon size={15} />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className="block text-xs font-bold truncate"
                        style={{ color: active ? C.text : C.muted }}
                      >
                        {pathIndex + 1}. {path.title}
                      </span>
                      <span
                        className="block text-[9px] mt-0.5"
                        style={{ color: C.muted, fontFamily: MONO_FONT }}
                      >
                        {stats.done}/{stats.total} · {stats.pct}%
                      </span>
                    </span>
                    <ChevronRight
                      size={13}
                      style={{ color: active ? path.accent : C.muted }}
                    />
                  </div>
                  <div
                    className="h-1 rounded-full overflow-hidden mt-2.5"
                    style={{ background: C.bg }}
                  >
                    <div
                      className="h-full"
                      style={{
                        width: `${stats.pct}%`,
                        background: path.accent,
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel
            className="overflow-hidden"
            style={{ borderColor: `${activePath.accent}50` }}
          >
            <div
              className="p-5 sm:p-6 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${activePath.accent}1D, ${C.panel} 58%)`,
                borderBottom: `1px solid ${C.line}`,
              }}
            >
              <div
                aria-hidden
                className="absolute -right-10 -top-12 w-44 h-44 rounded-full"
                style={{
                  background: `${activePath.accent}18`,
                  filter: "blur(32px)",
                }}
              />
              <div className="relative flex flex-col sm:flex-row sm:items-start gap-4">
                <span
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    color: activePath.accent,
                    background: `${activePath.accent}18`,
                    border: `1px solid ${activePath.accent}45`,
                  }}
                >
                  <ActiveIcon size={25} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="text-[9px] uppercase tracking-widest"
                      style={{
                        color: activePath.accent,
                        fontFamily: MONO_FONT,
                      }}
                    >
                      Module {idx + 1}/{LEARNING_PATHS.length}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-[9px]"
                      style={{ color: C.muted, border: `1px solid ${C.line}` }}
                    >
                      {activePath.level}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-[9px]"
                      style={{ color: C.muted, border: `1px solid ${C.line}` }}
                    >
                      <Clock size={9} className="inline mr-1" />
                      {activePath.duration}
                    </span>
                  </div>
                  <h2
                    className="text-xl sm:text-2xl font-extrabold mt-2"
                    style={{ color: C.text, fontFamily: DISPLAY_FONT }}
                  >
                    {activePath.title}
                  </h2>
                  <p
                    className="text-sm leading-relaxed mt-2 max-w-2xl"
                    style={{ color: C.muted }}
                  >
                    {activePath.objective}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {activePath.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 rounded-md text-[9px]"
                        style={{
                          color: activePath.accent,
                          background: `${activePath.accent}10`,
                          border: `1px solid ${activePath.accent}2E`,
                          fontFamily: MONO_FONT,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span
                    className="text-2xl font-extrabold"
                    style={{
                      color: activePath.accent,
                      fontFamily: DISPLAY_FONT,
                    }}
                  >
                    {activeStats.pct}%
                  </span>
                  <span
                    className="block text-[9px] uppercase"
                    style={{ color: C.muted, fontFamily: MONO_FONT }}
                  >
                    terminé
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div
                className="rounded-xl p-3.5 mb-5 flex items-start gap-3"
                style={{
                  background: `${C.gold}0D`,
                  border: `1px solid ${C.gold}32`,
                }}
              >
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ color: C.gold, background: `${C.gold}16` }}
                >
                  <Target size={15} />
                </span>
                <div>
                  <span
                    className="text-[9px] uppercase tracking-wider"
                    style={{ color: C.gold, fontFamily: MONO_FONT }}
                  >
                    Challenge de validation
                  </span>
                  <p
                    className="text-xs leading-relaxed mt-1"
                    style={{ color: C.text }}
                  >
                    {activePath.challenge}
                  </p>
                </div>
              </div>
              <div className="space-y-2.5">
                {activePath.steps.map((step, stepIndex) => {
                  const done = Boolean(progress[step.id]);
                  const isNext = nextStep?.id === step.id && !done;
                  const currentValue = Math.max(
                    0,
                    Number(progressData.metrics?.[step.metric] || 0),
                  );
                  const requirementPct = Math.min(
                    100,
                    Math.round((currentValue / step.target) * 100),
                  );
                  return (
                    <div
                      key={step.id}
                      className={`academy-step ${done ? "is-done" : ""} ${isNext ? "is-next" : ""} rounded-xl p-3 sm:p-4 flex items-start gap-3`}
                      style={{
                        background: done ? `${activePath.accent}0B` : C.panel2,
                        border: `1px solid ${isNext ? `${activePath.accent}60` : done ? `${activePath.accent}30` : C.line}`,
                      }}
                    >
                      <span
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          color: done
                            ? "#06110D"
                            : isNext
                              ? activePath.accent
                              : C.muted,
                          background: done
                            ? activePath.accent
                            : `${activePath.accent}10`,
                          border: `1px solid ${done || isNext ? activePath.accent : C.line}`,
                        }}
                      >
                        {done ? (
                          <CheckCircle2 size={16} />
                        ) : (
                          <span
                            className="text-[10px] font-bold"
                            style={{ fontFamily: MONO_FONT }}
                          >
                            {stepIndex + 1}
                          </span>
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3
                            className="text-sm font-bold"
                            style={{
                              color: done ? C.muted : C.text,
                              textDecoration: done ? "line-through" : "none",
                            }}
                          >
                            {step.label}
                          </h3>
                          {isNext && (
                            <span
                              className="px-2 py-0.5 rounded-full text-[8px] font-bold"
                              style={{
                                color: activePath.accent,
                                background: `${activePath.accent}16`,
                                fontFamily: MONO_FONT,
                              }}
                            >
                              PROCHAINE
                            </span>
                          )}
                        </div>
                        <p
                          className="text-[11px] mt-1"
                          style={{ color: C.muted }}
                        >
                          {step.desc}
                        </p>
                        <div
                          className="flex items-center gap-3 mt-2 text-[9px] flex-wrap"
                          style={{ color: C.muted, fontFamily: MONO_FONT }}
                        >
                          <span>
                            <Clock size={9} className="inline mr-1" />
                            {step.duration}
                          </span>
                          <span style={{ color: C.gold }}>+{step.xp} XP</span>
                          <span
                            className="ml-auto px-2 py-0.5 rounded-full"
                            style={{
                              color: done ? C.ok : activePath.accent,
                              background: done
                                ? `${C.ok}12`
                                : `${activePath.accent}10`,
                              border: `1px solid ${done ? `${C.ok}35` : `${activePath.accent}28`}`,
                            }}
                          >
                            {Math.min(currentValue, step.target)}/{step.target}
                          </span>
                        </div>
                        <div
                          className="h-1 rounded-full overflow-hidden mt-2"
                          style={{ background: C.bg }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${requirementPct}%`,
                              background: done ? C.ok : activePath.accent,
                            }}
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setTab(step.tab)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          color: activePath.accent,
                          border: `1px solid ${activePath.accent}35`,
                          background: `${activePath.accent}0E`,
                        }}
                        title="Ouvrir la ressource"
                      >
                        <ExternalLink size={13} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </Panel>
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goPrev}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
              style={{
                color: C.muted,
                background: C.panel,
                border: `1px solid ${C.line}`,
              }}
            >
              <ChevronLeft size={13} /> Module précédent
            </button>
            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold"
              style={{ color: "#fff", background: activePath.accent }}
            >
              Module suivant <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------
   App shell
--------------------------------------------------------------------- */
function WeeklyChallengeCard() {
  const [challenge, setChallenge] = useState(null);
  useEffect(() => {
    let active = true;
    apiRequest("/api/social/weekly-challenge")
      .then((data) => {
        if (active) setChallenge(data.challenge || null);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);
  if (!challenge) return null;
  const remaining = Math.max(
    0,
    new Date(challenge.endsAt).getTime() - Date.now(),
  );
  const days = Math.ceil(remaining / 86400000);
  return (
    <Panel
      className="max-w-7xl mx-auto mb-5 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${C.primary}18, ${C.panel} 46%, ${C.ok}0D)`,
        borderColor: `${C.primary}45`,
      }}
    >
      <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center gap-4">
        <span
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{
            color: C.gold,
            background: `${C.gold}14`,
            border: `1px solid ${C.gold}35`,
          }}
        >
          <Target size={22} />
        </span>
        <div className="min-w-0 flex-1">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ color: C.gold, fontFamily: MONO_FONT }}
          >
            Défi de la semaine · {challenge.category}
          </span>
          <h3
            className="text-base font-bold mt-1"
            style={{ color: C.text, fontFamily: DISPLAY_FONT }}
          >
            {challenge.title}
          </h3>
          <p className="text-xs mt-1 line-clamp-2" style={{ color: C.muted }}>
            {challenge.description}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className="px-2.5 py-1.5 rounded-lg text-[10px]"
            style={{
              color: C.warn,
              background: `${C.warn}12`,
              border: `1px solid ${C.warn}35`,
              fontFamily: MONO_FONT,
            }}
          >
            {challenge.difficulty} · {days} j restant{days > 1 ? "s" : ""}
          </span>
          {challenge.link && (
            <a
              href={challenge.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold"
              style={{ color: "#fff", background: C.primary }}
            >
              Relever le défi <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </Panel>
  );
}

function HubPolls({ currentUser }) {
  const [polls, setPolls] = useState([]);
  const [creating, setCreating] = useState(false);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [error, setError] = useState("");
  useEffect(() => {
    apiRequest("/api/social/polls")
      .then((data) => setPolls(data.polls || []))
      .catch(() => {});
  }, []);
  async function vote(pollId, optionId) {
    if (!currentUser)
      return window.dispatchEvent(new CustomEvent("open-auth-login"));
    try {
      const data = await apiRequest(`/api/social/polls/${pollId}/votes`, {
        method: "POST",
        body: { optionId },
      });
      setPolls((items) =>
        items.map((poll) => (poll.id === pollId ? data.poll : poll)),
      );
    } catch (err) {
      setError(err.message);
    }
  }
  async function createPoll(event) {
    event.preventDefault();
    const cleanOptions = options.map((item) => item.trim()).filter(Boolean);
    if (!question.trim() || cleanOptions.length < 2) return;
    try {
      const data = await apiRequest("/api/social/polls", {
        method: "POST",
        body: {
          question: question.trim(),
          options: cleanOptions,
          room: "general",
        },
      });
      setPolls((items) => [data.poll, ...items]);
      setQuestion("");
      setOptions(["", ""]);
      setCreating(false);
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <Panel
      className="mb-5 p-4"
      style={{ background: `${C.panel}E8`, borderColor: `${C.primary}35` }}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <div>
          <span
            className="text-[10px] uppercase tracking-widest"
            style={{ color: C.primary, fontFamily: MONO_FONT }}
          >
            La voix du Hub
          </span>
          <h3
            className="text-sm font-bold mt-0.5"
            style={{ color: C.text, fontFamily: DISPLAY_FONT }}
          >
            Sondages communautaires
          </h3>
        </div>
        {currentUser && (
          <button
            type="button"
            onClick={() => setCreating((value) => !value)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs"
            style={{
              color: C.text,
              background: C.panel2,
              border: `1px solid ${C.line}`,
            }}
          >
            <Plus size={12} /> Nouveau sondage
          </button>
        )}
      </div>
      {creating && (
        <form
          onSubmit={createPoll}
          className="rounded-xl p-3 mb-3 space-y-2"
          style={{ background: C.panel2, border: `1px solid ${C.line}` }}
        >
          <input
            value={question}
            onChange={(event) => setQuestion(event.target.value.slice(0, 250))}
            placeholder="Ta question…"
            className="w-full px-3 py-2 rounded-lg text-sm"
            style={{ ...inputStyle, background: C.panel }}
          />
          {options.map((option, index) => (
            <input
              key={index}
              value={option}
              onChange={(event) =>
                setOptions((items) =>
                  items.map((item, itemIndex) =>
                    itemIndex === index
                      ? event.target.value.slice(0, 120)
                      : item,
                  ),
                )
              }
              placeholder={`Choix ${index + 1}`}
              className="w-full px-3 py-2 rounded-lg text-xs"
              style={{ ...inputStyle, background: C.panel }}
            />
          ))}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                options.length < 6 && setOptions((items) => [...items, ""])
              }
              className="px-3 py-2 rounded-lg text-xs"
              style={{ color: C.muted, border: `1px solid ${C.line}` }}
            >
              Ajouter un choix
            </button>
            <button
              type="submit"
              className="px-3 py-2 rounded-lg text-xs font-bold"
              style={{ color: "#04120D", background: C.ok }}
            >
              Publier
            </button>
          </div>
        </form>
      )}
      <div className="grid lg:grid-cols-2 gap-3">
        {polls.slice(0, 4).map((poll) => (
          <div
            key={poll.id}
            className="rounded-xl p-3"
            style={{ background: C.panel2, border: `1px solid ${C.line}` }}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-bold" style={{ color: C.text }}>
                {poll.question}
              </p>
              <span
                className="text-[9px] shrink-0"
                style={{ color: C.muted, fontFamily: MONO_FONT }}
              >
                {poll.totalVotes} vote{poll.totalVotes > 1 ? "s" : ""}
              </span>
            </div>
            <div className="space-y-1.5 mt-3">
              {poll.options.map((option) => {
                const pct = poll.totalVotes
                  ? Math.round((option.votes / poll.totalVotes) * 100)
                  : 0;
                const selected = poll.votedOptionId === option.id;
                return (
                  <button
                    type="button"
                    key={option.id}
                    onClick={() => vote(poll.id, option.id)}
                    className="relative w-full overflow-hidden rounded-lg px-3 py-2 text-left text-[11px]"
                    style={{
                      color: selected ? C.ok : C.text,
                      background: C.panel,
                      border: `1px solid ${selected ? `${C.ok}45` : C.line}`,
                    }}
                  >
                    <span
                      className="absolute inset-y-0 left-0"
                      style={{
                        width: `${pct}%`,
                        background: `${selected ? C.ok : C.primary}12`,
                      }}
                    />
                    <span className="relative flex justify-between gap-2">
                      <span>{option.label}</span>
                      <span style={{ color: C.muted, fontFamily: MONO_FONT }}>
                        {pct}%
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {error && (
        <p className="text-xs mt-2" style={{ color: C.alert }}>
          {error}
        </p>
      )}
    </Panel>
  );
}

function DirectMessagesTab({
  currentUser,
  profiles = [],
  initialTarget,
  onTargetHandled,
}) {
  const [conversations, setConversations] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [socialNotifications, setSocialNotifications] = useState([]);
  const [selected, setSelected] = useState(initialTarget || "");
  const [thread, setThread] = useState([]);
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const contacts = profiles
    .filter(
      (profile) =>
        profile.username &&
        profile.username !== currentUser?.username &&
        profile.username.toLowerCase().includes(search.toLowerCase()),
    )
    .slice(0, 12);
  async function refresh() {
    try {
      const [messagesData, invitesData, notificationsData] = await Promise.all([
        apiRequest("/api/social/messages"),
        apiRequest("/api/social/invitations"),
        apiRequest("/api/social/notifications"),
      ]);
      setConversations(messagesData.conversations || []);
      setInvitations(invitesData.invitations || []);
      setSocialNotifications(notificationsData.notifications || []);
    } catch (err) {
      setError(err.message);
    }
  }
  useEffect(() => {
    if (currentUser) refresh();
  }, [currentUser?.id]);
  useEffect(() => {
    if (initialTarget) {
      setSelected(initialTarget);
      onTargetHandled?.();
    }
  }, [initialTarget]);
  useEffect(() => {
    if (!selected) return;
    apiRequest(`/api/social/messages/${encodeURIComponent(selected)}`)
      .then((data) => setThread(data.messages || []))
      .catch((err) => setError(err.message));
  }, [selected]);
  async function send(event) {
    event.preventDefault();
    if (!selected || !draft.trim()) return;
    try {
      const data = await apiRequest(
        `/api/social/messages/${encodeURIComponent(selected)}`,
        { method: "POST", body: { content: draft.trim() } },
      );
      setThread((items) => [...items, data.message]);
      setDraft("");
      refresh();
    } catch (err) {
      setError(err.message);
    }
  }
  async function answer(id, action) {
    try {
      await apiRequest(`/api/social/invitations/${id}`, {
        method: "PATCH",
        body: { action },
      });
      setInvitations((items) =>
        items.map((item) =>
          item.id === id
            ? { ...item, status: action === "accept" ? "accepted" : "declined" }
            : item,
        ),
      );
    } catch (err) {
      setError(err.message);
    }
  }
  if (!currentUser)
    return (
      <GuestGate
        text="Connecte-toi pour utiliser les messages privés."
        accent={C.primary}
      />
    );
  return (
    <div className="max-w-6xl mx-auto">
      <SectionTitle
        eyebrow="Espace privé"
        title="Messages & invitations"
        subtitle="Discute directement avec un membre et gère tes invitations d’équipe."
      />
      <div className="grid lg:grid-cols-[290px_1fr] gap-4">
        <div className="space-y-4">
          <Panel className="p-3">
            <div className="relative mb-3">
              <Search
                size={13}
                className="absolute left-3 top-2.5"
                style={{ color: C.muted }}
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Rechercher un membre"
                className="w-full pl-9 pr-3 py-2 rounded-lg text-xs"
                style={{ ...inputStyle, background: C.panel2 }}
              />
            </div>
            <div className="space-y-1 max-h-72 overflow-y-auto">
              {(search
                ? contacts.map((member) => ({ member }))
                : conversations
              ).map((conversation) => {
                const member = conversation.member;
                return (
                  <button
                    type="button"
                    key={member.id || member.username}
                    onClick={() => setSelected(member.username)}
                    className="w-full flex items-center gap-2.5 p-2 rounded-lg text-left"
                    style={{
                      background:
                        selected === member.username
                          ? `${C.primary}18`
                          : "transparent",
                      border: `1px solid ${selected === member.username ? `${C.primary}40` : "transparent"}`,
                    }}
                  >
                    <Avatar profile={member} size={30} />
                    <span className="min-w-0 flex-1">
                      <span
                        className="block text-xs font-bold truncate"
                        style={{ color: C.text }}
                      >
                        {member.username}
                      </span>
                      <span
                        className="block text-[10px] truncate"
                        style={{ color: C.muted }}
                      >
                        {conversation.lastMessage?.content ||
                          member.profileStatus ||
                          "Commencer une discussion"}
                      </span>
                    </span>
                    {conversation.unread > 0 && (
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
                        style={{ color: "#fff", background: C.alert }}
                      >
                        {conversation.unread}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </Panel>
          <Panel className="p-3">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Megaphone size={13} style={{ color: C.primary }} />
                <span className="text-xs font-bold" style={{ color: C.text }}>
                  Notifications
                </span>
              </div>
              {socialNotifications.some((item) => !item.readAt) && (
                <button
                  type="button"
                  onClick={async () => {
                    await apiRequest("/api/social/notifications/read", {
                      method: "PATCH",
                    });
                    setSocialNotifications((items) =>
                      items.map((item) => ({
                        ...item,
                        readAt: new Date().toISOString(),
                      })),
                    );
                  }}
                  className="text-[9px]"
                  style={{ color: C.primary }}
                >
                  Tout lire
                </button>
              )}
            </div>
            <div className="space-y-1.5 max-h-40 overflow-y-auto">
              {socialNotifications.slice(0, 8).map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg p-2"
                  style={{
                    background: item.readAt ? C.panel2 : `${C.primary}12`,
                    border: `1px solid ${item.readAt ? C.line : `${C.primary}35`}`,
                  }}
                >
                  <p
                    className="text-[10px] font-bold"
                    style={{ color: C.text }}
                  >
                    {item.title}
                  </p>
                  <p className="text-[9px] mt-0.5" style={{ color: C.muted }}>
                    {item.message}
                  </p>
                </div>
              ))}
              {socialNotifications.length === 0 && (
                <p className="text-[11px]" style={{ color: C.muted }}>
                  Aucune notification.
                </p>
              )}
            </div>
          </Panel>
          <Panel className="p-3">
            <div className="flex items-center gap-2 mb-3">
              <Mail size={13} style={{ color: C.warn }} />
              <span className="text-xs font-bold" style={{ color: C.text }}>
                Invitations d’équipe
              </span>
            </div>
            <div className="space-y-2">
              {invitations.filter((item) => item.status === "pending")
                .length === 0 ? (
                <p className="text-[11px]" style={{ color: C.muted }}>
                  Aucune invitation en attente.
                </p>
              ) : (
                invitations
                  .filter((item) => item.status === "pending")
                  .map((invite) => (
                    <div
                      key={invite.id}
                      className="rounded-lg p-2.5"
                      style={{
                        background: C.panel2,
                        border: `1px solid ${C.line}`,
                      }}
                    >
                      <p
                        className="text-xs font-bold"
                        style={{ color: C.text }}
                      >
                        {invite.team.name}
                      </p>
                      <p
                        className="text-[10px] mt-1"
                        style={{ color: C.muted }}
                      >
                        Invitation de {invite.sender.username}
                      </p>
                      <div className="flex gap-1.5 mt-2">
                        <button
                          onClick={() => answer(invite.id, "accept")}
                          className="px-2 py-1 rounded text-[10px] font-bold"
                          style={{ color: "#04120D", background: C.ok }}
                        >
                          Accepter
                        </button>
                        <button
                          onClick={() => answer(invite.id, "decline")}
                          className="px-2 py-1 rounded text-[10px]"
                          style={{
                            color: C.alert,
                            border: `1px solid ${C.alert}45`,
                          }}
                        >
                          Refuser
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </Panel>
        </div>
        <Panel className="flex flex-col overflow-hidden min-h-[560px]">
          <div
            className="px-4 py-3"
            style={{
              borderBottom: `1px solid ${C.line}`,
              background: C.panel2,
            }}
          >
            <span className="text-sm font-bold" style={{ color: C.text }}>
              {selected ? `Conversation avec ${selected}` : "Choisis un membre"}
            </span>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-2">
            {selected && thread.length === 0 && (
              <EmptyState
                text="Aucun message. Lance la conversation."
                icon={<MessageCircle size={20} />}
                accent={C.primary}
              />
            )}
            {thread.map((message) => {
              const mine =
                message.senderId === currentUser.id ||
                message.sender?.username === currentUser.username;
              return (
                <div
                  key={message.id}
                  className={`flex ${mine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[78%] rounded-xl px-3 py-2"
                    style={{
                      color: C.text,
                      background: mine ? `${C.primary}30` : C.panel2,
                      border: `1px solid ${mine ? `${C.primary}45` : C.line}`,
                    }}
                  >
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <span
                      className="block text-[9px] mt-1 text-right"
                      style={{ color: C.muted, fontFamily: MONO_FONT }}
                    >
                      {timeAgo(message.createdAt)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <form
            onSubmit={send}
            className="p-3 flex gap-2"
            style={{ borderTop: `1px solid ${C.line}` }}
          >
            <input
              disabled={!selected}
              value={draft}
              onChange={(event) => setDraft(event.target.value.slice(0, 1000))}
              placeholder={
                selected ? `Écrire à ${selected}…` : "Sélectionne un membre"
              }
              className="flex-1 px-3 py-2.5 rounded-lg text-sm disabled:opacity-50"
              style={{ ...inputStyle, background: C.panel2 }}
            />
            <button
              disabled={!selected || !draft.trim()}
              className="w-10 h-10 rounded-lg flex items-center justify-center disabled:opacity-40"
              style={{ color: "#fff", background: C.primary }}
            >
              <Send size={15} />
            </button>
          </form>
        </Panel>
      </div>
      {error && (
        <p className="text-xs mt-3" style={{ color: C.alert }}>
          {error}
        </p>
      )}
    </div>
  );
}

function TeamFinderTab({ currentUser, teams = [], onMessage }) {
  const [profiles, setProfiles] = useState([]);
  const [scoreboard, setScoreboard] = useState([]);
  const [editing, setEditing] = useState(false);
  const [filter, setFilter] = useState("Toutes");
  const [form, setForm] = useState({
    age: "",
    experience: "debutant",
    bio: "",
    specialties: [],
    lookingFor: ["Web"],
    availability: "",
    contactPreference: "message",
    active: true,
  });
  const [status, setStatus] = useState("");
  const ownedTeams = teams.filter(
    (team) =>
      team.owner === currentUser?.username ||
      Number(team.ownerId) === Number(currentUser?.id),
  );
  async function load() {
    try {
      const [finder, scores] = await Promise.all([
        apiRequest("/api/social/team-finder"),
        apiRequest("/api/social/team-scores"),
      ]);
      const safeProfiles = (
        Array.isArray(finder?.profiles) ? finder.profiles : []
      )
        .filter((item) => item && item.user)
        .map((item) => ({
          ...item,
          specialties: Array.isArray(item.specialties) ? item.specialties : [],
          lookingFor: Array.isArray(item.lookingFor) ? item.lookingFor : [],
        }));
      const safeScoreboard = (
        Array.isArray(scores?.scoreboard) ? scores.scoreboard : []
      ).map((team) => ({
        ...team,
        points: Number(team?.points || 0),
        participations: Number(team?.participations || 0),
        podiums: Number(team?.podiums || 0),
        wins: Number(team?.wins || 0),
        bestPlayers: Array.isArray(team?.bestPlayers) ? team.bestPlayers : [],
      }));
      setProfiles(safeProfiles);
      setScoreboard(safeScoreboard);
      const mine = safeProfiles.find(
        (item) =>
          item.userId === currentUser?.id ||
          item.user?.username === currentUser?.username,
      );
      if (mine) setForm({ ...mine, age: mine.age || "" });
    } catch (error) {
      setStatus(error.message);
    }
  }
  useEffect(() => {
    load();
  }, [currentUser?.id]);
  const toggle = (field, skill) =>
    setForm((current) => ({
      ...current,
      [field]: (Array.isArray(current[field]) ? current[field] : []).includes(
        skill,
      )
        ? current[field].filter((item) => item !== skill)
        : [...(Array.isArray(current[field]) ? current[field] : []), skill],
    }));
  async function save(event) {
    event.preventDefault();
    try {
      await apiRequest("/api/social/team-finder/me", {
        method: "PUT",
        body: { ...form, age: form.age ? Number(form.age) : null },
      });
      setStatus("Ton profil de recherche est publié.");
      setEditing(false);
      load();
    } catch (error) {
      setStatus(error.message);
    }
  }
  async function invite(username) {
    if (!ownedTeams.length)
      return setStatus("Crée d’abord une team pour envoyer une invitation.");
    try {
      await apiRequest("/api/social/invitations", {
        method: "POST",
        body: {
          teamId: ownedTeams[0].id,
          username,
          message: "Ton profil correspond à notre équipe CTF.",
        },
      });
      setStatus(`Invitation envoyée à ${username} pour ${ownedTeams[0].name}.`);
    } catch (error) {
      setStatus(error.message);
    }
  }
  const filtered = profiles.filter(
    (profile) =>
      filter === "Toutes" ||
      (profile.specialties || []).includes(filter) ||
      (profile.lookingFor || []).includes(filter),
  );
  return (
    <div className="max-w-7xl mx-auto gowl-community-view gowl-view-finder">
      <SectionHeader
        icon={<Search size={19} />}
        eyebrow="Matchmaking CTF"
        title="Trouver des coéquipiers"
        subtitle="Publie ton mini-CV cyber, précise tes forces et les compétences recherchées."
        accent={C.ok}
      />
      <div className="flex flex-wrap gap-2 mb-5">
        {["Toutes", "Web", "Réseau", "Crypto", "Pwn", "Forensics"].map(
          (skill) => (
            <button
              key={skill}
              onClick={() => setFilter(skill)}
              className="px-3 py-1.5 rounded-lg text-xs"
              style={{
                color: filter === skill ? C.ok : C.muted,
                background: filter === skill ? `${C.ok}12` : C.panel,
                border: `1px solid ${filter === skill ? `${C.ok}45` : C.line}`,
              }}
            >
              {skill}
            </button>
          ),
        )}
        {currentUser && (
          <button
            onClick={() => setEditing((value) => !value)}
            className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{ color: "#fff", background: C.primary }}
          >
            <FileText size={12} /> {editing ? "Fermer" : "Mon CV CTF"}
          </button>
        )}
      </div>
      {editing && (
        <Panel className="p-4 mb-5 gowl-community-card">
          <form onSubmit={save} className="grid lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  min="13"
                  max="100"
                  value={form.age}
                  onChange={(event) =>
                    setForm({ ...form, age: event.target.value })
                  }
                  placeholder="Âge"
                  className="px-3 py-2 rounded-lg text-sm"
                  style={{ ...inputStyle, background: C.panel2 }}
                />
                <select
                  value={form.experience}
                  onChange={(event) =>
                    setForm({ ...form, experience: event.target.value })
                  }
                  className="px-3 py-2 rounded-lg text-sm"
                  style={{ ...inputStyle, background: C.panel2 }}
                >
                  <option value="debutant">Débutant</option>
                  <option value="intermediaire">Intermédiaire</option>
                  <option value="avance">Avancé</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
              <textarea
                value={form.bio}
                onChange={(event) =>
                  setForm({ ...form, bio: event.target.value.slice(0, 600) })
                }
                placeholder="Ton expérience, tes objectifs et ta façon de jouer…"
                rows={4}
                className="w-full px-3 py-2 rounded-lg text-sm resize-none"
                style={{ ...inputStyle, background: C.panel2 }}
              />
              <input
                value={form.availability}
                onChange={(event) =>
                  setForm({
                    ...form,
                    availability: event.target.value.slice(0, 120),
                  })
                }
                placeholder="Disponibilités : soirs, week-ends…"
                className="w-full px-3 py-2 rounded-lg text-sm"
                style={{ ...inputStyle, background: C.panel2 }}
              />
            </div>
            <div className="space-y-3">
              <div>
                <span
                  className="text-[10px] uppercase"
                  style={{ color: C.muted, fontFamily: MONO_FONT }}
                >
                  Mes spécialités
                </span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {PROFILE_SPECIALTIES.map((skill) => (
                    <button
                      type="button"
                      key={skill}
                      onClick={() => toggle("specialties", skill)}
                      className="px-2 py-1 rounded text-[10px]"
                      style={{
                        color: form.specialties.includes(skill)
                          ? C.ok
                          : C.muted,
                        border: `1px solid ${form.specialties.includes(skill) ? `${C.ok}45` : C.line}`,
                      }}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span
                  className="text-[10px] uppercase"
                  style={{ color: C.muted, fontFamily: MONO_FONT }}
                >
                  Compétences recherchées
                </span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {PROFILE_SPECIALTIES.map((skill) => (
                    <button
                      type="button"
                      key={skill}
                      onClick={() => toggle("lookingFor", skill)}
                      className="px-2 py-1 rounded text-[10px]"
                      style={{
                        color: form.lookingFor.includes(skill)
                          ? C.warn
                          : C.muted,
                        border: `1px solid ${form.lookingFor.includes(skill) ? `${C.warn}45` : C.line}`,
                      }}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
              <button
                className="w-full px-4 py-2.5 rounded-lg text-sm font-bold"
                style={{ color: "#04120D", background: C.ok }}
              >
                Publier mon profil
              </button>
            </div>
          </form>
        </Panel>
      )}
      <div className="grid lg:grid-cols-[1fr_340px] gap-5">
        <div className="grid md:grid-cols-2 gap-3">
          {filtered.map((profile) => (
            <Panel
              key={profile.id}
              className="p-4 gowl-community-card gowl-glass"
            >
              <div className="flex items-center gap-3">
                <Avatar profile={profile.user} size={42} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-sm font-bold truncate"
                      style={{ color: C.text }}
                    >
                      {profile.user.username}
                    </span>
                    {profile.user.customRole && (
                      <span className="text-[8px]" style={{ color: C.gold }}>
                        {profile.user.customRole}
                      </span>
                    )}
                  </div>
                  <span
                    className="text-[10px]"
                    style={{ color: C.muted, fontFamily: MONO_FONT }}
                  >
                    {profile.age ? `${profile.age} ans · ` : ""}
                    {profile.experience} ·{" "}
                    {profile.availability || "disponibilités à préciser"}
                  </span>
                </div>
              </div>
              <p
                className="text-xs leading-relaxed mt-3 line-clamp-3"
                style={{ color: C.muted }}
              >
                {profile.bio}
              </p>
              <div className="mt-3">
                <span
                  className="text-[9px] uppercase"
                  style={{ color: C.muted, fontFamily: MONO_FONT }}
                >
                  Spécialités
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {(profile.specialties || []).map((skill) => (
                    <span
                      key={skill}
                      className="px-1.5 py-0.5 rounded text-[9px]"
                      style={{ color: C.ok, background: `${C.ok}10` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-3">
                <span
                  className="text-[9px] uppercase"
                  style={{ color: C.muted, fontFamily: MONO_FONT }}
                >
                  Recherche
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {(profile.lookingFor || []).map((skill) => (
                    <span
                      key={skill}
                      className="px-1.5 py-0.5 rounded text-[9px]"
                      style={{ color: C.warn, background: `${C.warn}10` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              {profile.user.username !== currentUser?.username && (
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => onMessage?.(profile.user.username)}
                    className="flex-1 px-3 py-2 rounded-lg text-xs font-bold"
                    style={{ color: "#fff", background: C.primary }}
                  >
                    Écrire
                  </button>
                  <button
                    onClick={() => invite(profile.user.username)}
                    className="flex-1 px-3 py-2 rounded-lg text-xs"
                    style={{ color: C.ok, border: `1px solid ${C.ok}45` }}
                  >
                    Inviter
                  </button>
                </div>
              )}
            </Panel>
          ))}
        </div>
        <Panel className="p-4 h-fit lg:sticky lg:top-24 gowl-community-card">
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={14} style={{ color: C.gold }} />
            <h3 className="text-sm font-bold" style={{ color: C.text }}>
              Score des teams
            </h3>
          </div>
          <div className="space-y-2">
            {scoreboard.slice(0, 10).map((team, index) => (
              <div
                key={team.id}
                className="rounded-lg p-2.5"
                style={{
                  background: C.panel2,
                  border: `1px solid ${index < 3 ? `${C.gold}35` : C.line}`,
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-5 text-[10px] font-bold"
                    style={{
                      color: index < 3 ? C.gold : C.muted,
                      fontFamily: MONO_FONT,
                    }}
                  >
                    #{index + 1}
                  </span>
                  <TeamLogo team={team} size={28} />
                  <span
                    className="text-xs font-bold flex-1 truncate"
                    style={{ color: C.text }}
                  >
                    {team.name}
                  </span>
                  <span className="text-xs font-bold" style={{ color: C.ok }}>
                    {team.points} pts
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1 mt-2 text-center">
                  <span className="text-[9px]" style={{ color: C.muted }}>
                    {team.participations} CTF
                  </span>
                  <span className="text-[9px]" style={{ color: C.muted }}>
                    {team.podiums} podiums
                  </span>
                  <span className="text-[9px]" style={{ color: C.muted }}>
                    {team.wins} victoires
                  </span>
                </div>
                {(team.bestPlayers || []).length > 0 && (
                  <p className="text-[9px] mt-2" style={{ color: C.gold }}>
                    MVP : {team.bestPlayers.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Panel>
      </div>
      {status && (
        <p
          className="text-xs mt-4"
          style={{
            color:
              status.includes("envoy") || status.includes("publié")
                ? C.ok
                : C.muted,
          }}
        >
          {status}
        </p>
      )}
    </div>
  );
}

function SocialAdminPanel({ profiles = [], setProfiles, teams = [] }) {
  const [reports, setReports] = useState([]);
  const [challenge, setChallenge] = useState({
    title: "",
    description: "",
    category: "Web",
    difficulty: "Intermédiaire",
    link: "",
    endsAt: "",
  });
  const [score, setScore] = useState({
    teamId: "",
    eventId: "",
    eventTitle: "",
    rank: 1,
    points: 0,
    bestPlayer: "",
    highlight: "",
  });
  const [feedback, setFeedback] = useState("");
  useEffect(() => {
    apiRequest("/api/social/reports")
      .then((data) => setReports(data.reports || []))
      .catch(() => {});
  }, []);
  async function setRole(profile, customRole) {
    try {
      const data = await apiRequest(
        `/api/social/users/${profile.id}/custom-role`,
        { method: "PATCH", body: { customRole } },
      );
      setProfiles?.((items) =>
        items.map((item) =>
          item.id === data.user.id ? { ...item, ...data.user } : item,
        ),
      );
      setFeedback(`Rôle de ${profile.username} mis à jour.`);
    } catch (error) {
      setFeedback(error.message);
    }
  }
  async function resolve(id, status) {
    try {
      await apiRequest(`/api/social/reports/${id}`, {
        method: "PATCH",
        body: { status },
      });
      setReports((items) =>
        items.map((item) => (item.id === id ? { ...item, status } : item)),
      );
    } catch (error) {
      setFeedback(error.message);
    }
  }
  async function publishChallenge(event) {
    event.preventDefault();
    try {
      await apiRequest("/api/social/weekly-challenge", {
        method: "POST",
        body: {
          ...challenge,
          endsAt: new Date(challenge.endsAt).toISOString(),
        },
      });
      setFeedback("Défi de la semaine publié.");
    } catch (error) {
      setFeedback(error.message);
    }
  }
  async function publishScore(event) {
    event.preventDefault();
    try {
      await apiRequest("/api/social/team-scores", {
        method: "POST",
        body: {
          ...score,
          teamId: Number(score.teamId),
          rank: Number(score.rank),
          points: Number(score.points),
        },
      });
      setFeedback("Résultat d’équipe enregistré.");
    } catch (error) {
      setFeedback(error.message);
    }
  }
  return (
    <div className="max-w-7xl mx-auto mt-6">
      <SectionTitle
        eyebrow="Administration sociale"
        title="Communauté, rôles et compétition"
        subtitle="Modération, rôles personnalisés, défi hebdomadaire et résultats des teams."
      />
      <div className="grid xl:grid-cols-2 gap-4">
        <Panel className="p-4">
          <h3 className="text-sm font-bold mb-3" style={{ color: C.text }}>
            Rôles personnalisés
          </h3>
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="flex items-center gap-2 p-2 rounded-lg"
                style={{ background: C.panel2 }}
              >
                <Avatar profile={profile} size={26} />
                <span
                  className="text-xs flex-1 truncate"
                  style={{ color: C.text }}
                >
                  {profile.username}
                </span>
                <select
                  defaultValue={profile.customRole || ""}
                  onChange={(event) => setRole(profile, event.target.value)}
                  className="px-2 py-1.5 rounded text-[10px]"
                  style={{ ...inputStyle, background: C.panel }}
                >
                  {CUSTOM_ROLES.map((role) => (
                    <option value={role} key={role || "member"}>
                      {role || "Membre"}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </Panel>
        <Panel className="p-4">
          <h3 className="text-sm font-bold mb-3" style={{ color: C.text }}>
            Signalements
          </h3>
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {reports.filter((report) => report.status === "open").length ===
            0 ? (
              <p className="text-xs" style={{ color: C.muted }}>
                Aucun signalement ouvert.
              </p>
            ) : (
              reports
                .filter((report) => report.status === "open")
                .map((report) => (
                  <div
                    key={report.id}
                    className="rounded-lg p-3"
                    style={{
                      background: C.panel2,
                      border: `1px solid ${C.line}`,
                    }}
                  >
                    <div className="flex justify-between gap-2">
                      <span
                        className="text-xs font-bold"
                        style={{ color: C.text }}
                      >
                        {report.targetType} · {report.targetId}
                      </span>
                      <span className="text-[9px]" style={{ color: C.muted }}>
                        {report.reporter.username}
                      </span>
                    </div>
                    <p className="text-[11px] mt-1" style={{ color: C.muted }}>
                      {report.reason}
                      {report.details ? ` — ${report.details}` : ""}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => resolve(report.id, "resolved")}
                        className="px-2 py-1 rounded text-[10px]"
                        style={{ color: C.ok, border: `1px solid ${C.ok}45` }}
                      >
                        Traité
                      </button>
                      <button
                        onClick={() => resolve(report.id, "dismissed")}
                        className="px-2 py-1 rounded text-[10px]"
                        style={{
                          color: C.muted,
                          border: `1px solid ${C.line}`,
                        }}
                      >
                        Ignorer
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </Panel>
        <Panel className="p-4">
          <h3 className="text-sm font-bold mb-3" style={{ color: C.text }}>
            Défi de la semaine
          </h3>
          <form onSubmit={publishChallenge} className="space-y-2">
            <input
              required
              value={challenge.title}
              onChange={(event) =>
                setChallenge({ ...challenge, title: event.target.value })
              }
              placeholder="Titre"
              className="w-full px-3 py-2 rounded-lg text-xs"
              style={{ ...inputStyle, background: C.panel2 }}
            />
            <textarea
              required
              value={challenge.description}
              onChange={(event) =>
                setChallenge({ ...challenge, description: event.target.value })
              }
              placeholder="Description"
              className="w-full px-3 py-2 rounded-lg text-xs"
              style={{ ...inputStyle, background: C.panel2 }}
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                value={challenge.category}
                onChange={(event) =>
                  setChallenge({ ...challenge, category: event.target.value })
                }
                placeholder="Catégorie"
                className="px-3 py-2 rounded-lg text-xs"
                style={{ ...inputStyle, background: C.panel2 }}
              />
              <input
                value={challenge.difficulty}
                onChange={(event) =>
                  setChallenge({ ...challenge, difficulty: event.target.value })
                }
                placeholder="Difficulté"
                className="px-3 py-2 rounded-lg text-xs"
                style={{ ...inputStyle, background: C.panel2 }}
              />
            </div>
            <input
              type="datetime-local"
              required
              value={challenge.endsAt}
              onChange={(event) =>
                setChallenge({ ...challenge, endsAt: event.target.value })
              }
              className="w-full px-3 py-2 rounded-lg text-xs"
              style={{ ...inputStyle, background: C.panel2 }}
            />
            <input
              value={challenge.link}
              onChange={(event) =>
                setChallenge({ ...challenge, link: event.target.value })
              }
              placeholder="Lien https://…"
              className="w-full px-3 py-2 rounded-lg text-xs"
              style={{ ...inputStyle, background: C.panel2 }}
            />
            <button
              className="w-full px-3 py-2 rounded-lg text-xs font-bold"
              style={{ color: "#fff", background: C.primary }}
            >
              Publier le défi
            </button>
          </form>
        </Panel>
        <Panel className="p-4">
          <h3 className="text-sm font-bold mb-3" style={{ color: C.text }}>
            Résultat d’une team
          </h3>
          <form onSubmit={publishScore} className="space-y-2">
            <select
              required
              value={score.teamId}
              onChange={(event) =>
                setScore({ ...score, teamId: event.target.value })
              }
              className="w-full px-3 py-2 rounded-lg text-xs"
              style={{ ...inputStyle, background: C.panel2 }}
            >
              <option value="">Choisir une team</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
            <div className="grid grid-cols-2 gap-2">
              <input
                required
                value={score.eventId}
                onChange={(event) =>
                  setScore({ ...score, eventId: event.target.value })
                }
                placeholder="ID du CTF"
                className="px-3 py-2 rounded-lg text-xs"
                style={{ ...inputStyle, background: C.panel2 }}
              />
              <input
                required
                value={score.eventTitle}
                onChange={(event) =>
                  setScore({ ...score, eventTitle: event.target.value })
                }
                placeholder="Nom du CTF"
                className="px-3 py-2 rounded-lg text-xs"
                style={{ ...inputStyle, background: C.panel2 }}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                min="1"
                value={score.rank}
                onChange={(event) =>
                  setScore({ ...score, rank: event.target.value })
                }
                placeholder="Classement"
                className="px-3 py-2 rounded-lg text-xs"
                style={{ ...inputStyle, background: C.panel2 }}
              />
              <input
                type="number"
                min="0"
                value={score.points}
                onChange={(event) =>
                  setScore({ ...score, points: event.target.value })
                }
                placeholder="Points"
                className="px-3 py-2 rounded-lg text-xs"
                style={{ ...inputStyle, background: C.panel2 }}
              />
            </div>
            <input
              value={score.bestPlayer}
              onChange={(event) =>
                setScore({ ...score, bestPlayer: event.target.value })
              }
              placeholder="Meilleur joueur"
              className="w-full px-3 py-2 rounded-lg text-xs"
              style={{ ...inputStyle, background: C.panel2 }}
            />
            <input
              value={score.highlight}
              onChange={(event) =>
                setScore({ ...score, highlight: event.target.value })
              }
              placeholder="Meilleur moment"
              className="w-full px-3 py-2 rounded-lg text-xs"
              style={{ ...inputStyle, background: C.panel2 }}
            />
            <button
              className="w-full px-3 py-2 rounded-lg text-xs font-bold"
              style={{ color: "#04120D", background: C.ok }}
            >
              Enregistrer le résultat
            </button>
          </form>
        </Panel>
      </div>
      {feedback && (
        <p className="text-xs mt-3" style={{ color: C.muted }}>
          {feedback}
        </p>
      )}
    </div>
  );
}

function LegalInformationPage({ type, setTab }) {
  const updatedAt = "22 juillet 2026";
  const page = {
    terms: {
      eyebrow: "Règles de la communauté",
      title: "Conditions d’utilisation",
      intro:
        "Ces conditions encadrent l’accès à GowlSec, plateforme communautaire consacrée à l’apprentissage légal de la cybersécurité, aux CTF et au partage de connaissances.",
      sections: [
        [
          "1. Objet et acceptation",
          "L’utilisation de GowlSec implique l’acceptation des présentes conditions. Si tu n’es pas d’accord avec elles, tu dois cesser d’utiliser le service. Certaines fonctions nécessitent la création d’un compte.",
        ],
        [
          "2. Compte membre",
          "Tu dois fournir des informations exactes, protéger tes identifiants et signaler rapidement toute utilisation non autorisée. Tu es responsable des activités effectuées depuis ton compte. Un compte ne doit pas être cédé, partagé ou utilisé pour usurper l’identité d’un tiers.",
        ],
        [
          "3. Cybersécurité légale uniquement",
          "Les contenus et échanges sont destinés à la formation, aux CTF, aux labs autorisés et aux audits réalisés avec une permission explicite. Sont interdits : l’accès non autorisé à un système, le vol ou la diffusion de données, le harcèlement, le doxxing, les malwares destinés à nuire, les menaces, la fraude et toute aide facilitant une infraction réelle.",
        ],
        [
          "4. Contenus publiés",
          "Tu conserves tes droits sur tes messages, profils, write-ups et fichiers. Tu accordes toutefois à GowlSec une autorisation non exclusive de les afficher, les stocker et les modérer pour faire fonctionner le service. Ne publie pas de secrets, données personnelles de tiers, solutions interdites par un règlement de CTF ou contenus protégés sans autorisation.",
        ],
        [
          "5. Modération",
          "Les membres peuvent signaler un message ou un profil. GowlSec peut masquer un contenu, limiter un compte, retirer un rôle ou suspendre un membre afin de protéger la communauté et la plateforme. Les décisions tiennent compte de la gravité, du contexte et des récidives. Une contestation peut être envoyée à GowlSec@proton.me.",
        ],
        [
          "6. Équipes, CTF et services externes",
          "Les inscriptions, invitations et classements communautaires n’engagent pas les organisateurs externes. Les horaires et liens CTFtime peuvent changer : vérifie toujours la page officielle du CTF. Les services tiers restent soumis à leurs propres conditions.",
        ],
        [
          "7. Disponibilité et responsabilité",
          "GowlSec s’efforce de maintenir un service fiable mais ne garantit pas une disponibilité continue ni l’absence d’erreurs. Les ressources sont pédagogiques et ne constituent pas un conseil juridique, professionnel ou une autorisation d’audit. Chaque membre doit vérifier la légalité et le périmètre de ses actions.",
        ],
        [
          "8. Propriété intellectuelle",
          "La marque, l’interface, les éléments graphiques et les contenus produits par GowlSec ne peuvent pas être reproduits ou exploités commercialement sans autorisation. Les marques et contenus de tiers restent la propriété de leurs titulaires.",
        ],
        [
          "9. Suspension, suppression et évolution",
          "Tu peux demander la suppression de ton compte. GowlSec peut suspendre un compte en cas de violation, risque de sécurité ou obligation légale. Les conditions peuvent évoluer ; la date de mise à jour sera indiquée et une information supplémentaire pourra être affichée en cas de changement important.",
        ],
        [
          "10. Droit applicable et contact",
          "Les présentes conditions sont soumises au droit français, sous réserve des règles impératives applicables. Pour toute question : GowlSec@proton.me.",
        ],
      ],
    },
    legal: {
      eyebrow: "Transparence",
      title: "Mentions légales",
      intro:
        "Informations relatives à l’éditeur et à l’exploitation technique du site GowlSec.",
      warning:
        "Les éléments entre crochets doivent être complétés par le propriétaire avant la mise en production. Ils ne peuvent pas être devinés à partir du code du site.",
      sections: [
        [
          "Éditeur du site",
          "GowlSec — projet communautaire de cybersécurité. Statut juridique : [À COMPLÉTER : particulier, association, micro-entreprise ou société]. Nom ou raison sociale : [À COMPLÉTER]. Adresse : [À COMPLÉTER]. Numéro SIREN/RNA le cas échéant : [À COMPLÉTER]. Contact : GowlSec@proton.me.",
        ],
        [
          "Direction de la publication",
          "Directeur ou directrice de la publication : [NOM ET PRÉNOM À COMPLÉTER].",
        ],
        [
          "Hébergement",
          "Hébergeur du site public : [À COMPLÉTER selon le déploiement réellement utilisé : nom, raison sociale, adresse et téléphone]. L’API est actuellement destinée à être déployée sur Railway et la base de données sur Neon ; ces prestataires techniques sont également décrits dans la politique de confidentialité.",
        ],
        [
          "Conception et contact",
          "Conception et développement : équipe GowlSec. Pour signaler un problème technique, un contenu illicite ou exercer un droit : GowlSec@proton.me.",
        ],
        [
          "Propriété intellectuelle",
          "Sauf indication contraire, la structure du site, son identité visuelle et les contenus créés par GowlSec sont protégés. Toute reproduction substantielle nécessite une autorisation préalable. Les noms, logos, CTF, plateformes et ressources externes appartiennent à leurs propriétaires respectifs.",
        ],
        [
          "Responsabilité",
          "GowlSec propose un espace pédagogique. Les informations publiées par les membres peuvent comporter des erreurs et ne valent pas autorisation d’intervenir sur un système. Les liens externes sont fournis à titre pratique ; GowlSec ne contrôle pas leur disponibilité ni leur contenu.",
        ],
        [
          "Signalement",
          "Un contenu manifestement illicite, une atteinte à un droit ou une vulnérabilité du service peut être signalé via les boutons de modération ou à GowlSec@proton.me, avec l’URL ou l’identifiant concerné et une explication précise.",
        ],
      ],
    },
    privacy: {
      eyebrow: "Tes données",
      title: "Politique de confidentialité",
      intro:
        "Cette politique explique quelles données GowlSec traite, pourquoi elles sont utilisées et comment exercer tes droits.",
      sections: [
        [
          "1. Responsable du traitement",
          "Le responsable du traitement est [IDENTITÉ OU RAISON SOCIALE À COMPLÉTER], exploitant GowlSec. Contact vie privée : GowlSec@proton.me. Aucun délégué à la protection des données n’est désigné à ce jour.",
        ],
        [
          "2. Données traitées",
          "Compte : nom d’utilisateur, adresse e-mail, mot de passe haché, rôle, dates de création et jetons de sécurité. Profil : biographie, avatar, bannière, âge facultatif, réseaux, spécialités, statut, badges et réglages de visibilité. Communauté : messages publics ou privés, équipes, invitations, sondages, réponses, write-ups, trophées, participations CTF, recommandations et signalements. Technique : journaux de connexion, adresse IP, navigateur, erreurs et données nécessaires à la sécurité.",
        ],
        [
          "3. Finalités et bases légales",
          "Exécution du service : créer le compte, authentifier le membre, afficher son profil et fournir les fonctions communautaires. Intérêt légitime : sécuriser GowlSec, prévenir les abus, modérer, diagnostiquer les erreurs et mesurer le fonctionnement technique. Consentement : éléments facultatifs du profil et éventuels traceurs non essentiels. Obligation légale : répondre à une demande valable d’une autorité ou conserver les éléments nécessaires à un litige.",
        ],
        [
          "4. Visibilité et destinataires",
          "Les informations rendues publiques selon tes réglages sont visibles par les membres ou visiteurs. Les messages privés sont accessibles à leurs participants et peuvent être consultés de façon limitée par les personnes habilitées uniquement lorsqu’un signalement, un incident de sécurité ou une obligation légale le justifie. Les administrateurs accèdent aux outils nécessaires à la modération.",
        ],
        [
          "5. Prestataires",
          "GowlSec peut utiliser Vercel pour le frontend, Railway pour l’API, Neon pour PostgreSQL, Cloudinary pour les images, Resend pour les e-mails et CTFtime pour les informations d’événements. Seules les données nécessaires leur sont transmises. Certains prestataires peuvent traiter des données hors de l’Espace économique européen avec les garanties prévues par leurs contrats et la réglementation.",
        ],
        [
          "6. Durées de conservation",
          "Les données du compte et les contenus restent conservés pendant la vie du compte. Après une demande de suppression, les données actives doivent être effacées ou anonymisées dans les meilleurs délais ; des sauvegardes résiduelles peuvent subsister jusqu’à 30 jours. Les journaux de sécurité sont conservés au maximum 12 mois, les tickets de support jusqu’à 3 ans après clôture et les signalements jusqu’à 1 an après leur résolution, sauf obligation ou litige imposant une durée différente.",
        ],
        [
          "7. Tes choix de profil",
          "Tu peux rendre ton profil privé, masquer ton âge ou tes réseaux et choisir les badges affichés. Attention : un contenu publié dans un salon, un classement, une team ou un write-up peut rester visible indépendamment de la confidentialité de la fiche profil.",
        ],
        [
          "8. Cookies et stockage local",
          "GowlSec utilise des mécanismes strictement nécessaires à la session, à l’authentification, à la langue et aux préférences. Aucun cookie publicitaire n’est prévu. Si un outil de mesure d’audience ou un traceur non essentiel est ajouté, il devra être présenté dans un module de consentement permettant d’accepter ou de refuser aussi facilement.",
        ],
        [
          "9. Sécurité",
          "Les mots de passe sont hachés, les accès API sont authentifiés et les images sont contrôlées en format et en taille. Aucun système n’étant infaillible, signale immédiatement une activité suspecte ou une vulnérabilité à GowlSec@proton.me sans exploiter davantage le problème.",
        ],
        [
          "10. Tes droits",
          "Selon le RGPD, tu peux demander l’accès, la rectification, l’effacement, la limitation, l’opposition et, lorsque cela s’applique, la portabilité de tes données ou le retrait de ton consentement. Écris à GowlSec@proton.me en précisant ta demande et ton nom d’utilisateur. Une preuve d’identité peut être demandée uniquement si nécessaire. Tu peux également saisir la CNIL sur cnil.fr.",
        ],
        [
          "11. Mineurs et modifications",
          "Le service n’est pas destiné aux enfants de moins de 13 ans. Pour un mineur, l’utilisation doit respecter les règles applicables au consentement numérique et l’autorité parentale. Toute modification importante de cette politique sera signalée sur le site.",
        ],
      ],
    },
  }[type];

  if (!page) return null;
  return (
    <div className="max-w-4xl mx-auto">
      <button
        type="button"
        onClick={() => setTab("accueil")}
        className="inline-flex items-center gap-2 mb-5 text-xs"
        style={{ color: C.muted }}
      >
        <ChevronLeft size={13} /> Retour à l’accueil
      </button>
      <Panel
        className="overflow-hidden"
        style={{ borderColor: `${C.primary}35` }}
      >
        <div
          className="p-6 sm:p-8"
          style={{
            background: `linear-gradient(135deg, ${C.primary}18, ${C.panel} 55%)`,
            borderBottom: `1px solid ${C.line}`,
          }}
        >
          <span
            className="text-[10px] uppercase tracking-[0.2em]"
            style={{ color: C.primary, fontFamily: MONO_FONT }}
          >
            {page.eyebrow}
          </span>
          <h1
            className="text-2xl sm:text-3xl font-extrabold mt-2"
            style={{ color: C.text, fontFamily: DISPLAY_FONT }}
          >
            {page.title}
          </h1>
          <p
            className="text-sm leading-relaxed mt-3 max-w-2xl"
            style={{ color: C.muted }}
          >
            {page.intro}
          </p>
          <p
            className="text-[10px] mt-4"
            style={{ color: C.muted, fontFamily: MONO_FONT }}
          >
            Dernière mise à jour : {updatedAt}
          </p>
        </div>
        <div className="p-5 sm:p-8">
          {page.warning && (
            <div
              className="rounded-xl p-4 mb-6 flex items-start gap-3"
              style={{
                color: C.warn,
                background: `${C.warn}10`,
                border: `1px solid ${C.warn}35`,
              }}
            >
              <AlertTriangle size={16} className="shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed">{page.warning}</p>
            </div>
          )}
          <div className="space-y-6">
            {page.sections.map(([title, content]) => (
              <section key={title}>
                <h2
                  className="text-sm font-bold mb-2"
                  style={{ color: C.text, fontFamily: DISPLAY_FONT }}
                >
                  {title}
                </h2>
                <p
                  className="text-sm leading-7"
                  style={{ color: C.muted, fontFamily: BODY_FONT }}
                >
                  {content}
                </p>
              </section>
            ))}
          </div>
          <div
            className="rounded-xl p-4 mt-7"
            style={{ background: C.panel2, border: `1px solid ${C.line}` }}
          >
            <p className="text-xs" style={{ color: C.muted }}>
              Question ou demande liée à ces informations ?{" "}
              <a href="mailto:GowlSec@proton.me" style={{ color: C.primary }}>
                GowlSec@proton.me
              </a>
            </p>
          </div>
        </div>
      </Panel>
    </div>
  );
}

const TABS = [
  { key: "accueil", label: "Accueil", icon: Compass, primary: true },
  { key: "actus", label: "CTFNews", icon: Flag, primary: true },
  { key: "evenements", label: "Événements", icon: Calendar, primary: true },
  { key: "parcours", label: "Parcours", icon: MapPin, primary: true },
  { key: "salons", label: "Hub", icon: Hash, primary: true },
  { key: "messages", label: "Messages", icon: Mail, primary: true },
  { key: "assistant", label: "Assistant IA", icon: Bot, primary: true },
  { key: "forum", label: "Question", icon: MessageSquare },
  { key: "equipes", label: "Team", icon: Users },
  { key: "coequipiers", label: "Coéquipiers", icon: Search },
  { key: "labs", label: "Labs", icon: FlaskConical },
  { key: "classement", label: "Classement", icon: TrendingUp },
  { key: "trophies", label: "Trophées", icon: CyberTrophyIcon },
  { key: "writeups", label: "Write-ups", icon: BookOpen },
  { key: "boutique", label: "Boutique", icon: ShoppingCart },
  { key: "support", label: "Support", icon: MessageCircle },
  { key: "admin", label: "Admin", icon: Cpu },
];

/* ---------------------------------------------------------------------
   Page d'action e-mail — écran plein cadre réutilisé pour la vérification
   d'adresse et la réinitialisation de mot de passe : logo, halo animé
   selon le statut (neutre / succès / erreur), carte centrée.
--------------------------------------------------------------------- */
function AuthActionPage({
  accent = C.primary,
  icon,
  title,
  subtitle,
  complete = false,
  children,
}) {
  return (
    <div
      className="gowl-auth-world min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ "--auth-accent": accent, fontFamily: BODY_FONT }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Source+Sans+3:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        @keyframes gowl-auth-in { from { opacity: 0; transform: translateY(14px) scale(.985); } to { opacity: 1; transform: none; } }
        @keyframes gowl-auth-pulse { 0%,100% { box-shadow: 0 0 0 0 color-mix(in srgb,var(--auth-accent) 28%,transparent),0 16px 34px -20px var(--auth-accent); } 50% { box-shadow: 0 0 0 12px transparent,0 20px 42px -18px var(--auth-accent); } }
        @keyframes gowl-auth-shoot { 0%,72% { transform: translate(-35vw,-16vh) rotate(-24deg); opacity:0; } 78% { opacity:.85; } 100% { transform: translate(125vw,58vh) rotate(-24deg); opacity:0; } }
        .gowl-auth-world { background: radial-gradient(760px 440px at 12% -5%,rgba(91,110,245,.28),transparent 65%),radial-gradient(620px 380px at 95% 85%,rgba(46,217,163,.13),transparent 68%),#0D1722; }
        .gowl-auth-world::before { content:""; position:absolute; inset:0; opacity:.4; background-image:radial-gradient(circle at 18% 22%,rgba(255,255,255,.8) 0 1px,transparent 1.4px),radial-gradient(circle at 72% 16%,rgba(139,233,253,.65) 0 1px,transparent 1.5px),linear-gradient(rgba(91,110,245,.09) 1px,transparent 1px),linear-gradient(90deg,rgba(91,110,245,.09) 1px,transparent 1px); background-size:190px 190px,240px 240px,64px 64px,64px 64px; mask-image:radial-gradient(ellipse at center,#000 28%,transparent 90%); }
        .gowl-auth-shoot { position:absolute; width:190px; height:1px; left:0; top:0; background:linear-gradient(90deg,transparent,rgba(139,233,253,.9),transparent); filter:drop-shadow(0 0 6px rgba(139,233,253,.7)); animation:gowl-auth-shoot 8s linear infinite; }
        .gowl-auth-shell { position:relative; z-index:2; width:min(980px,100%); display:grid; grid-template-columns:minmax(0,1.05fr) minmax(380px,.95fr); overflow:hidden; border-radius:28px; border:1px solid rgba(139,233,253,.2); background:rgba(18,31,46,.9); box-shadow:0 38px 110px -54px rgba(0,0,0,.95),0 0 70px -38px var(--auth-accent),inset 0 1px 0 rgba(255,255,255,.06); backdrop-filter:blur(22px); animation:gowl-auth-in .5s cubic-bezier(.2,.8,.2,1) both; }
        .gowl-auth-brand { position:relative; min-height:610px; padding:50px; display:flex; flex-direction:column; justify-content:space-between; overflow:hidden; background:radial-gradient(500px 330px at 12% 4%,rgba(91,110,245,.3),transparent 68%),linear-gradient(155deg,rgba(37,58,81,.97),rgba(22,39,57,.97)); border-right:1px solid rgba(139,233,253,.14); }
        .gowl-auth-brand::after { content:"GOWLSEC // IDENTITY"; position:absolute; right:-72px; bottom:92px; transform:rotate(-90deg); color:rgba(139,233,253,.12); font:500 10px 'IBM Plex Mono',monospace; letter-spacing:.32em; }
        .gowl-auth-wordmark { display:flex; align-items:center; gap:12px; position:relative; z-index:1; }
        .gowl-auth-wordmark strong { color:#F4F8FC; font:800 20px 'Sora',sans-serif; letter-spacing:-.03em; }
        .gowl-auth-wordmark small { display:block; color:#8A9BB0; font:500 9px 'IBM Plex Mono',monospace; letter-spacing:.15em; text-transform:uppercase; }
        .gowl-auth-copy { position:relative; z-index:1; max-width:410px; }
        .gowl-auth-copy > span { color:#8BE9FD; font:600 10px 'IBM Plex Mono',monospace; letter-spacing:.18em; text-transform:uppercase; }
        .gowl-auth-copy h2 { margin:12px 0; color:#F4F8FC; font:800 clamp(28px,4vw,42px)/1.08 'Sora',sans-serif; letter-spacing:-.045em; }
        .gowl-auth-copy p { color:#A8B6C7; font-size:15px; line-height:1.65; }
        .gowl-auth-trust { position:relative; z-index:1; display:grid; gap:10px; }
        .gowl-auth-trust-row { display:flex; align-items:center; gap:10px; color:#B7C4D2; font-size:12px; }
        .gowl-auth-trust-row > span { width:30px; height:30px; display:grid; place-items:center; border-radius:9px; color:#8BE9FD; background:rgba(139,233,253,.08); border:1px solid rgba(139,233,253,.18); }
        .gowl-auth-action { padding:44px 40px; display:flex; flex-direction:column; justify-content:center; background:linear-gradient(180deg,rgba(27,45,64,.96),rgba(18,31,46,.98)); }
        .gowl-action-icon { width:64px; height:64px; display:grid; place-items:center; border-radius:20px; color:var(--auth-accent); background:color-mix(in srgb,var(--auth-accent) 14%,rgba(24,40,58,.9)); border:1px solid color-mix(in srgb,var(--auth-accent) 44%,transparent); animation:gowl-auth-pulse 2.4s ease-in-out infinite; }
        .gowl-auth-kicker { margin-top:22px; color:var(--auth-accent); font:600 9px 'IBM Plex Mono',monospace; letter-spacing:.2em; text-transform:uppercase; }
        .gowl-auth-action h1 { margin-top:7px; color:#F4F8FC; font:800 clamp(24px,3vw,32px)/1.15 'Sora',sans-serif; letter-spacing:-.035em; }
        .gowl-auth-subtitle { margin-top:8px; color:#97A8BA; font-size:14px; line-height:1.5; }
        .gowl-auth-content { margin-top:24px; }
        .gowl-auth-content input { background:rgba(13,23,34,.72)!important; border-color:rgba(139,233,253,.17)!important; }
        .gowl-auth-content input:focus { border-color:var(--auth-accent)!important; box-shadow:0 0 0 3px color-mix(in srgb,var(--auth-accent) 12%,transparent)!important; }
        .gowl-auth-steps { display:grid; grid-template-columns:repeat(3,1fr); gap:7px; margin-top:24px; padding-top:18px; border-top:1px solid rgba(139,233,253,.11); }
        .gowl-auth-step { color:#718297; font:500 8px 'IBM Plex Mono',monospace; text-transform:uppercase; letter-spacing:.08em; }
        .gowl-auth-step::before { content:""; display:block; height:2px; margin-bottom:7px; border-radius:2px; background:rgba(139,233,253,.14); }
        .gowl-auth-step.is-active { color:var(--auth-accent); }
        .gowl-auth-step.is-active::before { background:var(--auth-accent); box-shadow:0 0 10px color-mix(in srgb,var(--auth-accent) 60%,transparent); }
        @media(max-width:820px){.gowl-auth-shell{grid-template-columns:1fr;max-width:520px}.gowl-auth-brand{min-height:auto;padding:24px}.gowl-auth-copy{margin-top:34px}.gowl-auth-copy h2{font-size:27px}.gowl-auth-trust{display:none}.gowl-auth-action{padding:32px 24px}}
        @media(max-width:460px){.gowl-auth-world{padding:0;align-items:stretch}.gowl-auth-shell{min-height:100vh;border:0;border-radius:0}.gowl-auth-brand{padding:20px}.gowl-auth-copy{margin-top:24px}.gowl-auth-copy p{display:none}.gowl-auth-action{padding:28px 20px 34px}}
      `}</style>
      <span aria-hidden className="gowl-auth-shoot" />
      <div className="gowl-auth-shell">
        <section className="gowl-auth-brand">
          <div className="gowl-auth-wordmark">
            <OwlLogo size={50} />
            <div><strong>GowlSec</strong><small>Cyber community</small></div>
          </div>
          <div className="gowl-auth-copy">
            <span>Secure identity gateway</span>
            <h2>Reprends le contrôle de ton accès.</h2>
            <p>Une étape sécurisée pour confirmer ton identité et retrouver la communauté GowlSec sans interrompre ta progression.</p>
          </div>
          <div className="gowl-auth-trust">
            <div className="gowl-auth-trust-row"><span><Shield size={14} /></span> Connexion chiffrée et contrôlée</div>
            <div className="gowl-auth-trust-row"><span><Clock size={14} /></span> Lien temporaire à usage limité</div>
            <div className="gowl-auth-trust-row"><span><Lock size={14} /></span> Mot de passe jamais affiché</div>
          </div>
        </section>
        <section className="gowl-auth-action">
          <span className="gowl-action-icon">{icon}</span>
          <span className="gowl-auth-kicker">GowlSec Identity</span>
          <h1>{title}</h1>
          {subtitle && <p className="gowl-auth-subtitle">{subtitle}</p>}
          <div className="gowl-auth-content">{children}</div>
          <div className="gowl-auth-steps" aria-label="Étapes de sécurité">
            <span className="gowl-auth-step is-active">Lien sécurisé</span>
            <span className="gowl-auth-step is-active">Vérification</span>
            <span className={`gowl-auth-step ${complete ? "is-active" : ""}`}>
              Accès
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function GowlSec() {
  const { user, setUser, logout } = useAuth();
  const [liveCount, setLiveCount] = useState(null);

  useEffect(() => {
    socket.auth = {
      token: localStorage.getItem("gowlsec_token"),
    };

    socket.on("live-count", setLiveCount);
    socket.connect();

    return () => {
      socket.off("live-count", setLiveCount);
      socket.disconnect();
    };
  }, [user?.id]);

  const [tab, setTab] = useState("accueil");
  const currentUser = user;
  const setCurrentUser = setUser;

  const [guestPseudo] = useState(
    "invite" + Math.floor(Math.random() * 900 + 100),
  );

  const [isAdmin, setIsAdmin] = useState(false);
  const [lang, setLang] = useState(null);
  const [langLoading, setLangLoading] = useState(true);

  // Tout le reste de ton composant continue ici...
  const [verificationMessage, setVerificationMessage] = useState("");
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null); // "success" | "error" | null

  const [resetNewPassword, setResetNewPassword] = useState("");
  const [resetConfirmPassword, setResetConfirmPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetStatus, setResetStatus] = useState(null); // "success" | "error" | null
  const [resetShowPw, setResetShowPw] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const path = window.location.pathname;
  const emailToken = new URLSearchParams(window.location.search).get("token");
  const resetToken = emailToken;

  useEffect(() => {
    if (path !== "/verify-email" || !emailToken) return;

    async function confirmEmail() {
      try {
        setVerificationLoading(true);

        const result = await verifyEmail(emailToken);

        setVerificationMessage(result.message || "Email vérifié avec succès.");
        setVerificationStatus("success");
      } catch (error) {
        setVerificationMessage(
          error.message || "Lien de vérification invalide.",
        );
        setVerificationStatus("error");
      } finally {
        setVerificationLoading(false);
      }
    }

    confirmEmail();
  }, [path, emailToken]);

  async function handleResetPassword(event) {
    event.preventDefault();
    setResetMessage("");
    setResetStatus(null);

    if (!resetToken) {
      setResetMessage("Lien de réinitialisation invalide ou incomplet.");
      setResetStatus("error");
      return;
    }

    const pwError = passwordErrorMessage(resetNewPassword);
    if (pwError) {
      setResetMessage(pwError);
      setResetStatus("error");
      return;
    }

    if (resetNewPassword !== resetConfirmPassword) {
      setResetMessage("Les mots de passe ne correspondent pas.");
      setResetStatus("error");
      return;
    }

    try {
      setResetLoading(true);

      const result = await resetPassword({
        token: resetToken,
        password: resetNewPassword,
      });

      setResetMessage(result?.message || "Mot de passe modifié avec succès.");
      setResetStatus("success");
      setResetNewPassword("");
      setResetConfirmPassword("");
    } catch (error) {
      setResetMessage(
        error.message || "Impossible de modifier le mot de passe.",
      );
      setResetStatus("error");
    } finally {
      setResetLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("gowlsec:lang", false);
        if (res?.value) setLang(res.value);
      } catch {
        /* best effort */
      }
      setLangLoading(false);
    })();
  }, []);

  async function chooseLang(key) {
    setLang(key);
    try {
      await window.storage.set("gowlsec:lang", key, false);
    } catch {
      /* best effort */
    }
  }
  const L = (key) => t(lang || "fr", key);

  const [profiles, setProfiles] = useState([]);
  const [credentials, setCredentials] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [trophies, setTrophies] = useState([]);
  const [news, setNews] = useState(SEED_NEWS);
  const [teams, setTeams] = useState([]);
  const [teamAnnouncements, setTeamAnnouncements] = useState([]);
  const [labs, setLabs] = useState([]);
  const [labMessages, setLabMessages] = useState([]);
  const [orders, setOrders] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [supportThreads, setSupportThreads] = useState([]);
  const [writeups, setWriteups] = useState([]);
  const [events, setEvents] = useState([]);
  const [memberCount, setMemberCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [viewedProfile, setViewedProfile] = useState(null);
  const [publicProfileLoading, setPublicProfileLoading] = useState(false);
  const [directMessageTarget, setDirectMessageTarget] = useState("");

  useEffect(() => {
    const openProfile = async (event) => {
      const requested = event.detail?.profile;
      const username = requested?.username;
      if (!username) return;
      setViewedProfile(requested);
      setPublicProfileLoading(true);
      try {
        const data = await apiRequest(
          `/api/users/${encodeURIComponent(username)}`,
        );
        setViewedProfile(data.profile || data.user || data);
      } catch {
        setViewedProfile(
          profiles.find((profile) => profile.username === username) ||
            requested,
        );
      } finally {
        setPublicProfileLoading(false);
      }
    };
    window.addEventListener("gowlsec:open-profile", openProfile);
    return () =>
      window.removeEventListener("gowlsec:open-profile", openProfile);
  }, [profiles]);

  useEffect(() => {
    if (!user?.id) return;
    let active = true;
    apiRequest("/api/users/me/activity", { method: "POST" })
      .then((data) => {
        const updated = data.user || data.profile || data;
        if (active && updated?.id)
          setUser((current) => ({ ...current, ...updated }));
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [user?.id]);

  useEffect(() => {
    const updateUser = (event) => {
      if (event.detail?.id)
        setUser((current) => ({ ...current, ...event.detail }));
    };
    window.addEventListener("gowlsec:user-updated", updateUser);
    return () => window.removeEventListener("gowlsec:user-updated", updateUser);
  }, [setUser]);

  useEffect(() => {
    let active = true;

    async function loadMemberCount() {
      try {
        const response = await fetch(`${COMMUNITY_API_URL}/api/stats/members`);
        const data = await response.json().catch(() => null);

        if (
          active &&
          response.ok &&
          Number.isInteger(data?.count) &&
          data.count >= 0
        ) {
          setMemberCount(data.count);
        }
      } catch (error) {
        console.error("Chargement du nombre de membres impossible :", error);
      }
    }

    loadMemberCount();
    const interval = window.setInterval(loadMemberCount, 300000);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const loadHubMessages = () => {
      socket.emit("hub-messages:load", (response) => {
        if (!response?.success || !Array.isArray(response.messages)) return;

        setMessages(response.messages.map(normalizeHubMessage));
      });
    };

    const handleNewHubMessage = (message) => {
      const normalized = normalizeHubMessage(message);

      setMessages((currentMessages) => {
        if (currentMessages.some((item) => item.id === normalized.id)) {
          return currentMessages;
        }

        return [...currentMessages, normalized];
      });
    };

    const handleDeletedHubMessage = (payload) => {
      const messageId = Number(payload?.id);

      if (!Number.isInteger(messageId) || messageId <= 0) return;

      setMessages((currentMessages) =>
        currentMessages.filter((message) => Number(message.id) !== messageId),
      );
    };

    socket.on("connect", loadHubMessages);
    socket.on("hub-message:new", handleNewHubMessage);
    socket.on("hub-message:deleted", handleDeletedHubMessage);

    if (socket.connected) {
      loadHubMessages();
    }

    return () => {
      socket.off("connect", loadHubMessages);
      socket.off("hub-message:new", handleNewHubMessage);
      socket.off("hub-message:deleted", handleDeletedHubMessage);
    };
  }, []);

  const pseudo = currentUser?.username || guestPseudo;

  useEffect(() => {
    if (
      currentUser &&
      (currentUser.role === "admin" || currentUser.isAdmin === true)
    ) {
      setIsAdmin(true);
    }
  }, [currentUser]);

  useEffect(() => {
    let active = true;
    async function refreshLive() {
      try {
        const listing = await window.storage.list("gowlsec:presence:", true);
        const keys = listing?.keys || [];
        const results = await Promise.all(
          keys.map(async (k) => {
            try {
              const r = await window.storage.get(k, true);
              return r ? JSON.parse(r.value) : null;
            } catch {
              return null;
            }
          }),
        );
        if (!active) return;
        const now = Date.now();
        setLiveCount(
          results
            .filter(Boolean)
            .filter(
              (p) => now - new Date(p.lastSeen).getTime() < ONLINE_WINDOW_MS,
            ).length,
        );
      } catch {
        /* best effort */
      }
    }
    refreshLive();
    const interval = setInterval(refreshLive, 30000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const [pr, cr, q, m, t, n, tm, ta, ord, lb, lm, tk, th, wu, ev, nf] =
        await Promise.all([
          loadCollection("gowlsec:profiles", []),
          loadCollection("gowlsec:credentials", [], false),
          Promise.resolve([]),
          Promise.resolve(null),
          Promise.resolve([]),
          loadCollection("gowlsec:news", SEED_NEWS),
          Promise.resolve([]),
          Promise.resolve([]),
          loadCollection("gowlsec:orders", []),
          Promise.resolve([]),
          Promise.resolve([]),
          loadCollection("gowlsec:tickets", []),
          loadCollection("gowlsec:support_threads", []),
          Promise.resolve([]),
          loadCollection("gowlsec:events", []),
          loadCollection("gowlsec:notifications", []),
        ]);
      const localNews = Array.isArray(n) ? n : SEED_NEWS;
      let siteNews = localNews;

      setProfiles(pr);
      setCredentials(cr);
      setQuestions(q);
      setTrophies(t);
      setNews(localNews);
      setTeams(tm);
      setTeamAnnouncements(ta);
      setOrders(ord);
      setLabs(lb);
      setLabMessages(lm);
      setTickets(tk);
      setSupportThreads(th);
      setWriteups(wu);
      setEvents(ev);
      setNotifications(nf);

      try {
        const [profilesResponse, announcementsResponse] = await Promise.all([
          apiRequest("/api/users"),
          apiRequest("/api/announcements"),
        ]);
        const publicProfiles =
          profilesResponse.profiles || profilesResponse.users || [];
        if (Array.isArray(publicProfiles)) setProfiles(publicProfiles);
        const remoteAnnouncements = (
          announcementsResponse.announcements || []
        ).map(formatAnnouncementForNews);
        siteNews = [
          ...remoteAnnouncements,
          ...localNews.filter(
            (item) =>
              !item.backendAnnouncement &&
              !String(item.id).startsWith("announcement-"),
          ),
        ];
        setNews(siteNews);
      } catch (error) {
        console.error("Chargement des profils ou annonces impossible :", error);
      }

      try {
        const response = await fetch(`${COMMUNITY_API_URL}/api/ctftime/events`);
        const ctftime = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(
            ctftime?.message || "Impossible de charger les événements CTFtime.",
          );
        }

        const ctftimeEvents = Array.isArray(ctftime)
          ? ctftime
          : Array.isArray(ctftime?.events)
            ? ctftime.events
            : [];
        const ctftimeNews = ctftimeEvents.length
          ? ctftimeEvents.map((event) => {
              const start = new Date(event.start);
              const finish = new Date(event.finish);
              const startLabel = Number.isNaN(start.getTime())
                ? "Date à confirmer"
                : start.toLocaleString("fr-FR");
              const finishLabel = Number.isNaN(finish.getTime())
                ? ""
                : finish.toLocaleString("fr-FR");
              const schedule = finishLabel
                ? `${startLabel} → ${finishLabel}`
                : startLabel;
              const details = [
                event.format || "CTF",
                event.location || "En ligne",
                schedule,
              ]
                .filter(Boolean)
                .join(" · ");

              return {
                id: `ctftime-${event.id}`,
                ref: `CTF-${event.id}`,
                category: "event",
                title: event.title || "Événement CTF",
                summary: event.description
                  ? `${details} — ${event.description}`
                  : details,
                source: "CTFtime",
                url:
                  event.ctftimeUrl ||
                  event.officialUrl ||
                  `https://ctftime.org/event/${event.id}/`,
                date: event.start || new Date().toISOString(),
                start: event.start || null,
                finish: event.finish || null,
                format: event.format || "CTF",
                location: event.location || "En ligne",
                description:
                  event.description ||
                  "Les informations détaillées seront publiées par l’organisateur.",
                difficulty: event.difficulty || null,
                participantCount:
                  Number(
                    event.participants ??
                      event.participantCount ??
                      event.teamsCount ??
                      0,
                  ) || 0,
                reward: event.reward || event.prizes || event.prize || "",
                weight: Number(event.weight || 0) || 0,
                officialUrl: event.officialUrl || event.url || "",
                external: true,
              };
            })
          : [];

        setNews([
          ...ctftimeNews,
          ...siteNews.filter((item) => !String(item.id).startsWith("ctftime-")),
        ]);
      } catch (error) {
        console.error("Chargement CTFtime impossible :", error);
      }

      try {
        const community = await communityRequest();
        setQuestions(
          Array.isArray(community.questions) ? community.questions : [],
        );
        setTrophies(
          Array.isArray(community.trophies) ? community.trophies : [],
        );
        setTeams(Array.isArray(community.teams) ? community.teams : []);
        setTeamAnnouncements(
          Array.isArray(community.teamAnnouncements)
            ? community.teamAnnouncements
            : [],
        );
        setLabs(Array.isArray(community.labs) ? community.labs : []);
        setLabMessages(
          Array.isArray(community.labMessages) ? community.labMessages : [],
        );
        setWriteups(
          Array.isArray(community.writeups) ? community.writeups : [],
        );
      } catch (error) {
        console.error("Chargement de la communauté impossible :", error);
      }

      try {
        const sessionRes = await window.storage.get("gowlsec:session", false);
        if (sessionRes?.value) {
          const session = JSON.parse(sessionRes.value);
          const savedProfile = pr.find((p) => p.id === session.profileId);
          if (savedProfile) setCurrentUser(savedProfile);
        }
      } catch {
        /* best effort */
      }

      setLoading(false);
    })();
  }, []);

  // présence — heartbeat pour le suivi admin des utilisateurs connectés
  useEffect(() => {
    if (!currentUser) return;
    let active = true;
    async function heartbeat() {
      if (!active) return;
      await saveCollection(
        `gowlsec:presence:${currentUser.id}`,
        {
          userId: currentUser.id,
          username: currentUser.username,
          email: currentUser.email,
          lastSeen: new Date().toISOString(),
        },
        true,
      );
    }
    heartbeat();
    const interval = setInterval(heartbeat, 25000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [currentUser]);

  const stats = useMemo(
    () => ({
      questions: questions.length,
      messages: messages.length,
      trophies: trophies.length,
      news: news.length,
      teams: teams.length,
      labs: labs.length,
      tickets: tickets.length,
    }),
    [questions, messages, trophies, news, teams, labs, tickets],
  );
  const announcements = useMemo(
    () => news.filter((n) => n.category === "annonce").slice(0, 3),
    [news],
  );

  const featuredNews = useMemo(() => {
    const pool = news.filter((n) => n.category !== "annonce");
    const list = pool.length > 0 ? pool : news;
    if (list.length === 0) return null;
    return list[dayOfYear() % list.length];
  }, [news]);

  const activityFeed = useMemo(() => {
    const items = [
      ...questions.map((q) => ({
        kind: "question",
        id: q.id,
        author: q.author,
        text: q.title,
        createdAt: q.createdAt,
        tab: "forum",
      })),
      ...trophies.map((t) => ({
        kind: "trophy",
        id: t.id,
        author: t.author,
        text: `${t.platform} — ${t.title}`,
        createdAt: t.createdAt,
        tab: "trophies",
      })),
      ...teams.map((t) => ({
        kind: "team",
        id: t.id,
        author: t.owner,
        text: `a créé la team ${t.name}`,
        createdAt: t.createdAt,
        tab: "equipes",
      })),
      ...labs.map((l) => ({
        kind: "lab",
        id: l.id,
        author: l.owner,
        text: `a ouvert le salon lab ${l.title}`,
        createdAt: l.createdAt,
        tab: "labs",
      })),
      ...messages.slice(-30).map((m) => ({
        kind: "message",
        id: m.id,
        author: m.author,
        text: m.text,
        createdAt: m.createdAt,
        tab: "salons",
      })),
    ];
    return items
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 7);
  }, [questions, trophies, teams, labs, messages]);

  const topLeaders = useMemo(() => {
    const scores = {};
    const add = (author, pts) => {
      if (!author) return;
      scores[author] = (scores[author] || 0) + pts;
    };
    trophies.forEach((t) => add(t.author, TROPHY_POINTS[t.difficulty] || 10));
    questions.forEach((q) => {
      add(q.author, 2);
      (q.answers || []).forEach((a) => add(a.author, 3));
    });
    labs.forEach((l) => add(l.owner, 5));
    return Object.entries(scores)
      .map(([author, total]) => ({ author, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 3);
  }, [questions, trophies, labs]);

  const openLabs = useMemo(
    () =>
      labs
        .filter((l) => l.members.length < (l.maxMembers || LAB_MAX_MEMBERS))
        .slice(0, 3),
    [labs],
  );

  const tickerItems = useMemo(() => {
    const fromActivity = activityFeed.map((item) => {
      const verbs = {
        question: "a posé une question",
        trophy: "a débloqué un trophée",
        team: "a créé une team",
        lab: "a ouvert un salon lab",
        message: "discute sur le Hub",
      };
      return `${item.author} ${verbs[item.kind] || "vient d'agir"}`;
    });
    const fromNews = news.slice(0, 4).map((n) => `📰 ${n.title}`);
    const combined = [...fromActivity, ...fromNews];
    if (combined.length === 0) {
      return [
        "Bienvenue sur GowlSec — la communauté démarre tout juste",
        "Pose ta première question dans #Question",
        "Ouvre un salon lab et avance à plusieurs",
      ];
    }
    return combined;
  }, [activityFeed, news]);

  if (path === "/verify-email") {
    const accent = verificationLoading
      ? C.primary
      : verificationStatus === "success"
        ? C.ok
        : C.alert;
    const icon = verificationLoading ? (
      <Loader2 size={24} className="animate-spin" />
    ) : verificationStatus === "success" ? (
      <CheckCircle2 size={24} />
    ) : (
      <AlertTriangle size={24} />
    );

    return (
      <AuthActionPage
        accent={accent}
        icon={icon}
        complete={verificationStatus === "success"}
        title={
          verificationLoading
            ? "Vérification en cours"
            : verificationStatus === "success"
              ? "Adresse e-mail confirmée"
              : "Vérification impossible"
        }
        subtitle={
          verificationLoading
            ? "Nous contrôlons ton lien sécurisé avec le serveur GowlSec."
            : verificationStatus === "success"
              ? "Ton identité est validée. Tu peux maintenant rejoindre pleinement la communauté."
              : "Le lien est peut-être incomplet, expiré ou déjà utilisé."
        }
      >
        {!verificationLoading && (
          <p
            className="text-sm mb-6 leading-relaxed"
            style={{ color: C.muted }}
          >
            {verificationMessage || "Token de vérification manquant."}
          </p>
        )}
        <a
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: accent, color: "#fff", fontFamily: BODY_FONT }}
        >
          Retour à l'accueil
        </a>
      </AuthActionPage>
    );
  }

  if (path === "/reset-password") {
    const accent =
      resetStatus === "success"
        ? C.ok
        : resetStatus === "error"
          ? C.alert
          : C.primary;
    const icon =
      resetStatus === "success" ? (
        <CheckCircle2 size={24} />
      ) : (
        <KeyRound size={24} />
      );

    return (
      <AuthActionPage
        accent={accent}
        icon={icon}
        complete={resetStatus === "success"}
        title={
          resetStatus === "success"
            ? "Accès sécurisé restauré"
            : "Créer un nouveau mot de passe"
        }
        subtitle={
          resetToken && resetStatus !== "success"
            ? "Choisis une combinaison unique pour protéger ton compte GowlSec."
            : resetStatus === "success"
              ? "Ton nouveau mot de passe est actif. Tu peux reprendre ta session."
              : "Ce lien de récupération ne peut pas être utilisé."
        }
      >
        {!resetToken ? (
          <p className="text-sm mb-6" style={{ color: C.muted }}>
            Lien de réinitialisation invalide ou incomplet.
          </p>
        ) : resetStatus === "success" ? (
          <p className="text-sm mb-6" style={{ color: C.muted }}>
            {resetMessage}
          </p>
        ) : (
          <form onSubmit={handleResetPassword} className="text-left">
            <PasswordField
              label="Nouveau mot de passe"
              value={resetNewPassword}
              onChange={(e) => setResetNewPassword(e.target.value)}
              show={resetShowPw.newPassword}
              onToggleShow={() =>
                setResetShowPw((s) => ({ ...s, newPassword: !s.newPassword }))
              }
              placeholder="••••••••"
              validate
              autoComplete="new-password"
            />
            <PasswordField
              label="Confirmer le mot de passe"
              value={resetConfirmPassword}
              onChange={(e) => setResetConfirmPassword(e.target.value)}
              show={resetShowPw.confirmPassword}
              onToggleShow={() =>
                setResetShowPw((s) => ({
                  ...s,
                  confirmPassword: !s.confirmPassword,
                }))
              }
              placeholder="••••••••"
              autoComplete="new-password"
            />

            {resetMessage && resetStatus === "error" && (
              <p
                className="flex items-center gap-1.5 text-xs mb-4 -mt-1.5"
                style={{ color: C.alert }}
              >
                <AlertTriangle size={12} className="shrink-0" /> {resetMessage}
              </p>
            )}

            <PrimaryButton
              type="submit"
              disabled={resetLoading}
              style={{ width: "100%", justifyContent: "center" }}
            >
              {resetLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Modification…
                </>
              ) : (
                "Modifier le mot de passe"
              )}
            </PrimaryButton>
          </form>
        )}

        <a
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold mt-3 transition-opacity hover:opacity-90"
          style={{
            border: `1px solid ${C.line}`,
            color: C.muted,
            fontFamily: BODY_FONT,
          }}
        >
          Retour à l'accueil
        </a>
      </AuthActionPage>
    );
  }

  return (
    <div
      style={{
        background: C.bg,
        minHeight: "100vh",
        fontFamily: BODY_FONT,
        position: "relative",
      }}
    >
      {!langLoading && !lang && <LanguageGate onChoose={chooseLang} />}
      {(viewedProfile || publicProfileLoading) && (
        <PublicProfileModal
          profile={viewedProfile}
          loading={publicProfileLoading}
          currentUser={user}
          onMessage={(username) => {
            setDirectMessageTarget(username);
            setTab("messages");
            setViewedProfile(null);
          }}
          onClose={() => {
            setViewedProfile(null);
            setPublicProfileLoading(false);
          }}
        />
      )}
      {searchOpen && (
        <GlobalSearchModal
          onClose={() => setSearchOpen(false)}
          setTab={setTab}
          questions={questions}
          teams={teams}
          labs={labs}
          news={news}
          trophies={trophies}
        />
      )}
      <div aria-hidden className="gowl-bg-glow" />
      <ShootingStarsBackground />
      <div aria-hidden className="gowl-scanlines" />
      <div aria-hidden className="gowl-bg-noise" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Source+Sans+3:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        /* --- Fond cyber ambiant : halos --- */
        .gowl-bg-glow {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(680px 380px at 12% -6%, ${C.primary}26, transparent 60%),
            radial-gradient(620px 360px at 92% 6%, ${C.ok}1E, transparent 60%),
            radial-gradient(780px 460px at 50% 105%, ${C.gold}14, transparent 70%),
            radial-gradient(500px 300px at 50% 40%, ${C.primary}0A, transparent 65%);
          animation: gowl-glow-drift 16s ease-in-out infinite alternate;
        }
        @keyframes gowl-glow-drift { 0% { opacity: 0.85; transform: translateY(0); } 100% { opacity: 1; transform: translateY(-10px); } }
        .gowl-bg-network { position: fixed; inset: 0; z-index: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.85; }
        header, main, footer { position: relative; z-index: 1; }
        /* --- Éléments HUD cyber réutilisables --- */
        @keyframes gowl-border-glow { 0%, 100% { box-shadow: 0 0 0 1px var(--gowl-accent, ${C.primary})33, 0 0 18px -6px var(--gowl-accent, ${C.primary})55; } 50% { box-shadow: 0 0 0 1px var(--gowl-accent, ${C.primary})66, 0 0 26px -4px var(--gowl-accent, ${C.primary})AA; } }
        .gowl-hud-card { position: relative; transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease; }
        .gowl-hud-card:hover { transform: translateY(-2px); border-color: var(--gowl-accent, ${C.primary})77 !important; box-shadow: 0 14px 28px -20px var(--gowl-accent, ${C.primary})AA, 0 0 0 1px var(--gowl-accent, ${C.primary})33; }
        /* --- Espaces communautaires : identité visuelle par module --- */
        .gowl-community-view {
          --community-accent: ${C.primary};
          position: relative;
          isolation: isolate;
          padding: clamp(14px, 2vw, 24px);
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid color-mix(in srgb, var(--community-accent) 28%, ${C.line});
          background:
            radial-gradient(620px 320px at 0% 0%, color-mix(in srgb, var(--community-accent) 19%, transparent), transparent 68%),
            radial-gradient(520px 280px at 100% 18%, rgba(139,233,253,.08), transparent 72%),
            linear-gradient(145deg, rgba(28,45,64,.97), rgba(18,32,47,.96));
          box-shadow: 0 28px 70px -48px color-mix(in srgb, var(--community-accent) 70%, transparent), inset 0 1px 0 rgba(255,255,255,.055);
        }
        .gowl-view-forum { --community-accent: #6E8BFF; }
        .gowl-view-hub { --community-accent: #3AD6CF; }
        .gowl-view-teams { --community-accent: #FFB45D; }
        .gowl-view-labs { --community-accent: #B78CFF; }
        .gowl-view-writeups { --community-accent: #43D7A5; }
        .gowl-view-finder { --community-accent: #62E6B6; }
        .gowl-community-view::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -2;
          pointer-events: none;
          opacity: .24;
          background-image:
            linear-gradient(color-mix(in srgb, var(--community-accent) 18%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in srgb, var(--community-accent) 18%, transparent) 1px, transparent 1px),
            radial-gradient(circle at 22% 28%, rgba(255,255,255,.65) 0 1px, transparent 1.4px),
            radial-gradient(circle at 80% 12%, rgba(255,255,255,.45) 0 1px, transparent 1.4px);
          background-size: 48px 48px, 48px 48px, 170px 170px, 220px 220px;
          mask-image: linear-gradient(to bottom, #000, transparent 82%);
        }
        .gowl-community-view::after {
          content: "";
          position: absolute;
          z-index: -1;
          width: 280px;
          height: 280px;
          right: -190px;
          top: 70px;
          border-radius: 999px;
          border: 1px solid color-mix(in srgb, var(--community-accent) 24%, transparent);
          box-shadow: 0 0 70px color-mix(in srgb, var(--community-accent) 12%, transparent), inset 0 0 50px color-mix(in srgb, var(--community-accent) 8%, transparent);
          pointer-events: none;
        }
        .gowl-community-view .gowl-section-head { margin-bottom: 10px; }
        .gowl-community-view .gowl-section-icon { width: 48px; height: 48px; border-radius: 15px; }
        .gowl-community-view .gowl-hud-card,
        .gowl-community-view .gowl-community-card {
          background: linear-gradient(145deg, rgba(35,55,76,.94), rgba(24,40,57,.92)) !important;
          border-color: color-mix(in srgb, var(--community-accent) 22%, ${C.line}) !important;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.045), 0 18px 38px -34px rgba(0,0,0,.9);
          backdrop-filter: blur(12px);
        }
        .gowl-community-view .gowl-community-card:hover {
          transform: translateY(-2px);
          border-color: color-mix(in srgb, var(--community-accent) 55%, ${C.line}) !important;
          box-shadow: 0 18px 38px -28px color-mix(in srgb, var(--community-accent) 42%, transparent);
        }
        .gowl-community-view input,
        .gowl-community-view textarea,
        .gowl-community-view select {
          background-color: rgba(24,40,57,.92) !important;
          border-color: color-mix(in srgb, var(--community-accent) 22%, ${C.line}) !important;
        }
        .gowl-community-view input:focus,
        .gowl-community-view textarea:focus,
        .gowl-community-view select:focus {
          border-color: color-mix(in srgb, var(--community-accent) 64%, #fff) !important;
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--community-accent) 12%, transparent) !important;
        }
        .gowl-community-view .gowl-qthread { background: rgba(18,32,47,.56); }
        @media (max-width: 640px) {
          .gowl-community-view { padding: 12px; border-radius: 18px; }
          .gowl-community-view .gowl-section-icon { width: 42px; height: 42px; }
        }
        .gowl-hud-card::before, .gowl-hud-card::after {
          content: ""; position: absolute; width: 10px; height: 10px; pointer-events: none; opacity: 0; transition: opacity 0.2s ease;
          border-color: var(--gowl-accent, ${C.primary});
        }
        .gowl-hud-card::before { top: -1px; left: -1px; border-top: 2px solid; border-left: 2px solid; }
        .gowl-hud-card::after { bottom: -1px; right: -1px; border-bottom: 2px solid; border-right: 2px solid; }
        .gowl-hud-card:hover::before, .gowl-hud-card:hover::after { opacity: 1; }
        .gowl-section-head { position: relative; display: flex; align-items: center; gap: 12px; margin-bottom: 4px; }
        .gowl-section-icon { position: relative; display: flex; align-items: center; justify-content: center; width: 42px; height: 42px; border-radius: 12px; flex-shrink: 0; background: linear-gradient(155deg, var(--gowl-accent, ${C.primary})26, transparent); border: 1px solid var(--gowl-accent, ${C.primary})55; color: var(--gowl-accent, ${C.primary}); animation: gowl-border-glow 3s ease-in-out infinite; }
        .gowl-section-rule { height: 2px; flex: 1; margin-left: 14px; background: linear-gradient(90deg, var(--gowl-accent, ${C.primary})88, transparent); border-radius: 2px; }
        .gowl-mono-tag { font-family: ${MONO_FONT}; letter-spacing: 0.14em; }
        @keyframes gowl-podium-rise { from { transform: scaleY(0); opacity: 0; } to { transform: scaleY(1); opacity: 1; } }
        .gowl-podium-bar { transform-origin: bottom; animation: gowl-podium-rise 0.6s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes gowl-rank-glow { 0%, 100% { filter: drop-shadow(0 0 2px currentColor); } 50% { filter: drop-shadow(0 0 9px currentColor); } }
        .gowl-rank-glow { animation: gowl-rank-glow 2.2s ease-in-out infinite; }
        .gowl-trophy-badge { position: relative; width: 46px; height: 46px; display: flex; align-items: center; justify-content: center; }
        @keyframes gowl-sweep { 0% { transform: translateX(-120%) skewX(-15deg); } 100% { transform: translateX(220%) skewX(-15deg); } }
        .gowl-sweep-wrap { position: relative; overflow: hidden; }
        .gowl-sweep-wrap::after { content: ""; position: absolute; top: 0; left: 0; width: 40%; height: 100%; background: linear-gradient(90deg, transparent, #ffffff22, transparent); animation: gowl-sweep 3.2s ease-in-out infinite; pointer-events: none; }

        /* --- Vague 2 : effets premium --- */
        @keyframes gowl-noise-shift { 0% { transform: translate(0,0); } 100% { transform: translate(-40px,-30px); } }
        .gowl-bg-noise { position: fixed; inset: -60px; z-index: 0; pointer-events: none; opacity: 0.05; mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          animation: gowl-noise-shift 1.2s steps(2) infinite; }
        @keyframes gowl-scanline-move { 0% { background-position-y: 0; } 100% { background-position-y: 240px; } }
        .gowl-scanlines { position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.5;
          background: repeating-linear-gradient(0deg, transparent 0 3px, #ffffff05 3px 4px);
          animation: gowl-scanline-move 9s linear infinite; }
        @keyframes gowl-glitch-1 { 0%, 92%, 100% { transform: translate(0,0); opacity: 0; } 93% { transform: translate(-2px,1px); opacity: 0.7; } 95% { transform: translate(2px,-1px); opacity: 0.5; } 97% { transform: translate(-1px,0); opacity: 0.3; } }
        .gowl-glitch { position: relative; }
        .gowl-glitch::before, .gowl-glitch::after { content: attr(data-text); position: absolute; inset: 0; opacity: 0; pointer-events: none; }
        .gowl-glitch::before { color: ${C.alert}; animation: gowl-glitch-1 5s infinite; clip-path: inset(0 0 55% 0); }
        .gowl-glitch::after { color: ${C.ok}; animation: gowl-glitch-1 5s infinite reverse; clip-path: inset(55% 0 0 0); }
        @keyframes gowl-conic-spin { to { transform: rotate(360deg); } }
        .gowl-rank-ring { position: relative; display: inline-flex; border-radius: 999px; padding: 3px; }
        .gowl-rank-ring::before { content: ""; position: absolute; inset: 0; border-radius: 999px; padding: 2px;
          background: conic-gradient(from 0deg, var(--gowl-accent, ${C.gold}), transparent 40%, var(--gowl-accent, ${C.gold}));
          animation: gowl-conic-spin 3.5s linear infinite;
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude; }
        @keyframes gowl-crown-float { 0%, 100% { transform: translateY(0) rotate(-3deg); } 50% { transform: translateY(-5px) rotate(3deg); } }
        .gowl-crown-float { animation: gowl-crown-float 2.4s ease-in-out infinite; filter: drop-shadow(0 0 6px ${C.gold}CC); }
        @keyframes gowl-podium-glow-1 { 0%, 100% { opacity: 0.55; transform: scale(1); } 50% { opacity: 1; transform: scale(1.15); } }
        .gowl-podium-spot { position: absolute; border-radius: 999px; filter: blur(24px); animation: gowl-podium-glow-1 3s ease-in-out infinite; pointer-events: none; }
        @keyframes gowl-empty-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes gowl-empty-icon-pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.85; } }
        .gowl-empty-state { animation: gowl-empty-in 0.3s ease both; }
        .gowl-empty-icon { animation: gowl-empty-icon-pulse 2.6s ease-in-out infinite; }
        .gowl-news-card { transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease; }
        .gowl-news-card:hover { transform: translateY(-2px); box-shadow: 0 14px 30px -18px rgba(0,0,0,0.6); }
        .gowl-news-delete { transition: color 0.15s ease, background 0.15s ease; }
        .gowl-news-delete:hover { color: ${C.alert}; background: ${C.alert}14; }
        .gowl-news-filter { transition: all 0.15s ease; }
        .gowl-news-filter:hover { color: ${C.text}; border-color: ${C.primary}77; }
        @keyframes gowl-ai-orb-float { 0%, 100% { transform: translateY(0); box-shadow: 0 0 0 9px ${C.primary}08, 0 24px 55px -24px ${C.primary}; } 50% { transform: translateY(-6px); box-shadow: 0 0 0 13px ${C.primary}06, 0 30px 62px -22px ${C.primary}; } }
        .gowl-ai-orb { animation: gowl-ai-orb-float 3.2s ease-in-out infinite; }
        .gowl-ai-news-cta { transition: transform 0.18s ease, filter 0.18s ease, box-shadow 0.18s ease; }
        .gowl-ai-news-cta:hover { transform: translateY(-2px); filter: brightness(1.08); box-shadow: 0 18px 36px -16px ${C.primary} !important; }
        .gowl-ctf-hero { position: relative; box-shadow: 0 24px 70px -48px ${C.primary}AA; }
        .gowl-ctf-hero-grid { display: grid; grid-template-columns: minmax(0, 1.55fr) minmax(260px, 0.75fr); }
        .gowl-ctf-grid-overlay { position: absolute; inset: 0; pointer-events: none; opacity: 0.22; background-image: linear-gradient(${C.primary}17 1px, transparent 1px), linear-gradient(90deg, ${C.primary}17 1px, transparent 1px); background-size: 28px 28px; mask-image: linear-gradient(90deg, #000, transparent 92%); }
        .gowl-ctf-next-wrap { border-left: 1px solid ${C.line}; background: linear-gradient(150deg, ${C.primary}09, rgba(255,255,255,0.012)); }
        .gowl-ctf-next-card { transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease; }
        .gowl-ctf-next-card:hover { transform: translateY(-2px); border-color: ${C.primary}77 !important; background: ${C.primary}10 !important; }
        .gowl-ctf-next-arrow { transition: transform 0.18s ease; }
        .gowl-ctf-next-card:hover .gowl-ctf-next-arrow { transform: translateX(3px); }
        .gowl-ctf-day { transition: transform 0.16s ease, border-color 0.16s ease, filter 0.16s ease; }
        .gowl-ctf-day:hover { transform: translateY(-1px); border-color: ${C.primary}77 !important; filter: brightness(1.09); }
        .gowl-ctf-filters select { transition: border-color 0.16s ease, background 0.16s ease, box-shadow 0.16s ease; }
        .gowl-ctf-filters select:hover { background: ${CTF_CALENDAR_COLORS.controlHover} !important; }
        .gowl-ctf-filters select:focus { outline: none; border-color: ${C.primary}99 !important; box-shadow: 0 0 0 3px ${C.primary}18 !important; }
        .gowl-ctf-event-link { transition: transform 0.16s ease, border-color 0.16s ease, background 0.16s ease; }
        .gowl-ctf-event-link:hover { transform: translateX(2px); border-color: ${C.primary}77 !important; background: ${C.primary}0B !important; }
        .gowl-ctf-filters select { transition: border-color 0.16s ease, box-shadow 0.16s ease; }
        .gowl-ctf-filters select:focus { outline: none; border-color: ${C.primary}88 !important; box-shadow: 0 0 0 3px ${C.primary}12; }
        .gowl-ctf-detail { box-shadow: 0 18px 40px -34px rgba(0,0,0,0.9); }
        @media (max-width: 860px) {
          .gowl-ctf-hero-grid { grid-template-columns: 1fr; }
          .gowl-ctf-next-wrap { border-left: 0; border-top: 1px solid ${C.line}; }
        }
        @media (prefers-reduced-motion: reduce) {
          .gowl-ai-orb { animation: none; }
        }
        .gowl-glass { backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); background: linear-gradient(165deg, ${C.panel}99, ${C.panel2}80) !important; }
        .gowl-inner-line { position: absolute; top: 0; left: 12px; right: 12px; height: 1px; background: linear-gradient(90deg, transparent, #ffffff22, transparent); pointer-events: none; }
        @keyframes gowl-bar-fill { from { width: 0; } }
        .gowl-bar-fill { animation: gowl-bar-fill 0.8s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes gowl-count-pop { from { transform: scale(0.7); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .gowl-count-pop { animation: gowl-count-pop 0.4s cubic-bezier(.34,1.56,.64,1) both; }
        .gowl-live-dot { position: relative; width: 7px; height: 7px; border-radius: 999px; background: ${C.alert}; display: inline-block; }
        .gowl-live-dot::after { content: ""; position: absolute; inset: -4px; border-radius: 999px; border: 1px solid currentColor; animation: gowl-ping-ring 1.6s ease-out infinite; }
        .gowl-medal-pop { display: inline-block; animation: gowl-count-pop 0.5s cubic-bezier(.34,1.56,.64,1) both; }
        .gowl-profile-stat { transition: transform 0.18s ease, border-color 0.18s ease; }
        .gowl-profile-stat:hover { transform: translateY(-2px); border-color: currentColor; }
        .gowl-activity-row { transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease; }
        .gowl-activity-row:hover { transform: translateX(3px); background: ${C.panel} !important; }
        .gowl-social-link { transition: border-color 0.15s ease, transform 0.15s ease, color 0.15s ease; }
        .gowl-social-link:hover { border-color: ${C.primary}88 !important; color: ${C.primary} !important; transform: translateY(-1px); }
        .gowl-profile-card { transition: border-color 0.2s ease; }
        .gowl-profile-name { background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; color: transparent; }
        .gowl-avatar-swatch { transition: transform 0.15s ease; }
        .gowl-avatar-swatch:hover { transform: translateY(-2px) scale(1.05); }
        .gowl-profile-banner-picker:focus-visible,
        .gowl-profile-avatar-picker:focus-visible { outline: 2px solid ${C.primary}; outline-offset: 2px; }
        .gowl-profile-banner-overlay,
        .gowl-profile-avatar-overlay { opacity: 0; transition: opacity 0.18s ease, backdrop-filter 0.18s ease; }
        .gowl-profile-banner-picker:hover .gowl-profile-banner-overlay,
        .gowl-profile-banner-picker:focus-visible .gowl-profile-banner-overlay,
        .gowl-profile-avatar-picker:hover .gowl-profile-avatar-overlay,
        .gowl-profile-avatar-picker:focus-visible .gowl-profile-avatar-overlay { opacity: 1; }
        .gowl-profile-upload-card { transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease; }
        .gowl-profile-upload-card:hover { transform: translateY(-2px); border-color: ${C.primary}77 !important; background: ${C.primary}0A !important; }
        .gowl-profile-social-field { transition: border-color 0.18s ease, background 0.18s ease; }
        .gowl-profile-social-field:focus-within { border-color: ${C.primary}88 !important; background: ${C.primary}08 !important; }
        .gowl-profile-input:focus { border-color: ${C.primary}88 !important; box-shadow: 0 0 0 3px ${C.primary}14 !important; }
        .gowl-profile-save { transition: transform 0.16s ease, filter 0.16s ease, box-shadow 0.16s ease; }
        .gowl-profile-save:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(1.06); box-shadow: 0 12px 28px -12px ${C.ok} !important; }
        .gowl-profile-badge { display: flex; align-items: center; gap: 9px; min-width: 0; padding: 9px; border-radius: 9px; border: 1px solid ${C.line}; background: ${C.bg}; transition: transform 0.16s ease, border-color 0.16s ease, opacity 0.16s ease; }
        .gowl-profile-badge-icon { width: 30px; height: 30px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; color: var(--badge-color); background: color-mix(in srgb, var(--badge-color) 14%, transparent); border: 1px solid color-mix(in srgb, var(--badge-color) 36%, transparent); }
        .gowl-profile-badge.is-unlocked { border-color: color-mix(in srgb, var(--badge-color) 42%, ${C.line}); box-shadow: inset 2px 0 0 var(--badge-color); }
        .gowl-profile-badge.is-unlocked:hover { transform: translateY(-1px); border-color: var(--badge-color); }
        .gowl-profile-badge.is-locked { opacity: 0.55; filter: grayscale(0.65); }
        .gowl-profile-badge.is-locked .gowl-profile-badge-icon { color: ${C.muted}; }
        .gowl-avatar-clickable { cursor: pointer; transition: transform 0.16s ease, box-shadow 0.16s ease; }
        .gowl-avatar-clickable:hover { transform: translateY(-1px) scale(1.04); box-shadow: 0 0 0 2px ${C.primary}66; }
        .gowl-avatar-frame { isolation: isolate; transition: transform .18s ease, box-shadow .18s ease, filter .18s ease; }
        .gowl-avatar-level-elite, .gowl-avatar-level-legende { animation: gowl-avatar-aura 5s linear infinite; }
        .gowl-avatar-evolution-badge { z-index: 3; }
        @keyframes gowl-avatar-aura { 0% { filter: hue-rotate(0deg) brightness(1); } 50% { filter: hue-rotate(16deg) brightness(1.12); } 100% { filter: hue-rotate(0deg) brightness(1); } }
        @keyframes gowl-streak-flame { 0%, 100% { filter: drop-shadow(0 0 2px ${C.warn}88); transform: translateY(0); } 50% { filter: drop-shadow(0 0 7px ${C.warn}); transform: translateY(-1px); } }
        .gowl-streak svg { animation: gowl-streak-flame 1.7s ease-in-out infinite; }
        @media (hover: none) {
          .gowl-profile-banner-overlay { opacity: 0.72; align-items: flex-end; justify-content: flex-end; padding: 10px; }
          .gowl-profile-banner-overlay > span { padding: 6px 8px !important; font-size: 10px !important; }
          .gowl-profile-avatar-overlay { opacity: 0.72; }
        }
        .gowl-timeline { position: relative; }
        .gowl-notif-bell[data-ring="true"] { position: relative; }
        .gowl-notif-bell[data-ring="true"]::after { content: ""; position: absolute; inset: -3px; border-radius: 10px; border: 1.5px solid ${C.alert}88; animation: gowl-ping-ring 1.8s ease-out infinite; pointer-events: none; }
        .gowl-notif-row { transition: background 0.15s ease, transform 0.15s ease; }
        .gowl-notif-row:hover { transform: translateX(3px); background: ${C.panel2} !important; }
        .gowl-notif-markread { transition: background 0.15s ease, color 0.15s ease; }
        .gowl-notif-markread:hover { background: ${C.primary}1A; }
        .gowl-usermenu-item { all: unset; box-sizing: border-box; display: flex; align-items: center; gap: 9px; width: 100%; padding: 8px 14px; font-size: 13px; font-family: ${BODY_FONT}; color: ${C.text}; cursor: pointer; transition: background 0.15s ease; }
        .gowl-usermenu-item:hover { background: ${C.panel2}; }
        .gowl-usermenu-icon { width: 22px; height: 22px; border-radius: 7px; display: flex; align-items: center; justify-content: center; background: currentColor18; flex-shrink: 0; }
        .gowl-usermenu-icon { background: rgba(255,255,255,0.06); }
        .gowl-usermenu-danger:hover { background: ${C.alert}14; color: ${C.alert}; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-thumb { background: ${C.line}; border-radius: 4px; }
        * { scrollbar-color: ${C.line} transparent; }
        @keyframes gowl-pulse-dot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.7); } }
        @keyframes gowl-ping-ring { 0% { transform: scale(0.9); opacity: 0.7; } 100% { transform: scale(2.2); opacity: 0; } }
        @keyframes gowl-blob-drift { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(20px, -24px) scale(1.08); } 66% { transform: translate(-16px, 14px) scale(0.96); } }
        @keyframes gowl-ticker-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes gowl-fade-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes gowl-glow-pulse { 0%, 100% { box-shadow: 0 0 0 0 ${C.primary}55; } 50% { box-shadow: 0 0 0 6px ${C.primary}00; } }
        .gowl-fade-up { animation: gowl-fade-up 0.5s ease both; }
        .gowl-ticker-track { animation: gowl-ticker-scroll 26s linear infinite; }
        .gowl-ticker-track:hover { animation-play-state: paused; }
        .gowl-navcard { transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease; }
        .gowl-navcard:hover { transform: translateY(-3px); border-color: ${C.primary}88 !important; background: ${C.panel2} !important; }
        .gowl-navcard:hover .gowl-navcard-icon { transform: scale(1.1) rotate(-4deg); }
        .gowl-navcard-icon { transition: transform 0.2s ease; }
        .gowl-cta-glow { animation: gowl-glow-pulse 2.4s ease-in-out infinite; }
        @keyframes gowl-scan-beam { 0% { top: 0%; opacity: 0; } 8% { opacity: 1; } 92% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
        @keyframes gowl-eye-scan { 0%, 100% { transform: translateX(-2.5px); } 50% { transform: translateX(2.5px); } }
        @keyframes gowl-mascot-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
        @keyframes gowl-digit-flicker { 0%, 100% { opacity: var(--gowl-op, 0.3); } 50% { opacity: 0.05; } }
        @keyframes gowl-crow-fly { 0% { transform: translate(-46%, 10px) rotate(-4deg); } 22% { transform: translate(-16%, -20px) rotate(3deg); } 50% { transform: translate(22%, 8px) rotate(-3deg); } 76% { transform: translate(42%, -16px) rotate(4deg); } 100% { transform: translate(-46%, 10px) rotate(-4deg); } }
        @keyframes gowl-wing-flap-left { 0%, 100% { transform: rotate(-8deg); } 50% { transform: rotate(38deg); } }
        @keyframes gowl-wing-flap-right { 0%, 100% { transform: rotate(8deg); } 50% { transform: rotate(-38deg); } }
        .gowl-crow-fly-wrap { position: absolute; left: 50%; top: 40%; margin-left: -44px; margin-top: -44px; animation: gowl-crow-fly 9s ease-in-out infinite; }
        .gowl-wing { transform-box: fill-box; }
        .gowl-wing-left { transform-origin: 88% 50%; animation: gowl-wing-flap-left 0.55s ease-in-out infinite; }
        .gowl-wing-right { transform-origin: 12% 50%; animation: gowl-wing-flap-right 0.55s ease-in-out infinite; }
        .gowl-eye-pupil { animation: gowl-eye-scan 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .gowl-mascot-wrap { animation: gowl-mascot-bob 3.2s ease-in-out infinite; }
        .gowl-digit { animation: gowl-digit-flicker 4s ease-in-out infinite; animation-delay: var(--gowl-delay, 0s); }
        @keyframes gowl-scene-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .gowl-scene-float { animation: gowl-scene-float 3.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        @keyframes gowl-shield-glow { 0%, 100% { filter: drop-shadow(0 0 0px ${C.alert}); } 50% { filter: drop-shadow(0 0 6px ${C.alert}AA); } }
        .gowl-shield-glow { animation: gowl-shield-glow 2.4s ease-in-out infinite; }
        @keyframes gowl-cursor-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.15; } }
        .gowl-cursor-blink { animation: gowl-cursor-blink 1s steps(2) infinite; }

        @keyframes gowl-keyboard-left { 0%,100% { transform: translate(0,0); } 45% { transform: translate(4px,3px); } }
        @keyframes gowl-keyboard-right { 0%,100% { transform: translate(0,0); } 55% { transform: translate(-4px,3px); } }
        .gowl-hacker-hand-left { transform-origin: center; animation: gowl-keyboard-left .72s ease-in-out infinite; }
        .gowl-hacker-hand-right { transform-origin: center; animation: gowl-keyboard-right .64s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .gowl-hacker-hand-left, .gowl-hacker-hand-right { animation: none; } }

        /* --- Barre de navigation --- */
        .gowl-nav-track { background: ${C.bg}A0; border: 1px solid ${C.line}; border-radius: 14px; padding: 5px; scrollbar-width: none; -ms-overflow-style: none; }
        .gowl-nav-track::-webkit-scrollbar { display: none; height: 0; width: 0; }
        .gowl-navtab { position: relative; color: ${C.muted}; transition: color 0.2s ease, background 0.2s ease, transform 0.15s ease; }
        .gowl-navtab:hover { color: ${C.text}; background: ${C.panel2}; transform: translateY(-1px); }
        .gowl-navtab.active { color: #fff; background: linear-gradient(155deg, ${C.primary}, ${C.primary}CC); box-shadow: 0 6px 18px -6px ${C.primary}AA, inset 0 1px 0 #ffffff22; transform: translateY(0); }
        .gowl-navtab.active:hover { color: #fff; transform: translateY(0); }
        .gowl-navtab-mobile { position: relative; transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease; }
        .gowl-navtab-mobile.active { box-shadow: 0 4px 14px -5px ${C.primary}AA; }
        .gowl-moremenu-item { position: relative; background: transparent; border-left: 2px solid transparent; transition: background 0.15s ease, border-color 0.15s ease; }
        .gowl-moremenu-item:hover { background: ${C.panel2}; }
        .gowl-moremenu-item.active { background: ${C.primary}14; border-left: 2px solid ${C.primary}; }
        .gowl-moremenu-item.active:hover { background: ${C.primary}22; }

        /* --- Pied de page --- */
        .gowl-footer-glow { height: 1px; background: linear-gradient(90deg, transparent, ${C.primary}88, ${C.gold}88, ${C.ok}88, transparent); opacity: 0.7; }
        .gowl-footer-logo { transition: transform 0.25s ease, filter 0.25s ease; }
        .gowl-footer-logo:hover { transform: translateY(-1px); filter: drop-shadow(0 0 10px ${C.primary}AA); }
        .gowl-footer-link { position: relative; display: inline-flex; align-items: center; gap: 6px; width: fit-content; transition: color 0.2s ease, transform 0.2s ease; }
        .gowl-footer-link::before { content: ""; width: 0; height: 1px; background: currentColor; transition: width 0.2s ease; }
        .gowl-footer-link:hover { color: ${C.text} !important; transform: translateX(3px); }
        .gowl-footer-link:hover::before { width: 8px; }
        .gowl-footer-mail { position: relative; display: inline-flex; align-items: center; gap: 7px; padding: 7px 12px; border-radius: 8px; border: 1px solid ${C.line}; background: ${C.bg}66; transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease; }
        .gowl-footer-mail:hover { border-color: ${C.primary}88; background: ${C.primary}12; transform: translateY(-1px); }
        .gowl-footer-social { width: 34px; height: 34px; border-radius: 9px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid ${C.line}; color: ${C.muted}; transition: all 0.2s ease; }
        .gowl-footer-social:hover { color: ${C.text}; border-color: currentColor; background: ${C.panel2}; transform: translateY(-2px); }
        .gowl-footer-totop { width: 34px; height: 34px; border-radius: 9px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid ${C.line}; color: ${C.muted}; transition: all 0.2s ease; }
        .gowl-footer-totop:hover { color: ${C.text}; border-color: ${C.primary}88; background: ${C.primary}14; transform: translateY(-2px); }

        /* --- Salon Question : filtres + cartes --- */
        .gowl-qfilter { all: unset; box-sizing: border-box; display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; cursor: pointer; color: ${C.muted}; border: 1px solid ${C.line}; background: transparent; font-family: ${BODY_FONT}; transition: all 0.15s ease; }
        .gowl-qfilter:hover { color: ${C.text}; border-color: var(--gowl-accent); }
        .gowl-qfilter[data-active="true"] { color: #fff; background: var(--gowl-accent); border-color: var(--gowl-accent); }
        .gowl-qfilter-count { font-family: ${MONO_FONT}; font-size: 11px; opacity: 0.85; }
        .gowl-qcard { position: relative; }
        .gowl-qcard-resolved { position: absolute; top: 0; right: 0; display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px 4px 9px; font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: ${C.ok}; background: ${C.ok}1E; border-left: 1px solid ${C.ok}55; border-bottom: 1px solid ${C.ok}55; border-radius: 0 0 0 10px; font-family: ${MONO_FONT}; z-index: 2; }
        .gowl-qtitle { font-size: 15px; font-weight: 700; line-height: 1.35; color: ${C.text}; font-family: ${DISPLAY_FONT}; transition: color 0.15s ease; }
        .gowl-qcard:hover .gowl-qtitle { color: var(--gowl-accent); }
        .gowl-qtoggle { width: 26px; height: 26px; display: inline-flex; align-items: center; justify-content: center; border-radius: 7px; transition: background 0.15s ease, color 0.15s ease; }
        .gowl-qtoggle:hover { background: ${C.panel2}; color: ${C.text}; }
        .gowl-qstat { display: inline-flex; align-items: center; gap: 5px; font-size: 11.5px; padding: 4px 9px; border-radius: 999px; background: ${C.bg}66; border: 1px solid ${C.line}; color: ${C.muted}; font-family: ${MONO_FONT}; }
        .gowl-qthread { border-top: 1px solid ${C.line}; background: ${C.bg}40; }
        .gowl-qanswer { display: flex; align-items: flex-start; gap: 10px; padding: 10px 12px; border-radius: 10px; background: ${C.panel2}88; border: 1px solid ${C.line}; }
        .gowl-qcomposer { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 12px; background: ${C.panel2}CC; border: 1px solid ${C.line}; }
        .gowl-qcomposer:focus-within { border-color: ${C.primary}77; box-shadow: 0 0 0 3px ${C.primary}1A; }

        /* --- Hub : liste des salons + fil de discussion --- */
        .gowl-hub-roomitem { all: unset; box-sizing: border-box; display: flex; align-items: center; gap: 8px; padding: 8px 9px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; color: ${C.muted}; white-space: nowrap; transition: background 0.15s ease, color 0.15s ease; font-family: ${BODY_FONT}; }
        .gowl-hub-roomitem:hover { background: ${C.panel2}; color: ${C.text}; }
        .gowl-hub-roomitem[data-active="true"] { background: linear-gradient(155deg, ${C.primary}26, ${C.primary}10); color: ${C.text}; box-shadow: inset 2px 0 0 ${C.primary}; }
        .gowl-hub-roomitem-icon { display: inline-flex; opacity: 0.85; }
        .gowl-hub-roomitem-label { flex: 1; overflow: hidden; text-overflow: ellipsis; text-align: left; }
        .gowl-hub-roomitem-count { font-family: ${MONO_FONT}; font-size: 10.5px; padding: 1px 6px; border-radius: 999px; background: ${C.bg}88; color: ${C.muted}; }
        .gowl-hub-header { display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-bottom: 1px solid ${C.line}; background: linear-gradient(135deg, ${C.primary}10, ${C.panel2}); }
        .gowl-hub-header-icon { width: 32px; height: 32px; border-radius: 9px; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .gowl-hub-header-tag { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; padding: 1px 7px; border-radius: 999px; border: 1px solid; font-family: ${MONO_FONT}; }
        .gowl-hub-header-live { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; color: ${C.muted}; font-family: ${MONO_FONT}; flex-shrink: 0; }
        @keyframes gowl-msg-in { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        .gowl-hub-msg { display: flex; align-items: flex-start; gap: 12px; padding: 3px 14px; border-radius: 10px; position: relative; transition: background 0.1s ease; animation: gowl-msg-in 0.15s ease; }
        .gowl-hub-msg:hover { background: ${C.panel2}75; }
        .gowl-hub-msg[data-grouped="false"] { margin-top: 10px; padding-bottom: 1px; }
        .gowl-hub-msg[data-grouped="true"] { margin-top: -1px; padding-top: 0; padding-bottom: 0; }
        .gowl-hub-msg-gutter { width: 30px; flex-shrink: 0; display: flex; align-items: flex-start; justify-content: center; padding-top: 2px; }
        .gowl-hub-msg-hovertime { display: block; width: 100%; text-align: center; font-size: 9.5px; line-height: 1.4; color: ${C.muted}; font-family: ${MONO_FONT}; opacity: 0; padding-top: 2px; }
        .gowl-hub-msg:hover .gowl-hub-msg-hovertime { opacity: 1; }
        .gowl-hub-msg-author { display: flex; align-items: baseline; gap: 7px; margin-bottom: 2px; }
        .gowl-hub-msg-bubble { display: block; width: fit-content; padding: 7px 10px; margin: 0; background: ${C.panel2}; border: 1px solid ${C.line}; border-radius: 4px 12px 12px 12px; box-shadow: inset 0 1px 0 rgba(255,255,255,0.025); color: ${C.text}; font-size: 14px; line-height: 1.45; font-family: ${BODY_FONT}; max-width: min(100%, 720px); word-break: break-word; white-space: pre-wrap; }
        .gowl-hub-msg[data-grouped="true"] .gowl-hub-msg-bubble { padding-top: 3px; padding-bottom: 3px; line-height: 1.32; border-radius: 7px 12px 12px 7px; }
        .gowl-hub-msg[data-grouped="true"] .gowl-hub-msg-gutter { padding-top: 3px; }
        .gowl-hub-msg[data-self="true"] .gowl-hub-msg-bubble { background: ${C.primary}14; border-color: ${C.primary}35; box-shadow: inset 2px 0 0 ${C.primary}88; }
        .gowl-hub-msg-hoveractions { position: absolute; top: -14px; right: 14px; display: inline-flex; gap: 2px; background: ${C.panel2}; border: 1px solid ${C.line}; border-radius: 8px; padding: 3px; box-shadow: 0 4px 12px rgba(0,0,0,0.4); z-index: 1; }
        .gowl-hub-msg-action { all: unset; box-sizing: border-box; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 6px; transition: background 0.15s ease, color 0.15s ease; }
        .gowl-hub-msg-action:hover { background: ${C.bg}88; }
        .gowl-hub-msg-edit { max-width: min(100%, 560px); }
        .gowl-hub-reaction { all: unset; box-sizing: border-box; display: inline-flex; align-items: center; gap: 5px; font-size: 12px; padding: 2px 8px; border-radius: 999px; cursor: pointer; background: ${C.panel2}; border: 1px solid ${C.line}; color: ${C.text}; font-family: ${MONO_FONT}; transition: all 0.15s ease; }
        .gowl-hub-reaction[data-active="true"] { background: ${C.primary}22; border-color: ${C.primary}; }
        .gowl-hub-reaction:hover { border-color: ${C.primary}88; }
        .gowl-hub-reaction-picker { display: inline-flex; gap: 3px; }
        .gowl-hub-reaction-add { all: unset; box-sizing: border-box; cursor: pointer; font-size: 12px; padding: 2px 6px; border-radius: 999px; border: 1px solid ${C.line}; opacity: 0.65; transition: all 0.15s ease; }
        .gowl-hub-reaction-add:hover { opacity: 1; background: ${C.panel2}; transform: scale(1.08); }

        /* --- Hub : barre de saisie dans le style du site --- */
        .gowl-hub-composer { position: relative; display: flex; align-items: flex-end; gap: 6px; padding: 7px 8px; border-radius: 13px; background: ${C.panel2}; border: 1px solid ${C.line}; box-shadow: inset 0 1px 0 rgba(255,255,255,0.03); transition: border-color 0.15s ease, box-shadow 0.15s ease; }
        .gowl-hub-composer:focus-within { border-color: ${C.primary}77; box-shadow: 0 0 0 3px ${C.primary}1A; }
        .gowl-hub-composer-icon { all: unset; box-sizing: border-box; display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 8px; color: ${C.muted}; cursor: pointer; flex-shrink: 0; transition: background 0.15s ease, color 0.15s ease; }
        .gowl-hub-composer-icon:hover { background: ${C.bg}66; color: ${C.text}; }
        .gowl-hub-composer-input { flex: 1; min-width: 0; min-height: 34px; max-height: 110px; resize: none; background: transparent !important; border: none !important; outline: none; box-shadow: none !important; color: ${C.text}; font-size: 14px; line-height: 1.4; font-family: ${BODY_FONT}; padding: 7px 3px; }
        .gowl-hub-composer-input::placeholder { color: ${C.muted}; }
        .gowl-hub-composer-input:disabled { cursor: not-allowed; }
        .gowl-hub-composer-send { all: unset; box-sizing: border-box; display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 8px; background: ${C.primary}; color: #fff; cursor: pointer; flex-shrink: 0; opacity: 0.4; transition: opacity 0.15s ease, transform 0.1s ease; }
        .gowl-hub-composer-send:hover { opacity: 0.85; }
        .gowl-hub-composer-send[data-active="true"] { opacity: 1; }
        .gowl-hub-composer-send[data-active="true"]:hover { opacity: 0.9; }
        .gowl-hub-composer-send:active { transform: scale(0.94); }

        /* --- Hub : sélecteur de logo de salon --- */
        .gowl-roomicon-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; max-width: 320px; }
        .gowl-roomicon-btn { all: unset; box-sizing: border-box; display: flex; align-items: center; justify-content: center; width: 100%; aspect-ratio: 1; border-radius: 9px; cursor: pointer; color: ${C.muted}; background: ${C.bg}66; border: 1px solid ${C.line}; transition: all 0.15s ease; }
        .gowl-roomicon-btn:hover { color: var(--gowl-accent); border-color: var(--gowl-accent); }
        .gowl-roomicon-btn[data-active="true"] { color: var(--gowl-accent); background: var(--gowl-accent); background: color-mix(in srgb, var(--gowl-accent) 18%, ${C.bg}); border-color: var(--gowl-accent); box-shadow: 0 0 0 1px var(--gowl-accent); }

        /* --- Hub : état vide sobre --- */
        .gowl-hub-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px 20px; }
        .gowl-hub-empty-icon { width: 42px; height: 42px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 12px; color: ${C.muted}; background: ${C.panel2}; border: 1px solid ${C.line}; }
        .gowl-hub-empty-title { font-size: 13.5px; font-weight: 600; color: ${C.text}; font-family: ${BODY_FONT}; margin: 0 0 3px; }
        .gowl-hub-empty-sub { font-size: 12px; color: ${C.muted}; font-family: ${BODY_FONT}; margin: 0; }
        /* --- Recherche globale --- */
@keyframes gowl-search-in { from { opacity: 0; transform: translateY(-8px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes gowl-search-glow-pulse { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
@keyframes gowl-search-scan-move { 0% { background-position: 0 -40px; } 100% { background-position: 0 160px; } }
@keyframes gowl-search-line-in { from { opacity: 0; transform: translateX(-4px); } to { opacity: 1; transform: translateX(0); } }
@keyframes gowl-search-row-in { from { opacity: 0; transform: translateY(3px); } to { opacity: 1; transform: translateY(0); } }
.gowl-search-overlay { position: fixed; inset: 0; z-index: 9999; display: flex; align-items: flex-start; justify-content: center; padding: 20px 12px; background: radial-gradient(600px 380px at 50% 0%, rgba(20,26,20,0.55), rgba(5,6,10,0.82) 60%); backdrop-filter: blur(3px); isolation: isolate; }
.gowl-search-modal { width: 100%; max-width: 620px; max-height: 82vh; display: flex; flex-direction: column; overflow: hidden; border-radius: 16px; background: ${C.bg}; border: 1px solid ${C.line}; box-shadow: 0 24px 60px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.03), 0 0 46px -16px ${C.ok}3D; animation: gowl-search-in 0.18s ease both; margin-top: 24px; position: relative; }
.gowl-search-modal::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, ${C.ok}, ${C.primary}, transparent); opacity: 0.7; }
.gowl-search-bar { display: flex; align-items: center; gap: 10px; padding: 14px 16px; border-bottom: 1px solid ${C.line}; background: linear-gradient(155deg, ${C.primary}10, transparent); flex-shrink: 0; transition: background 0.2s ease; }
.gowl-search-bar:focus-within { background: linear-gradient(155deg, ${C.ok}14, transparent); }
.gowl-search-bar-icon { display: inline-flex; align-items: center; justify-content: center; color: ${C.primary}; flex-shrink: 0; transition: color 0.2s ease; }
.gowl-search-bar:focus-within .gowl-search-bar-icon { color: ${C.ok}; }
.gowl-search-input { flex: 1; min-width: 0; background: transparent; border: none; outline: none; font-size: 15px; color: ${C.text}; font-family: ${BODY_FONT}; }
.gowl-search-input::placeholder { color: ${C.muted}; }
.gowl-search-clear { all: unset; box-sizing: border-box; display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 999px; color: ${C.muted}; cursor: pointer; flex-shrink: 0; transition: background 0.15s ease, color 0.15s ease; }
.gowl-search-clear:hover { background: ${C.panel2}; color: ${C.text}; }
.gowl-search-close { all: unset; box-sizing: border-box; display: inline-flex; align-items: center; justify-content: center; padding: 4px 9px; border-radius: 7px; font-size: 11px; font-weight: 600; color: ${C.muted}; background: ${C.panel2}; border: 1px solid ${C.line}; cursor: pointer; font-family: ${MONO_FONT}; flex-shrink: 0; transition: all 0.15s ease; }
.gowl-search-close:hover { color: ${C.text}; border-color: ${C.primary}88; }
.gowl-search-body { overflow-y: auto; padding: 10px; }
.gowl-search-hint { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; text-align: center; padding: 40px 20px 34px; color: ${C.muted}; }
.gowl-search-hint-icon { opacity: 0.5; margin-bottom: 10px; }
.gowl-search-hint p { margin: 0; font-size: 13px; font-family: ${BODY_FONT}; }
.gowl-search-results { display: flex; flex-direction: column; gap: 4px; }
.gowl-search-result { all: unset; box-sizing: border-box; display: flex; align-items: center; gap: 12px; width: 100%; padding: 10px 11px; border-radius: 10px; cursor: pointer; background: transparent; border: 1px solid transparent; border-left: 2px solid transparent; transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease; animation: gowl-search-row-in 0.16s ease both; }
.gowl-search-result:hover { background: ${C.panel2}; border-color: var(--gowl-accent, ${C.line}); }
.gowl-search-result[data-active="true"] { border-left-color: var(--gowl-accent, ${C.primary}); transform: translateX(1px); }
.gowl-search-result-icon { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 9px; flex-shrink: 0; background: color-mix(in srgb, var(--gowl-accent, ${C.primary}) 14%, transparent); color: var(--gowl-accent, ${C.primary}); }
.gowl-search-result-text { min-width: 0; flex: 1; display: flex; flex-direction: column; gap: 1px; }
.gowl-search-result-title { font-size: 13.5px; font-weight: 600; color: ${C.text}; font-family: ${BODY_FONT}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.gowl-search-result-sub { font-size: 11px; color: ${C.muted}; font-family: ${MONO_FONT}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.gowl-search-result-arrow { color: ${C.muted}; opacity: 0; transform: translateX(-3px); transition: all 0.15s ease; flex-shrink: 0; }
.gowl-search-result:hover .gowl-search-result-arrow { opacity: 1; transform: translateX(0); color: var(--gowl-accent, ${C.text}); }
.gowl-search-trigger { all: unset; box-sizing: border-box; display: inline-flex; align-items: center; gap: 8px; height: 36px; padding: 0 12px; border-radius: 9px; cursor: pointer; background: ${C.panel2}; border: 1px solid ${C.line}; color: ${C.muted}; font-family: ${BODY_FONT}; font-size: 12.5px; transition: all 0.15s ease; }
.gowl-search-trigger:hover { color: ${C.text}; border-color: ${C.primary}77; }
.gowl-search-trigger-kbd { font-family: ${MONO_FONT}; font-size: 10px; padding: 1px 6px; border-radius: 5px; background: ${C.bg}88; border: 1px solid ${C.line}; }
.gowl-search-filters { display: flex; align-items: center; gap: 6px; padding: 10px 16px; overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none; flex-shrink: 0; border-bottom: 1px solid ${C.line}66; }
.gowl-search-filters::-webkit-scrollbar { display: none; height: 0; }
.gowl-search-filter { all: unset; box-sizing: border-box; display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 999px; cursor: pointer; font-size: 11px; font-weight: 600; font-family: ${MONO_FONT}; white-space: nowrap; color: ${C.muted}; background: transparent; border: 1px solid ${C.line}; transition: all 0.15s ease; }
.gowl-search-filter:hover { color: ${C.text}; border-color: var(--gowl-accent, ${C.line}); }
.gowl-search-filter[data-active="true"] { color: var(--gowl-accent, ${C.primary}); background: color-mix(in srgb, var(--gowl-accent, ${C.primary}) 16%, transparent); border-color: var(--gowl-accent, ${C.primary}); box-shadow: 0 0 0 1px var(--gowl-accent, ${C.primary}) inset; }
.gowl-search-count { font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: ${C.ok}; font-family: ${MONO_FONT}; padding: 10px 6px 6px; margin: 0; }
.gowl-search-hint-kbd { display: flex; align-items: center; justify-content: center; gap: 4px; margin-top: 8px; font-size: 10.5px; color: ${C.muted}; opacity: 0.75; font-family: ${MONO_FONT}; }
.gowl-search-footer { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 8px 14px; border-top: 1px solid ${C.line}66; background: ${C.bg}88; flex-shrink: 0; font-family: ${MONO_FONT}; font-size: 10px; color: ${C.muted}; }
.gowl-search-footer kbd { font-family: ${MONO_FONT}; font-size: 9.5px; padding: 1px 5px; border-radius: 4px; background: ${C.panel2}; border: 1px solid ${C.line}; color: ${C.text}; }
.gowl-search-term-glow { animation: gowl-search-glow-pulse 2.4s ease-in-out infinite; }
.gowl-search-term-scan { position: absolute; inset: 0; pointer-events: none; opacity: 0.06; background: repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px); animation: gowl-search-scan-move 5s linear infinite; }
.gowl-search-term-line { animation: gowl-search-line-in 0.3s ease both; }
      `}</style>

      <header
        className="sticky top-0 z-30"
        style={{
          background: `${C.bg}F2`,
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${C.line}`,
          boxShadow:
            "0 1px 0 rgba(0,0,0,0.4), 0 8px 24px -16px rgba(0,0,0,0.6)",
        }}
      >
        <div
          aria-hidden
          style={{
            height: 2,
            background: `linear-gradient(90deg, ${C.primary}, ${C.gold}, ${C.ok})`,
            opacity: 0.7,
          }}
        />
        <div className="max-w-[1600px] mx-auto px-5 lg:px-8 h-[78px] flex items-center justify-center gap-1.5">
          <div className="flex items-center gap-6 min-w-0">
            <button
              onClick={() => setTab("accueil")}
              className="flex items-center gap-3 shrink-0 group"
            >
              <img
                src={owlLogoImg}
                alt="Logo GowlSec"
                className="w-11 h-11 object-contain shrink-0 transition-transform group-hover:scale-105"
              />
              <span className="flex flex-col leading-none">
                <span
                  className="font-extrabold text-xl tracking-tight"
                  style={{ color: C.text, fontFamily: DISPLAY_FONT }}
                >
                  GowlSec
                </span>
                <span
                  className="text-[10px] uppercase tracking-widest"
                  style={{ color: C.muted, fontFamily: MONO_FONT }}
                >
                  {L("tagline")}
                </span>
              </span>
            </button>
            <span
              className="hidden lg:block w-px h-8 shrink-0"
              style={{ background: C.line }}
            />
            <div className="hidden md:flex items-center gap-1.5 min-w-0">
              <nav className="flex items-center gap-0.5 overflow-x-auto gowl-nav-track min-w-0">
                {TABS.filter((t) => t.key !== "admin" && t.primary).map((t) => {
                  const active = tab === t.key;
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.key}
                      onClick={() => setTab(t.key)}
                      className={`gowl-navtab flex items-center gap-1.5 px-2.5 py-2 text-[13px] font-semibold whitespace-nowrap rounded-lg${active ? " active" : ""}`}
                      style={{ fontFamily: BODY_FONT }}
                    >
                      {Icon && <Icon size={13} />}
                      {I18N[lang || "fr"].tabs[t.key] || t.label}
                    </button>
                  );
                })}
                <NavMoreMenu
                  tabs={TABS.filter((t) => t.key !== "admin" && !t.primary)}
                  tab={tab}
                  setTab={setTab}
                  lang={lang}
                />
              </nav>
              <button
                onClick={() => setSearchOpen(true)}
                className="gowl-search-trigger shrink-0"
                style={{ padding: 0, width: 36, justifyContent: "center" }}
                title="Rechercher"
              >
                <Search size={15} />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <NotificationBell
              currentUser={currentUser}
              questions={questions}
              teams={teams}
              labs={labs}
              notifications={notifications}
              setTab={setTab}
            />
            <AuthWidget
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              profiles={profiles}
              setProfiles={setProfiles}
              credentials={credentials}
              setCredentials={setCredentials}
              setTab={setTab}
            />
            {isAdmin && (
              <button
                onClick={() => setTab("admin")}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold"
                style={{
                  background: `${C.gold}14`,
                  border: `1px solid ${C.gold}44`,
                  color: C.gold,
                  fontFamily: MONO_FONT,
                }}
              >
                <Cpu size={12} /> {L("admin")}
              </button>
            )}
            <div
              className="hidden sm:flex items-center gap-2.5 pr-2.5"
              style={{ borderRight: `1px solid ${C.line}` }}
            >
              <OnlineIndicator />
            </div>
            <LangSwitcher lang={lang || "fr"} onChoose={chooseLang} />
          </div>
        </div>
        <nav
          className="md:hidden flex items-center gap-1.5 px-5 pb-3 overflow-x-auto gowl-nav-track"
          style={{ background: "transparent", border: "none", padding: 0 }}
        >
          {TABS.map((t) => {
            const active = tab === t.key;
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`gowl-navtab-mobile flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-semibold rounded-lg whitespace-nowrap${active ? " active" : ""}`}
                style={{
                  color: active ? "#fff" : C.muted,
                  background: active
                    ? `linear-gradient(155deg, ${C.primary}, ${C.primary}CC)`
                    : C.panel,
                  border: `1px solid ${active ? C.primary : C.line}`,
                  fontFamily: BODY_FONT,
                }}
              >
                {Icon && <Icon size={13} />}
                {I18N[lang || "fr"].tabs[t.key] || t.label}
              </button>
            );
          })}
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-5 lg:px-8 py-10">
        {loading ? (
          <div
            className="flex items-center justify-center py-24 gap-2 text-sm"
            style={{ color: C.muted, fontFamily: BODY_FONT }}
          >
            <RefreshCw size={14} className="animate-spin" /> Chargement…
          </div>
        ) : (
          <>
            {tab === "accueil" && (
              <>
                <WeeklyChallengeCard />
                <ProfessionalHome
                  L={L}
                  setTab={setTab}
                  profiles={profiles}
                  memberCount={memberCount}
                  liveCount={liveCount}
                  news={news}
                  questions={questions}
                  trophies={trophies}
                  teams={teams}
                  labs={labs}
                  events={events}
                />
              </>
            )}
            {tab === "actus" && (
              <NewsTab
                news={news}
                setNews={setNews}
                isAdmin={isAdmin}
                profiles={profiles}
                notifications={notifications}
                setNotifications={setNotifications}
                currentUser={user}
                teams={teams}
                setTab={setTab}
                full
              />
            )}
            {tab === "forum" && (
              <ForumTab
                pseudo={pseudo}
                questions={questions}
                setQuestions={setQuestions}
                isAdmin={isAdmin}
                lang={lang || "fr"}
                currentUser={currentUser}
                profiles={profiles}
              />
            )}
            {tab === "salons" && (
              <>
                <HubPolls currentUser={currentUser} />
                <RoomsTab
                  pseudo={pseudo}
                  messages={messages}
                  setMessages={setMessages}
                  isAdmin={isAdmin}
                  lang={lang || "fr"}
                  profiles={profiles}
                  currentUser={currentUser}
                />
              </>
            )}
            {tab === "messages" && (
              <DirectMessagesTab
                currentUser={currentUser}
                profiles={profiles}
                initialTarget={directMessageTarget}
                onTargetHandled={() => setDirectMessageTarget("")}
              />
            )}
            {tab === "equipes" && (
              <TeamsTab
                pseudo={pseudo}
                teams={teams}
                setTeams={setTeams}
                announcements={teamAnnouncements}
                setAnnouncements={setTeamAnnouncements}
                isAdmin={isAdmin}
                lang={lang || "fr"}
                currentUser={currentUser}
              />
            )}
            {tab === "coequipiers" && (
              <TeamFinderTab
                currentUser={currentUser}
                teams={teams}
                onMessage={(username) => {
                  setDirectMessageTarget(username);
                  setTab("messages");
                }}
              />
            )}
            {tab === "labs" && (
              <LabsTab
                pseudo={pseudo}
                labs={labs}
                setLabs={setLabs}
                labMessages={labMessages}
                setLabMessages={setLabMessages}
                isAdmin={isAdmin}
                lang={lang || "fr"}
                currentUser={currentUser}
              />
            )}
            {tab === "classement" && (
              <LeaderboardTab
                questions={questions}
                trophies={trophies}
                labs={labs}
                teams={teams}
                profiles={profiles}
                currentUser={currentUser}
              />
            )}
            {tab === "trophies" && (
              <TrophyTab
                pseudo={pseudo}
                trophies={trophies}
                setTrophies={setTrophies}
                isAdmin={isAdmin}
                currentUser={currentUser}
              />
            )}
            {tab === "writeups" && (
              <WriteupsTab
                pseudo={pseudo}
                writeups={writeups}
                setWriteups={setWriteups}
                isAdmin={isAdmin}
                currentUser={currentUser}
              />
            )}
            {tab === "evenements" && (
              <EventsTab
                pseudo={pseudo}
                events={events}
                setEvents={setEvents}
                isAdmin={isAdmin}
                currentUser={currentUser}
              />
            )}
            {tab === "parcours" && (
              <LearningPathsTab currentUser={currentUser} setTab={setTab} />
            )}
            {tab === "boutique" && <ShopTab setTab={setTab} />}
            {tab === "assistant" && <AIAssistantTab setTab={setTab} />}
            {tab === "support" && <SupportTab setTab={setTab} />}
            {tab === "terms" && (
              <LegalInformationPage type="terms" setTab={setTab} />
            )}
            {tab === "legal" && (
              <LegalInformationPage type="legal" setTab={setTab} />
            )}
            {tab === "privacy" && (
              <LegalInformationPage type="privacy" setTab={setTab} />
            )}
            {tab === "profil" && (
              <ProtectedTab>
                <ProfileTab
                  currentUser={user}
                  setCurrentUser={setUser}
                  profiles={profiles}
                  setProfiles={setProfiles}
                  questions={questions}
                  trophies={trophies}
                  labs={labs}
                  teams={teams}
                  messages={messages}
                  setTab={setTab}
                />{" "}
              </ProtectedTab>
            )}
            {tab === "admin" &&
              (user?.role === "admin" ? (
                <>
                  <AdminTab
                    isAdmin={isAdmin}
                    setIsAdmin={setIsAdmin}
                    questions={questions}
                    setQuestions={setQuestions}
                    messages={messages}
                    setMessages={setMessages}
                    trophies={trophies}
                    setTrophies={setTrophies}
                    writeups={writeups}
                    setWriteups={setWriteups}
                    events={events}
                    setEvents={setEvents}
                    profiles={profiles}
                    setProfiles={setProfiles}
                    teams={teams}
                    setTeams={setTeams}
                    teamAnnouncements={teamAnnouncements}
                    setTeamAnnouncements={setTeamAnnouncements}
                    orders={orders}
                    setOrders={setOrders}
                    labs={labs}
                    setLabs={setLabs}
                    labMessages={labMessages}
                    setLabMessages={setLabMessages}
                    tickets={tickets}
                    setTickets={setTickets}
                    supportThreads={supportThreads}
                    setSupportThreads={setSupportThreads}
                    currentUser={user}
                    news={news}
                    setNews={setNews}
                  />
                  <SocialAdminPanel
                    profiles={profiles}
                    setProfiles={setProfiles}
                    teams={teams}
                  />
                </>
              ) : (
                <div
                  style={{
                    padding: "40px",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  <h2>Accès refusé</h2>
                  <p>
                    Vous devez être administrateur pour accéder à cette page.
                  </p>
                </div>
              ))}
          </>
        )}
      </main>

      {tab === "accueil" && (
        <footer className="max-w-7xl mx-auto px-5 lg:px-8 py-8 mt-10">
          <div aria-hidden className="gowl-footer-glow rounded-full mb-8" />
          <div
            className="rounded-2xl border p-6 sm:p-7 relative overflow-hidden"
            style={{
              background: `linear-gradient(155deg, ${C.bg} 0%, ${C.panel} 100%)`,
              borderColor: C.line,
              boxShadow: `0 30px 70px -30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.03)`,
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `radial-gradient(${C.line}55 1px, transparent 1px)`,
                backgroundSize: "26px 26px",
                opacity: 0.35,
                pointerEvents: "none",
              }}
            />
            <div
              aria-hidden
              style={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 220,
                height: 220,
                borderRadius: "50%",
                background: `${C.primary}1A`,
                filter: "blur(56px)",
                pointerEvents: "none",
              }}
            />
            <div
              aria-hidden
              style={{
                position: "absolute",
                bottom: -70,
                left: -50,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: `${C.ok}12`,
                filter: "blur(56px)",
                pointerEvents: "none",
              }}
            />
            <div className="grid gap-7 md:grid-cols-[1.3fr_0.8fr_0.8fr] relative">
              <div>
                <div className="flex items-center gap-2.5 mb-3 gowl-footer-logo w-fit">
                  <img
                    src={owlLogoImg}
                    alt="Logo GowlSec"
                    className="w-6 h-6 object-contain"
                  />
                  <p
                    className="text-base font-bold uppercase tracking-[0.24em]"
                    style={{ color: C.text, fontFamily: MONO_FONT }}
                  >
                    GowlSec
                  </p>
                </div>
                <p
                  className="text-sm leading-6 max-w-xs mb-4"
                  style={{ color: C.muted, fontFamily: BODY_FONT }}
                >
                  {L("footer")}
                </p>
                <a
                  href="mailto:GowlSec@proton.me"
                  className="gowl-footer-mail text-sm w-fit"
                  style={{ color: C.text, fontFamily: MONO_FONT }}
                >
                  <Mail size={14} style={{ color: C.primary }} />{" "}
                  GowlSec@proton.me
                </a>
              </div>

              <div>
                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.24em] mb-3.5"
                  style={{ color: C.muted, fontFamily: MONO_FONT }}
                >
                  Explorer
                </p>
                <div className="flex flex-col items-start gap-3">
                  {[
                    { label: "CTFNews", tab: "actus" },
                    { label: "Questions", tab: "forum" },
                    { label: "Hub", tab: "salons" },
                    { label: "Labs", tab: "labs" },
                    { label: "Support", tab: "support" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setTab(item.tab)}
                      className="gowl-footer-link text-sm"
                      style={{ color: C.text, fontFamily: MONO_FONT }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.24em] mb-3.5"
                  style={{ color: C.muted, fontFamily: MONO_FONT }}
                >
                  Infos
                </p>
                <div
                  className="flex flex-col items-start gap-3 text-sm"
                  style={{ color: C.muted, fontFamily: MONO_FONT }}
                >
                  <button
                    type="button"
                    onClick={() => setTab("terms")}
                    className="gowl-footer-link text-sm"
                    style={{ color: C.muted }}
                  >
                    Conditions d'utilisation
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab("legal")}
                    className="gowl-footer-link text-sm"
                    style={{ color: C.muted }}
                  >
                    Mentions légales
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab("privacy")}
                    className="gowl-footer-link text-sm"
                    style={{ color: C.muted }}
                  >
                    Politique de confidentialité
                  </button>
                </div>
              </div>
            </div>

            <div
              className="flex items-center justify-between gap-4 mt-7 pt-5 relative"
              style={{ borderTop: `1px solid ${C.line}` }}
            >
              <p
                className="text-xs"
                style={{ color: C.muted, fontFamily: MONO_FONT }}
              >
                © {new Date().getFullYear()} GowlSec — fait avec 🦉 pour la
                communauté
              </p>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="gowl-footer-totop"
                title="Retour en haut"
              >
                <ChevronUp size={16} />
              </button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------
   Terminal de recherche — visuel de l'état vide de la modale de recherche
--------------------------------------------------------------------- */
function SearchTerminalIcon() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute inset-0 rounded-2xl gowl-search-term-glow"
        style={{
          background: `radial-gradient(circle, ${C.ok}33, transparent 70%)`,
          filter: "blur(14px)",
          transform: "scale(1.6)",
        }}
      />
      <div
        className="relative rounded-xl overflow-hidden gowl-search-term"
        style={{
          width: 208,
          background: "#0A0C10",
          border: `1px solid ${C.line}`,
          boxShadow: `0 18px 40px -18px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.02)`,
        }}
      >
        <div aria-hidden className="gowl-search-term-scan" />
        <div
          className="flex items-center gap-1.5 px-2.5 py-1.5 relative"
          style={{
            borderBottom: `1px solid ${C.line}`,
            background: `${C.bg}CC`,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: 999,
              background: C.alert,
              opacity: 0.85,
            }}
          />
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: 999,
              background: C.warn,
              opacity: 0.85,
            }}
          />
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: 999,
              background: C.ok,
              opacity: 0.85,
            }}
          />
          <span
            style={{
              fontFamily: MONO_FONT,
              fontSize: 9.5,
              letterSpacing: "0.06em",
              color: C.muted,
              marginLeft: 4,
            }}
          >
            gowlsec@search
          </span>
          <Terminal size={11} style={{ color: C.muted, marginLeft: "auto" }} />
        </div>
        <div
          className="px-2.5 py-2.5 relative"
          style={{ fontFamily: MONO_FONT, fontSize: 10.5, lineHeight: 1.75 }}
        >
          <p style={{ color: C.muted, margin: 0 }}>
            $ gowlsec --search --index=all
          </p>
          <p
            className="gowl-search-term-line"
            style={{ color: C.primary, margin: 0, animationDelay: "0.15s" }}
          >
            &gt; forum · teams · labs · actus · trophées
          </p>
          <p
            className="gowl-search-term-line"
            style={{ color: C.muted, margin: 0, animationDelay: "0.35s" }}
          >
            &gt; index chargé, 0 requête active
          </p>
          <p
            className="gowl-search-term-line"
            style={{ color: C.ok, margin: 0, animationDelay: "0.55s" }}
          >
            &gt; en attente de requête
            <span className="gowl-cursor-blink">_</span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------
   Mascotte corbeau — "fouille" la base de données (visuel central accueil)
--------------------------------------------------------------------- */
function CrowSearchMascot() {
  return (
    <div className="gowl-mascot-wrap relative">
      <div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${C.ok}33, transparent 70%)`,
          filter: "blur(6px)",
          transform: "scale(1.6)",
        }}
      />
      <svg
        width="88"
        height="88"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative"
        overflow="visible"
      >
        <path
          className="gowl-wing gowl-wing-left"
          d="M27 48 C10 40 -2 44 2 57 C6 68 18 68 28 60 Z"
          fill={C.ok}
          opacity="0.9"
        />
        <path
          className="gowl-wing gowl-wing-right"
          d="M73 48 C90 40 102 44 98 57 C94 68 82 68 72 60 Z"
          fill={C.ok}
          opacity="0.9"
        />
        <path d="M50 18 C44 6 34 4 26 9 C36 9 41 14 44 22 Z" fill={C.ok} />
        <path d="M50 18 C56 6 66 4 74 9 C64 9 59 14 56 22 Z" fill={C.ok} />
        <ellipse
          cx="50"
          cy="58"
          rx="30"
          ry="27"
          fill="#10151D"
          stroke={C.ok}
          strokeWidth="2.5"
        />
        <polygon points="50,63 43,73 57,73" fill="#FFB454" />
        <circle cx="37" cy="52" r="9" fill="#fff" />
        <circle cx="63" cy="52" r="9" fill="#fff" />
        <circle
          className="gowl-eye-pupil"
          cx="37"
          cy="52"
          r="4"
          fill="#0A0C10"
        />
        <circle
          className="gowl-eye-pupil"
          cx="63"
          cy="52"
          r="4"
          fill="#0A0C10"
        />
      </svg>
    </div>
  );
}

const TERMINAL_COMMANDS = [
  {
    cmd: "nmap -sV 10.10.14.22",
    out: ["22/tcp  open  ssh", "80/tcp  open  http", "Scan terminé en 4.2s"],
  },
  {
    cmd: "hydra -l admin -P rockyou.txt ssh://target.htb",
    out: [
      "1 cible testée",
      "1 identifiant valide trouvé",
      "→ voir le write-up associé",
    ],
  },
  {
    cmd: 'sqlmap -u "http://target.htb/item?id=1" --batch',
    out: [
      "Paramètre 'id' injectable",
      "Backend : MySQL 8.0",
      "1 vulnérabilité confirmée",
    ],
  },
  {
    cmd: 'msfconsole -q -x "use exploit/multi/handler"',
    out: [
      "Module chargé",
      "Listener démarré sur le port 4444",
      "Session Meterpreter ouverte",
    ],
  },
  {
    cmd: "curl -s api/scan/42 | jq '.status'",
    out: ["{", '  "status": "clean"', "}"],
  },
];

function HackerWorkstation() {
  return (
    <div
      className="relative min-h-[280px] overflow-hidden rounded-2xl"
      style={{
        background: "linear-gradient(160deg,#0B0E14,#111722)",
        border: `1px solid ${C.line}`,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg,transparent,${C.primary}88,transparent)`,
        }}
      />
      <div
        className="absolute top-4 left-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em]"
        style={{ color: C.muted, fontFamily: MONO_FONT }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: C.ok }}
        />{" "}
        analyst workstation
      </div>
      <svg
        viewBox="0 0 520 320"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="screenGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5B6EF5" stopOpacity=".28" />
            <stop offset="1" stopColor="#2ED9A3" stopOpacity=".08" />
          </linearGradient>
          <radialGradient id="hoodShade">
            <stop offset="0" stopColor="#242B3B" />
            <stop offset="1" stopColor="#0B0E14" />
          </radialGradient>
        </defs>
        <ellipse
          cx="310"
          cy="286"
          rx="190"
          ry="18"
          fill="#05070A"
          opacity=".8"
        />
        <rect
          x="205"
          y="68"
          width="230"
          height="145"
          rx="9"
          fill="#070A0F"
          stroke="#30394A"
          strokeWidth="2"
        />
        <rect
          x="218"
          y="81"
          width="204"
          height="118"
          rx="4"
          fill="url(#screenGlow)"
          stroke="#5B6EF5"
          strokeOpacity=".45"
        />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x="234"
            y={98 + i * 18}
            width={i % 2 ? 126 : 158}
            height="4"
            rx="2"
            fill={i === 2 ? "#2ED9A3" : "#8A93A3"}
            opacity={i === 2 ? ".8" : ".38"}
          />
        ))}
        <path d="M280 213h80l18 42H262z" fill="#111722" stroke="#30394A" />
        <path
          d="M110 245c14-70 37-116 86-137 48 19 76 68 83 137z"
          fill="url(#hoodShade)"
          stroke="#252D3B"
          strokeWidth="2"
        />
        <path
          d="M151 128c8-35 25-56 46-61 25 8 43 33 48 67-24-18-69-20-94-6z"
          fill="#0A0D13"
          stroke="#30394A"
        />
        <ellipse cx="198" cy="143" rx="34" ry="42" fill="#121722" />
        <path
          d="M177 149c14 9 29 10 43 0"
          stroke="#5B6EF5"
          strokeOpacity=".45"
          fill="none"
        />
        <circle cx="186" cy="137" r="3" fill="#5B6EF5" />
        <circle cx="211" cy="137" r="3" fill="#5B6EF5" />
        <g className="gowl-hacker-hand-left">
          <path
            d="M154 224c26-12 54-7 81 13l-17 15c-24-11-44-12-65-4z"
            fill="#171D28"
            stroke="#30394A"
          />
        </g>
        <g className="gowl-hacker-hand-right">
          <path
            d="M236 235c31-16 62-16 91-1l-10 18c-29-7-54-5-78 4z"
            fill="#171D28"
            stroke="#30394A"
          />
        </g>
        <rect
          x="160"
          y="246"
          width="190"
          height="24"
          rx="5"
          fill="#0A0D12"
          stroke="#30394A"
        />
        {Array.from({ length: 12 }).map((_, i) => (
          <rect
            key={i}
            x={171 + i * 14}
            y="253"
            width="9"
            height="4"
            rx="1"
            fill="#5B6EF5"
            opacity={i % 3 === 0 ? ".75" : ".3"}
          />
        ))}
      </svg>
    </div>
  );
}

function ProfessionalHome({
  L,
  setTab,
  profiles,
  memberCount,
  liveCount,
  news,
  questions,
  trophies,
  teams,
  labs,
  events = [],
}) {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const gh = {
    bg: C.bg,
    panel: "#122033",
    panel2: "#17283A",
    border: "#31465C",
    text: "#f0f6fc",
    muted: "#a4afbd",
    blue: "#2388ff",
    green: "#2dd875",
    purple: "#a970ff",
    orange: "#ff9f1c",
    indigo: "#818cf8",
  };

  const featureCards = [
    {
      icon: Compass,
      title: "Parcours",
      text: "Suis un chemin guidé : labs, ressources et défis structurés étape par étape.",
      tab: "parcours",
      color: gh.indigo,
      meta: `${LEARNING_PATHS.length} parcours disponible${LEARNING_PATHS.length > 1 ? "s" : ""}`,
    },
    {
      icon: MessageSquare,
      title: "Hub",
      text: "Discute en direct par thème avec la communauté.",
      tab: "salons",
      color: gh.blue,
      meta: liveCount
        ? `${liveCount} en ligne maintenant`
        : "Salons ouverts en direct",
      live: true,
    },
    {
      icon: MessageCircle,
      title: "Question",
      text: "Pose une question et obtiens de l'aide de la communauté.",
      tab: "forum",
      color: gh.green,
      meta: `${questions.length} question${questions.length > 1 ? "s" : ""} posée${questions.length > 1 ? "s" : ""}`,
    },
    {
      icon: Flag,
      title: "CTFNews",
      text: "Repère les prochains CTF dans le calendrier et prépare tes participations.",
      tab: "actus",
      color: gh.orange,
      meta: `${news.filter((item) => item.external && String(item.id).startsWith("ctftime-")).length} CTF à suivre`,
    },
    {
      icon: Calendar,
      title: "Événement",
      text: "Découvre et participe aux prochains événements de la communauté.",
      tab: "evenements",
      color: gh.purple,
      meta: `${events.length} événement${events.length > 1 ? "s" : ""}`,
    },
  ];

  const activity = [
    ...questions
      .slice(-2)
      .reverse()
      .map((q) => ({
        id: `q-${q.id}`,
        kind: "QUESTION",
        title: q.title,
        meta: q.category || "Réseau",
        time: q.createdAt,
        comments: q.answers?.length || 0,
        icon: MessageSquare,
        color: gh.blue,
        tab: "forum",
      })),
    ...labs
      .slice(-1)
      .reverse()
      .map((l) => ({
        id: `l-${l.id}`,
        kind: "LAB",
        title: l.title,
        meta: l.platform || "Lab",
        time: l.createdAt,
        comments: l.messages?.length || 0,
        icon: FlaskConical,
        color: gh.orange,
        tab: "labs",
      })),
    ...teams
      .slice(-1)
      .reverse()
      .map((team) => ({
        id: `t-${team.id}`,
        kind: "TEAM",
        title: team.name,
        meta: "Team",
        time: team.createdAt,
        comments: team.members?.length || 0,
        icon: Users,
        color: gh.green,
        tab: "equipes",
      })),
  ].slice(0, 4);

  /* Top talents — même barème de points que le classement complet, condensé au podium */
  const topTalents = useMemo(() => {
    const scores = {};
    const add = (author, points) => {
      if (author) scores[author] = (scores[author] || 0) + points;
    };
    trophies.forEach((t) => add(t.author, TROPHY_POINTS[t.difficulty] || 10));
    questions.forEach((q) => {
      add(q.author, 2);
      (q.answers || []).forEach((a) => add(a.author, 3));
    });
    labs.forEach((l) => add(l.owner, 5));
    return Object.entries(scores)
      .map(([author, total]) => ({
        author,
        total,
        profile: profiles.find((p) => p.username === author),
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 3);
  }, [trophies, questions, labs, profiles]);

  const registeredMemberCount =
    Number.isInteger(memberCount) && memberCount >= 0
      ? memberCount
      : profiles.length;

  const stats = [
    {
      label: "Membres",
      value: registeredMemberCount,
      icon: Users,
      color: gh.blue,
    },
    {
      label: "Trophées décrochés",
      value: trophies.length,
      icon: Trophy,
      color: gh.orange,
    },
    {
      label: "Questions répondues",
      value: questions.filter((q) => (q.answers || []).length > 0).length,
      icon: MessageCircle,
      color: gh.purple,
    },
  ];

  const homeAnnouncements = useMemo(
    () =>
      news
        .filter((item) => !item.external)
        .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0)),
    [news],
  );

  const nextCtf = useMemo(() => {
    const ctfs = news
      .filter(
        (item) => item.external && String(item.id).startsWith("ctftime-"),
      )
      .sort(
        (a, b) =>
          new Date(a.start || a.date || 0) - new Date(b.start || b.date || 0),
      );
    return (
      ctfs.find(
        (item) => new Date(item.finish || item.start || item.date) >= new Date(),
      ) || ctfs[0]
    );
  }, [news]);

  const homeRadar = [
    {
      label: "Prochain CTF",
      title: nextCtf?.title || "Calendrier à surveiller",
      meta: nextCtf
        ? new Date(nextCtf.start || nextCtf.date).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
          })
        : "Découvre les prochains événements",
      icon: Flag,
      color: gh.orange,
      tab: "actus",
    },
    {
      label: "Besoin d’un coup de main",
      title: `${questions.filter((question) => !question.resolved).length} question${questions.filter((question) => !question.resolved).length > 1 ? "s" : ""} ouverte${questions.filter((question) => !question.resolved).length > 1 ? "s" : ""}`,
      meta: "Réponds, aide et gagne des points",
      icon: MessageCircle,
      color: gh.blue,
      tab: "forum",
    },
    {
      label: "Opérations en cours",
      title: `${labs.length} lab${labs.length > 1 ? "s" : ""} · ${teams.length} team${teams.length > 1 ? "s" : ""}`,
      meta: "Rejoins une mission communautaire",
      icon: Target,
      color: gh.green,
      tab: labs.length ? "labs" : "equipes",
    },
  ];

  return (
    <div className="ghx-home">
      <style>{`
        .ghx-home { color: ${gh.text}; font-family: ${BODY_FONT}; padding-bottom: 56px; }
        .ghx-hero { display: grid; grid-template-columns: 1fr; gap: 36px; align-items: center; padding: 36px 0 40px; }
        @media (min-width: 1024px) { .ghx-hero { grid-template-columns: 0.86fr 1.14fr; gap: 56px; padding: 44px 0 48px; } }
        .ghx-kicker { display: inline-flex; align-items: center; gap: 6px; margin-bottom: 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: ${gh.green}; font-family: ${MONO_FONT}; }
        .ghx-newsbtn { all: unset; box-sizing: border-box; display: inline-flex; align-items: center; gap: 8px; margin-bottom: 18px; padding: 6px 12px 6px 10px; border-radius: 999px; font-size: 12px; cursor: pointer; background: ${gh.blue}14; border: 1px solid ${gh.blue}40; color: ${gh.blue}; font-family: ${MONO_FONT}; }
        .ghx-newsbtn:hover .ghx-newsbtn-arrow { transform: translateX(2px); }
        .ghx-newsbtn-arrow { transition: transform 0.15s ease; transform: rotate(-90deg); }
        .ghx-newsbtn-title { color: ${gh.text}; max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .ghx-h1 { font-size: 28px; line-height: 1.14; font-weight: 800; letter-spacing: -0.025em; margin: 0 0 16px; font-family: ${DISPLAY_FONT}; }
        @media (min-width: 640px) { .ghx-h1 { font-size: 36px; } }
        @media (min-width: 1024px) { .ghx-h1 { font-size: 41px; } }
        .ghx-sub { font-size: 14.5px; line-height: 1.6; margin: 0 0 22px; max-width: 540px; color: ${gh.muted}; }
        @media (min-width: 640px) { .ghx-sub { font-size: 15.5px; line-height: 1.7; } }
        .ghx-ctas { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px; }
        .ghx-cta { all: unset; box-sizing: border-box; display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 6px; font-size: 13.5px; font-weight: 600; cursor: pointer; }
        .ghx-cta-primary { background: linear-gradient(180deg,#2188ff,#1264d8); color: #fff; border: 1px solid #3896ff; }
        .ghx-cta-primary:hover { opacity: 0.92; }
        .ghx-cta-secondary { background: transparent; color: ${gh.text}; border: 1px solid ${gh.border}; }
        .ghx-cta-secondary:hover { border-color: #3a4c60; }
        .ghx-proof { display: flex; align-items: center; gap: 10px; }
        .ghx-proof-text { font-size: 12px; color: ${gh.muted}; }

        /* Stats — rangée éditoriale à séparateurs, pas des cartes */
        .ghx-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 14px; margin: 8px 0 46px; }
        .ghx-stat {
          position: relative; overflow: hidden; padding: 20px 20px 18px; border-radius: 10px;
          background: linear-gradient(155deg, ${gh.panel2}, ${gh.panel});
          border: 1px solid ${gh.border};
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }
        .ghx-stat:hover { transform: translateY(-2px); border-color: currentColor; box-shadow: 0 10px 26px -14px currentColor; }
        .ghx-stat::before, .ghx-stat::after,
        .ghx-stat-corner-tl, .ghx-stat-corner-br { content: ""; position: absolute; width: 14px; height: 14px; pointer-events: none; opacity: 0.9; }
        .ghx-stat::before { top: 8px; left: 8px; border-top: 1.5px solid; border-left: 1.5px solid; }
        .ghx-stat::after { bottom: 8px; right: 8px; border-bottom: 1.5px solid; border-right: 1.5px solid; }
        .ghx-stat-scan { position: absolute; left: 0; right: 0; height: 40%; pointer-events: none; opacity: 0.5; background: linear-gradient(180deg, currentColor, transparent); mix-blend-mode: overlay; animation: ghx-scan 4.5s ease-in-out infinite; }
        @keyframes ghx-scan { 0%, 100% { top: -40%; opacity: 0; } 15% { opacity: 0.5; } 50% { top: 100%; opacity: 0; } 100% { top: 100%; opacity: 0; } }
        .ghx-stat-glow { position: absolute; top: -30px; right: -30px; width: 90px; height: 90px; border-radius: 50%; filter: blur(22px); opacity: 0.4; pointer-events: none; }
        .ghx-stat-icon { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 7px; margin-bottom: 12px; }
        .ghx-stat-value { position: relative; font-family: ${DISPLAY_FONT}; font-size: 27px; font-weight: 800; line-height: 1; color: ${gh.text}; }
        .ghx-stat-label { position: relative; margin-top: 7px; font-size: 11.5px; color: ${gh.muted}; font-family: ${MONO_FONT}; text-transform: uppercase; letter-spacing: 0.06em; }

        .ghx-radar { margin: -18px 0 48px; }
        .ghx-radar-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px; }
        .ghx-radar-title { margin: 0; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: ${gh.muted}; font-family: ${MONO_FONT}; }
        .ghx-radar-live { display: inline-flex; align-items: center; gap: 6px; font-size: 10px; color: ${gh.green}; font-family: ${MONO_FONT}; }
        .ghx-radar-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border: 1px solid ${gh.border}; border-radius: 12px; overflow: hidden; background: ${gh.panel}; }
        .ghx-radar-item { all: unset; box-sizing: border-box; position: relative; display: grid; grid-template-columns: 38px minmax(0, 1fr) auto; align-items: center; gap: 12px; min-width: 0; padding: 16px; cursor: pointer; border-right: 1px solid ${gh.border}; transition: background .18s ease; }
        .ghx-radar-item:last-child { border-right: 0; }
        .ghx-radar-item:hover { background: ${gh.panel2}; }
        .ghx-radar-icon { width: 38px; height: 38px; display: inline-flex; align-items: center; justify-content: center; border-radius: 10px; color: var(--radar-accent); background: color-mix(in srgb, var(--radar-accent) 14%, transparent); border: 1px solid color-mix(in srgb, var(--radar-accent) 36%, transparent); }
        .ghx-radar-body { min-width: 0; }
        .ghx-radar-label { display: block; font-size: 8.5px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; color: var(--radar-accent); font-family: ${MONO_FONT}; }
        .ghx-radar-name { display: block; margin-top: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: ${gh.text}; font-size: 13px; font-weight: 750; font-family: ${DISPLAY_FONT}; }
        .ghx-radar-meta { display: block; margin-top: 3px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: ${gh.muted}; font-size: 10.5px; }
        .ghx-radar-arrow { color: ${gh.muted}; transition: transform .18s ease, color .18s ease; }
        .ghx-radar-item:hover .ghx-radar-arrow { color: var(--radar-accent); transform: translateX(3px); }
        @media (max-width: 900px) { .ghx-radar-grid { grid-template-columns: 1fr; } .ghx-radar-item { border-right: 0; border-bottom: 1px solid ${gh.border}; } .ghx-radar-item:last-child { border-bottom: 0; } }

        /* Toutes les annonces restent accessibles sans allonger la page : rail horizontal éditorial. */
        .ghx-updates { margin: -8px 0 48px; }
        .ghx-updates-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; margin-bottom: 15px; }
        .ghx-updates-title { margin: 0; font-size: 19px; font-weight: 800; color: ${gh.text}; font-family: ${DISPLAY_FONT}; }
        .ghx-updates-sub { margin: 4px 0 0; font-size: 12.5px; color: ${gh.muted}; }
        .ghx-updates-all { all: unset; box-sizing: border-box; display: inline-flex; align-items: center; gap: 6px; flex-shrink: 0; cursor: pointer; font-size: 12px; font-weight: 700; color: ${gh.blue}; font-family: ${MONO_FONT}; }
        .ghx-updates-all:hover { text-decoration: underline; }
        .ghx-updates-panel { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(300px, 0.95fr); overflow: hidden; border-radius: 12px; background: ${gh.panel}; border: 1px solid ${gh.border}; }
        .ghx-update-featured { all: unset; box-sizing: border-box; position: relative; overflow: hidden; display: flex; flex-direction: column; min-height: 245px; padding: 26px; cursor: pointer; background: linear-gradient(145deg, ${gh.panel2}, ${gh.panel}); transition: background 0.2s ease; }
        .ghx-update-featured::after { content: ""; position: absolute; width: 260px; height: 260px; right: -110px; top: -120px; border-radius: 50%; background: var(--update-accent); opacity: 0.11; filter: blur(12px); }
        .ghx-update-featured:hover { background: color-mix(in srgb, var(--update-accent) 7%, ${gh.panel2}); }
        .ghx-update-featured-icon { position: relative; z-index: 1; width: 42px; height: 42px; display: inline-flex; align-items: center; justify-content: center; border-radius: 12px; color: var(--update-accent); background: color-mix(in srgb, var(--update-accent) 15%, transparent); border: 1px solid color-mix(in srgb, var(--update-accent) 40%, transparent); }
        .ghx-update-featured-meta { position: relative; z-index: 1; display: flex; align-items: center; gap: 7px; margin-top: 17px; color: var(--update-accent); font-size: 9.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.09em; font-family: ${MONO_FONT}; }
        .ghx-update-featured-title { position: relative; z-index: 1; display: block; max-width: 560px; margin-top: 9px; color: ${gh.text}; font-size: clamp(19px, 2.3vw, 25px); line-height: 1.25; font-weight: 800; font-family: ${DISPLAY_FONT}; }
        .ghx-update-featured-text { position: relative; z-index: 1; display: -webkit-box; max-width: 600px; margin-top: 10px; color: ${gh.muted}; font-size: 13.5px; line-height: 1.6; white-space: pre-line; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
        .ghx-update-featured-footer { position: relative; z-index: 1; display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: auto; padding-top: 20px; color: ${gh.muted}; font-size: 10px; font-family: ${MONO_FONT}; }
        .ghx-update-read { display: inline-flex; align-items: center; gap: 5px; color: var(--update-accent); font-weight: 700; }
        .ghx-updates-list { display: flex; flex-direction: column; border-left: 1px solid ${gh.border}; }
        .ghx-update-row { all: unset; box-sizing: border-box; display: grid; grid-template-columns: 34px minmax(0, 1fr) auto; align-items: center; gap: 12px; width: 100%; min-height: 81px; padding: 14px 16px; cursor: pointer; border-bottom: 1px solid ${gh.border}; transition: background 0.18s ease, padding-left 0.18s ease; }
        .ghx-update-row:last-child { border-bottom: 0; }
        .ghx-update-row:hover { background: ${gh.panel2}; padding-left: 20px; }
        .ghx-update-row-icon { width: 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center; border-radius: 9px; color: var(--update-accent); background: color-mix(in srgb, var(--update-accent) 13%, transparent); border: 1px solid color-mix(in srgb, var(--update-accent) 35%, transparent); }
        .ghx-update-row-body { min-width: 0; }
        .ghx-update-row-meta { display: flex; align-items: center; gap: 7px; color: ${gh.muted}; font-size: 8.5px; text-transform: uppercase; letter-spacing: 0.06em; font-family: ${MONO_FONT}; }
        .ghx-update-row-title { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-top: 5px; color: ${gh.text}; font-size: 13px; font-weight: 700; font-family: ${DISPLAY_FONT}; }
        .ghx-update-row-text { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-top: 3px; color: ${gh.muted}; font-size: 11.5px; }
        .ghx-update-row-arrow { color: ${gh.muted}; transition: transform 0.18s ease, color 0.18s ease; }
        .ghx-update-row:hover .ghx-update-row-arrow { color: var(--update-accent); transform: translateX(3px); }
        @media (max-width: 820px) { .ghx-updates-panel { grid-template-columns: 1fr; } .ghx-updates-list { border-left: 0; border-top: 1px solid ${gh.border}; } .ghx-update-featured { min-height: 225px; padding: 21px; } }

        /* Fonctionnalités — liste numérotée façon timeline, pas une grille de cartes */
        .ghx-section-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: ${gh.muted}; font-family: ${MONO_FONT}; margin: 0 0 4px; }
        .ghx-features { margin-bottom: 50px; position: relative; }
        .ghx-features-head { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: 6px; }
        .ghx-features-title { font-family: ${DISPLAY_FONT}; font-size: 22px; font-weight: 800; margin: 0; color: ${gh.text}; }
        .ghx-features-sub { font-size: 13px; color: ${gh.muted}; margin: 6px 0 18px; }

        .ghx-feature {
          all: unset; box-sizing: border-box; position: relative; overflow: hidden;
          display: flex; align-items: flex-start; gap: 22px; width: 100%;
          padding: 24px 16px; border-top: 1px solid ${gh.border}; cursor: pointer; border-radius: 10px;
          transition: background 0.22s ease, padding-left 0.22s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          opacity: 0; transform: translateY(14px);
          animation: ghx-feature-in 0.55s cubic-bezier(.2,.7,.3,1) forwards;
          animation-delay: calc(var(--i, 0) * 90ms + 80ms);
          --mx: 50%; --my: 50%;
        }
        @keyframes ghx-feature-in { to { opacity: 1; transform: translateY(0); } }
        .ghx-features > .ghx-feature:last-child { border-bottom: 1px solid ${gh.border}; }
        .ghx-feature::before {
          content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
          background: currentColor; transform: scaleY(0); transform-origin: top; opacity: 0.85;
          transition: transform 0.28s ease; z-index: 1;
        }
        .ghx-feature::after {
          content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0;
          background: radial-gradient(240px circle at var(--mx) var(--my), color-mix(in srgb, var(--accent) 18%, transparent), transparent 72%);
          transition: opacity 0.3s ease;
        }
        .ghx-feature:hover { background: ${gh.panel2}; padding-left: 22px; box-shadow: 0 14px 32px -22px currentColor; border-color: currentColor; }
        .ghx-feature:hover::before { transform: scaleY(1); }
        .ghx-feature:hover::after { opacity: 1; }

        .ghx-feature-index {
          flex-shrink: 0; width: 44px; padding-top: 2px; font-family: ${DISPLAY_FONT}; font-size: 26px; font-weight: 800;
          color: ${gh.border}; transition: color 0.22s ease, text-shadow 0.22s ease; position: relative;
        }
        .ghx-feature:hover .ghx-feature-index { color: currentColor; text-shadow: 0 0 18px currentColor; }
        .ghx-feature-index::after {
          content: ""; position: absolute; left: 21px; top: 34px; width: 1px; height: 42px;
          background: linear-gradient(180deg, var(--accent), transparent);
          opacity: 0.3; animation: ghx-line-breathe 3.2s ease-in-out infinite;
          animation-delay: calc(var(--i, 0) * 180ms);
        }
        @keyframes ghx-line-breathe { 0%, 100% { opacity: 0.18; } 50% { opacity: 0.5; } }
        .ghx-features > .ghx-feature:last-child .ghx-feature-index::after { display: none; }

        .ghx-feature-icon-wrap {
          flex-shrink: 0; width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center;
          position: relative; transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s ease;
        }
        .ghx-feature-icon-wrap::before {
          content: ""; position: absolute; inset: -7px; border-radius: 14px; background: var(--accent);
          opacity: 0.08; filter: blur(9px); z-index: -1;
          animation: ghx-icon-breathe 3.4s ease-in-out infinite;
          animation-delay: calc(var(--i, 0) * 300ms);
        }
        @keyframes ghx-icon-breathe { 0%, 100% { opacity: 0.06; transform: scale(0.86); } 50% { opacity: 0.22; transform: scale(1.08); } }
        .ghx-feature:hover .ghx-feature-icon-wrap { transform: scale(1.1) rotate(-4deg); box-shadow: 0 0 0 5px color-mix(in srgb, currentColor 14%, transparent), 0 8px 18px -8px currentColor; }
        .ghx-feature:hover .ghx-feature-icon-wrap::before { opacity: 0.4; animation-play-state: paused; }

        .ghx-feature-body { flex: 1; min-width: 0; padding-top: 2px; }
        .ghx-feature-top { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 5px; }
        .ghx-feature-title { font-size: 16.5px; font-weight: 700; color: ${gh.text}; transition: color 0.2s ease; }
        .ghx-feature:hover .ghx-feature-title { color: currentColor; }
        .ghx-feature-meta { display: inline-flex; align-items: center; gap: 5px; font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 2px 8px; border-radius: 999px; font-family: ${MONO_FONT}; }
        .ghx-feature-start {
          display: inline-flex; align-items: center; gap: 4px; font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.06em; color: var(--accent); font-family: ${MONO_FONT};
          animation: ghx-start-nudge 1.8s ease-in-out infinite;
        }
        @keyframes ghx-start-nudge { 0%, 100% { transform: translateX(0); opacity: 0.75; } 50% { transform: translateX(3px); opacity: 1; } }
        .ghx-feature-text { display: block; font-size: 13.5px; line-height: 1.55; color: ${gh.muted}; max-width: 480px; }
        .ghx-feature-arrow { flex-shrink: 0; margin-top: 10px; color: #5c6b7c; transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), color 0.2s ease; }
        .ghx-feature:hover .ghx-feature-arrow { transform: translateX(6px); color: currentColor; }
        @media (prefers-reduced-motion: reduce) {
          .ghx-feature, .ghx-feature-index::after, .ghx-feature-icon-wrap::before, .ghx-feature-start { animation: none; opacity: 1; transform: none; }
        }

        /* Activité + Top talents — colonnes séparées par une règle, pas des cartes remplies */
        .ghx-columns { display: grid; grid-template-columns: 1fr; gap: 40px; }
        @media (min-width: 1024px) { .ghx-columns { grid-template-columns: 1.5fr 1px 0.9fr; gap: 40px; } }
        .ghx-col-divider { display: none; }
        @media (min-width: 1024px) { .ghx-col-divider { display: block; background: ${gh.border}; } }
        .ghx-col-title { font-size: 16px; font-weight: 700; margin: 0 0 14px; color: ${gh.text}; }
        .ghx-empty { padding: 28px 0; font-size: 13.5px; color: ${gh.muted}; }
        .ghx-activity-row { all: unset; box-sizing: border-box; display: grid; grid-template-columns: 26px 1fr auto; align-items: center; gap: 12px; width: 100%; padding: 14px 0; cursor: pointer; }
        .ghx-activity-row.bordered { border-top: 1px solid ${gh.border}; }
        .ghx-activity-main { min-width: 0; }
        .ghx-activity-top { display: flex; align-items: center; gap: 8px; min-width: 0; }
        .ghx-activity-tag { font-size: 10px; padding: 2px 6px; border-radius: 4px; font-family: ${MONO_FONT}; }
        .ghx-activity-title { font-size: 13.5px; color: ${gh.text}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .ghx-activity-meta { display: block; font-size: 12px; margin-top: 4px; color: ${gh.muted}; }
        .ghx-activity-comments { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: ${gh.muted}; white-space: nowrap; }

        .ghx-talent-row { all: unset; box-sizing: border-box; display: flex; align-items: center; gap: 11px; width: 100%; padding: 12px 0; cursor: pointer; }
        .ghx-talent-row.bordered { border-top: 1px solid ${gh.border}; }
        .ghx-talent-rank { width: 18px; flex-shrink: 0; font-size: 13.5px; }
        .ghx-talent-name { flex: 1; min-width: 0; font-size: 13.5px; font-weight: 600; color: ${gh.text}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .ghx-talent-pts { flex-shrink: 0; font-size: 12px; font-weight: 700; color: ${gh.orange}; font-family: ${MONO_FONT}; }
        .ghx-see-all { all: unset; box-sizing: border-box; display: inline-flex; align-items: center; gap: 7px; margin-top: 14px; font-size: 13px; color: ${gh.blue}; cursor: pointer; }
        .ghx-see-all:hover { text-decoration: underline; }
        .ghx-about { margin-top: 26px; padding-top: 22px; border-top: 1px solid ${gh.border}; }
        .ghx-about-title { font-size: 14px; font-weight: 700; margin: 0 0 8px; color: ${gh.text}; }
        .ghx-about-text { font-size: 13px; line-height: 1.55; color: ${gh.muted}; margin: 0; }
        .ghx-about-tags { display: flex; flex-wrap: wrap; gap: 6px; margin: 12px 0 4px; }
        .ghx-about-tag { font-size: 10.5px; font-family: ${MONO_FONT}; padding: 3px 9px; border-radius: 6px; border: 1px solid ${gh.border}; color: ${gh.muted}; background: ${gh.panel2}; }

        /* États vides — accueillants plutôt que plats */
        .ghx-empty-state { display: flex; flex-direction: column; align-items: flex-start; gap: 12px; padding: 22px 0 6px; }
        .ghx-empty-icon { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; position: relative; }
        .ghx-empty-icon::before {
          content: ""; position: absolute; inset: -6px; border-radius: 16px; background: currentColor;
          opacity: 0.08; filter: blur(9px); animation: ghx-icon-breathe 3.4s ease-in-out infinite;
        }
        .ghx-empty-text { font-size: 13.5px; line-height: 1.55; color: ${gh.muted}; max-width: 340px; margin: 0; }
        .ghx-empty-cta {
          all: unset; box-sizing: border-box; display: inline-flex; align-items: center; gap: 6px;
          font-size: 12.5px; font-weight: 600; color: currentColor; cursor: pointer;
          padding: 7px 13px; border-radius: 7px; border: 1px solid currentColor; opacity: 0.9;
          transition: opacity 0.2s ease, transform 0.2s ease, background 0.2s ease;
        }
        .ghx-empty-cta:hover { opacity: 1; background: color-mix(in srgb, currentColor 12%, transparent); transform: translateX(2px); }

        /* Podium talents — le classement prend un peu de relief */
        .ghx-talent-row { border-radius: 8px; transition: background 0.2s ease, padding-left 0.2s ease; }
        .ghx-talent-row:hover { background: ${gh.panel2}; padding-left: 8px; }
        .ghx-talent-rank { font-size: 15px; text-align: center; }
        .ghx-talent-avatar-wrap { position: relative; flex-shrink: 0; display: flex; }
        .ghx-talent-avatar-wrap.rank-0 { filter: drop-shadow(0 0 6px ${C.gold}88); }
        .ghx-talent-avatar-wrap.rank-0::after {
          content: ""; position: absolute; inset: -3px; border-radius: 50%; border: 1.5px solid ${C.gold};
          opacity: 0.7; animation: ghx-icon-breathe 2.6s ease-in-out infinite;
        }
      `}</style>

      <section className="ghx-hero">
        <div>
          <span className="ghx-kicker">
            <Users size={12} /> root☠️gowlsec:~$ access granted — bienvenue{" "}
          </span>
          <button onClick={() => setTab("salons")} className="ghx-newsbtn">
            <span className="gowl-live-dot" style={{ background: gh.green }} />
            <span style={{ fontWeight: 600 }}>
              {liveCount ?? "—"} Opérateur{liveCount === 1 ? "" : "s"} en
              {liveCount === 1 ? "" : ""} ligne
            </span>
            <ChevronDown size={12} className="ghx-newsbtn-arrow" />
          </button>
          <h1 className="ghx-h1">
            La communauté francophone
            <br />
            <span style={{ color: gh.blue }}>pentest, CTF,</span> réseau et
            <br />
            cybersécurité.
          </h1>
          <p className="ghx-sub">
            Pas une plateforme, pas un cours : un collectif de passionnés qui
            apprennent, échangent et progressent ensemble — que tu sois débutant
            ou confirmé.
          </p>
          <div className="ghx-ctas">
            <button
              onClick={() => setTab("forum")}
              className="ghx-cta ghx-cta-primary"
            >
              <MessageCircle size={15} /> Poser une question
            </button>
            <button
              onClick={() => setTab("salons")}
              className="ghx-cta ghx-cta-secondary"
            >
              <Users size={15} /> Rejoindre la communauté
            </button>
          </div>
          <div className="ghx-proof">
            <MemberAvatarStack profiles={profiles} max={5} />
            <span className="ghx-proof-text">
              {registeredMemberCount > 0 ? (
                <>
                  <strong style={{ color: gh.text }}>
                    {registeredMemberCount}
                  </strong>{" "}
                  membre{registeredMemberCount > 1 ? "s" : ""} ont déjà rejoint
                  la communauté
                </>
              ) : (
                "Sois l'un des premiers membres de la communauté"
              )}
            </span>
          </div>
        </div>

        <DataScanScene onClick={() => setTab("labs")} />
      </section>

      <TrustHighlights gh={gh} />

      <div className="ghx-stats">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="ghx-stat" style={{ color }}>
            <span className="ghx-stat-scan" />
            <span className="ghx-stat-glow" style={{ background: color }} />
            <span
              className="ghx-stat-icon"
              style={{ background: `${color}18` }}
            >
              <Icon size={16} />
            </span>
            <div className="ghx-stat-value" style={{ color: gh.text }}>
              {value}
            </div>
            <div className="ghx-stat-label">{label}</div>
          </div>
        ))}
      </div>

      <section className="ghx-radar">
        <div className="ghx-radar-head">
          <h2 className="ghx-radar-title">Radar communautaire</h2>
          <span className="ghx-radar-live">
            <span className="gowl-live-dot" style={{ background: gh.green }} />
            Données en direct
          </span>
        </div>
        <div className="ghx-radar-grid">
          {homeRadar.map(({ label, title, meta, icon: Icon, color, tab }) => (
            <button
              type="button"
              key={label}
              onClick={() => setTab(tab)}
              className="ghx-radar-item"
              style={{ "--radar-accent": color }}
            >
              <span className="ghx-radar-icon">
                <Icon size={17} />
              </span>
              <span className="ghx-radar-body">
                <span className="ghx-radar-label">{label}</span>
                <span className="ghx-radar-name">{title}</span>
                <span className="ghx-radar-meta">{meta}</span>
              </span>
              <ChevronRight size={14} className="ghx-radar-arrow" />
            </button>
          ))}
        </div>
      </section>

      <section id="gowlsec-updates" className="ghx-updates">
        <div className="ghx-updates-head">
          <div>
            <h2 className="ghx-updates-title">Nouveautés &amp; annonces</h2>
            <p className="ghx-updates-sub">
              Toutes les publications officielles de GowlSec, directement sur
              l’accueil.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              homeAnnouncements[0] &&
              setSelectedAnnouncement(homeAnnouncements[0])
            }
            className="ghx-updates-all"
          >
            Lire la dernière annonce <ChevronRight size={13} />
          </button>
        </div>

        {homeAnnouncements.length === 0 ? (
          <div className="ghx-empty-state" style={{ color: gh.blue }}>
            <span
              className="ghx-empty-icon"
              style={{ background: `${gh.blue}18` }}
            >
              <Newspaper size={18} />
            </span>
            <p className="ghx-empty-text">
              Les prochaines annonces de l’équipe GowlSec apparaîtront ici.
            </p>
          </div>
        ) : (
          (() => {
            const featured = homeAnnouncements[0];
            const featuredCategory =
              NEWS_CATEGORIES.find(
                (entry) => entry.key === featured.category,
              ) || NEWS_CATEGORIES[0];
            const FeaturedIcon = featuredCategory.icon;
            return (
              <div className="ghx-updates-panel">
                <button
                  type="button"
                  onClick={() => setSelectedAnnouncement(featured)}
                  className="ghx-update-featured"
                  style={{ "--update-accent": featuredCategory.color }}
                >
                  <span className="ghx-update-featured-icon">
                    <FeaturedIcon size={19} />
                  </span>
                  <span className="ghx-update-featured-meta">
                    <span>À la une</span>
                    <span style={{ color: gh.muted }}>·</span>
                    <span>{featuredCategory.label}</span>
                    <span style={{ color: gh.muted }}>
                      · {timeAgo(featured.date)}
                    </span>
                  </span>
                  <span className="ghx-update-featured-title">
                    {featured.title}
                  </span>
                  <span className="ghx-update-featured-text">
                    {featured.summary}
                  </span>
                  <span className="ghx-update-featured-footer">
                    <span>
                      <Radio
                        size={10}
                        style={{ display: "inline", marginRight: 5 }}
                      />
                      {featured.source || "Équipe GowlSec"}
                    </span>
                    <span className="ghx-update-read">
                      Découvrir <ChevronRight size={12} />
                    </span>
                  </span>
                </button>

                <div className="ghx-updates-list">
                  {homeAnnouncements.slice(1).map((item) => {
                    const category =
                      NEWS_CATEGORIES.find(
                        (entry) => entry.key === item.category,
                      ) || NEWS_CATEGORIES[0];
                    const CategoryIcon = category.icon;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setSelectedAnnouncement(item)}
                        className="ghx-update-row"
                        style={{ "--update-accent": category.color }}
                      >
                        <span className="ghx-update-row-icon">
                          <CategoryIcon size={14} />
                        </span>
                        <span className="ghx-update-row-body">
                          <span className="ghx-update-row-meta">
                            <span style={{ color: category.color }}>
                              {category.label}
                            </span>
                            <span>· {timeAgo(item.date)}</span>
                          </span>
                          <span className="ghx-update-row-title">
                            {item.title}
                          </span>
                          <span className="ghx-update-row-text">
                            {item.summary}
                          </span>
                        </span>
                        <ChevronRight
                          size={14}
                          className="ghx-update-row-arrow"
                        />
                      </button>
                    );
                  })}
                  {homeAnnouncements.length === 1 && (
                    <div className="p-6 flex-1 flex items-center justify-center text-center">
                      <p className="text-xs" style={{ color: gh.muted }}>
                        Les prochaines annonces apparaîtront ici.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })()
        )}
      </section>

      {selectedAnnouncement &&
        (() => {
          const category =
            NEWS_CATEGORIES.find(
              (entry) => entry.key === selectedAnnouncement.category,
            ) || NEWS_CATEGORIES[0];
          const CategoryIcon = category.icon;
          return createPortal(
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center p-4"
              style={{
                background: "rgba(0,0,0,0.78)",
                backdropFilter: "blur(8px)",
              }}
              onClick={() => setSelectedAnnouncement(null)}
            >
              <div
                className="w-full max-w-xl rounded-2xl overflow-hidden"
                style={{
                  background: C.panel,
                  border: `1px solid ${category.color}55`,
                  boxShadow: `0 30px 80px -28px ${category.color}80`,
                }}
                onClick={(event) => event.stopPropagation()}
              >
                <div
                  className="p-5 sm:p-6"
                  style={{
                    background: `linear-gradient(145deg, ${category.color}12, transparent 55%)`,
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{
                        color: category.color,
                        background: `${category.color}16`,
                        border: `1px solid ${category.color}3D`,
                      }}
                    >
                      <CategoryIcon size={19} />
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedAnnouncement(null)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        color: C.muted,
                        background: C.panel2,
                        border: `1px solid ${C.line}`,
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <span
                    className="block text-[9px] uppercase tracking-[0.15em] font-bold mt-5"
                    style={{ color: category.color, fontFamily: MONO_FONT }}
                  >
                    {category.label} · {timeAgo(selectedAnnouncement.date)}
                  </span>
                  <h3
                    className="text-xl sm:text-2xl font-extrabold mt-2 leading-tight"
                    style={{ color: C.text, fontFamily: DISPLAY_FONT }}
                  >
                    {selectedAnnouncement.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mt-4 whitespace-pre-wrap"
                    style={{ color: C.muted, fontFamily: BODY_FONT }}
                  >
                    {selectedAnnouncement.summary}
                  </p>
                  <div
                    className="flex items-center justify-between gap-3 mt-6 pt-4"
                    style={{ borderTop: `1px solid ${C.line}` }}
                  >
                    <span
                      className="text-[10px]"
                      style={{ color: C.muted, fontFamily: MONO_FONT }}
                    >
                      <Radio
                        size={10}
                        style={{ display: "inline", marginRight: 5 }}
                      />
                      {selectedAnnouncement.source || "Équipe GowlSec"}
                    </span>
                    {selectedAnnouncement.url && (
                      <a
                        href={selectedAnnouncement.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold"
                        style={{ color: category.color, fontFamily: BODY_FONT }}
                      >
                        Ouvrir le lien <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          );
        })()}

      <div className="ghx-features">
        <div className="ghx-features-head">
          <h2 className="ghx-features-title">Comment participer</h2>
        </div>
        <p className="ghx-features-sub">
          Cinq façons de contribuer, apprendre et progresser avec les autres
          membres — choisis ton point d'entrée.
        </p>
        {featureCards.map(
          ({ icon: Icon, title, text, tab, color, meta, live }, i) => (
            <button
              key={title}
              onClick={() => setTab(tab)}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty(
                  "--mx",
                  `${((e.clientX - r.left) / r.width) * 100}%`,
                );
                e.currentTarget.style.setProperty(
                  "--my",
                  `${((e.clientY - r.top) / r.height) * 100}%`,
                );
              }}
              className="ghx-feature"
              style={{ color, "--accent": color, "--i": i }}
            >
              <span className="ghx-feature-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="ghx-feature-icon-wrap"
                style={{ background: `${color}18`, color }}
              >
                <Icon size={21} strokeWidth={1.9} />
              </span>
              <span className="ghx-feature-body">
                <span className="ghx-feature-top">
                  <span className="ghx-feature-title">{title}</span>
                  {meta && (
                    <span
                      className="ghx-feature-meta"
                      style={{
                        color,
                        background: `${color}16`,
                        border: `1px solid ${color}40`,
                      }}
                    >
                      {live && (
                        <span
                          className="gowl-live-dot"
                          style={{ background: color }}
                        />
                      )}
                      {meta}
                    </span>
                  )}
                  {i === 0 && (
                    <span className="ghx-feature-start">Commence ici →</span>
                  )}
                </span>
                <span className="ghx-feature-text">{text}</span>
              </span>
              <ChevronDown
                size={18}
                className="ghx-feature-arrow"
                style={{ transform: "rotate(-90deg)" }}
              />
            </button>
          ),
        )}
      </div>

      <div className="ghx-columns">
        <div>
          <h2 className="ghx-col-title">Activité récente</h2>
          {activity.length === 0 ? (
            <div className="ghx-empty-state" style={{ color: gh.blue }}>
              <span
                className="ghx-empty-icon"
                style={{ background: `${gh.blue}18` }}
              >
                <Activity size={19} />
              </span>
              <p className="ghx-empty-text">
                Les nouvelles questions, labs et teams de la communauté
                apparaîtront ici en temps réel.
              </p>
              <button onClick={() => setTab("forum")} className="ghx-empty-cta">
                Poser la première question{" "}
                <ChevronDown
                  size={13}
                  style={{ transform: "rotate(-90deg)" }}
                />
              </button>
            </div>
          ) : (
            <div>
              {activity.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setTab(item.tab)}
                    className={`ghx-activity-row${index ? " bordered" : ""}`}
                  >
                    <Icon size={18} style={{ color: item.color }} />
                    <span className="ghx-activity-main">
                      <span className="ghx-activity-top">
                        <span
                          className="ghx-activity-tag"
                          style={{
                            color: item.color,
                            border: `1px solid ${item.color}66`,
                            background: `${item.color}12`,
                          }}
                        >
                          {item.kind}
                        </span>
                        <span className="ghx-activity-title">{item.title}</span>
                      </span>
                      <span className="ghx-activity-meta">
                        {timeAgo(item.time)} &nbsp;•&nbsp; {item.meta}
                      </span>
                    </span>
                    <span className="ghx-activity-comments">
                      <MessageSquare size={13} /> {item.comments}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="ghx-col-divider" />

        <aside>
          <h2 className="ghx-col-title">Top talents</h2>
          {topTalents.length === 0 ? (
            <div className="ghx-empty-state" style={{ color: gh.orange }}>
              <span
                className="ghx-empty-icon"
                style={{ background: `${gh.orange}18` }}
              >
                <Trophy size={19} />
              </span>
              <p className="ghx-empty-text">
                Le classement s'anime dès les premiers trophées, réponses au
                forum ou labs créés.
              </p>
              <button
                onClick={() => setTab("classement")}
                className="ghx-empty-cta"
              >
                Voir le barème de points{" "}
                <ChevronDown
                  size={13}
                  style={{ transform: "rotate(-90deg)" }}
                />
              </button>
            </div>
          ) : (
            <div>
              {topTalents.map((r, i) => (
                <button
                  key={r.author}
                  onClick={() => setTab("classement")}
                  className={`ghx-talent-row${i ? " bordered" : ""}`}
                >
                  <span className="ghx-talent-rank">{RANK_MEDALS[i]}</span>
                  <span
                    className={`ghx-talent-avatar-wrap${i === 0 ? " rank-0" : ""}`}
                  >
                    {r.profile ? (
                      <Avatar profile={r.profile} size={26} />
                    ) : (
                      <span
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: "50%",
                          background: gh.panel2,
                          border: `1px solid ${gh.border}`,
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </span>
                  <span className="ghx-talent-name">{r.author}</span>
                  <span className="ghx-talent-pts">{r.total} pts</span>
                </button>
              ))}
            </div>
          )}
          <button onClick={() => setTab("classement")} className="ghx-see-all">
            Voir le classement complet <ExternalLink size={13} />
          </button>

          <div className="ghx-about">
            <h2 className="ghx-about-title">À propos de GowlSec</h2>
            <p className="ghx-about-text">
              Communauté francophone dédiée au pentest, aux CTF, au réseau et à
              la cybersécurité : entraide entre pairs, apprentissage pratique et
              projets collaboratifs.
            </p>
            <div className="ghx-about-tags">
              {["Pentest", "CTF", "Réseau", "Entraide"].map((tag) => (
                <span key={tag} className="ghx-about-tag">
                  {tag}
                </span>
              ))}
            </div>
            <button onClick={() => setTab("parcours")} className="ghx-see-all">
              Découvrir les parcours <ExternalLink size={13} />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function DataScanScene({ onClick }) {
  const [cmdIndex, setCmdIndex] = useState(0);
  const [typedCmd, setTypedCmd] = useState("");
  const [outVisible, setOutVisible] = useState(0);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers = [];
    const entry = TERMINAL_COMMANDS[cmdIndex];

    if (reduceMotion) {
      setTypedCmd(entry.cmd);
      setOutVisible(entry.out.length);
      timers.push(
        setTimeout(
          () => setCmdIndex((i) => (i + 1) % TERMINAL_COMMANDS.length),
          4000,
        ),
      );
      return () => timers.forEach(clearTimeout);
    }

    setTypedCmd("");
    setOutVisible(0);
    let i = 0;
    function typeChar() {
      i += 1;
      setTypedCmd(entry.cmd.slice(0, i));
      if (i < entry.cmd.length) {
        timers.push(setTimeout(typeChar, 26 + Math.random() * 34));
      } else {
        entry.out.forEach((_, idx) => {
          timers.push(
            setTimeout(() => setOutVisible(idx + 1), 380 + idx * 220),
          );
        });
        const totalDelay = 380 + entry.out.length * 220 + 2400;
        timers.push(
          setTimeout(
            () => setCmdIndex((idx) => (idx + 1) % TERMINAL_COMMANDS.length),
            totalDelay,
          ),
        );
      }
    }
    timers.push(setTimeout(typeChar, 500));
    return () => timers.forEach(clearTimeout);
  }, [cmdIndex]);

  const entry = TERMINAL_COMMANDS[cmdIndex];
  const maxOutLines = Math.max(...TERMINAL_COMMANDS.map((c) => c.out.length));

  return (
    <button
      onClick={onClick}
      className="ghx-terminal"
      style={{
        width: "100%",
        textAlign: "left",
        position: "relative",
        overflow: "hidden",
        borderRadius: 8,
        minHeight: 260,
        background: "linear-gradient(165deg,#0c1522,#07101a)",
        border: "1px solid #263646",
        boxShadow:
          "0 24px 60px -20px rgba(35,136,255,.25), 0 8px 24px rgba(0,0,0,.35)",
      }}
    >
      <style>{`
        .ghx-terminal-body { padding: 16px; font-size: 12px; }
        @media (min-width: 640px) { .ghx-terminal-body { padding: 20px; font-size: 13px; } }
      `}</style>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-32px",
          pointerEvents: "none",
          background:
            "radial-gradient(340px 220px at 80% 0%, rgba(35,136,255,.16), transparent 65%), radial-gradient(260px 200px at 10% 100%, rgba(45,216,117,.10), transparent 70%)",
        }}
      />
      <div
        style={{
          height: 40,
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          background: "#0b1520",
          borderBottom: "1px solid #263646",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 12,
            color: "#d6dee8",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#ff5f57",
              }}
            />
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#febc2e",
              }}
            />
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#2dd875",
              }}
            />
          </span>
          <span style={{ letterSpacing: "0.03em", fontFamily: MONO_FONT }}>
            TERMINAL
          </span>
        </span>
        <span
          style={{ display: "flex", alignItems: "center", color: "#4a5a6c" }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#2dd875",
            }}
          />
        </span>
      </div>
      {/* Zone fixe : rien ici ne change de taille, seul le contenu (opacité) évolue */}
      <div
        className="ghx-terminal-body"
        style={{
          position: "relative",
          lineHeight: 1.7,
          color: "#eef4fb",
          fontFamily: MONO_FONT,
        }}
      >
        <p style={{ margin: 0 }}>
          <span style={{ color: "#2dd875" }}>gowlsec@community</span>:
          <span style={{ color: "#66a9ff" }}>~</span>$ boot
        </p>
        <p style={{ margin: "6px 0 0", color: "#a4afbd" }}>
          Initialisation de GowlSec...
        </p>
        <div
          style={{
            margin: "6px 0 0",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            columnGap: 16,
          }}
        >
          <span>Chargement des services</span>
          <span style={{ color: "#55e778" }}>[ OK ]</span>
          <span>Connexion à la communauté</span>
          <span style={{ color: "#55e778" }}>[ OK ]</span>
          <span>Vérification des salons</span>
          <span style={{ color: "#55e778" }}>[ OK ]</span>
          <span>Aucun incident détecté</span>
          <span style={{ color: "#55e778" }}>[ OK ]</span>
        </div>
        <p style={{ margin: "10px 0 0", color: "#3b98ff" }}>
          La communauté est prête.
        </p>

        <div style={{ margin: "10px 0 0", minHeight: 22 }}>
          <p style={{ margin: 0 }}>
            <span style={{ color: "#2dd875" }}>gowlsec@community</span>:
            <span style={{ color: "#66a9ff" }}>~</span>$ {typedCmd}
            {typedCmd.length < entry.cmd.length && (
              <span className="gowl-cursor-blink">█</span>
            )}
          </p>
        </div>
        <div style={{ minHeight: maxOutLines * 21 }}>
          {entry.out.map((line, idx) => (
            <p
              key={idx}
              style={{
                margin: "4px 0 0",
                color: "#a4afbd",
                opacity: idx < outVisible ? 1 : 0,
                transition: "opacity 0.2s ease",
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </button>
  );
}

function SectionHeader({ icon, eyebrow, title, subtitle, accent = C.primary }) {
  return (
    <div className="gowl-section-head mb-1" style={{ "--gowl-accent": accent }}>
      <span className="gowl-section-icon gowl-sweep-wrap">{icon}</span>
      <div className="min-w-0 flex-1">
        {eyebrow && (
          <span
            className="text-[10px] font-bold uppercase gowl-mono-tag inline-flex items-center gap-1.5"
            style={{ color: accent }}
          >
            <span className="gowl-live-dot" style={{ background: accent }} />
            {eyebrow}
          </span>
        )}
        <h2
          className="text-xl sm:text-2xl font-extrabold leading-tight gowl-glitch"
          data-text={title}
          style={{ color: C.text, fontFamily: DISPLAY_FONT }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="text-sm mt-0.5"
            style={{ color: C.muted, fontFamily: BODY_FONT }}
          >
            {subtitle}
          </p>
        )}
      </div>
      <span className="gowl-section-rule hidden sm:block" />
    </div>
  );
}

function NavCard({ icon, title, desc, onClick, accent = C.primary }) {
  return (
    <button
      onClick={onClick}
      className="gowl-navcard text-left p-4 rounded-lg flex items-start gap-3 w-full"
      style={{ background: C.panel, border: `1px solid ${C.line}` }}
    >
      <span
        className="gowl-navcard-icon mt-0.5 w-9 h-9 rounded-md flex items-center justify-center shrink-0"
        style={{ background: `${accent}1A`, color: accent }}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <h3
          className="text-sm font-semibold mb-0.5"
          style={{ color: C.text, fontFamily: DISPLAY_FONT }}
        >
          {title}
        </h3>
        <p
          className="text-xs"
          style={{ color: C.muted, fontFamily: BODY_FONT }}
        >
          {desc}
        </p>
      </div>
    </button>
  );
}

/* ---------------------------------------------------------------------
   Scènes illustrées — habillage dynamique des écrans de création
--------------------------------------------------------------------- */
function SceneFrame({ children, accent }) {
  return (
    <div
      className="relative rounded-lg overflow-hidden mb-2"
      style={{
        background: `radial-gradient(circle at 50% 20%, ${accent}22, transparent 65%)`,
      }}
    >
      {children}
    </div>
  );
}

function ForumScene() {
  return (
    <SceneFrame accent={C.primary}>
      <svg
        viewBox="0 0 220 150"
        width="100%"
        height="140"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="28"
          y="34"
          width="132"
          height="90"
          rx="9"
          fill={C.panel2}
          stroke={C.line}
          strokeWidth="1.5"
        />
        <rect x="28" y="34" width="132" height="20" rx="9" fill={C.bg} />
        <circle cx="40" cy="44" r="3" fill={C.alert} />
        <circle cx="50" cy="44" r="3" fill={C.warn} />
        <circle cx="60" cy="44" r="3" fill={C.ok} />
        <rect
          x="40"
          y="64"
          width="62"
          height="5"
          rx="2.5"
          fill={C.primary}
          opacity="0.75"
        />
        <rect x="40" y="76" width="90" height="5" rx="2.5" fill={C.line} />
        <rect x="40" y="88" width="72" height="5" rx="2.5" fill={C.line} />
        <rect
          x="40"
          y="100"
          width="34"
          height="5"
          rx="2.5"
          fill={C.ok}
          className="gowl-cursor-blink"
        />
        <g className="gowl-scene-float">
          <circle
            cx="176"
            cy="46"
            r="21"
            fill={`${C.gold}22`}
            stroke={C.gold}
            strokeWidth="1.5"
          />
          <text
            x="176"
            y="54"
            textAnchor="middle"
            fontSize="22"
            fontWeight="800"
            fill={C.gold}
            fontFamily={DISPLAY_FONT}
          >
            ?
          </text>
        </g>
      </svg>
    </SceneFrame>
  );
}

function HubScene() {
  return (
    <SceneFrame accent={C.ok}>
      <svg
        viewBox="0 0 220 150"
        width="100%"
        height="130"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="gowl-scene-float">
          <rect
            x="26"
            y="46"
            width="76"
            height="42"
            rx="11"
            fill={C.panel2}
            stroke={C.primary}
            strokeWidth="1.5"
          />
          <path
            d="M42 88 L42 99 L56 88 Z"
            fill={C.panel2}
            stroke={C.primary}
            strokeWidth="1.5"
          />
          <rect
            x="40"
            y="59"
            width="42"
            height="5"
            rx="2.5"
            fill={C.primary}
            opacity="0.75"
          />
          <rect x="40" y="70" width="28" height="5" rx="2.5" fill={C.line} />
        </g>
        <g className="gowl-scene-float" style={{ animationDelay: "0.45s" }}>
          <rect
            x="116"
            y="24"
            width="76"
            height="42"
            rx="11"
            fill={C.panel2}
            stroke={C.ok}
            strokeWidth="1.5"
          />
          <path
            d="M160 66 L160 77 L146 66 Z"
            fill={C.panel2}
            stroke={C.ok}
            strokeWidth="1.5"
          />
          <rect
            x="128"
            y="37"
            width="48"
            height="5"
            rx="2.5"
            fill={C.ok}
            opacity="0.75"
          />
          <rect x="128" y="48" width="30" height="5" rx="2.5" fill={C.line} />
        </g>
        <circle
          cx="150"
          cy="112"
          r="4"
          fill={C.gold}
          className="gowl-cursor-blink"
        />
        <circle cx="168" cy="120" r="3" fill={C.warn} />
      </svg>
    </SceneFrame>
  );
}

function TeamScene() {
  const crew = [
    { x: 68, c: C.primary },
    { x: 110, c: C.gold },
    { x: 152, c: C.alert },
  ];
  return (
    <SceneFrame accent={C.warn}>
      <svg
        viewBox="0 0 220 150"
        width="100%"
        height="140"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="16"
          y="56"
          width="34"
          height="72"
          rx="4"
          fill={C.panel2}
          stroke={C.line}
          strokeWidth="1.5"
        />
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x="22"
            y={64 + i * 16}
            width="22"
            height="8"
            rx="2"
            fill={i % 2 === 0 ? C.ok : C.line}
            opacity={i % 2 === 0 ? 0.85 : 0.5}
          />
        ))}
        <rect
          x="170"
          y="56"
          width="34"
          height="72"
          rx="4"
          fill={C.panel2}
          stroke={C.line}
          strokeWidth="1.5"
        />
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x="176"
            y={64 + i * 16}
            width="22"
            height="8"
            rx="2"
            fill={i % 2 === 1 ? C.primary : C.line}
            opacity={i % 2 === 1 ? 0.85 : 0.5}
          />
        ))}
        <path
          d={`M${crew[0].x} 78 L${crew[1].x} 68 L${crew[2].x} 78`}
          fill="none"
          stroke={C.line}
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        {crew.map((h, i) => (
          <g
            key={i}
            className="gowl-scene-float"
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            <path
              d={`M${h.x - 17} 132 Q${h.x - 17} 96 ${h.x} 93 Q${h.x + 17} 96 ${h.x + 17} 132 Z`}
              fill={C.bg}
              stroke={h.c}
              strokeWidth="1.5"
            />
            <circle
              cx={h.x}
              cy="87"
              r="13"
              fill={C.bg}
              stroke={h.c}
              strokeWidth="1.5"
            />
            <rect
              x={h.x - 6}
              y="82"
              width="12"
              height="6"
              rx="3"
              fill={h.c}
              opacity="0.85"
            />
          </g>
        ))}
      </svg>
    </SceneFrame>
  );
}

function LabScene() {
  return (
    <SceneFrame accent={C.alert}>
      <svg
        viewBox="0 0 220 150"
        width="100%"
        height="140"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="63"
          y="38"
          width="94"
          height="98"
          rx="7"
          fill={C.panel2}
          stroke={C.line}
          strokeWidth="1.5"
        />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect
              x="73"
              y={48 + i * 19}
              width="74"
              height="13"
              rx="2.5"
              fill={C.bg}
              stroke={C.line}
            />
            <circle
              cx="82"
              cy={54.5 + i * 19}
              r="2.2"
              fill={i % 2 === 0 ? C.ok : C.warn}
            />
          </g>
        ))}
        <g className="gowl-shield-glow">
          <path
            d="M110 12 L140 23 V50 C140 72 127 87 110 94 C93 87 80 72 80 50 V23 Z"
            fill={C.bg}
            stroke={C.alert}
            strokeWidth="2.5"
          />
          <path
            d="M96 51 L106 61 L125 39"
            fill="none"
            stroke={C.alert}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </SceneFrame>
  );
}

function TrophyScene() {
  return (
    <SceneFrame accent={C.gold}>
      <svg
        viewBox="0 0 220 150"
        width="100%"
        height="140"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="54"
          y="28"
          width="112"
          height="92"
          rx="12"
          fill={C.panel2}
          stroke={C.line}
          strokeWidth="1.5"
        />
        <path
          d="M88 40h44c8 0 15 6 15 14v12c0 8-7 14-15 14h-8v10l-10-6-10 6v-10h-8c-8 0-15-6-15-14V54c0-8 7-14 15-14Z"
          fill={C.bg}
          stroke={C.gold}
          strokeWidth="2"
        />
        <circle
          cx="110"
          cy="64"
          r="16"
          fill={`${C.gold}22`}
          stroke={C.gold}
          strokeWidth="2.5"
        />
        <path
          d="M102 64l6 6 10-12"
          fill="none"
          stroke={C.gold}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="84"
          y="98"
          width="52"
          height="8"
          rx="4"
          fill={C.primary}
          opacity="0.8"
        />
        <rect x="94" y="110" width="32" height="5" rx="2.5" fill={C.line} />
      </svg>
    </SceneFrame>
  );
}

function CreationHero({
  scene,
  eyebrow,
  title,
  subtitle,
  accent,
  onClose,
  children,
}) {
  return (
    <Panel
      className="overflow-hidden mb-4 relative rounded-2xl"
      style={{
        border: `1px solid ${accent}35`,
        boxShadow: `0 10px 28px -18px ${accent}AA`,
      }}
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-md flex items-center justify-center"
          style={{
            background: `${C.bg}AA`,
            color: C.muted,
            border: `1px solid ${C.line}`,
          }}
        >
          <X size={14} />
        </button>
      )}
      <div className="grid md:grid-cols-[0.78fr_1.02fr]">
        <div
          className="relative flex flex-col justify-center px-4 py-4 md:px-5 md:py-5 md:border-r"
          style={{
            background: `linear-gradient(165deg, ${accent}14, transparent 75%)`,
            borderBottom: `1px solid ${C.line}`,
          }}
        >
          {scene}
          <span
            className="text-[10px] font-bold uppercase tracking-widest mb-1"
            style={{ color: accent, fontFamily: MONO_FONT }}
          >
            {eyebrow}
          </span>
          <h3
            className="text-base font-bold mb-1 leading-tight"
            style={{ color: C.text, fontFamily: DISPLAY_FONT }}
          >
            {title}
          </h3>
          <p
            className="text-[11px] leading-relaxed"
            style={{ color: C.muted, fontFamily: BODY_FONT }}
          >
            {subtitle}
          </p>
        </div>
        <div className="p-4 md:p-5">{children}</div>
      </div>
    </Panel>
  );
}

function ModalOverlay({ onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center p-3 pt-5 sm:p-4 sm:pt-7"
      style={{ background: "rgba(5,6,10,0.72)", isolation: "isolate" }}
      onClick={onClose}
    >
      <div
        className="relative z-[1] w-full max-w-2xl max-h-[88vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}