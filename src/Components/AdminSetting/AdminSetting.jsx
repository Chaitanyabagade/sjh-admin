import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminSetting = () => {
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(0);

  function getData() {
    const url = `${process.env.REACT_APP_domain}/sjh-team-api/admin/allAdminName.php`;
    let fData = new FormData();
    fData.append('name', localStorage.getItem('team'));

    axios.post(url, fData)
      .then((response) => setData(response.data))
      .catch(error => alert(error, " Try Again...!"));
  }

  function changePermision(id, permision) {
    setSpinner(1);
    const per = permision ? 0 : 1;

    const url = `${process.env.REACT_APP_domain}/sjh-team-api/admin/ChangeAdminPermision.php`;
    let fData = new FormData();
    fData.append('id', id);
    fData.append('per', per);

    axios.post(url, fData)
      .then(() => { getData(); setSpinner(0); })
      .catch(error => alert(error, " Try Again...!"));
  }

  useEffect(() => { getData(); }, []);

  const isSuperAdmin = localStorage.getItem('user_name') === 'chaitanya bagade';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        .as-root {
          min-height: 100vh;
          background: #0a0a0a;
          padding: 90px 20px 60px;
          box-sizing: border-box;
          font-family: 'Syne', sans-serif;
        }
        .as-inner { max-width: 900px; margin: 0 auto; }

        /* spinner */
        .as-spinner-overlay {
          position: fixed; inset: 0; z-index: 999;
          background: rgba(0,0,0,0.65);
          display: flex; align-items: center; justify-content: center;
        }
        .as-spinner {
          width: 44px; height: 44px;
          border: 3px solid rgba(240,192,64,0.15);
          border-top-color: #f0c040;
          border-radius: 50%;
          animation: as-spin 0.75s linear infinite;
        }
        @keyframes as-spin { to { transform: rotate(360deg); } }

        /* page header */
        .as-header {
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 28px;
        }
        .as-header-label {
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(245,245,240,0.28);
          font-family: 'DM Mono', monospace; margin-bottom: 6px;
        }
        .as-header-title {
          font-size: clamp(22px, 4vw, 30px); font-weight: 800;
          color: #f5f5f0; letter-spacing: -0.02em;
        }
        .as-header-title span { color: #f0c040; }

        /* stats strip */
        .as-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 12px; margin-bottom: 28px;
        }
        .as-stat-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 16px 20px;
        }
        .as-stat-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(245,245,240,0.28);
          font-family: 'DM Mono', monospace; margin-bottom: 6px;
        }
        .as-stat-value {
          font-size: 22px; font-weight: 800;
          font-family: 'DM Mono', monospace; letter-spacing: -0.01em;
        }

        /* section label */
        .as-section-label {
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(245,245,240,0.25);
          font-family: 'DM Mono', monospace; margin-bottom: 14px;
        }

        /* table */
        .as-table-wrap {
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; overflow: hidden; overflow-x: auto;
        }
        .as-table {
          width: 100%; border-collapse: collapse;
          font-family: 'Syne', sans-serif;
        }
        .as-table thead tr {
          background: #181818;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .as-table th {
          padding: 11px 16px; font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(245,245,240,0.28); font-family: 'DM Mono', monospace;
          text-align: left; white-space: nowrap;
        }
        .as-table th.center { text-align: center; }

        .as-table tbody tr {
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.15s;
        }
        .as-table tbody tr:last-child { border-bottom: none; }
        .as-table tbody tr:hover { background: rgba(255,255,255,0.025); }

        .as-table td {
          padding: 13px 16px; font-size: 13px;
          color: rgba(245,245,240,0.65); vertical-align: middle; white-space: nowrap;
        }
        .as-table td.center { text-align: center; }

        .as-sr {
          font-family: 'DM Mono', monospace;
          font-size: 10.5px; color: rgba(245,245,240,0.22);
        }
        .as-name { font-weight: 700; color: #f5f5f0; }

        /* permission badge */
        .perm-badge {
          font-size: 10px; font-weight: 700; font-family: 'DM Mono', monospace;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 3px 12px; border-radius: 99px; display: inline-block;
        }
        .perm-yes {
          background: rgba(52,211,153,0.12); color: #34d399;
          border: 1px solid rgba(52,211,153,0.22);
        }
        .perm-no {
          background: rgba(248,113,113,0.12); color: #f87171;
          border: 1px solid rgba(248,113,113,0.22);
        }

        /* action button */
        .as-action-btn {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(245,245,240,0.6); border-radius: 6px;
          padding: 5px 14px; font-size: 10.5px; font-weight: 700;
          font-family: 'Syne', sans-serif; letter-spacing: 0.06em;
          text-transform: uppercase; cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .as-action-btn:hover {
          background: rgba(240,192,64,0.1);
          border-color: rgba(240,192,64,0.35);
          color: #f0c040;
        }

        /* empty state */
        .as-empty {
          text-align: center; padding: 48px 20px;
          color: rgba(245,245,240,0.2);
          font-family: 'DM Mono', monospace; font-size: 12px;
          letter-spacing: 0.1em;
        }
      `}</style>

      {/* Spinner */}
      {spinner ? <div className="as-spinner-overlay"><div className="as-spinner" /></div> : null}

      <div className="as-root">
        <div className="as-inner">

          {/* Header */}
          <div className="as-header">
            <div className="as-header-label">System</div>
            <div className="as-header-title">Admin <span>Settings</span></div>
          </div>

          {/* Stats Strip */}
          <div className="as-stats">
            <div className="as-stat-card">
              <div className="as-stat-label">Total Admins</div>
              <div className="as-stat-value" style={{ color: '#f5f5f0' }}>
                {data.length}
              </div>
            </div>
            <div className="as-stat-card">
              <div className="as-stat-label">With Permission</div>
              <div className="as-stat-value" style={{ color: '#34d399' }}>
                {data.filter(d => d.permision).length}
              </div>
            </div>
            <div className="as-stat-card">
              <div className="as-stat-label">No Permission</div>
              <div className="as-stat-value" style={{ color: '#f87171' }}>
                {data.filter(d => !d.permision).length}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="as-section-label">All Admins</div>
          <div className="as-table-wrap">
            <table className="as-table">
              <thead>
                <tr>
                  <th className="center">#</th>
                  <th>Admin Name</th>
                  <th className="center">Permission</th>
                  {isSuperAdmin && <th className="center">Action</th>}
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={isSuperAdmin ? 4 : 3}>
                      <div className="as-empty">No admins found</div>
                    </td>
                  </tr>
                ) : (
                  data.map((admin, index) => (
                    <tr key={index}>
                      <td className="center">
                        <span className="as-sr">{index + 1}</span>
                      </td>
                      <td>
                        <span className="as-name">{admin.admin_name}</span>
                      </td>
                      <td className="center">
                        <span className={`perm-badge ${admin.permision ? 'perm-yes' : 'perm-no'}`}>
                          {admin.permision ? 'Granted' : 'Denied'}
                        </span>
                      </td>
                      {isSuperAdmin && (
                        <td className="center">
                          <button
                            onClick={() => changePermision(admin.id, admin.permision)}
                            className="as-action-btn"
                          >
                            {admin.permision ? 'Revoke' : 'Grant'}
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </>
  );
};

export default AdminSetting;
