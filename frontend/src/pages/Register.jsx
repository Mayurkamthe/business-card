import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '../services/api'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await authAPI.register(form)
      setAuth({ name: data.name, email: data.email, role: data.role }, data.token)
      toast.success('Account created')
      navigate('/app/dashboard')
    } catch (err) {
      toast.error(err.response?.data || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--blush)' }}>
      <style>{`@media (max-width: 768px) { .auth-left { display: none !important; } .show-mobile-brand { display: block !important; } } .show-mobile-brand { display: none; }`}</style>
      {/* Left panel */}
      <div className="auth-left" style={{
        flex: '0 0 44%', background: 'var(--ink)', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', padding: '3rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -120, right: -120, width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(247,37,133,0.15)' }} />
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(247,37,133,0.12) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: '1.6rem', color: 'var(--rose)', letterSpacing: '-0.03em' }}>CardBiz</span>
          </Link>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="badge badge-rose" style={{ marginBottom: '1.5rem' }}>Join Free Today</div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '2.6rem', fontWeight: 900, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Start sharing<br />
            <span style={{ fontStyle: 'italic', color: 'var(--rose)' }}>smarter.</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 320 }}>
            Replace paper cards forever. Set up your digital card in under 3 minutes and start sharing instantly.
          </p>
        </div>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {['No credit card required', 'Your own shareable link', 'QR code included free'].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7.5" fill="rgba(247,37,133,0.2)" stroke="var(--rose)" strokeWidth="0.5"/>
                <path d="M5 8l2 2 4-4" stroke="var(--rose)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>
              <span className="show-mobile-brand" style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: '1.4rem', color: 'var(--rose)' }}>CardBiz</span>
            </Link>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.4rem' }}>Create account</h1>
            <p style={{ color: 'var(--mist)', fontSize: '0.9rem' }}>Free forever. No card needed.</p>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="field-group">
              <label className="field-label">Full name</label>
              <input className="field-input" placeholder="Mayur Kamthe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="field-group">
              <label className="field-label">Email address</label>
              <input className="field-input" type="email" placeholder="you@business.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="field-group">
              <label className="field-label">Password</label>
              <input className="field-input" type="password" placeholder="Min 6 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required minLength={6} />
            </div>
            <button className="btn btn-rose" style={{ width: '100%', marginTop: '0.5rem', padding: '0.85rem' }} disabled={loading}>
              {loading ? <span className="spinner" style={{ borderTopColor: '#fff', borderColor: 'rgba(255,255,255,0.3)' }} /> : 'Create Free Account'}
            </button>
          </form>
          <div style={{ marginTop: '1.75rem', paddingTop: '1.75rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
            <span style={{ color: 'var(--mist)', fontSize: '0.88rem' }}>Already have an account? </span>
            <Link to="/login" style={{ color: 'var(--rose)', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none' }}>Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
