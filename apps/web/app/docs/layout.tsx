import { docsOptions } from '@/app/layout-config'
import { DocsLayout } from 'fumadocs-ui/layout'
import 'fumadocs-ui/twoslash.css'
import type { ReactNode } from 'react'

export default function Layout({
  children,
}: {
  children: ReactNode
}): React.ReactElement {
  return <DocsLayout {...docsOptions}>{children}</DocsLayout>
}
