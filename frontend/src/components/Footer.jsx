import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null) // null | 'success' | 'error'
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('error')
      setMsg('Please enter a valid email address.')
      return
    }
    setLoading(true)
    try {
      const res = await axios.post('/api/newsletter', { email })
      setStatus('success')
      setMsg(res.data.message)
      setEmail('')
    } catch (err) {
      setStatus('error')
      setMsg(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer style={{
      background: 'var(--color-surface)',
      borderTop: '1px solid var(--color-border)',
      padding: '4rem 0 2rem',
    }}>
      <div className="container">
        {/* Top grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-gold)', fontStyle: 'italic', marginBottom: '1rem' }}>
              Café Fausse
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
              A fine dining experience blending traditional Italian flavors with modern culinary innovation.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1.2rem' }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
              <span>1234 Culinary Ave, Suite 100</span>
              <span>Washington, DC 20002</span>
              <span>(202) 555-4567</span>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1.2rem' }}>
              Hours
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
              <span>Mon – Sat: 5:00 PM – 11:00 PM</span>
              <span>Sunday: 5:00 PM – 9:00 PM</span>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1.2rem' }}>
              Newsletter
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
              Subscribe for exclusive offers and culinary updates.
            </p>
            <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{
                  flex: 1,
                  minWidth: '160px',
                  background: 'var(--color-surface-light)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius)',
                  color: 'var(--color-text)',
                  padding: '0.65rem 0.9rem',
                  fontSize: '0.85rem',
                  outline: 'none',
                }}
              />
              <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '0.65rem 1.2rem', fontSize: '0.7rem' }}>
                {loading ? '...' : 'Subscribe'}
              </button>
            </form>
            {status && (
              <div className={`alert alert-${status}`} style={{ marginTop: '0.75rem', fontSize: '0.82rem' }}>
                {msg}
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.78rem',
          color: 'var(--color-text-muted)',
        }}>
          <span>© {new Date().getFullYear()} Café Fausse. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {[['/', 'Home'], ['/menu', 'Menu'], ['/reservations', 'Reservations'], ['/about', 'About'], ['/gallery', 'Gallery']].map(([to, label]) => (
              <Link key={to} to={to} style={{ color: 'var(--color-text-muted)', transition: 'color 0.3s' }}
                onMouseEnter={e => e.target.style.color = 'var(--color-gold)'}
                onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
