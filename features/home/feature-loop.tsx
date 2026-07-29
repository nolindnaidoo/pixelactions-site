import { CoordChip } from '@/components/coord-chip'

// The tool's own loop, from docs/CLI.md and docs/OUTPUT.md: mark → plan →
// run → serve → exit code. Each beat shows the command and a real
// (condensed) artifact.
const BEATS = [
  {
    step: '01',
    command: 'pixelcoords',
    line: 'A human freezes the screen, marks and labels regions. The saved session is the ground truth.',
    artifact: `{ "schema": 1,
  "selections": [{ "shape": "rect", "label": "submit",
    "px": { "x": 812, "y": 440, "w": 96, "h": 40 } }] }`,
  },
  {
    step: '02',
    command: 'pixelactions plan --flow checkout.toml',
    line: 'Every coordinate after conversion, before anything moves. The permanent dry run, not a temporary phase.',
    artifact: `{ "executed": false, "steps": [{ "summary": "click submit",
  "points": [{ "x": 430.0, "y": 170.0,
    "space": "logical", "monitor": 0, "scale": 2.0 }] }] }`,
  },
  {
    step: '03',
    command: 'pixelactions run --flow checkout.toml --yes',
    line: 'Relocate, act, verify. A crop that matches in more than one place produces no correction at all — the run refuses before anything is injected.',
    artifact: `{ "summary": "click submit", "outcome": "verified",
  "elapsed_ms": 412 }   # exit 0`,
  },
  {
    step: '04',
    command: 'pixelactions serve --session <dir>',
    line: 'One JSON request per line, one response back — a program in any language owns the loop.',
    artifact: `→ {"id": 2, "do": "click", "target": "email"}
← {"id": 2, "result": "done", "outcome": "verified"}`,
  },
  {
    step: '05',
    command: 'echo $?',
    line: 'Exit codes are the API: 0 done, 1 a step failed, 2 malformed, 3 refused. Grab the mouse into a screen corner and the run stops — a refusal is never worth retrying.',
    artifact: `refused: cursor in a screen corner — kill switch   # exit 3`,
  },
] as const

export function FeatureLoop() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="flex items-center gap-3 text-2xl font-semibold">
        <CoordChip ariaHidden tone="preview">
          loop
        </CoordChip>
        The tool is a loop
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {BEATS.map(beat => (
          <div
            key={beat.step}
            className="flex min-w-0 flex-col gap-2 rounded-lg border border-border-token bg-surface p-4"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-xs text-target">{beat.step}</span>
              <code className="min-w-0 break-all font-mono text-sm text-foreground">
                {beat.command}
              </code>
            </div>
            <p className="text-sm text-foreground/70 dark:text-foreground/55">{beat.line}</p>
            <pre
              role="group"
              tabIndex={0}
              aria-label={`${beat.command} output`}
              className="overflow-x-auto rounded bg-background p-2 font-mono text-xs leading-5 text-committed"
            >
              {beat.artifact}
            </pre>
          </div>
        ))}
      </div>
    </section>
  )
}
