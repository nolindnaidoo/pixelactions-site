import { competitorBySlug } from '@/lib/competitors'
import { VsPage } from './vs-page'

const competitor = competitorBySlug('pyautogui')

export function PyautoguiPage() {
  return (
    <VsPage
      competitor={competitor}
      framing="The incumbent and the executor: every tutorial teaches PyAutoGUI; pixelactions moves the coordinates out of the code."
      verdict={
        <p>
          PyAutoGUI made desktop automation a Python one-liner, and its reach is unmatched — every
          tutorial teaches it, and agent stacks default to it. That reach is real and earned. The
          difference is what happens to the coordinates: in a script they are arithmetic that goes
          stale silently, and <code>click()</code> returns <code>None</code> whether the click
          landed or not. pixelactions takes its targets from a session a human marked in pixelcoords
          — by label — re-locates each one against a fresh capture before acting, verifies after,
          and refuses rather than guesses. Your Python keeps owning the loop: over the line
          protocol, pixelactions is the executor under your program, not a library replacing it.
          Worth knowing when comparing: PyAutoGUI&apos;s last release was May 2023, and it has no
          Wayland support.
        </p>
      }
      whenThem={[
        'A quick one-off script you will watch run — reach for the thing every tutorial teaches.',
        'You need raw reads from the same library — pixel colors, screenshots. pixelactions acts and verifies; it does not expose the capture.',
        'Your stack already speaks it and the runs are supervised — switching has a cost and this is where PyAutoGUI is fine.',
      ]}
      whenUs={[
        'The UI moves between runs — every target is re-located against a fresh capture before anything is injected.',
        'Unattended runs need more than "the call returned": executed vs verified, and exit codes a CI job can gate on.',
        'Coordinates belong in a reviewable artifact — a flow file in a pull request shows click submit, not arithmetic.',
        'Your loop is not Python — the line protocol makes any language a first-class driver, and keeps Python one.',
      ]}
    />
  )
}
