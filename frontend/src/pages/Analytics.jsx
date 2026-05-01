import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { analyticsAPI } from '../services/api'
import { ArrowLeft, Eye, MessageCircle, Phone, MousePointer } from 'lucide-react'

export default function Analytics() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)

  useEffect(() => {
    analyticsAPI.get(id).then(r => setData(r.data))
  }, [id])

  if (!data) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const stats = [
    { label: 'Total Views', value: data.totalViews || 0, icon: Eye, color: 'text-blue-500 bg-blue-50' },
    { label: 'WhatsApp Clicks', value: data.totalWhatsappClicks || 0, icon: MessageCircle, color: 'text-green-500 bg-green-50' },
    { label: 'Phone Clicks', value: data.totalPhoneClicks || 0, icon: Phone, color: 'text-purple-500 bg-purple-50' },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-slate-100 rounded-xl">
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-display text-3xl font-bold">Analytics</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
              <Icon size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold font-display">{value.toLocaleString()}</p>
              <p className="text-sm text-slate-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="font-display text-xl font-bold mb-4">Daily Activity (Last 30 Days)</h2>
        {data.last30Days?.length === 0 ? (
          <p className="text-slate-400 text-center py-8">No data yet. Share your card to start tracking!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-3 text-slate-500 font-medium">Date</th>
                  <th className="text-right py-3 text-slate-500 font-medium">Views</th>
                  <th className="text-right py-3 text-slate-500 font-medium">WhatsApp</th>
                  <th className="text-right py-3 text-slate-500 font-medium">Phone</th>
                </tr>
              </thead>
              <tbody>
                {data.last30Days?.map((row, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="py-3 text-slate-700">{row.eventDate}</td>
                    <td className="py-3 text-right font-medium">{row.viewCount}</td>
                    <td className="py-3 text-right font-medium text-green-600">{row.whatsappClicks}</td>
                    <td className="py-3 text-right font-medium text-purple-600">{row.phoneClicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
