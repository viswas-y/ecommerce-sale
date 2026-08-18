# NOVARA — Premium eCommerce Marketplace Template

A premium, production-quality, reusable eCommerce website template designed for commercial sale. Built with Next.js, React 19, TypeScript, Tailwind CSS, Framer Motion, and Zustand state management.

## 🚀 Quick Start & Installation

To launch the project locally, install dependencies and start the Next.js development server:

```bash
# 1. Install Node modules
npm install

# 2. Run local development server
npm run dev

# 3. Create production bundle
npm run build
```

## 🛠 Technology Stack

- **Core Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS 4
- **State Management:** Zustand (Persisted Cart & Wishlist state)
- **Forms & Validation:** React Hook Form, Zod
- **Analytics Charts:** Recharts
- **Icons & Animations:** Lucide React, Framer Motion

## 🎨 Branding & Customization

The theme design is built to be easily rebranded. Change details globally in the following directories:

1. **Brand Profile:** Modify `src/lib/brand.ts` to update the logo text, company contact, email, and coordinates.
2. **Colors & Tokens:** Edit color scales variables in `src/app/globals.css` (using HSL tokens for light/dark modes).
3. **Product Catalog:** Mock products data can be updated in `src/data/products.ts`. Add category tags, color options, price specs, and image references.

## 🔗 Connecting APIs & Payment Gateways

For fully functional production environments, the local mock architecture can be easily replaced:

- **Database integration:** Swap mock states references inside page routes with `Prisma` / `Supabase` / `PostgreSQL` connections.
- **Payment processing:** Implement Stripe/PayPal integrations inside `src/app/checkout/page.tsx` within the submit handler.
- **CMS/Blog entries:** Pull journal lists from Headless APIs (e.g., Sanity.io or Contentful) instead of `src/data/blog.ts`.
