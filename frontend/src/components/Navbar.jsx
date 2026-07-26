import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/reservations', label: 'Reservations' },
  { to: '/about', label: 'About Us' },
  { to: '/gallery', label: 'Gallery' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: 'var(--nav-height)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      padding: '0 2rem',
      background: scrolled || menuOpen ? 'rgba(14,12,9,0.97)' : 'rgba(14,12,9,0.4)',
      backdropFilter: 'blur(12px)',
      borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
      transition: 'all 0.4s ease',
    }}>
      {/* Logo */}
      <Link to="/" style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.5rem',
        color: 'var(--color-gold)',
        fontStyle: 'italic',
        letterSpacing: '0.05em',
        flexShrink: 0,
      }}>
        Café Fausse
      </Link>

      {/* Desktop nav */}
      <div style={{
        display: 'flex',
        gap: '2.5rem',
        marginLeft: 'auto',
        alignItems: 'center',
      }} className="desktop-nav">
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: location.pathname === to ? 'var(--color-gold)' : 'var(--color-cream-muted)',
              transition: 'color 0.3s',
              paddingBottom: '2px',
              borderBottom: location.pathname === to ? '1px solid var(--color-gold)' : '1px solid transparent',
            }}
          >
            {label}
          </Link>
        ))}
        <Link to="/reservations" className="btn btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.68rem' }}>
          Book a Table
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          marginLeft: 'auto',
          display: 'none',
          background: 'none',
          border: 'none',
          color: 'var(--color-cream)',
          fontSize: '1.5rem',
          lineHeight: 1,
        }}
        className="hamburger"
        aria-label="Toggle menu"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: 'var(--nav-height)',
          left: 0,
          right: 0,
          background: 'rgba(14,12,9,0.98)',
          borderBottom: '1px solid var(--color-border)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          zIndex: 999,
        }}>
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: location.pathname === to ? 'var(--color-gold)' : 'var(--color-cream)',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
