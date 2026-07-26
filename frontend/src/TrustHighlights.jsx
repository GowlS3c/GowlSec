import { MessageCircle, Users, ImagePlus, Database } from "lucide-react";

const ITEMS = [
  {
    icon: Database,
    title: "Opsec",
    text: "Tes données sensibles restent confidentielles : aucune adresse e-mail, adresse IP ou information de connexion n’est affichée sur GowlSec. Seules les informations publiques de ton profil sont visibles.",
    color: "#2ED9A3",
  },
  {
    icon: MessageCircle,
    title: "Hub & privé",
    text: "Pour discuter avec la communauté, rejoins les salons du Hub. Pour envoyer un message privé à un membre, rends-toi dans l’onglet Messages.",
    color: "#5B6EF5",
  },
  {
    icon: Users,
    title: "Entraide & équipes CTF",
    text: "Bloqué sur un lab ou une question ? La communauté répond. Envie de te lancer sur un CTF ? Trouve une team, partage tes write-ups et progresse à plusieurs plutôt que seul dans ton coin.",
    color: "#FF9F43",
  },
  {
    icon: ImagePlus,
    title: "Un profil qui te représente",
    text: "Mets en valeur ton parcours avec une bio, tes certifications et tes comptes Hack The Box, TryHackMe ou Root-Me. Personnalise également ta bannière et ta photo de profil.",
    color: "#FFD166",
  },
];

export default function TrustHighlights({ gh }) {
  const colors = {
    bg: gh?.panel || "#111B27",
    bg2: gh?.panel2 || "#192536",
    border: gh?.border || "#2A3A4D",
    text: gh?.text || "#F2F6FA",
    muted: gh?.muted || "#9EACBD",
  };

  return (
    <div className="gwlh-section">
      <style>{`
        .gwlh-section { margin: 8px 0 52px; }
        .gwlh-head {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 22px;
        }
        .gwlh-head::after {
          content: "";
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, ${colors.border}, transparent);
        }
        .gwlh-eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #2ED9A3;
          white-space: nowrap;
        }
        .gwlh-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 700px) {
          .gwlh-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1100px) {
          .gwlh-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .gwlh-card {
          position: relative;
          overflow: hidden;
          padding: 26px 22px;
          border-radius: 16px;
          background: linear-gradient(155deg, ${colors.bg2}, ${colors.bg});
          border: 1px solid ${colors.border};
          box-shadow: 0 0 0 1px transparent, 0 10px 24px -20px var(--gwlh-accent);
          transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
        }
        .gwlh-card:hover {
          transform: translateY(-6px) scale(1.015);
          border-color: var(--gwlh-accent);
          box-shadow: 0 20px 42px -18px var(--gwlh-accent);
        }
        .gwlh-card::after {
          content: "";
          position: absolute;
          width: 160px;
          height: 160px;
          right: -60px;
          top: -80px;
          border-radius: 50%;
          background: var(--gwlh-accent);
          opacity: 0.22;
          filter: blur(24px);
          pointer-events: none;
          transition: opacity 0.22s ease;
        }
        .gwlh-card:hover::after { opacity: 0.32; }
        .gwlh-card-top {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--gwlh-accent);
          opacity: 0.85;
        }
        .gwlh-icon {
          position: relative;
          width: 50px;
          height: 50px;
          border-radius: 13px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: color-mix(in srgb, var(--gwlh-accent) 20%, transparent);
          border: 1px solid color-mix(in srgb, var(--gwlh-accent) 50%, transparent);
          color: var(--gwlh-accent);
          margin-bottom: 16px;
        }
        .gwlh-card-title {
          position: relative;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: ${colors.text};
          margin: 0 0 8px;
        }
        .gwlh-card-text {
          position: relative;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 14px;
          line-height: 1.65;
          font-weight: 400;
          color: ${colors.muted};
          margin: 0;
        }
      `}</style>

      <div className="gwlh-head">
        <span className="gwlh-eyebrow">// Pourquoi GowlSec</span>
      </div>

      <div className="gwlh-grid">
        {ITEMS.map(({ icon: Icon, title, text, color }, i) => (
          <div className="gwlh-card" key={i} style={{ "--gwlh-accent": color }}>
            <span className="gwlh-card-top" />
            <span className="gwlh-icon">
              <Icon size={22} />
            </span>
            <h3 className="gwlh-card-title">{title}</h3>
            <p className="gwlh-card-text">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}