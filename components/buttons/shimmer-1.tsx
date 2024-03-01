import CountingNumbers from '@/components/counting-number'
import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { StarIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { Icons } from '../icons'

export async function Shimmer() {
  const { stargazers_count: stars } = await fetch(
    'https://api.github.com/repos/cahyawibawa/ui-topia',
    {
      ...(process.env.GITHUB_OAUTH_TOKEN && {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }),
      next: {
        revalidate: 3600,
      },
    }
  )
    .then((res) => res.json())
    .catch(() => ({ stargazers_count: 300 }))
  return (
    <Link
      className={cn(
        buttonVariants(),
        'flex gap-2 whitespace-pre md:flex',
        'group relative w-[200px] items-center justify-center gap-2 rounded-sm transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2'
      )}
      href={siteConfig.links.github}
    >
      <span className="absolute right-0 -mt-12 h-32 w-5 translate-x-16 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
      <Icons.gitHub className="mr-2 size-5" />
      Star on GitHub
      <div className="flex items-center gap-1 text-sm text-gray-500 md:flex">
        <StarIcon className="size-4 transition-all duration-300 group-hover:text-yellow-300" />
        <CountingNumbers value={stars} className="font-medium text-white" />
      </div>
    </Link>
  )
}
