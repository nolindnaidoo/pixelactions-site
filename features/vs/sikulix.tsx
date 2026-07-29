import { competitorBySlug } from '@/lib/competitors'
import { VsPage } from './vs-page'

const competitor = competitorBySlug('sikulix')

export function SikulixPage() {
  return (
    <VsPage
      competitor={competitor}
      framing="One honest overlap: both act on what template matching finds. The split is who marks the target."
      verdict={
        <p>
          SikuliX is a complete see-and-act environment: it watches the screen continuously, scripts
          decisions in its own runtime, and drives the mouse and keyboard — with an IDE and OCR
          built in. That integration is the draw, and nothing in this category matches its
          continuous visual search. pixelactions splits the loop instead: a human marks ground truth
          once, in pixelcoords, and a small native binary executes flows against it — every target
          re-located before acting, bounds-checked, verified after, with exit codes a CI job can
          gate on. No JVM, no scripting language: your program owns the loop over stdio, in whatever
          language it is already written. Worth knowing when comparing: SikuliX&apos;s original
          development was archived in early 2026 and continues under the OculiX fork.
        </p>
      }
      whenThem={[
        'You want a self-contained see-and-act environment with its own scripting and IDE.',
        'You need OCR in the same tool.',
        'Continuous visual search across the whole screen is the job, not human-marked regions.',
      ]}
      whenUs={[
        'Targets should be human-marked ground truth, not screenshots matched from inside a script.',
        'One small native binary — no JVM, no Java versions.',
        'CI and agents need the contract: executed vs verified, refusal before injection, exit codes.',
        'The loop belongs in your language — the line protocol makes any program the driver.',
      ]}
    />
  )
}
