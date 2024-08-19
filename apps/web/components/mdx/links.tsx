import {
  AnimationsDev,
  GitHubIcon,
  LinearLogo,
  TwitterIcon,
} from '@/components/icons'
import { PropsWithChildren } from 'react'

type LinkIcon = 'github' | 'twitter' | 'linear' | 'animations-dev'

interface LinkItem {
  icon: LinkIcon
  link: string
  label: string
}

const Icons: Record<LinkIcon, React.ReactNode> = {
  'animations-dev': (
    <AnimationsDev className="size-2 text-black dark:text-current" />
  ),
  linear: <LinearLogo className="size-3 text-black dark:text-current" />,
  twitter: <TwitterIcon className="size-3.5 text-black dark:text-current" />,
  github: <GitHubIcon className="size-3.5 text-black dark:text-current" />,
}

export function Links({ children }: PropsWithChildren<LinkItem[]>) {
  return <div className="mb-8 flex flex-wrap gap-2">{children}</div>
}

export function Link({ label, link, icon }: LinkItem) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-x-2 rounded-lg bg-black/5 px-3 py-1.5 text-sm no-underline dark:bg-white/5"
    >
      {Icons[icon]}
      {label}
    </a>
  )
}
