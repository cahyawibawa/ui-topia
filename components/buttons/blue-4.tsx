export function Blue4() {
  return (
    <button className="group relative h-12 overflow-hidden rounded-md bg-blue-500 px-6 text-neutral-50 transition hover:bg-blue-600">
      <span className="relative">Hover me</span>
      <div className="absolute inset-0 top-[20px] flex h-[calc(100%+40px)] w-full justify-center blur-md">
        <div className="relative h-full w-8 bg-white/30"></div>
      </div>
    </button>
  )
}
