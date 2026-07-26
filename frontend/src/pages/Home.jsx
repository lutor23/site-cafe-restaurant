import { Link } from 'react-router-dom'

const HERO_IMG = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80'
const INTERIOR_IMG = 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=80'
const DISH_IMG = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80'

const awards = [
  { year: '2022', title: 'Culinary Excellence Award', icon: '🏆' },
  { year: '2023', title: 'Restaurant of the Year', icon: '⭐' },
  { year: '2023', title: 'Best Fine Dining — Foodie Magazine', icon: '🌟' },
]

const reviews = [
  { quote: 'Exceptional ambiance and unforgettable flavors.', source: 'Gourmet Review' },
  { quote: 'A must-visit restaurant for food enthusiasts.', source: 'The Daily Bite' },
  { quote: 'Chef Rossi has created something truly magical.', source: 'DC Eater' },
]

export default function Home() {
  return (
    <div>
      {/* ---- HERO ---- */}
      <section style={{
        position: 'relative',
        height: '100vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <img
          src={HERO_IMG}
          alt="Café Fausse dining room"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(14,12,9,0.5) 0%, rgba(14,12,9,0.75) 100%)',
        }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 1.5rem' }}>
          <span className="section-tag" style={{ display: 'block', marginBottom: '1.5rem' }}>
            Washington, DC · Est. 2010
          </span>
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(3rem, 8vw, 6.5rem)',
            color: 'var(--color-cream)',
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
          }}>
            Café Fausse
          </h1>
          <p style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            color: 'var(--color-cream-muted)',
            maxWidth: '520px',
            margin: '0 auto 2.5rem',
            letterSpacing: '0.05em',
          }}>
            Where Italian tradition meets modern culinary artistry in the heart of Washington, DC.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/reservations" className="btn btn-primary">Reserve a Table</Link>
            <Link to="/menu" className="btn btn-outline">View Menu</Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          color: 'var(--color-gold)', opacity: 0.7,
        }}>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: '1px', height: '40px', background: 'var(--color-gold)' }} />
        </div>
      </section>

      {/* ---- ABOUT SNIPPET ---- */}
      <section className="section" style={{ background: 'var(--color-surface)' }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'center',
        }}>
          <div>
            <span className="section-tag">Our Story</span>
            <h2 className="section-title">A Passion for Extraordinary Dining</h2>
            <div className="divider" />
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
              Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez, Café Fausse has become
              Washington DC's premier destination for refined Italian cuisine. Our chefs source locally
              grown ingredients to craft dishes that honor tradition while embracing innovation.
            </p>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
              Every evening, we invite you to slow down and savor an experience crafted with love,
              precision, and the finest seasonal ingredients.
            </p>
            <Link to="/about" className="btn btn-outline">Meet the Team</Link>
          </div>
          <div style={{ position: 'relative' }}>
            <img
              src={INTERIOR_IMG}
              alt="Restaurant interior"
              style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: '4px' }}
            />
            <div style={{
              position: 'absolute', bottom: '-1.5rem', left: '-1.5rem',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              padding: '1.5rem 2rem',
              textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--color-gold)' }}>14+</div>
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Years of Excellence</div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .about-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ---- FEATURED DISH ---- */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-tag">Chef's Selection</span>
          <h2 className="section-title">Crafted with Passion</h2>
          <div className="divider" style={{ margin: '1rem auto 2.5rem' }} />
          <img
            src={DISH_IMG}
            alt="Featured dish"
            style={{ width: '100%', maxWidth: '700px', height: '420px', objectFit: 'cover', borderRadius: '4px', margin: '0 auto 2.5rem' }}
          />
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '560px', margin: '0 auto 2rem' }}>
            Each dish is a canvas — our chefs paint with flavors drawn from the finest locally sourced
            ingredients, prepared to perfection and presented with artistry.
          </p>
          <Link to="/menu" className="btn btn-primary">Explore the Menu</Link>
        </div>
      </section>

      {/* ---- AWARDS ---- */}
      <section className="section" style={{ background: 'var(--color-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-tag">Recognition</span>
            <h2 className="section-title">Our Awards</h2>
            <div className="divider" style={{ margin: '1rem auto' }} />
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}>
            {awards.map((a, i) => (
              <div key={i} style={{
                background: 'var(--color-surface-light)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)',
                padding: '2rem',
                textAlign: 'center',
                transition: 'border-color 0.3s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-gold)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{a.icon}</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--color-cream)', marginBottom: '0.4rem' }}>{a.title}</div>
                <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--color-gold)' }}>{a.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- REVIEWS ---- */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-tag">Testimonials</span>
            <h2 className="section-title">What Guests Say</h2>
            <div className="divider" style={{ margin: '1rem auto' }} />
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem',
          }}>
            {reviews.map((r, i) => (
              <div key={i} style={{
                borderLeft: '2px solid var(--color-gold)',
                paddingLeft: '1.5rem',
              }}>
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.15rem',
                  fontStyle: 'italic',
                  color: 'var(--color-cream)',
                  marginBottom: '1rem',
                  lineHeight: 1.6,
                }}>
                  "{r.quote}"
                </p>
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold)' }}>
                  — {r.source}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CTA RESERVATION ---- */}
      <section style={{
        position: 'relative',
        padding: '6rem 2rem',
        textAlign: 'center',
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <span className="section-tag">Reservations</span>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: 'var(--color-cream)',
          marginBottom: '1rem',
        }}>
          Reserve Your Evening
        </h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem', maxWidth: '480px', margin: '0 auto 2.5rem' }}>
          Secure your table at Café Fausse and begin an unforgettable evening. Available Monday through Sunday.
        </p>
        <Link to="/reservations" className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '1rem 2.5rem' }}>
          Make a Reservation
        </Link>

        {/* Contact info strip */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '3rem',
          marginTop: '3rem',
          flexWrap: 'wrap',
          fontSize: '0.85rem',
          color: 'var(--color-text-muted)',
        }}>
          <span>📍 1234 Culinary Ave, Suite 100, Washington DC 20002</span>
          <span>📞 (202) 555-4567</span>
          <span>🕐 Mon–Sat 5PM–11PM · Sun 5PM–9PM</span>
        </div>
      </section>
    </div>
  )
}
