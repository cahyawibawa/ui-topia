import { ArrowRightIcon } from '@radix-ui/react-icons'

export function BlackRound2() {
  return (
    <button className="group relative inline-flex size-12 items-center justify-center overflow-hidden rounded-full bg-neutral-950">
      <div className="transition duration-300 group-hover:rotate-[360deg]">
        <ArrowRightIcon className="size-5 text-neutral-200" />
      </div>
    </button>
  )
}
