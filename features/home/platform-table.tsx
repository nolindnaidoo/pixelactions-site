import { CoordChip } from '@/components/coord-chip'

// The tool README's status, hedges included — reproduce the hedges, not
// just the wins.
const PLATFORMS = [
  {
    name: 'macOS',
    state: 'Supported — the loop works end to end; primary development platform',
  },
  { name: 'Windows', state: 'Next — the goal is the same flow file running unmodified' },
  { name: 'Linux (X11)', state: 'Next — alongside Windows' },
  { name: 'Linux (Wayland)', state: 'Later — after Windows and X11' },
] as const

export function PlatformTable() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="flex items-center gap-3 text-2xl font-semibold">
        <CoordChip ariaHidden tone="preview">
          platforms
        </CoordChip>
        Platform status
      </h2>
      <div
        tabIndex={0}
        role="region"
        aria-label="Platform status"
        className="relative overflow-x-auto rounded-lg border border-border-token"
      >
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <tbody>
            {PLATFORMS.map(platform => (
              <tr
                key={platform.name}
                className="border-b border-border-token align-top last:border-b-0"
              >
                <th scope="row" className="w-40 p-3 text-left font-mono text-xs font-normal">
                  {platform.name}
                </th>
                <td className="p-3">{platform.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-foreground/70 dark:text-foreground/55">
        Nothing here is published yet — no crates.io release, no binaries. This table is kept honest
        — claims match runs.
      </p>
    </section>
  )
}
