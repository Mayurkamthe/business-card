import { useEffect, useState } from 'react'
import { adminAPI } from '../services/api'
import { Trash2, Users, CreditCard, Shield } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminPanel() {
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    adminAPI.getStats().then(r => setStats(r.data))
    adminAPI.getUsers().then(r => setUsers(r.data))
  }, [])

  const handleDeleteUser = async (id) => {
    if (!confirm('Delete this user?')) return
    await adminAPI.deleteUser(id)
    setUsers(users.filter(u => u.id !== id))
    toast.success('User deleted')
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <Shield size={20} className="text-primary" />
        </div>
        <h1 className="font-display text-3xl font-bold">Admin Panel</h1>
      </div>

      {stats && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="card flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <Users size={22} className="text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold font-display">{stats.totalUsers}</p>
              <p className="text-sm text-slate-500">Total Users</p>
            </div>
          </div>
          <div className="card flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <CreditCard size={22} className="text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold font-display">{stats.totalCards}</p>
              <p className="text-sm text-slate-500">Total Cards</p>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <h2 className="font-display text-xl font-bold mb-4">All Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-3 text-slate-500 font-medium">Name</th>
                <th className="text-left py-3 text-slate-500 font-medium">Email</th>
                <th className="text-left py-3 text-slate-500 font-medium">Role</th>
                <th className="text-left py-3 text-slate-500 font-medium">Joined</th>
                <th className="py-3" />
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="py-3 font-medium">{user.name}</td>
                  <td className="py-3 text-slate-500">{user.email}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${user.role === 'ADMIN' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-600'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 text-slate-400">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="py-3">
                    {user.role !== 'ADMIN' && (
                      <button onClick={() => handleDeleteUser(user.id)}
                        className="p-1.5 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={15} />
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
