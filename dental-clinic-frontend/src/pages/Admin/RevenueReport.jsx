import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/RevenueReport.css';

// ---------------------------------------------------------------
// Icons
// ---------------------------------------------------------------
const Icon = {
  ArrowLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>),
  DollarSign: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v12M15 9a2 2 0 0 0-2-2H9a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H9a2 2 0 0 1-2-2" /></svg>),
  Calendar: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="m9 16 2 2 4-4" /></svg>),
  TrendingUp: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M23 6l-6.5 6.5-5-5L2 17" /><path d="M17 6h6v6" /></svg>),
  TrendingDown: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M23 18l-6.5-6.5-5 5L2 7" /><path d="M17 18h6v-6" /></svg>),
  Download: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v12m0 0-4-4m4 4 4-4M4 19h16" /></svg>),
  Printer: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M6 14h12v8H6z" /></svg>),
  FileText: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>),
  Users: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>),
  Stethoscope: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4.5 9.5a2.5 2.5 0 0 1 5 0v2a2.5 2.5 0 0 1-5 0v-2zM19.5 9.5a2.5 2.5 0 0 1 5 0v2a2.5 2.5 0 0 1-5 0v-2zM14 12a2 2 0 0 1 4 0v3a2 2 0 0 1-4 0v-3z" /></svg>),
  ChevronLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m15 18-6-6 6-6" /></svg>),
  ChevronRight: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m9 18 6-6-6-6" /></svg>),
  PieChart: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" /></svg>),
  BarChart: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 20V10M18 20V4M6 20v-4" /></svg>),
};

// ---------------------------------------------------------------
// Placeholder Data (Replace with API calls)
// ---------------------------------------------------------------
const generateRevenueData = () => {
  const data = [];
  const startDate = new Date('2026-07-01');
  const endDate = new Date('2026-07-31');
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const day = currentDate.getDate();
    const weekday = currentDate.getDay();
    // Higher revenue on weekdays, lower on weekends
    const baseRevenue = weekday === 0 || weekday === 6 ? 20000 + Math.random() * 10000 : 35000 + Math.random() * 25000;
    data.push({
      date: currentDate.toISOString().split('T')[0],
      day: currentDate.toLocaleDateString('en-US', { weekday: 'short' }),
      revenue: Math.round(baseRevenue),
      appointments: Math.floor((baseRevenue / 3000) + Math.random() * 5),
      patients: Math.floor((baseRevenue / 4000) + Math.random() * 3),
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return data;
};

const REVENUE_DATA = generateRevenueData();

const TREATMENT_REVENUE = [
  { treatment: 'Root Canal', revenue: 185000, count: 10 },
  { treatment: 'Dental Cleaning', revenue: 127500, count: 15 },
  { treatment: 'Teeth Whitening', revenue: 105000, count: 7 },
  { treatment: 'Filling', revenue: 96000, count: 8 },
  { treatment: 'Extraction', revenue: 58500, count: 13 },
  { treatment: 'Consultation', revenue: 45000, count: 18 },
  { treatment: 'Crown Placement', revenue: 72000, count: 4 },
  { treatment: 'Orthodontics', revenue: 92000, count: 3 },
];

const DENTIST_REVENUE = [
  { dentist: 'Dr. Silva', revenue: 345000, appointments: 45 },
  { dentist: 'Dr. Perera', revenue: 289000, appointments: 38 },
  { dentist: 'Dr. Fernando', revenue: 147000, appointments: 22 },
];

const MONTHLY_COMPARISON = [
  { month: 'Jan', revenue: 875000 },
  { month: 'Feb', revenue: 920000 },
  { month: 'Mar', revenue: 890000 },
  { month: 'Apr', revenue: 945000 },
  { month: 'May', revenue: 1020000 },
  { month: 'Jun', revenue: 1150000 },
  { month: 'Jul', revenue: 1245000 },
  { month: 'Aug', revenue: 0 },
  { month: 'Sep', revenue: 0 },
  { month: 'Oct', revenue: 0 },
  { month: 'Nov', revenue: 0 },
  { month: 'Dec', revenue: 0 },
];

// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------
function formatCurrency(amount) {
  return `Rs. ${amount.toLocaleString()}`;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
}

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

// ---------------------------------------------------------------
// Chart Components (Simplified SVG Charts)
// ---------------------------------------------------------------
const LineChart = ({ data, width = 600, height = 200 }) => {
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  const minRevenue = Math.min(...data.map(d => d.revenue));
  const range = maxRevenue - minRevenue || 1;
  const padding = 20;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * chartWidth;
    const y = padding + chartHeight - ((d.revenue - minRevenue) / range) * chartHeight;
    return `${x},${y}`;
  }).join(' ');

  // Only show some labels
  const labelInterval = Math.max(1, Math.floor(data.length / 8));

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="rr-chart-svg">
      <defs>
        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#BDDBD1" stopOpacity="0.4" />
          <stop offset="1" stopColor="#BDDBD1" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Area fill */}
      <polygon
        points={`${padding + chartWidth},${padding + chartHeight} ${points} ${padding},${padding + chartHeight}`}
        fill="url(#areaGradient)"
      />

      {/* Line */}
      <polyline
        points={points}
        fill="none"
        stroke="#2F3E3C"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Dots */}
      {data.map((d, i) => {
        const x = padding + (i / (data.length - 1)) * chartWidth;
        const y = padding + chartHeight - ((d.revenue - minRevenue) / range) * chartHeight;
        const showLabel = i % labelInterval === 0 || i === data.length - 1;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="4" fill="#2F3E3C" />
            {showLabel && (
              <text x={x} y={height - 4} textAnchor="middle" fontSize="9" fill="#8a9b97">
                {formatDate(d.date)}
              </text>
            )}
          </g>
        );
      })}

      {/* Y-axis labels */}
      <text x="4" y="16" fontSize="9" fill="#8a9b97">{formatCurrency(maxRevenue)}</text>
      <text x="4" y={height - 4} fontSize="9" fill="#8a9b97">{formatCurrency(minRevenue)}</text>
    </svg>
  );
};

const BarChart = ({ data, width = 400, height = 200, labelKey, valueKey, colors = null }) => {
  const maxValue = Math.max(...data.map(d => d[valueKey]));
  const padding = { top: 10, bottom: 30, left: 10, right: 10 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const barWidth = Math.min(40, chartWidth / data.length * 0.6);
  const gap = (chartWidth - barWidth * data.length) / (data.length + 1);

  const defaultColors = ['#BDDBD1', '#C7E7EC', '#E7E9E3', '#2F3E3C', '#C4954C', '#A24438', '#4A7A64', '#3A7A8A'];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="rr-chart-svg">
      {data.map((d, i) => {
        const x = padding.left + gap + i * (barWidth + gap);
        const barHeight = (d[valueKey] / maxValue) * chartHeight;
        const y = padding.top + chartHeight - barHeight;
        const color = colors ? colors[i % colors.length] : defaultColors[i % defaultColors.length];
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              rx="4"
              fill={color}
            />
            <text
              x={x + barWidth / 2}
              y={height - 4}
              textAnchor="middle"
              fontSize="9"
              fill="#8a9b97"
            >
              {d[labelKey]}
            </text>
            <text
              x={x + barWidth / 2}
              y={y - 4}
              textAnchor="middle"
              fontSize="9"
              fill="#2F3E3C"
              fontWeight="600"
            >
              {formatCurrency(d[valueKey])}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const PieChart = ({ data, width = 240, height = 240, labelKey, valueKey }) => {
  const total = data.reduce((sum, d) => sum + d[valueKey], 0);
  const colors = ['#2F3E3C', '#BDDBD1', '#C7E7EC', '#E7E9E3', '#C4954C', '#A24438', '#4A7A64', '#3A7A8A'];
  let startAngle = -Math.PI / 2;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 20;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="rr-chart-svg">
      {data.map((d, i) => {
        const sliceAngle = (d[valueKey] / total) * 2 * Math.PI;
        const endAngle = startAngle + sliceAngle;
        const x1 = centerX + radius * Math.cos(startAngle);
        const y1 = centerY + radius * Math.sin(startAngle);
        const x2 = centerX + radius * Math.cos(endAngle);
        const y2 = centerY + radius * Math.sin(endAngle);
        const largeArc = sliceAngle > Math.PI ? 1 : 0;

        const path = `
          M ${centerX} ${centerY}
          L ${x1} ${y1}
          A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
          Z
        `;

        const midAngle = startAngle + sliceAngle / 2;
        const labelX = centerX + (radius * 0.6) * Math.cos(midAngle);
        const labelY = centerY + (radius * 0.6) * Math.sin(midAngle);
        const percent = ((d[valueKey] / total) * 100).toFixed(1);

        startAngle = endAngle;

        return (
          <g key={i}>
            <path d={path} fill={colors[i % colors.length]} stroke="#fff" strokeWidth="2" />
            {percent > 5 && (
              <text x={labelX} y={labelY} textAnchor="middle" fontSize="9" fill="#fff" fontWeight="600">
                {percent}%
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

// ---------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------
const RevenueReport = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState({
    from: '2026-07-01',
    to: '2026-07-31'
  });
  const [activeView, setActiveView] = useState('daily'); // daily, monthly, yearly
  const [exporting, setExporting] = useState(false);

  // Filter data based on date range
  const filteredData = useMemo(() => {
    return REVENUE_DATA.filter(d =>
      d.date >= dateRange.from && d.date <= dateRange.to
    );
  }, [dateRange]);

  // Calculate summary metrics
  const metrics = useMemo(() => {
    const totalRevenue = filteredData.reduce((sum, d) => sum + d.revenue, 0);
    const totalAppointments = filteredData.reduce((sum, d) => sum + d.appointments, 0);
    const totalPatients = filteredData.reduce((sum, d) => sum + d.patients, 0);
    const days = filteredData.length || 1;

    const avgPerDay = totalRevenue / days;
    const avgPerAppointment = totalAppointments > 0 ? totalRevenue / totalAppointments : 0;

    // Calculate growth (compare last 7 days to previous 7 days)
    const sorted = [...filteredData].sort((a, b) => a.date.localeCompare(b.date));
    const recent = sorted.slice(-7);
    const previous = sorted.slice(-14, -7);
    const recentAvg = recent.reduce((sum, d) => sum + d.revenue, 0) / (recent.length || 1);
    const prevAvg = previous.reduce((sum, d) => sum + d.revenue, 0) / (previous.length || 1);
    const growth = prevAvg > 0 ? ((recentAvg - prevAvg) / prevAvg) * 100 : 0;

    return {
      totalRevenue,
      avgPerDay,
      avgPerAppointment,
      totalAppointments,
      totalPatients,
      growth,
    };
  }, [filteredData]);

  // Export handlers
  const handleExportPDF = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      alert('PDF exported successfully!');
    }, 800);
  };

  const handleExportExcel = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      alert('Excel exported successfully!');
    }, 800);
  };

  const handlePrint = () => {
    window.print();
  };

  // Handle date change
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({ ...prev, [name]: value }));
  };

  // Quick date range presets
  const setDatePreset = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    setDateRange({
      from: start.toISOString().split('T')[0],
      to: end.toISOString().split('T')[0]
    });
  };

  return (
    <div className="rr-page">
      <div className="rr-blob rr-blob-1" />
      <div className="rr-blob rr-blob-2" />

      <div className="rr-inner">
        {/* Header */}
        <div className="rr-header">
          <button className="rr-back-btn" onClick={() => navigate('/admin/reports')}>
            <Icon.ArrowLeft /> Back to Reports
          </button>
          <div className="rr-title-area">
            <div className="rr-title-row">
              <div>
                <h1 className="rr-title">Revenue Report</h1>
                <p className="rr-subtitle">Detailed revenue analytics and trends</p>
              </div>
              <div className="rr-actions">
                <button className="rr-btn secondary" onClick={handlePrint}>
                  <Icon.Printer /> Print
                </button>
                <button className="rr-btn secondary" onClick={handleExportExcel} disabled={exporting}>
                  <Icon.FileText /> Excel
                </button>
                <button className="rr-btn primary" onClick={handleExportPDF} disabled={exporting}>
                  <Icon.Download /> {exporting ? 'Exporting...' : 'Export PDF'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Date Range Selector */}
        <div className="glass-card rr-date-range">
          <div className="rr-date-presets">
            <button className="rr-preset-btn" onClick={() => setDatePreset(7)}>Last 7 Days</button>
            <button className="rr-preset-btn" onClick={() => setDatePreset(30)}>Last 30 Days</button>
            <button className="rr-preset-btn" onClick={() => setDatePreset(90)}>Last 90 Days</button>
            <button className="rr-preset-btn" onClick={() => setDatePreset(365)}>Last Year</button>
          </div>
          <div className="rr-date-inputs">
            <div className="rr-date-field">
              <label className="rr-date-label">From</label>
              <input
                type="date"
                name="from"
                className="rr-date-input"
                value={dateRange.from}
                onChange={handleDateChange}
              />
            </div>
            <div className="rr-date-field">
              <label className="rr-date-label">To</label>
              <input
                type="date"
                name="to"
                className="rr-date-input"
                value={dateRange.to}
                onChange={handleDateChange}
              />
            </div>
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="rr-metrics-grid">
          <div className="glass-card rr-metric-card">
            <div className="rr-metric-header">
              <span className="rr-metric-label">Total Revenue</span>
              <div className="rr-metric-icon tint-sky"><Icon.DollarSign /></div>
            </div>
            <div className="rr-metric-value">{formatCurrency(metrics.totalRevenue)}</div>
            <div className="rr-metric-sub">
              {metrics.growth > 0 ? (
                <span className="rr-growth positive"><Icon.TrendingUp /> +{metrics.growth.toFixed(1)}% growth</span>
              ) : (
                <span className="rr-growth negative"><Icon.TrendingDown /> {metrics.growth.toFixed(1)}% change</span>
              )}
            </div>
          </div>

          <div className="glass-card rr-metric-card">
            <div className="rr-metric-header">
              <span className="rr-metric-label">Average Revenue Per Day</span>
              <div className="rr-metric-icon tint-mist"><Icon.Calendar /></div>
            </div>
            <div className="rr-metric-value">{formatCurrency(metrics.avgPerDay)}</div>
            <div className="rr-metric-sub">{filteredData.length} days in range</div>
          </div>

          <div className="glass-card rr-metric-card">
            <div className="rr-metric-header">
              <span className="rr-metric-label">Avg Per Appointment</span>
              <div className="rr-metric-icon tint-sage"><Icon.Users /></div>
            </div>
            <div className="rr-metric-value">{formatCurrency(metrics.avgPerAppointment)}</div>
            <div className="rr-metric-sub">{metrics.totalAppointments} total appointments</div>
          </div>

          <div className="glass-card rr-metric-card">
            <div className="rr-metric-header">
              <span className="rr-metric-label">Total Patients</span>
              <div className="rr-metric-icon tint-amber"><Icon.Users /></div>
            </div>
            <div className="rr-metric-value">{metrics.totalPatients}</div>
            <div className="rr-metric-sub">Unique patients served</div>
          </div>
        </div>

        {/* Chart: Revenue Trend */}
        <div className="glass-card rr-chart-card">
          <div className="rr-chart-header">
            <div>
              <h3 className="rr-chart-title">Revenue Trend</h3>
              <p className="rr-chart-desc">Daily revenue over the selected period</p>
            </div>
            <div className="rr-view-toggle">
              <button
                className={`rr-view-btn ${activeView === 'daily' ? 'active' : ''}`}
                onClick={() => setActiveView('daily')}
              >
                Daily
              </button>
              <button
                className={`rr-view-btn ${activeView === 'monthly' ? 'active' : ''}`}
                onClick={() => setActiveView('monthly')}
              >
                Monthly
              </button>
            </div>
          </div>
          <div className="rr-chart-body">
            <LineChart data={filteredData} width={700} height={220} />
          </div>
        </div>

        {/* Charts Grid */}
        <div className="rr-charts-grid">
          {/* Revenue by Treatment */}
          <div className="glass-card rr-chart-card">
            <div className="rr-chart-header">
              <div>
                <h3 className="rr-chart-title">Revenue by Treatment</h3>
                <p className="rr-chart-desc">Breakdown by treatment type</p>
              </div>
            </div>
            <div className="rr-chart-body rr-pie-container">
              <PieChart
                data={TREATMENT_REVENUE}
                width={300}
                height={280}
                labelKey="treatment"
                valueKey="revenue"
              />
            </div>
            <div className="rr-chart-legend">
              {TREATMENT_REVENUE.map((item, i) => (
                <div key={i} className="rr-legend-item">
                  <span className="rr-legend-color" style={{ background: ['#2F3E3C', '#BDDBD1', '#C7E7EC', '#E7E9E3', '#C4954C', '#A24438', '#4A7A64', '#3A7A8A'][i] }} />
                  <span className="rr-legend-label">{item.treatment}</span>
                  <span className="rr-legend-value">{formatCurrency(item.revenue)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue by Dentist */}
          <div className="glass-card rr-chart-card">
            <div className="rr-chart-header">
              <div>
                <h3 className="rr-chart-title">Revenue by Dentist</h3>
                <p className="rr-chart-desc">Performance by dentist</p>
              </div>
            </div>
            <div className="rr-chart-body">
              <BarChart
                data={DENTIST_REVENUE}
                width={380}
                height={220}
                labelKey="dentist"
                valueKey="revenue"
                colors={['#2F3E3C', '#BDDBD1', '#C7E7EC']}
              />
            </div>
            <div className="rr-dentist-stats">
              {DENTIST_REVENUE.map((d, i) => (
                <div key={i} className="rr-dentist-stat">
                  <span className="rr-dentist-name">{d.dentist}</span>
                  <span className="rr-dentist-appointments">{d.appointments} appointments</span>
                  <span className="rr-dentist-revenue">{formatCurrency(d.revenue)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Comparison */}
        <div className="glass-card rr-chart-card">
          <div className="rr-chart-header">
            <div>
              <h3 className="rr-chart-title">Monthly Revenue Comparison</h3>
              <p className="rr-chart-desc">Revenue trends by month</p>
            </div>
          </div>
          <div className="rr-chart-body">
            <BarChart
              data={MONTHLY_COMPARISON.filter(m => m.revenue > 0)}
              width={700}
              height={200}
              labelKey="month"
              valueKey="revenue"
            />
          </div>
        </div>

        {/* Daily Breakdown Table */}
        <div className="glass-card rr-table-card">
          <div className="rr-table-header">
            <div>
              <h3 className="rr-table-title">Daily Revenue Breakdown</h3>
              <p className="rr-table-desc">Detailed daily revenue and appointment data</p>
            </div>
          </div>
          <div className="rr-table-wrap">
            <table className="rr-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Day</th>
                  <th>Revenue</th>
                  <th>Appointments</th>
                  <th>Patients</th>
                  <th>Avg per Appointment</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.slice().reverse().map((d, i) => (
                  <tr key={i}>
                    <td>{formatDate(d.date)}</td>
                    <td>{d.day}</td>
                    <td className="rr-amount">{formatCurrency(d.revenue)}</td>
                    <td>{d.appointments}</td>
                    <td>{d.patients}</td>
                    <td className="rr-amount">{formatCurrency(d.appointments > 0 ? d.revenue / d.appointments : 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueReport;