import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { cardAPI } from '../services/api'
import toast from 'react-hot-toast'

const THEMES = [
  { id: 'modern', label: 'Modern', bg: 'linear-gradient(135deg,#6366f1,#8b5cf6)' },
  { id: 'ocean',  label: 'Ocean',  bg: 'linear-gradient(135deg,#0ea5e9,#22d3ee)' },
  { id: 'forest', label: 'Forest', bg: 'linear-gradient(135deg,#10b981,#34d399)' },
  { id: 'sunset', label: 'Sunset', bg: 'linear-gradient(135deg,#f59e0b,#ef4444)' },
  { id: 'dark',   label: 'Dark',   bg: 'linear-gradient(135deg,#1e293b,#334155)' },
]

const SECTION_TYPES = ['services', 'gallery', 'reviews', 'about']

const IcoArrow = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
const IcoSave = () => <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><path d="M3 14h11a1 1 0 001-1V5.414a1 1 0 00-.293-.707l-2.414-2.414A1 1 0 0011.586 2H3a1 1 0 00-1 1v10a1 1 0 001 1Z" stroke="currentColor" strokeWidth="1.5"/><path d="M5 14V9h7v5M5 2v3h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
const IcoPlus = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
const IcoTrash = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 4h11M5 4V2.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5V4M6 7v4M9 7v4M3.5 4l.5 9h7l.5-9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>

const TABS = [
  { id: 'basic',    label: 'Basic' },
  { id: 'contact',  label: 'Contact' },
  { id: 'social',   label: 'Social' },
  { id: 'sections', label: 'Sections' },
]

const defaultForm = {
  title: '', theme: 'modern', phone: '', whatsapp: '', email: '',
  website: '', address: '', mapLink: '', logoUrl: '', tagline: '',
  instagram: '', facebook: '', twitter: '', linkedin: '', youtube: '',
  published: true, sections: [],
}

export default function CardEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(defaultForm)
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState('basic')
  const isEdit = !!id

  useEffect(() => {
    if (isEdit) {
      cardAPI.getAll().then(r => {
        const card = r.data.find(c => c.id === parseInt(id))
        if (card) setForm({ ...defaultForm, ...card, sections: card.sections || [] })
      })
    }
  }, [id])

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }))

  const addSection = () => setForm(f => ({
    ...f, sections: [...f.sections, { type: 'services', title: '', content: '[]', sortOrder: f.sections.length }],
  }))
  const removeSection = i => setForm(f => ({ ...f, sections: f.sections.filter((_, idx) => idx !== i) }))
  const updateSection = (i, field, val) => setForm(f => {
    const s = [...f.sections]; s[i] = { ...s[i], [field]: val }; return { ...f, sections: s }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      isEdit ? await cardAPI.update(id, form) : await cardAPI.create(form)
      toast.success(isEdit ? 'Card updated' : 'Card created')
      navigate('/app/dashboard')
    } catch (err) {
      toast.error(err.response?.data || 'Something went wrong')
    } finally { setLoading(false) }
  }

  const selectedTheme = THEMES.find(t => t.id === form.theme) || THEMES[0]

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <button onClick={() => navigate('/app/dashboard')} className="btn-icon" style={{ width: 40, height: 40 }}>
          <IcoArrow />
        </button>
        <div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.03em' }}>
            {isEdit ? 'Edit Card' : 'New Card'}
          </h1>
          <p style={{ color: 'var(--mist)', fontSize: '0.85rem', marginTop: '0.1rem' }}>
            {isEdit ? 'Update your card details below.' : 'Fill in your business details to get started.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'start' }}>
          <style>{`@media(max-width:900px){.editor-grid{grid-template-columns:1fr !important;}}`}</style>
          <div className="editor-grid" style={{ display: 'contents' }}>

            {/* Left — form */}
            <div>
              {/* Tabs */}
              <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--surface-2)', padding: '0.3rem', borderRadius: 14, marginBottom: '1.5rem', border: '1.5px solid var(--border)' }}>
                {TABS.map(t => (
                  <button key={t.id} type="button" onClick={() => setTab(t.id)} style={{
                    flex: 1, padding: '0.55rem 0.75rem', borderRadius: 10, border: 'none', cursor: 'pointer',
                    fontWeight: 700, fontSize: '0.82rem', transition: 'all 0.15s',
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                    background: tab === t.id ? 'var(--rose)' : 'transparent',
                    color: tab === t.id ? '#fff' : 'var(--mist)',
                    boxShadow: tab === t.id ? '0 2px 8px rgba(247,37,133,0.3)' : 'none',
                  }}>{t.label}</button>
                ))}
              </div>

              <div className="panel">
                {tab === 'basic' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="field-group">
                      <label className="field-label">Business name</label>
                      <input className="field-input" value={form.title} onChange={set('title')} placeholder="Mayur's Bakery" required />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Tagline</label>
                      <input className="field-input" value={form.tagline} onChange={set('tagline')} placeholder="Fresh bakes every day" />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Logo URL</label>
                      <input className="field-input" value={form.logoUrl} onChange={set('logoUrl')} placeholder="https://your-logo.com/logo.png" />
                    </div>
                    <div>
                      <div className="field-label" style={{ marginBottom: '0.75rem' }}>Card theme</div>
                      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                        {THEMES.map(t => (
                          <button key={t.id} type="button" onClick={() => setForm(f => ({ ...f, theme: t.id }))} style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
                            border: form.theme === t.id ? '2px solid var(--rose)' : '2px solid var(--border)',
                            borderRadius: 12, padding: '0.5rem', background: 'transparent', cursor: 'pointer',
                            transition: 'all 0.15s',
                          }}>
                            <div style={{ width: 48, height: 28, borderRadius: 8, background: t.bg }} />
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: form.theme === t.id ? 'var(--rose)' : 'var(--mist)', fontFamily: "'Cabinet Grotesk',sans-serif" }}>{t.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.9rem 1rem', background: 'var(--surface-2)', borderRadius: 12, border: '1.5px solid var(--border)' }}>
                      <div style={{ position: 'relative', width: 44, height: 24 }}>
                        <input type="checkbox" id="pub" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
                          style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
                        <div onClick={() => setForm(f => ({ ...f, published: !f.published }))} style={{
                          width: 44, height: 24, borderRadius: 12, cursor: 'pointer', transition: 'background 0.2s',
                          background: form.published ? 'var(--rose)' : 'var(--border-strong)', position: 'relative',
                        }}>
                          <div style={{
                            position: 'absolute', top: 3, left: form.published ? 23 : 3, width: 18, height: 18,
                            borderRadius: '50%', background: '#fff', transition: 'left 0.2s',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                          }} />
                        </div>
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Published</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--mist)' }}>Visible to anyone with your link</div>
                      </div>
                    </div>
                  </div>
                )}

                {tab === 'contact' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {[
                      ['phone',    'Phone number', '+91 98765 43210'],
                      ['whatsapp', 'WhatsApp number', '+91 98765 43210'],
                      ['email',    'Business email', 'hello@business.com'],
                      ['website',  'Website URL', 'https://yoursite.com'],
                      ['address',  'Address', '123 Market St, Pune'],
                      ['mapLink',  'Google Maps link', 'https://maps.google.com/...'],
                    ].map(([field, label, ph]) => (
                      <div key={field} className="field-group">
                        <label className="field-label">{label}</label>
                        <input className="field-input" value={form[field]} onChange={set(field)} placeholder={ph} />
                      </div>
                    ))}
                  </div>
                )}

                {tab === 'social' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {[
                      ['instagram', 'Instagram', '@yourbusiness'],
                      ['facebook',  'Facebook',  'facebook.com/yourbusiness'],
                      ['twitter',   'Twitter / X', '@yourbusiness'],
                      ['linkedin',  'LinkedIn',  'linkedin.com/in/you'],
                      ['youtube',   'YouTube',   'youtube.com/@channel'],
                    ].map(([field, label, ph]) => (
                      <div key={field} className="field-group">
                        <label className="field-label">{label}</label>
                        <input className="field-input" value={form[field]} onChange={set(field)} placeholder={ph} />
                      </div>
                    ))}
                  </div>
                )}

                {tab === 'sections' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {form.sections.length === 0 && (
                      <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--mist)', fontSize: '0.88rem' }}>
                        No sections yet. Add one to showcase your services, gallery or reviews.
                      </div>
                    )}
                    {form.sections.map((section, i) => (
                      <div key={i} style={{ border: '1.5px solid var(--border)', borderRadius: 14, padding: '1.25rem', background: 'var(--surface-2)' }}>
                        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', alignItems: 'center' }}>
                          <select className="field-input" style={{ flex: 1, width: 'auto' }} value={section.type} onChange={e => updateSection(i, 'type', e.target.value)}>
                            {SECTION_TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                          </select>
                          <button type="button" onClick={() => removeSection(i)} style={{
                            width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: '1.5px solid #fca5a5', borderRadius: 10, background: '#fff5f5', color: '#ef4444', cursor: 'pointer',
                          }}><IcoTrash /></button>
                        </div>
                        <div className="field-group" style={{ marginBottom: '0.75rem' }}>
                          <label className="field-label">Section title</label>
                          <input className="field-input" value={section.title} onChange={e => updateSection(i, 'title', e.target.value)} placeholder="Our Services" />
                        </div>
                        <div className="field-group">
                          <label className="field-label">Content (JSON)</label>
                          <textarea className="field-input" rows={4} style={{ fontFamily: 'monospace', fontSize: '0.78rem', resize: 'vertical' }}
                            value={section.content} onChange={e => updateSection(i, 'content', e.target.value)}
                            placeholder='[{"name":"Haircut","price":"200"},{"name":"Shave","price":"100"}]' />
                        </div>
                      </div>
                    ))}
                    <button type="button" onClick={addSection} style={{
                      width: '100%', padding: '0.85rem', border: '2px dashed var(--border-strong)',
                      borderRadius: 14, background: 'transparent', cursor: 'pointer', color: 'var(--mist)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 700, fontSize: '0.88rem',
                      transition: 'all 0.15s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--rose)'; e.currentTarget.style.color = 'var(--rose)'; e.currentTarget.style.background = 'var(--rose-soft)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--mist)'; e.currentTarget.style.background = 'transparent' }}>
                      <IcoPlus /> Add Section
                    </button>
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-rose" style={{ width: '100%', marginTop: '1.25rem', padding: '0.9rem' }} disabled={loading}>
                {loading ? <span className="spinner" style={{ borderTopColor: '#fff', borderColor: 'rgba(255,255,255,0.3)' }} /> : <><IcoSave /> {isEdit ? 'Save Changes' : 'Create Card'}</>}
              </button>
            </div>

            {/* Right — live preview */}
            <div style={{ position: 'sticky', top: '1.5rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mist)', marginBottom: '0.75rem' }}>Preview</div>
              <div style={{ borderRadius: 20, overflow: 'hidden', border: '1.5px solid var(--border)', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
                <div style={{ background: selectedTheme.bg, padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 12, background: 'rgba(255,255,255,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: '1.1rem', color: '#fff', flexShrink: 0, overflow: 'hidden',
                    }}>
                      {form.logoUrl ? <img src={form.logoUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (form.title?.[0] || 'B')}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#fff' }}>{form.title || 'Business Name'}</div>
                      <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)' }}>{form.tagline || 'Your tagline here'}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    {form.phone && <div style={{ flex: 1, background: 'rgba(255,255,255,0.15)', borderRadius: 8, padding: '0.4rem', textAlign: 'center', fontSize: '0.7rem', color: '#fff', fontWeight: 700 }}>Call</div>}
                    {form.whatsapp && <div style={{ flex: 1, background: 'rgba(37,211,102,0.35)', borderRadius: 8, padding: '0.4rem', textAlign: 'center', fontSize: '0.7rem', color: '#fff', fontWeight: 700 }}>WhatsApp</div>}
                  </div>
                </div>
                <div style={{ background: '#fff', padding: '1rem' }}>
                  {[form.email, form.address, form.website].filter(Boolean).map((v, i) => (
                    <div key={i} style={{ fontSize: '0.75rem', color: 'var(--mist)', padding: '0.35rem 0', borderBottom: i < 1 ? '1px solid var(--border)' : 'none' }}>{v}</div>
                  ))}
                  {!form.email && !form.address && !form.website && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--border-strong)', fontStyle: 'italic' }}>Contact details will appear here</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
