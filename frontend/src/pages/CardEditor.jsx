import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { cardAPI } from '../services/api'
import toast from 'react-hot-toast'
import { Plus, Trash2, Save, ArrowLeft } from 'lucide-react'

const THEMES = [
  { id: 'modern', label: 'Modern', class: 'from-indigo-500 to-purple-600' },
  { id: 'ocean', label: 'Ocean', class: 'from-blue-500 to-cyan-400' },
  { id: 'forest', label: 'Forest', class: 'from-green-500 to-emerald-600' },
  { id: 'sunset', label: 'Sunset', class: 'from-orange-500 to-pink-500' },
  { id: 'dark', label: 'Dark', class: 'from-slate-800 to-slate-900' },
]

const SECTION_TYPES = ['services', 'gallery', 'reviews', 'about']

const defaultForm = {
  title: '', slug: '', theme: 'modern', phone: '', whatsapp: '', email: '',
  website: '', address: '', mapLink: '', logoUrl: '', tagline: '',
  instagram: '', facebook: '', twitter: '', linkedin: '', youtube: '',
  isPublished: true, sections: []
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
        if (card) setForm({ ...defaultForm, ...card })
      })
    }
  }, [id])

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const addSection = () => {
    setForm(f => ({ ...f, sections: [...f.sections, { type: 'services', title: '', content: '[]', sortOrder: f.sections.length }] }))
  }

  const removeSection = (i) => {
    setForm(f => ({ ...f, sections: f.sections.filter((_, idx) => idx !== i) }))
  }

  const updateSection = (i, field, val) => {
    setForm(f => {
      const sections = [...f.sections]
      sections[i] = { ...sections[i], [field]: val }
      return { ...f, sections }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (isEdit) {
        await cardAPI.update(id, form)
        toast.success('Card updated!')
      } else {
        await cardAPI.create(form)
        toast.success('Card created!')
      }
      navigate('/app/dashboard')
    } catch (err) {
      toast.error(err.response?.data || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const tabs = ['basic', 'contact', 'social', 'sections']

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/app/dashboard')} className="p-2 hover:bg-slate-100 rounded-xl">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-display text-3xl font-bold">{isEdit ? 'Edit Card' : 'New Card'}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl mb-6">
          {tabs.map(t => (
            <button key={t} type="button" onClick={() => setTab(t)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition-all ${tab === t ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'}`}>
              {t}
            </button>
          ))}
        </div>

        {tab === 'basic' && (
          <div className="card space-y-4">
            <div>
              <label className="label">Business Name *</label>
              <input className="input" value={form.title} onChange={set('title')} placeholder="Mayur's Bakery" required />
            </div>
            <div>
              <label className="label">Tagline</label>
              <input className="input" value={form.tagline} onChange={set('tagline')} placeholder="Fresh bakes every day" />
            </div>
            <div>
              <label className="label">Logo URL</label>
              <input className="input" value={form.logoUrl} onChange={set('logoUrl')} placeholder="https://..." />
            </div>
            <div>
              <label className="label">Theme</label>
              <div className="grid grid-cols-5 gap-2 mt-2">
                {THEMES.map(t => (
                  <button key={t.id} type="button" onClick={() => setForm(f => ({ ...f, theme: t.id }))}
                    className={`h-10 rounded-xl bg-gradient-to-br ${t.class} transition-all ${form.theme === t.id ? 'ring-2 ring-offset-2 ring-primary' : 'opacity-70 hover:opacity-100'}`}
                    title={t.label} />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="published" checked={form.isPublished}
                onChange={e => setForm(f => ({ ...f, isPublished: e.target.checked }))}
                className="w-4 h-4 accent-primary" />
              <label htmlFor="published" className="text-sm font-medium text-slate-600">Published (visible to public)</label>
            </div>
          </div>
        )}

        {tab === 'contact' && (
          <div className="card space-y-4">
            {[
              ['phone', 'Phone Number', '+91 98765 43210'],
              ['whatsapp', 'WhatsApp Number', '+91 98765 43210'],
              ['email', 'Email', 'business@example.com'],
              ['website', 'Website URL', 'https://yoursite.com'],
              ['address', 'Address', '123 Market St, Pune'],
              ['mapLink', 'Google Maps Link', 'https://maps.google.com/...'],
            ].map(([field, label, placeholder]) => (
              <div key={field}>
                <label className="label">{label}</label>
                <input className="input" value={form[field]} onChange={set(field)} placeholder={placeholder} />
              </div>
            ))}
          </div>
        )}

        {tab === 'social' && (
          <div className="card space-y-4">
            {[
              ['instagram', 'Instagram', '@yourbusiness'],
              ['facebook', 'Facebook', 'facebook.com/yourbusiness'],
              ['twitter', 'Twitter / X', '@yourbusiness'],
              ['linkedin', 'LinkedIn', 'linkedin.com/in/you'],
              ['youtube', 'YouTube', 'youtube.com/@channel'],
            ].map(([field, label, placeholder]) => (
              <div key={field}>
                <label className="label">{label}</label>
                <input className="input" value={form[field]} onChange={set(field)} placeholder={placeholder} />
              </div>
            ))}
          </div>
        )}

        {tab === 'sections' && (
          <div className="space-y-4">
            {form.sections.map((section, i) => (
              <div key={i} className="card space-y-3">
                <div className="flex items-center justify-between">
                  <select className="input w-auto" value={section.type} onChange={e => updateSection(i, 'type', e.target.value)}>
                    {SECTION_TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                  </select>
                  <button type="button" onClick={() => removeSection(i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div>
                  <label className="label">Section Title</label>
                  <input className="input" value={section.title} onChange={e => updateSection(i, 'title', e.target.value)} placeholder="Our Services" />
                </div>
                <div>
                  <label className="label">Content (JSON)</label>
                  <textarea className="input min-h-[100px] font-mono text-xs" value={section.content}
                    onChange={e => updateSection(i, 'content', e.target.value)}
                    placeholder='[{"name":"Haircut","price":"₹200"},{"name":"Shave","price":"₹100"}]' />
                </div>
              </div>
            ))}
            <button type="button" onClick={addSection}
              className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2 text-sm font-medium">
              <Plus size={16} /> Add Section
            </button>
          </div>
        )}

        <button type="submit" className="btn-primary w-full mt-6 flex items-center justify-center gap-2" disabled={loading}>
          <Save size={18} /> {loading ? 'Saving...' : isEdit ? 'Update Card' : 'Create Card'}
        </button>
      </form>
    </div>
  )
}
