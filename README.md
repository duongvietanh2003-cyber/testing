# Nook&Co – static store
Pages: index, shop (search/sort/categories), product, cart + checkout, track, contact. No build step.
**Deploy:** push to GitHub → vercel.com → Add New Project → import repo → Framework "Other" → Deploy.
**Edit products:** `P` array at top of `app.js`. **Contact email:** set `FORMSPREE` in `app.js` (formspree.io).
**Note:** cart/orders live in the browser's localStorage (demo). For real orders/payments, connect a backend (e.g. Stripe + a database).
