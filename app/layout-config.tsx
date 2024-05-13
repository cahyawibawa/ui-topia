import { Icons } from '@/components/icons'
import type { DocsLayoutProps } from 'fumadocs-ui/layout'
import { pageTree } from './source'

export const layoutOptions: Omit<DocsLayoutProps, 'children'> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  tree: pageTree,
  nav: {
    title: (
      <>
        <Icons.logo className="size-5" />
        <span className="font-bold sm:inline-block">ui/topia</span>
      </>
    ),
  },
  links: [
    {
      url: '/docs',
      icon: <Icons.bookOpen className="size-5" />,
      text: 'Docs',
    },
    {
      type: 'secondary',
      url: 'https://github.com/cahyawibawa/ui-topia',
      text: 'GitHub',
      icon: <Icons.gitHub className="size-5" />,
      external: true,
    },
  ],
}
