import { useState, useEffect, useRef, useCallback } from "react";

/* ══════════════════════════════ DATA ══════════════════════════════ */
const ROLES = ["Backend Developer", "Django Engineer", "API Architect", "Full-Stack Builder"];

const SKILLS = [
  { name: "Python / Django", level: 92, cat: "Backend" },
  { name: "Django REST Framework", level: 88, cat: "Backend" },
  { name: "MySQL / MongoDB", level: 82, cat: "Database" },
  { name: "React.js", level: 80, cat: "Frontend" },
  { name: "Git / GitHub", level: 90, cat: "DevOps" },
  { name: "JavaScript", level: 78, cat: "Frontend" },
  { name: "AWS EC2 / Vercel", level: 70, cat: "DevOps" },
  { name: "JWT / Knox Auth", level: 85, cat: "Security" },
];

const PROJECTS = [
  {
    name: "Event Booking App",
    url: "https://planithere.in",
    stack: ["Django", "DRF", "React.js", "Knox"],
    desc: "Full-stack event discovery & booking platform with auth, listings, and a clean REST API backend.",
    accent: "#0CFFD4",
    icon: "🎟",
  },
  {
    name: "Clinic Management System",
    url: "https://github.com/docto-cms/cms",
    stack: ["Django", "DRF", "React.js", "MySQL", "JWT"],
    desc: "End-to-end CMS for patient records, appointments, and billing with JWT token-based auth.",
    accent: "#FF4D6D",
    icon: "🏥",
  },
  {
    name: "CurtLab Website",
    url: "http://curtlab.ae",
    stack: ["React.js", "Figma", "Hostinger"],
    desc: "Corporate site built pixel-perfect from Figma designs, deployed and Core Web Vitals optimised.",
    accent: "#A78BFA",
    icon: "🎨",
  },
  {
    name: "Aminu E-Commerce",
    url: "https://www.aminu.life",
    stack: ["Shopify", "Liquid", "JavaScript"],
    desc: "Custom Shopify storefront with Liquid templates, JS enhancements, and performance tuning.",
    accent: "#FCD34D",
    icon: "🛒",
  },
  {
    name: "Employee Management",
    url: "https://github.com/aswinraj0919/employee_management",
    stack: ["Node.js", "Bootstrap", "JS"],
    desc: "CRUD employee management app — Node.js REST API with a responsive Bootstrap front-end.",
    accent: "#34D399",
    icon: "👥",
  },
];

const EXPERIENCE = [
  {
    period: "Jan 2026 – Present",
    role: "Software Developer",
    company: "Creative X",
    loc: "Thiruvananthapuram, Kerala",
    bullets: [
      "Build & maintain full-stack web apps with Django + React.js",
      "Ship features in 2-week Agile sprints with cross-functional teams",
      "Optimise backend performance; tune API response times",
    ],
    accent: "#0CFFD4",
  },
  {
    period: "Nov 2024 – Feb 2025",
    role: "Software Developer",
    company: "Doctosmart",
    loc: "Calicut, Kerala",
    bullets: [
      "Architected a Clinic Management System with DRF, React.js & MySQL",
      "Designed secure REST endpoints for records, billing, appointments",
      "Led unit-testing effort; maintained coverage across all modules",
    ],
    accent: "#A78BFA",
  },
  {
    period: "Jan 2024 – Nov 2024",
    role: "Software Developer Intern",
    company: "Stackmode Innovations",
    loc: "Thiruvananthapuram, Kerala",
    bullets: [
      "Shipped Django + React.js services from spec to production",
      "Contributed to CI/CD pipelines and AWS EC2 deployments",
      "Developed strong Git discipline in a collaborative codebase",
    ],
    accent: "#FCD34D",
  },
];

/* ══════════════════════════ PARTICLE CANVAS ══════════════════════ */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const animRef = useRef(null);
  const ptRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const COUNT = Math.min(70, Math.floor((canvas.width * canvas.height) / 14000));
      ptRef.current = Array.from({ length: COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.8,
      }));
    };
    resize();

    const draw = () => {
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);
      const mx = mouse.current.x, my = mouse.current.y;
      const pts = ptRef.current;
      const CONNECT = Math.min(130, W * 0.13);
      const MOUSE_R = Math.min(170, W * 0.18);

      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        const dx = mx - p.x, dy = my - p.y;
        const d = Math.hypot(dx, dy);
        if (d < MOUSE_R) { p.x -= dx * 0.014; p.y -= dy * 0.014; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(12,255,212,0.55)";
        ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < CONNECT) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(12,255,212,${(1 - d / CONNECT) * 0.22})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
        const d = Math.hypot(pts[i].x - mx, pts[i].y - my);
        if (d < MOUSE_R) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(12,255,212,${(1 - d / MOUSE_R) * 0.45})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const src = e.touches ? e.touches[0] : e;
      mouse.current = { x: src.clientX - rect.left, y: src.clientY - rect.top };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}

/* ══════════════════════════════ HOOKS ════════════════════════════ */
function useTypewriter(words, speed = 75, pause = 1800) {
  const [display, setDisplay] = useState("");
  const state = useRef({ wi: 0, ci: 0, del: false });

  useEffect(() => {
    let t;
    const tick = () => {
      const { wi, ci, del } = state.current;
      const word = words[wi];
      if (!del && ci <= word.length) {
        setDisplay(word.slice(0, ci));
        state.current.ci++;
        t = setTimeout(tick, speed);
      } else if (!del && ci > word.length) {
        t = setTimeout(() => { state.current.del = true; tick(); }, pause);
      } else if (del && ci >= 0) {
        setDisplay(word.slice(0, ci));
        state.current.ci--;
        t = setTimeout(tick, speed / 2);
      } else {
        state.current = { wi: (wi + 1) % words.length, ci: 0, del: false };
        t = setTimeout(tick, 200);
      }
    };
    t = setTimeout(tick, 400);
    return () => clearTimeout(t);
  }, [words, speed, pause]);

  return display;
}

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function useCount(target, dur = 1400, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, dur, active]);
  return val;
}

/* ══════════════════════════ REUSABLE UI ══════════════════════════ */
function Reveal({ children, delay = 0, dir = "up", style = {} }) {
  const [ref, vis] = useReveal();
  const map = {
    up: vis ? "translateY(0)" : "translateY(32px)",
    left: vis ? "translateX(0)" : "translateX(-32px)",
    right: vis ? "translateX(0)" : "translateX(32px)",
    scale: vis ? "scale(1)" : "scale(0.93)",
  };
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: map[dir],
        transition: `opacity 0.6s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.6s cubic-bezier(.22,1,.36,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function StatCard({ value, suffix = "", label, delay = 0 }) {
  const [ref, vis] = useReveal();
  const count = useCount(value, 1400, vis);
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "clamp(32px,5vw,52px)",
        fontWeight: 800,
        color: "#0CFFD4",
        lineHeight: 1,
        opacity: vis ? 1 : 0,
        transition: `opacity 0.5s ease ${delay}s`,
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "clamp(9px,1.2vw,11px)",
        letterSpacing: "clamp(1px,0.3vw,2px)",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.3)",
        marginTop: 8,
      }}>
        {label}
      </div>
    </div>
  );
}

function SkillBar({ name, level, delay = 0 }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{ marginBottom: "clamp(14px,2vw,20px)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
        <span style={{ fontSize: "clamp(12px,1.4vw,13.5px)", fontWeight: 600, color: "#F0EDE8" }}>{name}</span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "clamp(10px,1.2vw,11px)",
          color: "#0CFFD4",
          opacity: vis ? 1 : 0,
          transition: `opacity 0.4s ease ${delay + 0.4}s`,
        }}>{level}%</span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: vis ? `${level}%` : "0%",
          background: "linear-gradient(90deg,#0CFFD4,#A78BFA)",
          borderRadius: 99,
          transition: `width 1.1s cubic-bezier(.22,1,.36,1) ${delay}s`,
          boxShadow: vis ? "0 0 10px rgba(12,255,212,0.35)" : "none",
        }} />
      </div>
    </div>
  );
}

function ProjectCard({ p, i }) {
  const [hov, setHov] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setTilt({
      x: ((e.clientY - (rect.top + rect.height / 2)) / rect.height) * 9,
      y: -(((e.clientX - (rect.left + rect.width / 2)) / rect.width) * 9),
    });
  };

  return (
    <Reveal delay={i * 0.09} dir="scale">
      <div
        ref={ref}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => { setHov(false); setTilt({ x: 0, y: 0 }); }}
        onMouseMove={onMove}
        onClick={() => window.open(p.url, "_blank", "noopener noreferrer")}
        style={{
          background: hov ? "#111D30" : "#0C1524",
          border: `1px solid ${hov ? p.accent : "rgba(255,255,255,0.06)"}`,
          borderRadius: "clamp(12px,1.5vw,16px)",
          padding: "clamp(20px,2.5vw,28px)",
          transform: hov
            ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-5px)`
            : "perspective(900px) rotateX(0) rotateY(0) translateY(0)",
          transition: "transform .25s ease, border-color .25s, background .25s, box-shadow .25s",
          boxShadow: hov ? `0 20px 44px rgba(0,0,0,0.5), 0 0 0 1px ${p.accent}20` : "none",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(10px,1.5vw,14px)",
          height: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "clamp(26px,3.5vw,32px)" }}>{p.icon}</span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(9px,1.1vw,11px)",
            letterSpacing: 1.5,
            color: p.accent,
            opacity: hov ? 1 : 0,
            transform: hov ? "translateX(0)" : "translateX(8px)",
            transition: "all .2s",
          }}>VIEW ↗</span>
        </div>
        <div>
          <h3 style={{
            fontSize: "clamp(15px,1.8vw,18px)",
            fontWeight: 700,
            color: "#F0EDE8",
            marginBottom: "clamp(6px,1vw,8px)",
            lineHeight: 1.3,
          }}>{p.name}</h3>
          <p style={{
            fontSize: "clamp(12px,1.4vw,13.5px)",
            color: "rgba(255,255,255,0.42)",
            lineHeight: 1.75,
          }}>{p.desc}</p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(4px,.6vw,6px)", marginTop: "auto" }}>
          {p.stack.map((s) => (
            <span key={s} style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "clamp(9px,1vw,10px)",
              padding: "3px 9px",
              borderRadius: 4,
              background: `${p.accent}18`,
              color: p.accent,
              border: `1px solid ${p.accent}30`,
            }}>{s}</span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ════════════════════════ RESUME DOWNLOAD ════════════════════════ */
function ResumeBtn() {
  const [status, setStatus] = useState("idle");
  const [hov, setHov] = useState(false);

  // ── Replace this with your Google Docs file ID ──
  const GDOC_FILE_ID = "1gDBzvJ9WU0mDvkskcZ1HmMyV9R-w18lfqXxROaOidWw";

  const download = async () => {
    setStatus("loading");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system:
            "You are a file retrieval assistant. Use the Google Drive MCP tool to download the requested file as a PDF. Return ONLY the raw base64 string — no explanation, no markdown, no prefix.",
          messages: [{ role: "user", content: `Download Google Drive file ID: ${GDOC_FILE_ID} as application/pdf. Return only the base64 string.` }],
          mcp_servers: [{ type: "url", url: "https://drivemcp.googleapis.com/mcp/v1", name: "google-drive" }],
        }),
      });
      const data = await res.json();
      let b64 = "";
      for (const block of data.content || []) {
        const txt =
          block.type === "text" ? block.text :
          block.type === "mcp_tool_result" ? (block.content?.[0]?.text || "") : "";
        const clean = txt.trim().replace(/```[a-z]*\n?/g, "").replace(/\n/g, "");
        if (clean.length > 200) { b64 = clean; break; }
      }
      if (!b64) throw new Error("No PDF data");
      const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
      const url = URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }));
      Object.assign(document.createElement("a"), { href: url, download: "Aswin_Raj_Resume.pdf" }).click();
      URL.revokeObjectURL(url);
      setStatus("done");
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const cfg = {
    idle:    { label: "Download Resume",    border: "#0CFFD4", color: hov ? "#050A14" : "#0CFFD4", bg: hov ? "#0CFFD4" : "transparent" },
    loading: { label: "Fetching PDF…",      border: "#A78BFA", color: "#A78BFA", bg: "transparent" },
    done:    { label: "Downloaded ✓",       border: "#34D399", color: "#34D399", bg: "transparent" },
    error:   { label: "Retry ↺",            border: "#FF4D6D", color: "#FF4D6D", bg: "transparent" },
  }[status];

  return (
    <button
      onClick={status === "idle" || status === "error" ? download : undefined}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      disabled={status === "loading"}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "clamp(10px,1.2vw,12px)",
        fontWeight: 700,
        letterSpacing: "clamp(1px,.2vw,1.5px)",
        textTransform: "uppercase",
        padding: "clamp(11px,1.5vw,14px) clamp(20px,2.5vw,30px)",
        borderRadius: 8,
        border: `1.5px solid ${cfg.border}`,
        background: cfg.bg,
        color: cfg.color,
        cursor: status === "loading" ? "wait" : "pointer",
        transition: "all .25s ease",
        display: "flex",
        alignItems: "center",
        gap: 10,
        whiteSpace: "nowrap",
      }}
    >
      {status === "loading" && (
        <span style={{
          display: "inline-block", width: 11, height: 11,
          border: "2px solid #A78BFA", borderTopColor: "transparent",
          borderRadius: "50%", animation: "spin .7s linear infinite",
        }} />
      )}
      {cfg.label}
    </button>
  );
}

/* ══════════════════════════ HAMBURGER NAV ════════════════════════ */
function MobileMenu({ open, close, go }) {
  const NAV = ["about", "skills", "work", "projects", "contact"];
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(5,10,20,0.97)",
      backdropFilter: "blur(16px)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 40,
      opacity: open ? 1 : 0,
      pointerEvents: open ? "all" : "none",
      transition: "opacity .3s ease",
    }}>
      <button onClick={close} style={{
        position: "absolute", top: 20, right: 24,
        background: "none", border: "none", color: "#F0EDE8",
        fontSize: 28, cursor: "pointer", lineHeight: 1,
      }}>✕</button>
      {NAV.map((n, i) => (
        <span key={n} onClick={() => { go(n); close(); }} style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "clamp(22px,6vw,32px)",
          fontWeight: 700,
          color: "#F0EDE8",
          cursor: "pointer",
          letterSpacing: 1,
          textTransform: "uppercase",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(20px)",
          transition: `opacity .4s ease ${i * 0.06}s, transform .4s ease ${i * 0.06}s`,
        }}
          onMouseEnter={(e) => (e.target.style.color = "#0CFFD4")}
          onMouseLeave={(e) => (e.target.style.color = "#F0EDE8")}
        >
          <span style={{ color: "#0CFFD4", marginRight: 8, fontSize: "0.5em" }}>0{i + 1}.</span>
          {n}
        </span>
      ))}
    </div>
  );
}

/* ════════════════════════════ MAIN APP ════════════════════════════ */
export default function PortfolioV3() {
  const typed = useTypewriter(ROLES);
  const [scrolled, setScrolled] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("hero");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    setTimeout(() => setHeroReady(true), 100);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
  }, []);

  const NAV = ["about", "skills", "work", "projects", "contact"];

  return (
    <div style={{
      background: "#050A14",
      color: "#F0EDE8",
      fontFamily: "'Outfit', 'Inter', sans-serif",
      minHeight: "100vh",
      overflowX: "hidden",
    }}>
      {/* ═══════ GLOBAL STYLES ═══════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        a { text-decoration: none; color: inherit; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050A14; }
        ::-webkit-scrollbar-thumb { background: #0CFFD4; border-radius: 2px; }

        @keyframes spin   { to { transform: rotate(360deg); } }
        @keyframes float  { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes pglow  { 0%,100% { box-shadow: 0 0 18px rgba(12,255,212,.28); } 50% { box-shadow: 0 0 36px rgba(12,255,212,.5); } }
        @keyframes blink  { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes scanln { 0% { top: 0%; } 100% { top: 100%; } }
        @keyframes slideUp { from { opacity:0; transform: translateY(38px); } to { opacity:1; transform: translateY(0); } }
        @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }

        .mono { font-family: 'JetBrains Mono', monospace; }

        /* Nav links — desktop */
        .nl {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(10px, 1.1vw, 11px);
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.38);
          cursor: pointer;
          padding: 4px 0;
          border-bottom: 1px solid transparent;
          transition: color .2s, border-color .2s;
          white-space: nowrap;
        }
        .nl:hover, .nl.act { color: #F0EDE8; border-bottom-color: #0CFFD4; }

        /* Section helpers */
        .sec-lbl {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(10px, 1.1vw, 11px);
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #0CFFD4;
          margin-bottom: clamp(8px, 1.2vw, 12px);
        }
        .sec-h {
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: clamp(36px, 5vw, 56px);
          color: #F0EDE8;
        }

        /* Section padding — fluid */
        .sec { padding: clamp(64px, 9vw, 104px) 0; }

        /* Inner container — fluid max-width */
        .inn {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 clamp(16px, 4vw, 48px);
        }

        /* Primary CTA */
        .cta-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(10px, 1.2vw, 12px);
          font-weight: 700;
          letter-spacing: clamp(1px, .2vw, 1.5px);
          text-transform: uppercase;
          padding: clamp(11px, 1.5vw, 14px) clamp(20px, 2.5vw, 30px);
          border-radius: 8px;
          border: none;
          background: #0CFFD4;
          color: #050A14;
          cursor: pointer;
          transition: transform .2s, box-shadow .2s;
          animation: pglow 3s ease-in-out infinite;
          white-space: nowrap;
        }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(12,255,212,.3); }

        /* Divider */
        .divider { border: none; border-top: 1px solid rgba(255,255,255,0.05); }

        /* About grid — two col → single col */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 6vw, 80px);
          align-items: center;
        }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
        }

        /* Skills grid */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 0 clamp(32px, 5vw, 64px);
        }

        /* Projects grid — 3 → 2 → 1 */
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(14px, 2vw, 20px);
        }
        @media (max-width: 1024px) { .proj-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px)  { .proj-grid { grid-template-columns: 1fr; } }

        /* Stats grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(20px, 3vw, 32px);
        }
        @media (max-width: 640px) { .stats-grid { grid-template-columns: repeat(2, 1fr); row-gap: 36px; } }

        /* Experience rows */
        .exp-row {
          display: grid;
          grid-template-columns: clamp(140px,18vw,200px) 1fr;
          gap: clamp(16px, 3vw, 32px);
          padding: clamp(24px, 3.5vw, 32px) 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          align-items: start;
        }
        @media (max-width: 560px) {
          .exp-row { grid-template-columns: 1fr; gap: 8px; }
        }

        /* Hero CTA row */
        .hero-btns {
          display: flex;
          gap: clamp(10px, 1.5vw, 16px);
          flex-wrap: wrap;
        }

        /* Contact links grid */
        .contact-links { display: flex; flex-direction: column; gap: 12px; }

        /* Code card — hide on very small */
        @media (max-width: 400px) { .code-card { display: none; } }

        /* Cursor blink */
        .cursor {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          background: #0CFFD4;
          margin-left: 3px;
          vertical-align: text-bottom;
          animation: blink 1s step-end infinite;
        }

        /* Reduce motion */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: .01ms !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      {/* ═══════ MOBILE MENU ═══════ */}
      <MobileMenu open={menuOpen} close={() => setMenuOpen(false)} go={go} />

      {/* ═══════ NAV ═══════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(5,10,20,.9)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(12,255,212,.1)" : "none",
        transition: "all .35s",
      }}>
        <div className="inn" style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          height: "clamp(56px,7vw,64px)",
        }}>
          {/* Logo */}
          <span
            onClick={() => go("hero")}
            className="mono"
            style={{ fontWeight: 800, fontSize: "clamp(14px,2vw,16px)", cursor: "pointer", color: "#0CFFD4" }}
          >&lt;AR/&gt;</span>

          {/* Desktop nav */}
          <div style={{ display: isMobile ? "none" : "flex", gap: "clamp(20px,2.5vw,32px)" }}>
            {NAV.map((n) => (
              <span key={n} className={`nl${activeNav === n ? " act" : ""}`} onClick={() => go(n)}>{n}</span>
            ))}
          </div>

          {/* Mobile hamburger */}
          {isMobile && (
            <button onClick={() => setMenuOpen(true)} style={{
              background: "none", border: "1px solid rgba(12,255,212,.3)",
              color: "#0CFFD4", fontSize: 18, cursor: "pointer",
              padding: "6px 12px", borderRadius: 6, lineHeight: 1,
            }}>☰</button>
          )}
        </div>
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section id="hero" style={{
        minHeight: "100svh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        paddingTop: "clamp(80px,12vw,120px)",
        paddingBottom: "clamp(60px,8vw,80px)",
      }}>
        <ParticleCanvas />

        {/* Ambient blobs */}
        <div style={{
          position: "absolute", top: "18%", right: "8%",
          width: "clamp(200px,30vw,420px)", height: "clamp(200px,30vw,420px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167,139,250,.08) 0%, transparent 70%)",
          animation: "float 7s ease-in-out infinite",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "12%", left: "3%",
          width: "clamp(150px,20vw,300px)", height: "clamp(150px,20vw,300px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,77,109,.06) 0%, transparent 70%)",
          animation: "float 9s ease-in-out 2s infinite",
          pointerEvents: "none",
        }} />

        <div className="inn" style={{ position: "relative", zIndex: 2, width: "100%" }}>
          {/* Eyebrow */}
          <p className="mono" style={{
            fontSize: "clamp(10px,1.3vw,12px)",
            letterSpacing: "clamp(2px,.4vw,3px)",
            textTransform: "uppercase",
            color: "#0CFFD4",
            marginBottom: "clamp(14px,2vw,20px)",
            opacity: heroReady ? 1 : 0,
            animation: heroReady ? "slideUp .6s ease both" : "none",
            animationDelay: ".1s",
          }}>
            &gt; Available for opportunities
          </p>

          {/* Name */}
          <h1 style={{
            fontWeight: 800,
            fontSize: "clamp(44px,9vw,96px)",
            lineHeight: 1.0,
            letterSpacing: "clamp(-1px,-.2vw,-2px)",
            marginBottom: "clamp(12px,2vw,20px)",
          }}>
            {"Aswin".split("").map((c, i) => (
              <span key={i} style={{
                display: "inline-block",
                color: "#F0EDE8",
                opacity: heroReady ? 1 : 0,
                animation: heroReady ? `slideUp .6s cubic-bezier(.22,1,.36,1) both` : "none",
                animationDelay: `${.2 + i * .05}s`,
              }}>{c}</span>
            ))}{" "}
            {"Raj".split("").map((c, i) => (
              <span key={i} style={{
                display: "inline-block",
                color: "#0CFFD4",
                opacity: heroReady ? 1 : 0,
                animation: heroReady ? `slideUp .6s cubic-bezier(.22,1,.36,1) both` : "none",
                animationDelay: `${.52 + i * .05}s`,
              }}>{c}</span>
            ))}
          </h1>

          {/* Typewriter */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(15px,2.5vw,22px)",
            color: "rgba(240,237,232,.5)",
            marginBottom: "clamp(16px,2.5vw,28px)",
            minHeight: "1.5em",
            opacity: heroReady ? 1 : 0,
            animation: heroReady ? "slideUp .7s ease both" : "none",
            animationDelay: ".7s",
          }}>
            <span style={{ color: "#0CFFD4" }}>&gt; </span>
            {typed}
            <span className="cursor" />
          </div>

          {/* Tagline */}
          <p style={{
            fontSize: "clamp(13px,1.8vw,17px)",
            color: "rgba(240,237,232,.45)",
            maxWidth: "clamp(280px,55vw,520px)",
            lineHeight: 1.85,
            marginBottom: "clamp(28px,4vw,44px)",
            opacity: heroReady ? 1 : 0,
            animation: heroReady ? "slideUp .7s ease both" : "none",
            animationDelay: ".85s",
          }}>
            Backend developer building scalable APIs, full-stack apps, and clean systems
            with Python & Django — based in Tamil Nadu, India.
          </p>

          {/* CTA Buttons */}
          <div className="hero-btns" style={{
            opacity: heroReady ? 1 : 0,
            animation: heroReady ? "slideUp .7s ease both" : "none",
            animationDelay: "1s",
          }}>
            <button className="cta-btn" onClick={() => go("projects")}>
              View Projects →
            </button>
            <ResumeBtn />
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: "absolute",
          bottom: "clamp(20px,3vw,36px)",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          opacity: .35,
          animation: "float 2.2s ease-in-out infinite",
        }}>
          <span className="mono" style={{ fontSize: "clamp(8px,1vw,9px)", letterSpacing: 3, textTransform: "uppercase" }}>scroll</span>
          <div style={{ width: 1, height: "clamp(28px,4vw,40px)", background: "linear-gradient(to bottom,#0CFFD4,transparent)" }} />
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        padding: "clamp(40px,6vw,60px) 0",
        background: "rgba(12,255,212,.018)",
      }}>
        <div className="inn">
          <div className="stats-grid">
            <StatCard value={2}  suffix="+" label="Years Experience" delay={0}   />
            <StatCard value={5}  suffix=""  label="Projects Shipped"  delay={0.1} />
            <StatCard value={3}  suffix=""  label="Companies"          delay={0.2} />
            <StatCard value={10} suffix="+" label="Technologies"       delay={0.3} />
          </div>
        </div>
      </div>

      {/* ═══════ ABOUT ═══════ */}
      <section id="about" className="sec">
        <div className="inn">
          <div className="about-grid">
            <Reveal dir="left">
              <p className="sec-lbl">About Me</p>
              <h2 style={{
                fontSize: "clamp(24px,3.2vw,36px)",
                fontWeight: 800, marginBottom: "clamp(14px,2vw,20px)", lineHeight: 1.25,
              }}>
                I turn complex problems into elegant backend systems.
              </h2>
              <p style={{ fontSize: "clamp(13px,1.5vw,15px)", color: "rgba(240,237,232,.5)", lineHeight: 1.9, marginBottom: 14 }}>
                Results-oriented Software Developer with hands-on experience shipping production
                Django APIs, full-stack React apps, and cloud-deployed services. I thrive in
                Agile teams and care deeply about code quality and real user impact.
              </p>
              <p style={{ fontSize: "clamp(13px,1.5vw,15px)", color: "rgba(240,237,232,.5)", lineHeight: 1.9 }}>
                Currently at{" "}
                <span style={{ color: "#0CFFD4", fontWeight: 600 }}>Creative X</span>
                {" "}— and always open to interesting challenges.
              </p>
            </Reveal>

            <Reveal dir="right" delay={0.15}>
              <div
                className="code-card"
                style={{
                  background: "#0C1524",
                  borderRadius: "clamp(10px,1.5vw,16px)",
                  padding: "clamp(18px,2.5vw,28px)",
                  border: "1px solid rgba(255,255,255,.06)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "clamp(11px,1.3vw,13px)",
                  lineHeight: 2,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{
                  position: "absolute", left: 0, right: 0, height: 1,
                  background: "linear-gradient(90deg,transparent,rgba(12,255,212,.3),transparent)",
                  animation: "scanln 3.5s linear infinite",
                  pointerEvents: "none",
                }} />
                {[
                  ["name",      '"Aswin Raj S L"'],
                  ["role",      '"Backend Developer"'],
                  ["location",  '"Tamil Nadu, India"'],
                  ["email",     '"aswinraj20w@gmail.com"'],
                  ["stack",     '["Python","Django","React"]'],
                  ["education", '"B.E. AI/ML — 2024"'],
                  ["status",    '"Open to opportunities"'],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ color: "#A78BFA", flexShrink: 0 }}>{k}:</span>
                    <span style={{ color: v.startsWith('"') ? "#0CFFD4" : "#FCD34D" }}>{v},</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════ SKILLS ═══════ */}
      <section id="skills" className="sec" style={{ background: "rgba(255,255,255,.015)" }}>
        <div className="inn">
          <Reveal>
            <p className="sec-lbl">Technical Skills</p>
            <h2 className="sec-h">What I build with</h2>
          </Reveal>
          <div className="skills-grid">
            {SKILLS.map((s, i) => (
              <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ EXPERIENCE ═══════ */}
      <section id="work" className="sec">
        <div className="inn">
          <Reveal>
            <p className="sec-lbl">Experience</p>
            <h2 className="sec-h">Where I've worked</h2>
          </Reveal>

          {EXPERIENCE.map((e, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="exp-row">
                <span className="mono" style={{
                  fontSize: "clamp(10px,1.2vw,11px)",
                  color: e.accent,
                  letterSpacing: 1,
                  paddingTop: 4,
                }}>{e.period}</span>

                <div>
                  <div style={{
                    display: "flex", alignItems: "center", gap: "clamp(8px,1.2vw,12px)",
                    flexWrap: "wrap", marginBottom: 6,
                  }}>
                    <span style={{ fontSize: "clamp(14px,1.8vw,17px)", fontWeight: 700, color: "#F0EDE8" }}>
                      {e.role}
                    </span>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "clamp(9px,1vw,10px)",
                      padding: "2px 10px",
                      background: `${e.accent}18`,
                      color: e.accent,
                      borderRadius: 4,
                      border: `1px solid ${e.accent}30`,
                    }}>{e.company}</span>
                  </div>
                  <p className="mono" style={{
                    fontSize: "clamp(10px,1.1vw,11px)",
                    color: "rgba(255,255,255,.28)",
                    marginBottom: 14,
                  }}>{e.loc}</p>
                  <ul style={{ paddingLeft: 18, display: "flex", flexDirection: "column", gap: "clamp(5px,.8vw,8px)" }}>
                    {e.bullets.map((b, j) => (
                      <li key={j} style={{
                        fontSize: "clamp(12px,1.4vw,14px)",
                        color: "rgba(240,237,232,.45)",
                        lineHeight: 1.75,
                        listStyleType: "square",
                      }}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}

          {/* Education */}
          <Reveal delay={0.2}>
            <div style={{
              marginTop: "clamp(36px,5vw,56px)",
              background: "#0C1524",
              border: "1px solid rgba(255,255,255,.06)",
              borderRadius: "clamp(10px,1.5vw,14px)",
              padding: "clamp(20px,2.8vw,32px)",
            }}>
              <p className="sec-lbl" style={{ marginBottom: "clamp(16px,2vw,22px)" }}>Education</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px,2.5vw,22px)" }}>
                {[
                  ["B.E. – Artificial Intelligence & Machine Learning",
                   "Udaya College of Engineering, Kanyakumari", "Aug 2024 – Present"],
                  ["Diploma – Electronics & Communication Engineering",
                   "Maria Group of Institutions, Kanyakumari", "Jul 2020 – May 2023"],
                ].map(([deg, school, period], i) => (
                  <div key={i}>
                    {i > 0 && <hr className="divider" style={{ marginBottom: "clamp(16px,2vw,22px)" }} />}
                    <p style={{ fontSize: "clamp(13px,1.5vw,15px)", fontWeight: 600, marginBottom: 5 }}>{deg}</p>
                    <p className="mono" style={{
                      fontSize: "clamp(10px,1.2vw,11px)",
                      color: "rgba(255,255,255,.3)",
                    }}>{school} · {period}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ PROJECTS ═══════ */}
      <section id="projects" className="sec" style={{ background: "rgba(255,255,255,.015)" }}>
        <div className="inn">
          <Reveal>
            <p className="sec-lbl">Selected Work</p>
            <h2 className="sec-h">Projects</h2>
          </Reveal>
          <div className="proj-grid">
            {PROJECTS.map((p, i) => <ProjectCard key={p.name} p={p} i={i} />)}
          </div>
        </div>
      </section>

      {/* ═══════ CONTACT ═══════ */}
      <section id="contact" className="sec">
        <div className="inn" style={{ maxWidth: 680 }}>
          <Reveal>
            <p className="sec-lbl">Contact</p>
            <h2 style={{
              fontSize: "clamp(28px,5vw,54px)",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "clamp(14px,2vw,18px)",
            }}>
              Let's build something{" "}
              <span style={{ color: "#0CFFD4" }}>great</span>.
            </h2>
            <p style={{
              fontSize: "clamp(13px,1.5vw,15px)",
              color: "rgba(240,237,232,.42)",
              lineHeight: 1.9,
              marginBottom: "clamp(32px,5vw,52px)",
            }}>
              Open to full-time roles, freelance projects, and interesting collaborations.
              I respond within 24 hours.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="contact-links">
              {[
                { label: "Email",    val: "aswinraj20w@gmail.com",               href: "mailto:aswinraj20w@gmail.com",                         accent: "#0CFFD4" },
                { label: "GitHub",   val: "github.com/aswinraj0919",             href: "https://github.com/aswinraj0919",                     accent: "#A78BFA" },
                { label: "LinkedIn", val: "linkedin.com/in/aswin-raj-b3b228314", href: "https://www.linkedin.com/in/aswin-raj-b3b228314/",     accent: "#FCD34D" },
              ].map(({ label, val, href, accent }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "clamp(14px,2vw,20px) clamp(16px,2.5vw,24px)",
                      background: "#0C1524",
                      border: "1px solid rgba(255,255,255,.05)",
                      borderRadius: "clamp(8px,1.2vw,12px)",
                      transition: "border-color .2s, transform .2s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.transform = "translateX(5px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.05)"; e.currentTarget.style.transform = ""; }}
                  >
                    <div>
                      <p className="mono" style={{
                        fontSize: "clamp(9px,1vw,10px)",
                        letterSpacing: 2,
                        color: accent,
                        marginBottom: 4,
                      }}>{label}</p>
                      <p style={{ fontSize: "clamp(12px,1.5vw,14px)", fontWeight: 500, color: "#F0EDE8" }}>{val}</p>
                    </div>
                    <span style={{ fontSize: "clamp(16px,2vw,20px)", color: accent, opacity: .7 }}>↗</span>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,.04)",
        padding: "clamp(20px,3vw,28px) clamp(16px,4vw,48px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 10,
        maxWidth: 1080,
        margin: "0 auto",
      }}>
        <span className="mono" style={{ fontSize: "clamp(10px,1.2vw,11px)", color: "rgba(255,255,255,.18)" }}>
          © 2026 Aswin Raj S L
        </span>
        <span className="mono" style={{ fontSize: "clamp(10px,1.2vw,11px)", color: "rgba(255,255,255,.18)" }}>
          Tamil Nadu, India
        </span>
      </footer>
    </div>
  );
}