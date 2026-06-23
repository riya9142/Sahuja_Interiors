# Sahuja Interiors — Admin Credentials

## Studio Admin (for /admin panel)
- Admin URL: `/admin`
- Email: `rajankumarrolly01@gmail.com`
- Password: `RajanSahuja@2026`
- Role: admin
- Token storage: localStorage key `sahuja_admin_token` (Bearer JWT, 7-day expiry)

## Auth Endpoints
- POST `/api/auth/login` — body `{email, password}` → `{access_token, email}`
- GET `/api/auth/me` — requires `Authorization: Bearer <token>`

## Works Endpoints
- GET `/api/works` — public
- GET `/api/works/by-service/:slug` — public (slugs: kitchen, living, bedroom, bathroom, dining, office, kids, closet, staircase, hall, entry)
- POST `/api/works` — Bearer admin; body `{service_slug, image_base64, caption?}`
- DELETE `/api/works/:id` — Bearer admin
