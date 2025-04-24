export function GlassButton() {
  return (
    <div className="flex h-dvh w-dvw items-center justify-center">
      <div className="relative flex items-center justify-center gap-3 rounded-3xl p-4">
        <div className="absolute h-64 w-64 rounded-3xl bg-gray-300 shadow-neutral-500 shadow-xl"></div>
        <button className="group relative z-20 flex h-12 w-36 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-200 transition duration-300 active:translate-y-[0.1rem] active:scale-[99%]">
          {/* <!-- OUTER BLACK BORDER --> */}
          <div className="h-full w-full rounded-full bg-black bg-linear-to-b from-transparent to-transparent blur-[5px]"></div>
          {/* <!-- TOP OUTER HIGHLIGHT --> */}
          <div className="absolute top-[0.8px] z-50 flex h-4 w-[8.3rem] items-center justify-center overflow-hidden rounded-full">
            <div className="-bottom-[2rem] absolute h-12 w-[8.7rem] rounded-full bg-linear-to-b from-gray-200 to-60% to-transparent"></div>
          </div>
          {/* <!-- LEFT HIGHLIGHT --> */}
          <div className="absolute left-1 z-20 h-8 w-20 rounded-full border-gray-400 border-l-[0.5px] bg-linear-to-r from-gray-300/80 to-5% to-transparent"></div>
          {/* <!-- RIGHT HIGHLIGHT --> */}
          <div className="absolute right-1 z-20 h-8 w-20 rounded-full border-gray-400 border-r-[0.5px] bg-linear-to-l from-gray-300/80 to-10% to-transparent"></div>
          {/* <!-- BOTTOM OUTER HIGHLIGHT --> */}
          <div className="-translate-x-[0.15rem] absolute bottom-[1px] z-20 h-16 w-[8.7rem] rounded-full bg-linear-to-t from-gray-200/80 to-15% to-transparent"></div>
          {/* <!-- INNER BLACK BORDER --> */}
          <div className="absolute h-10 w-[8.3rem] rounded-full bg-black blur-[2px]"></div>
          {/* <!-- "TRANSPARENT" MIDDLE --> */}
          <div className="absolute z-20 h-10 w-[8.2rem] overflow-hidden rounded-full bg-gray-700">
            <div className="absolute h-full w-full rounded-full bg-gray-400 blur-[1px]"></div>
          </div>
          <div className="absolute z-70 h-8 w-[6.2rem] rounded-full bg-gray-200 opacity-70 blur-md"></div>
          {/* <!-- INNER HIGHLIGHTS --> */}
          {/* <!-- TOP --> */}
          <div className="absolute z-50 flex h-9 w-[8rem] items-center justify-center overflow-hidden rounded-full">
            <div className="-left-1 absolute top-0 z-50 h-4 w-5 rotate-[-20deg] bg-gray-400 blur-[0.5px]"></div>
            <div className="absolute top-0 left-3 z-20 h-3 w-32 skew-x-[20deg] bg-linear-to-b from-80% from-white"></div>
            <div className="-left-[0.1rem] absolute top-[0.2rem] z-30 h-8 w-[7.9rem] rounded-full bg-linear-to-b from-15% from-gray-400 to-20% to-transparent"></div>
            <div className="absolute top-[0.2rem] z-40 flex h-7 w-[7.9rem] scale-[93%] items-center justify-center overflow-hidden rounded-full ">
              <div className="absolute top-0 left-3 z-20 h-3 w-32 skew-x-[20deg] bg-linear-to-b from-60% from-white"></div>
              <div className="-left-[0.02rem] absolute top-[0.4rem] z-30 h-8 w-[7.8rem] rounded-full bg-linear-to-b from-gray-400 to-30% to-transparent"></div>
            </div>
          </div>
          {/* <!-- BOTTOM --> */}
          <div className="absolute z-40 flex h-9 w-[8rem] items-center justify-center overflow-hidden rounded-full">
            <div className="absolute bottom-[0.1rem] z-20 h-8 w-[7.6rem] overflow-hidden rounded-full">
              <div className="absolute bottom-0 left-[1.3rem] h-[0.55rem] w-[5.3rem] skew-x-[-10deg] bg-cyan-50/70"></div>

              <div className="absolute right-3 bottom-0 z-20 h-4 w-2 rotate-[-20deg] bg-gray-400"></div>
              <div className="-right-2 absolute bottom-0 z-30 h-5 w-4 rotate-[-40deg] bg-gray-400"></div>
              <div className="absolute right-[0.3rem] bottom-[0.4rem] z-30 h-8 w-[7rem] rounded-full bg-linear-to-t from-30% from-gray-400 to-transparent"></div>
              <div className="-right-[0.15rem] absolute bottom-0 z-20 h-4 w-5 rotate-[-20deg] bg-linear-to-tr from-cyan-50"></div>

              <div className="absolute bottom-0 left-[0.rem] z-40 h-4 w-2 rotate-[25deg] bg-gray-400/80"></div>
              <div className="absolute bottom-0 left-[0.4rem] z-30 h-2 w-2 rotate-[15deg] bg-cyan-50/80"></div>
            </div>
            <div className="absolute bottom-[0.3rem] z-10 h-8 w-[7.5rem] rounded-full bg-gray-400"></div>
            <div className="-skew-x-[10deg] absolute bottom-0 h-[0.37rem] w-[5.5rem] bg-cyan-50"></div>
            <div className="absolute bottom-[0.1rem] left-[0.2rem] h-2 w-[1rem] rotate-[30deg] skew-x-[20deg] bg-linear-to-l from-70% from-cyan-50"></div>
          </div>

          <div className="absolute bottom-[4px] z-20 h-6 w-[7rem] rounded-full bg-linear-to-t from-gray-200/80 to-15% to-transparent"></div>
          <div className="absolute bottom-[3px] z-20 h-6 w-[7.5rem] rounded-full bg-linear-to-t from-gray-200/80 to-15% to-transparent"></div>
          <div className="absolute bottom-[2px] z-20 h-8 w-[8rem] rounded-full bg-linear-to-t from-gra÷y-200/80 to-15% to-transparent"></div>
          <div className="absolute bottom-[7px] z-50 h-8 w-[7rem] rounded-full bg-linear-to-t from-cyan-50/80 to-15% to-transparent"></div>

          {/* <!-- LIGHT COLORING --> */}
          <div className="absolute bottom-0 z-100 h-10 w-[95%] rounded-full bg-linear-to-t from-cyan-300 to-30% to-transparent blur-sm"></div>

          {/* <!-- COLOR VARIATIONS --> */}
          <div className="absolute z-90 h-full w-full overflow-hidden rounded-full bg-cyan-200 mix-blend-color-burn"></div>
          <div className="absolute bottom-0 z-100 h-10 w-[80%] rounded-full bg-linear-to-t from-cyan-300 to-30% to-transparent blur-sm"></div>

          <div className="absolute z-100 h-full w-full rounded-full bg-green-200 mix-blend-color-burn"></div>
          <div className="absolute bottom-0 z-100 h-10 w-[80%] rounded-full bg-linear-to-t from-green-300 to-30% to-transparent blur-sm"></div>

          <div className="absolute z-100 h-full w-full rounded-full bg-red-200 mix-blend-color-burn"></div>
          <div className="absolute bottom-0 z-100 h-10 w-[80%] rounded-full bg-linear-to-t from-red-300 to-30% to-transparent blur-sm"></div>
        </button>
        {/* <!-- SHADOWS --> */}
        <div className="absolute top-1/2 z-10 h-12 w-36 rounded-full bg-gray-500 blur-md"></div>
        <div className="absolute top-1/2 z-10 h-11 w-28 rounded-full border-2 border-cyan-200 bg-gray-200 blur-md"></div>
      </div>
    </div>
  );
}
