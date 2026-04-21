import React, { useEffect, useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';

const Expendature = () => {
  const [data, setData] = useState([]);
  const [Expendature_amt, setPen_amt] = useState(0);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState('');

  function getTotalExpendature() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/getTotalExpendature.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));
    axios.post(url2, fData2).then((response) => {
      setPen_amt(response.data);
    }).catch(error => alert(error, ' Try Again...!'));
  }

  function getData() {
    const url = `${process.env.REACT_APP_domain}/sjh-team-api/expendature.php`;
    let fData = new FormData();
    fData.append('name', localStorage.getItem('team'));
    axios.post(url, fData).then((response) => {
      setData(response.data);
    }).catch(error => alert(error, ' Try Again...!'));
  }

  const handleAddExpendature = () => {
    if (!amount || amount.length === 0) { alert('Amount is left'); return; }
    if (note.length === 0) { alert('Note is left'); return; }
    if (date.length === 0) { alert('Date is left'); return; }

    const url = `${process.env.REACT_APP_domain}/sjh-team-api/admin/add_Expendature.php`;
    let fData = new FormData();
    fData.append('amount', amount);
    fData.append('date', date);
    fData.append('note', note);
    fData.append('team', localStorage.getItem('team'));
    fData.append('mobile_no', localStorage.getItem('mobile_no'));
    fData.append('admin_name', localStorage.getItem('user_name'));
    axios.post(url, fData).then(() => {
      getData();
      getTotalExpendature();
    }).catch(error => alert(error, ' Try Again...!'));

    getData();
    getTotalExpendature();
  };

  useEffect(() => {
    getData();
    getTotalExpendature();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        .exp-root {
          min-height: 100vh;
          background: #0a0a0a;
          padding: 90px 20px 60px;
          box-sizing: border-box;
          font-family: 'Syne', sans-serif;
        }
        .exp-inner { max-width: 960px; margin: 0 auto; }

        /* Page header */
        .exp-header {
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 28px;
        }
        .exp-header-label {
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(245,245,240,0.28);
          font-family: 'DM Mono', monospace; margin-bottom: 6px;
        }
        .exp-header-title {
          font-size: clamp(22px,4vw,30px); font-weight: 800;
          color: #f5f5f0; letter-spacing: -0.02em;
        }
        .exp-header-title span { color: #f87171; }

        /* Stats */
        .exp-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px; margin-bottom: 28px;
        }
        .exp-stat-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 16px 20px;
        }
        .exp-stat-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(245,245,240,0.28);
          font-family: 'DM Mono', monospace; margin-bottom: 6px;
        }
        .exp-stat-value {
          font-size: 20px; font-weight: 800;
          font-family: 'DM Mono', monospace; letter-spacing: -0.01em;
        }

        /* Form card */
        .exp-form-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 24px;
          margin-bottom: 28px;
          max-width: 520px;
        }
        .exp-form-title {
          font-size: 12px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(245,245,240,0.3);
          font-family: 'DM Mono', monospace; margin-bottom: 20px;
        }
        .exp-field { margin-bottom: 14px; }
        .exp-label {
          display: block; font-size: 10px; font-weight: 700; letter-spacing: 0.13em;
          text-transform: uppercase; color: rgba(245,245,240,0.32);
          font-family: 'DM Mono', monospace; margin-bottom: 7px;
        }
        .exp-input {
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 9px;
          padding: 10px 13px; font-size: 13.5px; font-weight: 600;
          color: #f5f5f0; font-family: 'Syne', sans-serif;
          outline: none; box-sizing: border-box; transition: border-color 0.2s;
        }
        .exp-input:focus { border-color: rgba(248,113,113,0.5); }
        .exp-input::placeholder { color: rgba(245,245,240,0.2); }
        .exp-input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.5); }

        .exp-submit-btn {
          width: 100%; display: flex; align-items: center; justify-content: center;
          gap: 8px; padding: 11px 20px; border-radius: 9px; border: none;
          background: #f87171; color: #1a0000; font-size: 12px; font-weight: 800;
          font-family: 'Syne', sans-serif; letter-spacing: 0.08em; text-transform: uppercase;
          cursor: pointer; transition: background 0.2s, transform 0.15s; margin-top: 6px;
        }
        .exp-submit-btn:hover { background: #ef4444; transform: translateY(-1px); }

        /* Table */
        .exp-section-label {
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(245,245,240,0.25);
          font-family: 'DM Mono', monospace; margin-bottom: 14px;
        }
        .exp-table-wrap {
          background: #111; border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; overflow: hidden; overflow-x: auto;
        }
        .exp-table {
          width: 100%; border-collapse: collapse;
          font-family: 'Syne', sans-serif;
        }
        .exp-table thead tr {
          background: #181818;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .exp-table th {
          padding: 11px 16px; font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(245,245,240,0.28); font-family: 'DM Mono', monospace;
          text-align: left; white-space: nowrap;
        }
        .exp-table th.center { text-align: center; }

        .exp-table tbody tr {
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.15s;
        }
        .exp-table tbody tr:last-child { border-bottom: none; }
        .exp-table tbody tr:hover { background: rgba(255,255,255,0.025); }

        .exp-table td {
          padding: 12px 16px; font-size: 12.5px;
          color: rgba(245,245,240,0.65); vertical-align: middle; white-space: nowrap;
        }
        .exp-table td.center { text-align: center; }

        .exp-sr {
          font-family: 'DM Mono', monospace; font-size: 10.5px;
          color: rgba(245,245,240,0.22);
        }
        .exp-note { color: rgba(245,245,240,0.55); max-width: 280px; white-space: normal; }
        .exp-date { color: rgba(245,245,240,0.35); font-size: 11px; font-family: 'DM Mono', monospace; }
        .exp-amount { font-family: 'DM Mono', monospace; font-size: 13px; font-weight: 700; color: #f87171; }

        /* tfoot */
        .exp-table tfoot tr {
          background: #181818;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .exp-table tfoot td { padding: 12px 16px; }
        .exp-foot-label {
          font-size: 9.5px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; font-family: 'DM Mono', monospace;
          color: rgba(245,245,240,0.28);
        }
        .exp-foot-val {
          font-size: 14px; font-weight: 800;
          font-family: 'DM Mono', monospace; color: #f0c040;
          text-align: right;
        }
      `}</style>

      <div className="exp-root">
        <div className="exp-inner">

          {/* Page header */}
          <div className="exp-header">
            <div className="exp-header-label">Finance</div>
            <div className="exp-header-title">Expenditure <span>Management</span></div>
          </div>

          {/* Stats strip */}
          <div className="exp-stats">
            <div className="exp-stat-card">
              <div className="exp-stat-label">Total Expenditure</div>
              <div className="exp-stat-value" style={{ color: '#f87171' }}>
                ₹ {Number(Expendature_amt).toLocaleString('en-IN')}
              </div>
            </div>
            <div className="exp-stat-card">
              <div className="exp-stat-label">Total Entries</div>
              <div className="exp-stat-value" style={{ color: '#a78bfa' }}>
                {data.length}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="exp-form-card">
            <div className="exp-form-title">Add New Expenditure</div>

            <div className="exp-field">
              <label className="exp-label">Amount</label>
              <input
                type="number"
                placeholder="Enter amount..."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="exp-input"
              />
            </div>

            <div className="exp-field">
              <label className="exp-label">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="exp-input"
              />
            </div>

            <div className="exp-field">
              <label className="exp-label">Note</label>
              <input
                type="text"
                placeholder="Enter note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="exp-input"
              />
            </div>

            <button onClick={handleAddExpendature} className="exp-submit-btn">
              <FaPaperPlane size={12} /> Submit Expenditure
            </button>
          </div>

          {/* Table */}
          <div className="exp-section-label">All Expenditures</div>
          <div className="exp-table-wrap">
            <table className="exp-table">
              <thead>
                <tr>
                  <th className="center">#</th>
                  <th>Date</th>
                  <th>Note</th>
                  <th>Expenditure</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="center"><span className="exp-sr">{index + 1}</span></td>
                    <td><span className="exp-date">{item.Date}</span></td>
                    <td><span className="exp-note">{item.note}</span></td>
                    <td><span className="exp-amount">₹ {Number(item.expendature).toLocaleString('en-IN')}</span></td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3"><span className="exp-foot-label">Total Expenditure</span></td>
                  <td><span className="exp-foot-val">₹ {Number(Expendature_amt).toLocaleString('en-IN')}</span></td>
                </tr>
              </tfoot>
            </table>
          </div>

        </div>
      </div>
    </>
  );
};

export default Expendature;
