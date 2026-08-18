# Changelog

All notable changes to the **NOVARA** e-commerce template will be documented in this file.

---

## [1.0.0] - 2026-08-18

### Added
- Created dynamic `/shop/[category]` routes linking filters and custom catalogs.
- Added standalone `/wishlist` route and redirected `/account/wishlist` for clean page structure.
- Created standalone authentication routes `/login` and `/register`.
- Added legal policy routes (`/privacy`, `/terms`, `/shipping`, `/returns`).
- Integrated styled custom `/404` error route page.
- Created detailed HTML documentation guide (`documentation/readme.html`) and asset reference credits sheet (`documentation/credits.md`).
- Added mobile slide-out Filter Drawer overlay inside the catalog view.

### Changed
- Refactored `layout.tsx` from Client component to **Next.js Server Component** for proper server-side SEO tags metadata rendering.
- Extracted client providers, state modals, and navigation drawers into `ClientLayout.tsx` wrapper.
- Swapped static span links in the footer with Next.js `Link` components pointing to real legal pages.
