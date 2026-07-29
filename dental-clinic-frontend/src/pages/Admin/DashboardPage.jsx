import React, { useMemo } from 'react';
import '../Css/Dashboard.css';

// ---------------------------------------------------------------
// Icons (inline, single-stroke line style to match the login page)
// ---------------------------------------------------------------
const Icon = {
  patients: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  calendar: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="4" width="18" height="18" rx="3" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  ),
  revenue: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9.5 9.5c0-1.4 1.2-2 2.5-2s2.5.7 2.5 1.8-1 1.6-2.5 1.9-2.5.9-2.5 2S10.6 15 12 15s2.5-.6 2.5-1.9" />
    </svg>
  ),
  bills: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 2h9l3 3v17H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </svg>
  ),
  plus: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  userPlus: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M19 8v6M22 11h-6" />
    </svg>
  ),
  receipt: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 2h16v20l-3-2-3 2-3-2-3 2-3-2-1 2z" />
      <path d="M8 7h8M8 11h8M8 15h5" />
    </svg>
  ),
  reports: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 20V10M12 20V4M20 20v-7" />
    </svg>
  ),
};

// ---------------------------------------------------------------
// Placeholder data — wire these up to your API
// ---------------------------------------------------------------
const METRICS = [
  { label: 'Total patients today', value: '18', delta: '+3 vs yesterday', direction: 'up', icon: 'patients', tint: 'tint-mist' },
  { label: "Today's appointments", value: '12', delta: '4 remaining', direction: 'up', icon: 'calendar', tint: 'tint-sky' },
  { label: 'Revenue today', value: 'Rs. 84,500', delta: '+12% vs yesterday', direction: 'up', icon: 'revenue', tint: 'tint-sage' },
  { label: 'Pending bills', value: '6', delta: 'Rs. 32,000 outstanding', direction: 'down', icon: 'bills', tint: 'tint-amber' },
];

const QUICK_ACTIONS = [
  { label: 'Book appointment', icon: 'plus', primary: true },
  { label: 'Register patient', icon: 'userPlus' },
  { label: 'Generate bill', icon: 'receipt' },
  { label: 'View reports', icon: 'reports' },
];

const REVENUE_WEEK = [
  { day: 'Mon', value: 62000 },
  { day: 'Tue', value: 71500 },
  { day: 'Wed', value: 54000 },
  { day: 'Thu', value: 88000 },
  { day: 'Fri', value: 95500 },
  { day: 'Sat', value: 79000 },
  { day: 'Sun', value: 84500 },
];

const RECENT_APPOINTMENTS = [
  { time: '9:00', name: 'Amara Perera', treatment: 'Root canal · Dr. Silva', status: 'completed' },
  { time: '10:15', name: 'Nadun Fernando', treatment: 'Cleaning · Dr. Silva', status: 'completed' },
  { time: '11:30', name: 'Ishara Gunaratne', treatment: 'Consultation · Dr. Perera', status: 'confirmed' },
  { time: '1:00', name: 'Kavindu Jayasuriya', treatment: 'Whitening · Dr. Silva', status: 'confirmed' },
  { time: '2:30', name: 'Sanduni Wickrama', treatment: 'Filling · Dr. Perera', status: 'pending' },
  { time: '4:00', name: 'Tharindu Bandara', treatment: 'Extraction · Dr. Silva', status: 'pending' },
];

const APPOINTMENT_DAYS = [2, 5, 9, 12, 13, 18, 21, 24, 27, 29];

// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------
function useMiniCalendar() {
  return useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return { cells, todayDate: today.getDate(), monthLabel: today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) };
  }, []);
}

// ---------------------------------------------------------------
// Component
// ---------------------------------------------------------------
const DashboardPage = ({ userName = 'Dr. Silva' }) => {
  const today = new Date();
  const dateLabel = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const { cells, todayDate, monthLabel } = useMiniCalendar();

  const maxRevenue = Math.max(...REVENUE_WEEK.map((d) => d.value));
  const chartWidth = 460;
  const chartHeight = 160;
  const barGap = 14;
  const barWidth = (chartWidth - barGap * (REVENUE_WEEK.length - 1)) / REVENUE_WEEK.length;

  return (
    <div className="dash">
      <div className="dash-blob dash-blob-1" />
      <div className="dash-blob dash-blob-2" />

      <div className="dash-inner">
        {/* Header */}
        <div className="dash-header">
          <div>
            <div className="dash-greeting">Welcome back, {userName}</div>
            <div className="dash-date">{dateLabel}</div>
          </div>
          <div className="dash-avatar">
            {userName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
          </div>
        </div>

        {/* Metric cards */}
        <div className="metrics-grid">
          {METRICS.map((m) => {
            const IconCmp = Icon[m.icon];
            return (
              <div className="glass-card metric-card" key={m.label}>
                <div className={`metric-icon ${m.tint}`}>
                  <IconCmp />
                </div>
                <div className="metric-label">{m.label}</div>
                <div className="metric-value">{m.value}</div>
                <div className={`metric-delta ${m.direction}`}>{m.delta}</div>
              </div>
            );
          })}
        </div>

        {/* Quick actions */}
        <div className="quick-actions">
          {QUICK_ACTIONS.map((a) => {
            const IconCmp = Icon[a.icon];
            return (
              <button key={a.label} className={`action-btn ${a.primary ? 'primary' : ''}`}>
                <IconCmp />
                {a.label}
              </button>
            );
          })}
        </div>

        {/* Content grid */}
        <div className="content-grid">
          {/* Left column */}
          <div>
            {/* Revenue chart */}
            <div className="glass-card chart-card">
              <div className="card-head">
                <div>
                  <div className="card-title">Revenue this week</div>
                  <div className="card-subtitle">Daily totals, Monday to Sunday</div>
                </div>
                <span className="card-link">View reports</span>
              </div>
              <div className="chart-body">
                <svg className="chart-svg-wrap" viewBox={`0 0 ${chartWidth} ${chartHeight + 26}`} preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#BDDBD1" />
                      <stop offset="1" stopColor="#C7E7EC" />
                    </linearGradient>
                  </defs>
                  {REVENUE_WEEK.map((d, i) => {
                    const h = (d.value / maxRevenue) * chartHeight;
                    const x = i * (barWidth + barGap);
                    const y = chartHeight - h;
                    const isMax = d.value === maxRevenue;
                    return (
                      <g key={d.day}>
                        <rect
                          x={x}
                          y={y}
                          width={barWidth}
                          height={h}
                          rx="7"
                          fill={isMax ? '#2F3E3C' : 'url(#barFill)'}
                        />
                        <text x={x + barWidth / 2} y={chartHeight + 18} textAnchor="middle" className="chart-axis-label">
                          {d.day}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Recent appointments */}
            <div className="glass-card">
              <div className="card-head">
                <div>
                  <div className="card-title">Recent appointments</div>
                  <div className="card-subtitle">Today, {dateLabel}</div>
                </div>
                <span className="card-link">View all</span>
              </div>
              <div className="appt-list">
                {RECENT_APPOINTMENTS.map((a) => (
                  <div className="appt-row" key={a.time + a.name}>
                    <div className="appt-time">{a.time}</div>
                    <div className="appt-initial">
                      {a.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                    </div>
                    <div className="appt-info">
                      <div className="appt-name">{a.name}</div>
                      <div className="appt-treatment">{a.treatment}</div>
                    </div>
                    <span className={`status-badge ${a.status}`}>
                      {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — mini calendar */}
          <div className="glass-card calendar-card">
            <div className="card-head">
              <div>
                <div className="card-title">Calendar</div>
                <div className="card-subtitle">{monthLabel}</div>
              </div>
            </div>
            <div className="calendar-body">
              <div className="calendar-grid">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                  <div className="calendar-dow" key={i}>{d}</div>
                ))}
                {cells.map((day, i) => {
                  if (!day) return <div key={i} />;
                  const isToday = day === todayDate;
                  const hasAppt = APPOINTMENT_DAYS.includes(day);
                  return (
                    <div
                      key={i}
                      className={`calendar-day ${isToday ? 'today' : ''} ${hasAppt ? 'has-appt' : ''}`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="schedule-mini">
              <div className="schedule-mini-title">Next up today</div>
              {RECENT_APPOINTMENTS.filter((a) => a.status === 'confirmed').slice(0, 3).map((a) => (
                <div className="schedule-mini-row" key={a.time}>
                  <span className="schedule-dot" />
                  <span className="schedule-mini-time">{a.time}</span>
                  <span>{a.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
