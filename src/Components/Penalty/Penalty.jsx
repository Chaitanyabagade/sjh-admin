import React, { useEffect, useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';

const Penalty = () => {
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(0);
  const [names, setNames] = useState([]);
  const [penalty_amt, setPen_amt] = useState(0);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState();
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  /* ── all original business logic untouched ── */
  function getTotalNames() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/allUserName.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));
    axios.post(url2, fData2).then((response) => {
      setNames(response.data);
    }).catch(error => alert(error, " Try Again...!"));
    console.log(names);
  }

  function getTotalpenalty() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/getTotalPenalty.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));
    axios.post(url2, fData2).then((response) => {
      setPen_amt(response.data);
    }).catch(error => alert(error, " Try Again...!"));
  }

  function getData() {
    const url = `${process.env.REACT_APP_domain}/sjh-team-api/penalty.php`;
    let fData = new FormData();
    fData.append('name', localStorage.getItem('team'));
    axios.post(url, fData).then((response) => {
      setData(response.data);
    }).catch(error => alert(error, " Try Again...!"));
  }

  const handleAddPenalty = () => {
    console.log(name, amount);
    if (name.length === 0) {
      alert("User Name is left");
    } else if (amount <= 0) {
      alert("Amount is left");
    } else if (note.length === 0) {
      alert("note is left");
    } else if (date.length === 0) {
      alert("date is left");
    } else {
      setSpinner(1);
      const url = `${process.env.REACT_APP_domain}/sjh-team-api/admin/add_penalty.php`;
      let fData = new FormData();
      fData.append('name', name);
      fData.append('amount', amount);
      fData.append('date', date);
      fData.append('note', note);
      fData.append('team', localStorage.getItem('team'));
      fData.append('mobile_no', localStorage.getItem('mobile_no'));
      fData.append('admin_name', localStorage.getItem('user_name'));
      axios.post(url, fData).then((result) => {
        setSpinner(0);
        if (result.status == 200) {
          alert("Penaly added sucessfuly...");
        } else {
          alert("Error to add penalty...");
        }
        getData();
        getTotalpenalty();
      }).catch(error => alert(error, " Try Again...!"));
    }
  };

  useEffect(() => {
    getData();
    getTotalpenalty();
    getTotalNames();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        .pen-root {
          min-height: 100vh;
          background: #0a0a0a;
          padding: 90px 20px 60px;
          box-sizing: border-box;
          font-family: 'Syne', sans-serif;
        }
        .pen-inner {
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* spinner */
        .pen-spinner-overlay {
          position: fixed; inset: 0; z-index: 999;
          background: rgba(0,0,0,0.65);
          display: flex; align-items: center; justify-content: center;
        }
        .pen-spinner {
          width: 44px; height: 44px;
          border: 3px solid rgba(248,113,113,0.15);
          border-top-color: #f87171;
          border-radius: 50%;
          animation: pen-spin 0.75s linear infinite;
        }
        @keyframes pen-spin { to { transform: rotate(360deg); } }

        /* page header */
        .pen-header {
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .pen-header-label {
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(245,245,240,0.28);
          font-family: 'DM Mono', monospace; margin-bottom: 6px;
        }
        .pen-header-row {
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 12px;
        }
        .pen-header-title {
          font-size: clamp(22px,4vw,30px); font-weight: 800;
          color: #f5f5f0; letter-spacing: -0.02em;
        }
        .pen-header-title span { color: #f87171; }
        .pen-total-badge {
          display: flex; flex-direction: column; align-items: flex-end;
          background: rgba(248,113,113,0.08);
          border: 1px solid rgba(248,113,113,0.2);
          border-radius: 12px; padding: 10px 18px;
        }
        .pen-total-badge-label {
          font-size: 9.5px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(248,113,113,0.6);
          font-family: 'DM Mono', monospace; margin-bottom: 3px;
        }
        .pen-total-badge-value {
          font-size: 19px; font-weight: 800;
          font-family: 'DM Mono', monospace; color: #f87171;
          letter-spacing: -0.01em;
        }

        /* form card */
        .pen-form-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 26px 24px;
        }
        .pen-form-title {
          font-size: 12px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(245,245,240,0.3);
          font-family: 'DM Mono', monospace; margin-bottom: 20px;
        }

        /* 2-col grid for form fields */
        .pen-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 14px;
        }
        @media (max-width: 560px) {
          .pen-form-grid { grid-template-columns: 1fr; }
        }
        .pen-field-full { grid-column: 1 / -1; }

        .pen-field { display: flex; flex-direction: column; }
        .pen-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.13em;
          text-transform: uppercase; color: rgba(245,245,240,0.32);
          font-family: 'DM Mono', monospace; margin-bottom: 7px;
        }
        .pen-input, .pen-select {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 9px; padding: 10px 13px;
          font-size: 13.5px; font-weight: 600;
          color: #f5f5f0; font-family: 'Syne', sans-serif;
          outline: none; box-sizing: border-box;
          transition: border-color 0.2s; width: 100%;
        }
        .pen-input:focus, .pen-select:focus { border-color: rgba(248,113,113,0.5); }
        .pen-input::placeholder { color: rgba(245,245,240,0.2); }
        .pen-select {
          appearance: none; cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(245,245,240,0.3)' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 13px center;
        }
        .pen-select option { background: #1a1a1a; color: #f5f5f0; }

        .pen-submit-btn {
          width: 100%; display: flex; align-items: center; justify-content: center;
          gap: 8px; padding: 12px 20px; border-radius: 9px; border: none;
          background: #f87171; color: #2d0000; font-size: 12px; font-weight: 800;
          font-family: 'Syne', sans-serif; letter-spacing: 0.08em; text-transform: uppercase;
          cursor: pointer; transition: background 0.2s, transform 0.15s;
        }
        .pen-submit-btn:hover { background: #ef4444; transform: translateY(-1px); }
        .pen-submit-btn:active { transform: translateY(0); }

        /* section label */
        .pen-section-label {
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(245,245,240,0.25);
          font-family: 'DM Mono', monospace;
        }

        /* table */
        .pen-table-wrap {
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; overflow: hidden; overflow-x: auto;
        }
        .pen-table {
          width: 100%; border-collapse: collapse;
          min-width: 520px; font-family: 'Syne', sans-serif;
        }
        .pen-table thead tr {
          background: #181818;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .pen-table th {
          padding: 12px 16px; font-size: 10px; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: rgba(245,245,240,0.28); font-family: 'DM Mono', monospace;
          text-align: left; white-space: nowrap;
        }
        .pen-table th.right { text-align: right; }
        .pen-table th.center { text-align: center; }

        .pen-table tbody tr {
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.15s;
        }
        .pen-table tbody tr:last-child { border-bottom: none; }
        .pen-table tbody tr:hover { background: rgba(248,113,113,0.04); }

        .pen-table td {
          padding: 12px 16px; font-size: 13px;
          color: rgba(245,245,240,0.65); vertical-align: middle;
        }
        .pen-table td.center { text-align: center; }
        .pen-table td.right { text-align: right; }

        .pen-sr {
          font-family: 'DM Mono', monospace; font-size: 11px;
          color: rgba(245,245,240,0.22);
        }
        .pen-user { font-weight: 700; color: #f5f5f0; }
        .pen-date {
          font-family: 'DM Mono', monospace; font-size: 11.5px;
          color: rgba(245,245,240,0.35); white-space: nowrap;
        }
        .pen-note { color: rgba(245,245,240,0.5); font-size: 12.5px; }
        .pen-amount {
          font-family: 'DM Mono', monospace; font-size: 13.5px;
          font-weight: 700; color: #f87171;
        }

        /* tfoot */
        .pen-table tfoot tr {
          background: #181818;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .pen-table tfoot td { padding: 13px 16px; }
        .pen-foot-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; font-family: 'DM Mono', monospace;
          color: rgba(245,245,240,0.28);
        }
        .pen-foot-total {
          font-size: 17px; font-weight: 800;
          font-family: 'DM Mono', monospace; color: #f87171;
          text-align: right;
        }

        /* empty state */
        .pen-empty {
          padding: 48px 24px; text-align: center;
          color: rgba(245,245,240,0.18); font-size: 13px;
          font-family: 'DM Mono', monospace; letter-spacing: 0.08em;
        }
      `}</style>

      {spinner ? <div className="pen-spinner-overlay"><div className="pen-spinner" /></div> : null}

      <div className="pen-root">
        <div className="pen-inner">

          {/* ── Page header ── */}
          <div className="pen-header">
            <div className="pen-header-label">Finance</div>
            <div className="pen-header-row">
              <div className="pen-header-title">Member <span>Penalties</span></div>
              <div className="pen-total-badge">
                <div className="pen-total-badge-label">Total Penalties</div>
                <div className="pen-total-badge-value">
                  ₹ {Number(penalty_amt).toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>

          {/* ── Add Penalty form ── */}
          <div className="pen-form-card">
            <div className="pen-form-title">Add New Penalty</div>

            <div className="pen-form-grid">
              {/* User Name */}
              <div className="pen-field">
                <label className="pen-label">User Name</label>
                <select value={name} onChange={(e) => setName(e.target.value)} className="pen-select">
                  <option>User Name...</option>
                  {names.map((n, index) => (
                    <option key={index}>{n.user_name}</option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div className="pen-field">
                <label className="pen-label">Amount</label>
                <input
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pen-input"
                />
              </div>

              {/* Date */}
              <div className="pen-field">
                <label className="pen-label">Date</label>
                <input
                  placeholder="Enter date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pen-input"
                />
              </div>

              {/* Note */}
              <div className="pen-field">
                <label className="pen-label">Note</label>
                <input
                  placeholder="Enter note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="pen-input"
                />
              </div>
            </div>

            <button onClick={handleAddPenalty} className="pen-submit-btn">
              <FaPaperPlane size={12} />
              Submit Penalty
            </button>
          </div>

          {/* ── Table ── */}
          <div className="pen-section-label">All User Penalties</div>
          <div className="pen-table-wrap">
            <table className="pen-table">
              <thead>
                <tr>
                  <th className="center">#</th>
                  <th>User Name</th>
                  <th>Date</th>
                  <th>Note</th>
                  <th className="right">Penalty</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="5">
                      <div className="pen-empty">No penalty records found</div>
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr key={index}>
                      <td className="center"><span className="pen-sr">{index + 1}</span></td>
                      <td><span className="pen-user">{item.user_name}</span></td>
                      <td><span className="pen-date">{item.Date}</span></td>
                      <td><span className="pen-note">{item.note}</span></td>
                      <td className="right"><span className="pen-amount">₹ {Number(item.penalty).toLocaleString('en-IN')}</span></td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4"><span className="pen-foot-label">Total Penalties</span></td>
                  <td><span className="pen-foot-total">₹ {Number(penalty_amt).toLocaleString('en-IN')}</span></td>
                </tr>
              </tfoot>
            </table>
          </div>

        </div>
      </div>
    </>
  );
};

export default Penalty;
