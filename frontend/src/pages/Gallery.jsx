import { useState } from 'react'

const HERO_IMG = 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1400&q=80'

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=70',
    caption: 'The Main Dining Room',
    category: 'Interior',
  },
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=70',
    caption: 'An Evening at Café Fausse',
    category: 'Interior',
  },
  {
    src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&q=70',
    caption: 'Private Dining Experience',
    category: 'Events',
  },
  {
    src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=70',
    caption: 'Chef\'s Selection',
    category: 'Dishes',
  },
  {
    src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=70',
    caption: 'Seasonal Salad',
    category: 'Dishes',
  },
  {
    src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=70',
    caption: 'Artisan Pizza',
    category: 'Dishes',
  },
  {
    src: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=70',
    caption: 'Decadent Desserts',
    category: 'Dishes',
  },
  {
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=70',
    caption: 'Behind the Scenes',
    category: 'Kitchen',
  },
  {
    src: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=70',
    caption: 'Chef at Work',
    category: 'Kitchen',
  },
  {
    src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&q=70',
    caption: 'Special Events',
    category: 'Events',
  },
  {
    src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&q=70',
    caption: 'Intimate Gatherings',
    category: 'Events',
  },
  {
    src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    thumb: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=70',
    caption: 'Bar & Lounge',
    category: 'Interior',
  },
]

const awards = [
  { year: '2022', title: 'Culinary Excellence Award', org: 'Washington DC Restaurant Association', icon: '🏆' },
  { year: '2023', title: 'Restaurant of the Year', org: 'DC Dining Awards', icon: '⭐' },
  { year: '2023', title: 'Best Fine Dining Experience', org: 'Foodie Magazine', icon: '🌟' },
]

const reviews = [
  { quote: 'Exceptional ambiance and unforgettable flavors. A true gem in the DC dining scene.', author: 'Alexandra M.', source: 'Gourmet Review', rating: 5 },
  { quote: 'A must-visit restaurant for food enthusiasts. Chef Rossi\'s cuisine is nothing short of poetry on a plate.', author: 'James T.', source: 'The Daily Bite', rating: 5 },
  { quote: 'The attention to detail — from the service to the wine pairings — makes every visit a special occasion.', author: 'Priya S.', source: 'Eater DC', rating: 5 },
  { quote: 'I have dined all over the world and Café Fausse stands among the very best. Breathtaking.', author: 'Robert K.', source: 'OpenTable', rating: 5 },
]

const CATEGORIES = ['All', 'Interior', 'Dishes', 'Kitchen', 'Events']

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightbox, setLightbox] = useState(null) // index or null

  const filtered = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory)

  const openLightbox = (idx) => setLightbox(idx)
  const closeLightbox = () => setLightbox(null)
  const prevImage = () => setLightbox(i => (i - 1 + filtered.length) % filtered.length)
  const nextImage = () => setLightbox(i => (i + 1) % filtered.length)

  // Keyboard nav
  const handleKeyDown = (e) => {
    if (lightbox === null) return
    if (e.key === 'ArrowLeft') prevImage()
    if (e.key === 'ArrowRight') nextImage()
    if (e.key === 'Escape') closeLightbox()
  }

  return (
    <div onKeyDown={handleKeyDown} tabIndex={-1} style={{ outline: 'none' }}>
      {/* Hero */}
      <div className="page-hero">
        <img src={HERO_IMG} alt="Gallery" />
        <div className="page-hero-content">
          <span className="section-tag">Visual Journey</span>
          <h1>Gallery</h1>
        </div>
      </div>

      {/* Photo Gallery */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-tag">Photography</span>
            <h2 className="section-title">Inside Café Fausse</h2>
            <div className="divider" style={{ margin: '1rem auto 2rem' }} />

            {/* Category filter */}
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '0.5rem 1.25rem',
                    fontSize: '0.72rem',
                    fontWeight: 500,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    border: '1px solid',
                    borderRadius: 'var(--radius)',
                    background: activeCategory === cat ? 'var(--color-gold)' : 'transparent',
                    borderColor: activeCategory === cat ? 'var(--color-gold)' : 'var(--color-border)',
                    color: activeCategory === cat ? 'var(--color-bg)' : 'var(--color-text-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
          }}>
            {filtered.map((img, idx) => (
              <div
                key={img.src}
                onClick={() => openLightbox(idx)}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 'var(--radius)',
                  cursor: 'pointer',
                  aspectRatio: '4/3',
                }}
              >
                <img
                  src={img.thumb}
                  alt={img.caption}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(14,12,9,0.7) 0%, transparent 60%)',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '1rem',
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = 1}
                  onMouseLeave={e => e.currentTarget.style.opacity = 0}
                >
                  <span style={{ color: 'var(--color-cream)', fontSize: '0.85rem' }}>{img.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            style={{
              position: 'absolute', top: '1.5rem', right: '1.5rem',
              background: 'none', border: 'none', color: 'var(--color-cream)',
              fontSize: '2rem', cursor: 'pointer', zIndex: 10,
            }}
          >✕</button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage() }}
            style={{
              position: 'absolute', left: '1.5rem',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%', width: '48px', height: '48px',
              color: 'var(--color-cream)', fontSize: '1.25rem', cursor: 'pointer',
            }}
          >‹</button>

          {/* Image */}
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: '85vw', maxHeight: '85vh', textAlign: 'center' }}>
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].caption}
              style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 'var(--radius)' }}
            />
            <p style={{ color: 'var(--color-cream-muted)', marginTop: '1rem', fontStyle: 'italic' }}>
              {filtered[lightbox].caption}
            </p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem', marginTop: '0.25rem' }}>
              {lightbox + 1} / {filtered.length}
            </p>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage() }}
            style={{
              position: 'absolute', right: '1.5rem',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%', width: '48px', height: '48px',
              color: 'var(--color-cream)', fontSize: '1.25rem', cursor: 'pointer',
            }}
          >›</button>
        </div>
      )}

      {/* Awards */}
      <section className="section" style={{ background: 'var(--color-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-tag">Accolades</span>
            <h2 className="section-title">Awards & Recognition</h2>
            <div className="divider" style={{ margin: '1rem auto' }} />
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            maxWidth: '900px',
            margin: '0 auto',
          }}>
            {awards.map((a) => (
              <div key={a.title} style={{
                background: 'var(--color-surface-light)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)',
                padding: '2rem',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{a.icon}</div>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.1rem',
                  color: 'var(--color-cream)',
                  marginBottom: '0.4rem',
                }}>
                  {a.title}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.4rem' }}>
                  {a.org}
                </div>
                <div style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--color-gold)' }}>
                  {a.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-tag">Guest Voices</span>
            <h2 className="section-title">What Our Guests Say</h2>
            <div className="divider" style={{ margin: '1rem auto' }} />
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}>
            {reviews.map((r, i) => (
              <div key={i} style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)',
                padding: '2rem',
              }}>
                {/* Stars */}
                <div style={{ color: 'var(--color-gold)', fontSize: '0.9rem', marginBottom: '1rem', letterSpacing: '0.1em' }}>
                  {'★'.repeat(r.rating)}
                </div>
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.05rem',
                  fontStyle: 'italic',
                  color: 'var(--color-cream)',
                  lineHeight: 1.7,
                  marginBottom: '1.25rem',
                }}>
                  "{r.quote}"
                </p>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text)', fontWeight: 500 }}>{r.author}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-gold)', letterSpacing: '0.1em' }}>{r.source}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
