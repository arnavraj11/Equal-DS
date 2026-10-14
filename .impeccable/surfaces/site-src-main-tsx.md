---
version: 1
slug: "site-src-main-tsx"
primary_target: "site/src/main.tsx"
related_targets: []
---

# Surface: Equal AI design-system website (`site/`)

Scope: the whole documentation site, replacing Storybook. Visitor mode: **Read** (internal team looking something up mid-task). Brand world fixed by PRODUCT.md (Equal green / lime, DM Sans, supplied art).

Audience & job: designers, Android + web engineers and PMs. They arrive with a question ("which token / component / spec?"), find it, copy a name or snippet, and leave. Success means the answer is found in seconds and trusted because it's the live component.

Constraints: every example renders the real `web/src` component; light + dark everywhere; WCAG 2.2 AA; static build; per-route code splitting; no invented claims.

## Direction contract

THESIS: A calm, product-grade design-system site in the Astryx mould (user-directed reference, structure only). The home page shows the system's quality through live components composed into Equal AI moments; reference lives in four clear sections. It refuses a phone-wall home and flows scattered across pages. Flows live only under Screens.

OWN-WORLD: Equal's own surfaces: bg/primary ground, white slabs with 20–24dp radii, brand green only for actions and current state (lime in dark), DM Sans 400/500 with −0.026em tracking, tabular numerals, Material Symbols. Live components sit on quiet canvases; code names are small copyable tags.

STORY: A teammate lands, sees the system's quality in real components in seconds, and picks a door: Docs (setup + foundations), Components (grid → tabbed page), Screens (screens and flows), or Playground (the clickable prototype). ⌘K reaches anything.

FIRST VIEWPORT: A top nav (Equal lockup left; Docs · Components · Screens · Playground centre-right; search, theme switch, a "Get started" pill). A centred hero: the Equal logo lockup at display scale, a one-line statement, two pill buttons (Get started, Browse components), and a quiet meta line. Below the fold line, a bento showcase of live components begins (assistant card, chat row, call summary, plan card, AI panel, instruction card).

FORM: Astryx-structured docs site (user-pinned reference, replacing the App Map form, seed 4f873d38). Sections: Docs, Components, Screens, Playground.

Signature interaction: live component tiles on home and on the components overview (real components, not pictures), plus Trace on the Screens pages: hovering a live screen names its components, and clicking opens the page. Motion: 160–200ms standard easing; reduced motion is instant.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
