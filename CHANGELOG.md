# Changelog

Written by hand. An entry explains why something mattered, which a list of
commit subjects cannot — the Conventional Commit prefixes help someone scan
`git log`, they do not replace this file.

## Unreleased

### Rebuilt in Astro

The site was a Next.js static export. It is now Astro, and the history starts
at that rebuild because no file survives it.

The reason is the content security policy. Next's inline bootstrap scripts
would force `unsafe-inline`, which is most of what a policy is for. Astro ships
no framework JavaScript, so `security.csp` hashes the one inline script — the
pre-paint theme setter — and the served policy has no escape hatch in it.
`vercel.json` keeps only what a meta tag cannot express: `frame-ancestors`,
`upgrade-insecure-requests`, and the transport and cache headers.

Carried over unchanged, because they are product rules rather than framework
details: the page registry that feeds the sitemap, footer, 404 list, head tags,
OG cards and every end-to-end loop from one place; the claim quarantine, where
version-specific competitor facts live in one file behind a dated stamp; and
the four-page cap on comparisons.

Text parity with the Next build was proven route by route before the swap —
title, description, canonical, h1, every character of visible text, and every
outbound link. Two differences are recorded and printed on every run rather
than hidden: the theme toggle is now a labelled button in the static HTML
instead of an unnamed placeholder awaiting hydration, and the header offers the
other half of the loop, because the two tools' names differ by one word and
people arrive at the wrong one.

### Fixed during the port

The gates inherited from pixelcoords.dev found all of these; none was noticed
by reading.

- **The footer advertised the wrong tool's documentation** — pixelcoords'
  configuration, performance and troubleshooting pages instead of this tool's
  flow-file and line-protocol references.
- **The web manifest still named `pixelcoords`**, so an installed shortcut and
  every consumer reading the manifest got the sister tool's name.
- **Code samples rendered with phantom indentation.** `pre` preserves
  whitespace, and the converted markup put the expression on its own indented
  line, so that indentation shipped as content.
- **The version claim was a release behind** at 0.9.6, caught by the drift
  check against crates.io.
- **The parity script mis-parsed its own input.** Its tag-stripping pattern
  ended a tag at the first `>`, including the one inside
  `aria-label="… --session <dir> output"`, spilling attribute text into the
  page content it compared.

### Changed

- **The tool's name is a constant.** Four shared components spelled
  `pixelcoords` literally, and this scaffold is copied between the two sites —
  a literal name ships the wrong one in silence. They read `TOOL_NAME` from
  `src/content/site.ts` now, and the Open Graph card derives its domain from
  `SITE_URL` rather than repeating it.
- **No demo video.** This site never had one, so the component and its
  motion specs are gone rather than left asserting an element that does not
  exist.
- **The headline is no longer required to be a substring of the title.** That
  rule encoded a content decision from the other site; here the title leads
  with what the tool does and the h1 is the tagline, deliberately.
