import { CoordChip } from '@/components/coord-chip'

// Near-verbatim from the tool README and its settled non-goals. The chip is
// the exit code's word: what this tool declines to become.
const NON_GOALS = [
  {
    name: 'An embedded interpreter',
    reason: 'your bot is written in your language; the binary speaks a line protocol instead',
  },
  {
    name: 'A scripting language',
    reason: 'a flow is a list of steps — loops, branching, and data live in your program',
  },
  {
    name: 'A network surface',
    reason:
      'this process holds the permission to click and type — stdio with its caller, or nothing',
  },
  {
    name: 'A recorder',
    reason:
      'record-and-replay makes unreviewable artifacts; regions are marked by a human, on purpose',
  },
  {
    name: 'Browser automation',
    reason: 'Playwright and Selenium own the web, and own it well',
  },
  { name: 'Cloud, accounts, telemetry', reason: 'offline by design, permanently' },
] as const

export function NonGoals() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="flex items-center gap-3 text-2xl font-semibold">
        <CoordChip ariaHidden tone="preview">
          refused
        </CoordChip>
        Non-goals
      </h2>
      <p>Knowing what a tool is means knowing what it isn&apos;t. These are settled:</p>
      <ul className="flex flex-col gap-2 rounded-lg border border-dashed border-border-token p-4">
        {NON_GOALS.map(item => (
          <li key={item.name} className="flex flex-wrap items-baseline gap-x-2 text-sm">
            <span className="font-semibold">{item.name}</span>
            <span className="text-foreground/70 dark:text-foreground/55">— {item.reason}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
