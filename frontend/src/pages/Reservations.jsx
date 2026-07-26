import { useState } from 'react'
import axios from 'axios'

const HERO_IMG = 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1400&q=80'

// Generate available time slots for next 30 days, Tue-Sun 5pm-10pm
function generateTimeSlots() {
  const slots = []
  const now = new Date()
  for (let d = 0; d < 30; d++) {
    const date = new Date(now)
    date.setDate(now.getDate() + d + 1)
    const day = date.getDay() // 0=Sun, 1=Mon
    if (day === 1) continue // closed Monday
    const maxHour = day === 0 ? 21 : 22 // Sunday closes 9pm, others 10pm
    for (let h = 17; h < maxHour; h++) {
      for (const min of [0, 30]) {
        const dt = new Date(date)
        dt.setHours(h, min, 0, 0)
        const label = dt.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
          + ' at '
          + dt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
        slots.push({ label, value: dt.toISOString() })
      }
    }
  }
  return slots
}

const TIME_SLOTS = generateTimeSlots()

const initialForm = {
  name: '',
  email: '',
  phone: '',
  time_slot: '',
  guests: '2',
  newsletter: false,
}

export default function Reservations() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) // null | 'success' | 'error'
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [reservation, setReservation] = useState(null)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required.'
    if (!form.email.trim()) e.email = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email.'
    if (!form.time_slot) e.time_slot = 'Please select a time slot.'
    if (!form.guests || form.guests < 1 || form.guests > 20) e.guests = 'Guests must be between 1 and 20.'
    return e
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    setStatus(null)
    try {
      const res = await axios.post('/api/reserve', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        time_slot: form.time_slot,
        guests: parseInt(form.guests),
        newsletter: form.newsletter,
      })
      setStatus('success')
      setMsg(res.data.message)
      setReservation(res.data)
      setForm(initialForm)
    } catch (err) {
      setStatus('error')
      setMsg(err.response?.data?.message || 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const labelStyle = {
    fontSize: '0.72rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--color-cream-muted)',
    display: 'block',
    marginBottom: '0.4rem',
  }

  const inputStyle = {
    width: '100%',
    background: 'var(--color-surface-light)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius)',
    color: 'var(--color-text)',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.95rem',
    padding: '0.85rem 1rem',
    outline: 'none',
    transition: 'border-color 0.3s',
  }

  const errorStyle = { fontSize: '0.78rem', color: '#e88', marginTop: '0.3rem' }

  return (
    <div>
      {/* Hero */}
      <div className="page-hero">
        <img src={HERO_IMG} alt="Table setting" />
        <div className="page-hero-content">
          <span className="section-tag">Join Us</span>
          <h1>Reservations</h1>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ maxWidth: '760px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-tag">Book Your Table</span>
            <h2 className="section-title">Reserve Your Evening</h2>
            <div className="divider" style={{ margin: '1rem auto' }} />
            <p style={{ color: 'var(--color-text-muted)' }}>
              We accommodate up to 30 tables per time slot. Please fill in your details below.
            </p>
          </div>

          {/* Success confirmation */}
          {status === 'success' && reservation && (
            <div style={{
              background: 'rgba(201,169,110,0.08)',
              border: '1px solid var(--color-gold-dark)',
              borderRadius: 'var(--radius)',
              padding: '2rem',
              textAlign: 'center',
              marginBottom: '2rem',
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✓</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-cream)', marginBottom: '0.75rem' }}>
                Reservation Confirmed!
              </h3>
              <p style={{ color: 'var(--color-text-muted)' }}>{msg}</p>
              <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                Reservation ID: <strong style={{ color: 'var(--color-gold)' }}>#{reservation.reservation_id}</strong>
              </p>
              <button
                onClick={() => { setStatus(null); setReservation(null) }}
                className="btn btn-outline"
                style={{ marginTop: '1.5rem', fontSize: '0.72rem' }}
              >
                Make Another Reservation
              </button>
            </div>
          )}

          {/* Error message */}
          {status === 'error' && (
            <div className="alert alert-error" style={{ marginBottom: '2rem' }}>
              {msg}
            </div>
          )}

          {/* Form */}
          {status !== 'success' && (
            <form onSubmit={handleSubmit} noValidate style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius)',
              padding: '2.5rem',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {/* Name */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="name" style={labelStyle}>Full Name *</label>
                  <input
                    id="name" name="name" type="text"
                    value={form.name} onChange={handleChange}
                    placeholder="Jane Smith"
                    style={{ ...inputStyle, borderColor: errors.name ? '#e88' : undefined }}
                  />
                  {errors.name && <div style={errorStyle}>{errors.name}</div>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" style={labelStyle}>Email Address *</label>
                  <input
                    id="email" name="email" type="email"
                    value={form.email} onChange={handleChange}
                    placeholder="jane@example.com"
                    style={{ ...inputStyle, borderColor: errors.email ? '#e88' : undefined }}
                  />
                  {errors.email && <div style={errorStyle}>{errors.email}</div>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" style={labelStyle}>Phone Number (optional)</label>
                  <input
                    id="phone" name="phone" type="tel"
                    value={form.phone} onChange={handleChange}
                    placeholder="(202) 555-0000"
                    style={inputStyle}
                  />
                </div>

                {/* Time Slot */}
                <div>
                  <label htmlFor="time_slot" style={labelStyle}>Date & Time *</label>
                  <select
                    id="time_slot" name="time_slot"
                    value={form.time_slot} onChange={handleChange}
                    style={{ ...inputStyle, borderColor: errors.time_slot ? '#e88' : undefined }}
                  >
                    <option value="">Select a time slot…</option>
                    {TIME_SLOTS.map(slot => (
                      <option key={slot.value} value={slot.value}>{slot.label}</option>
                    ))}
                  </select>
                  {errors.time_slot && <div style={errorStyle}>{errors.time_slot}</div>}
                </div>

                {/* Guests */}
                <div>
                  <label htmlFor="guests" style={labelStyle}>Number of Guests *</label>
                  <select
                    id="guests" name="guests"
                    value={form.guests} onChange={handleChange}
                    style={{ ...inputStyle, borderColor: errors.guests ? '#e88' : undefined }}
                  >
                    {Array.from({ length: 20 }, (_, i) => i + 1).map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                    ))}
                  </select>
                  {errors.guests && <div style={errorStyle}>{errors.guests}</div>}
                </div>

                {/* Newsletter checkbox */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox" name="newsletter"
                      checked={form.newsletter} onChange={handleChange}
                      style={{ width: 'auto', accentColor: 'var(--color-gold)' }}
                    />
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                      Subscribe to our newsletter for exclusive offers and culinary updates
                    </span>
                  </label>
                </div>

                {/* Submit */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '0.8rem' }}
                  >
                    {loading ? 'Processing…' : 'Confirm Reservation'}
                  </button>
                </div>
              </div>

              <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                * Required fields. Cancellations must be made 24 hours in advance.
              </p>
            </form>
          )}

          {/* Info cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginTop: '2.5rem',
          }}>
            {[
              { icon: '📍', label: 'Location', value: '1234 Culinary Ave, DC' },
              { icon: '📞', label: 'Phone', value: '(202) 555-4567' },
              { icon: '🕐', label: 'Hours', value: 'Tue–Sat: 5–11pm\nSun: 5–9pm' },
            ].map((info) => (
              <div key={info.label} style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)',
                padding: '1.25rem',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{info.icon}</div>
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.4rem' }}>{info.label}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', whiteSpace: 'pre-line' }}>{info.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
