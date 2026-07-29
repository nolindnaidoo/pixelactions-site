import type { Metadata } from 'next'
import { HowToPage } from '@/features/how-to/how-to-page'
import { pageMetadata } from '@/lib/pages'

export const metadata: Metadata = pageMetadata('/how-to/automate-desktop-clicks')

export default function Page() {
  return <HowToPage />
}
