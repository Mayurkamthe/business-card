import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { cardAPI, analyticsAPI } from '../services/api'
import { Phone, MessageCircle, Globe, MapPin, Instagram, Facebook, Twitter, Linkedin, Youtube, Share2, QrCode, UserPlus } from 'lucide-react'

const THEMES = {
  modern: { bg: 'from-indigo-500 to-purple-600', btn: 'bg-indigo-600 hover:bg-indigo-700' },
  ocean: { bg: 'from-blue-500 to-cyan-400', btn: 'bg-blue-600 hover:bg-blue-700' },
  forest: { bg: 'from-green-500 to-emerald-600', btn: 'bg-green-600 hover:bg-green-700' },
  sunset: { bg: 'from-orange-500 to-pink-500', btn: 'bg-orange-500 hover:bg-orange-600' },
  dark: { bg: 'from-slate-800 to-slate-900', btn: 'bg-slate-700 hover:bg-slate-600' },
}

export default function PublicCard() {
  const { slug } = useParams()
  const [card, setCard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showQR, setShowQR] = useState(false)

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
    lines.push(`NOTE:Shared via CardBiz – ${window.location.href}`)
    lines.push('END:VCARD')

    const blob = new Blob([lines.join('\r\n')], { type: 'text/vcard;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${card.title.replace(/\s+/g, '-')}.vcf`
    a.click()
    URL.revokeObjectURL(url)
    track('link')
  }

  const share = () => {
    if (navigator.share) {
      navigator.share({ title: card.title, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied!')
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!card) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold text-slate-700">Card not found</h2>
        <p className="text-slate-500 mt-2">This card may have been removed or doesn't exist.</p>
      </div>
    </div>
  )

  const theme = THEMES[card.theme] || THEMES.modern

  const socials = [
    { key: 'instagram', Icon: Instagram, url: card.instagram, label: 'Instagram' },
    { key: 'facebook', Icon: Facebook, url: card.facebook, label: 'Facebook' },
    { key: 'twitter', Icon: Twitter, url: card.twitter, label: 'Twitter' },
    { key: 'linkedin', Icon: Linkedin, url: card.linkedin, label: 'LinkedIn' },
    { key: 'youtube', Icon: Youtube, url: card.youtube, label: 'YouTube' },
  ].filter(s => s.url)

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className={`bg-gradient-to-br ${theme.bg} text-white px-6 py-10 relative`}>
          <div className="flex items-start gap-4">
            {card.logoUrl ? (
              <img src={card.logoUrl} alt={card.title} className="w-20 h-20 rounded-2xl object-cover shadow-lg border-2 border-white/30" />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center text-3xl font-bold shadow-lg">
                {card.title?.[0]}
              </div>
            )}
            <div className="flex-1 pt-1">
              <h1 className="font-display text-2xl font-bold leading-tight">{card.title}</h1>
              {card.tagline && <p className="text-white/80 text-sm mt-1">{card.tagline}</p>}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-6">
            {card.phone && (
              <a href={`tel:${card.phone}`} onClick={() => track('phone')}
                className="flex-1 flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white py-3 rounded-xl font-medium text-sm transition-all backdrop-blur">
                <Phone size={16} /> Call
              </a>
            )}
            {card.whatsapp && (
              <a href={`https://wa.me/${card.whatsapp.replace(/\D/g, '')}`} onClick={() => track('whatsapp')}
                target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium text-sm transition-all">
                <MessageCircle size={16} /> WhatsApp
              </a>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="bg-white min-h-screen">
          {/* Contact info */}
          <div className="px-6 py-5 border-b border-slate-100">
            <div className="space-y-3">
              {card.email && (
                <a href={`mailto:${card.email}`} className="flex items-center gap-3 text-sm text-slate-600 hover:text-primary transition-colors">
                  <span className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-base">✉️</span>
                  {card.email}
                </a>
              )}
              {card.website && (
                <a href={card.website} onClick={() => track('link')} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-slate-600 hover:text-primary transition-colors">
                  <span className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center"><Globe size={14} /></span>
                  {card.website.replace(/^https?:\/\//, '')}
                </a>
              )}
              {card.address && (
                <a href={card.mapLink || '#'} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-slate-600 hover:text-primary transition-colors">
                  <span className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center"><MapPin size={14} /></span>
                  {card.address}
                </a>
              )}
            </div>
          </div>

          {/* Social links */}
          {socials.length > 0 && (
            <div className="px-6 py-5 border-b border-slate-100">
              <div className="flex gap-3 flex-wrap">
                {socials.map(({ key, Icon, url, label }) => (
                  <a key={key} href={url.startsWith('http') ? url : `https://${url}`}
                    onClick={() => track('link')} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm text-slate-600 font-medium transition-colors">
                    <Icon size={15} /> {label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Sections */}
          {card.sections?.map((section, i) => (
            <div key={i} className="px-6 py-5 border-b border-slate-100">
              <h3 className="font-display font-bold text-lg mb-3">{section.title || section.type}</h3>
              <SectionContent type={section.type} content={section.content} />
            </div>
          ))}

          {/* Save Contact CTA */}
          <div className="px-6 pt-6 pb-3">
            <button onClick={downloadVCard}
              className="w-full flex items-center justify-center gap-2.5 py-4 bg-primary text-white rounded-2xl font-semibold text-sm shadow-lg shadow-primary/30 hover:bg-primary-dark active:scale-95 transition-all duration-150">
              <UserPlus size={18} /> Save Contact
            </button>
            <p className="text-center text-xs text-slate-400 mt-2">Downloads a .vcf file — opens directly in Contacts app</p>
          </div>

          {/* Footer actions */}
          <div className="px-6 py-3 flex gap-3">
            <button onClick={share}
              className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:border-primary hover:text-primary transition-all">
              <Share2 size={16} /> Share
            </button>
            <a href={`/api/public/qr/${slug}`} download={`${slug}-qr.png`}
              className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:border-primary hover:text-primary transition-all">
              <QrCode size={16} /> QR Code
            </a>
          </div>

          <div className="text-center pb-8 pt-2">
            <p className="text-xs text-slate-300">Powered by <span className="font-semibold text-primary">CardBiz</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionContent({ type, content }) {
  let items = []
  try { items = JSON.parse(content) } catch { return <p className="text-sm text-slate-500">{content}</p> }

  if (type === 'services') {
    return (
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
            <span className="text-sm font-medium text-slate-700">{item.name}</span>
            {item.price && <span className="text-sm font-bold text-primary">{item.price}</span>}
          </div>
        ))}
      </div>
    )
  }

  if (type === 'reviews') {
    return (
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="bg-slate-50 rounded-xl p-3">
            <p className="text-sm text-slate-600 italic">"{item.text}"</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">— {item.author}</p>
          </div>
        ))}
      </div>
    )
  }

  if (type === 'gallery') {
    return (
      <div className="grid grid-cols-3 gap-2">
        {items.map((item, i) => (
          <img key={i} src={item.url || item} alt="" className="aspect-square rounded-xl object-cover w-full" />
        ))}
      </div>
    )
  }

  return <p className="text-sm text-slate-600">{typeof items === 'string' ? items : JSON.stringify(items)}</p>
}
