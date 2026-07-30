import { expect, test } from '@playwright/test'
import { SITE_PAGES } from '@/lib/pages'

// Visual regression: full-page snapshots per page × theme. Catches the class
// of bug nothing else here can — an unintended visual change that is still
// axe-clean and still builds. The video is masked (its current frame is
// nondeterministic).
//
// These specs run ONLY inside the Playwright container (`bun run e2e:visual`,
// and the `visual` CI job) — never natively. Font rasterization differs
// between macOS, a bare CI runner, and that image, so a baseline is only
// comparable to a render from the same place. One environment renders them,
// one set of baselines exists, and moving between machines changes nothing.
// See scripts/visual.ts and MAINTENANCE.md.
const SCHEMES = ['light', 'dark'] as const

test.skip(
  process.env.PW_VISUAL === undefined,
  'container-only — run `bun run e2e:visual` (needs Docker)',
)

for (const { path } of SITE_PAGES) {
  for (const scheme of SCHEMES) {
    test(`${path} looks right in ${scheme}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' })
      await page.goto(path)
      await page.waitForLoadState('networkidle')
      await expect(page).toHaveScreenshot(
        `${path === '/' ? 'home' : path.slice(1).replaceAll('/', '-')}-${scheme}.png`,
        {
          fullPage: true,
          mask: [page.locator('video')],
          maxDiffPixelRatio: 0.02,
        },
      )
    })
  }
}
