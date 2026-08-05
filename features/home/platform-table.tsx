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
      <p className="text-sm text-foreground/70 dark:text-foreground/55">
        Those runs were 0.2.0 through 0.4.0. Nine releases have shipped since — the pixelcoords
        seam, <code>changed</code>, the audit log, the MCP surface, and five rounds of bug fixes —
        and on Windows, X11 and Wayland none of them has been driven by hand. macOS has. This page
        will say so until someone sits at each machine.
      </p>
      <p className="text-sm text-foreground/70 dark:text-foreground/55">
        Two slices of that are automatic now. A scenario script runs in CI against a live X server
        and checks that a marked region is located, that a click lands where the plan said, that a
        cursor in a screen corner refuses the step, and that the audit log records a refused run — a
        real X server and a real synthetic event, on a bare 1280×1024 virtual display with no window
        manager, which is not a desktop. And everything the tool does <em>other</em> than synthesise
        input now runs against a real display on macOS, Windows and Linux every push: planning
        against a session marked from a genuine capture, every verb, every settings key, the exit
        codes, the refusals, the line protocol, and the agent tools. What neither can answer is
        whether a click reached an application, and whether the permission model let it.
      </p>
    </section>
  )
}
