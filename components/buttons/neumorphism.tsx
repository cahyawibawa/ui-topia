import { PlusIcon } from '@radix-ui/react-icons'

export function Neumorphism() {
  return (
    <div className="rounded-[16px] bg-gradient-to-b from-stone-300/40 to-transparent p-[4px]">
      <button className="group rounded-[12px] bg-gradient-to-b from-white to-stone-200/40 p-[4px] shadow-[0_1px_3px_rgba(0,0,0,0.5)] active:scale-[0.995] active:shadow-[0_0px_1px_rgba(0,0,0,0.5)]">
        <div className=" rounded-[8px] bg-gradient-to-b from-stone-200/40 to-white/80 p-2">
          <div className="flex items-center gap-2">
            <PlusIcon className="size-5" />
            <span className="font-semibold">Click Me</span>
          </div>
        </div>
      </button>
    </div>
  )
}
