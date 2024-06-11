import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { IndividualContribution } from './_components/individual-contribution'

export default function GithubStats() {
  const differentColor = [
    32, 33, 34, 35, 36, 56, 60, 80, 84, 108, 128, 132, 152, 156, 176, 180, 200,
    201, 202, 203, 204,
  ]

  return (
    <div className="group relative flex w-[420px] flex-row flex-wrap items-center justify-center gap-1 rounded-lg border bg-white p-4 shadow transition-all hover:shadow-md">
      {Array.from(Array(240).keys()).map((_, index) => (
        <IndividualContribution
          key={index}
          className={
            differentColor.includes(index)
              ? 'group-hover:border-green-500 group-hover:bg-green-500'
              : ''
          }
        />
      ))}
      <Button variant={'secondary'} className="absolute gap-2 group-hover:flex">
        <Icons.gitHub className="size-5" />
        Github Repo
      </Button>
    </div>
  )
}
