import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cardAPI } from '../services/api'
import { useAuthStore } from '../store/authStore'
import { Plus, ExternalLink, Edit2, Trash2, BarChart2, QrCode, Copy } from 'lucide-react'
import toast from 'react-hot-toast'

const THEMES = {
  modern: 'bg-gradient-to-br from-indigo-500 to-purple-600',
  ocean: 'bg-gradient-to-br from-blue-500 to-cyan-400',
  forest: 'bg-gradient-to-br from-green-500 to-emerald-600',
  sunset: 'bg-gradient-to-br from-orange-500 to-pink-500',
  dark: 'bg-gradient-to-br from-slate-800 to-slate-900',
}

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
    toast.success('Link copied!')
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">My Cards</h1>
          <p className="text-slate-500 mt-1">Welcome back, {user?.name} 👋</p>
        </div>
        <Link to="/app/cards/new" className="btn-primary flex items-center gap-2">
          <Plus size={18} /> New Card
        </Link>
      </div>

      {cards.length === 0 ? (
        <div className="card text-center py-16">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <QrCode size={32} className="text-primary" />
          </div>
          <h3 className="font-display text-xl font-bold mb-2">No cards yet</h3>
          <p className="text-slate-500 mb-6">Create your first digital business card</p>
          <Link to="/app/cards/new" className="btn-primary inline-flex items-center gap-2">
            <Plus size={18} /> Create Card
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(card => (
            <div key={card.id} className="card overflow-hidden p-0">
              {/* Card preview */}
              <div className={`${THEMES[card.theme] || THEMES.modern} p-6 text-white`}>
                <div className="flex items-center gap-3">
                  {card.logoUrl ? (
                    <img src={card.logoUrl} alt="" className="w-12 h-12 rounded-xl object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl font-bold">
                      {card.title?.[0]}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-lg leading-tight">{card.title}</h3>
                    {card.tagline && <p className="text-white/70 text-sm">{card.tagline}</p>}
                  </div>
                </div>
                {card.phone && <p className="mt-3 text-white/80 text-sm">📞 {card.phone}</p>}
              </div>

              {/* Actions */}
              <div className="p-4">
                <div className="flex items-center gap-1 mb-3">
                  <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-lg flex-1 truncate font-mono">
                    /{card.slug}
                  </span>
                  <button onClick={() => copyLink(card.slug)} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                    <Copy size={14} className="text-slate-500" />
                  </button>
                  <a href={`/c/${card.slug}`} target="_blank" rel="noopener noreferrer"
                    className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                    <ExternalLink size={14} className="text-slate-500" />
                  </a>
                </div>
                <div className="flex gap-2">
                  <Link to={`/app/cards/${card.id}/edit`} className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors">
                    <Edit2 size={14} /> Edit
                  </Link>
                  <Link to={`/app/cards/${card.id}/analytics`} className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                    <BarChart2 size={14} /> Stats
                  </Link>
                  <button onClick={() => handleDelete(card.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
