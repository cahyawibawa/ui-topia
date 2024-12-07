export default function ButtonDemo() {
  return (
    <button className="group relative">
      <div className="group-hover:-translate-x-3 group-hover:-translate-y-3 relative z-10 inline-flex h-12 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-transparent px-6 font-medium transition-all duration-300 dark:border-neutral-700 dark:text-neutral-200">
        Hover me
      </div>
      <div className="group-hover:-translate-x-3 group-hover:-translate-y-3 absolute inset-0 z-0 size-full rounded-lg transition-all duration-300 group-hover:[box-shadow:5px_5px_#a3a3a3,10px_10px_#d4d4d4,15px_15px_#e5e5e5] dark:group-hover:[box-shadow:5px_5px_#525252,10px_10px_#404040,15px_15px_#262626]" />
    </button>
  );
}
