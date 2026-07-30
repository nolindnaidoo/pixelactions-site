import { CoordChip } from '@/components/coord-chip'

// The tool README's status, hedges included — reproduce the hedges, not
// just the wins.
const PLATFORMS = [
  {
    name: 'macOS',
    state: 'Supported — the loop works end to end; primary development platform',
  },
  {
    name: 'Windows',
    state:
      'Supported — SendInput across the whole virtual desktop, kill switch included. One limit: UIPI, which no permission lifts — a process at medium integrity cannot drive an elevated window, the UAC dialog, or the login screen',
  },
  {
    name: 'Linux (X11)',
    state:
      'Supported — XTEST in root-window pixels. No caveat: X11 reports the pointer position, so the kill switch is armed',
  },
  {
    name: 'Linux (Wayland)',
    state:
      'Supported on GNOME and KDE, via the portal + EIS path. One caveat: no kill switch — a Wayland flow must set failsafe = false deliberately',
  },
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
        Binaries ship for every platform above — shipping one that refuses to inject would imply
        support a build does not have. Windows placement is measured rather than assumed, but on a
        single-display machine: multi-monitor and mixed-DPI layouts are unit-tested and have not
        been run on real hardware yet. This table is kept honest — claims match runs.
      </p>
    </section>
  )
}
