export function BlackIcon11() {
  return (
    <button className="group inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-md bg-gradient-to-t from-slate-950 to-slate-900 px-3.5 py-2.5 font-medium text-white shadow-sm transition-all duration-100 ease-in-out hover:to-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:pointer-events-none sm:text-sm">
      Hover me
      <svg
        fill="none"
        stroke="currentColor"
        width="11"
        height="11"
        viewBox="0 0 10 10"
        aria-hidden="true"
        strokeWidth={1.5}
        className="-mr-0.5"
      >
        <path
          className="opacity-0 transition group-hover:opacity-100"
          d="M0 5h7"
        />
        <path
          className="transition group-hover:translate-x-[3px]"
          d="M1 1l4 4-4 4"
        />
      </svg>
    </button>
  )
}
