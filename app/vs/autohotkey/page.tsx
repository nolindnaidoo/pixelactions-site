import type { Metadata } from 'next'
import { AutohotkeyPage } from '@/features/vs/autohotkey'
import { pageMetadata } from '@/lib/pages'

export const metadata: Metadata = pageMetadata('/vs/autohotkey')

export default function Page() {
  return <AutohotkeyPage />
}
