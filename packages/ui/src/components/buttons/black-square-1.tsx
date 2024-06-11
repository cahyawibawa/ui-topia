import { ArrowRightIcon } from '@radix-ui/react-icons'

export function BlackSquare1() {
  return (
    <button className="relative inline-flex size-12 items-center justify-center rounded-md bg-neutral-950 transition-colors hover:bg-neutral-800">
      <div>
        <ArrowRightIcon className="size-5 text-neutral-200" />
      </div>
    </button>
  )
}
