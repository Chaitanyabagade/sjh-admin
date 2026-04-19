import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AllAdmin from './AllAdmin';

const Cashbook = () => {
  const [total_amt_cashbook_team, settotal_amt_cashbook_team] = useState(0);
  const [names, setNames] = useState([]);
  const [data2, setData2] = useState([]);
  const [total_amt, setTotal_amt] = useState(0);

  /* ── all original business logic untouched ── */
  function getTotalCashATHandAtAllAdmin() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/admin/getTotalCashAtAllCashbook.php`;
    let fData2 = new FormData();
    fData2.append('team', localStorage.getItem('team'));
    axios.post(url2, fData2).then((response) => {
      settotal_amt_cashbook_team(response.data);
    }).catch(error => alert(error, " Try Again...!"));
  }

  function getTotalAdminNames() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/admin/allAdminName.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));
    axios.post(url2, fData2).then((response) => {
      setNames(response.data);
    }).catch(error => alert(error, " Try Again...!"));
  }

  const getTotalCashATHand = (team, admin_name) => {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/admin/getTotalCashAtHand.php`;
    let fData2 = new FormData();
    fData2.append('team', team);
    fData2.append('admin_name', admin_name);
    axios.post(url2, fData2).then((response) => {
      setTotal_amt(response.data);
    }).catch(error => alert(error, " Try Again...!"));
  };

  useEffect(() => {
    getTotalAdminNames();
    getTotalCashATHandAtAllAdmin();
  }, []);

  const isPositive = total_amt_cashbook_team >= 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        .cb-root {
          min-height: 100vh;
          background: #0a0a0a;
          padding: 100px 20px 60px;
          box-sizing: border-box;
          font-family: 'Syne', sans-serif;
        }

        .cb-inner {
          max-width: 780px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .cb-page-header {
          margin-bottom: 10px;
        }
        .cb-page-label {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(245,245,240,0.28);
          font-family: 'DM Mono', monospace;
          margin-bottom: 6px;
        }
        .cb-page-title {
          font-size: clamp(22px, 4vw, 30px);
          font-weight: 800;
          color: #f5f5f0;
          letter-spacing: -0.02em;
        }
        .cb-page-title span { color: #f0c040; }

        /* Total card */
        .cb-total-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .cb-total-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(245,245,240,0.35);
          font-family: 'DM Mono', monospace;
          margin-bottom: 6px;
        }
        .cb-total-value {
          font-size: 26px;
          font-weight: 800;
          font-family: 'Syne', sans-serif;
          letter-spacing: -0.02em;
        }
        .cb-total-badge {
          font-size: 11px;
          font-weight: 700;
          font-family: 'DM Mono', monospace;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 99px;
        }

        .cb-section-label {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(245,245,240,0.25);
          font-family: 'DM Mono', monospace;
          padding-top: 8px;
        }
      `}</style>

      <div className="cb-root">
        <div className="cb-inner">

          {/* Page header */}
          <div className="cb-page-header">
            <div className="cb-page-label">Finance</div>
            <div className="cb-page-title">Cash <span>Book</span></div>
          </div>

          {/* Section label */}
          <div className="cb-section-label">Admin Accounts</div>

          {/* Admin cards */}
          {names.map((item, index) => (
            <AllAdmin key={index} item={item} />
          ))}

          {/* Team total */}
          <div className="cb-total-card">
            <div>
              <div className="cb-total-label">Team Total Cash</div>
              <div
                className="cb-total-value"
                style={{ color: isPositive ? '#34d399' : '#f87171' }}
              >
                ₹ {Number(total_amt_cashbook_team).toLocaleString('en-IN')}
              </div>
            </div>
            <span
              className="cb-total-badge"
              style={
                isPositive
                  ? { background: 'rgba(52,211,153,0.12)', color: '#34d399', border: '1px solid rgba(52,211,153,0.25)' }
                  : { background: 'rgba(248,113,113,0.12)', color: '#f87171', border: '1px solid rgba(248,113,113,0.25)' }
              }
            >
              {isPositive ? 'Surplus' : 'Deficit'}
            </span>
          </div>

        </div>
      </div>
    </>
  );
};

export default Cashbook;
