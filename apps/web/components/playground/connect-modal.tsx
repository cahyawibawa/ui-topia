import { LuBrainCircuit } from 'react-icons/lu'
import { TbBrandEtsy } from 'react-icons/tb'

const Bars = () => {
  const w = 40
  const offset = 46
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 200">
      {Array.from(Array(15)).map((_, i) => (
        <line
          key={i}
          y1={i * w - offset}
          x1="0"
          y2={i * w - offset}
          x2="400"
          stroke="currentColor"
        ></line>
      ))}
      {Array.from(Array(15)).map((_, i) => (
        <line
          key={i}
          x1={i * w}
          y1="-20"
          x2={i * w}
          y2="220"
          stroke="currentColor"
        ></line>
      ))}
    </svg>
  )
}

export default function ConnectModal() {
  return (
    <div className="flex items-center justify-center  text-stone-700">
      <div className="relative max-w-sm overflow-hidden rounded-xl bg-white shadow-lg">
        <div className="absolute left-0 top-0 z-[2] aspect-video w-full shadow-[inset_0_0_100px_84px_rgba(255,255,255,1)]"></div>
        <div className="absolute left-0 top-0 z-[1] aspect-video w-full text-gray-300">
          <Bars />
        </div>
        <div className="relative z-[2] flex flex-col gap-8 p-8">
          <div className="flex items-center justify-center">
            <div className="size-12 rounded-[12px] bg-stone-100 p-[3px]">
              <div className="flex size-full items-center justify-center rounded-[10px] bg-white shadow-sm">
                <LuBrainCircuit className="text-2xl text-gray-600" />
              </div>
            </div>
            <div className="flex flex-col gap-2 py-10">
              <div className="relative h-[2px] w-8">
                <div className="absolute h-[2px] w-full animate-pulse bg-gradient-to-r from-blue-300 via-blue-100 to-blue-50"></div>
                <div className="absolute h-[2px] w-full animate-pulse bg-gradient-to-l from-blue-300 via-blue-100 to-blue-50"></div>
                <div className="animate-moveToRight absolute right-0 size-[4px] bg-blue-500 blur-sm"></div>
              </div>
              <div className="relative h-[2px] w-8">
                <div className="absolute h-[2px] w-full animate-pulse bg-gradient-to-r from-blue-300 via-blue-100 to-blue-50"></div>
                <div className="absolute h-[2px] w-full animate-pulse bg-gradient-to-l from-blue-300 via-blue-100 to-blue-50"></div>
                <div className=" animate-moveFromRight absolute right-full size-[4px] bg-blue-500 blur-sm"></div>
              </div>
              <div className="relative h-[2px] w-8">
                <div className="absolute h-[2px] w-full animate-pulse bg-gradient-to-r from-blue-300 via-blue-100 to-blue-50"></div>
                <div className="absolute h-[2px] w-full animate-pulse bg-gradient-to-l from-blue-300 via-blue-100 to-blue-50"></div>
                <div className="animate-moveToRight absolute right-0 size-[4px] bg-blue-500 blur-sm"></div>
              </div>
            </div>
            <div className="size-12 rounded-[12px] bg-stone-100 p-[3px]">
              <div className="flex size-full items-center justify-center rounded-[10px] bg-white shadow-sm">
                <TbBrandEtsy className="text-2xl text-orange-500" />
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col gap-4">
            <div className="text-center text-xl font-bold tracking-wide">
              Connect Your Swell Shop
            </div>
            <p className="text-center text-sm font-light">
              We use official channel of Swell for connecting to your shop
              securely. You can remove our access at any time
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <button
              className={[
                'text-sm text-white',
                'h-[36px] min-w-[128px] p-[1px]',
                'rounded-[10px] border border-blue-600',
                'bg-blue-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]',
                'active:shadow-none',
              ].join(' ')}
            >
              Connect
            </button>
            <button
              className={[
                'text-sm',
                'h-[36px] min-w-[128px] p-[1px]',
                'rounded-[10px] border border-stone-200',
              ].join(' ')}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
