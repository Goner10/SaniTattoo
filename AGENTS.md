# Sanitattoo Project Instructions

## Project context

Sanitattoo is a landing and catalog website for sanitary tattoo supplies, tattoo studio consumables and merchandising.

The current goal is not to build a full ecommerce platform yet. The website must present the brand, show selected products on the homepage, provide a complete catalog page with filters/search, and make it easy for customers to contact via WhatsApp.

In the future, the catalog may be migrated to WooCommerce or Shopify, so product data must be structured cleanly and consistently.

## Tech stack

- React
- Vite
- Tailwind CSS
- JavaScript
- React Router DOM
- Framer Motion
- Lucide React
- Static product data stored in `src/data/products.js`
- Static category data stored in `src/data/categories.js`

## Main routes

The website should use these routes:

- `/` for the homepage
- `/catalogo` for the complete product catalog
- `/ofertas` for offers and promoted products
- `/merchandising` for merchandising products
- `/contacto` for contact information

## Homepage structure

The homepage must not show the full catalog.

Homepage sections:

1. Header
2. Hero
3. Featured products preview
4. How to order
5. Merchandising preview
6. Footer

## Header structure

The header must include:

- Sanitattoo logo
- Catálogo
- Ofertas
- Merchandising
- Contacto
- WhatsApp button

On mobile, the header should become a responsive menu.

## Hero section

The hero should include:

- Strong headline
- Short brand/product description
- Main CTA to `/catalogo`
- Secondary CTA to WhatsApp
- Visual image or video area for brand/product content

## Featured products section

The homepage featured products section must only show products where:

```js
featured: true
```

It should include a CTA to the complete catalog page.

Do not render the full product catalog on the homepage.

## Merchandising preview section

The homepage merchandising section should only show 2 or 3 merchandising preview products.

Products should come from the main products data file using:

```js
category: "merchandising"
```

and optionally:

```js
merchandisingFeatured: true
```

It should include a CTA to `/merchandising`.

## Catalog page

The `/catalogo` page should include:

- Page title and short intro
- Search input
- Category filters
- Product grid
- Product cards
- Product detail modal or expandable detail view
- WhatsApp CTA per product

The catalog page is where the full catalog should be shown.

## Offers page

The `/ofertas` page should show products where:

```js
offer: true
```

If there are no offers, show a clean empty state with a WhatsApp CTA.

## Merchandising page

The `/merchandising` page should show all active products where:

```js
category: "merchandising"
```

## Contact page

The `/contacto` page should include:

- WhatsApp
- Instagram
- Phone
- Email if available
- Address if available
- Simple contact CTA

Do not add a contact form unless explicitly requested.

## Product data rules

Each product must include:

- `id`
- `sku`
- `name`
- `slug`
- `category`
- `categoryLabel`
- `price`
- `currency`
- `unit`
- `image`
- `alt`
- `shortDescription`
- `description`
- `tags`
- `featured`
- `offer`
- `active`

Optional fields:

- `variants`
- `merchandisingFeatured`
- `badge`
- `stockStatus`

Prices must be numbers, not strings.

Correct:

```js
price: 9
```

Incorrect:

```js
price: "9€"
```

If the product does not have a defined price yet, use:

```js
price: null
```

The currency must be stored separately:

```js
currency: "EUR"
```

## Category rules

Use normalized category keys.

Allowed categories:

- `proteccion-higiene`
- `desinfeccion-limpieza`
- `consumibles`
- `mobiliario-camilla`
- `stencil-preparacion`
- `aftercare`
- `merchandising`

Do not create new categories unless explicitly requested.

## SKU rules

SKUs must be unique.

Use the prefix:

```txt
SAN-
```

Example:

```txt
SAN-FILM-NEGRO-50X120
```

## Slug rules

Slugs must be lowercase, URL-safe and without accents.

Correct:

```txt
guantes-nitrilo-negro
```

Incorrect:

```txt
Guantes Nitrilo Negro
```

## Variant rules

If a product has multiple sizes, colors or formats, use a `variants` array.

Example:

```js
variants: [
  {
    label: "50x120",
    price: 9
  },
  {
    label: "45x300",
    price: 12
  }
]
```

Do not create separate products unless the item is clearly independent.

## Architecture rules

- Keep components small and reusable.
- Do not hardcode product cards manually in JSX.
- Product cards must be rendered from `products.js`.
- Categories must be rendered from `categories.js`.
- Do not duplicate product data inside components.
- Do not mix data normalization logic inside UI components.
- Keep reusable utilities inside `src/utils/`.
- Keep page components inside `src/pages/`.
- Keep shared components inside `src/components/`.

## Suggested folders

Use this structure:

```txt
src/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── ProductGrid.jsx
│   ├── ProductModal.jsx
│   ├── WhatsAppButton.jsx
│   └── SectionHeader.jsx
├── data/
│   ├── products.js
│   └── categories.js
├── pages/
│   ├── Home.jsx
│   ├── Catalog.jsx
│   ├── Offers.jsx
│   ├── Merchandising.jsx
│   └── Contact.jsx
├── utils/
│   ├── formatPrice.js
│   └── whatsapp.js
├── App.jsx
├── main.jsx
└── index.css
```

## Visual style

The website should feel:

- Premium
- Clean
- Professional
- Bold
- Related to tattoo culture
- Related to hygiene and sanitary supplies

Avoid:

- Overly medical/hospital design
- Overly gothic design
- Overloaded cards
- Random colors
- Excessive shadows
- Excessive animations

## Brand colors

Use this initial color palette:

```txt
Main black: #050505
White: #FFFFFF
Soft background: #F7F7F7
Border gray: #E5E5E5
Muted text: #6B6B6B
Accent red: #C1121F
Accent red hover: #9B0E18
```

## Typography

Use the custom font `Acid` for display elements if available.

Use `Acid` for:

- Main hero headline
- Decorative headings
- Brand-style section titles

Do not use `Acid` for long descriptions or catalog body text.

Use a readable sans-serif font for:

- Product descriptions
- Buttons
- Navigation
- Body text

## Animation rules

Use Framer Motion only for subtle animations.

Allowed animations:

- Fade in
- Slight slide up
- Gentle scale on product cards
- Modal transition
- Button hover transitions

Avoid:

- Heavy parallax
- Constant looping animations
- Excessive movement
- Animations that hurt mobile performance

## Accessibility rules

- Use semantic HTML where possible.
- Product images must have meaningful `alt` text.
- Buttons must be keyboard accessible.
- Interactive elements must have visible focus states.
- Do not use clickable divs when a button or link is appropriate.

## Restrictions

Do not implement yet:

- Cart
- Checkout
- Login
- User accounts
- Payment gateway
- Backend
- Database
- Admin panel
- Stock management system

The current website is a static catalog and lead generation landing page.

## WhatsApp behavior

Use WhatsApp as the main conversion action.

Product WhatsApp messages should include the product name.

Example message:

```txt
Hola, estoy interesado en este producto de Sanitattoo: Guantes de nitrilo negro
```

Keep WhatsApp URL generation inside a utility file, not duplicated across components.

## Future ecommerce compatibility

When creating or editing product data, keep in mind future export to WooCommerce or Shopify.

Avoid data structures that would be hard to convert to CSV.