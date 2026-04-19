import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { SiGoogleplay, SiAppstore } from 'react-icons/si';
import { Link } from 'react-router-dom';

const Footer = () => {

  /* ── all original business logic, untouched ── */
  const [teamsnames, setTeams] = useState([]);

  function getTotalTeamsOfAdmin() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/admin/getAllTeamOfAdmin.php`;
    let fData2 = new FormData();
    fData2.append('adminname', localStorage.getItem('user_name'));
    axios.post(url2, fData2).then((response) => {
      const APIResponse = response.data;
      setTeams(APIResponse);
    }).catch(error => alert(error, " Try Again...!"));
  }

  const changeTeam = (team) => {
    window.scrollTo(0, 0);
    console.log("team change");
    console.log(team);
    localStorage.setItem('team', team);
    window.location.reload();
  };

  useEffect(() => {
    getTotalTeamsOfAdmin();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        .footer-root {
          background: #0d0d0d;
          border-top: 1px solid rgba(255,255,255,0.07);
          font-family: 'Syne', sans-serif;
          color: rgba(245,245,240,0.55);
          padding: 56px 24px 0;
          margin-top: 64px;
        }

        .footer-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ── top grid ── */
        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: 48px;
          padding-bottom: 48px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        @media (max-width: 860px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr; gap: 32px; }
          .footer-root { padding: 40px 16px 0; }
        }

        /* Brand */
        .footer-brand-name {
          font-size: 22px;
          font-weight: 800;
          color: #f5f5f0;
          letter-spacing: -0.02em;
          margin-bottom: 4px;
        }
        .footer-brand-name span { color: #f0c040; }
        .footer-tagline {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(245,245,240,0.25);
          font-family: 'DM Mono', monospace;
          margin-bottom: 16px;
        }
        .footer-desc {
          font-size: 13.5px;
          line-height: 1.7;
          color: rgba(245,245,240,0.45);
          margin-bottom: 22px;
          max-width: 300px;
        }

        /* Social icons */
        .footer-socials {
          display: flex;
          gap: 10px;
        }
        .footer-social-btn {
          width: 36px; height: 36px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.03);
          display: flex; align-items: center; justify-content: center;
          color: rgba(245,245,240,0.4);
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          text-decoration: none;
        }
        .footer-social-btn:hover {
          background: rgba(240,192,64,0.12);
          border-color: rgba(240,192,64,0.35);
          color: #f0c040;
        }

        /* Column headings */
        .footer-col-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(245,245,240,0.3);
          font-family: 'DM Mono', monospace;
          margin-bottom: 18px;
        }

        /* Newsletter */
        .footer-newsletter-desc {
          font-size: 13px;
          line-height: 1.7;
          color: rgba(245,245,240,0.4);
          margin-bottom: 16px;
        }
        .footer-email-row {
          display: flex;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          overflow: hidden;
          background: rgba(255,255,255,0.03);
          transition: border-color 0.2s;
        }
        .footer-email-row:focus-within {
          border-color: rgba(240,192,64,0.45);
        }
        .footer-email-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          padding: 10px 14px;
          font-size: 13px;
          color: #f5f5f0;
          font-family: 'Syne', sans-serif;
        }
        .footer-email-input::placeholder { color: rgba(245,245,240,0.25); }
        .footer-subscribe-btn {
          background: #f0c040;
          border: none;
          padding: 10px 18px;
          font-size: 12px;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
          letter-spacing: 0.06em;
          color: #1a1400;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .footer-subscribe-btn:hover { background: #e6b800; }

        /* App store */
        .footer-app-desc {
          font-size: 13px;
          line-height: 1.7;
          color: rgba(245,245,240,0.4);
          margin-bottom: 18px;
        }
        .footer-app-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-app-link {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: rgba(245,245,240,0.6);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 9px;
          padding: 9px 14px;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          font-size: 13px;
          font-weight: 600;
        }
        .footer-app-link:hover {
          background: rgba(240,192,64,0.08);
          border-color: rgba(240,192,64,0.3);
          color: #f0c040;
        }
        .footer-app-link-sub {
          font-size: 10px;
          color: rgba(245,245,240,0.3);
          font-family: 'DM Mono', monospace;
          display: block;
          margin-top: 1px;
        }

        /* ── Team switcher ── */
        .footer-teams-section {
          padding: 28px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .footer-teams-label {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(245,245,240,0.25);
          font-family: 'DM Mono', monospace;
          margin-bottom: 14px;
        }
        .footer-teams-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .footer-team-btn {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(245,245,240,0.7);
          border-radius: 99px;
          padding: 6px 18px;
          font-size: 12.5px;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .footer-team-btn:hover {
          background: rgba(240,192,64,0.12);
          border-color: rgba(240,192,64,0.4);
          color: #f0c040;
        }

        /* ── bottom bar ── */
        .footer-bottom {
          padding: 20px 0 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
        }
        .footer-copy {
          font-size: 12px;
          color: rgba(245,245,240,0.2);
          font-family: 'DM Mono', monospace;
        }
        .footer-admin-links {
          display: flex;
          gap: 8px;
        }
        .footer-admin-link {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(245,245,240,0.25);
          font-family: 'DM Mono', monospace;
          text-decoration: none;
          padding: 5px 12px;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 6px;
          transition: color 0.2s, border-color 0.2s;
        }
        .footer-admin-link:hover {
          color: rgba(245,245,240,0.6);
          border-color: rgba(255,255,255,0.15);
        }
      `}</style>

      <footer className="footer-root">
        <div className="footer-inner">

          {/* ── Top Grid ── */}
          <div className="footer-grid">

            {/* Brand */}
            <div>
              <div className="footer-brand-name">SJH <span>Foundation</span></div>
              <div className="footer-tagline">Financial Solutions</div>
              <p className="footer-desc">
                Your trusted partner in financial solutions, helping you reach your dreams with flexible loan options.
              </p>
              <div className="footer-socials">
                <a href="#" className="footer-social-btn" aria-label="Facebook"><FaFacebookF size={14} /></a>
                <a href="#" className="footer-social-btn" aria-label="Twitter"><FaTwitter size={14} /></a>
                <a href="#" className="footer-social-btn" aria-label="Instagram"><FaInstagram size={14} /></a>
                <a href="#" className="footer-social-btn" aria-label="LinkedIn"><FaLinkedinIn size={14} /></a>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <div className="footer-col-title">Stay Updated</div>
              <p className="footer-newsletter-desc">
                Subscribe to get the latest updates on loan rates and financial tips.
              </p>
              <div className="footer-email-row">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="footer-email-input"
                />
                <button className="footer-subscribe-btn">Subscribe</button>
              </div>
            </div>

            {/* Download App */}
            <div>
              <div className="footer-col-title">Get the App</div>
              <p className="footer-app-desc">
                Manage your loans on the go with our mobile app.
              </p>
              <div className="footer-app-links">
                <a href="#" className="footer-app-link">
                  <SiGoogleplay size={18} />
                  <span>
                    Google Play
                    <span className="footer-app-link-sub">Android</span>
                  </span>
                </a>
                <a href="#" className="footer-app-link">
                  <SiAppstore size={18} />
                  <span>
                    App Store
                    <span className="footer-app-link-sub">iOS</span>
                  </span>
                </a>
              </div>
            </div>

          </div>

          {/* ── Team Switcher ── */}
          {teamsnames.length > 1 && (
            <div className="footer-teams-section">
              <div className="footer-teams-label">Switch Team</div>
              <div className="footer-teams-row">
                {teamsnames.map((item, index) => (
                  <button
                    key={index}
                    className="footer-team-btn"
                    onClick={() => changeTeam(item.team)}
                  >
                    {item.team}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Bottom Bar ── */}
          <div className="footer-bottom">
            <span className="footer-copy">© 2024 SJH Foundation. All rights reserved.</span>
            <div className="footer-admin-links">
              <Link
                to="/transfertoaadmin"
                className="footer-admin-link"
                onClick={() => window.scrollTo(0, 0)}
              >
                Transfer Admin
              </Link>
              <Link
                to="/adminsetting"
                className="footer-admin-link"
                onClick={() => window.scrollTo(0, 0)}
              >
                Admin Settings
              </Link>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;
