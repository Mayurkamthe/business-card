import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cardAPI } from '../services/api'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

const THEME_STYLES = {
  modern:  { bg: 'linear-gradient(135deg,#6366f1,#8b5cf6)', dot: '#818cf8' },
  ocean:   { bg: 'linear-gradient(135deg,#0ea5e9,#22d3ee)', dot: '#38bdf8' },
  forest:  { bg: 'linear-gradient(135deg,#10b981,#34d399)', dot: '#6ee7b7' },
  sunset:  { bg: 'linear-gradient(135deg,#f59e0b,#ef4444)', dot: '#fb923c' },
  dark:    { bg: 'linear-gradient(135deg,#1e293b,#334155)', dot: '#64748b' },
}

const IcoPlus = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
const IcoEdit = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M10.5 1.5l3 3L4 14H1v-3L10.5 1.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
const IcoBar = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 12V8M6 12V5M10 12V2M14 12V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
const IcoTrash = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 4h11M5 4V2.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5V4M6 7v4M9 7v4M3.5 4l.5 9h7l.5-9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
const IcoLink = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M5.5 9.5l4-4M8 3.5h3.5V7M11.5 3.5L7 8M7 11.5H3.5V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
const IcoCopy = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M5 10H3a1 1 0 01-1-1V3a1 1 0 011-1h6a1 1 0 011 1v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
const IcoCard = () => <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="4" y="10" width="32" height="20" rx="4" stroke="currentColor" strokeWidth="2"/><path d="M4 16h32" stroke="currentColor" strokeWidth="2"/><rect x="8" y="22" width="8" height="2" rx="1" fill="currentColor"/></svg>

export default function Dashboard() {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuthStore()

  useEffect(() => {
    cardAPI.getAll().then(r => setCards(r.data)).finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this card?')) return
    await cardAPI.delete(id)
    setCards(cards.filter(c => c.id !== id))
    toast.success('Card deleted')
  }

  const copyLink = (slug) => {
    navigator.clipboard.writeText(`${window.location.origin}/c/${slug}`)
    toast.success('Link copied')
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
      <div className="spinner" style={{ width: 32, height: 32 }} />
    </div>
  )

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            My Cards
          </h1>
          <p style={{ color: 'var(--mist)', marginTop: '0.3rem', fontSize: '0.9rem' }}>
            Hello, {user?.name?.split(' ')[0]}. You have {cards.length} card{cards.length !== 1 ? 's' : ''}.
          </p>
        </div>
        <Link to="/app/cards/new" className="btn btn-rose">
          <IcoPlus /> New Card
        </Link>
      </div>

      {/* Empty state */}
      {cards.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'var(--surface)', border: '1.5px dashed var(--border-strong)', borderRadius: 24 }}>
          <div style={{ width: 72, height: 72, background: 'var(--rose-soft)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--rose)' }}>
            <IcoCard />
          </div>
          <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.5rem' }}>No cards yet</h3>
          <p style={{ color: 'var(--mist)', marginBottom: '2rem', fontSize: '0.9rem' }}>Create your first digital business card and start sharing.</p>
          <Link to="/app/cards/new" className="btn btn-rose">
            <IcoPlus /> Create First Card
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {cards.map(card => {
            const theme = THEME_STYLES[card.theme] || THEME_STYLES.modern
            return (
              <div key={card.id} className="panel" style={{ padding: 0, overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}>

                {/* Card preview header */}
                <div style={{ background: theme.bg, padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                  <div style={{ position: 'absolute', bottom: -20, right: 20, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', position: 'relative' }}>
                    <div style={{
                      width: 46, height: 46, borderRadius: 13,
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(8px)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: '1.2rem', color: '#fff',
                      flexShrink: 0,
                      overflow: 'hidden',
                    }}>
                      {card.logoUrl
                        ? <img src={card.logoUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : card.title?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1rem', color: '#fff', lineHeight: 1.2 }}>{card.title}</div>
                      {card.tagline && <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.72)', marginTop: '0.15rem' }}>{card.tagline}</div>}
                    </div>
                  </div>
                  {card.phone && (
                    <div style={{ marginTop: '0.9rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '0.4rem', position: 'relative' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2h2l1 2.5-1.5 1a7 7 0 003 3l1-1.5L10 8v2H8C4.686 10 2 7.314 2 4V2Z" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinejoin="round"/></svg>
                      {card.phone}
                    </div>
                  )}
                </div>

                {/* Bottom actions */}
                <div style={{ padding: '1rem 1.25rem' }}>
                  {/* Slug row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface-2)', borderRadius: 10, padding: '0.45rem 0.75rem', marginBottom: '0.9rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--mist)', fontFamily: 'monospace', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      /c/{card.slug}
                    </span>
                    <button className="btn-icon" style={{ width: 28, height: 28, borderRadius: 7 }} onClick={() => copyLink(card.slug)} title="Copy link">
                      <IcoCopy />
                    </button>
                    <a href={`/c/${card.slug}`} target="_blank" rel="noopener noreferrer" className="btn-icon" style={{ width: 28, height: 28, borderRadius: 7 }} title="Open card">
                      <IcoLink />
                    </a>
                  </div>

                  {/* Action row */}
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link to={`/app/cards/${card.id}/edit`} className="btn btn-ghost btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                      <IcoEdit /> Edit
                    </Link>
                    <Link to={`/app/cards/${card.id}/analytics`} className="btn btn-ghost btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                      <IcoBar /> Stats
                    </Link>
                    <button onClick={() => handleDelete(card.id)} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: 36, height: 36, border: '1.5px solid var(--border)', borderRadius: 10,
                      background: 'transparent', color: 'var(--mist)', cursor: 'pointer', transition: 'all 0.15s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#FFF0F0'; e.currentTarget.style.borderColor = '#fca5a5'; e.currentTarget.style.color = '#ef4444' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--mist)' }}>
                      <IcoTrash />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
