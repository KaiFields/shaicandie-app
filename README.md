# Soft but Savage — The Shaicandie Rebirth Lounge Theme

A luminous Online Store 2.0 theme for Shopify that blends ethereal softness with fierce energy. The Shaicandie Rebirth Lounge experience ships with modular sections for hero storytelling, product highlights, membership registration, journal features, events, and newsletter capture.

## Getting started

1. [Install the Shopify CLI](https://shopify.dev/docs/themes/tools/cli/install).
2. Authenticate with your store and initialize theme preview:

   ```bash
   shopify login --store <your-store>
   shopify theme dev
   ```

3. Upload the theme when you are ready to share it:

   ```bash
   shopify theme push
   ```

Fonts are sourced from Google Fonts and additional customization is available through the Theme Editor (colors, content copy, menus, featured products, and more).

### Quality checks

Run the structural sanity check before committing to confirm all core Shopify assets and configuration files are present and va
lid JSON:

```bash
npm install
npm test
```

## Structure

- `layout/theme.liquid` — Base HTML shell that loads fonts, theme styles, and renders global header/footer sections.
- `templates/index.json` — Online Store 2.0 homepage composed of hero, pillar, featured product, membership, blog, events, and newsletter sections.
- `sections/*.liquid` — Modular sections backing each content block (header, footer, hero, pillars, featured products, membership, blog, events, newsletter).
- `assets/theme.css` — Brand-inspired design system with gradients, responsive layout, and component styling.
- `assets/theme.js` — Navigation toggle behavior and dynamic interactions shared across sections.
- `assets/hero-illustration.svg` — Gradient illustration reinforcing the “soft but savage” mood.
- `config/settings_schema.json` — Theme-level settings exposed in the Shopify Theme Editor.
- `config/settings_data.json` — Default preset wiring for global sections (header/footer) and theme color tokens drawn from the Shaicandie logo palette.
- `locales/en.default.json` — Translatable copy for accessibility helpers and section defaults.

## Notes

- Header and footer automatically pull navigation from Shopify menus. Assign the `main-menu` and footer menus in the Theme Editor for best results.
- Featured product cards accept real products from your catalog with graceful fallbacks when unset.
- Membership section can capture customer registrations directly from the homepage using Shopify’s customer account form.
- Default colors mirror the uploaded Shaicandie logo (deep plum base, rose quartz accent, sunrise gold highlight); tweak them from **Theme settings → Colors** if you need alternate palettes.
