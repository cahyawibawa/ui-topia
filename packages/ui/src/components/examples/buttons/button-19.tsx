export default function ButtonDemo() {
  return (
    <button className="group relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-lg bg-neutral-950 px-3.5 py-2.5 font-medium text-neutral-200 dark:bg-neutral-800">
      <span>Hover me</span>
      <div className="absolute inset-0 flex size-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
        <div className="relative h-full w-8 bg-white/20" />
      </div>
    </button>
  );
}
