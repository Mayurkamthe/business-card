import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '../services/api'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await authAPI.login(form)
      setAuth({ name: data.name, email: data.email, role: data.role }, data.token)
      toast.success('Welcome back')
      navigate('/app/dashboard')
    } catch {
      toast.error('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--blush)' }}>
      {/* Left panel — brand */}
      <div style={{
        flex: '0 0 44%', background: 'var(--ink)', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', padding: '3rem', position: 'relative', overflow: 'hidden',
      }} className="auth-left">
        <style>{`
          @media (max-width: 768px) { .auth-left { display: none !important; } }
        `}</style>
        {/* decorative rings */}
        <div style={{ position: 'absolute', top: -120, right: -120, width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(247,37,133,0.15)' }} />
        <div style={{ position: 'absolute', top: -60, right: -60, width: 250, height: 250, borderRadius: '50%', border: '1px solid rgba(247,37,133,0.1)' }} />
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(247,37,133,0.12) 0%, transparent 70%)' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: '1.6rem', color: 'var(--rose)', letterSpacing: '-0.03em' }}>CardBiz</span>
          </Link>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="badge badge-rose" style={{ marginBottom: '1.5rem' }}>Digital Business Cards</div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '2.6rem', fontWeight: 900, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Your business,<br />
            <span style={{ fontStyle: 'italic', color: 'var(--rose)' }}>one link.</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 320 }}>
            Create a stunning digital card. Share it anywhere. Let customers call, WhatsApp, and save your contact in one tap.
          </p>
        </div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '1.5rem' }}>
          {[['10k+', 'Business owners'], ['5', 'Card themes'], ['Free', 'To start']].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: '1.5rem', fontWeight: 900, color: '#fff' }}>{val}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>
              <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: '1.4rem', color: 'var(--rose)' }} className="show-mobile-brand">CardBiz</span>
            </Link>
            <style>{`.show-mobile-brand { display: none; } @media (max-width: 768px) { .show-mobile-brand { display: block; } }`}</style>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.4rem' }}>Sign in</h1>
            <p style={{ color: 'var(--mist)', fontSize: '0.9rem' }}>Good to have you back.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="field-group">
              <label className="field-label">Email address</label>
              <input className="field-input" type="email" placeholder="you@business.com"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="field-group">
              <label className="field-label">Password</label>
              <input className="field-input" type="password" placeholder="Your password"
                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
            </div>
            <button className="btn btn-rose" style={{ width: '100%', marginTop: '0.5rem', padding: '0.85rem' }} disabled={loading}>
              {loading ? <span className="spinner" style={{ borderTopColor: '#fff', borderColor: 'rgba(255,255,255,0.3)' }} /> : 'Sign In'}
            </button>
          </form>

          <div style={{ marginTop: '1.75rem', paddingTop: '1.75rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
            <span style={{ color: 'var(--mist)', fontSize: '0.88rem' }}>No account yet? </span>
            <Link to="/register" style={{ color: 'var(--rose)', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none' }}>Create one free</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
