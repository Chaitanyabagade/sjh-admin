import React, { useEffect, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';

const avatarColors = [
  { bg: '#0c2a4a', color: '#60a5fa' },
  { bg: '#052e16', color: '#34d399' },
  { bg: '#2d1a00', color: '#fbbf24' },
  { bg: '#2d0a2d', color: '#c084fc' },
  { bg: '#2d1010', color: '#f87171' },
];

const avatarLetters = (str) =>
  str ? str.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase() : '?';

const fmt = (n) =>
  Number(n).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });

const returnPct = (invest, value) => {
  if (!invest || Number(invest) === 0) return null;
  return (((value - invest) / invest) * 100).toFixed(1);
};

const Sip = () => {
  const [data, setData]         = useState([]);
  const [spinner, setSpinner]   = useState(false);
  const [name, setName]         = useState('');
  const [sipValue, setSipValue] = useState('');

  const getData = () => {
    const url   = `${process.env.REACT_APP_domain}/sjh-team-api/sips.php`;
    const fData = new FormData();
    fData.append('team', localStorage.getItem('team'));
    axios.post(url, fData)
      .then((r) => setData(r.data))
      .catch(() => alert('Failed to load data. Try again.'));
  };

  useEffect(() => { getData(); }, []);

  const totalInvested = data.reduce((a, s) => a + parseFloat(s.sip_invest || 0), 0);
  const totalValue    = data.reduce((a, s) => a + parseFloat(s.sip_value  || 0), 0);
  const totalReturn   = totalInvested > 0
    ? (((totalValue - totalInvested) / totalInvested) * 100).toFixed(1)
    : '0.0';

  const handleAddSIP = () => {
    if (!name || name === 'Select SIP name') return alert('Please select a SIP name.');
    if (!sipValue || Number(sipValue) === 0) return alert('Please enter a SIP valuation.');

    if (window.confirm(`Confirm adding SIP: ${name}?`)) {
      setSpinner(true);
      const url   = `${process.env.REACT_APP_domain}/sjh-team-api/admin/add_sip.php`;
      const fData = new FormData();
      fData.append('sip_name',   name);
      fData.append('sip_value',  sipValue);
      fData.append('team',       localStorage.getItem('team'));
      fData.append('mobile_no',  localStorage.getItem('mobile_no'));
      fData.append('admin_name', localStorage.getItem('user_name'));

      axios.post(url, fData)
        .then((result) => {
          setSpinner(false);
          getData();
          if (result.status === 200) {
            alert('SIP added successfully!');
            setName('');
            setSipValue('');
          } else {
            alert(result.data);
          }
        })
        .catch(() => { setSpinner(false); alert('Submission failed. Try again.'); });
    }
  };

  /* ─── shared inline styles ─── */
  const card = {
    background: '#1a1d27',
    border: '0.5px solid #2a2d3a',
    borderRadius: 12,
  };

  const inputStyle = {
    width: '100%',
    fontSize: 13,
    padding: '9px 12px',
    border: '0.5px solid #2a2d3a',
    borderRadius: 8,
    background: '#0f1117',
    color: '#e2e8f0',
    outline: 'none',
  };

  return (
    <div style={{ background: '#0f1117', minHeight: '100vh', paddingTop: 96, paddingBottom: 48, paddingLeft: 16, paddingRight: 16 }}>

      {/* ── Spinner ── */}
      {spinner && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ ...card, padding: '24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <svg style={{ width: 28, height: 28, animation: 'spin 1s linear infinite' }} viewBox="0 0 100 101" fill="none">
              <path d="M100 50.59C100 78.2 77.6 100.6 50 100.6S0 78.2 0 50.59C0 22.98 22.39.59 50 .59s50 22.39 50 50Z" fill="#1f2335"/>
              <path d="M93.97 39.04c2.43-.64 3.9-3.13 3.04-5.49a50 50 0 0 0-51.28-33.5" stroke="#3b82f6" strokeWidth="9" strokeLinecap="round"/>
            </svg>
            <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>Submitting…</p>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        {/* ── Summary stats ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 18 }}>
          {[
            { label: 'Total invested', value: fmt(totalInvested),  color: '#60a5fa' },
            { label: 'Current value',  value: fmt(totalValue),     color: '#34d399' },
            { label: 'Total returns',  value: `${Number(totalReturn) >= 0 ? '+' : ''}${totalReturn}%`, color: Number(totalReturn) >= 0 ? '#fbbf24' : '#f87171' },
          ].map((s, i) => (
            <div key={i} style={{ ...card, padding: '14px 16px' }}>
              <p style={{ fontSize: 11, color: '#6b7280', margin: '0 0 5px', letterSpacing: '0.04em' }}>{s.label}</p>
              <p style={{ fontSize: 19, fontWeight: 500, color: s.color, margin: 0 }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* ── Add SIP form ── */}
        <div style={{ ...card, padding: 20, marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }} />
            <span style={{ fontSize: 13, fontWeight: 500, color: '#e2e8f0' }}>Add SIP entry</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
            <div>
              <label style={{ fontSize: 11, color: '#6b7280', display: 'block', marginBottom: 6, letterSpacing: '0.04em' }}>SIP NAME</label>
              <select value={name} onChange={(e) => setName(e.target.value)} style={inputStyle}>
                <option>Select SIP name</option>
                {data.map((item, i) => (
                  <option key={i}>{item.sip_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, color: '#6b7280', display: 'block', marginBottom: 6, letterSpacing: '0.04em' }}>VALUATION (₹)</label>
              <input
                type="number"
                value={sipValue}
                onChange={(e) => setSipValue(e.target.value)}
                placeholder="0"
                style={inputStyle}
              />
            </div>
          </div>

          <button
            onClick={handleAddSIP}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#3b82f6', color: '#fff', fontSize: 13, fontWeight: 500, padding: '9px 18px', borderRadius: 8, border: 'none', cursor: 'pointer' }}
          >
            <FaPaperPlane style={{ fontSize: 12 }} />
            Submit entry
          </button>
        </div>

        {/* ── Table header ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#e2e8f0' }}>SIP portfolio</span>
          {data.length > 0 && (
            <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: '#1e3a5f', color: '#60a5fa' }}>
              {data.length} active
            </span>
          )}
        </div>

        {/* ── Table ── */}
        <div style={{ ...card, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ background: '#131620', borderBottom: '0.5px solid #2a2d3a' }}>
                  {['#', 'Fund', 'Amount', 'Invested', 'Value', 'Return'].map((h, i) => (
                    <th key={i} style={{ padding: '10px 12px', textAlign: i < 2 ? 'left' : 'right', fontSize: 10, fontWeight: 500, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: 40, textAlign: 'center', color: '#374151', fontSize: 13 }}>
                      No SIP entries yet
                    </td>
                  </tr>
                ) : (
                  data.map((sip, index) => {
                    const pct = returnPct(sip.sip_invest, sip.sip_value);
                    const av  = avatarColors[index % avatarColors.length];
                    return (
                      <tr key={index} style={{ borderBottom: '0.5px solid #1f2335' }}>
                        <td style={{ padding: '10px 12px', color: '#374151', fontSize: 11 }}>
                          {String(index + 1).padStart(2, '0')}
                        </td>
                        <td style={{ padding: '10px 12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                            <div style={{ width: 28, height: 28, borderRadius: '50%', background: av.bg, color: av.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 500, flexShrink: 0 }}>
                              {avatarLetters(sip.sip_name)}
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 500, color: '#e2e8f0' }}>{sip.sip_name}</span>
                          </div>
                        </td>
                        <td style={{ padding: '10px 12px', textAlign: 'right', color: '#cbd5e1' }}>{fmt(sip.sip_amt)}</td>
                        <td style={{ padding: '10px 12px', textAlign: 'right', color: '#cbd5e1' }}>{fmt(sip.sip_invest)}</td>
                        <td style={{ padding: '10px 12px', textAlign: 'right', color: '#e2e8f0', fontWeight: 500 }}>{fmt(sip.sip_value)}</td>
                        <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                          {pct !== null && (
                            <span style={{
                              display: 'inline-block', fontSize: 10, padding: '2px 8px', borderRadius: 20, fontWeight: 500,
                              background: Number(pct) >= 0 ? '#052e16' : '#2d0a0a',
                              color:      Number(pct) >= 0 ? '#34d399' : '#f87171',
                            }}>
                              {Number(pct) >= 0 ? '+' : ''}{pct}%
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Sip;
