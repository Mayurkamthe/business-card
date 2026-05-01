import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CardEditor from './pages/CardEditor'
import Analytics from './pages/Analytics'
import PublicCard from './pages/PublicCard'
import AdminPanel from './pages/AdminPanel'
import Layout from './components/layout/Layout'

function PrivateRoute({ children }) {
  const token = useAuthStore((s) => s.token)
  return token ? children : <Navigate to="/login" />
}

function AdminRoute({ children }) {
  const user = useAuthStore((s) => s.user)
  return user?.role === 'ADMIN' ? children : <Navigate to="/dashboard" />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/c/:slug" element={<PublicCard />} />
      <Route path="/app" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index element={<Navigate to="/app/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="cards/new" element={<CardEditor />} />
        <Route path="cards/:id/edit" element={<CardEditor />} />
        <Route path="cards/:id/analytics" element={<Analytics />} />
        <Route path="admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
      </Route>
    </Routes>
  )
}
