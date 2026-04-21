import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../../assets/logo.jpg";

const navLinks = [
  { to: "dashboard", label: "Dashboard", icon: "⬡" },
  { to: "cashbook", label: "Cash Book", icon: "◈" },
  { to: "deposites", label: "Deposits", icon: "◆" },
  { to: "loans", label: "Loans", icon: "◇" },
  { to: "sip", label: "SIP", icon: "◎" },
  { to: "penaltys", label: "Penalties", icon: "▲" },
  { to: "expendatures", label: "Expenditure", icon: "◐" },
  { to: "remuneration", label: "Remuneration", icon: "◑" },
  { to: "sign_up", label: "Create User", icon: "+" },
];

const guestLinks = [
  { to: "/", label: "Admin Page", icon: "⬡" },
  { to: "about", label: "About", icon: "◎" },
  { to: "login", label: "Login", icon: "→" },
  { to: "contact", label: "Contact", icon: "◈" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState("");
  const [compatible, setCompatible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const reload_flag = localStorage.getItem('reload_flag');
    if (reload_flag != null) {
      localStorage.removeItem('reload_flag');
      window.location.reload();
    }

    const user = localStorage.getItem('user_name');
    if (!user) {
      navigate('/');
    } else {
      setAuth(user);
    }

    if (typeof Storage === "undefined") {
      setCompatible(false);
    }
  }, []);

  const closeMenu = () => {
    setOpen(false);
    window.scrollTo(0, 0);
  };

  const teamName = localStorage.getItem('team') || 'Team';
  const links = auth ? navLinks : guestLinks;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        :root {
          --nav-bg: #0a0a0a;
          --nav-border: rgba(255,255,255,0.06);
          --accent: #f0c040;
          --accent-dim: rgba(240,192,64,0.12);
          --text-primary: #f5f5f0;
          --text-muted: rgba(245,245,240,0.45);
          --sidebar-width: 260px;
          --topbar-height: 56px;
        }

        /* ---- BROWSER WARNING ---- */
        .browser-warn {
          position: fixed; inset: 0; z-index: 9999;
          background: #c0392b;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 16px; padding: 32px;
          font-family: 'Syne', sans-serif;
          color: #fff; text-align: center;
          font-size: 1rem; line-height: 1.6;
        }
        .browser-warn a {
          background: #fff; color: #c0392b;
          padding: 8px 28px; border-radius: 99px;
          font-weight: 700; text-decoration: none;
        }

        /* ---- TOP BAR ---- */
        .topbar {
          position: fixed; top: 0; left: 0; right: 0;
          height: var(--topbar-height);
          background: var(--nav-bg);
          border-bottom: 1px solid var(--nav-border);
          display: flex; align-items: center;
          padding: 0 18px; gap: 14px;
          z-index: 200;
          font-family: 'Syne', sans-serif;
        }

        .topbar-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .topbar-logo img {
          width: 30px; height: 30px;
          border-radius: 6px; object-fit: cover;
          border: 1px solid var(--nav-border);
        }
        .topbar-logo-name {
          font-size: 0.9rem; font-weight: 800;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--text-primary);
        }

        /* Team badge in topbar */
        .topbar-team {
          margin-left: auto;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--accent);
          background: var(--accent-dim);
          border: 1px solid rgba(240,192,64,0.25);
          padding: 3px 12px; border-radius: 99px;
          font-family: 'DM Mono', monospace;
          white-space: nowrap;
          overflow: hidden; text-overflow: ellipsis;
          max-width: 140px;
        }

        /* ---- HAMBURGER ---- */
        .ham-btn {
          background: none; border: none;
          cursor: pointer; padding: 6px;
          display: flex; flex-direction: column;
          gap: 5px; flex-shrink: 0;
          border-radius: 6px;
          transition: background 0.2s;
        }
        .ham-btn:hover { background: rgba(255,255,255,0.05); }
        .ham-btn span {
          display: block; height: 2px; border-radius: 2px;
          background: var(--text-primary);
          transition: transform 0.3s cubic-bezier(.77,0,.175,1), opacity 0.2s, width 0.3s;
        }
        .ham-btn span:nth-child(1) { width: 22px; }
        .ham-btn span:nth-child(2) { width: 16px; }
        .ham-btn span:nth-child(3) { width: 22px; }
        .ham-btn.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); width: 22px; }
        .ham-btn.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .ham-btn.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); width: 22px; }

        /* ---- OVERLAY ---- */
        .sidebar-overlay {
          position: fixed; inset: 0; z-index: 299;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(2px);
          opacity: 0; pointer-events: none;
          transition: opacity 0.3s;
        }
        .sidebar-overlay.visible {
          opacity: 1; pointer-events: all;
        }

        /* ---- SIDEBAR ---- */
        .sidebar {
          position: fixed;
          top: 0; left: 0;
          width: var(--sidebar-width);
          height: 100%;
          background: #0f0f0f;
          border-right: 1px solid var(--nav-border);
          z-index: 300;
          display: flex; flex-direction: column;
          transform: translateX(-100%);
          transition: transform 0.35s cubic-bezier(.77,0,.175,1);
          font-family: 'Syne', sans-serif;
          overflow: hidden;
        }
        .sidebar.open {
          transform: translateX(0);
        }

        /* Sidebar header */
        .sidebar-header {
          display: flex; align-items: center; gap: 12px;
          padding: 18px 20px 16px;
          border-bottom: 1px solid var(--nav-border);
          flex-shrink: 0;
        }
        .sidebar-header img {
          width: 36px; height: 36px; border-radius: 8px;
          object-fit: cover; border: 1px solid var(--nav-border);
        }
        .sidebar-header-text { display: flex; flex-direction: column; gap: 2px; }
        .sidebar-header-title {
          font-size: 0.88rem; font-weight: 800;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--text-primary);
        }
        .sidebar-header-sub {
          font-size: 0.68rem; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--accent);
          font-family: 'DM Mono', monospace;
        }

        /* Nav scroll area */
        .sidebar-scroll {
          flex: 1; overflow-y: auto;
          padding: 12px 0;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.1) transparent;
        }
        .sidebar-scroll::-webkit-scrollbar { width: 4px; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

        /* Section label */
        .sidebar-section-label {
          font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--text-muted);
          padding: 10px 20px 4px;
          font-family: 'DM Mono', monospace;
        }

        /* Nav item */
        .nav-item {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 20px;
          color: rgba(245,245,240,0.7);
          text-decoration: none;
          font-size: 0.99rem; font-weight: 600;
          letter-spacing: 0.02em;
          transition: color 0.2s, background 0.2s, padding-left 0.2s;
          border-left: 2px solid transparent;
          position: relative;
        }
        .nav-item:hover {
          color: var(--text-primary);
          background: rgba(255,255,255,0.04);
          padding-left: 24px;
          border-left-color: var(--accent);
        }
        .nav-item .nav-icon {
          font-size: 0.8rem; opacity: 0.5;
          width: 16px; text-align: center;
          flex-shrink: 0;
          transition: opacity 0.2s;
          font-family: 'DM Mono', monospace;
        }
        .nav-item:hover .nav-icon { opacity: 1; color: var(--accent); }

        /* Logout link in sidebar */
        .sidebar-footer {
          border-top: 1px solid var(--nav-border);
          padding: 12px 0;
          flex-shrink: 0;
        }
        .nav-item.logout {
          color: rgba(220,80,80,0.75);
        }
        .nav-item.logout:hover {
          color: #e05555;
          background: rgba(220,80,80,0.06);
          border-left-color: #e05555;
        }

        /* ---- DESKTOP NAV ---- */
        @media (min-width: 900px) {
          .topbar { padding: 0 24px; }

          .desktop-nav {
            display: flex; align-items: center;
            gap: 2px;
            overflow-x: auto;
            scrollbar-width: none;
            flex: 1;
            margin: 0 8px;
          
          }
          .desktop-nav::-webkit-scrollbar { display: none; }

          .desktop-nav .nav-item {
            border-left: none;
            border-bottom: 2px solid transparent;
            padding: 6px 12px;
            font-size: 0.99rem;
            white-space: nowrap;
            color: var(--text-muted);
            border-radius: 6px;
          }
          .desktop-nav .nav-item:hover {
            color: var(--text-primary);
            background: rgba(255,255,255,0.05);
            padding-left: 12px;
            border-left: none;
            border-bottom: 2px solid var(--accent);
            border-radius: 6px 6px 0 0;
          }
          .desktop-nav .nav-item .nav-icon { display: none; }

          /* Hide ham on desktop */
          .ham-btn { display: none; }

          /* Hide sidebar on desktop (no sidebar mode) */
          .sidebar, .sidebar-overlay { display: none; }
        }

        @media (max-width: 899px) {
          .desktop-nav { display: none; }
          .topbar-team { display: none; }
        }
      `}</style>

      {/* Browser incompatibility warning */}
      {!compatible && (
        <div className="browser-warn">
          Your browser does not support this web app. Please update to continue.
          <a href="https://play.google.com/store/apps/details?id=com.android.chrome&pcampaignid=web_share">
            Update Chrome
          </a>
        </div>
      )}

      {/* ── TOP BAR ── */}
      <nav className="topbar">
        {/* Hamburger — mobile only */}
        <button
          className={`ham-btn ${open ? 'open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        {/* Logo */}
        <Link to={auth ? "dashboard" : "/"} className="topbar-logo">
          <img src={Logo} alt="logo" />
          <span className="topbar-logo-name">{teamName}</span>
        </Link>

        {/* Desktop inline nav */}
        {auth && (
          <div className="desktop-nav">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="nav-item"
                onClick={() => window.scrollTo(0, 0)}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
        {!auth && (
          <div className="desktop-nav">
            {guestLinks.map(({ to, label }) => (
              <Link key={to} to={to} className="nav-item">{label}</Link>
            ))}
          </div>
        )}

        {/* Team badge — desktop only */}
        {auth && <span className="topbar-team">{teamName}</span>}
      </nav>

      {/* ── SIDEBAR (mobile) ── */}
      <div
        className={`sidebar-overlay ${open ? 'visible' : ''}`}
        onClick={() => setOpen(false)}
      />

      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img src={Logo} alt="logo" />
          <div className="sidebar-header-text">
            <span className="sidebar-header-title">FinTrack</span>
            {auth && <span className="sidebar-header-sub">{teamName}</span>}
          </div>
        </div>

        <div className="sidebar-scroll">
          {auth ? (
            <>
              <div className="sidebar-section-label">Navigation</div>
              {navLinks.map(({ to, label, icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="nav-item"
                  onClick={closeMenu}
                >
                  <span className="nav-icon">{icon}</span>
                  {label}
                </Link>
              ))}
            </>
          ) : (
            <>
              <div className="sidebar-section-label">Menu</div>
              {guestLinks.map(({ to, label, icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="nav-item"
                  onClick={closeMenu}
                >
                  <span className="nav-icon">{icon}</span>
                  {label}
                </Link>
              ))}
            </>
          )}
        </div>

        {auth && (
          <div className="sidebar-footer">
            <a href="logout" className="nav-item logout">
              <span className="nav-icon">↩</span>
              Logout
            </a>
          </div>
        )}
      </aside>
    </>
  );
};

export default Navbar;
