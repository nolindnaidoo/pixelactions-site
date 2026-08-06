import { SITE_URL } from './site'
// THE page registry — the single source every page-shaped list renders from:
// sitemap, footer nav, the 404's page list, and all three e2e loops (axe,
// reflow, seo). Adding the sixth page (the one remaining slot under the cap)
// is: one entry here, the page + opengraph-image files, darwin snapshots via
// `bun run snapshots`, linux via the update-snapshots workflow. Nothing else.
export type SitePage = {
  readonly path: string
  /** Document title, used absolute (the layout template is for fallbacks). */
  readonly title: string
  readonly description: string
  /** Substring the page's h1 must contain — asserted by e2e. */
  readonly headline: string
  /** Label in the footer nav and the 404 page list. */
  readonly navLabel: string
  readonly ogKicker: string
  readonly ogTitle: string
  /** Bumped by hand when the page's content changes — feeds the sitemap. */
  readonly lastModified: string
  readonly sitemapPriority: number
}

export const SITE_PAGES: readonly SitePage[] = Object.freeze([
  {
    path: '/',
    title: 'pixelactions — Execute desktop flows from reviewable files: find, act, assert',
    description:
      'Run desktop automation against a pixelcoords session: click, type, and drag by label — every target re-located before acting, verified after, refused rather than guessed. One binary, four surfaces: chained commands, TOML flow files, a JSON line protocol for any language, and an MCP server a model can drive. Free, MIT. macOS, Windows, and Linux (X11 and Wayland).',
    headline: 'Consume human-verified coordinates',
    navLabel: 'Home',
    ogKicker: 'pixelactions',
    ogTitle: 'Consume human-verified coordinates, perform the interaction, confirm it landed',
    lastModified: '2026-08-04',
    sitemapPriority: 1,
  },
  {
    path: '/vs/pyautogui',
    title: 'pixelactions vs PyAutoGUI',
    description:
      'PyAutoGUI made screen automation a Python one-liner. pixelactions keeps the coordinates but moves them out of code: labels from a human-marked session, relocation before acting, verification after, exit codes — and a line protocol so any language, Python included, owns the loop.',
    headline: 'pixelactions vs PyAutoGUI',
    navLabel: 'vs PyAutoGUI',
    ogKicker: 'comparison',
    ogTitle: 'pixelactions vs PyAutoGUI',
    lastModified: '2026-07-30',
    sitemapPriority: 0.8,
  },
  {
    path: '/vs/sikulix',
    title: 'pixelactions vs SikuliX',
    description:
      'SikuliX sees and acts inside one JVM runtime. pixelactions splits the loop: a human marks ground truth in pixelcoords, then a small native binary executes flows with relocation, verification, and exit codes — no JVM, no scripting language.',
    headline: 'pixelactions vs SikuliX',
    navLabel: 'vs SikuliX',
    ogKicker: 'comparison',
    ogTitle: 'pixelactions vs SikuliX',
    lastModified: '2026-07-30',
    sitemapPriority: 0.8,
  },
  {
    path: '/vs/autohotkey',
    title: 'pixelactions vs AutoHotkey',
    description:
      'AutoHotkey is the Windows automation institution — a full scripting language. pixelactions is deliberately not a language: a list of steps over human-marked regions, re-located and verified at run time. Both run on Windows; the difference is one of kind — an honest comparison.',
    headline: 'pixelactions vs AutoHotkey',
    navLabel: 'vs AutoHotkey',
    ogKicker: 'comparison',
    ogTitle: 'pixelactions vs AutoHotkey',
    lastModified: '2026-07-30',
    sitemapPriority: 0.8,
  },
  {
    path: '/how-to/automate-desktop-clicks',
    title: 'How to automate mouse clicks and keystrokes on macOS, Windows, and Linux',
    description:
      'The built-in way on each OS — cliclick and AppleScript, PowerShell and AutoHotkey, xdotool and ydotool — each with the pitfall that breaks it, and what it takes for a click to keep landing after the UI moves: relocation, verification, exit codes.',
    headline: 'How to automate mouse clicks',
    navLabel: 'Automate desktop clicks',
    ogKicker: 'how-to',
    ogTitle: 'Automate desktop clicks on macOS, Windows, and Linux',
    lastModified: '2026-08-05',
    sitemapPriority: 0.9,
  },
])

export function pageByPath(path: string): SitePage {
  const found = SITE_PAGES.find(entry => entry.path === path)
  if (found === undefined) throw new Error(`unknown page: ${path} — add it to src/content/pages.ts`)
  return found
}

/**
 * Per-page document head, from the registry — canonical, OG and twitter card
 * in one place so a new page cannot forget any of them.
 *
 * Framework-neutral by design: Layout.astro renders these fields directly.
 * The previous version returned Next's `Metadata`, which coupled the registry
 * to the framework and would have to be rewritten on every port.
 */
export type PageHead = Readonly<{
  title: string
  description: string
  canonical: string
  ogUrl: string
  ogImage: string
  ogKicker: string
  ogTitle: string
}>

/**
 * The one absolute URL for a page — the canonical, and the only thing any
 * surface should point at.
 *
 * `/` canonicalises to the bare origin, matching what every other signal on
 * the site says. A trailing slash would be a second URL for the same page, and
 * that is exactly how this drifted: the sitemap and `og:url` each rebuilt the
 * URL from `SITE_URL + path`, so the home page was advertised as
 * `https://pixelcoords.dev/` while its own canonical said otherwise.
 */
export function canonicalUrl(path: string): string {
  return path === '/' ? SITE_URL : `${SITE_URL}${path}`
}

export function pageHead(path: string): PageHead {
  const page = pageByPath(path)
  return Object.freeze({
    title: page.title,
    description: page.description,
    canonical: canonicalUrl(page.path),
    ogUrl: canonicalUrl(page.path),
    ogImage: `${SITE_URL}${ogImagePath(page.path)}`,
    ogKicker: page.ogKicker,
    ogTitle: page.ogTitle,
  })
}

/** Where `scripts/build-og.ts` writes this page's card. */
export function ogImagePath(path: string): string {
  const slug = path === '/' ? 'home' : path.replace(/^\//, '').replace(/\//g, '-')
  return `/og/${slug}.png`
}
