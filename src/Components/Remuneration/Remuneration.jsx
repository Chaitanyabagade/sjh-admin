import React, { useEffect, useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';

const Remuneration = () => {
  const [data, setData] = useState([]);
  const [Remuneration_amt, setRemu_am] = useState(0);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState('');

  function getTotalRemuneration() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/getTotalRemuneration.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));
    axios.post(url2, fData2).then((response) => {
      setRemu_am(response.data);
    }).catch(error => alert(error, ' Try Again...!'));
  }

  function getData() {
    const url = `${process.env.REACT_APP_domain}/sjh-team-api/remuneration.php`;
    let fData = new FormData();
    fData.append('name', localStorage.getItem('team'));
    axios.post(url, fData).then((response) => {
      setData(response.data);
    }).catch(error => alert(error, ' Try Again...!'));
  }

  const handleAddRemuneration = () => {
    if (!amount || amount.length === 0) { alert('Amount is left'); return; }
    if (note.length === 0) { alert('Note is left'); return; }
    if (date.length === 0) { alert('Date is left'); return; }

    const url = `${process.env.REACT_APP_domain}/sjh-team-api/admin/add_Remuneration.php`;
    let fData = new FormData();
    fData.append('amount', amount);
    fData.append('date', date);
    fData.append('note', note);
    fData.append('team', localStorage.getItem('team'));
    fData.append('mobile_no', localStorage.getItem('mobile_no'));
    fData.append('admin_name', localStorage.getItem('user_name'));
    axios.post(url, fData).then((result) => {
      if (result.status === 200) { alert('Successfully added..'); }
      else { alert(result.data); }
      getData();
      getTotalRemuneration();
    }).catch(error => alert(error, ' Try Again...!'));

    getData();
    getTotalRemuneration();
  };

  useEffect(() => {
    getData();
    getTotalRemuneration();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        .remu-root {
          min-height: 100vh;
          background: #0a0a0a;
          padding: 90px 20px 60px;
          box-sizing: border-box;
          font-family: 'Syne', sans-serif;
        }
        .remu-inner { max-width: 960px; margin: 0 auto; }

        /* Page header */
        .remu-header {
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 28px;
        }
        .remu-header-label {
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(245,245,240,0.28);
          font-family: 'DM Mono', monospace; margin-bottom: 6px;
        }
        .remu-header-title {
          font-size: clamp(22px,4vw,30px); font-weight: 800;
          color: #f5f5f0; letter-spacing: -0.02em;
        }
        .remu-header-title span { color: #f0c040; }

        /* Stats */
        .remu-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px; margin-bottom: 28px;
        }
        .remu-stat-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 16px 20px;
        }
        .remu-stat-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(245,245,240,0.28);
          font-family: 'DM Mono', monospace; margin-bottom: 6px;
        }
        .remu-stat-value {
          font-size: 20px; font-weight: 800;
          font-family: 'DM Mono', monospace; letter-spacing: -0.01em;
          color: #34d399;
        }

        /* Form card */
        .remu-form-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 24px;
          margin-bottom: 28px;
          max-width: 520px;
        }
        .remu-form-title {
          font-size: 12px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(245,245,240,0.3);
          font-family: 'DM Mono', monospace; margin-bottom: 20px;
        }
        .remu-field { margin-bottom: 14px; }
        .remu-label {
          display: block; font-size: 10px; font-weight: 700; letter-spacing: 0.13em;
          text-transform: uppercase; color: rgba(245,245,240,0.32);
          font-family: 'DM Mono', monospace; margin-bottom: 7px;
        }
        .remu-input {
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 9px;
          padding: 10px 13px; font-size: 13.5px; font-weight: 600;
          color: #f5f5f0; font-family: 'Syne', sans-serif;
          outline: none; box-sizing: border-box; transition: border-color 0.2s;
        }
        .remu-input:focus { border-color: rgba(240,192,64,0.5); }
        .remu-input::placeholder { color: rgba(245,245,240,0.2); }
        .remu-input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.5); }

        .remu-submit-btn {
          width: 100%; display: flex; align-items: center; justify-content: center;
          gap: 8px; padding: 11px 20px; border-radius: 9px; border: none;
          background: #f0c040; color: #1a1400; font-size: 12px; font-weight: 800;
          font-family: 'Syne', sans-serif; letter-spacing: 0.08em; text-transform: uppercase;
          cursor: pointer; transition: background 0.2s, transform 0.15s; margin-top: 6px;
        }
        .remu-submit-btn:hover { background: #e6b800; transform: translateY(-1px); }

        /* Table */
        .remu-section-label {
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(245,245,240,0.25);
          font-family: 'DM Mono', monospace; margin-bottom: 14px;
        }
        .remu-table-wrap {
          background: #111; border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; overflow: hidden; overflow-x: auto;
        }
        .remu-table {
          width: 100%; border-collapse: collapse;
          font-family: 'Syne', sans-serif;
        }
        .remu-table thead tr {
          background: #181818;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .remu-table th {
          padding: 11px 16px; font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(245,245,240,0.28); font-family: 'DM Mono', monospace;
          text-align: left; white-space: nowrap;
        }
        .remu-table th.center { text-align: center; }

        .remu-table tbody tr {
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.15s;
        }
        .remu-table tbody tr:last-child { border-bottom: none; }
        .remu-table tbody tr:hover { background: rgba(255,255,255,0.025); }

        .remu-table td {
          padding: 12px 16px; font-size: 12.5px;
          color: rgba(245,245,240,0.65); vertical-align: middle; white-space: nowrap;
        }
        .remu-table td.center { text-align: center; }

        .remu-sr {
          font-family: 'DM Mono', monospace; font-size: 10.5px;
          color: rgba(245,245,240,0.22);
        }
        .remu-mono { font-family: 'DM Mono', monospace; font-size: 12px; }
        .remu-note { color: rgba(245,245,240,0.55); max-width: 280px; white-space: normal; }
        .remu-date { color: rgba(245,245,240,0.35); font-size: 11px; font-family: 'DM Mono', monospace; }
        .remu-amount { font-family: 'DM Mono', monospace; font-size: 13px; font-weight: 700; color: #34d399; }

        /* tfoot */
        .remu-table tfoot tr {
          background: #181818;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .remu-table tfoot td { padding: 12px 16px; }
        .remu-foot-label {
          font-size: 9.5px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; font-family: 'DM Mono', monospace;
          color: rgba(245,245,240,0.28);
        }
        .remu-foot-val {
          font-size: 14px; font-weight: 800;
          font-family: 'DM Mono', monospace; color: #f0c040;
          text-align: right;
        }
      `}</style>

      <div className="remu-root">
        <div className="remu-inner">

          {/* Page header */}
          <div className="remu-header">
            <div className="remu-header-label">Finance</div>
            <div className="remu-header-title">Remuneration <span>Management</span></div>
          </div>

          {/* Stats strip */}
          <div className="remu-stats">
            <div className="remu-stat-card">
              <div className="remu-stat-label">Total Remuneration</div>
              <div className="remu-stat-value">
                ₹ {Number(Remuneration_amt).toLocaleString('en-IN')}
              </div>
            </div>
            <div className="remu-stat-card">
              <div className="remu-stat-label">Total Entries</div>
              <div className="remu-stat-value" style={{ color: '#a78bfa' }}>
                {data.length}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="remu-form-card">
            <div className="remu-form-title">Add New Remuneration</div>

            <div className="remu-field">
              <label className="remu-label">Amount</label>
              <input
                type="number"
                placeholder="Enter amount..."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="remu-input"
              />
            </div>

            <div className="remu-field">
              <label className="remu-label">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="remu-input"
              />
            </div>

            <div className="remu-field">
              <label className="remu-label">Note</label>
              <input
                placeholder="Enter note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="remu-input"
              />
            </div>

            <button onClick={handleAddRemuneration} className="remu-submit-btn">
              <FaPaperPlane size={12} /> Submit Remuneration
            </button>
          </div>

          {/* Table */}
          <div className="remu-section-label">All Remunerations</div>
          <div className="remu-table-wrap">
            <table className="remu-table">
              <thead>
                <tr>
                  <th className="center">#</th>
                  <th>Date</th>
                  <th>Note</th>
                  <th>Remuneration</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="center"><span className="remu-sr">{index + 1}</span></td>
                    <td><span className="remu-date">{item.Date}</span></td>
                    <td><span className="remu-note">{item.note}</span></td>
                    <td><span className="remu-amount">₹ {Number(item.remuneration).toLocaleString('en-IN')}</span></td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3"><span className="remu-foot-label">Total Remuneration</span></td>
                  <td><span className="remu-foot-val">₹ {Number(Remuneration_amt).toLocaleString('en-IN')}</span></td>
                </tr>
              </tfoot>
            </table>
          </div>

        </div>
      </div>
    </>
  );
};

export default Remuneration;
