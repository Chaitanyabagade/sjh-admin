import React, { useEffect, useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Loan = () => {
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(0);
  const [names, setNames] = useState([]);
  const [total_intrest_amt, setTotal_intrest_amt] = useState(0);
  const [loan_amt_returned, setloan_amt_returned] = useState(0);
  const [loan_amt, setloan_amt] = useState(0);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState();
  const [getDate, setGetDate] = useState("");
  const [duration, setDuration] = useState();
  const [id, setId] = useState();
  const [name2, setName2] = useState("");
  const [loan_Date, setLoanDate] = useState("");
  const [Actionids, setActionid] = useState(null);

  /* ── all original business logic untouched ── */
  function getTotalNames() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/allUserName.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));
    axios.post(url2, fData2).then((response) => {
      setNames(response.data);
    }).catch(error => alert(error, " Try Again...!"));
  }

  function getTotalIntrest() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/getTotalIntrest.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));
    axios.post(url2, fData2).then((response) => {
      setTotal_intrest_amt(response.data);
    }).catch(error => alert(error, " Try Again...!"));
  }

  function getTotalLoanReturned() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/getTotalLoanReturned.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));
    axios.post(url2, fData2).then((response) => {
      setloan_amt_returned(response.data);
    }).catch(error => alert(error, " Try Again...!"));
  }

  function getTotalLoan() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/getTotalLoan.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));
    axios.post(url2, fData2).then((response) => {
      setloan_amt(response.data);
    }).catch(error => alert(error, " Try Again...!"));
  }

  function getData() {
    const url = `${process.env.REACT_APP_domain}/sjh-team-api/user_loan.php`;
    let fData = new FormData();
    fData.append('name', localStorage.getItem('team'));
    axios.post(url, fData).then((response) => {
      setData(response.data);
      console.log(response.data);
    }).catch(error => alert(error, " Try Again...!"));
  }

  const handleAddLoan = () => {
    if (confirm(`Conferm to Add loan of user => ${name} and duration => ${duration}`)) {
      if (name.length === 0) {
        alert("User Name is left");
      } else if (amount <= 0) {
        alert("Amount is not in negative or zero");
      } else if (getDate.length === 0) {
        alert("get date is left");
      } else if (duration.length === 0) {
        alert("duration is left");
      } else {
        setSpinner(1);
        const url = `${process.env.REACT_APP_domain}/sjh-team-api/admin/add_loan.php`;
        let fData = new FormData();
        fData.append('name', name);
        fData.append('amount', amount);
        fData.append('get_date', getDate);
        fData.append('duration', duration);
        fData.append('team', localStorage.getItem('team'));
        fData.append('mobile_no', localStorage.getItem('mobile_no'));
        fData.append('admin_name', localStorage.getItem('user_name'));
        axios.post(url, fData).then((result) => {
          if (result.status == 200) {
            alert("sucessfuly add..");
            getData(); getTotalLoan(); getTotalLoanReturned(); getTotalIntrest();
          } else { alert(result.data); }
          setSpinner(0);
        }).catch(error => alert(error, " Try Again...!"));
      }
    }
  };

  const handleEditLoan = () => {
    if (name2.length === 0) { alert("User Name is left"); }
    else if (id.length === 0) { alert("loan id is left"); }
    else if (id != Actionids) { alert("Action id is not same as id"); setActionid(null); }
    else if (loan_Date.length === 0) { alert("now date is left"); }
    else {
      if (confirm(`Conferm to Edit loan of user => ${name2} and loan id => ${id}`)) {
        setSpinner(1);
        const url = `${process.env.REACT_APP_domain}/sjh-team-api/admin/edit_loan.php`;
        let fData = new FormData();
        fData.append('name', name2);
        fData.append('id', id);
        fData.append('lastDate', loan_Date);
        fData.append('team', localStorage.getItem('team'));
        fData.append('mobile_no', localStorage.getItem('mobile_no'));
        fData.append('admin_name', localStorage.getItem('user_name'));
        axios.post(url, fData).then((result) => {
          getData(); getTotalLoan(); getTotalLoanReturned(); getTotalIntrest();
          setSpinner(0); setActionid(null);
          if (result.status == 200) {
            if (result.data == 'Aclear') { alert("The User Loan Is Already Cleared If you are in any Problem Please Contact to Technical Manager"); }
            else if (result.data == 'Nclear') { alert("Th EMI is successfuly added And The User Loan is Now Clear"); }
            else if (result.data == 'yes') { alert("The EMI is successfuly added.."); }
            else { alert("something is gone wrong please immidiate contact to the technical manager"); alert(result.data); console.log(result.data); }
          } else { alert(result.data); }
        }).catch(error => alert(error, " Try Again...!"));
      }
    }
  };

  useEffect(() => {
    getData();
    getTotalLoanReturned();
    getTotalLoan();
    getTotalNames();
    getTotalIntrest();
  }, []);

  const ActionId = async (id) => { setActionid(id); };

  const cols = [
    'Action','#','Loan ID','User','Loan Amt','Returned','Interest','Int. Returned',
    'Type','EMI Amt','Duration','Count','Rate','Loan Date','Last EMI','Provider','Status'
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        .loan-root {
          min-height: 100vh;
          background: #0a0a0a;
          padding: 90px 20px 60px;
          box-sizing: border-box;
          font-family: 'Syne', sans-serif;
        }
        .loan-inner { max-width: 1200px; margin: 0 auto; }

        /* spinner */
        .loan-spinner-overlay {
          position: fixed; inset: 0; z-index: 999;
          background: rgba(0,0,0,0.65);
          display: flex; align-items: center; justify-content: center;
        }
        .loan-spinner {
          width: 44px; height: 44px;
          border: 3px solid rgba(240,192,64,0.15);
          border-top-color: #f0c040;
          border-radius: 50%;
          animation: loan-spin 0.75s linear infinite;
        }
        @keyframes loan-spin { to { transform: rotate(360deg); } }

        /* page header */
        .loan-header { padding-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.06); margin-bottom: 28px; }
        .loan-header-label {
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(245,245,240,0.28);
          font-family: 'DM Mono', monospace; margin-bottom: 6px;
        }
        .loan-header-title {
          font-size: clamp(22px,4vw,30px); font-weight: 800;
          color: #f5f5f0; letter-spacing: -0.02em;
        }
        .loan-header-title span { color: #f0c040; }

        /* summary cards row */
        .loan-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px; margin-bottom: 28px;
        }
        .loan-stat-card {
          background: #111; border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 16px 20px;
        }
        .loan-stat-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(245,245,240,0.28);
          font-family: 'DM Mono', monospace; margin-bottom: 6px;
        }
        .loan-stat-value {
          font-size: 20px; font-weight: 800;
          font-family: 'DM Mono', monospace; letter-spacing: -0.01em;
        }

        /* forms row */
        .loan-forms {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px; margin-bottom: 28px;
        }
        @media (max-width: 720px) { .loan-forms { grid-template-columns: 1fr; } }

        .loan-form-card {
          background: #111; border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 24px;
        }
        .loan-form-title {
          font-size: 12px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(245,245,240,0.3);
          font-family: 'DM Mono', monospace; margin-bottom: 20px;
        }
        .loan-field { margin-bottom: 14px; }
        .loan-label {
          display: block; font-size: 10px; font-weight: 700; letter-spacing: 0.13em;
          text-transform: uppercase; color: rgba(245,245,240,0.32);
          font-family: 'DM Mono', monospace; margin-bottom: 7px;
        }
        .loan-input, .loan-select {
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 9px;
          padding: 10px 13px; font-size: 13.5px; font-weight: 600;
          color: #f5f5f0; font-family: 'Syne', sans-serif;
          outline: none; box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .loan-input:focus, .loan-select:focus { border-color: rgba(240,192,64,0.5); }
        .loan-input::placeholder { color: rgba(245,245,240,0.2); }
        .loan-input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.5); }
        .loan-select { appearance: none; cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(245,245,240,0.3)' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 13px center;
        }
        .loan-select option { background: #1a1a1a; color: #f5f5f0; }

        .loan-submit-btn {
          width: 100%; display: flex; align-items: center; justify-content: center;
          gap: 8px; padding: 11px 20px; border-radius: 9px; border: none;
          background: #f0c040; color: #1a1400; font-size: 12px; font-weight: 800;
          font-family: 'Syne', sans-serif; letter-spacing: 0.08em; text-transform: uppercase;
          cursor: pointer; transition: background 0.2s, transform 0.15s; margin-top: 6px;
        }
        .loan-submit-btn:hover { background: #e6b800; transform: translateY(-1px); }

        /* requests link */
        .loan-requests-link {
          display: inline-flex; align-items: center; gap: 8px;
          text-decoration: none; font-size: 13px; font-weight: 700;
          font-family: 'Syne', sans-serif; letter-spacing: 0.06em; text-transform: uppercase;
          padding: 10px 20px; border-radius: 9px;
          background: rgba(167,139,250,0.1); border: 1px solid rgba(167,139,250,0.25);
          color: #a78bfa; transition: background 0.2s, border-color 0.2s;
          margin-bottom: 20px;
        }
        .loan-requests-link:hover { background: rgba(167,139,250,0.18); border-color: rgba(167,139,250,0.4); }

        /* section label */
        .loan-section-label {
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(245,245,240,0.25);
          font-family: 'DM Mono', monospace; margin-bottom: 14px;
        }

        /* table */
        .loan-table-wrap {
          background: #111; border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; overflow: hidden; overflow-x: auto;
        }
        .loan-table {
          width: 100%; border-collapse: collapse;
          min-width: 1200px; font-family: 'Syne', sans-serif;
        }
        .loan-table thead tr {
          background: #181818; border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .loan-table th {
          padding: 11px 13px; font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(245,245,240,0.28); font-family: 'DM Mono', monospace;
          text-align: left; white-space: nowrap;
        }
        .loan-table th.center { text-align: center; }

        .loan-table tbody tr {
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.15s;
        }
        .loan-table tbody tr:last-child { border-bottom: none; }
        .loan-table tbody tr:hover { background: rgba(255,255,255,0.025); }
        .loan-table tbody tr.active-row { background: rgba(240,192,64,0.08); border-left: 2px solid #f0c040; }

        .loan-table td {
          padding: 11px 13px; font-size: 12.5px;
          color: rgba(245,245,240,0.65); vertical-align: middle; white-space: nowrap;
        }
        .loan-table td.center { text-align: center; }

        .loan-sr { font-family: 'DM Mono', monospace; font-size: 10.5px; color: rgba(245,245,240,0.22); }
        .loan-mono { font-family: 'DM Mono', monospace; font-size: 12px; }
        .loan-user { font-weight: 700; color: #f5f5f0; }

        .loan-action-btn {
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
          color: rgba(245,245,240,0.6); border-radius: 6px; padding: 4px 12px;
          font-size: 10.5px; font-weight: 700; font-family: 'Syne', sans-serif;
          letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s; white-space: nowrap;
        }
        .loan-action-btn:hover { background: rgba(240,192,64,0.1); border-color: rgba(240,192,64,0.35); color: #f0c040; }
        .loan-action-btn.selected { background: rgba(240,192,64,0.15); border-color: rgba(240,192,64,0.5); color: #f0c040; }

        .status-badge {
          font-size: 10px; font-weight: 700; font-family: 'DM Mono', monospace;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 3px 10px; border-radius: 99px;
        }
        .status-clear { background: rgba(52,211,153,0.12); color: #34d399; border: 1px solid rgba(52,211,153,0.22); }
        .status-pending { background: rgba(248,113,113,0.12); color: #f87171; border: 1px solid rgba(248,113,113,0.22); }

        /* tfoot */
        .loan-table tfoot tr { background: #181818; border-top: 1px solid rgba(255,255,255,0.07); }
        .loan-table tfoot td { padding: 12px 13px; }
        .loan-foot-label {
          font-size: 9.5px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; font-family: 'DM Mono', monospace;
          color: rgba(245,245,240,0.28);
        }
        .loan-foot-val {
          font-size: 13px; font-weight: 800;
          font-family: 'DM Mono', monospace; color: #f0c040;
        }
      `}</style>

      {spinner ? <div className="loan-spinner-overlay"><div className="loan-spinner" /></div> : null}

      <div className="loan-root">
        <div className="loan-inner">

          {/* ── Page header ── */}
          <div className="loan-header">
            <div className="loan-header-label">Finance</div>
            <div className="loan-header-title">Loan <span>Management</span></div>
          </div>

          {/* ── Stats strip ── */}
          <div className="loan-stats">
            <div className="loan-stat-card">
              <div className="loan-stat-label">Total Dispatched</div>
              <div className="loan-stat-value" style={{ color: '#f87171' }}>
                ₹ {Number(loan_amt).toLocaleString('en-IN')}
              </div>
            </div>
            <div className="loan-stat-card">
              <div className="loan-stat-label">Total Returned</div>
              <div className="loan-stat-value" style={{ color: '#34d399' }}>
                ₹ {Number(loan_amt_returned).toLocaleString('en-IN')}
              </div>
            </div>
            <div className="loan-stat-card">
              <div className="loan-stat-label">Total Interest</div>
              <div className="loan-stat-value" style={{ color: '#fbbf24' }}>
                ₹ {Number(total_intrest_amt).toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          {/* ── Forms row ── */}
          <div className="loan-forms">

            {/* Add Loan */}
            <div className="loan-form-card">
              <div className="loan-form-title">Add New Loan</div>
              <div className="loan-field">
                <label className="loan-label">User Name</label>
                <select value={name} onChange={(e) => setName(e.target.value)} className="loan-select">
                  <option>User Name...</option>
                  {names.map((n, i) => <option key={i}>{n.user_name}</option>)}
                </select>
              </div>
              <div className="loan-field">
                <label className="loan-label">Amount</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" className="loan-input" />
              </div>
              <div className="loan-field">
                <label className="loan-label">Loan Date</label>
                <input value={getDate} type="date" onChange={(e) => setGetDate(e.target.value)} className="loan-input" />
              </div>
              <div className="loan-field">
                <label className="loan-label">Duration</label>
                <input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Enter duration" className="loan-input" />
              </div>
              <button onClick={handleAddLoan} className="loan-submit-btn">
                <FaPaperPlane size={12} /> Submit Loan
              </button>
            </div>

            {/* Add EMI */}
            <div className="loan-form-card">
              <div className="loan-form-title">Add Loan EMI</div>
              <div className="loan-field">
                <label className="loan-label">User Name</label>
                <select value={name2} onChange={(e) => setName2(e.target.value)} className="loan-select">
                  <option>User Name...</option>
                  {names.map((n, i) => <option key={i}>{n.user_name}</option>)}
                </select>
              </div>
              <div className="loan-field">
                <label className="loan-label">Loan ID</label>
                <input value={id} onChange={(e) => setId(e.target.value)} placeholder="Enter Loan ID" className="loan-input" />
              </div>
              <div className="loan-field">
                <label className="loan-label">Payment Date</label>
                <input value={loan_Date} type="date" onChange={(e) => setLoanDate(e.target.value)} className="loan-input" />
              </div>
              {Actionids && (
                <div style={{ fontSize: '11px', fontFamily: '"DM Mono", monospace', color: '#f0c040', marginBottom: '12px', padding: '8px 12px', background: 'rgba(240,192,64,0.08)', borderRadius: '7px', border: '1px solid rgba(240,192,64,0.2)' }}>
                  Active Loan ID: <strong>{Actionids}</strong>
                </div>
              )}
              <button onClick={handleEditLoan} className="loan-submit-btn">
                <FaPaperPlane size={12} /> Submit EMI
              </button>
            </div>
          </div>

          {/* ── Loan Requests link ── */}
          <Link to="/loanrequests" className="loan-requests-link">
            ↗ View Loan Requests
          </Link>

          {/* ── Table ── */}
          <div className="loan-section-label">All User Loans</div>
          <div className="loan-table-wrap">
            <table className="loan-table">
              <thead>
                <tr>
                  <th className="center">Action</th>
                  <th className="center">#</th>
                  <th>Loan ID</th>
                  <th>User</th>
                  <th>Loan Amt</th>
                  <th>Returned</th>
                  <th>Interest</th>
                  <th>Int. Returned</th>
                  <th>Type</th>
                  <th>EMI Amt</th>
                  <th>Duration</th>
                  <th>Count</th>
                  <th>Rate</th>
                  <th>Loan Date</th>
                  <th>Last EMI</th>
                  <th>Provider</th>
                  <th className="center">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className={Actionids === item.id ? 'active-row' : ''}>
                    <td className="center">
                      <button
                        className={`loan-action-btn ${Actionids === item.id ? 'selected' : ''}`}
                        onClick={() => ActionId(item.id)}
                      >
                        {Actionids === item.id ? '✓ Active' : 'Select'}
                      </button>
                    </td>
                    <td className="center"><span className="loan-sr">{index + 1}</span></td>
                    <td><span className="loan-mono">{item.id}</span></td>
                    <td><span className="loan-user">{item.user_name}</span></td>
                    <td><span className="loan-mono">₹ {Number(item.loan_amt).toLocaleString('en-IN')}</span></td>
                    <td><span className="loan-mono" style={{ color: '#34d399' }}>₹ {Number(item.loan_amt_returned).toLocaleString('en-IN')}</span></td>
                    <td><span className="loan-mono" style={{ color: '#fbbf24' }}>₹ {Number(item.loan_amt_intrest).toLocaleString('en-IN')}</span></td>
                    <td><span className="loan-mono">₹ {Number(item.loan_amt_intrest_returned).toLocaleString('en-IN')}</span></td>
                    <td><span className="loan-mono">{item.loan_type}</span></td>
                    <td><span className="loan-mono">₹ {Number(item.EMI_amt).toLocaleString('en-IN')}</span></td>
                    <td><span className="loan-mono">{item.EMI_duration}</span></td>
                    <td><span className="loan-mono">{item.EMI_count}</span></td>
                    <td><span className="loan-mono">{item.EMI_rate}%</span></td>
                    <td><span className="loan-mono" style={{ color: 'rgba(245,245,240,0.35)', fontSize: '11px' }}>{item.Loan_date}</span></td>
                    <td><span className="loan-mono" style={{ color: 'rgba(245,245,240,0.35)', fontSize: '11px' }}>{item.last_paid_date}</span></td>
                    <td><span style={{ color: 'rgba(245,245,240,0.55)' }}>{item.loan_provider}</span></td>
                    <td className="center">
                      <span className={`status-badge ${item.status === 'Clear' ? 'status-clear' : 'status-pending'}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4"><span className="loan-foot-label">Total Returned Loan</span></td>
                  <td colSpan="2"><span className="loan-foot-val">₹ {Number(loan_amt_returned).toLocaleString('en-IN')}</span></td>
                  <td colSpan="2"><span className="loan-foot-label">Dispatched</span></td>
                  <td colSpan="2"><span className="loan-foot-val">₹ {Number(loan_amt).toLocaleString('en-IN')}</span></td>
                  <td colSpan="3"><span className="loan-foot-label">Total Interest</span></td>
                  <td colSpan="4"><span className="loan-foot-val">₹ {Number(total_intrest_amt).toLocaleString('en-IN')}</span></td>
                </tr>
              </tfoot>
            </table>
          </div>

        </div>
      </div>
    </>
  );
};

export default Loan;
