import React, { useState } from 'react'
import { FaUser, FaMobileAlt, FaLock, FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [pass, setPass] = useState('');
  const [adminPass, setAdminPass] = useState('');

  const handleSubmit = () => {
    if (name.length === 0) { alert('User Name is left'); return; }
    if (mobile.length === 0) { alert('Mobile no. is left'); return; }
    if (adminPass.length === 0) { alert('Admin Pass is left'); return; }
    if (pass.length === 0) { alert('Password is left'); return; }

    const url = `${process.env.REACT_APP_domain}/sjh-team-api/admin/createAccount.php`;
    let fData = new FormData();
    fData.append('name', name);
    fData.append('mobile', mobile);
    fData.append('pass', pass);
    fData.append('adminPass', adminPass);
    fData.append('email', email);
    fData.append('adminName', localStorage.getItem('user_name'));
    fData.append('adminMobile', localStorage.getItem('mobile_no'));
    fData.append('teamName', localStorage.getItem('team'));
    axios.post(url, fData).then(response => alert(response.data)).catch(error => alert(error));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        .cu-root {
          min-height: 100vh;
          background: #0a0a0a;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          box-sizing: border-box;
          font-family: 'Syne', sans-serif;
        }

        .cu-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 36px 32px;
          width: 100%;
          max-width: 440px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.6);
        }

        .cu-header-label {
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(245,245,240,0.28);
          font-family: 'DM Mono', monospace; margin-bottom: 6px;
        }
        .cu-header-title {
          font-size: 26px; font-weight: 800;
          color: #f5f5f0; letter-spacing: -0.02em;
          margin-bottom: 28px;
        }
        .cu-header-title span { color: #a78bfa; }

        .cu-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 0 0 24px;
        }

        .cu-field { margin-bottom: 16px; }
        .cu-label {
          display: block; font-size: 10px; font-weight: 700; letter-spacing: 0.13em;
          text-transform: uppercase; color: rgba(245,245,240,0.32);
          font-family: 'DM Mono', monospace; margin-bottom: 7px;
        }
        .cu-input-wrap {
          position: relative;
        }
        .cu-input-icon {
          position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
          color: rgba(245,245,240,0.22); font-size: 13px; pointer-events: none;
        }
        .cu-input {
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 9px;
          padding: 10px 13px 10px 36px;
          font-size: 13.5px; font-weight: 600;
          color: #f5f5f0; font-family: 'Syne', sans-serif;
          outline: none; box-sizing: border-box; transition: border-color 0.2s;
        }
        .cu-input:focus { border-color: rgba(167,139,250,0.5); }
        .cu-input::placeholder { color: rgba(245,245,240,0.18); }

        .cu-section-divider {
          display: flex; align-items: center; gap: 12px;
          margin: 20px 0 16px;
        }
        .cu-section-divider-line {
          flex: 1; height: 1px; background: rgba(255,255,255,0.06);
        }
        .cu-section-divider-label {
          font-size: 9.5px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(245,245,240,0.2);
          font-family: 'DM Mono', monospace; white-space: nowrap;
        }

        .cu-admin-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 9.5px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; font-family: 'DM Mono', monospace;
          color: #fbbf24; background: rgba(251,191,36,0.08);
          border: 1px solid rgba(251,191,36,0.2);
          padding: 3px 10px; border-radius: 99px; margin-bottom: 14px;
        }

        .cu-submit-btn {
          width: 100%; display: flex; align-items: center; justify-content: center;
          gap: 8px; padding: 12px 20px; border-radius: 9px; border: none;
          background: #a78bfa; color: #0e0a1f;
          font-size: 12px; font-weight: 800;
          font-family: 'Syne', sans-serif; letter-spacing: 0.08em; text-transform: uppercase;
          cursor: pointer; transition: background 0.2s, transform 0.15s; margin-top: 8px;
        }
        .cu-submit-btn:hover { background: #9333ea; color: #fff; transform: translateY(-1px); }
      `}</style>

      <div className="cu-root">
        <div className="cu-card">

          <div className="cu-header-label">Admin Panel</div>
          <div className="cu-header-title">Create <span>User</span></div>
          <div className="cu-divider" />

          {/* User Name */}
          <div className="cu-field">
            <label className="cu-label">User Name</label>
            <div className="cu-input-wrap">
              <span className="cu-input-icon"><FaUser /></span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter username..."
                className="cu-input"
              />
            </div>
          </div>

          {/* Mobile */}
          <div className="cu-field">
            <label className="cu-label">Mobile No.</label>
            <div className="cu-input-wrap">
              <span className="cu-input-icon"><FaMobileAlt /></span>
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                type="tel"
                placeholder="Enter mobile number..."
                className="cu-input"
              />
            </div>
          </div>

          {/* Email */}
          <div className="cu-field">
            <label className="cu-label">Email ID</label>
            <div className="cu-input-wrap">
              <span className="cu-input-icon"><FaMobileAlt /></span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter email address..."
                className="cu-input"
              />
            </div>
          </div>

          {/* Password */}
          <div className="cu-field">
            <label className="cu-label">Password</label>
            <div className="cu-input-wrap">
              <span className="cu-input-icon"><FaLock /></span>
              <input
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                type="password"
                placeholder="Set user password..."
                className="cu-input"
              />
            </div>
          </div>

          {/* Admin section divider */}
          <div className="cu-section-divider">
            <div className="cu-section-divider-line" />
            <span className="cu-section-divider-label">Admin Verification</span>
            <div className="cu-section-divider-line" />
          </div>

          {/* Admin Password */}
          <div className="cu-field">
            <label className="cu-label">Admin Password</label>
            <div className="cu-input-wrap">
              <span className="cu-input-icon"><FaLock /></span>
              <input
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                type="password"
                placeholder="Enter admin password..."
                className="cu-input"
              />
            </div>
          </div>

          <button onClick={handleSubmit} className="cu-submit-btn">
            <FaPaperPlane size={12} /> Create Account
          </button>

        </div>
      </div>
    </>
  );
};

export default Login;
