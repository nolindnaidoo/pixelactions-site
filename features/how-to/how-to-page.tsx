import { CodeBlock } from '@/components/code-block'
import { CoordChip } from '@/components/coord-chip'
import { InstallBlock } from '@/components/install-block'
import { Faq } from './faq'

// Task-first tutorial: the built-in answers come FIRST and are genuinely
// useful — the honesty brand doing SEO work. pixelactions enters where the
// built-ins stop. Every claim holds for the tool's docs (CLI.md's doctor
// and kill-switch sections; OUTPUT.md's outcome vocabulary), hedges
// reproduced.
function OsSection({
  chip,
  title,
  children,
}: {
  readonly chip: string
  readonly title: string
  readonly children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="flex items-center gap-3 text-2xl font-semibold">
        <CoordChip ariaHidden tone="preview">
          {chip}
        </CoordChip>
        {title}
      </h2>
      {children}
    </section>
  )
}

export function HowToPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-6 py-12 sm:py-16">
      <header className="flex flex-col gap-4">
        <h1 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-tight tracking-tight">
          How to automate mouse clicks and keystrokes on macOS, Windows, and Linux
        </h1>
        <p className="text-lg leading-8">
          Every OS has a built-in way to synthesize a click — they&apos;re below, and for a one-off
          they&apos;re all you need. The part that bites comes later: the coordinate you hardcoded
          points where the UI <em>was</em>, and nothing in the return value says whether the click{' '}
          <em>worked</em>. The OS accepting an event is not the app reacting to one. Whatever tool
          you use, know what happens when the button moves.
        </p>
      </header>

      <OsSection chip="macos" title="macOS">
        <p>
          Built in adjacent: <code className="font-mono text-sm">cliclick</code> (one{' '}
          <code className="font-mono text-sm">brew install</code> away) or AppleScript through
          System Events. Both are fine for a click you&apos;ll watch happen.
        </p>
        <CodeBlock ariaLabel="macOS built-in commands">
          {`cliclick c:812,440                # click at (812,440) in logical points
osascript -e 'tell application "System Events" to click at {812, 440}'`}
        </CodeBlock>
        <p>
          The pitfall: without an Accessibility grant, event posting is a <strong>silent</strong>{' '}
          no-op — the call succeeds and nothing happens. And the grant attaches to the application
          that launched the tool (your terminal), not the tool itself. pixelactions proves the grant
          instead of assuming it, then acts on regions a human marked:
        </p>
        <CodeBlock ariaLabel="pixelactions commands">
          {`pixelactions doctor --probe       # move the cursor 1px, ask the OS, put it back
pixelactions run --session <dir> click:submit verify:done --yes`}
        </CodeBlock>
        <p className="text-sm text-foreground/70 dark:text-foreground/55">
          A failed probe raises the system dialog and exits 3. Targets are re-located against a
          fresh capture before acting, and <code>verify</code> confirms the result from another
          capture — with the cursor-in-a-corner kill switch armed the whole run.
        </p>
      </OsSection>

      <OsSection chip="windows" title="Windows">
        <p>
          Built in: PowerShell can send keystrokes today; a mouse click takes a P/Invoke into
          user32. For anything past a one-liner, the institution is AutoHotkey (
          <a
            className="underline decoration-border-token underline-offset-4 hover:decoration-foreground"
            href="/vs/autohotkey"
          >
            full comparison
          </a>
          ).
        </p>
        <CodeBlock ariaLabel="Windows commands">
          {`Add-Type -AssemblyName System.Windows.Forms
[System.Windows.Forms.SendKeys]::SendWait("hello{ENTER}")   # keystrokes only`}
        </CodeBlock>
        <p>
          The pitfalls: per-monitor DPI scaling means the coordinate a screenshot gave you and the
          coordinate the input API wants can disagree per display — and input aimed at an elevated
          window is blocked unless the sender is elevated too.
        </p>
        <p className="text-sm text-foreground/70 dark:text-foreground/55">
          Honesty note: pixelactions does not run on Windows yet — it&apos;s next, and the goal is
          the same flow file running unmodified.
        </p>
      </OsSection>

      <OsSection chip="linux" title="Linux">
        <p>
          Built in on X11: <code className="font-mono text-sm">xdotool</code> — the classic answer,
          still the right one for a one-off.
        </p>
        <CodeBlock ariaLabel="Linux commands">
          {`xdotool mousemove 812 440 click 1   # X11: physical pixels
ydotool click 0xC0                  # Wayland: needs the ydotoold daemon + /dev/uinput access`}
        </CodeBlock>
        <p>
          The pitfall is Wayland: its security design keeps applications from injecting input into
          each other. xdotool&apos;s synthesis reaches only XWayland windows, and ydotool works by
          becoming a virtual input device — which takes a running daemon and permission on{' '}
          <code className="font-mono text-sm">/dev/uinput</code>.
        </p>
        <p className="text-sm text-foreground/70 dark:text-foreground/55">
          Honesty note: pixelactions runs on Wayland today, through the sanctioned path (portal
          RemoteDesktop + EIS on GNOME and KDE). X11 is next — it&apos;s currently refused rather
          than half-served, because injecting through XWayland reaches only X clients and would
          silently miss every native window. One caveat on Wayland: there is no way to read the
          pointer position, so the corner kill switch does not apply and a flow must opt out of it
          deliberately with <code className="font-mono text-sm">failsafe = false</code>.
        </p>
      </OsSection>

      <section className="flex flex-col gap-3">
        <h2 className="flex items-center gap-3 text-2xl font-semibold">
          <CoordChip ariaHidden tone="committed">
            beyond
          </CoordChip>
          When one click isn&apos;t enough
        </h2>
        <p className="leading-7">
          A click you fire once answers today&apos;s question. If the same interaction matters
          tomorrow — in a script, a test, an agent — the coordinate needs to survive the UI moving,
          and the run needs to know whether it worked. That&apos;s the pixelactions contract: a
          human marks regions once in pixelcoords, then every run re-locates each target against a
          fresh capture, refuses rather than guesses, and reports <em>verified</em> as distinct from{' '}
          <em>executed</em>. The{' '}
          <a
            className="underline decoration-border-token underline-offset-4 hover:decoration-foreground"
            href="/"
          >
            front page
          </a>{' '}
          shows the whole loop in sixty seconds.
        </p>
      </section>

      <Faq />

      <InstallBlock variant="full" />
    </div>
  )
}
