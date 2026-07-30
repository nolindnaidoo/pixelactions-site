import { competitorBySlug } from '@/lib/competitors'
import { VsPage } from './vs-page'

const competitor = competitorBySlug('autohotkey')

export function AutohotkeyPage() {
  return (
    <VsPage
      competitor={competitor}
      framing="A Windows institution against a cross-platform list of steps — the honest comparison starts with the platform line."
      verdict={
        <p>
          AutoHotkey is the deepest desktop automation tool on Windows — hotkeys, window management,
          GUIs, COM, a full language, actively maintained for two decades. On Windows, nothing else
          comes close, and pixelactions is not there yet: today it runs on macOS and on Linux under
          Wayland (GNOME and KDE), with Windows next. The difference is one of kind, not depth.
          AutoHotkey is a language you write; pixelactions is deliberately not a language — a list
          of steps over regions a human marked in pixelcoords, re-located against a fresh capture
          and verified at run time, with loops and branching left to whatever language you already
          write, over the line protocol. If your automation is a program, AutoHotkey gives you its
          language; pixelactions gives your language an executor.
        </p>
      }
      whenThem={[
        'You are on Windows — pixelactions is not there yet, and this is where AutoHotkey lives.',
        'Hotkeys, background window control, and OS integration are the job, not clicking marked regions.',
        'Two decades of community scripts have probably already solved your problem.',
      ]}
      whenUs={[
        'You are on macOS — where pixelactions runs today.',
        'Automation belongs in a reviewable flow file, not a script — a diff shows click submit.',
        'Runs need the contract: re-location before acting, executed vs verified, refusal, exit codes.',
        'The logic lives in your language — Python, TypeScript, Rust, anything that can write a line of JSON.',
      ]}
    />
  )
}
