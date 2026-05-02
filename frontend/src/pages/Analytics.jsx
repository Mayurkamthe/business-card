import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { analyticsAPI } from '../services/api'

const IcoArrow = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
const IcoEye = () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><ellipse cx="11" cy="11" rx="9" ry="6" stroke="currentColor" strokeWidth="1.7"/><circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.7"/></svg>
const IcoWA = () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 2C6.03 2 2 6.03 2 11c0 1.6.41 3.11 1.13 4.42L2 20l4.71-1.24A9 9 0 1011 2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M8 9.5c.17 2.17 2.33 4.33 4.5 4.5.9.07 1.5-.5 1.5-1.5L12.5 11l-1.5.5C10.5 11 11 10.5 11 9.5L9.5 8C8.5 8 7.93 8.6 8 9.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>
const IcoPhone = () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 4h4l2 5-3 2a12 12 0 005 5l2-3 5 2v4a1 1 0 01-1 1C9.16 19 3 12.84 3 5a1 1 0 011-1Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg>

function StatCard({ label, value, icon: Icon, color, bg }) {
  return (
    <div className="panel" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
      <div style={{ width: 52, height: 52, borderRadius: 14, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color, flexShrink: 0 }}>
        <Icon />
      </div>
      <div>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: '2rem', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em' }}>
          {(value || 0).toLocaleString()}
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--mist)', fontWeight: 600, marginTop: '0.2rem' }}>{label}</div>
      </div>
    </div>
  )
}

export default function Analytics() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)

  useEffect(() => { analyticsAPI.get(id).then(r => setData(r.data)) }, [id])

  if (!data) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <div className="spinner" style={{ width: 32, height: 32 }} />
    </div>
  )

  const maxViews = Math.max(...(data.last30Days?.map(d => d.viewCount) || [1]), 1)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <button onClick={() => navigate('/app/dashboard')} className="btn-icon" style={{ width: 40, height: 40 }}>
          <IcoArrow />
        </button>
        <div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.03em' }}>Analytics</h1>
          <p style={{ color: 'var(--mist)', fontSize: '0.85rem', marginTop: '0.1rem' }}>Track how visitors interact with your card.</p>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard label="Total Views" value={data.totalViews} icon={IcoEye} color="#3b82f6" bg="#eff6ff" />
        <StatCard label="WhatsApp Taps" value={data.totalWhatsappClicks} icon={IcoWA} color="#22c55e" bg="#f0fdf4" />
        <StatCard label="Phone Taps" value={data.totalPhoneClicks} icon={IcoPhone} color="var(--rose)" bg="var(--rose-soft)" />
      </div>

      {/* Chart */}
      <div className="panel">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.2rem', fontWeight: 900 }}>Daily Views — Last 30 Days</h2>
          <div className="badge badge-mist">{data.last30Days?.length || 0} days</div>
        </div>

        {!data.last30Days?.length ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--mist)', fontSize: '0.9rem' }}>
            No data yet. Share your card to start seeing analytics.
          </div>
        ) : (
          <>
            {/* Bar chart */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: 120, marginBottom: '1.5rem', overflow: 'hidden' }}>
              {data.last30Days.map((row, i) => (
                <div key={i} title={`${row.eventDate}: ${row.viewCount} views`} style={{
                  flex: 1, minWidth: 4,
                  height: `${Math.max(4, (row.viewCount / maxViews) * 100)}%`,
                  background: `linear-gradient(180deg, var(--rose) 0%, var(--rose-mid) 100%)`,
                  borderRadius: '3px 3px 0 0',
                  transition: 'opacity 0.15s',
                  cursor: 'default',
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                />
              ))}
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: '0.83rem', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1.5px solid var(--border)' }}>
                    {['Date', 'Views', 'WhatsApp', 'Phone'].map(h => (
                      <th key={h} style={{ textAlign: h === 'Date' ? 'left' : 'right', padding: '0.6rem 0.5rem', color: 'var(--mist)', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.07em', textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.last30Days.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <td style={{ padding: '0.65rem 0.5rem', color: 'var(--ink-light)', fontWeight: 500 }}>{row.eventDate}</td>
                      <td style={{ padding: '0.65rem 0.5rem', textAlign: 'right', fontWeight: 700 }}>{row.viewCount}</td>
                      <td style={{ padding: '0.65rem 0.5rem', textAlign: 'right', color: '#22c55e', fontWeight: 700 }}>{row.whatsappClicks}</td>
                      <td style={{ padding: '0.65rem 0.5rem', textAlign: 'right', color: 'var(--rose)', fontWeight: 700 }}>{row.phoneClicks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
