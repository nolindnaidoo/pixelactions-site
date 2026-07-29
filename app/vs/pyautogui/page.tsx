import type { Metadata } from 'next'
import { PyautoguiPage } from '@/features/vs/pyautogui'
import { pageMetadata } from '@/lib/pages'

export const metadata: Metadata = pageMetadata('/vs/pyautogui')

export default function Page() {
  return <PyautoguiPage />
}
