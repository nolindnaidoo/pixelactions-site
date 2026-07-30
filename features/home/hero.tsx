import { CodeBlock } from '@/components/code-block'
import { SelectionFrame } from '@/components/selection-frame'
import { COMPANION_URL, GITHUB_URL, TAGLINE, TOOL_VERSION } from '@/lib/site'

// The reviewable artifact is the demo: the flow file from the tool README.
const FLOW_FILE = `session = "~/captures/checkout"

[[step]]
action = "click"
target = "email"

[[step]]
action = "type"
text = "a@b.com"

[[step]]
action = "key"
chord = "enter"

[[step]]
action = "verify"
target = "success"`

// Copy is the tool README's, verbatim — the site stages it, never forks it.
export function Hero() {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="max-w-3xl text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-tight tracking-tight">
          {TAGLINE}
        </h1>
        <p className="font-mono text-sm text-foreground/70 dark:text-foreground/55">
          click · double_click · drag · scroll · type · key · verify · wait_for · wait_gone · pause
          — one vocabulary across three surfaces
        </p>
        <p className="max-w-2xl text-lg leading-8">
          <a
            className="underline decoration-border-token underline-offset-4 hover:decoration-foreground"
            href={COMPANION_URL}
          >
            pixelcoords
          </a>{' '}
          freezes your screen, lets you mark labeled regions, and writes pixel-exact coordinates
          with crops. pixelactions reads that session and acts on it — referencing regions{' '}
          <strong>by label, never by raw coordinate</strong>, so a run survives the UI moving. The
          loop is <span className="font-mono text-base">find → act → assert</span>.
        </p>
        <p className="max-w-2xl font-mono text-sm text-foreground/70 dark:text-foreground/55">
          Status: early. The loop works end to end on macOS and on Linux — both X11 and Wayland
          (GNOME and KDE); Windows is next. Published as v{TOOL_VERSION} on crates.io.
        </p>
        <div className="flex flex-wrap gap-4 font-mono text-sm">
          <a
            className="rounded bg-foreground px-5 py-3 text-background hover:opacity-90"
            href="#install"
          >
            Install
          </a>
          <a
            className="rounded border border-border-token px-5 py-3 hover:bg-surface"
            href={GITHUB_URL}
          >
            GitHub
          </a>
        </div>
      </div>
      <SelectionFrame label="checkout.toml" tone="committed">
        <CodeBlock ariaLabel="An example flow file">{FLOW_FILE}</CodeBlock>
      </SelectionFrame>
    </section>
  )
}
