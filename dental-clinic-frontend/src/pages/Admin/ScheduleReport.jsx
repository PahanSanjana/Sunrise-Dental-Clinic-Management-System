import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScheduleReport.css';

// ---------------------------------------------------------------
// Icons
// ---------------------------------------------------------------
const Icon = {
    ArrowLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>),
    Calendar: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="m9 16 2 2 4-4" /></svg>),
    Clock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>),
    Users: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>),
    User: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
    Stethoscope: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4.5 9.5a2.5 2.5 0 0 1 5 0v2a2.5 2.5 0 0 1-5 0v-2zM19.5 9.5a2.5 2.5 0 0 1 5 0v2a2.5 2.5 0 0 1-5 0v-2zM14 12a2 2 0 0 1 4 0v3a2 2 0 0 1-4 0v-3z" /></svg>),
    BarChart: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 20V10M18 20V4M6 20v-4" /></svg>),
    TrendingUp: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M23 6l-6.5 6.5-5-5L2 17" /><path d="M17 6h6v6" /></svg>),
    TrendingDown: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M23 18l-6.5-6.5-5 5L2 7" /><path d="M17 18h6v-6" /></svg>),
    Download: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3v12m0 0-4-4m4 4 4-4M4 19h16" /></svg>),
    Printer: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M6 14h12v8H6z" /></svg>),
    FileText: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>),
    XCircle: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>),
    AlertCircle: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>),
    Check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5" /></svg>),
    ChevronLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m15 18-6-6 6-6" /></svg>),
    ChevronRight: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m9 18 6-6-6-6" /></svg>),
};

// ---------------------------------------------------------------
// Placeholder Data (Replace with API calls)
// ---------------------------------------------------------------
const generateScheduleData = () => {
    const data = [];
    const startDate = new Date('2026-07-01');
    const endDate = new Date('2026-07-31');
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        const day = currentDate.getDate();
        const weekday = currentDate.getDay();
        const isWeekend = weekday === 0 || weekday === 6;

        // Simulate realistic appointment data
        const totalSlots = isWeekend ? 8 : 16;
        const bookedSlots = isWeekend ?
            4 + Math.floor(Math.random() * 4) :
            8 + Math.floor(Math.random() * 8);
        const noShows = Math.floor(Math.random() * Math.min(3, bookedSlots * 0.15));
        const cancellations = Math.floor(Math.random() * Math.min(2, bookedSlots * 0.1));
        const completed = bookedSlots - noShows - cancellations;
        const utilization = (bookedSlots / totalSlots) * 100;

        data.push({
            date: currentDate.toISOString().split('T')[0],
            day: currentDate.toLocaleDateString('en-US', { weekday: 'short' }),
            totalSlots,
            bookedSlots,
            completed,
            noShows,
            cancellations,
            utilization: Math.round(utilization),
            avgDuration: 30 + Math.floor(Math.random() * 15),
            patients: Math.floor(bookedSlots * (0.7 + Math.random() * 0.3)),
            newPatients: Math.floor(Math.random() * 3),
        });
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return data;
};

const SCHEDULE_DATA = generateScheduleData();

const DENTIST_UTILIZATION = [
    { dentist: 'Dr. Silva', totalSlots: 160, bookedSlots: 142, utilization: 89, patients: 128 },
    { dentist: 'Dr. Perera', totalSlots: 160, bookedSlots: 135, utilization: 84, patients: 118 },
    { dentist: 'Dr. Fernando', totalSlots: 120, bookedSlots: 95, utilization: 79, patients: 82 },
];

const CANCELLATION_REASONS = [
    { reason: 'Patient Reschedule', count: 18, percentage: 35 },
    { reason: 'Emergency', count: 12, percentage: 23 },
    { reason: 'Dentist Unavailable', count: 10, percentage: 19 },
    { reason: 'Weather', count: 6, percentage: 12 },
    { reason: 'Other', count: 6, percentage: 11 },
];

const NO_SHOW_TRENDS = [
    { month: 'Jan', rate: 8.2 },
    { month: 'Feb', rate: 7.5 },
    { month: 'Mar', rate: 9.1 },
    { month: 'Apr', rate: 6.8 },
    { month: 'May', rate: 7.9 },
    { month: 'Jun', rate: 6.2 },
    { month: 'Jul', rate: 5.2 },
];

// ---------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------
function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
}

function formatCurrency(amount) {
    return `Rs. ${amount.toLocaleString()}`;
}

function getInitials(name) {
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

// ---------------------------------------------------------------
// Chart Components
// ---------------------------------------------------------------
const BarChart = ({ data, width = 600, height = 200, labelKey, valueKey, colors = null, maxValue = null }) => {
    const maxVal = maxValue || Math.max(...data.map(d => d[valueKey]));
    const padding = { top: 10, bottom: 30, left: 10, right: 10 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    const barWidth = Math.min(50, chartWidth / data.length * 0.6);
    const gap = (chartWidth - barWidth * data.length) / (data.length + 1);

    const defaultColors = ['#2F3E3C', '#BDDBD1', '#C7E7EC', '#E7E9E3', '#C4954C', '#A24438', '#4A7A64', '#3A7A8A'];

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="sr-chart-svg">
            {data.map((d, i) => {
                const x = padding.left + gap + i * (barWidth + gap);
                const barHeight = (d[valueKey] / maxVal) * chartHeight;
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
                            {typeof d[valueKey] === 'number' && d[valueKey] % 1 !== 0 ? d[valueKey].toFixed(1) + '%' : d[valueKey]}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};

const LineChart = ({ data, width = 600, height = 200, labelKey, valueKey }) => {
    const maxVal = Math.max(...data.map(d => d[valueKey]));
    const minVal = Math.min(...data.map(d => d[valueKey]));
    const range = maxVal - minVal || 1;
    const padding = 20;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const points = data.map((d, i) => {
        const x = padding + (i / (data.length - 1)) * chartWidth;
        const y = padding + chartHeight - ((d[valueKey] - minVal) / range) * chartHeight;
        return `${x},${y}`;
    }).join(' ');

    const labelInterval = Math.max(1, Math.floor(data.length / 6));

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="sr-chart-svg">
            <defs>
                <linearGradient id="srAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#BDDBD1" stopOpacity="0.4" />
                    <stop offset="1" stopColor="#BDDBD1" stopOpacity="0.05" />
                </linearGradient>
            </defs>

            <polygon
                points={`${padding + chartWidth},${padding + chartHeight} ${points} ${padding},${padding + chartHeight}`}
                fill="url(#srAreaGradient)"
            />

            <polyline
                points={points}
                fill="none"
                stroke="#2F3E3C"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {data.map((d, i) => {
                const x = padding + (i / (data.length - 1)) * chartWidth;
                const y = padding + chartHeight - ((d[valueKey] - minVal) / range) * chartHeight;
                const showLabel = i % labelInterval === 0 || i === data.length - 1;
                return (
                    <g key={i}>
                        <circle cx={x} cy={y} r="4" fill="#2F3E3C" />
                        {showLabel && (
                            <text x={x} y={height - 4} textAnchor="middle" fontSize="9" fill="#8a9b97">
                                {d[labelKey]}
                            </text>
                        )}
                    </g>
                );
            })}

            <text x="4" y="16" fontSize="9" fill="#8a9b97">{maxVal.toFixed(1)}%</text>
            <text x="4" y={height - 4} fontSize="9" fill="#8a9b97">{minVal.toFixed(1)}%</text>
        </svg>
    );
};

// ---------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------
const ScheduleReport = () => {
    const navigate = useNavigate();
    const [dateRange, setDateRange] = useState({
        from: '2026-07-01',
        to: '2026-07-31'
    });
    const [exporting, setExporting] = useState(false);

    // Filter data based on date range
    const filteredData = useMemo(() => {
        return SCHEDULE_DATA.filter(d =>
            d.date >= dateRange.from && d.date <= dateRange.to
        );
    }, [dateRange]);

    // Calculate metrics
    const metrics = useMemo(() => {
        const totalAppointments = filteredData.reduce((sum, d) => sum + d.bookedSlots, 0);
        const totalSlots = filteredData.reduce((sum, d) => sum + d.totalSlots, 0);
        const completed = filteredData.reduce((sum, d) => sum + d.completed, 0);
        const noShows = filteredData.reduce((sum, d) => sum + d.noShows, 0);
        const cancellations = filteredData.reduce((sum, d) => sum + d.cancellations, 0);
        const totalDuration = filteredData.reduce((sum, d) => sum + (d.bookedSlots * d.avgDuration), 0);

        const utilizationRate = totalSlots > 0 ? (totalAppointments / totalSlots) * 100 : 0;
        const noShowRate = totalAppointments > 0 ? (noShows / totalAppointments) * 100 : 0;
        const cancellationRate = totalAppointments > 0 ? (cancellations / totalAppointments) * 100 : 0;
        const avgDuration = totalAppointments > 0 ? totalDuration / totalAppointments : 0;

        return {
            totalAppointments,
            utilizationRate,
            noShowRate,
            cancellationRate,
            avgDuration,
            completed,
            noShows,
            cancellations,
        };
    }, [filteredData]);

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

    return (
        <div className="sr-page">
            <div className="sr-blob sr-blob-1" />
            <div className="sr-blob sr-blob-2" />

            <div className="sr-inner">
                {/* Header */}
                <div className="sr-header">
                    <button className="sr-back-btn" onClick={() => navigate('/admin/reports')}>
                        <Icon.ArrowLeft /> Back to Reports
                    </button>
                    <div className="sr-title-area">
                        <div className="sr-title-row">
                            <div>
                                <h1 className="sr-title">Schedule Report</h1>
                                <p className="sr-subtitle">Appointment utilization and operational efficiency analysis</p>
                            </div>
                            <div className="sr-actions">
                                <button className="sr-btn secondary" onClick={handlePrint}>
                                    <Icon.Printer /> Print
                                </button>
                                <button className="sr-btn secondary" onClick={handleExportExcel} disabled={exporting}>
                                    <Icon.FileText /> Excel
                                </button>
                                <button className="sr-btn primary" onClick={handleExportPDF} disabled={exporting}>
                                    <Icon.Download /> {exporting ? 'Exporting...' : 'Export PDF'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Date Range Selector */}
                <div className="glass-card sr-date-range">
                    <div className="sr-date-presets">
                        <button className="sr-preset-btn" onClick={() => setDatePreset(7)}>Last 7 Days</button>
                        <button className="sr-preset-btn" onClick={() => setDatePreset(30)}>Last 30 Days</button>
                        <button className="sr-preset-btn" onClick={() => setDatePreset(90)}>Last 90 Days</button>
                    </div>
                    <div className="sr-date-inputs">
                        <div className="sr-date-field">
                            <label className="sr-date-label">From</label>
                            <input
                                type="date"
                                name="from"
                                className="sr-date-input"
                                value={dateRange.from}
                                onChange={handleDateChange}
                            />
                        </div>
                        <div className="sr-date-field">
                            <label className="sr-date-label">To</label>
                            <input
                                type="date"
                                name="to"
                                className="sr-date-input"
                                value={dateRange.to}
                                onChange={handleDateChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Summary Metrics */}
                <div className="sr-metrics-grid">
                    <div className="glass-card sr-metric-card">
                        <div className="sr-metric-header">
                            <span className="sr-metric-label">Total Appointments</span>
                            <div className="sr-metric-icon tint-sky"><Icon.Calendar /></div>
                        </div>
                        <div className="sr-metric-value">{metrics.totalAppointments}</div>
                        <div className="sr-metric-sub">{filteredData.length} days in range</div>
                    </div>

                    <div className="glass-card sr-metric-card">
                        <div className="sr-metric-header">
                            <span className="sr-metric-label">Utilization Rate</span>
                            <div className="sr-metric-icon tint-mist"><Icon.BarChart /></div>
                        </div>
                        <div className="sr-metric-value">{metrics.utilizationRate.toFixed(1)}%</div>
                        <div className="sr-metric-sub">of total available slots</div>
                    </div>

                    <div className="glass-card sr-metric-card">
                        <div className="sr-metric-header">
                            <span className="sr-metric-label">No-Show Rate</span>
                            <div className="sr-metric-icon tint-amber"><Icon.XCircle /></div>
                        </div>
                        <div className="sr-metric-value" style={{ color: metrics.noShowRate > 7 ? '#A24438' : '#4A7A64' }}>
                            {metrics.noShowRate.toFixed(1)}%
                        </div>
                        <div className="sr-metric-sub">{metrics.noShows} no-shows</div>
                    </div>

                    <div className="glass-card sr-metric-card">
                        <div className="sr-metric-header">
                            <span className="sr-metric-label">Avg Duration</span>
                            <div className="sr-metric-icon tint-sage"><Icon.Clock /></div>
                        </div>
                        <div className="sr-metric-value">{Math.round(metrics.avgDuration)} min</div>
                        <div className="sr-metric-sub">{metrics.cancellations} cancellations</div>
                    </div>
                </div>

                {/* Charts Grid */}
                <div className="sr-charts-grid">
                    {/* Appointment Volume */}
                    <div className="glass-card sr-chart-card">
                        <div className="sr-chart-header">
                            <div>
                                <h3 className="sr-chart-title">Appointment Volume</h3>
                                <p className="sr-chart-desc">Daily appointments over the selected period</p>
                            </div>
                        </div>
                        <div className="sr-chart-body">
                            <BarChart
                                data={filteredData.slice(0, 20)}
                                width={500}
                                height={200}
                                labelKey="day"
                                valueKey="bookedSlots"
                                colors={['#2F3E3C', '#BDDBD1', '#C7E7EC', '#E7E9E3', '#C4954C']}
                            />
                        </div>
                    </div>

                    {/* Dentist Utilization */}
                    <div className="glass-card sr-chart-card">
                        <div className="sr-chart-header">
                            <div>
                                <h3 className="sr-chart-title">Dentist Utilization</h3>
                                <p className="sr-chart-desc">Workload distribution by dentist</p>
                            </div>
                        </div>
                        <div className="sr-chart-body">
                            <BarChart
                                data={DENTIST_UTILIZATION}
                                width={500}
                                height={200}
                                labelKey="dentist"
                                valueKey="utilization"
                                maxValue={100}
                            />
                        </div>
                        <div className="sr-dentist-stats">
                            {DENTIST_UTILIZATION.map((d, i) => (
                                <div key={i} className="sr-dentist-stat">
                                    <span className="sr-dentist-name">{d.dentist}</span>
                                    <span className="sr-dentist-detail">{d.bookedSlots} of {d.totalSlots} slots</span>
                                    <span className="sr-dentist-patients">{d.patients} patients</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* No-Show Trends */}
                <div className="glass-card sr-chart-card">
                    <div className="sr-chart-header">
                        <div>
                            <h3 className="sr-chart-title">No-Show Trends</h3>
                            <p className="sr-chart-desc">Monthly no-show rate trends</p>
                        </div>
                    </div>
                    <div className="sr-chart-body">
                        <LineChart
                            data={NO_SHOW_TRENDS}
                            width={700}
                            height={200}
                            labelKey="month"
                            valueKey="rate"
                        />
                    </div>
                    <div className="sr-trend-summary">
                        <span className="sr-trend-label">Average No-Show Rate:</span>
                        <span className="sr-trend-value">{(NO_SHOW_TRENDS.reduce((sum, d) => sum + d.rate, 0) / NO_SHOW_TRENDS.length).toFixed(1)}%</span>
                        <span className={`sr-trend-change ${NO_SHOW_TRENDS[NO_SHOW_TRENDS.length - 1].rate < NO_SHOW_TRENDS[0].rate ? 'positive' : 'negative'}`}>
                            {NO_SHOW_TRENDS[NO_SHOW_TRENDS.length - 1].rate < NO_SHOW_TRENDS[0].rate ? (
                                <><Icon.TrendingDown /> Decreasing</>
                            ) : (
                                <><Icon.TrendingUp /> Increasing</>
                            )}
                        </span>
                    </div>
                </div>

                {/* Daily Breakdown Table */}
                <div className="glass-card sr-table-card">
                    <div className="sr-table-header">
                        <div>
                            <h3 className="sr-table-title">Daily Appointment Breakdown</h3>
                            <p className="sr-table-desc">Detailed daily schedule utilization and completion rates</p>
                        </div>
                    </div>
                    <div className="sr-table-wrap">
                        <table className="sr-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Day</th>
                                    <th>Total Slots</th>
                                    <th>Booked</th>
                                    <th>Completed</th>
                                    <th>No-Shows</th>
                                    <th>Cancellations</th>
                                    <th>Utilization</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.slice().reverse().map((d, i) => (
                                    <tr key={i}>
                                        <td>{formatDate(d.date)}</td>
                                        <td>{d.day}</td>
                                        <td>{d.totalSlots}</td>
                                        <td>{d.bookedSlots}</td>
                                        <td>{d.completed}</td>
                                        <td className="sr-no-show">{d.noShows}</td>
                                        <td className="sr-cancellation">{d.cancellations}</td>
                                        <td>
                                            <span className={`sr-utilization-badge ${d.utilization >= 80 ? 'high' : d.utilization >= 60 ? 'medium' : 'low'}`}>
                                                {d.utilization}%
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Cancellation Reasons */}
                <div className="glass-card sr-chart-card">
                    <div className="sr-chart-header">
                        <div>
                            <h3 className="sr-chart-title">Cancellation Reasons</h3>
                            <p className="sr-chart-desc">Breakdown of appointment cancellation reasons</p>
                        </div>
                    </div>
                    <div className="sr-cancellation-grid">
                        {CANCELLATION_REASONS.map((item, i) => (
                            <div key={i} className="sr-cancellation-item">
                                <div className="sr-cancellation-header">
                                    <span className="sr-cancellation-reason">{item.reason}</span>
                                    <span className="sr-cancellation-count">{item.count}</span>
                                </div>
                                <div className="sr-cancellation-bar">
                                    <div
                                        className="sr-cancellation-fill"
                                        style={{
                                            width: `${item.percentage}%`,
                                            background: ['#2F3E3C', '#BDDBD1', '#C7E7EC', '#E7E9E3', '#C4954C'][i]
                                        }}
                                    />
                                </div>
                                <span className="sr-cancellation-percent">{item.percentage}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleReport;