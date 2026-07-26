import { useState } from 'react'

const HERO_IMG = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=80'

const menuData = [
  {
    category: 'Starters',
    icon: '🌿',
    items: [
      { name: 'Bruschetta', desc: 'Fresh tomatoes, basil, olive oil, and toasted baguette slices', price: 8.50 },
      { name: 'Caesar Salad', desc: 'Crisp romaine with homemade Caesar dressing', price: 9.00 },
    ],
  },
  {
    category: 'Main Courses',
    icon: '🍽️',
    items: [
      { name: 'Grilled Salmon', desc: 'Served with lemon butter sauce and seasonal vegetables', price: 22.00 },
      { name: 'Ribeye Steak', desc: '12 oz prime cut with garlic mashed potatoes', price: 28.00 },
      { name: 'Vegetable Risotto', desc: 'Creamy Arborio rice with wild mushrooms', price: 18.00 },
    ],
  },
  {
    category: 'Desserts',
    icon: '🍮',
    items: [
      { name: 'Tiramisu', desc: 'Classic Italian dessert with mascarpone', price: 7.50 },
      { name: 'Cheesecake', desc: 'Creamy cheesecake with berry compote', price: 7.00 },
    ],
  },
  {
    category: 'Beverages',
    icon: '🍷',
    items: [
      { name: 'Red Wine (Glass)', desc: 'A selection of Italian reds', price: 10.00 },
      { name: 'White Wine (Glass)', desc: 'Crisp and refreshing', price: 9.00 },
      { name: 'Craft Beer', desc: 'Local artisan brews', price: 6.00 },
      { name: 'Espresso', desc: 'Strong and aromatic', price: 3.00 },
    ],
  },
]

function MenuItem({ item }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: '1rem',
      padding: '1.25rem 0',
      borderBottom: '1px solid var(--color-border)',
    }}>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.1rem',
          color: 'var(--color-cream)',
          marginBottom: '0.3rem',
        }}>
          {item.name}
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          {item.desc}
        </div>
      </div>
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.1rem',
        color: 'var(--color-gold)',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}>
        ${item.price.toFixed(2)}
      </div>
    </div>
  )
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState('All')
  const tabs = ['All', ...menuData.map(d => d.category)]
  const displayed = activeTab === 'All' ? menuData : menuData.filter(d => d.category === activeTab)

  return (
    <div>
      {/* Hero */}
      <div className="page-hero">
        <img src={HERO_IMG} alt="Restaurant ambiance" />
        <div className="page-hero-content">
          <span className="section-tag">Our Offerings</span>
          <h1>The Menu</h1>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: '840px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-tag">Seasonal · Locally Sourced</span>
            <h2 className="section-title">Cuisine Crafted with Care</h2>
            <div className="divider" style={{ margin: '1rem auto' }} />
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '500px', margin: '0 auto' }}>
              Our menu celebrates the finest seasonal ingredients, sourced from local farms
              and prepared with classic Italian technique.
            </p>
          </div>

          {/* Tabs */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginBottom: '3rem',
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: '1.5rem',
          }}>
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  border: '1px solid',
                  borderRadius: 'var(--radius)',
                  background: activeTab === tab ? 'var(--color-gold)' : 'transparent',
                  borderColor: activeTab === tab ? 'var(--color-gold)' : 'var(--color-border)',
                  color: activeTab === tab ? 'var(--color-bg)' : 'var(--color-text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Menu sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {displayed.map((section) => (
              <div key={section.category}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>{section.icon}</span>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.5rem',
                    color: 'var(--color-cream)',
                  }}>
                    {section.category}
                  </h3>
                </div>
                <div style={{ marginLeft: '2rem' }}>
                  {section.items.map((item) => (
                    <MenuItem key={item.name} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <div style={{
            marginTop: '3rem',
            padding: '1.5rem',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius)',
            fontSize: '0.85rem',
            color: 'var(--color-text-muted)',
            fontStyle: 'italic',
            textAlign: 'center',
          }}>
            Menu items and prices are subject to seasonal change. Please inform your server of any allergies.
          </div>
        </div>
      </section>
    </div>
  )
}
