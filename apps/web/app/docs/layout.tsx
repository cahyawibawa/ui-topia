import { baseOptions } from '@/app/layout-config'
import { utils } from '@/lib/source'
import { DocsLayout } from 'fumadocs-ui/layout'
import type { ReactNode } from 'react'

export default function Layout({
  children,
}: {
  children: ReactNode
}): React.ReactElement {
  return (
    <DocsLayout
      {...baseOptions}
      tree={utils.pageTree}
      sidebar={{
        defaultOpenLevel: 0,
      }}
    >
      {children}
    </DocsLayout>
  )
}
