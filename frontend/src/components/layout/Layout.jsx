import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useState } from 'react'

const IcoDashboard = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/><rect x="10" y="1" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/><rect x="1" y="10" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/><rect x="10" y="10" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.6"/></svg>
const IcoPlus = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.6"/><path d="M9 5.5v7M5.5 9h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
const IcoShield = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 1.5L2 4.5v5c0 4 3.134 6.636 7 7.5 3.866-.864 7-3.5 7-7.5v-5L9 1.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
const IcoLogout = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M10.5 11.5L14 8l-3.5-3.5M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
const IcoMenu = () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 7h16M3 11h10M3 15h13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
const IcoClose = () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M6 6l10 10M16 6L6 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>

export default function Layout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => { logout(); navigate('/login') }

  const links = [
    { to: '/app/dashboard', icon: IcoDashboard, label: 'Dashboard' },
    { to: '/app/cards/new', icon: IcoPlus, label: 'New Card' },
    ...(user?.role === 'ADMIN' ? [{ to: '/app/admin', icon: IcoShield, label: 'Admin' }] : []),
  ]

  const initials = user?.name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--blush)' }}>
      <style>{`
        .sidebar { transition: transform 0.28s cubic-bezier(0.4,0,0.2,1); }
        .overlay { display: none; }
        @media (max-width: 1024px) {
          .sidebar { position: fixed; inset-y: 0; left: 0; z-index: 50; transform: translateX(-100%); }
          .sidebar.open { transform: translateX(0); }
          .overlay { display: block; }
          .main-content { margin-left: 0 !important; }
          .mobile-header { display: flex !important; }
        }
        @media (min-width: 1025px) {
          .sidebar { position: fixed; transform: translateX(0) !important; }
          .mobile-header { display: none !important; }
        }
        .nav-item {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.65rem 1rem; border-radius: 12px;
          font-size: 0.88rem; font-weight: 600;
          color: var(--mist); text-decoration: none;
          transition: all 0.15s; border: 1.5px solid transparent;
        }
        .nav-item:hover { background: var(--rose-soft); color: var(--rose); }
        .nav-item.active { background: var(--rose); color: #fff; box-shadow: 0 4px 14px rgba(247,37,133,0.3); border-color: transparent; }
      `}</style>

      {/* Sidebar */}
      <aside className={`sidebar${open ? ' open' : ''}`} style={{
        width: 240, background: 'var(--surface)', borderRight: '1.5px solid var(--border)',
        display: 'flex', flexDirection: 'column', height: '100vh',
      }}>
        {/* Logo */}
        <div style={{ padding: '1.5rem 1.5rem 1rem', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: '1.5rem', color: 'var(--rose)', letterSpacing: '-0.03em' }}>CardBiz</span>
          <div style={{ fontSize: '0.72rem', color: 'var(--mist)', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', marginTop: '0.15rem' }}>Business Cards</div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '1.25rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--mist)', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0 0.5rem', marginBottom: '0.5rem' }}>Menu</div>
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)}
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
              <Icon /> {label}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div style={{ padding: '1rem', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'var(--surface-2)', borderRadius: 14, marginBottom: '0.75rem' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, var(--rose), var(--rose-deep))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0,
            }}>{initials}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--mist)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email}</div>
            </div>
          </div>
          <button onClick={handleLogout} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: '0.6rem',
            padding: '0.6rem 0.75rem', borderRadius: 10, border: 'none',
            background: 'transparent', color: 'var(--mist)', fontSize: '0.85rem',
            fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
            fontFamily: "'Cabinet Grotesk', sans-serif",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#FFF0F0'; e.currentTarget.style.color = '#e53e3e' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--mist)' }}>
            <IcoLogout /> Sign out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && <div className="overlay" onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 49, backdropFilter: 'blur(2px)' }} />}

      {/* Main */}
      <div className="main-content" style={{ flex: 1, marginLeft: 240, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Mobile header */}
        <header className="mobile-header" style={{
          position: 'sticky', top: 0, zIndex: 30,
          background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border)',
          padding: '0.9rem 1.25rem',
          alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: '1.3rem', color: 'var(--rose)' }}>CardBiz</span>
          <button onClick={() => setOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink)', padding: '0.25rem' }}>
            <IcoMenu />
          </button>
        </header>

        <main style={{ flex: 1, padding: '2rem 2rem', maxWidth: 1100, width: '100%', margin: '0 auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
