import React, { useEffect, useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';

const Deposites = () => {
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(0);
  const [names, setNames] = useState([]);
  const [dep_amt, setDep_amt] = useState(0);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const currentDate = new Date();
  const dayOfMonth = currentDate.getDate();

  /* ── all original business logic untouched ── */
  function getTotalNames() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/allUserName.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));
    axios.post(url2, fData2).then((response) => {
      setNames(response.data);
    }).catch(error => alert(error, " Try Again...!"));
  }

  function getTotalDeposite() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/getTotalDeposite.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));
    axios.post(url2, fData2).then((response) => {
      setDep_amt(response.data);
    }).catch(error => alert(error, " Try Again...!"));
  }

  function getData() {
    const url = `${process.env.REACT_APP_domain}/sjh-team-api/deposite2.php`;
    let fData = new FormData();
    fData.append('name', localStorage.getItem('team'));
    axios.post(url, fData).then((response) => {
      setData(response.data);
    }).catch(error => alert(error, " Try Again...!"));
    getTotalDeposite();
  }

  useEffect(() => {
    getData();
    getTotalNames();
  }, []);

  const handleAddDeposite = () => {
    if (name.length === 0) {
      alert("User Name is left");
    } else if (amount === 'Select Amt. Extra- 50Rs Penalty' || amount === 'Select Amt...') {
      alert("Amount is left");
    } else if (amount.length === 0) {
      alert("Amount is left");
    } else if (amount === 0) {
      alert("Amount is left");
    } else {
      if (confirm(`Conferm to Add Deposite of user => ${name} and duration => ${amount}`)) {
        setSpinner(1);
        const url = `${process.env.REACT_APP_domain}/sjh-team-api/admin/add_deposite.php`;
        let fData = new FormData();
        fData.append('name', name);
        fData.append('amount', amount);
        fData.append('team', localStorage.getItem('team'));
        fData.append('mobile_no', localStorage.getItem('mobile_no'));
        fData.append('admin_name', localStorage.getItem('user_name'));
        axios.post(url, fData).then((result) => {
          getData();
          setSpinner(0);
          if (result.status == 200) {
            alert("sucessfuly add..");
          } else {
            alert(result.data);
          }
          getData();
        }).catch(error => alert(error, " Try Again...!"));
      }
    }
  };

  const team = localStorage.getItem('team');

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        .dep-root {
          min-height: 100vh;
          background: #0a0a0a;
          padding: 90px 20px 60px;
          box-sizing: border-box;
          font-family: 'Syne', sans-serif;
        }

        .dep-inner {
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        /* ── Page header ── */
        .dep-header { padding-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .dep-header-label {
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(245,245,240,0.28);
          font-family: 'DM Mono', monospace; margin-bottom: 6px;
        }
        .dep-header-title {
          font-size: clamp(22px,4vw,30px); font-weight: 800;
          color: #f5f5f0; letter-spacing: -0.02em;
        }
        .dep-header-title span { color: #f0c040; }

        /* ── Spinner overlay ── */
        .dep-spinner-overlay {
          position: fixed; inset: 0; z-index: 999;
          background: rgba(0,0,0,0.65);
          display: flex; align-items: center; justify-content: center;
        }
        .dep-spinner {
          width: 44px; height: 44px;
          border: 3px solid rgba(240,192,64,0.15);
          border-top-color: #f0c040;
          border-radius: 50%;
          animation: dep-spin 0.75s linear infinite;
        }
        @keyframes dep-spin { to { transform: rotate(360deg); } }

        /* ── Form card ── */
        .dep-form-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 28px 24px;
        }
        .dep-form-title {
          font-size: 13px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(245,245,240,0.3);
          font-family: 'DM Mono', monospace; margin-bottom: 22px;
        }

        .dep-field { margin-bottom: 18px; }
        .dep-label {
          display: block; font-size: 10.5px; font-weight: 700;
          letter-spacing: 0.13em; text-transform: uppercase;
          color: rgba(245,245,240,0.35); font-family: 'DM Mono', monospace;
          margin-bottom: 8px;
        }
        .dep-select {
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 10px;
          padding: 11px 14px; font-size: 14px; font-weight: 600;
          color: #f5f5f0; font-family: 'Syne', sans-serif;
          outline: none; cursor: pointer; appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(245,245,240,0.3)' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 14px center;
          transition: border-color 0.2s;
        }
        .dep-select:focus { border-color: rgba(240,192,64,0.5); }
        .dep-select option { background: #1a1a1a; color: #f5f5f0; }

        .dep-submit-btn {
          width: 100%; display: flex; align-items: center; justify-content: center;
          gap: 9px; padding: 12px 24px; border-radius: 10px; border: none;
          background: #f0c040; color: #1a1400; font-size: 13px; font-weight: 800;
          font-family: 'Syne', sans-serif; letter-spacing: 0.08em; text-transform: uppercase;
          cursor: pointer; transition: background 0.2s, transform 0.15s;
          margin-top: 4px;
        }
        .dep-submit-btn:hover { background: #e6b800; transform: translateY(-1px); }
        .dep-submit-btn:active { transform: translateY(0); }

        /* ── Summary strip ── */
        .dep-summary {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
          background: #111; border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 16px 20px;
        }
        .dep-summary-label {
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(245,245,240,0.28);
          font-family: 'DM Mono', monospace;
        }
        .dep-summary-value {
          font-size: 20px; font-weight: 800; font-family: 'DM Mono', monospace;
          color: #34d399; letter-spacing: -0.01em;
        }

        /* ── Section label ── */
        .dep-section-label {
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(245,245,240,0.25);
          font-family: 'DM Mono', monospace;
        }

        /* ── Table ── */
        .dep-table-wrap {
          background: #111; border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; overflow: hidden; overflow-x: auto;
        }
        .dep-table {
          width: 100%; border-collapse: collapse; min-width: 480px;
          font-family: 'Syne', sans-serif;
        }
        .dep-table thead tr {
          background: #181818; border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .dep-table th {
          padding: 12px 16px; font-size: 10px; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: rgba(245,245,240,0.3); font-family: 'DM Mono', monospace;
          text-align: left; white-space: nowrap;
        }
        .dep-table th.right { text-align: right; }
        .dep-table th.center { text-align: center; }

        .dep-table tbody tr {
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.15s;
        }
        .dep-table tbody tr:last-child { border-bottom: none; }
        .dep-table tbody tr:hover { background: rgba(255,255,255,0.025); }

        .dep-table td {
          padding: 13px 16px; font-size: 13.5px;
          color: rgba(245,245,240,0.7); vertical-align: middle;
        }
        .dep-table td.center { text-align: center; }
        .dep-table td.right { text-align: right; }

        .dep-sr {
          font-family: 'DM Mono', monospace; font-size: 11px;
          color: rgba(245,245,240,0.25); font-weight: 500;
        }
        .dep-user {
          font-weight: 700; color: #f5f5f0; font-size: 13.5px;
        }
        .dep-amount {
          font-family: 'DM Mono', monospace; font-size: 14px;
          font-weight: 700; color: #34d399;
        }
        .dep-date {
          font-family: 'DM Mono', monospace; font-size: 11.5px;
          color: rgba(245,245,240,0.35); white-space: nowrap;
        }

        /* Footer row */
        .dep-table tfoot tr {
          background: #181818; border-top: 1px solid rgba(255,255,255,0.07);
        }
        .dep-table tfoot td { padding: 14px 16px; }
        .dep-foot-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; font-family: 'DM Mono', monospace;
          color: rgba(245,245,240,0.3);
        }
        .dep-foot-total {
          font-size: 17px; font-weight: 800;
          font-family: 'DM Mono', monospace; color: #34d399;
          text-align: right;
        }

        /* Empty */
        .dep-empty {
          padding: 48px 24px; text-align: center;
          color: rgba(245,245,240,0.18); font-size: 13px;
          font-family: 'DM Mono', monospace; letter-spacing: 0.08em;
        }

        /* late warning badge */
        .dep-late-badge {
          font-size: 10px; font-weight: 700; font-family: 'DM Mono', monospace;
          letter-spacing: 0.08em; text-transform: uppercase;
          background: rgba(248,113,113,0.12); color: #f87171;
          border: 1px solid rgba(248,113,113,0.2);
          padding: 2px 8px; border-radius: 99px; margin-left: 8px;
          vertical-align: middle;
        }
      `}</style>

      {/* Spinner */}
      {spinner ? (
        <div className="dep-spinner-overlay">
          <div className="dep-spinner" />
        </div>
      ) : null}

      <div className="dep-root">
        <div className="dep-inner">

          {/* ── Page header ── */}
          <div className="dep-header">
            <div className="dep-header-label">Finance</div>
            <div className="dep-header-title">
              Member <span>Deposits</span>
              {dayOfMonth > 15 && (
                <span className="dep-late-badge">Late Period</span>
              )}
            </div>
          </div>

          {/* ── Add Deposit form ── */}
          <div className="dep-form-card">
            <div className="dep-form-title">Add New Deposit</div>

            <div className="dep-field">
              <label className="dep-label">User Name</label>
              <select
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="dep-select"
              >
                <option>User Name...</option>
                {names.map((n, index) => (
                  <option key={index}>{n.user_name}</option>
                ))}
              </select>
            </div>

            <div className="dep-field">
              <label className="dep-label">Amount</label>
              <select
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="dep-select"
              >
                {dayOfMonth > 15 ? (
                  <>
                    <option>Select Amt...</option>
                    {team === 'PavanPutra' ? <option>500</option> : ''}
                    {team === 'ShreeRam' ? <option>500</option> : ''}
                    {team === 'Forever' ? <option>250</option> : ''}
                  </>
                ) : (
                  <>
                    <option>Select Amt...</option>
                    {team === 'PavanPutra' ? <option>400</option> : ''}
                    {team === 'ShreeRam' ? <option>500</option> : ''}
                    {team === 'Forever' ? <option>250</option> : ''}
                  </>
                )}
              </select>
            </div>

            <button onClick={handleAddDeposite} className="dep-submit-btn">
              <FaPaperPlane size={13} />
              Submit Deposit
            </button>
          </div>

          {/* ── Summary ── */}
          <div className="dep-summary">
            <span className="dep-summary-label">Total Deposits — All Members</span>
            <span className="dep-summary-value">
              ₹ {Number(dep_amt).toLocaleString('en-IN')}
            </span>
          </div>

          {/* ── Table ── */}
          <div className="dep-section-label">All User Deposits</div>
          <div className="dep-table-wrap">
            <table className="dep-table">
              <thead>
                <tr>
                  <th className="center">#</th>
                  <th>User Name</th>
                  <th className="right">Deposit</th>
                  <th className="right">Last Date</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="4">
                      <div className="dep-empty">No deposit records found</div>
                    </td>
                  </tr>
                ) : (
                  data.map((row, index) => (
                    <tr key={index}>
                      <td className="center">
                        <span className="dep-sr">{index + 1}</span>
                      </td>
                      <td>
                        <span className="dep-user">{row.user_name}</span>
                      </td>
                      <td className="right">
                        <span className="dep-amount">
                          ₹ {Number(row.deposite).toLocaleString('en-IN')}
                        </span>
                      </td>
                      <td className="right">
                        <span className="dep-date">{row.last_paid_date}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2">
                    <span className="dep-foot-label">Total</span>
                  </td>
                  <td>
                    <span className="dep-foot-total">
                      ₹ {Number(dep_amt).toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>

        </div>
      </div>
    </>
  );
};

export default Deposites;
