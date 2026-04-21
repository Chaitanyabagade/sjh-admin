import React, { useEffect, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';

const TransferAnotherAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [spinner, setSpinner] = useState(0);
  const [admin1, setAdmin1] = useState("");
  const [admin2, setAdmin2] = useState("");
  const [amount, setAmount] = useState(0);
  const [grandAdminPass, setGrandAdminPass] = useState("");

  function getTotalAdminNames() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/admin/allAdminName.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));
    axios.post(url2, fData2)
      .then((response) => setAdmins(response.data))
      .catch(error => alert(error, " Try Again...!"));
  }

  useEffect(() => { getTotalAdminNames(); }, []);

  const handleTransfertoaadmin = () => {
    if (admin1.length === 0 || admin1 === 'Select Admin 1...') {
      return alert("From Admin is left");
    }
    if (admin2.length === 0 || admin2 === 'Select Admin 2...') {
      return alert("To Admin is left");
    }
    if (admin1 === admin2) {
      return alert("Both admin names are same, please select another...");
    }
    if (amount <= 0) {
      return alert("Amount is left...");
    }
    if (grandAdminPass.length === 0) {
      return alert("Grand Admin Password is left...");
    }

    if (confirm(`Confirm transfer from ${admin1} → ${admin2} of ₹${Number(amount).toLocaleString('en-IN')}?`)) {
      setSpinner(1);
      const url = `${process.env.REACT_APP_domain}/sjh-team-api/admin/transfertoaadmin.php`;
      let fData = new FormData();
      fData.append('admin1', admin1);
      fData.append('admin2', admin2);
      fData.append('amount', amount);
      fData.append('team', localStorage.getItem('team'));
      fData.append('gadminpass', grandAdminPass);

      axios.post(url, fData)
        .then((result) => {
          setSpinner(0);
          if (result.status == 200) alert("Successfully Transferred!");
          else alert(result.data);
        })
        .catch(error => alert(error, " Try Again...!"));
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        .ta-root {
          min-height: 100vh;
          background: #0a0a0a;
          padding: 90px 20px 60px;
          box-sizing: border-box;
          font-family: 'Syne', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ta-inner { width: 100%; max-width: 480px; }

        /* spinner */
        .ta-spinner-overlay {
          position: fixed; inset: 0; z-index: 999;
          background: rgba(0,0,0,0.65);
          display: flex; align-items: center; justify-content: center;
        }
        .ta-spinner {
          width: 44px; height: 44px;
          border: 3px solid rgba(240,192,64,0.15);
          border-top-color: #f0c040;
          border-radius: 50%;
          animation: ta-spin 0.75s linear infinite;
        }
        @keyframes ta-spin { to { transform: rotate(360deg); } }

        /* header */
        .ta-header {
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 28px;
          width: 100%;
        }
        .ta-header-label {
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(245,245,240,0.28);
          font-family: 'DM Mono', monospace; margin-bottom: 6px;
        }
        .ta-header-title {
          font-size: clamp(22px, 4vw, 30px); font-weight: 800;
          color: #f5f5f0; letter-spacing: -0.02em;
        }
        .ta-header-title span { color: #f0c040; }

        /* form card */
        .ta-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 28px;
          width: 100%;
          box-sizing: border-box;
        }
        .ta-card-title {
          font-size: 11px; font-weight: 700; letter-spacing: 0.15em;
          text-transform: uppercase; color: rgba(245,245,240,0.28);
          font-family: 'DM Mono', monospace; margin-bottom: 24px;
        }

        /* arrow indicator between admins */
        .ta-arrow-row {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 20px;
        }
        .ta-arrow-row .ta-field-wrap { flex: 1; }
        .ta-arrow-icon {
          font-size: 18px; color: #f0c040;
          padding-top: 20px; flex-shrink: 0;
        }

        /* field */
        .ta-field { margin-bottom: 16px; }
        .ta-label {
          display: block; font-size: 10px; font-weight: 700; letter-spacing: 0.13em;
          text-transform: uppercase; color: rgba(245,245,240,0.32);
          font-family: 'DM Mono', monospace; margin-bottom: 7px;
        }
        .ta-input, .ta-select {
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 9px;
          padding: 10px 13px; font-size: 13.5px; font-weight: 600;
          color: #f5f5f0; font-family: 'Syne', sans-serif;
          outline: none; box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .ta-input:focus, .ta-select:focus { border-color: rgba(240,192,64,0.5); }
        .ta-input::placeholder { color: rgba(245,245,240,0.2); }
        .ta-select {
          appearance: none; cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(245,245,240,0.3)' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 13px center;
        }
        .ta-select option { background: #1a1a1a; color: #f5f5f0; }

        /* divider */
        .ta-divider {
          border: none; border-top: 1px solid rgba(255,255,255,0.06);
          margin: 20px 0;
        }

        /* password eye toggle */
        .ta-pass-wrap { position: relative; }
        .ta-pass-wrap .ta-input { padding-right: 44px; }
        .ta-eye-btn {
          position: absolute; right: 13px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: rgba(245,245,240,0.3); font-size: 14px;
          transition: color 0.2s; padding: 0; line-height: 1;
        }
        .ta-eye-btn:hover { color: rgba(245,245,240,0.7); }

        /* summary pill */
        .ta-summary {
          background: rgba(240,192,64,0.06);
          border: 1px solid rgba(240,192,64,0.15);
          border-radius: 9px; padding: 12px 14px;
          margin-bottom: 20px;
          font-family: 'DM Mono', monospace; font-size: 11.5px;
          color: rgba(245,245,240,0.5); line-height: 1.7;
          display: ${(admin1 && admin1 !== 'Select Admin 1...' && admin2 && admin2 !== 'Select Admin 2...' && amount > 0) ? 'block' : 'none'};
        }
        .ta-summary strong { color: #f0c040; }

        /* submit */
        .ta-submit-btn {
          width: 100%; display: flex; align-items: center; justify-content: center;
          gap: 8px; padding: 12px 20px; border-radius: 9px; border: none;
          background: #f0c040; color: #1a1400; font-size: 12px; font-weight: 800;
          font-family: 'Syne', sans-serif; letter-spacing: 0.08em; text-transform: uppercase;
          cursor: pointer; transition: background 0.2s, transform 0.15s;
        }
        .ta-submit-btn:hover { background: #e6b800; transform: translateY(-1px); }
        .ta-submit-btn:active { transform: translateY(0); }
      `}</style>

      {spinner ? <div className="ta-spinner-overlay"><div className="ta-spinner" /></div> : null}

      <div className="ta-root">
        <div className="ta-inner">

          {/* Header */}
          <div className="ta-header">
            <div className="ta-header-label">Finance</div>
            <div className="ta-header-title">Admin <span>Transfer</span></div>
          </div>

          {/* Form Card */}
          <div className="ta-card">
            <div className="ta-card-title">Transfer Funds Between Admins</div>

            {/* From / To admins side by side with arrow */}
            <div className="ta-arrow-row">
              <div className="ta-field-wrap">
                <label className="ta-label">From Admin</label>
                <select value={admin1} onChange={(e) => setAdmin1(e.target.value)} className="ta-select">
                  <option>Select Admin 1...</option>
                  {admins.map((a, i) => <option key={i}>{a.admin_name}</option>)}
                </select>
              </div>
              <div className="ta-arrow-icon">→</div>
              <div className="ta-field-wrap">
                <label className="ta-label">To Admin</label>
                <select value={admin2} onChange={(e) => setAdmin2(e.target.value)} className="ta-select">
                  <option>Select Admin 2...</option>
                  {admins.map((a, i) => <option key={i}>{a.admin_name}</option>)}
                </select>
              </div>
            </div>

            <hr className="ta-divider" />

            {/* Amount */}
            <div className="ta-field">
              <label className="ta-label">Amount (₹)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="ta-input"
              />
            </div>

            {/* Grand Admin Password */}
            <div className="ta-field">
              <label className="ta-label">Grand Admin Password</label>
              <PasswordInput value={grandAdminPass} onChange={setGrandAdminPass} />
            </div>

            <hr className="ta-divider" />

            {/* Live Summary */}
            {admin1 && admin1 !== 'Select Admin 1...' && admin2 && admin2 !== 'Select Admin 2...' && amount > 0 && (
              <div style={{
                background: 'rgba(240,192,64,0.06)',
                border: '1px solid rgba(240,192,64,0.15)',
                borderRadius: '9px', padding: '12px 14px',
                marginBottom: '20px',
                fontFamily: '"DM Mono", monospace', fontSize: '11.5px',
                color: 'rgba(245,245,240,0.5)', lineHeight: 1.7,
              }}>
                Transferring <strong style={{ color: '#f0c040' }}>₹ {Number(amount).toLocaleString('en-IN')}</strong>
                &nbsp;from <strong style={{ color: '#f5f5f0' }}>{admin1}</strong>
                &nbsp;→ <strong style={{ color: '#f5f5f0' }}>{admin2}</strong>
              </div>
            )}

            {/* Submit */}
            <button onClick={handleTransfertoaadmin} className="ta-submit-btn">
              <FaPaperPlane size={12} /> Confirm Transfer
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

/* Small inline password toggle sub-component */
const PasswordInput = ({ value, onChange }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="ta-pass-wrap">
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter password"
        className="ta-input"
      />
      <button className="ta-eye-btn" onClick={() => setShow(s => !s)} type="button">
        {show ? '🙈' : '👁'}
      </button>
    </div>
  );
};

export default TransferAnotherAdmin;
