'use client'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Icons } from '../icons'
import { Menu } from './main-nav'

type RootProps = React.ComponentPropsWithoutRef<'header'>

type TopbarProps = RootProps
export const Header: React.FC<Readonly<TopbarProps>> = ({
  className,
  ...props
}) => (
  <header
    className={cn(
      'flex h-[60px] items-center justify-between md:h-[60px]',
      className
    )}
    {...props}
  >
    <div className="mr-4 md:flex lg:gap-x-12">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="size-5" />
        <span className="font-bold sm:inline-block">{siteConfig.name}</span>
      </Link>
    </div>
    <Menu />
  </header>
)
