import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { CChart } from '@coreui/react-chartjs';
import axios from 'axios';

/* ─── tiny helpers ──────────────────────────────────────────── */
const fmt = (n) =>
  typeof n === 'number' && !isNaN(n)
    ? `₹ ${Number(n).toLocaleString('en-IN')}`
    : '₹ —';

const ICONS = {
  balance: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
    </svg>
  ),
  deposit: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  interest: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>
    </svg>
  ),
  penalty: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  expense: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  loan: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    </svg>
  ),
  returned: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/>
    </svg>
  ),
  perMember: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  valuation: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  sip: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/>
    </svg>
  ),
  allteam: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
};

/* ─── MetricCard ────────────────────────────────────────────── */
const MetricCard = ({ title, value, icon, positive, accent }) => {
  const isNeg = positive === false;
  const color = isNeg ? '#f87171' : accent || '#34d399';

  return (
    <div style={{
      background: '#111111',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '14px',
      padding: '18px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      transition: 'border-color 0.2s, transform 0.2s',
      cursor: 'default',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* top row: icon + label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{
          width: '32px', height: '32px', borderRadius: '8px',
          background: `${color}18`,
          color: color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          {icon}
        </span>
        <span style={{
          fontSize: '11.5px',
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'rgba(245,245,240,0.45)',
          fontFamily: '"DM Mono", monospace',
          lineHeight: 1.3,
        }}>
          {title}
        </span>
      </div>

      {/* value */}
      <span style={{
        fontSize: '22px',
        fontWeight: 700,
        color: color,
        fontFamily: '"Syne", sans-serif',
        letterSpacing: '-0.01em',
        lineHeight: 1.2,
      }}>
        {fmt(value)}
      </span>
    </div>
  );
};

/* ─── SIPCard ───────────────────────────────────────────────── */
const SIPCard = ({ item, index }) => (
  <div style={{
    background: '#111111',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '14px',
    padding: '18px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    transition: 'border-color 0.2s, transform 0.2s',
    cursor: 'default',
  }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{
        width: '32px', height: '32px', borderRadius: '8px',
        background: 'rgba(139,92,246,0.15)', color: '#a78bfa',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        {ICONS.sip}
      </span>
      <span style={{
        fontSize: '11.5px', fontWeight: 600, letterSpacing: '0.06em',
        textTransform: 'uppercase', color: 'rgba(245,245,240,0.45)',
        fontFamily: '"DM Mono", monospace',
      }}>
        SIP {index + 1}
      </span>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: 'rgba(245,245,240,0.4)', fontFamily: '"DM Mono", monospace' }}>Invested</span>
        <span style={{ fontSize: '15px', fontWeight: 700, color: '#a78bfa', fontFamily: '"Syne", sans-serif' }}>
          {fmt(Number(item.sip_invest))}
        </span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: 'rgba(245,245,240,0.4)', fontFamily: '"DM Mono", monospace' }}>Current Value</span>
        <span style={{ fontSize: '15px', fontWeight: 700, color: '#34d399', fontFamily: '"Syne", sans-serif' }}>
          {fmt(Number(item.sip_value))}
        </span>
      </div>
      {/* gain indicator */}
      {item.sip_value && item.sip_invest ? (() => {
        const gain = Number(item.sip_value) - Number(item.sip_invest);
        const pct = ((gain / Number(item.sip_invest)) * 100).toFixed(1);
        const pos = gain >= 0;
        return (
          <div style={{
            marginTop: '4px',
            background: pos ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)',
            border: `1px solid ${pos ? 'rgba(52,211,153,0.2)' : 'rgba(248,113,113,0.2)'}`,
            borderRadius: '6px',
            padding: '4px 10px',
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: '11px', color: 'rgba(245,245,240,0.5)', fontFamily: '"DM Mono", monospace' }}>Returns</span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: pos ? '#34d399' : '#f87171', fontFamily: '"DM Mono", monospace' }}>
              {pos ? '+' : ''}{pct}%
            </span>
          </div>
        );
      })() : null}
    </div>
  </div>
);

/* ─── Dashboard ─────────────────────────────────────────────── */
const Dashboard = () => {

  /* ── all original state, untouched ── */
  const [totalbalancetoyou, setTotalbalancetoyou] = useState(0);
  const [balanceAtBank, setBalanceBank] = useState(0);
  const [totalDeposite, setTotalDeposite] = useState(0);
  const [totalIntrest, SetTotalInters] = useState(0);
  const [totalPenalty, setTotalPenaly] = useState(0);
  const [totalExpendature, setTotalExpendature] = useState(0);
  const [totalGetedLoan, setTotalGetedLoan] = useState(0);
  const [totalReturnedLoan, setTotalreturnedLoan] = useState(0);
  const [numberOfMembersInTeam, setNumberOfMemberInTeam] = useState(0);
  const [totalRemunaration, setTotalRemunaration] = useState(0);

  /* ── all original API calls, untouched ── */
  function getTotalCashToyou() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/admin/gettotalcashtoyou.php`;
    let fData2 = new FormData();
    fData2.append('admin_name', window.localStorage.getItem("user_name"));
    axios.post(url2, fData2).then((response) => {
      const APIResponse = response.data;
      setTotalbalancetoyou(APIResponse);
    }).catch(error => alert(error, " Try Again...!"));
  }

  function getTotaltotalRemunaration() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/getTotalRemuneration.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));
    axios.post(url2, fData2).then((response) => {
      const APIResponse = response.data;
      setTotalRemunaration(APIResponse);
    }).catch(error => alert(error, " Try Again...!"));
  }

  function getTotalBalance() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/balanceInAccount.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));
    axios.post(url2, fData2).then((response) => {
      const APIResponse = response.data;
      setBalanceBank(APIResponse);
    }).catch(error => alert(error, " Try Again...!"));
  }

  function getTotalDeposite() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/getTotalDeposite.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));
    axios.post(url2, fData2).then((response) => {
      const APIResponse = response.data;
      setTotalDeposite(APIResponse);
    }).catch(error => alert(error, " Try Again...!"));
  }

  function getTotalIntrest() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/getTotalIntrest.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));
    axios.post(url2, fData2).then((response) => {
      const APIResponse = response.data;
      SetTotalInters(APIResponse);
    }).catch(error => alert(error, " Try Again...!"));
  }

  function getTotalPenaly() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/getTotalPenalty.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));
    axios.post(url2, fData2).then((response) => {
      const APIResponse = response.data;
      setTotalPenaly(APIResponse);
    }).catch(error => alert(error, " Try Again...!"));
  }

  function getTotalExpendature() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/getTotalExpendature.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));
    axios.post(url2, fData2).then((response) => {
      const APIResponse = response.data;
      setTotalExpendature(APIResponse);
    }).catch(error => alert(error, " Try Again...!"));
  }

  function getTotalGetedLoan() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/getTotalLoan.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));
    axios.post(url2, fData2).then((response) => {
      const APIResponse = response.data;
      setTotalGetedLoan(APIResponse);
    }).catch(error => alert(error, " Try Again...!"));
  }

  function getTotalReturnedLoan() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/getTotalLoanReturned.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));
    axios.post(url2, fData2).then((response) => {
      const APIResponse = response.data;
      setTotalreturnedLoan(APIResponse);
    }).catch(error => alert(error, " Try Again...!"));
  }

  function getTotalNumberOfMember() {
    const url2 = `${process.env.REACT_APP_domain}/sjh-team-api/getNumberOfMemberInTeam.php`;
    let fData2 = new FormData();
    fData2.append('name', localStorage.getItem('team'));
    axios.post(url2, fData2).then((response) => {
      const APIResponse = response.data;
      setNumberOfMemberInTeam(APIResponse);
    }).catch(error => alert(error, " Try Again...!"));
  }

  const [sipdata, setSipData] = useState([]);

  const getSipData = () => {
    const url = `${process.env.REACT_APP_domain}/sjh-team-api/sips.php`;
    let fData = new FormData();
    fData.append('team', localStorage.getItem('team'));
    axios.post(url, fData).then((response) => {
      const APIResponse = response.data;
      setSipData(APIResponse);
    }).catch(error => alert(error, " Try Again...!"));
  };

  useEffect(() => {
    getSipData();
    getTotalBalance();
    getTotalDeposite();
    getTotalIntrest();
    getTotalPenaly();
    getTotalExpendature();
    getTotalReturnedLoan();
    getTotalGetedLoan();
    getTotalNumberOfMember();
    getTotaltotalRemunaration();
    getTotalCashToyou();
  }, []);

  /* ── computed (same logic as original) ── */
  const valuationPerMember = Math.round(
    (totalDeposite + totalIntrest + totalPenalty - totalExpendature - totalRemunaration) / numberOfMembersInTeam
  );
  const valuationPositive =
    (totalDeposite + totalIntrest + totalPenalty - totalExpendature - totalRemunaration) >= totalDeposite;

  const teamName = localStorage.getItem('team') || '';

  /* ── cards config ── */
  const cards = [
    { title: "Total Balance", value: balanceAtBank, positive: balanceAtBank >= 0, icon: ICONS.balance, accent: '#60a5fa' },
    { title: "All Teams Balance", value: totalbalancetoyou, positive: totalbalancetoyou >= 0, icon: ICONS.allteam, accent: '#60a5fa' },
    { title: "Total Deposit", value: totalDeposite, icon: ICONS.deposit, accent: '#34d399' },
    { title: "Total Interest", value: totalIntrest, icon: ICONS.interest, accent: '#fbbf24' },
    { title: "Total Penalty", value: totalPenalty, icon: ICONS.penalty, accent: '#f87171' },
    { title: "Total Expenditure", value: totalExpendature, icon: ICONS.expense, accent: '#f87171' },
    { title: "Loans Dispatched", value: totalGetedLoan, icon: ICONS.loan, accent: '#c084fc' },
    { title: "Loans Returned", value: totalReturnedLoan, icon: ICONS.returned, accent: '#34d399' },
    { title: "Deposit / Member", value: parseInt(totalDeposite / numberOfMembersInTeam), icon: ICONS.perMember, accent: '#60a5fa' },
    { title: "Valuation / Member", value: valuationPerMember, positive: valuationPositive, icon: ICONS.valuation, accent: '#34d399' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        .dash-root {
          padding-top: 72px;
          min-height: 100vh;
          background: #0a0a0a;
          padding-left: 20px;
          padding-right: 20px;
          padding-bottom: 48px;
          box-sizing: border-box;
        }

        /* Page header */
        .dash-header {
          padding: 32px 4px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 28px;
        }
        .dash-header-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(245,245,240,0.35);
          font-family: 'DM Mono', monospace;
          margin-bottom: 6px;
        }
        .dash-header-title {
          font-size: clamp(22px, 4vw, 30px);
          font-weight: 800;
          font-family: 'Syne', sans-serif;
          color: #f5f5f0;
          letter-spacing: -0.02em;
        }
        .dash-header-title span { color: #f0c040; }

        /* Section label */
        .section-label {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(245,245,240,0.3);
          font-family: 'DM Mono', monospace;
          margin-bottom: 14px;
          padding-left: 2px;
        }

        /* Card grid */
        .card-grid {
          display: grid;
          gap: 14px;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          margin-bottom: 40px;
        }

        /* Chart wrapper */
        .chart-section {
          background: #111111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 24px;
          margin-top: 12px;
        }
        .chart-title {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(245,245,240,0.45);
          font-family: 'DM Mono', monospace;
          margin-bottom: 20px;
        }

        /* Legend dots */
        .chart-legend {
          display: flex;
          gap: 20px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .chart-legend-item {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 12px;
          color: rgba(245,245,240,0.5);
          font-family: 'DM Mono', monospace;
        }
        .chart-legend-dot {
          width: 10px; height: 10px;
          border-radius: 2px;
          flex-shrink: 0;
        }

        @media (max-width: 640px) {
          .dash-root { padding-left: 14px; padding-right: 14px; }
          .card-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
        }
        @media (max-width: 400px) {
          .card-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="dash-root">

        {/* ── Page Header ── */}
        <div className="dash-header">
          <div className="dash-header-label">Overview</div>
          <div className="dash-header-title">
            {teamName ? <><span>{teamName}</span> Dashboard</> : 'Dashboard'}
          </div>
        </div>

        {/* ── Metric Cards ── */}
        <div className="section-label">Key Metrics</div>
        <div className="card-grid">
          {cards.map((card, i) => (
            <MetricCard key={i} {...card} />
          ))}
          {sipdata.map((item, index) => (
            <SIPCard key={index} item={item} index={index} />
          ))}
        </div>

        {/* ── Chart (PavanPutra only — original condition untouched) ── */}
        {localStorage.getItem('team') === 'PavanPutra' && (
          <div>
            <div className="section-label">Growth Chart</div>
            <div className="chart-section">
              <div className="chart-title">Deposit vs Valuation</div>
              <div className="chart-legend">
                <div className="chart-legend-item">
                  <div className="chart-legend-dot" style={{ background: '#667EEA' }} />
                  Deposit
                </div>
                <div className="chart-legend-item">
                  <div className="chart-legend-dot" style={{ background: '#48BB78' }} />
                  Valuation
                </div>
              </div>
              <div style={{ width: '100%', overflowX: 'auto' }}>
                <CChart
                  type="line"
                  data={{
                    labels: [
                      "Aug−23","Sep−23","Oct−23","Nov−23","Dec−23",
                      "Jan−24","Feb−24","Mar−24","Apr−24","May−24",
                      "Jun−24","Jul−24","Aug−24","Sep−24","Oct−24",
                      "Nov−24","Dec−24","Jan-25","Feb-25"
                    ],
                    datasets: [
                      {
                        label: "Deposit",
                        backgroundColor: "rgba(102,126,234,0.15)",
                        borderColor: "#667EEA",
                        pointBackgroundColor: "#667EEA",
                        pointBorderColor: "#0a0a0a",
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        fill: true,
                        tension: 0.4,
                        data: [300,600,900,1200,1500,1800,2100,2400,2700,3000,3300,3600,3950,4350,4650,5000,5350,5700,6050],
                      },
                      {
                        label: "Valuation",
                        backgroundColor: "rgba(72,187,120,0.1)",
                        borderColor: "#48BB78",
                        pointBackgroundColor: "#48BB78",
                        pointBorderColor: "#0a0a0a",
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        fill: true,
                        tension: 0.4,
                        data: [300,700,1100,1500,1800,2200,2600,3000,3400,3700,4100,4400,4750,5000,5161,5600,6100,6300,6747],
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        backgroundColor: '#1a1a1a',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderWidth: 1,
                        titleColor: 'rgba(245,245,240,0.9)',
                        bodyColor: 'rgba(245,245,240,0.6)',
                        padding: 10,
                        callbacks: {
                          label: (ctx) => ` ₹ ${Number(ctx.raw).toLocaleString('en-IN')}`
                        }
                      }
                    },
                    scales: {
                      x: {
                        grid: { color: "rgba(255,255,255,0.04)" },
                        ticks: {
                          color: "rgba(245,245,240,0.35)",
                          font: { size: 10, family: "'DM Mono', monospace" },
                          maxRotation: 45,
                        },
                        border: { color: 'rgba(255,255,255,0.06)' },
                      },
                      y: {
                        grid: { color: "rgba(255,255,255,0.04)" },
                        ticks: {
                          color: "rgba(245,245,240,0.35)",
                          font: { size: 10, family: "'DM Mono', monospace" },
                          callback: (v) => `₹${Number(v).toLocaleString('en-IN')}`,
                        },
                        border: { color: 'rgba(255,255,255,0.06)' },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
