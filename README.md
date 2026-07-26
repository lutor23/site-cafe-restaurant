# Café Fausse — Full-Stack Restaurant Website

A complete web application for Café Fausse, a fine-dining restaurant in Washington DC.
Built with **React + Vite** (frontend), **Flask** (backend), and **PostgreSQL** (database).

---

## Project Structure

```
cafe-fausse/
├── backend/
│   ├── app.py              # Flask API (reservations + newsletter)
│   ├── requirements.txt
│   └── .env.example
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── components/
        │   ├── Navbar.jsx
        │   └── Footer.jsx   # Includes newsletter signup
        └── pages/
            ├── Home.jsx
            ├── Menu.jsx
            ├── Reservations.jsx
            ├── AboutUs.jsx
            └── Gallery.jsx
```

---

## Prerequisites

- Node.js ≥ 18
- Python ≥ 3.10
- PostgreSQL ≥ 14

---

## Setup: Database

```bash
# Create the database
psql -U postgres -c "CREATE DATABASE cafe_fausse;"
```

The tables are created automatically when you first run the Flask app (`init_db()` is called on startup).

**Schema:**

```sql
-- Customers table
CREATE TABLE customers (
    customer_id       SERIAL PRIMARY KEY,
    customer_name     VARCHAR(255) NOT NULL,
    email             VARCHAR(255) NOT NULL UNIQUE,
    phone_number      VARCHAR(50),
    newsletter_signup BOOLEAN DEFAULT FALSE
);

-- Reservations table
CREATE TABLE reservations (
    reservation_id SERIAL PRIMARY KEY,
    customer_id    INTEGER REFERENCES customers(customer_id),
    time_slot      TIMESTAMP NOT NULL,
    table_number   INTEGER NOT NULL
);
```

---

## Setup: Backend

```bash
cd backend

# Copy environment file and fill in your DB credentials
cp .env.example .env

# Create a virtual environment
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the Flask server (runs on port 5000)
python app.py
```

---

## Setup: Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start the Vite dev server (runs on port 5173)
npm run dev
```

The Vite dev server proxies `/api/*` requests to `http://localhost:5000`, so both servers must be running.

Open http://localhost:5173 in your browser.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/reserve` | Make a reservation |
| POST | `/api/newsletter` | Subscribe to newsletter |

### POST `/api/reserve`
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "(202) 555-0000",
  "time_slot": "2026-07-25T19:00:00.000Z",
  "guests": 2,
  "newsletter": false
}
```

### POST `/api/newsletter`
```json
{ "email": "jane@example.com" }
```

---

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, about snippet, featured dish, awards, reviews, CTA |
| Menu | `/menu` | Categorized menu with tab filter |
| Reservations | `/reservations` | Reservation form with backend integration |
| About Us | `/about` | Founders bios, restaurant history, values |
| Gallery | `/gallery` | Photo grid with lightbox, awards, reviews |

---

## Design

- **Color palette:** Deep navy/charcoal backgrounds, gold accents (#c9a96e), cream text
- **Typography:** Cormorant Garamond (serif) + Raleway (sans-serif)
- **Layout:** CSS Flexbox and Grid throughout
- **Responsive:** Mobile-first, works on all screen sizes
- **Images:** Royalty-free from Unsplash

---

## Features Implemented (SRS compliance)

- ✅ FR-1 through FR-18 — all functional requirements
- ✅ Reservation form: name, email, phone (optional), time slot, guest count, newsletter opt-in
- ✅ 30-table availability check per time slot with random table assignment
- ✅ Success / error messaging for reservations
- ✅ Email newsletter signup with validation, stored in DB
- ✅ Gallery lightbox with keyboard navigation (← → Esc)
- ✅ Awards: Culinary Excellence 2022, Restaurant of the Year 2023, Best Fine Dining 2023
- ✅ Customer reviews displayed on Home and Gallery pages
- ✅ PostgreSQL Customers + Reservations tables
- ✅ Responsive design (Flexbox + Grid, mobile hamburger nav)
