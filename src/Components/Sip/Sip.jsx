import React, { useEffect, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';

const Sip = () => {
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [name, setName] = useState('');
  const [sip_value, setSipValue] = useState('');

  function getData() {
    const url = `${process.env.REACT_APP_domain}/sjh-team-api/sips.php`;
    let fData = new FormData();
    fData.append('team', localStorage.getItem('team'));
    axios.post(url, fData)
      .then((response) => setData(response.data))
      .catch(() => alert('Failed to load data. Try Again...!'));
  }

  useEffect(() => {
    getData();
  }, []);

  const totalInvested = data.reduce((acc, s) => acc + parseFloat(s.sip_invest || 0), 0);
  const totalValue    = data.reduce((acc, s) => acc + parseFloat(s.sip_value  || 0), 0);
  const totalReturn   = totalInvested > 0 ? (((totalValue - totalInvested) / totalInvested) * 100).toFixed(1) : 0;

  const fmt = (n) =>
    Number(n).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  const returnPct = (invest, value) => {
    if (!invest || invest == 0) return null;
    const pct = (((value - invest) / invest) * 100).toFixed(1);
    return pct;
  };

  const handleAddSIP = () => {
    if (!name || name === 'Select SIP name') return alert('Please select a SIP name.');
    if (!sip_value || Number(sip_value) === 0) return alert('Please enter a SIP valuation.');

    if (window.confirm(`Confirm to add SIP: ${name}?`)) {
      setSpinner(true);
      const url = `${process.env.REACT_APP_domain}/sjh-team-api/admin/add_sip.php`;
      let fData = new FormData();
      fData.append('sip_name',   name);
      fData.append('sip_value',  sip_value);
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
        .catch(() => { setSpinner(false); alert('Submission failed. Try Again...!'); });
    }
  };

  const avatarLetters = (str) =>
    str ? str.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase() : '?';

  const avatarColors = [
    { bg: '#E6F1FB', color: '#0C447C' },
    { bg: '#E1F5EE', color: '#085041' },
    { bg: '#FAEEDA', color: '#633806' },
    { bg: '#FBEAF0', color: '#72243E' },
    { bg: '#EEEDFE', color: '#3C3489' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">

      {/* ── Spinner ── */}
      {spinner && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white rounded-xl p-6 flex flex-col items-center gap-3 shadow-xl">
            <svg className="w-8 h-8 animate-spin text-blue-600" viewBox="0 0 100 101" fill="none">
              <path d="M100 50.59C100 78.2 77.6 100.6 50 100.6S0 78.2 0 50.59C0 22.98 22.39.59 50 .59s50 22.39 50 50Z" fill="#e5e7eb"/>
              <path d="M93.97 39.04c2.43-.64 3.9-3.13 3.04-5.49a50 50 0 0 0-51.28-33.5C20.29 2.5 2.5 24.5 2.5 50.6" stroke="#2563eb" strokeWidth="9" strokeLinecap="round"/>
            </svg>
            <p className="text-sm text-gray-500 font-medium">Submitting…</p>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto space-y-6">

        {/* ── Summary Cards ── */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total invested',  value: fmt(totalInvested), color: 'text-blue-700' },
            { label: 'Current value',   value: fmt(totalValue),    color: 'text-emerald-700' },
            { label: 'Total returns',   value: `${totalReturn >= 0 ? '+' : ''}${totalReturn}%`, color: totalReturn >= 0 ? 'text-emerald-700' : 'text-red-600' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-xs text-gray-500 mb-1">{s.label}</p>
              <p className={`text-lg font-medium ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* ── Add SIP Form ── */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-sm font-medium text-gray-800 mb-5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
            Add SIP entry
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">SIP name</label>
              <select
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-sm px-3 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition"
              >
                <option>Select SIP name</option>
                {data.map((item, i) => (
                  <option key={i}>{item.sip_name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Valuation (₹)</label>
              <input
                type="number"
                value={sip_value}
                onChange={(e) => setSipValue(e.target.value)}
                placeholder="0"
                className="w-full text-sm px-3 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>
          </div>

          <button
            onClick={handleAddSIP}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-150"
          >
            <FaPaperPlane className="text-xs" />
            Submit entry
          </button>
        </div>

        {/* ── SIP Table ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-800">SIP portfolio</h3>
            {data.length > 0 && (
              <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                {data.length} active
              </span>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">#</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Fund</th>
                    <th className="py-3 px-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wide">Amount</th>
                    <th className="py-3 px-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wide">Invested</th>
                    <th className="py-3 px-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wide">Value</th>
                    <th className="py-3 px-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wide">Return</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-gray-400 text-sm">
                        No SIP entries yet
                      </td>
                    </tr>
                  ) : (
                    data.map((sip, index) => {
                      const pct = returnPct(sip.sip_invest, sip.sip_value);
                      const av  = avatarColors[index % avatarColors.length];
                      return (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 text-xs text-gray-400">{String(index + 1).padStart(2, '0')}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2.5">
                              <span
                                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0"
                                style={{ background: av.bg, color: av.color }}
                              >
                                {avatarLetters(sip.sip_name)}
                              </span>
                              <span className="font-medium text-gray-800">{sip.sip_name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right text-gray-700">{fmt(sip.sip_amt)}</td>
                          <td className="py-3 px-4 text-right text-gray-700">{fmt(sip.sip_invest)}</td>
                          <td className="py-3 px-4 text-right font-medium text-gray-800">{fmt(sip.sip_value)}</td>
                          <td className="py-3 px-4 text-right">
                            {pct !== null && (
                              <span
                                className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${
                                  pct >= 0
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : 'bg-red-50 text-red-600'
                                }`}
                              >
                                {pct >= 0 ? '+' : ''}{pct}%
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
    </div>
  );
};

export default Sip;
