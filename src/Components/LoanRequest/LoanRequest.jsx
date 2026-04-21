import React, { useEffect, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';

const LoanRequest = () => {
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(0);
  const [loanReqests_amt, set_req_amt] = useState(0);
  const [names, setNames] = useState([]);
  const [status, setStatus] = useState("Pending..");
  const [reply, setReply] = useState("");
  const [username, setUserName] = useState("");
  const [requestId, setRequestId] = useState("");
  const [activeId, setActiveId] = useState(null);

  function getTotalloanReqests() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/getTotalloanRequests.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));
    axios.post(url2, fData2)
      .then((response) => set_req_amt(response.data))
      .catch(error => alert(error, " Try Again...!"));
  }

  function getData() {
    const url = `${process.env.REACT_APP_domain}/sjh-team-api/loanRequests.php`;
    let fData = new FormData();
    fData.append('name', localStorage.getItem('team'));
    axios.post(url, fData)
      .then((response) => setData(response.data))
      .catch(error => alert(error, " Try Again...!"));
  }

  function getTotalNames() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/allUserName.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));
    axios.post(url2, fData2)
      .then((response) => setNames(response.data))
      .catch(error => alert(error, " Try Again...!"));
  }

  const handleEditLoanRequests = () => {
    if (username.length === 0) return alert("User Name is left");
    if (!requestId || requestId === 'Select ID...') return alert("Request ID is left");
    if (status.length === 0) return alert("Status is left");
    if (reply.length === 0) return alert("Reply is left");

    if (confirm(`Confirm to edit loan request of user => ${username} and request id => ${requestId}`)) {
      setSpinner(1);
      const url = `${process.env.REACT_APP_domain}/sjh-team-api/admin/edit_Request_status.php`;
      let fData = new FormData();
      fData.append('username', username);
      fData.append('status', status);
      fData.append('id', requestId);
      fData.append('reply', reply);
      fData.append('team', localStorage.getItem('team'));

      axios.post(url, fData)
        .then((result) => {
          getData();
          setSpinner(0);
          setActiveId(null);
          if (result.status == 200) alert("Successfully updated!");
          else alert(result.data);
        })
        .catch(error => alert(error, " Try Again...!"));
    }
  };

  const handleSelectRow = (item) => {
    setActiveId(item.id);
    setRequestId(item.id);
    setUserName(item.user_name);
    setStatus(item.status);
    setReply(item.reply || "");
  };

  useEffect(() => {
    getData();
    getTotalloanReqests();
    getTotalNames();
  }, []);

  const statusConfig = {
    'Approved..': { cls: 'status-approved', label: 'Approved' },
    'Pending..':  { cls: 'status-pending',  label: 'Pending'  },
    'Reject..':   { cls: 'status-rejected', label: 'Rejected' },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        .lr-root {
          min-height: 100vh;
          background: #0a0a0a;
          padding: 90px 20px 60px;
          box-sizing: border-box;
          font-family: 'Syne', sans-serif;
        }
        .lr-inner { max-width: 1200px; margin: 0 auto; }

        /* spinner */
        .lr-spinner-overlay {
          position: fixed; inset: 0; z-index: 999;
          background: rgba(0,0,0,0.65);
          display: flex; align-items: center; justify-content: center;
        }
        .lr-spinner {
          width: 44px; height: 44px;
          border: 3px solid rgba(240,192,64,0.15);
          border-top-color: #f0c040;
          border-radius: 50%;
          animation: lr-spin 0.75s linear infinite;
        }
        @keyframes lr-spin { to { transform: rotate(360deg); } }

        /* header */
        .lr-header {
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 28px;
        }
        .lr-header-label {
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(245,245,240,0.28);
          font-family: 'DM Mono', monospace; margin-bottom: 6px;
        }
        .lr-header-title {
          font-size: clamp(22px, 4vw, 30px); font-weight: 800;
          color: #f5f5f0; letter-spacing: -0.02em;
        }
        .lr-header-title span { color: #f0c040; }

        /* stats strip */
        .lr-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 12px; margin-bottom: 28px;
        }
        .lr-stat-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 16px 20px;
        }
        .lr-stat-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(245,245,240,0.28);
          font-family: 'DM Mono', monospace; margin-bottom: 6px;
        }
        .lr-stat-value {
          font-size: 22px; font-weight: 800;
          font-family: 'DM Mono', monospace; letter-spacing: -0.01em;
        }

        /* hint banner */
        .lr-hint {
          font-size: 11px; font-family: 'DM Mono', monospace;
          color: rgba(245,245,240,0.25); letter-spacing: 0.06em;
          margin-bottom: 16px; padding: 10px 14px;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 8px; background: rgba(255,255,255,0.02);
        }

        /* layout: form + table side-by-side on large screens */
        .lr-layout {
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: 20px; align-items: start;
        }
        @media (max-width: 860px) {
          .lr-layout { grid-template-columns: 1fr; }
        }

        /* form card */
        .lr-form-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 24px;
          position: sticky; top: 20px;
        }
        .lr-form-title {
          font-size: 11px; font-weight: 700; letter-spacing: 0.15em;
          text-transform: uppercase; color: rgba(245,245,240,0.28);
          font-family: 'DM Mono', monospace; margin-bottom: 20px;
        }

        /* active selection pill */
        .lr-active-pill {
          background: rgba(240,192,64,0.08);
          border: 1px solid rgba(240,192,64,0.2);
          border-radius: 8px; padding: 9px 12px;
          margin-bottom: 18px;
          font-family: 'DM Mono', monospace; font-size: 11px;
          color: rgba(245,245,240,0.45); line-height: 1.6;
        }
        .lr-active-pill strong { color: #f0c040; }

        .lr-field { margin-bottom: 14px; }
        .lr-label {
          display: block; font-size: 10px; font-weight: 700; letter-spacing: 0.13em;
          text-transform: uppercase; color: rgba(245,245,240,0.32);
          font-family: 'DM Mono', monospace; margin-bottom: 7px;
        }
        .lr-input, .lr-select {
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 9px;
          padding: 10px 13px; font-size: 13px; font-weight: 600;
          color: #f5f5f0; font-family: 'Syne', sans-serif;
          outline: none; box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .lr-input:focus, .lr-select:focus { border-color: rgba(240,192,64,0.5); }
        .lr-input::placeholder { color: rgba(245,245,240,0.2); }
        .lr-select {
          appearance: none; cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(245,245,240,0.3)' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 13px center;
        }
        .lr-select option { background: #1a1a1a; color: #f5f5f0; }

        .lr-submit-btn {
          width: 100%; display: flex; align-items: center; justify-content: center;
          gap: 8px; padding: 11px 20px; border-radius: 9px; border: none;
          background: #f0c040; color: #1a1400; font-size: 12px; font-weight: 800;
          font-family: 'Syne', sans-serif; letter-spacing: 0.08em; text-transform: uppercase;
          cursor: pointer; transition: background 0.2s, transform 0.15s; margin-top: 6px;
        }
        .lr-submit-btn:hover { background: #e6b800; transform: translateY(-1px); }

        /* section label */
        .lr-section-label {
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(245,245,240,0.25);
          font-family: 'DM Mono', monospace; margin-bottom: 14px;
        }

        /* table */
        .lr-table-wrap {
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; overflow: hidden; overflow-x: auto;
        }
        .lr-table {
          width: 100%; border-collapse: collapse;
          font-family: 'Syne', sans-serif; min-width: 700px;
        }
        .lr-table thead tr {
          background: #181818;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .lr-table th {
          padding: 11px 13px; font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(245,245,240,0.28); font-family: 'DM Mono', monospace;
          text-align: left; white-space: nowrap;
        }
        .lr-table th.center { text-align: center; }
        .lr-table tbody tr {
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.15s; cursor: pointer;
        }
        .lr-table tbody tr:last-child { border-bottom: none; }
        .lr-table tbody tr:hover { background: rgba(255,255,255,0.025); }
        .lr-table tbody tr.active-row {
          background: rgba(240,192,64,0.07);
          border-left: 2px solid #f0c040;
        }
        .lr-table td {
          padding: 11px 13px; font-size: 12.5px;
          color: rgba(245,245,240,0.65); vertical-align: middle; white-space: nowrap;
        }
        .lr-table td.center { text-align: center; }

        .lr-sr { font-family: 'DM Mono', monospace; font-size: 10.5px; color: rgba(245,245,240,0.22); }
        .lr-mono { font-family: 'DM Mono', monospace; font-size: 12px; }
        .lr-user { font-weight: 700; color: #f5f5f0; }

        /* select row btn */
        .lr-row-btn {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(245,245,240,0.6); border-radius: 6px;
          padding: 4px 12px; font-size: 10.5px; font-weight: 700;
          font-family: 'Syne', sans-serif; letter-spacing: 0.06em;
          text-transform: uppercase; cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s; white-space: nowrap;
        }
        .lr-row-btn:hover { background: rgba(240,192,64,0.1); border-color: rgba(240,192,64,0.35); color: #f0c040; }
        .lr-row-btn.selected { background: rgba(240,192,64,0.15); border-color: rgba(240,192,64,0.5); color: #f0c040; }

        /* status badges */
        .status-badge {
          font-size: 10px; font-weight: 700; font-family: 'DM Mono', monospace;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 3px 10px; border-radius: 99px; display: inline-block;
        }
        .status-approved { background: rgba(52,211,153,0.12); color: #34d399; border: 1px solid rgba(52,211,153,0.22); }
        .status-pending  { background: rgba(251,191,36,0.12);  color: #fbbf24; border: 1px solid rgba(251,191,36,0.22);  }
        .status-rejected { background: rgba(248,113,113,0.12); color: #f87171; border: 1px solid rgba(248,113,113,0.22); }

        /* tfoot */
        .lr-table tfoot tr { background: #181818; border-top: 1px solid rgba(255,255,255,0.07); }
        .lr-table tfoot td { padding: 12px 13px; }
        .lr-foot-label {
          font-size: 9.5px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; font-family: 'DM Mono', monospace;
          color: rgba(245,245,240,0.28);
        }
        .lr-foot-val {
          font-size: 13px; font-weight: 800;
          font-family: 'DM Mono', monospace; color: #f0c040;
        }

        /* empty */
        .lr-empty {
          text-align: center; padding: 48px 20px;
          color: rgba(245,245,240,0.2);
          font-family: 'DM Mono', monospace; font-size: 12px; letter-spacing: 0.1em;
        }
      `}</style>

      {spinner ? <div className="lr-spinner-overlay"><div className="lr-spinner" /></div> : null}

      <div className="lr-root">
        <div className="lr-inner">

          {/* Header */}
          <div className="lr-header">
            <div className="lr-header-label">Finance</div>
            <div className="lr-header-title">Loan <span>Requests</span></div>
          </div>

          {/* Stats */}
          <div className="lr-stats">
            <div className="lr-stat-card">
              <div className="lr-stat-label">Total Requests</div>
              <div className="lr-stat-value" style={{ color: '#f5f5f0' }}>{data.length}</div>
            </div>
            <div className="lr-stat-card">
              <div className="lr-stat-label">Approved</div>
              <div className="lr-stat-value" style={{ color: '#34d399' }}>
                {data.filter(d => d.status === 'Approved..').length}
              </div>
            </div>
            <div className="lr-stat-card">
              <div className="lr-stat-label">Pending</div>
              <div className="lr-stat-value" style={{ color: '#fbbf24' }}>
                {data.filter(d => d.status === 'Pending..').length}
              </div>
            </div>
            <div className="lr-stat-card">
              <div className="lr-stat-label">Rejected</div>
              <div className="lr-stat-value" style={{ color: '#f87171' }}>
                {data.filter(d => d.status === 'Reject..').length}
              </div>
            </div>
            <div className="lr-stat-card">
              <div className="lr-stat-label">Total Amount</div>
              <div className="lr-stat-value" style={{ color: '#f0c040' }}>
                {loanReqests_amt}
              </div>
            </div>
          </div>

          {/* Hint */}
          <div className="lr-hint">
            💡 Click <strong>Select</strong> on any row to auto-fill the edit form
          </div>

          {/* Layout: Form + Table */}
          <div className="lr-layout">

            {/* Edit Form */}
            <div className="lr-form-card">
              <div className="lr-form-title">Update Request Status</div>

              {activeId && (
                <div className="lr-active-pill">
                  Editing request <strong>#{activeId}</strong>
                </div>
              )}

              <div className="lr-field">
                <label className="lr-label">User Name</label>
                <select value={username} onChange={(e) => setUserName(e.target.value)} className="lr-select">
                  <option>User Name...</option>
                  {names.map((name, i) => <option key={i}>{name.user_name}</option>)}
                </select>
              </div>

              <div className="lr-field">
                <label className="lr-label">Request ID</label>
                <select value={requestId} onChange={(e) => setRequestId(e.target.value)} className="lr-select">
                  <option>Select ID...</option>
                  {data.map((item, i) => <option key={i}>{item.id}</option>)}
                </select>
              </div>

              <div className="lr-field">
                <label className="lr-label">Request Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="lr-select">
                  <option>Select Status...</option>
                  <option value="Pending..">Pending</option>
                  <option value="Approved..">Approved</option>
                  <option value="Reject..">Rejected</option>
                </select>
              </div>

              <div className="lr-field">
                <label className="lr-label">Reply</label>
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Enter reply message"
                  className="lr-input"
                />
              </div>

              <button onClick={handleEditLoanRequests} className="lr-submit-btn">
                <FaPaperPlane size={12} /> Update Request
              </button>
            </div>

            {/* Table */}
            <div>
              <div className="lr-section-label">All User Loan Requests</div>
              <div className="lr-table-wrap">
                <table className="lr-table">
                  <thead>
                    <tr>
                      <th className="center">Select</th>
                      <th className="center">#</th>
                      <th>Req. ID</th>
                      <th>User</th>
                      <th>Amount</th>
                      <th>Duration</th>
                      <th>Need Date</th>
                      <th>Req. Date</th>
                      <th className="center">Status</th>
                      <th>Reply</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length === 0 ? (
                      <tr>
                        <td colSpan={10}><div className="lr-empty">No loan requests found</div></td>
                      </tr>
                    ) : (
                      data.map((item, index) => {
                        const sc = statusConfig[item.status] || { cls: 'status-pending', label: item.status };
                        return (
                          <tr key={index} className={activeId === item.id ? 'active-row' : ''}>
                            <td className="center">
                              <button
                                className={`lr-row-btn ${activeId === item.id ? 'selected' : ''}`}
                                onClick={() => handleSelectRow(item)}
                              >
                                {activeId === item.id ? '✓ Active' : 'Select'}
                              </button>
                            </td>
                            <td className="center"><span className="lr-sr">{index + 1}</span></td>
                            <td><span className="lr-mono">{item.id}</span></td>
                            <td><span className="lr-user">{item.user_name}</span></td>
                            <td><span className="lr-mono" style={{ color: '#f0c040' }}>₹ {Number(item.amount).toLocaleString('en-IN')}</span></td>
                            <td><span className="lr-mono">{item.EMI_duration}</span></td>
                            <td><span className="lr-mono" style={{ color: 'rgba(245,245,240,0.35)', fontSize: '11px' }}>{item.need_date}</span></td>
                            <td><span className="lr-mono" style={{ color: 'rgba(245,245,240,0.35)', fontSize: '11px' }}>{item.request_date}</span></td>
                            <td className="center">
                              <span className={`status-badge ${sc.cls}`}>{sc.label}</span>
                            </td>
                            <td><span style={{ color: 'rgba(245,245,240,0.55)', fontSize: '12px' }}>{item.reply}</span></td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3}><span className="lr-foot-label">Total Requests</span></td>
                      <td colSpan={2}><span className="lr-foot-val">{data.length}</span></td>
                      <td colSpan={5}><span className="lr-foot-label">Total Amount: <span className="lr-foot-val">{loanReqests_amt}</span></span></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default LoanRequest;
