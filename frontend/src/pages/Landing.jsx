import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how' },
  { label: 'Pricing', href: '#pricing' },
]

const FEATURES = [
  {
    title: 'Digital Business Card',
    desc: 'Everything on one page. Name, phone, WhatsApp, address, social links — clean and professional.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="7" width="24" height="14" rx="3" stroke="#e91e8c" strokeWidth="2"/>
        <path d="M2 11h24" stroke="#e91e8c" strokeWidth="2"/>
        <rect x="6" y="15" width="6" height="2" rx="1" fill="#e91e8c"/>
      </svg>
    ),
  },
  {
    title: 'Shareable Link',
    desc: 'Get your own URL like cardbiz.app/your-name. Share it anywhere — Instagram bio, WhatsApp, email.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="20" cy="8" r="3" stroke="#e91e8c" strokeWidth="2"/>
        <circle cx="8" cy="14" r="3" stroke="#e91e8c" strokeWidth="2"/>
        <circle cx="20" cy="20" r="3" stroke="#e91e8c" strokeWidth="2"/>
        <path d="M11 12.5l6-3M11 15.5l6 3" stroke="#e91e8c" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'QR Code',
    desc: 'Auto-generated QR code for your card. Print it, display it, let customers scan and connect instantly.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="3" width="9" height="9" rx="1.5" stroke="#e91e8c" strokeWidth="2"/>
        <rect x="16" y="3" width="9" height="9" rx="1.5" stroke="#e91e8c" strokeWidth="2"/>
        <rect x="3" y="16" width="9" height="9" rx="1.5" stroke="#e91e8c" strokeWidth="2"/>
        <rect x="6" y="6" width="3" height="3" rx="0.5" fill="#e91e8c"/>
        <rect x="19" y="6" width="3" height="3" rx="0.5" fill="#e91e8c"/>
        <rect x="6" y="19" width="3" height="3" rx="0.5" fill="#e91e8c"/>
        <rect x="16" y="16" width="3" height="3" rx="0.5" fill="#e91e8c"/>
        <rect x="21" y="16" width="4" height="2" rx="0.5" fill="#e91e8c"/>
        <rect x="16" y="21" width="2" height="4" rx="0.5" fill="#e91e8c"/>
        <rect x="20" y="20" width="5" height="5" rx="0.5" fill="#e91e8c" opacity="0.3"/>
      </svg>
    ),
  },
  {
    title: 'Click Analytics',
    desc: 'See how many people viewed your card, clicked WhatsApp, or called you — every day.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 22V16" stroke="#e91e8c" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 22V10" stroke="#e91e8c" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 22V14" stroke="#e91e8c" strokeWidth="2" strokeLinecap="round"/>
        <path d="M22 22V6" stroke="#e91e8c" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Save to Contacts',
    desc: 'One tap to save your details into their phone. No typing. No lost paper cards.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="11" r="4" stroke="#e91e8c" strokeWidth="2"/>
        <path d="M6 23c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#e91e8c" strokeWidth="2" strokeLinecap="round"/>
        <path d="M19 4l2 2 4-4" stroke="#e91e8c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Custom Sections',
    desc: 'Add your services with prices, photo gallery, or customer reviews. Your card, your content.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="5" width="22" height="4" rx="2" stroke="#e91e8c" strokeWidth="2"/>
        <rect x="3" y="13" width="14" height="4" rx="2" stroke="#e91e8c" strokeWidth="2"/>
        <rect x="3" y="21" width="18" height="4" rx="2" stroke="#e91e8c" strokeWidth="2"/>
      </svg>
    ),
  },
]

const STEPS = [
  { num: '01', title: 'Sign Up Free', desc: 'Create your account in seconds. No credit card required.' },
  { num: '02', title: 'Fill Your Details', desc: 'Add your business name, phone, WhatsApp, address and social links.' },
  { num: '03', title: 'Pick a Theme', desc: 'Choose from five beautiful card themes that match your brand.' },
  { num: '04', title: 'Share Everywhere', desc: 'Copy your link, download your QR code, and start connecting.' },
]

const PLANS = [
  {
    name: 'Free',
    price: '0',
    period: 'forever',
    desc: 'Perfect to get started.',
    features: ['1 digital card', 'Shareable link', 'QR code download', 'Save to contacts', 'Basic analytics'],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '199',
    period: 'per month',
    desc: 'For serious business owners.',
    features: ['Unlimited cards', 'Custom slug', 'Advanced analytics', 'All 5 themes', 'Services & gallery sections', 'Priority support'],
    cta: 'Start Pro',
    highlight: true,
  },
  {
    name: 'Business',
    price: '499',
    period: 'per month',
    desc: 'For teams and agencies.',
    features: ['Everything in Pro', 'Custom domain', 'Team members', 'White-label branding', 'API access', 'Dedicated support'],
    cta: 'Contact Us',
    highlight: false,
  },
]

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const [heroRef, heroIn] = useInView(0.1)
  const [featRef, featIn] = useInView(0.1)
  const [howRef, howIn] = useInView(0.1)
  const [priceRef, priceIn] = useInView(0.1)

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#fff', color: '#1a0a0f', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --pink: #e91e8c;
          --pink-light: #fce4f3;
          --pink-mid: #f8b4df;
          --pink-dark: #c0166f;
          --white: #ffffff;
          --off: #fdf5fa;
          --text: #1a0a0f;
          --muted: #7a4f62;
        }

        html { scroll-behavior: smooth; }

        .fade-up {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .fade-up.d1 { transition-delay: 0.1s; }
        .fade-up.d2 { transition-delay: 0.2s; }
        .fade-up.d3 { transition-delay: 0.3s; }
        .fade-up.d4 { transition-delay: 0.4s; }
        .fade-up.d5 { transition-delay: 0.5s; }
        .fade-up.d6 { transition-delay: 0.6s; }

        nav { transition: background 0.3s, box-shadow 0.3s; }
        nav.scrolled { background: rgba(255,255,255,0.96); box-shadow: 0 1px 0 #fce4f3; backdrop-filter: blur(12px); }

        .nav-link {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
          padding: 0.25rem 0;
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 2px;
          background: var(--pink);
          transition: width 0.25s ease;
          border-radius: 2px;
        }
        .nav-link:hover { color: var(--pink); }
        .nav-link:hover::after { width: 100%; }

        .btn-pink {
          background: var(--pink);
          color: #fff;
          border: none;
          padding: 0.75rem 1.75rem;
          border-radius: 100px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(233,30,140,0.3);
          font-family: 'DM Sans', sans-serif;
        }
        .btn-pink:hover { background: var(--pink-dark); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(233,30,140,0.4); }
        .btn-pink:active { transform: translateY(0); }

        .btn-outline-pink {
          background: transparent;
          color: var(--pink);
          border: 2px solid var(--pink);
          padding: 0.7rem 1.6rem;
          border-radius: 100px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-outline-pink:hover { background: var(--pink); color: #fff; }

        .display { font-family: 'Playfair Display', Georgia, serif; font-weight: 900; line-height: 1.08; letter-spacing: -0.02em; }

        .section-label {
          display: inline-block;
          background: var(--pink-light);
          color: var(--pink);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.35rem 0.9rem;
          border-radius: 100px;
          margin-bottom: 1.2rem;
        }

        .feature-card {
          background: #fff;
          border: 1.5px solid #f3d6ea;
          border-radius: 20px;
          padding: 2rem;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .feature-card:hover {
          border-color: var(--pink);
          box-shadow: 0 8px 32px rgba(233,30,140,0.1);
          transform: translateY(-4px);
        }

        .step-num {
          font-family: 'Playfair Display', serif;
          font-size: 3.5rem;
          font-weight: 900;
          color: var(--pink-mid);
          line-height: 1;
        }

        .plan-card {
          background: #fff;
          border: 1.5px solid #f3d6ea;
          border-radius: 24px;
          padding: 2.5rem 2rem;
          position: relative;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .plan-card:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(233,30,140,0.12); }
        .plan-card.featured {
          background: var(--pink);
          border-color: var(--pink);
          color: #fff;
        }
        .plan-card.featured .plan-price { color: #fff; }
        .plan-card.featured .plan-period { color: rgba(255,255,255,0.7); }
        .plan-card.featured .plan-desc { color: rgba(255,255,255,0.8); }
        .plan-card.featured .plan-feature { color: rgba(255,255,255,0.9); }
        .plan-card.featured .plan-check { color: #fff; }

        .plan-check { color: var(--pink); font-weight: 600; margin-right: 0.5rem; }

        .badge {
          position: absolute;
          top: -14px; left: 50%;
          transform: translateX(-50%);
          background: var(--text);
          color: #fff;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.3rem 1rem;
          border-radius: 100px;
          white-space: nowrap;
        }

        .mockup-card {
          background: linear-gradient(135deg, #e91e8c 0%, #c0166f 100%);
          border-radius: 24px;
          padding: 2rem;
          color: #fff;
          box-shadow: 0 24px 64px rgba(233,30,140,0.35);
          max-width: 300px;
          width: 100%;
        }

        .mockup-btn {
          flex: 1;
          background: rgba(255,255,255,0.18);
          border: none;
          color: #fff;
          padding: 0.6rem;
          border-radius: 10px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
        }

        .pill {
          display: inline-block;
          background: var(--pink-light);
          color: var(--pink);
          padding: 0.3rem 0.8rem;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .divider {
          width: 48px; height: 3px;
          background: var(--pink);
          border-radius: 2px;
          margin: 1rem 0 1.5rem;
        }

        .mobile-menu {
          position: fixed;
          inset: 0;
          background: #fff;
          z-index: 200;
          display: flex;
          flex-direction: column;
          padding: 2rem;
          gap: 2rem;
          transform: translateX(100%);
          transition: transform 0.3s ease;
        }
        .mobile-menu.open { transform: translateX(0); }

        @media (max-width: 768px) {
          .hero-grid { flex-direction: column; }
          .features-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .hide-mobile { display: none !important; }
          .hero-text h1 { font-size: clamp(2.8rem, 10vw, 4rem) !important; }
          .nav-links-desktop { display: none !important; }
          .btn-login-desktop { display: none !important; }
        }

        @media (min-width: 769px) {
          .hamburger-btn { display: none !important; }
          .pricing-grid { align-items: stretch; }
        }
      `}</style>

      {/* NAV */}
      <nav className={scrolled ? 'scrolled' : ''} style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '1.1rem 0',
      }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="display" style={{ fontSize: '1.5rem', color: 'var(--pink)' }}>CardBiz</span>
          <div className="nav-links-desktop" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {NAV_LINKS.map(l => <a key={l.label} href={l.href} className="nav-link">{l.label}</a>)}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Link to="/login" className="btn-outline-pink btn-login-desktop" style={{ padding: '0.5rem 1.25rem', fontSize: '0.88rem' }}>Login</Link>
            <Link to="/register" className="btn-pink" style={{ padding: '0.55rem 1.3rem', fontSize: '0.88rem' }}>Get Started</Link>
            <button onClick={() => setMenuOpen(true)} className="hamburger-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 6h16M3 11h16M3 16h10" stroke="var(--pink)" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="display" style={{ fontSize: '1.4rem', color: 'var(--pink)' }}>CardBiz</span>
          <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="#1a0a0f" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
              style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text)', textDecoration: 'none', fontFamily: "'Playfair Display', serif" }}>
              {l.label}
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 'auto' }}>
          <Link to="/login" className="btn-outline-pink" style={{ textAlign: 'center' }} onClick={() => setMenuOpen(false)}>Login</Link>
          <Link to="/register" className="btn-pink" style={{ textAlign: 'center' }} onClick={() => setMenuOpen(false)}>Get Started Free</Link>
        </div>
      </div>

      {/* HERO */}
      <section ref={heroRef} style={{ paddingTop: '7rem', paddingBottom: '5rem', background: 'var(--off)', position: 'relative', overflow: 'hidden' }}>
        {/* Background blobs */}
        <div style={{ position: 'absolute', top: '-80px', right: '-100px', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(233,30,140,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle, rgba(233,30,140,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="hero-grid" style={{ display: 'flex', alignItems: 'center', gap: '4rem' }}>

            {/* LEFT */}
            <div className="hero-text" style={{ flex: 1 }}>
              <div className={`fade-up ${heroIn ? 'visible' : ''}`}>
                <span className="section-label">Digital Business Cards</span>
              </div>
              <h1 className={`display fade-up ${heroIn ? 'visible d1' : ''}`}
                style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: 'var(--text)', marginBottom: '1.5rem', marginTop: '0.25rem' }}>
                Your business,<br />
                <span style={{ color: 'var(--pink)' }}>one link away.</span>
              </h1>
              <p className={`fade-up ${heroIn ? 'visible d2' : ''}`}
                style={{ fontSize: '1.1rem', color: 'var(--muted)', lineHeight: 1.7, maxWidth: 480, marginBottom: '2.5rem' }}>
                Create a stunning digital business card in minutes. Share your link, let customers call, WhatsApp, and save your contact — all from one page.
              </p>
              <div className={`fade-up ${heroIn ? 'visible d3' : ''}`} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <Link to="/register" className="btn-pink" style={{ fontSize: '1rem', padding: '0.85rem 2rem' }}>Create Your Card</Link>
                <a href="#how" className="btn-outline-pink" style={{ fontSize: '1rem', padding: '0.82rem 1.8rem' }}>See How It Works</a>
              </div>
              <div className={`fade-up ${heroIn ? 'visible d4' : ''}`} style={{ display: 'flex', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap' }}>
                {[['Free to start', ''], ['5 card themes', ''], ['QR code included', '']].map(([label]) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" fill="var(--pink-light)"/>
                      <path d="M5 8l2 2 4-4" stroke="var(--pink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 500 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — card mockup */}
            <div className={`fade-up ${heroIn ? 'visible d2' : ''} hide-mobile`} style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ position: 'relative' }}>
                {/* decorative ring */}
                <div style={{ position: 'absolute', inset: -20, borderRadius: 44, border: '1.5px dashed rgba(233,30,140,0.25)', pointerEvents: 'none' }} />
                <div className="mockup-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 900, fontFamily: "'Playfair Display', serif" }}>M</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Mayur's Salon</div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.75 }}>Beauty and grooming</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                    {['Phone: +91 98765 43210', 'Pune, Maharashtra', 'mayur-salon.cardbiz.app'].map(t => (
                      <div key={t} style={{ fontSize: '0.82rem', opacity: 0.85, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.6)', display: 'inline-block', flexShrink: 0 }} />
                        {t}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <button className="mockup-btn">Call</button>
                    <button className="mockup-btn" style={{ background: 'rgba(37,211,102,0.35)' }}>WhatsApp</button>
                    <button className="mockup-btn">Save</button>
                  </div>
                </div>
              </div>
              {/* floating pills */}
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 300 }}>
                <span className="pill">247 views this week</span>
                <span className="pill">QR ready</span>
                <span className="pill">Shared 18 times</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" ref={featRef} style={{ padding: '6rem 0', background: '#fff' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className={`section-label fade-up ${featIn ? 'visible' : ''}`}>What You Get</span>
            <h2 className={`display fade-up ${featIn ? 'visible d1' : ''}`} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: '0.5rem' }}>
              Everything a business owner needs
            </h2>
          </div>
          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {FEATURES.map((f, i) => (
              <div key={f.title} className={`feature-card fade-up ${featIn ? `visible d${i + 1}` : ''}`}>
                <div style={{ width: 52, height: 52, background: 'var(--pink-light)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                  {f.icon}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.6rem' }}>{f.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" ref={howRef} style={{ padding: '6rem 0', background: 'var(--off)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className={`section-label fade-up ${howIn ? 'visible' : ''}`}>Simple Process</span>
            <h2 className={`display fade-up ${howIn ? 'visible d1' : ''}`} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: '0.5rem' }}>
              Live in under 3 minutes
            </h2>
          </div>
          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
            {STEPS.map((s, i) => (
              <div key={s.num} className={`fade-up ${howIn ? `visible d${i + 1}` : ''}`} style={{ position: 'relative' }}>
                {i < STEPS.length - 1 && (
                  <div className="hide-mobile" style={{ position: 'absolute', top: 28, left: '60%', right: '-40%', height: 1, background: 'linear-gradient(90deg, var(--pink-mid), transparent)', zIndex: 0 }} />
                )}
                <div className="step-num">{s.num}</div>
                <div className="divider" />
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>{s.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" ref={priceRef} style={{ padding: '6rem 0', background: '#fff' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className={`section-label fade-up ${priceIn ? 'visible' : ''}`}>Pricing</span>
            <h2 className={`display fade-up ${priceIn ? 'visible d1' : ''}`} style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: '0.5rem' }}>
              Start free, grow when ready
            </h2>
            <p className={`fade-up ${priceIn ? 'visible d2' : ''}`} style={{ color: 'var(--muted)', marginTop: '0.75rem', fontSize: '1rem' }}>
              No hidden charges. Cancel anytime.
            </p>
          </div>
          <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', alignItems: 'center' }}>
            {PLANS.map((p, i) => (
              <div key={p.name} className={`plan-card ${p.highlight ? 'featured' : ''} fade-up ${priceIn ? `visible d${i + 1}` : ''}`}
                style={p.highlight ? { transform: 'scale(1.04)' } : {}}>
                {p.highlight && <div className="badge">Most Popular</div>}
                <div style={{ marginBottom: '0.3rem', fontWeight: 700, fontSize: '0.95rem', opacity: p.highlight ? 0.9 : 1 }}>{p.name}</div>
                <div className="plan-price display" style={{ fontSize: '2.8rem', lineHeight: 1 }}>
                  {p.price === '0' ? 'Free' : <>&#8377;{p.price}</>}
                </div>
                <div className="plan-period" style={{ fontSize: '0.82rem', color: p.highlight ? 'rgba(255,255,255,0.7)' : 'var(--muted)', marginBottom: '0.75rem' }}>{p.period}</div>
                <div className="plan-desc" style={{ fontSize: '0.88rem', color: p.highlight ? 'rgba(255,255,255,0.8)' : 'var(--muted)', marginBottom: '1.75rem' }}>{p.desc}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '2rem' }}>
                  {p.features.map(f => (
                    <div key={f} className="plan-feature" style={{ fontSize: '0.88rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: p.highlight ? 'rgba(255,255,255,0.9)' : 'var(--text)' }}>
                      <span className="plan-check" style={{ color: p.highlight ? '#fff' : 'var(--pink)', flexShrink: 0, marginTop: '0.05rem' }}>&#10003;</span>
                      {f}
                    </div>
                  ))}
                </div>
                <Link to="/register"
                  style={{
                    display: 'block', textAlign: 'center',
                    padding: '0.8rem',
                    borderRadius: 100,
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    fontFamily: "'DM Sans', sans-serif",
                    background: p.highlight ? '#fff' : 'var(--pink)',
                    color: p.highlight ? 'var(--pink)' : '#fff',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: '5rem 0', background: 'var(--pink)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: 320, height: 320, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '10%', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
          <h2 className="display" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', marginBottom: '1rem' }}>
            Ready to go digital?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.65 }}>
            Join thousands of business owners who have replaced paper cards with a smarter, shareable digital presence.
          </p>
          <Link to="/register" style={{
            background: '#fff', color: 'var(--pink)', textDecoration: 'none',
            padding: '0.9rem 2.5rem', borderRadius: 100,
            fontWeight: 700, fontSize: '1.05rem',
            fontFamily: "'DM Sans', sans-serif",
            display: 'inline-block',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.15)' }}
          >
            Create Your Free Card
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--text)', color: 'rgba(255,255,255,0.55)', padding: '3rem 0' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div className="display" style={{ fontSize: '1.4rem', color: 'var(--pink)', marginBottom: '0.4rem' }}>CardBiz</div>
            <div style={{ fontSize: '0.82rem' }}>Digital business cards for everyone.</div>
          </div>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--pink)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                {l.label}
              </a>
            ))}
          </div>
          <div style={{ fontSize: '0.8rem' }}>
            &copy; {new Date().getFullYear()} CardBiz. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
