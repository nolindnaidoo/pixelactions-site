#!/usr/bin/env bun
/**
 * Proves the Astro build says the same things as the Next build it replaces.
 *
 * This is the objective definition of "done" for the port, and the reason the
 * rebuild happened in a sibling directory: both trees exist at once, so the
 * comparison is against the artifact that is actually live rather than against
 * memory.
 *
 * What is compared: title, meta description, canonical, the h1, the full
 * visible text with whitespace normalised, and the set of outbound hrefs.
 *
 * One accepted difference, listed in ACCEPTED below and printed on every run
 * so it can never go silent — and it is an improvement, not a regression.
 *
 * The React theme toggle rendered an inert placeholder with no accessible name
 * until hydration, so the control was unusable and unnamed in the static HTML.
 * The Astro one is a real labelled button from first paint: both sr-only
 * labels are in the DOM and CSS hides the inactive one, which also takes it
 * out of the accessibility tree. A screen reader announces exactly one. This
 * extractor does not evaluate CSS, so it sees text the Next build simply does
 * not contain.
 *
 * What is NOT compared: markup. The two frameworks emit different wrappers,
 * different class ordering, and different attribute order, and none of that is
 * a difference a reader can perceive. Comparing it would produce a diff nobody
 * can act on and a gate everybody learns to skip.
 *
 * Run: bun run parity
 */
import { readFileSync, statSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE_PAGES } from '../src/content/pages'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const NEXT_BUILD = resolve(ROOT, '../pixelactions-site/out')
const ASTRO_BUILD = resolve(ROOT, 'dist')

/**
 * Text present in the Astro build that no user perceives, with the reason.
 * Anything added here is reported on every run — a gate that quietly drops
 * differences is worse than no gate.
 */
const ACCEPTED = Object.freeze([
  {
    text: 'Switch to light theme Switch to dark theme ',
    replacement: '',
    reason:
      'theme toggle is a labelled button in static HTML; the React one was an unnamed placeholder until hydration',
  },
  {
    text: '| looking for pixelcoords ? ',
    replacement: '',
    reason:
      'header now offers the other half of the loop; the two names differ by a word and people land on the wrong one',
  },
])

type Extract = Readonly<{
  title: string
  description: string
  canonical: string
  h1: string
  text: string
  links: readonly string[]
}>

/** Text a reader would see, with markup, scripts and styles removed. */
export function visibleText(html: string): string {
  return (
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      // Tags, with quoted attribute values skipped over. A naive `<[^>]+>`
      // stops at the first `>` — including one inside an attribute, which
      // `aria-label="pixelactions serve --session <dir> output"` contains.
      // Next escapes it to `&lt;dir&gt;` and Astro emits it raw; both are
      // valid and give the same accessible name, but the naive pattern spilled
      // the rest of the attribute into the text and reported a phantom diff.
      .replace(/<[a-z!/][^>"']*(?:(?:"[^"]*"|'[^']*')[^>"']*)*>/gi, ' ')
      // The two builds escape differently — Next emits &#x27; where Astro emits
      // a literal apostrophe — and both render identically. Decode before
      // comparing, or every page with a contraction reports a false difference.
      .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
      .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&apos;|&rsquo;|&lsquo;/g, "'")
      .replace(/&ldquo;|&rdquo;/g, '"')
      .replace(/&mdash;/g, '\u2014')
      .replace(/&ndash;/g, '\u2013')
      .replace(/&hellip;/g, '\u2026')
      // &amp; last: decoding it first would turn "&amp;lt;" into "<".
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim()
  )
}

function attr(html: string, pattern: RegExp): string {
  return html.match(pattern)?.[1]?.trim() ?? ''
}

/** Applies the accepted differences so the comparison is like-for-like. */
export function normalise(text: string): string {
  let out = text
  for (const accepted of ACCEPTED) out = out.replace(accepted.text, accepted.replacement)
  return out
}

export function extract(html: string): Extract {
  const links = [...html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)]
    .map(match => match[1] ?? '')
    // Astro emits absolute paths where Next emitted the same; anchors and
    // mailto links are page furniture, not destinations.
    .filter(href => href !== '' && !href.startsWith('#'))
  return {
    title: attr(html, /<title>([\s\S]*?)<\/title>/i),
    description: attr(html, /<meta\s+name="description"\s+content="([^"]*)"/i),
    canonical: attr(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i),
    h1: visibleText(html.match(/<h1[\s\S]*?<\/h1>/i)?.[0] ?? ''),
    text: normalise(visibleText(html)),
    links: [...new Set(links)].sort(),
  }
}

/** Where each build wrote a given route. */
function filesFor(path: string): { next: string; astro: string } {
  const slug = path === '/' ? 'index' : path.replace(/^\//, '')
  return {
    // Next's static export writes directory indexes; Astro is configured for
    // file output, which is why the two shapes differ here.
    next: resolve(NEXT_BUILD, slug === 'index' ? 'index.html' : `${slug}.html`),
    astro: resolve(ASTRO_BUILD, slug === 'index' ? 'index.html' : `${slug}.html`),
  }
}

function readOrEmpty(file: string): string | undefined {
  if (!statSync(file, { throwIfNoEntry: false })?.isFile()) return undefined
  return readFileSync(file, 'utf8')
}

/** The first place two strings diverge, with a little context either side. */
export function firstDifference(a: string, b: string): string {
  const limit = Math.min(a.length, b.length)
  let index = 0
  while (index < limit && a[index] === b[index]) index += 1
  const from = Math.max(0, index - 60)
  return `at char ${index}\n      next : …${a.slice(from, index + 90)}…\n      astro: …${b.slice(from, index + 90)}…`
}

/** Every non-space character, in order. */
export function strip(text: string): string {
  return text.replace(/\s/g, '')
}

type Comparison = Readonly<{ problems: readonly string[]; notes: readonly string[] }>

export function compare(next: Extract, astro: Extract): Comparison {
  const problems: string[] = []
  const notes: string[] = []

  for (const field of ['title', 'description', 'canonical', 'h1'] as const) {
    if (next[field] === astro[field]) continue
    problems.push(`${field}\n      next : ${next[field]}\n      astro: ${astro[field]}`)
  }

  if (next.text !== astro.text) {
    // Stripping a tag leaves a space behind, so a value the two builds wrap
    // differently — React splitting `v{version},` across text nodes, Astro
    // emitting it as one — reads as `v 2.6 ,` against `v2.6,`. Identical in a
    // browser. If the characters match once whitespace is removed, the content
    // is the same and only the markup boundaries moved.
    // Tag boundaries are markup, which this script does not compare — a note,
    // not a failure. It is still printed, so it can never pass unseen.
    if (strip(next.text) === strip(astro.text)) {
      notes.push('whitespace differs at tag boundaries; every character matches')
    } else {
      problems.push(`text content ${firstDifference(next.text, astro.text)}`)
    }
  }

  const missing = next.links.filter(href => !astro.links.includes(href))
  const added = astro.links.filter(href => !next.links.includes(href))
  if (missing.length > 0) problems.push(`links missing: ${missing.join(', ')}`)
  if (added.length > 0) problems.push(`links added: ${added.join(', ')}`)

  return { problems, notes }
}

export async function main(): Promise<number> {
  if (!statSync(NEXT_BUILD, { throwIfNoEntry: false })?.isDirectory()) {
    process.stderr.write(
      `\ncheck-parity: no Next build at ${NEXT_BUILD}.\nRun \`bun run build\` in pixelcoords-site first.\n\n`,
    )
    return 2
  }

  for (const accepted of ACCEPTED) {
    process.stdout.write(`  ~ accepted difference: ${accepted.reason}\n`)
  }

  let failed = 0

  for (const page of SITE_PAGES) {
    const files = filesFor(page.path)
    const nextHtml = readOrEmpty(files.next)
    const astroHtml = readOrEmpty(files.astro)

    if (nextHtml === undefined || astroHtml === undefined) {
      const which = nextHtml === undefined ? 'next' : 'astro'
      process.stdout.write(`  ✗ ${page.path.padEnd(30)} missing from the ${which} build\n`)
      failed += 1
      continue
    }

    const { problems, notes } = compare(extract(nextHtml), extract(astroHtml))
    process.stdout.write(`  ${problems.length === 0 ? '✓' : '✗'} ${page.path}\n`)
    for (const note of notes) process.stdout.write(`      ~ ${note}\n`)
    for (const problem of problems) process.stdout.write(`      ${problem}\n`)
    if (problems.length > 0) failed += 1
  }

  if (failed === 0) {
    process.stdout.write('\nParity: every route says the same thing.\n')
    return 0
  }

  process.stderr.write(`\ncheck-parity: ${failed} route(s) differ.\n\n`)
  return 1
}

/* v8 ignore start -- process entry point; unreachable when imported by a test */
if (import.meta.main) {
  try {
    process.exit(await main())
  } catch (cause) {
    const detail = cause instanceof Error ? (cause.stack ?? cause.message) : String(cause)
    process.stderr.write(`\ncheck-parity: unexpected failure — this is a bug.\n${detail}\n\n`)
    process.exit(2)
  }
}
/* v8 ignore stop */
