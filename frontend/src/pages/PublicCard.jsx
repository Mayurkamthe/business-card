import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { cardAPI, analyticsAPI } from '../services/api'

const THEME_BG = {
  modern:  'linear-gradient(145deg,#6366f1 0%,#8b5cf6 100%)',
  ocean:   'linear-gradient(145deg,#0ea5e9 0%,#22d3ee 100%)',
  forest:  'linear-gradient(145deg,#10b981 0%,#34d399 100%)',
  sunset:  'linear-gradient(145deg,#f59e0b 0%,#ef4444 100%)',
  dark:    'linear-gradient(145deg,#1e293b 0%,#334155 100%)',
}

const IcoPhone = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3h3l1.5 3.5L6 8a9 9 0 003 3l1.5-1.5L14 11v3H12C7.03 14 2 8.97 2 4V3h1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
const IcoWA = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1C4.134 1 1 4.134 1 8c0 1.18.3 2.3.83 3.27L1 15l3.83-.87A7 7 0 108 1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M5.5 6.5c.12 1.58 1.7 3.16 3.28 3.28.66.05 1.1-.36 1.1-1.1L8.64 8l-1.1.37C7.17 8 7.5 7.67 7.5 7.27L6.6 6c-.73 0-1.15.44-1.1 1.1v-.6Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/></svg>
const IcoGlobe = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" strokeWidth="1.3"/><path d="M7.5 1C7.5 1 5 3.5 5 7.5S7.5 14 7.5 14M7.5 1C7.5 1 10 3.5 10 7.5S7.5 14 7.5 14M1 7.5h13" stroke="currentColor" strokeWidth="1.3"/></svg>
const IcoPin = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 1.5A4.5 4.5 0 0112 6c0 3-4.5 7.5-4.5 7.5S3 9 3 6a4.5 4.5 0 014.5-4.5Z" stroke="currentColor" strokeWidth="1.3"/><circle cx="7.5" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.3"/></svg>
const IcoMail = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1" y="3" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M1 5l6.5 4L14 5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>
const IcoShare = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="12.5" cy="3.5" r="2" stroke="currentColor" strokeWidth="1.4"/><circle cx="3.5" cy="8" r="2" stroke="currentColor" strokeWidth="1.4"/><circle cx="12.5" cy="12.5" r="2" stroke="currentColor" strokeWidth="1.4"/><path d="M5.3 7l5.4-2.5M10.7 11l-5.4-2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
const IcoQR = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="10" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="1" y="10" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="2.5" y="2.5" width="2" height="2" rx="0.3" fill="currentColor"/><rect x="11.5" y="2.5" width="2" height="2" rx="0.3" fill="currentColor"/><rect x="2.5" y="11.5" width="2" height="2" rx="0.3" fill="currentColor"/><rect x="10" y="10" width="2" height="2" rx="0.3" fill="currentColor"/><rect x="13" y="10" width="2" height="3" rx="0.3" fill="currentColor"/><rect x="10" y="13" width="3" height="2" rx="0.3" fill="currentColor"/></svg>
const IcoSave = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.6"/><path d="M3 17c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="M12 2.5l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
const IcoInsta = () => <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><rect x="1" y="1" width="15" height="15" rx="4.5" stroke="currentColor" strokeWidth="1.4"/><circle cx="8.5" cy="8.5" r="3.5" stroke="currentColor" strokeWidth="1.4"/><circle cx="13" cy="4" r="0.8" fill="currentColor"/></svg>
const IcoFB = () => <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><path d="M16 8.5A7.5 7.5 0 101 8.5 7.5 7.5 0 0016 8.5Z" stroke="currentColor" strokeWidth="1.4"/><path d="M11 5.5H9.5A1.5 1.5 0 008 7v1H6.5v2H8v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
const IcoTW = () => <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><path d="M2 2.5l5.5 7L2 14.5h2l4-4.5 3 4.5h4l-5.5-8 5-5.5h-2l-3.5 4L6 2.5H2Z" fill="currentColor"/></svg>
const IcoLI = () => <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><rect x="1" y="1" width="15" height="15" rx="3" stroke="currentColor" strokeWidth="1.4"/><path d="M5 7v5M5 5v.01M8 12V9a2 2 0 014 0v3M8 7v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
const IcoYT = () => <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><rect x="1" y="3.5" width="15" height="10" rx="3" stroke="currentColor" strokeWidth="1.4"/><path d="M7 6.5l4 2-4 2v-4Z" fill="currentColor"/></svg>

function SectionContent({ type, content }) {
  let items = []
  try { items = JSON.parse(content) } catch { return <p style={{ fontSize: '0.88rem', color: 'var(--mist)', padding: '0.5rem 0' }}>{content}</p> }
  if (type === 'services') return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: i < items.length - 1 ? '1px solid #f3e8f0' : 'none' }}>
          <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</span>
          {item.price && <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#e91e8c', background: '#fce4f3', padding: '0.2rem 0.6rem', borderRadius: 8 }}>&#8377;{item.price}</span>}
        </div>
      ))}
    </div>
  )
  if (type === 'reviews') return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {items.map((item, i) => (
        <div key={i} style={{ background: '#fdf5fa', border: '1px solid #f0d6e8', borderRadius: 14, padding: '0.9rem 1rem' }}>
          <div style={{ display: 'flex', gap: '1px', marginBottom: '0.5rem' }}>
            {[1,2,3,4,5].map(s => <svg key={s} width="12" height="12" viewBox="0 0 12 12" fill={s <= (item.stars || 5) ? '#f59e0b' : '#e5e7eb'}><path d="M6 1l1.3 2.6L10 4l-2 2 .5 2.8L6 7.5 3.5 8.8 4 6 2 4l2.7-.4L6 1Z"/></svg>)}
          </div>
          <p style={{ fontSize: '0.85rem', color: '#4a2035', fontStyle: 'italic', lineHeight: 1.55 }}>"{item.text}"</p>
          <p style={{ fontSize: '0.75rem', color: '#9b7089', marginTop: '0.4rem', fontWeight: 700 }}>— {item.author}</p>
        </div>
      ))}
    </div>
  )
  if (type === 'gallery') return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
      {items.map((item, i) => (
        <div key={i} style={{ aspectRatio: '1', borderRadius: 12, overflow: 'hidden', background: '#f0d6e8' }}>
          <img src={item.url || item} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      ))}
    </div>
  )
  return <p style={{ fontSize: '0.88rem', color: '#4a2035', lineHeight: 1.65 }}>{typeof items === 'string' ? items : JSON.stringify(items)}</p>
}

export default function PublicCard() {
  const { slug } = useParams()
  const [card, setCard] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cardAPI.getPublic(slug)
      .then(r => { setCard(r.data); analyticsAPI.trackView(slug) })
      .catch(() => setCard(null))
      .finally(() => setLoading(false))
  }, [slug])

  const track = (type) => analyticsAPI.trackClick(slug, type)

  const downloadVCard = () => {
    const lines = ['BEGIN:VCARD', 'VERSION:3.0']
    if (card.title) lines.push(`FN:${card.title}`)
    if (card.tagline) lines.push(`TITLE:${card.tagline}`)
    if (card.phone) lines.push(`TEL;TYPE=CELL:${card.phone}`)
    if (card.whatsapp && card.whatsapp !== card.phone) lines.push(`TEL;TYPE=WORK:${card.whatsapp}`)
    if (card.email) lines.push(`EMAIL:${card.email}`)
    if (card.website) lines.push(`URL:${card.website}`)
    if (card.address) lines.push(`ADR;TYPE=WORK:;;${card.address};;;;`)
    if (card.instagram) lines.push(`X-SOCIALPROFILE;TYPE=instagram:${card.instagram}`)
    if (card.facebook) lines.push(`X-SOCIALPROFILE;TYPE=facebook:${card.facebook}`)
    if (card.twitter) lines.push(`X-SOCIALPROFILE;TYPE=twitter:${card.twitter}`)
    if (card.linkedin) lines.push(`X-SOCIALPROFILE;TYPE=linkedin:${card.linkedin}`)
    if (card.logoUrl) lines.push(`PHOTO;VALUE=URI:${card.logoUrl}`)
    lines.push(`NOTE:${window.location.href}`)
    lines.push('END:VCARD')
    const blob = new Blob([lines.join('\r\n')], { type: 'text/vcard;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = `${card.title?.replace(/\s+/g, '-')}.vcf`; a.click()
    URL.revokeObjectURL(url)
    track('link')
  }

  const share = () => {
    if (navigator.share) navigator.share({ title: card.title, url: window.location.href })
    else { navigator.clipboard.writeText(window.location.href); alert('Link copied') }
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fdf5fa' }}>
      <div style={{ width: 28, height: 28, border: '3px solid #fce4f3', borderTopColor: '#e91e8c', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  if (!card) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fdf5fa', gap: '0.75rem' }}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" stroke="#f0d6e8" strokeWidth="2"/><path d="M16 24h16M24 16v16" stroke="#e91e8c" strokeWidth="2" strokeLinecap="round"/></svg>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.5rem', fontWeight: 900, color: '#150a10' }}>Card not found</h2>
      <p style={{ color: '#9b7089', fontSize: '0.9rem' }}>This card doesn't exist or has been removed.</p>
    </div>
  )

  const bg = THEME_BG[card.theme] || THEME_BG.modern
  const socials = [
    { key: 'instagram', Icon: IcoInsta, url: card.instagram },
    { key: 'facebook',  Icon: IcoFB,    url: card.facebook },
    { key: 'twitter',   Icon: IcoTW,    url: card.twitter },
    { key: 'linkedin',  Icon: IcoLI,    url: card.linkedin },
    { key: 'youtube',   Icon: IcoYT,    url: card.youtube },
  ].filter(s => s.url)

  return (
    <div style={{ minHeight: '100vh', background: '#f5eef5', display: 'flex', justifyContent: 'center' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,700&family=Cabinet+Grotesk:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'Cabinet Grotesk', sans-serif; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
        .pub-card { animation: fadeIn 0.45s ease; }
        .action-btn { display:flex; align-items:center; justify-content:center; gap:0.4rem; padding:0.8rem; border-radius:14px; font-family:'Cabinet Grotesk',sans-serif; font-weight:700; font-size:0.85rem; border:none; cursor:pointer; transition:all 0.18s; text-decoration:none; }
        .sec-btn { display:flex; align-items:center; justify-content:center; gap:0.4rem; flex:1; padding:0.75rem; border-radius:12px; font-family:'Cabinet Grotesk',sans-serif; font-weight:700; font-size:0.82rem; cursor:pointer; transition:all 0.15s; text-decoration:none; }
      `}</style>

      <div className="pub-card" style={{ width: '100%', maxWidth: 420, minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column', boxShadow: '0 0 60px rgba(0,0,0,0.08)' }}>

        {/* Hero */}
        <div style={{ background: bg, padding: '2.5rem 1.75rem 2rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -40, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

          <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{
              width: 68, height: 68, borderRadius: 18, flexShrink: 0, overflow: 'hidden',
              background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
              border: '2px solid rgba(255,255,255,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: '1.8rem', color: '#fff',
            }}>
              {card.logoUrl ? <img src={card.logoUrl} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : card.title?.[0]}
            </div>
            <div style={{ paddingTop: '0.25rem' }}>
              <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.6rem', fontWeight: 900, color: '#fff', lineHeight: 1.1, margin: 0 }}>{card.title}</h1>
              {card.tagline && <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', marginTop: '0.3rem', fontWeight: 500 }}>{card.tagline}</p>}
            </div>
          </div>

          {/* CTA buttons */}
          {(card.phone || card.whatsapp) && (
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', position: 'relative' }}>
              {card.phone && (
                <a href={`tel:${card.phone}`} onClick={() => track('phone')} className="action-btn"
                  style={{ flex: 1, background: 'rgba(255,255,255,0.18)', color: '#fff', backdropFilter: 'blur(8px)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.28)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}>
                  <IcoPhone /> Call
                </a>
              )}
              {card.whatsapp && (
                <a href={`https://wa.me/${card.whatsapp.replace(/\D/g, '')}`} onClick={() => track('whatsapp')} target="_blank" rel="noopener noreferrer"
                  className="action-btn" style={{ flex: 1, background: 'rgba(37,211,102,0.4)', color: '#fff' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,211,102,0.6)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(37,211,102,0.4)'}>
                  <IcoWA /> WhatsApp
                </a>
              )}
            </div>
          )}
        </div>

        {/* Save contact CTA */}
        <div style={{ padding: '1.25rem 1.5rem 0' }}>
          <button onClick={downloadVCard} style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
            padding: '0.95rem', borderRadius: 16, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg,#e91e8c,#c0166f)',
            color: '#fff', fontFamily: "'Cabinet Grotesk', sans-serif",
            fontWeight: 800, fontSize: '0.95rem',
            boxShadow: '0 4px 20px rgba(233,30,140,0.3)',
            transition: 'all 0.18s',
          }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 28px rgba(233,30,140,0.42)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(233,30,140,0.3)'; e.currentTarget.style.transform = '' }}>
            <IcoSave /> Save to Contacts
          </button>
          <p style={{ textAlign: 'center', fontSize: '0.72rem', color: '#9b7089', marginTop: '0.5rem' }}>
            Opens in your phone's Contacts app
          </p>
        </div>

        {/* Contact details */}
        {(card.email || card.website || card.address) && (
          <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid #f3e8f0', marginTop: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {card.email && (
                <a href={`mailto:${card.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#4a2035', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#e91e8c'} onMouseLeave={e => e.currentTarget.style.color = '#4a2035'}>
                  <span style={{ width: 32, height: 32, background: '#fce4f3', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e91e8c', flexShrink: 0 }}><IcoMail /></span>
                  {card.email}
                </a>
              )}
              {card.website && (
                <a href={card.website} onClick={() => track('link')} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#4a2035', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#e91e8c'} onMouseLeave={e => e.currentTarget.style.color = '#4a2035'}>
                  <span style={{ width: 32, height: 32, background: '#fce4f3', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e91e8c', flexShrink: 0 }}><IcoGlobe /></span>
                  {card.website.replace(/^https?:\/\//, '')}
                </a>
              )}
              {card.address && (
                <a href={card.mapLink || '#'} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#4a2035', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#e91e8c'} onMouseLeave={e => e.currentTarget.style.color = '#4a2035'}>
                  <span style={{ width: 32, height: 32, background: '#fce4f3', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e91e8c', flexShrink: 0, marginTop: '0.05rem' }}><IcoPin /></span>
                  <span style={{ lineHeight: 1.5 }}>{card.address}</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Social links */}
        {socials.length > 0 && (
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #f3e8f0' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#9b7089', letterSpacing: '0.09em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Follow</div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {socials.map(({ key, Icon, url }) => (
                <a key={key} href={url.startsWith('http') ? url : `https://${url}`}
                  onClick={() => track('link')} target="_blank" rel="noopener noreferrer"
                  style={{
                    width: 40, height: 40, borderRadius: 12, background: '#fce4f3',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#e91e8c', textDecoration: 'none', transition: 'all 0.15s', border: '1px solid #f0d6e8',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#e91e8c'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#fce4f3'; e.currentTarget.style.color = '#e91e8c' }}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Sections */}
        {card.sections?.map((section, i) => (
          <div key={i} style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid #f3e8f0' }}>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: '1.05rem', marginBottom: '0.9rem', color: '#150a10' }}>
              {section.title || section.type?.charAt(0).toUpperCase() + section.type?.slice(1)}
            </h3>
            <SectionContent type={section.type} content={section.content} />
          </div>
        ))}

        {/* Share + QR row */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #f3e8f0', display: 'flex', gap: '0.6rem', marginTop: 'auto' }}>
          <button onClick={share} className="sec-btn" style={{ background: '#fdf5fa', color: '#4a2035', border: '1.5px solid #f0d6e8' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#e91e8c'; e.currentTarget.style.color = '#e91e8c' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#f0d6e8'; e.currentTarget.style.color = '#4a2035' }}>
            <IcoShare /> Share
          </button>
          <a href={`/api/public/qr/${slug}`} download={`${slug}-qr.png`} className="sec-btn" style={{ background: '#fdf5fa', color: '#4a2035', border: '1.5px solid #f0d6e8' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#e91e8c'; e.currentTarget.style.color = '#e91e8c' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#f0d6e8'; e.currentTarget.style.color = '#4a2035' }}>
            <IcoQR /> QR Code
          </a>
        </div>

        {/* Footer */}
        <div style={{ padding: '0.75rem', textAlign: 'center', borderTop: '1px solid #f3e8f0' }}>
          <a href="/" style={{ fontSize: '0.72rem', color: '#c0b0bb', textDecoration: 'none', fontWeight: 600, letterSpacing: '0.03em' }}>
            Powered by CardBiz
          </a>
        </div>
      </div>
    </div>
  )
}
