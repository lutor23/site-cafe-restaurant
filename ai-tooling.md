# AI Tooling Summary — Café Fausse Project

## Tools Used

### Claude (Anthropic) — Cowork / Claude AI
The primary tool used in this project was **Claude** (claude-sonnet-4), accessed via the Cowork desktop application. Both the SRS and project brief PDFs were loaded directly into the conversation context, and Claude generated the complete full-stack application from those documents.

---

## How AI Was Used

### 1. Planning & Architecture
Claude analyzed the SRS document and the project overview to determine the full architecture:
- React + Vite frontend (5 pages with React Router)
- Flask backend (2 API endpoints with CORS)
- PostgreSQL database (Customers + Reservations tables as specified in SRS)

This replaced the need to manually map requirements to code structure.

### 2. Backend Generation
Claude produced `app.py` in full, including:
- `init_db()` for automatic table creation on startup
- `POST /api/reserve`: customer upsert, availability check against 30 tables, random table assignment, confirmation response
- `POST /api/newsletter`: email validation, upsert into customers table with `newsletter_signup = TRUE`
- Proper error handling with appropriate HTTP status codes

### 3. Frontend Generation
Claude built all 5 React pages from scratch, applying the specific SRS requirements directly (contact info, hours, menu items/prices, founder names/biographies, awards, reviews). Design decisions included:
- Luxury fine-dining color palette (deep backgrounds, gold accents, serif typography)
- CSS-in-JS inline styles using CSS variables defined in `index.css`
- Flexbox and CSS Grid layouts throughout (Navbar, footer, gallery grid, menu sections)
- Responsive hamburger nav, category filter tabs, gallery lightbox with keyboard navigation

### 4. Component Architecture
Claude structured the project with reusable components (`Navbar`, `Footer` with newsletter form) and clean page separation, keeping each page self-contained with its own local state.

---

## What Worked Well
- Loading the full SRS PDF into context meant Claude could directly translate every FR-N requirement into code without me having to re-explain them
- Claude got the design aesthetic right on the first pass — the gold/dark color palette matched a fine dining brand immediately
- Form validation logic (reservations + newsletter) was generated correctly, including edge cases (email format, required fields, slot capacity)
- The Vite proxy config was automatically set up so frontend/backend communicate without CORS issues during development

## What Required Adjustment
- Gallery hover effects needed inline event handlers (`onMouseEnter`/`onMouseLeave`) since the project doesn't use a separate CSS file with class-based hover states — a minor tradeoff of the CSS-in-JS approach
- Time slot generation logic (closed Mondays, different closing hours Sunday vs. weekdays) required careful prompting to get right
- Image sources: the project uses Unsplash URLs for royalty-free photos; the AI-generated images provided in the brief can be swapped in by replacing those URLs in the respective page files

## Overall Assessment
Using Claude to generate a full-stack application from an SRS document saved approximately 8–12 hours of boilerplate and initial implementation time. The output quality was high enough that minimal hand-editing was required. The most valuable workflow was: load SRS → generate all files → review each file for correctness → run and verify.
