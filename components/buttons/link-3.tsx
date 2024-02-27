export function Link3() {
  return (
    <button
      role="link"
      className="after:ease-[cubic-bezier(0.65_0.05_0.36_1)] relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
    >
      Hover me
    </button>
  )
}
