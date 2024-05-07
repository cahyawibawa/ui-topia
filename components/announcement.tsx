import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export function Announcement() {
  return (
    <Link
      href="#"
      className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
    >
      👀 <Separator className="mx-2 h-4" orientation="vertical" />{' '}
      <span className="sm:hidden">New elements and more.</span>
      <span className="hidden uppercase sm:inline">New drops weekly</span>
      {/* <ArrowRightIcon className='ml-1 h-4 w-4' /> */}
    </Link>
  )
}
