import { CoordChip } from '@/components/coord-chip'
import { JsonLd } from '@/components/json-ld'

// The FAQ answers mirrored into FAQPage JSON-LD (Google requires the visible
// text to correspond). Each question carries a slug id so rich-result
// visitors can deep-link.
export const FAQ = [
  {
    question: 'Why does my automated click do nothing on macOS?',
    answer:
      'Almost always the Accessibility grant. Without it, posting an input event is a silent no-op — the call succeeds and nothing happens. The grant attaches to the application that launched your tool (the terminal), not the tool itself. pixelactions doctor --probe proves the permission empirically: it moves the cursor one pixel, asks the OS where it ended up, and puts it back — raising the system dialog if the grant is missing.',
  },
  {
    question: 'How do I automate mouse clicks on Wayland?',
    answer:
      'Through the sanctioned path: xdg-desktop-portal RemoteDesktop linked to a ScreenCast session, acting over EIS. You consent once (a screen-share dialog) and the grant is remembered, so later runs do not prompt. pixelactions ships this out of the box on GNOME and KDE — no ydotool daemon, no /dev/uinput permission, no XWayland limitations. One caveat: Wayland exposes no way to ask where the pointer is, so the corner kill switch does not apply and a flow must opt out of it deliberately (failsafe = false).',
  },
  {
    question: 'How can a script tell whether a click actually worked?',
    answer:
      'The OS accepting an event is not the app reacting to one — a click API returning normally proves nothing. Capture the screen again and check: pixelactions verifies a region against its saved crop after acting and reports verified as distinct from executed, with exit codes a script can gate on: 0 done, 1 a step failed, 2 malformed, 3 refused.',
  },
  {
    question: 'Can I drive desktop automation from my own language?',
    answer:
      'Yes. pixelactions serve speaks a JSON line protocol on stdin/stdout — one request per line, one response back — so a program in any language owns the loop: branching, retries, data. A complete client is forty lines of stdlib Python, in the docs. There is no embedded interpreter, deliberately.',
  },
  {
    question: 'Can an LLM or AI agent perform desktop actions safely?',
    answer:
      'pixelactions mcp serves the executor over the Model Context Protocol on stdio: a model gets three tools — plan a set of steps and see every coordinate, find where a region moved to, and act. Acting is off unless a human launched the server with --yes, which is a command-line flag a model cannot pass, so the consent stays with whoever wired the client. A refused or failed step comes back as an ordinary result with ok false rather than a protocol error, so the model reacts to it instead of retrying a tool that posts input. It acts only on regions a human marked in pixelcoords, re-locates each one before touching it, and records every run to a local audit log.',
  },
  {
    question: 'Is there a maintained alternative to PyAutoGUI?',
    answer:
      'Depends on the job. As of mid-2026, PyAutoGUI has not shipped a release since May 2023. The browser belongs to Playwright and Selenium; where an accessibility tree exists, a11y-first tools are more robust. For coordinate execution against human-marked regions — canvas apps, legacy software, streamed desktops — pixelactions is built for exactly that, on macOS, Windows, and Linux — both X11 and Wayland — today.',
  },
] as const

const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(entry => ({
    '@type': 'Question',
    name: entry.question,
    acceptedAnswer: { '@type': 'Answer', text: entry.answer },
  })),
}

function slugify(question: string): string {
  return question
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
}

export function Faq() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="flex items-center gap-3 text-2xl font-semibold">
        <CoordChip ariaHidden tone="preview">
          faq
        </CoordChip>
        Questions people actually ask
      </h2>
      <div className="flex flex-col gap-2">
        {FAQ.map(entry => (
          <details
            key={entry.question}
            id={slugify(entry.question)}
            className="group scroll-mt-8 rounded-lg border border-border-token bg-surface p-4"
          >
            <summary className="cursor-pointer py-1 font-semibold marker:text-preview">
              {entry.question}
            </summary>
            <p className="pt-3 leading-7 text-foreground/70 dark:text-foreground/55">
              {entry.answer}
            </p>
          </details>
        ))}
      </div>
      <JsonLd data={FAQ_JSON_LD} />
    </section>
  )
}
