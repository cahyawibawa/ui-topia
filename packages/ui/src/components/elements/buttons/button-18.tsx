export default function ButtonDemo() {
  return (
    <button
      className="inline-flex cursor-pointer items-center rounded-lg bg-neutral-950 px-3 py-1.5 font-medium text-neutral-100 text-sm transition-all duration-200 hover:bg-neutral-900 active:bg-neutral-800 disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-800 dark:text-neutral-100 dark:active:bg-neutral-600 dark:hover:bg-neutral-700"
      disabled={true}
    >
      <div className="mr-2 size-3 animate-spin rounded-full border-2 border-neutral-100 border-t-transparent border-solid" />
      <span>Loading...</span>
    </button>
  );
}
