import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

/* ── Inline SVG icons ── */
const IcoCheck = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="6.5" fill="rgba(247,37,133,0.12)" stroke="var(--rose)" strokeWidth="0.8"/>
    <path d="M4.5 7l2 2 3-3" stroke="var(--rose)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const IcoArrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 5l4 3-4 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const IcoMenu = () => (
  <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
    <path d="M1 1h20M1 8h14M1 15h17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)
const IcoX = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

/* ── Features data ── */
const FEATURES = [
  {
    title: 'Shareable Link',
    desc: 'Your own URL — cardbiz.app/your-name. Share it on Instagram, WhatsApp, email, anywhere.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'QR Code',
    desc: 'Auto-generated QR code for every card. Print it on your counter, packaging, or receipts.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="14" y="2" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="2" y="14" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="4.5" y="4.5" width="3" height="3" rx="0.5" fill="currentColor"/>
        <rect x="16.5" y="4.5" width="3" height="3" rx="0.5" fill="currentColor"/>
        <rect x="4.5" y="16.5" width="3" height="3" rx="0.5" fill="currentColor"/>
        <rect x="14" y="14" width="3" height="3" rx="0.5" fill="currentColor"/>
        <rect x="19" y="14" width="3" height="5" rx="0.5" fill="currentColor"/>
        <rect x="14" y="19" width="5" height="3" rx="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    title: 'One-Tap Contact Save',
    desc: 'Visitors tap once and your details land in their phone contacts. No typing, no lost cards.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M17 4l1.5 1.5 3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Click Analytics',
    desc: 'See daily views, WhatsApp taps, and phone call clicks — all in one clean dashboard.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 20V14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M8 20V8"  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M13 20V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M18 20V4"  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Services & Pricing',
    desc: 'List your services with prices. Customers see your menu before they even call you.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <rect x="9" y="3" width="6" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Customer Reviews',
    desc: 'Showcase your best reviews directly on your card. Build trust before the first conversation.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l2.4 4.8 5.3.8-3.85 3.75.91 5.3L12 14l-4.76 2.65.9-5.3L4.3 7.6l5.3-.8L12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

const STEPS = [
  { num: '01', title: 'Create account', desc: 'Sign up free. No credit card, no commitment.' },
  { num: '02', title: 'Fill your details', desc: 'Name, phone, WhatsApp, address, social links.' },
  { num: '03', title: 'Pick a theme', desc: 'Five beautiful themes designed for business.' },
  { num: '04', title: 'Share everywhere', desc: 'Copy link, download QR, start connecting.' },
]

const PLANS = [
  {
    name: 'Free',
    price: '0',
    billed: 'always free',
    desc: 'Get started with one card.',
    features: ['1 digital card', 'Shareable link', 'QR code download', 'Save to contacts', 'Basic view stats'],
    cta: 'Start Free',
    featured: false,
  },
  {
    name: 'Pro',
    price: '199',
    billed: 'per month',
    desc: 'For active business owners.',
    features: ['Unlimited cards', 'Custom slug / username', 'Full analytics dashboard', 'All 5 card themes', 'Services and gallery sections', 'Priority support'],
    cta: 'Get Pro',
    featured: true,
  },
  {
    name: 'Business',
    price: '499',
    billed: 'per month',
    desc: 'For teams and agencies.',
    features: ['Everything in Pro', 'Custom domain', 'Team member access', 'White-label branding', 'API access', 'Dedicated account support'],
    cta: 'Contact Sales',
    featured: false,
  },
]

const TESTIMONIALS = [
  { name: 'Priya Sharma', role: 'Salon owner, Pune', quote: 'My customers can now find my services and call me without asking for a paper card. This saves me so many lost leads.' },
  { name: 'Rajan Mehta',  role: 'Freelance photographer', quote: 'I share my CardBiz link in every WhatsApp group. The QR code on my ID card is what gets me most bookings now.' },
  { name: 'Sunita Patil', role: 'Home baker, Nashik', quote: 'The services list is perfect. Customers know my prices before they call, so I get serious inquiries only.' },
]

/* ── Intersection observer hook ── */
function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.12 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const [heroRef,  heroVis]  = useReveal()
  const [featRef,  featVis]  = useReveal()
  const [howRef,   howVis]   = useReveal()
  const [testRef,  testVis]  = useReveal()
  const [priceRef, priceVis] = useReveal()

  return (
    <div style={{ fontFamily: "'Cabinet Grotesk', system-ui, sans-serif", background: '#fff', color: '#150A10', overflowX: 'hidden' }}>

      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,900;1,9..144,700;1,9..144,900&family=Cabinet+Grotesk:wght@400;500;600;700;800&display=swap');

        :root {
          --rose: #F72585;
          --rose-deep: #C1175A;
          --rose-soft: #FFE0EF;
          --rose-mid: #FDB8D7;
          --blush: #FFF5F9;
          --ink: #150A10;
          --ink-60: rgba(21,10,16,0.6);
          --ink-30: rgba(21,10,16,0.3);
          --border: #F2DDE8;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }

        /* Reveal animation */
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .reveal.on { opacity: 1; transform: none; }
        .reveal.d1 { transition-delay: 0.08s; }
        .reveal.d2 { transition-delay: 0.16s; }
        .reveal.d3 { transition-delay: 0.24s; }
        .reveal.d4 { transition-delay: 0.32s; }
        .reveal.d5 { transition-delay: 0.40s; }
        .reveal.d6 { transition-delay: 0.48s; }

        /* Nav */
        .lnav { 
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 1rem 0;
          transition: background 0.3s, border-color 0.3s;
        }
        .lnav.scrolled {
          background: rgba(255,255,255,0.94);
          border-bottom: 1px solid var(--border);
          backdrop-filter: blur(16px);
        }
        .lnav-inner {
          max-width: 1160px; margin: 0 auto; padding: 0 2rem;
          display: flex; align-items: center; justify-content: space-between; gap: 2rem;
        }
        .lnav-links { display: flex; align-items: center; gap: 2.5rem; }
        .lnav-link {
          font-size: 0.875rem; font-weight: 600; color: var(--ink-60);
          text-decoration: none; transition: color 0.15s;
          font-family: 'Cabinet Grotesk', sans-serif;
        }
        .lnav-link:hover { color: var(--rose); }
        .lnav-actions { display: flex; align-items: center; gap: 0.75rem; }

        /* Buttons */
        .lbtn {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: 'Cabinet Grotesk', sans-serif; font-weight: 700;
          font-size: 0.875rem; border: none; cursor: pointer;
          text-decoration: none; border-radius: 12px;
          padding: 0.65rem 1.4rem; transition: all 0.18s;
          letter-spacing: 0.01em;
        }
        .lbtn-rose {
          background: var(--rose); color: #fff;
          box-shadow: 0 2px 14px rgba(247,37,133,0.32);
        }
        .lbtn-rose:hover { background: var(--rose-deep); box-shadow: 0 4px 22px rgba(247,37,133,0.44); transform: translateY(-1px); }
        .lbtn-ghost {
          background: transparent; color: var(--ink-60);
          border: 1.5px solid var(--border);
        }
        .lbtn-ghost:hover { border-color: var(--rose); color: var(--rose); background: var(--rose-soft); }
        .lbtn-lg { padding: 0.85rem 2rem; font-size: 0.95rem; border-radius: 14px; }
        .lbtn-outline-white {
          background: transparent; color: rgba(255,255,255,0.9);
          border: 1.5px solid rgba(255,255,255,0.4);
        }
        .lbtn-outline-white:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.7); }

        /* Section wrapper */
        .lsec { padding: 6rem 0; }
        .lsec-inner { max-width: 1160px; margin: 0 auto; padding: 0 2rem; }
        .lsec-label {
          display: inline-flex; align-items: center; gap: 0.4rem;
          background: var(--rose-soft); color: var(--rose-deep);
          font-size: 0.72rem; font-weight: 800; letter-spacing: 0.1em;
          text-transform: uppercase; padding: 0.3rem 0.85rem;
          border-radius: 100px; margin-bottom: 1.25rem;
        }
        .lsec-h {
          font-family: 'Fraunces', serif; font-weight: 900;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          letter-spacing: -0.03em; line-height: 1.08;
        }

        /* Feature card */
        .feat-card {
          background: #fff; border: 1.5px solid var(--border);
          border-radius: 20px; padding: 1.75rem;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .feat-card:hover {
          border-color: var(--rose);
          box-shadow: 0 8px 32px rgba(247,37,133,0.1);
          transform: translateY(-4px);
        }

        /* Pricing */
        .price-card {
          border: 1.5px solid var(--border); border-radius: 24px;
          padding: 2.25rem 2rem; position: relative;
          background: #fff; transition: transform 0.2s, box-shadow 0.2s;
        }
        .price-card:hover { transform: translateY(-5px); box-shadow: 0 16px 48px rgba(0,0,0,0.08); }
        .price-card.featured {
          background: var(--ink); border-color: var(--ink); color: #fff;
        }
        .price-card.featured:hover { box-shadow: 0 20px 60px rgba(21,10,16,0.28); }

        /* Testimonial */
        .test-card {
          background: var(--blush); border: 1.5px solid var(--border);
          border-radius: 20px; padding: 1.75rem;
        }

        /* Mobile menu */
        .mobile-menu {
          position: fixed; inset: 0; background: #fff; z-index: 200;
          display: flex; flex-direction: column; padding: 1.5rem 2rem;
          transform: translateX(110%); transition: transform 0.3s cubic-bezier(.4,0,.2,1);
        }
        .mobile-menu.open { transform: translateX(0); }

        @media (max-width: 1023px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          .grid-3 { grid-template-columns: 1fr 1fr !important; }
          .grid-4 { grid-template-columns: 1fr 1fr !important; }
          .grid-pricing { grid-template-columns: 1fr !important; }
          .hero-flex { flex-direction: column !important; align-items: flex-start !important; }
          .hero-mockup { display: none !important; }
        }
        @media (max-width: 640px) {
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-4 { grid-template-columns: 1fr !important; }
          .lsec { padding: 4rem 0 !important; }
        }
        .show-mobile { display: none; }
      `}</style>

      {/* ── NAV ── */}
      <nav className={`lnav${scrolled ? ' scrolled' : ''}`}>
        <div className="lnav-inner">
          <Link to="/" style={{ textDecoration: 'none', fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: '1.5rem', color: 'var(--rose)', letterSpacing: '-0.03em' }}>
            CardBiz
          </Link>
          <div className="lnav-links hide-mobile">
            {[['Features','#features'],['How It Works','#how'],['Pricing','#pricing']].map(([l, h]) => (
              <a key={l} href={h} className="lnav-link">{l}</a>
            ))}
          </div>
          <div className="lnav-actions">
            <Link to="/login" className="lbtn lbtn-ghost hide-mobile">Sign in</Link>
            <Link to="/register" className="lbtn lbtn-rose">Get started</Link>
            <button onClick={() => setMenuOpen(true)} className="show-mobile"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink)', padding: '0.25rem' }}>
              <IcoMenu />
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: '1.4rem', color: 'var(--rose)' }}>CardBiz</span>
          <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink)' }}><IcoX /></button>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
          {[['Features','#features'],['How It Works','#how'],['Pricing','#pricing']].map(([l, h]) => (
            <a key={l} href={h} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "'Fraunces', serif", fontSize: '1.6rem', fontWeight: 900, color: 'var(--ink)', textDecoration: 'none', padding: '0.5rem 0', borderBottom: '1px solid var(--border)', letterSpacing: '-0.02em' }}>
              {l}
            </a>
          ))}
        </nav>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '2rem' }}>
          <Link to="/login" className="lbtn lbtn-ghost" style={{ justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>Sign in</Link>
          <Link to="/register" className="lbtn lbtn-rose" style={{ justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>Create Free Account</Link>
        </div>
      </div>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{ paddingTop: '7rem', paddingBottom: '5rem', background: 'var(--blush)', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle grid texture */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(var(--rose-mid) 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.18, pointerEvents: 'none' }} />
        {/* Glow blobs */}
        <div style={{ position: 'absolute', top: -200, right: -150, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(247,37,133,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div className="lsec-inner">
          <div className="hero-flex" style={{ display: 'flex', alignItems: 'center', gap: '5rem' }}>

            {/* Left */}
            <div style={{ flex: 1, maxWidth: 600 }}>
              <div className={`reveal${heroVis ? ' on' : ''}`}>
                <span className="lsec-label">
                  <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="var(--rose)"/></svg>
                  Digital Business Cards
                </span>
              </div>
              <h1 className={`reveal${heroVis ? ' on d1' : ''}`}
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: 'clamp(3rem, 6vw, 5.2rem)', letterSpacing: '-0.035em', lineHeight: 1.04, marginBottom: '1.5rem' }}>
                Your business,<br />
                <em style={{ fontStyle: 'italic', color: 'var(--rose)' }}>beautifully</em><br />
                digital.
              </h1>
              <p className={`reveal${heroVis ? ' on d2' : ''}`}
                style={{ fontSize: '1.1rem', color: 'var(--ink-60)', lineHeight: 1.72, maxWidth: 480, marginBottom: '2.5rem' }}>
                Replace paper cards with a stunning digital page. Share your link, get calls, save contacts — all in one tap.
              </p>
              <div className={`reveal${heroVis ? ' on d3' : ''}`} style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '2.5rem' }}>
                <Link to="/register" className="lbtn lbtn-rose lbtn-lg">
                  Create your card <IcoArrow />
                </Link>
                <a href="#how" className="lbtn lbtn-ghost lbtn-lg">See how it works</a>
              </div>
              <div className={`reveal${heroVis ? ' on d4' : ''}`} style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                {['Free to start', 'No code needed', 'Works on any phone'].map(t => (
                  <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--ink-60)', fontWeight: 600 }}>
                    <IcoCheck /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — card mockup */}
            <div className={`hero-mockup reveal${heroVis ? ' on d2' : ''}`} style={{ flex: '0 0 auto', width: 300, position: 'relative' }}>
              {/* Ring decorations */}
              <div style={{ position: 'absolute', top: -28, left: -28, right: -28, bottom: -28, borderRadius: 36, border: '1px dashed rgba(247,37,133,0.25)' }} />
              <div style={{ position: 'absolute', top: -54, left: -54, right: -54, bottom: -54, borderRadius: 52, border: '1px dashed rgba(247,37,133,0.1)' }} />

              {/* Card */}
              <div style={{ borderRadius: 24, overflow: 'hidden', boxShadow: '0 32px 80px rgba(247,37,133,0.22)', position: 'relative' }}>
                {/* Card header */}
                <div style={{ background: 'linear-gradient(145deg, #F72585, #C1175A)', padding: '1.75rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: '1.4rem', color: '#fff' }}>M</div>
                    <div>
                      <div style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, color: '#fff', fontSize: '1.05rem' }}>Mayur's Salon</div>
                      <div style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.1rem' }}>Beauty and grooming</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    {['Call', 'WhatsApp'].map((l, i) => (
                      <div key={l} style={{ flex: 1, padding: '0.55rem', borderRadius: 10, background: i === 1 ? 'rgba(37,211,102,0.35)' : 'rgba(255,255,255,0.18)', textAlign: 'center', fontSize: '0.75rem', fontWeight: 800, color: '#fff', fontFamily: "'Cabinet Grotesk', sans-serif" }}>{l}</div>
                    ))}
                  </div>
                </div>
                {/* Card body */}
                <div style={{ background: '#fff', padding: '1.25rem 1.5rem' }}>
                  <button style={{ width: '100%', padding: '0.75rem', borderRadius: 13, border: 'none', background: 'linear-gradient(135deg,#F72585,#C1175A)', color: '#fff', fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', marginBottom: '1rem', boxShadow: '0 4px 16px rgba(247,37,133,0.35)' }}>
                    Save to Contacts
                  </button>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                    {['+91 98765 43210', 'Koregaon Park, Pune', 'mayur-salon.cardbiz.app'].map(t => (
                      <div key={t} style={{ fontSize: '0.76rem', color: 'rgba(21,10,16,0.5)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--rose)', flexShrink: 0 }} />
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div style={{ position: 'absolute', bottom: -20, right: -20, background: '#fff', border: '1.5px solid var(--border)', borderRadius: 14, padding: '0.6rem 0.9rem', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 8l3 3 7-7" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--ink)', lineHeight: 1 }}>247 views</div>
                  <div style={{ fontSize: '0.62rem', color: 'var(--ink-60)', marginTop: '0.1rem' }}>this week</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF BAR ── */}
      <div style={{ background: 'var(--ink)', padding: '1.25rem 0', overflow: 'hidden' }}>
        <div className="lsec-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
          {[['10,000+', 'Business owners'], ['500K+', 'Card views per month'], ['4.9 / 5', 'Average rating'], ['3 min', 'To set up']].map(([v, l]) => (
            <div key={l} style={{ display: 'flex', align: 'center', gap: '0.75rem', flexShrink: 0 }}>
              <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: '1.25rem', color: 'var(--rose)', letterSpacing: '-0.02em' }}>{v}</span>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', fontWeight: 500, alignSelf: 'center' }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section id="features" className="lsec" ref={featRef} style={{ background: '#fff' }}>
        <div className="lsec-inner">
          <div style={{ marginBottom: '3.5rem', maxWidth: 560 }}>
            <span className={`lsec-label reveal${featVis ? ' on' : ''}`}>What you get</span>
            <h2 className={`lsec-h reveal${featVis ? ' on d1' : ''}`} style={{ marginTop: '0.25rem' }}>
              Everything a business<br />owner actually needs
            </h2>
            <p className={`reveal${featVis ? ' on d2' : ''}`} style={{ marginTop: '0.9rem', color: 'var(--ink-60)', fontSize: '1rem', lineHeight: 1.7 }}>
              No bloat. No confusion. Just the tools that bring you real customers.
            </p>
          </div>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {FEATURES.map((f, i) => (
              <div key={f.title} className={`feat-card reveal${featVis ? ` on d${i + 1}` : ''}`}>
                <div style={{ width: 48, height: 48, borderRadius: 13, background: 'var(--rose-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--rose)', marginBottom: '1.1rem' }}>
                  {f.icon}
                </div>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: '1.05rem', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>{f.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--ink-60)', lineHeight: 1.68 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="lsec" ref={howRef} style={{ background: 'var(--blush)' }}>
        <div className="lsec-inner">
          <div style={{ marginBottom: '3.5rem', maxWidth: 500 }}>
            <span className={`lsec-label reveal${howVis ? ' on' : ''}`}>Simple process</span>
            <h2 className={`lsec-h reveal${howVis ? ' on d1' : ''}`} style={{ marginTop: '0.25rem' }}>Live in under<br />3 minutes</h2>
          </div>
          <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', position: 'relative' }}>
            {/* connector line */}
            <div className="hide-mobile" style={{ position: 'absolute', top: 22, left: '12.5%', right: '12.5%', height: 1.5, background: 'linear-gradient(90deg, var(--rose-mid), transparent)', zIndex: 0 }} />
            {STEPS.map((s, i) => (
              <div key={s.num} className={`reveal${howVis ? ` on d${i + 1}` : ''}`} style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: '3.2rem', color: 'var(--rose-mid)', lineHeight: 1, marginBottom: '0.75rem' }}>{s.num}</div>
                <div style={{ width: 36, height: 2, background: 'var(--rose)', borderRadius: 2, marginBottom: '1rem' }} />
                <h3 style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: '1rem', letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>{s.title}</h3>
                <p style={{ fontSize: '0.855rem', color: 'var(--ink-60)', lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="lsec" ref={testRef} style={{ background: '#fff' }}>
        <div className="lsec-inner">
          <div style={{ marginBottom: '3rem' }}>
            <span className={`lsec-label reveal${testVis ? ' on' : ''}`}>Real users</span>
            <h2 className={`lsec-h reveal${testVis ? ' on d1' : ''}`} style={{ marginTop: '0.25rem' }}>Business owners love it</h2>
          </div>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className={`test-card reveal${testVis ? ` on d${i + 1}` : ''}`}>
                {/* Stars */}
                <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
                  {[1,2,3,4,5].map(s => <svg key={s} width="14" height="14" viewBox="0 0 14 14" fill="#F59E0B"><path d="M7 1l1.5 3 3.3.5-2.4 2.3.6 3.2L7 8.6l-3 1.4.6-3.2L2.2 4.5l3.3-.5L7 1Z"/></svg>)}
                </div>
                <blockquote style={{ fontSize: '0.925rem', color: 'var(--ink)', lineHeight: 1.72, fontStyle: 'italic', marginBottom: '1.25rem' }}>
                  "{t.quote}"
                </blockquote>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, var(--rose), var(--rose-deep))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: '0.9rem', fontFamily: "'Fraunces', serif", flexShrink: 0 }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem' }}>{t.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--ink-60)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="lsec" ref={priceRef} style={{ background: 'var(--blush)' }}>
        <div className="lsec-inner">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem', maxWidth: 520, margin: '0 auto 3.5rem' }}>
            <span className={`lsec-label reveal${priceVis ? ' on' : ''}`}>Pricing</span>
            <h2 className={`lsec-h reveal${priceVis ? ' on d1' : ''}`} style={{ marginTop: '0.25rem' }}>Simple, honest pricing</h2>
            <p className={`reveal${priceVis ? ' on d2' : ''}`} style={{ marginTop: '0.9rem', color: 'var(--ink-60)', fontSize: '0.95rem' }}>Start free. Upgrade when you're ready. Cancel any time.</p>
          </div>
          <div className="grid-pricing" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', alignItems: 'center' }}>
            {PLANS.map((p, i) => (
              <div key={p.name} className={`price-card${p.featured ? ' featured' : ''} reveal${priceVis ? ` on d${i + 1}` : ''}`}
                style={p.featured ? { transform: 'scale(1.04)', zIndex: 1 } : {}}>
                {p.featured && (
                  <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: 'var(--rose)', color: '#fff', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.28rem 0.9rem', borderRadius: 100, whiteSpace: 'nowrap' }}>
                    Most popular
                  </div>
                )}
                <div style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: p.featured ? 'rgba(255,255,255,0.5)' : 'var(--ink-60)', marginBottom: '0.4rem' }}>{p.name}</div>
                <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: '2.6rem', letterSpacing: '-0.04em', lineHeight: 1, color: p.featured ? '#fff' : 'var(--ink)' }}>
                  {p.price === '0' ? 'Free' : <><span style={{ fontSize: '1.1rem', fontWeight: 700 }}>&#8377;</span>{p.price}</>}
                </div>
                <div style={{ fontSize: '0.78rem', color: p.featured ? 'rgba(255,255,255,0.45)' : 'var(--ink-60)', marginBottom: '0.75rem' }}>{p.billed}</div>
                <div style={{ fontSize: '0.85rem', color: p.featured ? 'rgba(255,255,255,0.7)' : 'var(--ink-60)', marginBottom: '1.75rem' }}>{p.desc}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2rem' }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.855rem', color: p.featured ? 'rgba(255,255,255,0.85)' : 'var(--ink)' }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: '0.1rem' }}>
                        <path d="M4 8l3 3 5-5" stroke={p.featured ? '#F72585' : '#F72585'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {f}
                    </div>
                  ))}
                </div>
                <Link to="/register" style={{
                  display: 'block', textAlign: 'center', padding: '0.8rem',
                  borderRadius: 12, fontWeight: 700, fontSize: '0.88rem',
                  textDecoration: 'none', fontFamily: "'Cabinet Grotesk', sans-serif",
                  transition: 'all 0.18s',
                  background: p.featured ? 'var(--rose)' : 'transparent',
                  color: p.featured ? '#fff' : 'var(--rose)',
                  border: p.featured ? 'none' : '1.5px solid var(--rose)',
                  boxShadow: p.featured ? '0 4px 18px rgba(247,37,133,0.4)' : 'none',
                }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = '' }}>
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ background: 'var(--ink)', padding: '5.5rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -160, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(247,37,133,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -100, left: -80, width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(247,37,133,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="lsec-inner" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.035em', lineHeight: 1.08, color: '#fff', marginBottom: '1.25rem' }}>
            Ready to go digital?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 2.5rem' }}>
            Your customers are looking for you online. Give them a place to find you, call you, and save your number — instantly.
          </p>
          <div style={{ display: 'flex', gap: '0.9rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="lbtn lbtn-rose lbtn-lg">Create free card <IcoArrow /></Link>
            <Link to="/login" className="lbtn lbtn-outline-white lbtn-lg">Sign in</Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: 'var(--ink)', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '2rem 0' }}>
        <div className="lsec-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: '1.3rem', color: 'var(--rose)', marginBottom: '0.25rem' }}>CardBiz</div>
            <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>Digital business cards for everyone.</div>
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {[['Features','#features'],['How It Works','#how'],['Pricing','#pricing']].map(([l, h]) => (
              <a key={l} href={h} style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--rose)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}>
                {l}
              </a>
            ))}
          </div>
          <div style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.2)' }}>
            &copy; {new Date().getFullYear()} CardBiz. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
