import { CodeBlock } from '@/components/code-block'
import { CoordChip } from '@/components/coord-chip'
import { RELEASES_URL } from '@/lib/site'

// Two rows, no tabs: the cargo route and the prebuilt-binary route. `full`
// adds the platform notes from the tool README and docs/CLI.md.
export function InstallBlock({ variant }: { readonly variant: 'full' | 'compact' }) {
  return (
    <section id="install" className="flex scroll-mt-8 flex-col gap-4">
      <h2 className="flex items-center gap-3 text-2xl font-semibold">
        <CoordChip ariaHidden tone="preview">
          install
        </CoordChip>
        Two ways in
      </h2>
      <CodeBlock ariaLabel="Install command" copy="cargo install pixelactions">
        cargo install pixelactions
      </CodeBlock>
      <p>
        Or skip the toolchain:{' '}
        <a
          className="underline decoration-border-token underline-offset-4 hover:decoration-foreground"
          href={RELEASES_URL}
        >
          prebuilt binaries
        </a>{' '}
        — download, unpack, run.
      </p>
      {variant === 'compact' ? null : (
        <div className="flex flex-col gap-2 text-sm text-foreground/70 dark:text-foreground/55">
          <p>
            Rust 1.88+ for the cargo route. pixelactions drives the pixelcoords binary for
            capture-time work — install both:
          </p>
          <CodeBlock ariaLabel="Install both tools" copy="cargo install pixelcoords pixelactions">
            cargo install pixelcoords pixelactions
          </CodeBlock>
          <p>
            macOS asks for an Accessibility grant on first run. The grant attaches to the terminal
            that launches pixelactions, not the binary — <code>doctor --probe</code> proves the
            grant instead of assuming it.
          </p>
        </div>
      )}
    </section>
  )
}
