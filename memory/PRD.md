# Sahuja Interiors — Portfolio Website PRD

## Original Problem Statement
Create a modern, premium, fully responsive interior design portfolio website for "Sahuja Interiors" using React, Tailwind, Framer Motion, Lucide React, and React Router. Clean luxurious minimal UI with white/beige/black/gold palette. Sections: Hero, About, Services (6), Portfolio Gallery with category filters, Testimonials, Process, Contact + Map, Footer.

## User Choices
- Design vibe: Minimal modern — white/black + subtle gold accents, clean sans-serif
- Contact form: Store in MongoDB (email integration skipped for now)
- Receiving email (display only): rajankumarrolly01@gmail.com
- Logo: typographic wordmark (user to swap later)
- Contact/address: placeholder Mumbai address (to be updated)

## Architecture
- Frontend: React 19 + Tailwind + Framer Motion + Lucide + Sonner toasts. Single-page layout with smooth-scroll nav.
- Backend: FastAPI + Motor (async MongoDB). Routes under `/api` prefix.
- DB collections: `contacts`, `status_checks`.

## Core Requirements (static)
- Full-screen hero with tagline & dual CTAs
- Sticky navbar with smooth scroll + mobile menu
- About with stats + image
- 6 service cards (Residential, Office, Restaurant, Modular Kitchen, Bedroom, Kids Room)
- Filterable portfolio gallery (7 categories + All) with hover zoom + overlay
- Testimonials with 5-star ratings
- 4-step process
- Contact form (POST /api/contact) + Google Maps + social icons
- Footer with quick links + studio info

## What's Been Implemented (2025-12)
- Full site built & tested end-to-end (100% backend, 100% frontend test pass, iteration 2)
- Backend: POST /api/contact, GET /api/contacts with validation (EmailStr)
- Frontend: Navbar, Hero, About, Services, Portfolio (10 sample projects, filterable), Testimonials (4), Process (4), Contact (form + grayscale Maps embed + socials), Footer
- SEO meta tags in public/index.html
- Cormorant Garamond (headings) + Outfit (body) fonts

## Backlog / Next Tasks (Prioritized)
### P1
- Replace typographic wordmark with user's uploaded logo
- Update placeholder phone/address with real business details
- Add email notifications on contact submission (Resend/SendGrid integration)
- Admin dashboard to view contact submissions (/admin with auth)

### P2
- Expand portfolio with real project photography + individual project detail pages
- Add blog/journal for SEO (editorial style)
- Newsletter subscription (Mailchimp/Resend)
- Multi-language (EN / HI) support
- CMS integration (Sanity / Contentful) for services, portfolio, testimonials

### P3
- 3D room walkthroughs / virtual tours
- Instagram feed embed
- Before/after slider component
