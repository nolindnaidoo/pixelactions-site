import { CodeBlock } from '@/components/code-block'
import { CoordChip } from '@/components/coord-chip'
import { COMPANION_URL } from '@/lib/site'

// The 0.8.0 surface. Every claim here holds for the shipped server: the
// tools, the gate, and the ok/isError rule are what `pixelactions mcp`
// actually does.
const CLIENT_CONFIG = `{
  "mcpServers": {
    "pixelactions": { "command": "pixelactions", "args": ["mcp"] }
  }
}`

const TOOLS = [
  {
    name: 'pixelactions_plan',
    acts: 'no',
    does: 'Resolves steps and returns every coordinate. Touches nothing.',
  },
  { name: 'pixelactions_act', acts: 'only with --yes', does: 'Performs them.' },
  { name: 'pixelactions_find', acts: 'no (captures)', does: 'Re-locates a region that moved.' },
] as const

export function AgentSurface() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="flex items-center gap-3 text-2xl font-semibold">
        <CoordChip ariaHidden tone="committed">
          mcp
        </CoordChip>
        A model can drive it
      </h2>
      <p className="max-w-2xl leading-7">
        <a
          className="underline decoration-border-token underline-offset-4 hover:decoration-foreground"
          href={COMPANION_URL}
        >
          pixelcoords
        </a>{' '}
        serves a read-only MCP server, so a model could already ask <em>where</em> to click. Nothing
        let it say <em>do it</em>. Now it can — over stdio, against a session a human marked.
      </p>
      <CodeBlock ariaLabel="MCP client configuration">{CLIENT_CONFIG}</CodeBlock>
      <div
        tabIndex={0}
        role="region"
        aria-label="MCP tools"
        className="relative overflow-x-auto rounded-lg border border-border-token"
      >
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border-token">
              <th scope="col" className="p-3 text-left font-mono text-xs font-normal">
                tool
              </th>
              <th scope="col" className="p-3 text-left font-mono text-xs font-normal">
                acts
              </th>
              <th scope="col" className="p-3 text-left font-mono text-xs font-normal">
                what it does
              </th>
            </tr>
          </thead>
          <tbody>
            {TOOLS.map(tool => (
              <tr
                key={tool.name}
                className="border-b border-border-token align-top last:border-b-0"
              >
                <th scope="row" className="p-3 text-left font-mono text-xs font-normal">
                  {tool.name}
                </th>
                <td className="p-3 font-mono text-xs">{tool.acts}</td>
                <td className="p-3 text-foreground/70 dark:text-foreground/55">{tool.does}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="max-w-2xl text-sm leading-7 text-foreground/70 dark:text-foreground/55">
        <strong className="text-foreground">Acting is off unless you launch it with --yes.</strong>{' '}
        This surface posts real input, so unlike a read-only server it has no safe default — and a
        model cannot pass a command-line flag. So the consent stays with whoever wired the client. A
        per-call confirmation would be written by the model itself: a speed bump against a slip, not
        a gate against intent.
      </p>
      <p className="max-w-2xl text-sm leading-7 text-foreground/70 dark:text-foreground/55">
        <strong className="text-foreground">A refusal is an answer, not an error.</strong> A failed
        step, a region that could not be found, an act call on a read-only server — all come back as
        ordinary results with <code className="font-mono">ok: false</code>. Only a malformed
        question is a protocol error. A model that reads a refusal as a broken tool retries, and
        retrying something that posts input is the worst thing this could do.
      </p>
      <p className="max-w-2xl text-sm leading-7 text-foreground/70 dark:text-foreground/55">
        It adds nothing underneath: the kill switch, re-location, verification and the audit log are
        the run loop&apos;s, and a model-driven run gets all four because they were already there.
      </p>
    </section>
  )
}
