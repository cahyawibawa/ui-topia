'use client'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Icons } from '../icons'
import { NavMenu } from './main-nav'

type RootProps = React.ComponentPropsWithoutRef<'header'>

type TopbarProps = RootProps
export const Header: React.FC<Readonly<TopbarProps>> = ({
  className,
  ...props
}) => (
  <header
    className={cn(
      'sticky top-0 z-50 flex h-16 w-full  border-b bg-background',
      className
    )}
    {...props}
  >
    <div className="marge-x grid w-full grid-cols-[min-content_auto_min-content] grid-rows-[1fr_auto] items-center gap-x-2 md:grid-cols-[1fr_minmax(auto,500px)_1fr] lg:grid-rows-1">
      <div className="flex items-center gap-7">
        <Link href="/" className="flex items-center">
          <Icons.logo className="size-5" />
          <span className="font-bold sm:inline-block">{siteConfig.name}</span>
        </Link>
      </div>
      <div className="overflow-hidden px-1 py-2">
        {/* <Search/> feature soon */}
      </div>
      <div className="shrink-0 items-end">
        <div className="flex flex-row items-center justify-end gap-3">
          <NavMenu />
        </div>
      </div>
    </div>
  </header>
)
