export default function ButtonDemo() {
  return (
    <a
      href="https://uitopia.xyz"
      className="relative font-medium text-neutral-950 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65,0.05,0.36,1)] hover:after:origin-bottom-left hover:after:scale-x-100 dark:text-neutral-100 dark:after:bg-neutral-200"
    >
      Hover me
    </a>
  );
}
