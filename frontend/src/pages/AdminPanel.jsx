import { useEffect, useState } from 'react'
import { adminAPI } from '../services/api'
import toast from 'react-hot-toast'

const IcoUsers = () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.7"/><path d="M2 19c0-3.866 3.134-7 7-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><circle cx="16" cy="13" r="3" stroke="currentColor" strokeWidth="1.7"/><path d="M13 19c0-1.657 1.343-3 3-3s3 1.343 3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
const IcoCard = () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="6" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="1.7"/><path d="M2 10h18" stroke="currentColor" strokeWidth="1.7"/><rect x="5" y="14" width="5" height="1.5" rx="0.75" fill="currentColor"/></svg>
const IcoTrash = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 4h11M5 4V2.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5V4M6 7v4M9 7v4M3.5 4l.5 9h7l.5-9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
const IcoShield = () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 2L3 5.5v6c0 5 3.6 8.5 8 9.5 4.4-1 8-4.5 8-9.5v-6L11 2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>

export default function AdminPanel() {
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    adminAPI.getStats().then(r => setStats(r.data))
    adminAPI.getUsers().then(r => setUsers(r.data))
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this user and all their data?')) return
    await adminAPI.deleteUser(id)
    setUsers(users.filter(u => u.id !== id))
    toast.success('User removed')
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
          <div style={{ width: 36, height: 36, background: 'var(--rose-soft)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--rose)' }}>
            <IcoShield />
          </div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.03em' }}>Admin Panel</h1>
        </div>
        <p style={{ color: 'var(--mist)', fontSize: '0.88rem', marginLeft: '3rem' }}>Platform overview and user management.</p>
      </div>

      {/* Stats */}
      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Users', value: stats.totalUsers, icon: IcoUsers, color: '#6366f1', bg: '#eef2ff' },
            { label: 'Total Cards', value: stats.totalCards, icon: IcoCard, color: 'var(--rose)', bg: 'var(--rose-soft)' },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 48, height: 48, borderRadius: 13, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color, flexShrink: 0 }}>
                <Icon />
              </div>
              <div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: '1.8rem', fontWeight: 900, lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--mist)', fontWeight: 600, marginTop: '0.15rem' }}>{label}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Users table */}
      <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.15rem', fontWeight: 900 }}>All Users</h2>
          <span className="badge badge-mist">{users.length} total</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}>
                {['User', 'Email', 'Role', 'Joined', ''].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '0.75rem 1.25rem', color: 'var(--mist)', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.07em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--blush)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '0.9rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 9,
                        background: 'linear-gradient(135deg, var(--rose), var(--rose-deep))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontWeight: 800, fontSize: '0.75rem', flexShrink: 0,
                      }}>{user.name?.[0]?.toUpperCase()}</div>
                      <span style={{ fontWeight: 700 }}>{user.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '0.9rem 1.25rem', color: 'var(--mist)' }}>{user.email}</td>
                  <td style={{ padding: '0.9rem 1.25rem' }}>
                    <span className={`badge ${user.role === 'ADMIN' ? 'badge-rose' : 'badge-mist'}`}>{user.role}</span>
                  </td>
                  <td style={{ padding: '0.9rem 1.25rem', color: 'var(--mist)', fontSize: '0.8rem' }}>
                    {new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td style={{ padding: '0.9rem 1.25rem' }}>
                    {user.role !== 'ADMIN' && (
                      <button onClick={() => handleDelete(user.id)} style={{
                        width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: '1.5px solid var(--border)', borderRadius: 9, background: 'transparent',
                        color: 'var(--mist)', cursor: 'pointer', transition: 'all 0.15s',
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#fff5f5'; e.currentTarget.style.borderColor = '#fca5a5'; e.currentTarget.style.color = '#ef4444' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--mist)' }}>
                        <IcoTrash />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
