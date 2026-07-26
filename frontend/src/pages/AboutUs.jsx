const HERO_IMG = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1400&q=80'
const CHEF_IMG = 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80'
const MARIA_IMG = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80'
const KITCHEN_IMG = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80'

const values = [
  { icon: '🌿', title: 'Locally Sourced', desc: 'We partner with regional farms to bring the freshest seasonal ingredients to every plate.' },
  { icon: '🎨', title: 'Culinary Artistry', desc: 'Every dish is a canvas — composed with care, precision, and a deep respect for classical technique.' },
  { icon: '🤝', title: 'Warm Hospitality', desc: 'Our service philosophy is built on making every guest feel like a cherished friend.' },
  { icon: '🌍', title: 'Sustainability', desc: 'We are committed to eco-conscious practices throughout our kitchen and supply chain.' },
]

export default function AboutUs() {
  return (
    <div>
      {/* Hero */}
      <div className="page-hero">
        <img src={HERO_IMG} alt="Restaurant interior" />
        <div className="page-hero-content">
          <span className="section-tag">Our Story</span>
          <h1>About Us</h1>
        </div>
      </div>

      {/* Story section */}
      <section className="section" style={{ background: 'var(--color-surface)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-tag">Est. 2010</span>
            <h2 className="section-title">About Café Fausse</h2>
            <div className="divider" style={{ margin: '1rem auto' }} />
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center',
          }}>
            <div>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.9, marginBottom: '1.25rem' }}>
                Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez, Café Fausse blends
                traditional Italian flavors with modern culinary innovation. Our mission is to provide an
                unforgettable dining experience that reflects both quality and creativity.
              </p>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.9, marginBottom: '1.25rem' }}>
                From humble beginnings in a small corner of Washington, DC, Café Fausse has grown into
                one of the city's most celebrated fine dining destinations — earning three consecutive
                industry awards and a devoted following of food lovers.
              </p>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.9 }}>
                We believe great dining is about more than food. It's about the warmth of the room,
                the care of the service, and the stories shared around the table. Every evening, our
                team strives to create those moments for you.
              </p>
            </div>
            <div>
              <img
                src={KITCHEN_IMG}
                alt="Our kitchen"
                style={{ width: '100%', height: '380px', objectFit: 'cover', borderRadius: 'var(--radius)' }}
              />
            </div>
          </div>
        </div>

        {/* Responsive grid fix */}
        <style>{`
          @media (max-width: 768px) {
            .about-story-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* Founders */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-tag">The Visionaries</span>
            <h2 className="section-title">Meet the Founders</h2>
            <div className="divider" style={{ margin: '1rem auto' }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            maxWidth: '900px',
            margin: '0 auto',
          }}>
            {/* Chef Antonio */}
            <div style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
            }}>
              <img
                src={CHEF_IMG}
                alt="Chef Antonio Rossi"
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              />
              <div style={{ padding: '2rem' }}>
                <span className="section-tag" style={{ marginBottom: '0.5rem' }}>Executive Chef & Co-Founder</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-cream)', marginBottom: '1rem' }}>
                  Chef Antonio Rossi
                </h3>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, fontSize: '0.9rem' }}>
                  Born in Naples and trained at the prestigious Le Cordon Bleu in Paris, Chef Antonio
                  brings over 25 years of culinary mastery to Café Fausse. His philosophy centers on
                  letting exceptional ingredients speak for themselves, elevated by classical French
                  and Italian technique. Antonio's signature dishes have earned the restaurant its
                  place among DC's culinary elite.
                </p>
              </div>
            </div>

            {/* Maria */}
            <div style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
            }}>
              <img
                src={MARIA_IMG}
                alt="Maria Lopez"
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              />
              <div style={{ padding: '2rem' }}>
                <span className="section-tag" style={{ marginBottom: '0.5rem' }}>Restaurateur & Co-Founder</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-cream)', marginBottom: '1rem' }}>
                  Maria Lopez
                </h3>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, fontSize: '0.9rem' }}>
                  With a background in luxury hospitality and a deep passion for the art of hosting,
                  Maria is the heartbeat of Café Fausse's front-of-house experience. Her vision for
                  the restaurant goes beyond food — she has carefully curated every detail of the
                  ambiance, service style, and wine program to ensure an atmosphere where every guest
                  feels truly celebrated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--color-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-tag">What We Stand For</span>
            <h2 className="section-title">Our Values</h2>
            <div className="divider" style={{ margin: '1rem auto' }} />
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}>
            {values.map((v) => (
              <div key={v.title} style={{
                padding: '2rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)',
                background: 'var(--color-surface-light)',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{v.icon}</div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--color-cream)', marginBottom: '0.75rem' }}>
                  {v.title}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
