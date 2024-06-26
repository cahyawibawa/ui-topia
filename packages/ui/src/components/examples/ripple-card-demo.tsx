export function RippleCardDemo() {
  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-white/5 bg-zinc-800">
      {/* <!-- highlight --> */}
      <div className="absolute inset-0 bg-[radial-gradient(40%_128px_at_50%_0%,theme(backgroundColor.white/10%),transparent)]"></div>

      {/* <!-- texture --> */}
      <div className="absolute size-full bg-[url(https://lunarui.dev/twitter/noise.png)] bg-[size:96px] bg-repeat opacity-[0.025]"></div>

      <div className="relative h-44 w-full">
        <div className="absolute -top-1/2 size-full">
          {/* <!-- tweak variables --> */}
          <div className="relative flex size-full items-center justify-center [--baseOpacity:0.25] [--baseSize:80px] [--duration:1.5s] [--opacityStep:0.05] [--scale:1.25] [--sizeStep:64px]">
            {/* <!-- repeat this element, set `--i` to index --> */}
            <div className="animate-ripple absolute size-[calc(var(--baseSize)+var(--sizeStep)*var(--i))] rounded-full border border-dashed border-white/50 bg-white/5 opacity-[calc(var(--baseOpacity)-var(--opacityStep)*var(--i))] [--i:0]"></div>

            <div className="animate-ripple absolute size-[calc(var(--baseSize)+var(--sizeStep)*var(--i))] rounded-full border border-dashed border-white/50 bg-white/5 opacity-[calc(var(--baseOpacity)-var(--opacityStep)*var(--i))] [--i:1]"></div>

            <div className="animate-ripple absolute size-[calc(var(--baseSize)+var(--sizeStep)*var(--i))] rounded-full border border-dashed border-white/50 bg-white/5 opacity-[calc(var(--baseOpacity)-var(--opacityStep)*var(--i))] [--i:2]"></div>

            <div className="animate-ripple absolute size-[calc(var(--baseSize)+var(--sizeStep)*var(--i))] rounded-full border border-dashed border-white/50 bg-white/5 opacity-[calc(var(--baseOpacity)-var(--opacityStep)*var(--i))] [--i:3]"></div>
          </div>
        </div>
      </div>

      <div className="relative mt-4 px-8 pb-8">
        <div className="hidden rounded-md border border-cyan-400/50 bg-cyan-400/10 p-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 text-cyan-100"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
            />
          </svg>
        </div>

        <div className="mt-4">
          <div className="text-lg text-white">Issue detector</div>

          <p className="mt-2 text-sm font-light leading-relaxed text-white/75">
            Spot bugs, catch common issues, and fix them automatically, before
            they pop up in production.
          </p>

          <div className="mt-4 flex">
            <div className="cursor-pointer rounded-full border border-cyan-400 bg-cyan-400/10 px-3 py-1 text-sm font-light text-cyan-100">
              Get started for free
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
