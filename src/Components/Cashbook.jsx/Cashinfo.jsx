import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cashinfo = () => {
  const [data2, setData2] = useState([]);
  const [total_amt, setTotal_amt] = useState(0);

  /* ── all original business logic untouched ── */
  function getTotalCashATHand() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/admin/getTotalCashAtHand.php`;
    let fData2 = new FormData();
    fData2.append('team', localStorage.getItem('team'));
    fData2.append('admin_name', localStorage.getItem('cashatadmin_name'));
    axios.post(url2, fData2).then((response) => {
      setTotal_amt(response.data);
    }).catch(error => alert(error, " Try Again...!"));
  }

  function getData() {
    const url = `${process.env.REACT_APP_domain}/sjh-team-api/admin/getCashbooks.php`;
    let fData = new FormData();
    fData.append('team', localStorage.getItem('team'));
    fData.append('admin_name', localStorage.getItem('cashatadmin_name'));
    axios.post(url, fData).then((response) => {
      setData2(response.data);
    }).catch(error => alert(error, " Try Again...!"));
    getTotalCashATHand();
  }

  useEffect(() => {
    getData();
    getTotalCashATHand();
  }, []);

  const adminName = localStorage.getItem('cashatadmin_name') || '—';
  const isPos = total_amt >= 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        .ci-root {
          min-height: 100vh;
          background: #0a0a0a;
          padding: 90px 20px 60px;
          box-sizing: border-box;
          font-family: 'Syne', sans-serif;
        }

        .ci-inner {
          max-width: 900px;
          margin: 0 auto;
        }

        /* ── Header ── */
        .ci-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .ci-header-label {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(245,245,240,0.28);
          font-family: 'DM Mono', monospace;
          margin-bottom: 6px;
        }
        .ci-header-title {
          font-size: clamp(20px, 4vw, 28px);
          font-weight: 800;
          color: #f5f5f0;
          letter-spacing: -0.02em;
        }
        .ci-header-title span { color: #f0c040; }

        .ci-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 9px 18px;
          border-radius: 9px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          color: rgba(245,245,240,0.55);
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          align-self: flex-start;
          margin-top: 4px;
        }
        .ci-back-btn:hover {
          background: rgba(240,192,64,0.08);
          border-color: rgba(240,192,64,0.3);
          color: #f0c040;
        }

        /* ── Summary strip ── */
        .ci-summary {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 16px 20px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .ci-summary-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(245,245,240,0.3);
          font-family: 'DM Mono', monospace;
          flex: 1;
        }
        .ci-summary-count {
          font-size: 12px;
          font-family: 'DM Mono', monospace;
          color: rgba(245,245,240,0.35);
        }
        .ci-summary-total {
          font-size: 20px;
          font-weight: 800;
          font-family: 'DM Mono', monospace;
          letter-spacing: -0.01em;
        }

        /* ── Table wrapper ── */
        .ci-table-wrap {
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          overflow: hidden;
          overflow-x: auto;
        }

        .ci-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 540px;
          font-family: 'Syne', sans-serif;
        }

        /* Head */
        .ci-table thead tr {
          background: #181818;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .ci-table th {
          padding: 12px 16px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(245,245,240,0.3);
          font-family: 'DM Mono', monospace;
          text-align: left;
          white-space: nowrap;
        }
        .ci-table th.right { text-align: right; }
        .ci-table th.center { text-align: center; }

        /* Body rows */
        .ci-table tbody tr {
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.15s;
        }
        .ci-table tbody tr:last-child { border-bottom: none; }
        .ci-table tbody tr:hover { background: rgba(255,255,255,0.025); }

        .ci-table td {
          padding: 13px 16px;
          font-size: 13.5px;
          color: rgba(245,245,240,0.7);
          vertical-align: middle;
        }
        .ci-table td.center { text-align: center; }
        .ci-table td.right { text-align: right; }

        .ci-sr {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: rgba(245,245,240,0.25);
          font-weight: 500;
        }

        .ci-amount {
          font-family: 'DM Mono', monospace;
          font-size: 14px;
          font-weight: 700;
          text-align: right;
        }

        .ci-note {
          color: rgba(245,245,240,0.6);
          font-size: 13px;
        }

        .ci-date {
          font-family: 'DM Mono', monospace;
          font-size: 11.5px;
          color: rgba(245,245,240,0.35);
          white-space: nowrap;
        }

        /* Foot */
        .ci-table tfoot tr {
          background: #181818;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .ci-table tfoot td {
          padding: 14px 16px;
        }
        .ci-foot-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-family: 'DM Mono', monospace;
          color: rgba(245,245,240,0.3);
        }
        .ci-foot-total {
          font-size: 18px;
          font-weight: 800;
          font-family: 'DM Mono', monospace;
          text-align: right;
        }

        /* Empty state */
        .ci-empty {
          padding: 48px 24px;
          text-align: center;
          color: rgba(245,245,240,0.2);
          font-size: 13px;
          font-family: 'DM Mono', monospace;
          letter-spacing: 0.08em;
        }
      `}</style>

      <div className="ci-root">
        <div className="ci-inner">

          {/* ── Header ── */}
          <div className="ci-header">
            <div>
              <div className="ci-header-label">Cash Book</div>
              <div className="ci-header-title">
                <span>{adminName}</span>'s Ledger
              </div>
            </div>
            <Link to="../cashbook" className="ci-back-btn">
              ← Back
            </Link>
          </div>

          {/* ── Summary strip ── */}
          <div className="ci-summary">
            <span className="ci-summary-label">Balance at Hand</span>
            <span className="ci-summary-count">{data2.length} entries</span>
            <span
              className="ci-summary-total"
              style={{ color: isPos ? '#34d399' : '#f87171' }}
            >
              ₹ {Number(total_amt).toLocaleString('en-IN')}
            </span>
          </div>

          {/* ── Table ── */}
          <div className="ci-table-wrap">
            <table className="ci-table">
              <thead>
                <tr>
                  <th className="center">#</th>
                  <th className="right">Amount</th>
                  <th>Note</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data2.length === 0 ? (
                  <tr>
                    <td colSpan="4">
                      <div className="ci-empty">No transactions found</div>
                    </td>
                  </tr>
                ) : (
                  data2.map((transaction, index) => (
                    <tr key={index}>
                      <td className="center">
                        <span className="ci-sr">{index + 1}</span>
                      </td>
                      <td className="right">
                        <span
                          className="ci-amount"
                          style={{ color: transaction.amount > 0 ? '#34d399' : '#f87171' }}
                        >
                          {transaction.amount > 0 ? '+' : ''}
                          ₹ {Number(transaction.amount).toLocaleString('en-IN')}
                        </span>
                      </td>
                      <td>
                        <span className="ci-note">{transaction.note || '—'}</span>
                      </td>
                      <td>
                        <span className="ci-date">{transaction.last_paid_date}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3">
                    <span className="ci-foot-label">Net Balance</span>
                  </td>
                  <td>
                    <span
                      className="ci-foot-total"
                      style={{ color: isPos ? '#34d399' : '#f87171' }}
                    >
                      ₹ {Number(total_amt).toLocaleString('en-IN')}
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

        </div>
      </div>
    </>
  );
};

export default Cashinfo;
