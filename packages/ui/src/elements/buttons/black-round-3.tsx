import { ArrowRightIcon } from '@radix-ui/react-icons'

export function BlackRound3() {
  return (
    <button className="group relative inline-flex size-12 items-center justify-center overflow-hidden rounded-full bg-neutral-950">
      <div className="-rotate-45 transition duration-300 group-hover:rotate-0">
        <ArrowRightIcon className="size-5 text-neutral-200" />
      </div>
    </button>
  )
}
