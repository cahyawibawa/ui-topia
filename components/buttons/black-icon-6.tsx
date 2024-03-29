import { ArrowRightIcon, StarFilledIcon } from '@radix-ui/react-icons'

export function BlackIcon6() {
  return (
    <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 duration-500">
      <div className="relative inline-flex -translate-x-0 items-center transition group-hover:-translate-x-6">
        <div className="absolute translate-x-0 opacity-100 transition group-hover:-translate-x-6 group-hover:opacity-0">
          <StarFilledIcon className="size-5" />
        </div>
        <span className="pl-6">Hover</span>
        <div className="absolute right-0 translate-x-12 opacity-0 transition group-hover:translate-x-6 group-hover:opacity-100">
          <ArrowRightIcon className="size-5" />
        </div>
      </div>
    </button>
  )
}
