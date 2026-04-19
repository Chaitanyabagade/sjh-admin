import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllAdmin = ({ item }) => {
  const [data2, setData2] = useState([]);
  const [total_amt, setTotal_amt] = useState(0);

  /* ── all original business logic untouched ── */
  function getTotalCashATHand() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/admin/getTotalCashAtHand.php`;
    let fData2 = new FormData();
    fData2.append('team', item.team);
    fData2.append('admin_name', item.admin_name);
    axios.post(url2, fData2).then((response) => {
      setTotal_amt(response.data);
    }).catch(error => alert(error, " Try Again...!"));
    return total_amt;
  }

  function getData() {
    const url = `${process.env.REACT_APP_domain}/sjh-team-api/admin/getCashbooks.php`;
    let fData = new FormData();
    fData.append('team', item.team);
    fData.append('admin_name', item.admin_name);
    axios.post(url, fData).then((response) => {
      setData2(response.data);
    }).catch(error => alert(error, " Try Again...!"));
    getTotalCashATHand();
  }

  useEffect(() => {
    getData();
  }, []);

  const isPos = total_amt >= 0;
  const initials = item.admin_name
    ? item.admin_name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        .aa-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          transition: border-color 0.2s, transform 0.2s;
          font-family: 'Syne', sans-serif;
        }
        .aa-card:hover {
          border-color: rgba(255,255,255,0.16);
          transform: translateY(-2px);
        }

        .aa-left {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 0;
        }

        .aa-avatar {
          width: 44px; height: 44px;
          border-radius: 10px;
          background: rgba(240,192,64,0.12);
          border: 1px solid rgba(240,192,64,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
          font-weight: 800;
          color: #f0c040;
          font-family: 'Syne', sans-serif;
          flex-shrink: 0;
          letter-spacing: 0.04em;
        }

        .aa-name-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(245,245,240,0.28);
          font-family: 'DM Mono', monospace;
          margin-bottom: 3px;
        }
        .aa-name {
          font-size: 15px;
          font-weight: 700;
          color: #f5f5f0;
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 200px;
        }

        .aa-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .aa-amount {
          font-size: 17px;
          font-weight: 800;
          font-family: 'DM Mono', monospace;
          padding: 7px 16px;
          border-radius: 10px;
          letter-spacing: -0.01em;
        }

        .aa-view-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 8px 18px;
          border-radius: 9px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(245,245,240,0.7);
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .aa-view-btn:hover {
          background: rgba(240,192,64,0.1);
          border-color: rgba(240,192,64,0.35);
          color: #f0c040;
        }
        .aa-view-arrow {
          font-size: 13px;
          opacity: 0.6;
        }
      `}</style>

      <div className="aa-card">
        {/* Left: avatar + name */}
        <div className="aa-left">
          <div className="aa-avatar">{initials}</div>
          <div>
            <div className="aa-name-label">Admin</div>
            <div className="aa-name">{item.admin_name}</div>
          </div>
        </div>

        {/* Right: balance + view button */}
        <div className="aa-right">
          <div
            className="aa-amount"
            style={
              isPos
                ? { background: 'rgba(52,211,153,0.1)', color: '#34d399', border: '1px solid rgba(52,211,153,0.2)' }
                : { background: 'rgba(248,113,113,0.1)', color: '#f87171', border: '1px solid rgba(248,113,113,0.2)' }
            }
          >
            ₹ {Number(getTotalCashATHand(item.team, item.admin_name)).toLocaleString('en-IN')}
          </div>
          <Link
            to="cashinfo"
            className="aa-view-btn"
            onClick={() => localStorage.setItem('cashatadmin_name', item.admin_name)}
          >
            Details <span className="aa-view-arrow">→</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AllAdmin;
