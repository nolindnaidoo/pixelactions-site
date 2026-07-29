import { CodeBlock } from '@/components/code-block'
import { ComparisonTable } from '@/components/comparison-table'
import { CoordChip } from '@/components/coord-chip'
import { InstallBlock } from '@/components/install-block'
import { JsonLd } from '@/components/json-ld'
import { COMPETITORS } from '@/lib/competitors'
import { CRATES_URL, GITHUB_URL, RELEASES_URL, SITE_URL, TAGLINE, TOOL_VERSION } from '@/lib/site'
import { FeatureLoop } from './feature-loop'
import { Hero } from './hero'
import { NonGoals } from './non-goals'
import { PlatformTable } from './platform-table'

const SIXTY_SECONDS = `pixelcoords                       # a human freezes the screen, marks and labels regions
# → Downloads/pixelcoords-captures/<timestamp>/  session.json + crops: the ground truth

pixelactions doctor --probe       # prove input permission — move the cursor 1px and back
# a missing macOS grant makes event posting a SILENT no-op; the probe raises the dialog

pixelactions plan --session <dir> click:email type:"a@b.com" key:enter verify:success
# every coordinate after conversion, acts on nothing

pixelactions run  --session <dir> click:email type:"a@b.com" key:enter verify:success --yes
# relocate → bounds check → act → verify;  exit 0 done, 1 failed, 2 malformed, 3 refused

pixelactions serve --session <dir>   # JSON per line on stdin/stdout — any language owns the loop`

const RUN_REPORT = `{
  "schema": 1,
  "session": "/Users/you/Downloads/pixelcoords-captures/20260728-182121-117",
  "executed": true,
  "steps": [
    { "index": 0, "summary": "click submit", "outcome": "verified",
      "points": [{ "x": 430.0, "y": 170.0, "space": "logical", "monitor": 0, "scale": 2.0 }],
      "elapsed_ms": 412 }
  ]
}`

const SOFTWARE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'pixelactions',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'macOS',
  softwareVersion: TOOL_VERSION,
  description: TAGLINE,
  license: 'https://opensource.org/license/mit/',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Person', name: 'nolindnaidoo', url: 'https://github.com/nolindnaidoo' },
  url: SITE_URL,
  downloadUrl: RELEASES_URL,
  sameAs: [GITHUB_URL, CRATES_URL],
}

export function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 py-12 sm:py-16">
      <Hero />
      <section className="flex flex-col gap-4">
        <h2 className="flex items-center gap-3 text-2xl font-semibold">
          <CoordChip ariaHidden tone="preview">
            60s
          </CoordChip>
          Sixty seconds
        </h2>
        <CodeBlock ariaLabel="Sixty-second tour">{SIXTY_SECONDS}</CodeBlock>
      </section>
      <FeatureLoop />
      <section className="flex flex-col gap-4">
        <h2 className="flex items-center gap-3 text-2xl font-semibold">
          <CoordChip ariaHidden tone="preview">
            report
          </CoordChip>
          What a run reports
        </h2>
        <CodeBlock ariaLabel="A run report">{RUN_REPORT}</CodeBlock>
        <p className="max-w-2xl text-sm text-foreground/70 dark:text-foreground/55">
          <code>points</code> are the coordinates actually used, relocation corrections included —
          where the click went, not where the session said it would. <code>outcome</code>{' '}
          distinguishes <em>verified</em> from <em>executed</em>: the OS accepting an event is not
          the app reacting to one, and &ldquo;nothing errored&rdquo; is not &ldquo;it worked&rdquo;.
        </p>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="flex items-center gap-3 text-2xl font-semibold">
          <CoordChip ariaHidden tone="preview">
            comparison
          </CoordChip>
          Where it stands
        </h2>
        <ComparisonTable competitors={COMPETITORS} linkCompetitors />
      </section>
      <NonGoals />
      <PlatformTable />
      <div className="flex flex-col gap-4">
        <InstallBlock variant="full" />
        <p className="max-w-2xl">
          No account, no network surface, no daemon — one small native binary that runs, acts, and
          exits. MIT-licensed, because the aim was to build the best executor in this category and
          give it away.
        </p>
      </div>
      <JsonLd data={SOFTWARE_JSON_LD} />
    </div>
  )
}
