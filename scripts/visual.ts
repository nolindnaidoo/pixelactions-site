import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// Visual baselines are rendered by ONE environment: the Playwright container
// named in .playwright-image. Font rasterization differs between macOS, a
// bare ubuntu-latest runner, and that image — so a baseline is only
// comparable to a render from the same place. Keeping two platform-suffixed
// sets meant regenerating in two places and living with whichever was stale;
// this makes the container the single authority, and any machine reproduces
// it byte-for-byte. CI judges with the same image (see .github/workflows/ci.yml).
//
// Usage: bun scripts/visual.ts [--update-snapshots]
// Assumes `out/` is already built — the container only serves and renders.

const root = process.cwd()
const image = readFileSync(join(root, '.playwright-image'), 'utf8').trim()

// The image ships its own @playwright/test and browsers; a version skew
// against the mounted node_modules is the one way this setup fails
// silently, and Dependabot bumps the package without touching the image.
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const declared: string = pkg.devDependencies['@playwright/test']
const wanted = declared.replace(/^[^0-9]*/, '')
const tagged = image.match(/:v([0-9.]+)-/)?.[1]

if (tagged !== wanted) {
  console.error(
    `Playwright version skew: package.json wants ${wanted}, .playwright-image pins ${tagged}.\n` +
      `Update .playwright-image to mcr.microsoft.com/playwright:v${wanted}-noble and regenerate baselines.`,
  )
  process.exit(1)
}

// The server and the browser both live inside the container, so nothing is
// published to the host — no port mapping, no host networking (which Docker
// Desktop gates behind a setting).
const args = [
  'run',
  '--rm',
  '--init',
  '-v',
  `${root}:/work`,
  '-w',
  '/work',
  '-e',
  'PW_VISUAL=1',
  '-e',
  'PW_IN_CONTAINER=1',
  image,
  'npx',
  'playwright',
  'test',
  'e2e/visual.e2e.ts',
  ...process.argv.slice(2),
]

const result = spawnSync('docker', args, { stdio: 'inherit' })

if (result.error !== undefined) {
  console.error(
    `Could not run docker: ${result.error.message}\nIs Docker Desktop running? The visual suite needs it.`,
  )
  process.exit(1)
}
process.exit(result.status ?? 1)
