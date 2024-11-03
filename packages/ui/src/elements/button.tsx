import type * as React from "react";

// inspired by https://clerk.com/
export function ClerkButton() {
  return (
    <button className="rounded-lg border border-indigo-400/20 border-t-indigo-400/70 border-b-indigo-600/70 bg-gradient-to-b from-indigo-500 to-indigo-600 px-4 pt-2.5 pb-3 font-medium text-white leading-none antialiased shadow-md ring-1 ring-indigo-600">
      <span className="drop-shadow-sm">Create user</span>
    </button>
  );
}

export function Black1() {
  return (
    <button className="inline-flex h-12 items-center justify-center rounded-lg bg-neutral-950 px-6 font-medium text-neutral-50 transition active:scale-110 dark:bg-neutral-800 dark:text-neutral-100">
      Click me
    </button>
  );
}

export function Black2() {
  return (
    <button className="inline-flex h-12 items-center justify-center rounded-lg bg-neutral-950 px-6 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition active:scale-95 dark:bg-neutral-800 dark:text-neutral-100 dark:shadow-neutral-700/20">
      Click me
    </button>
  );
}

export function Black3() {
  return (
    <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg bg-neutral-950 px-6 font-medium text-neutral-200 duration-500 dark:bg-neutral-800">
      <div className="translate-x-0 transition group-hover:translate-x-[150%]">
        Hover me
      </div>
      <div className="absolute translate-x-[150%] transition group-hover:translate-x-0">
        Hover me
      </div>
    </button>
  );
}

export function Black4() {
  return (
    <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg bg-neutral-950 px-6 font-medium text-neutral-200 duration-500 dark:bg-neutral-800">
      <div className="translate-y-0 transition group-hover:translate-y-[150%]">
        Hover me
      </div>
      <div className="absolute translate-y-[150%] transition group-hover:translate-y-0">
        Hover me
      </div>
    </button>
  );
}

export function Black5() {
  return (
    <>
      <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg bg-neutral-950 px-6 font-medium text-neutral-200 dark:bg-neutral-800">
        <span>Hover me</span>
        <div className="absolute inset-0 flex size-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
          <div className="relative h-full w-8 bg-white/20" />
        </div>
      </button>
    </>
  );
}

export function Black6() {
  return (
    <>
      <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg bg-neutral-950 px-6 font-medium text-neutral-200 transition hover:scale-110 dark:bg-neutral-800">
        <span>Hover me</span>
        <div className="absolute inset-0 flex size-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
          <div className="relative h-full w-8 bg-white/20" />
        </div>
      </button>
    </>
  );
}

export function Black7() {
  return (
    <button className="relative h-12 overflow-hidden rounded-lg bg-neutral-950 px-5 py-2.5 text-white transition-all duration-300 hover:bg-neutral-800 hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:hover:ring-neutral-700">
      <span className="relative">Hover me</span>
    </button>
  );
}

export function Black8() {
  return (
    <button className="active:-translate-y-1 relative overflow-hidden rounded-lg bg-neutral-950 px-5 py-2.5 text-white transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:scale-x-90 active:scale-y-110 dark:bg-neutral-800">
      Click me
    </button>
  );
}

export function Black9() {
  return (
    <button className="relative overflow-hidden rounded-lg bg-neutral-950 px-5 py-2.5 text-white duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90 dark:bg-neutral-800">
      Click me
    </button>
  );
}

export function Black10() {
  return (
    <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg bg-neutral-950 px-6 font-medium text-neutral-50 dark:bg-neutral-800">
      <span className="absolute size-0 rounded-full bg-teal-500 transition-all duration-300 group-hover:h-56 group-hover:w-32"></span>
      <span className="relative">Hover me</span>
    </button>
  );
}

export function Black11() {
  return (
    <button className="group relative h-12 overflow-hidden rounded-lg bg-neutral-950 px-8 py-2 text-neutral-50 dark:bg-neutral-800">
      <span className="relative z-10">Hover Me</span>
      <span className="absolute inset-0 overflow-hidden rounded-lg">
        <span className="-translate-x-full group-hover:-translate-x-0 absolute left-0 aspect-square w-full origin-center rounded-full bg-teal-500 transition-all duration-500 group-hover:scale-150" />
      </span>
    </button>
  );
}

export function Black12() {
  return (
    <button className="group relative z-0 h-12 overflow-hidden rounded-lg bg-neutral-950 px-8 py-2 text-neutral-50 dark:bg-neutral-800">
      <span className="relative z-10">Hover Me</span>
      <span className="absolute inset-0 overflow-hidden rounded-lg">
        <span className="group-hover:-translate-x-0 absolute left-0 aspect-square w-full origin-center translate-x-full rounded-full bg-teal-500 transition-all duration-500 group-hover:scale-150" />
      </span>
    </button>
  );
}

export function Black13() {
  return (
    <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg bg-teal-500 px-6 font-medium text-neutral-50">
      <span className="absolute h-56 w-32 rounded-full bg-neutral-950 transition-all duration-300 group-hover:size-0"></span>
      <span className="relative">Hover me</span>
    </button>
  );
}

export function Black14() {
  return (
    <button className="relative h-12 overflow-hidden rounded-lg bg-neutral-950 px-5 py-2.5 text-white transition-all duration-200 hover:bg-neutral-800 hover:ring-offset-2 active:ring-2 active:ring-neutral-800 dark:bg-neutral-800 dark:active:ring-neutral-700 dark:hover:bg-neutral-700">
      Click me
    </button>
  );
}

export function BlackIcon1() {
  return (
    <>
      <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg bg-neutral-950 px-6 font-medium text-neutral-200 duration-500 dark:bg-neutral-800">
        <div className="translate-x-0 opacity-100 transition group-hover:translate-x-[150%] group-hover:opacity-0">
          Hover me
        </div>
        <div className="absolute translate-x-[150%] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
          <svg
            data-testid="geist-icon"
            height="16"
            strokeLinejoin="round"
            viewBox="0 0 16 16"
            width="16"
            style={{ color: "currentcolor" }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.53033 2.21968L9 1.68935L7.93934 2.75001L8.46967 3.28034L12.4393 7.25001H1.75H1V8.75001H1.75H12.4393L8.46967 12.7197L7.93934 13.25L9 14.3107L9.53033 13.7803L14.6036 8.70711C14.9941 8.31659 14.9941 7.68342 14.6036 7.2929L9.53033 2.21968Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </button>
    </>
  );
}

export function BlackIcon2() {
  return (
    <>
      <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg bg-neutral-950 px-6 font-medium text-neutral-200 duration-500 dark:bg-neutral-800">
        <div className="translate-y-0 opacity-100 transition group-hover:translate-y-[150%] group-hover:opacity-0">
          Hover me
        </div>
        <div className="absolute translate-y-[150%] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
          <svg
            data-testid="geist-icon"
            height="16"
            strokeLinejoin="round"
            viewBox="0 0 16 16"
            width="16"
            style={{ color: "currentcolor" }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.74999 1.75V1H7.24999V1.75V12.4393L3.28032 8.46967L2.74999 7.93934L1.68933 9L2.21966 9.53033L7.29288 14.6036C7.68341 14.9941 8.31657 14.9941 8.7071 14.6036L13.7803 9.53033L14.3107 9L13.25 7.93934L12.7197 8.46967L8.74999 12.4393V1.75Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </button>
    </>
  );
}

export function BlackIcon3() {
  return (
    <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg bg-neutral-950 px-6 font-medium text-neutral-200 duration-500 dark:bg-neutral-800">
      <div className="-translate-x-0 relative inline-flex items-center transition group-hover:translate-x-6">
        <div className="-translate-x-4 group-hover:-translate-x-6 absolute opacity-0 transition group-hover:opacity-100">
          <svg
            data-testid="geist-icon"
            height="16"
            strokeLinejoin="round"
            viewBox="0 0 16 16"
            width="16"
            style={{ color: "currentcolor" }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.00001 0.433594L8.65845 1.64093L10.5908 5.18412L14.5577 5.92698L15.9094 6.18011L14.9646 7.17942L12.192 10.1121L12.7113 14.1144L12.8883 15.4782L11.6459 14.8884L8.00001 13.1577L4.35408 14.8884L3.11173 15.4782L3.28869 14.1144L3.80802 10.1121L1.03538 7.17942L0.0906067 6.18011L1.44233 5.92698L5.40922 5.18412L7.34156 1.64093L8.00001 0.433594ZM8.00001 3.56646L6.55565 6.21487L6.38519 6.52743L6.03525 6.59296L3.07014 7.14822L5.14259 9.34029L5.38718 9.59899L5.34137 9.95205L4.95318 12.9436L7.67838 11.65L8.00001 11.4973L8.32163 11.65L11.0468 12.9436L10.6586 9.95205L10.6128 9.59899L10.8574 9.34029L12.9299 7.14822L9.96476 6.59296L9.61482 6.52743L9.44436 6.21487L8.00001 3.56646Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <span className="pr-6">Hover</span>
        <div className="absolute right-0 translate-x-0 opacity-100 transition group-hover:translate-x-4 group-hover:opacity-0">
          <svg
            data-testid="geist-icon"
            height="16"
            strokeLinejoin="round"
            viewBox="0 0 16 16"
            width="16"
            style={{ color: "currentcolor" }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.53033 2.21968L9 1.68935L7.93934 2.75001L8.46967 3.28034L12.4393 7.25001H1.75H1V8.75001H1.75H12.4393L8.46967 12.7197L7.93934 13.25L9 14.3107L9.53033 13.7803L14.6036 8.70711C14.9941 8.31659 14.9941 7.68342 14.6036 7.2929L9.53033 2.21968Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
    </button>
  );
}

export function BlackIcon4() {
  return (
    <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg bg-neutral-950 px-6 font-medium text-neutral-200 dark:bg-neutral-800">
      <div className="mr-0 w-0 translate-x-full opacity-0 transition-all duration-200 group-hover:mr-1 group-hover:w-5 group-hover:translate-x-0 group-hover:opacity-100">
        <svg
          data-testid="geist-icon"
          height="16"
          strokeLinejoin="round"
          viewBox="0 0 16 16"
          width="16"
          style={{ color: "currentcolor" }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.53033 2.21968L9 1.68935L7.93934 2.75001L8.46967 3.28034L12.4393 7.25001H1.75H1V8.75001H1.75H12.4393L8.46967 12.7197L7.93934 13.25L9 14.3107L9.53033 13.7803L14.6036 8.70711C14.9941 8.31659 14.9941 7.68342 14.6036 7.2929L9.53033 2.21968Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      <span>Hover me</span>
    </button>
  );
}

export function BlackIcon5() {
  return (
    <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200">
      <span>Hover me</span>
      <div className="w-0 translate-x-full pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
        <svg
          data-testid="geist-icon"
          height="16"
          strokeLinejoin="round"
          viewBox="0 0 16 16"
          width="16"
          style={{ color: "currentcolor" }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.53033 2.21968L9 1.68935L7.93934 2.75001L8.46967 3.28034L12.4393 7.25001H1.75H1V8.75001H1.75H12.4393L8.46967 12.7197L7.93934 13.25L9 14.3107L9.53033 13.7803L14.6036 8.70711C14.9941 8.31659 14.9941 7.68342 14.6036 7.2929L9.53033 2.21968Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </button>
  );
}

export function BlackIcon6() {
  return (
    <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 duration-500">
      <div className="-translate-x-0 group-hover:-translate-x-6 relative inline-flex items-center transition">
        <div className="group-hover:-translate-x-6 absolute translate-x-0 opacity-100 transition group-hover:opacity-0">
          <svg
            data-testid="geist-icon"
            height="16"
            strokeLinejoin="round"
            viewBox="0 0 16 16"
            width="16"
            style={{ color: "currentcolor" }}
          >
            <path
              d="M7.99999 0.489502L10.5734 5.20807L15.8562 6.19736L12.1638 10.1029L12.8554 15.4329L7.99999 13.1281L3.1446 15.4329L3.83621 10.1029L0.143799 6.19736L5.42663 5.20807L7.99999 0.489502Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <span className="pl-6">Hover</span>
        <div className="absolute right-0 translate-x-12 opacity-0 transition group-hover:translate-x-6 group-hover:opacity-100">
          <svg
            data-testid="geist-icon"
            height="16"
            strokeLinejoin="round"
            viewBox="0 0 16 16"
            width="16"
            style={{ color: "currentcolor" }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.53033 2.21968L9 1.68935L7.93934 2.75001L8.46967 3.28034L12.4393 7.25001H1.75H1V8.75001H1.75H12.4393L8.46967 12.7197L7.93934 13.25L9 14.3107L9.53033 13.7803L14.6036 8.70711C14.9941 8.31659 14.9941 7.68342 14.6036 7.2929L9.53033 2.21968Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
    </button>
  );
}

export function BlackIcon7() {
  return (
    <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg bg-neutral-950 px-6 font-medium text-neutral-200">
      <span>Hover me</span>
      <div className="ml-1 transition duration-300 group-hover:rotate-[360deg]">
        <svg
          data-testid="geist-icon"
          height="16"
          strokeLinejoin="round"
          viewBox="0 0 16 16"
          width="16"
          style={{ color: "currentcolor" }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.75001 2H5.00001V3.5H5.75001H11.4393L2.21968 12.7197L1.68935 13.25L2.75001 14.3107L3.28034 13.7803L12.4988 4.56182V10.25V11H13.9988V10.25V3C13.9988 2.44772 13.5511 2 12.9988 2H5.75001Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </button>
  );
}

export function BlackIcon8() {
  return (
    <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg bg-neutral-950 px-6 font-medium text-neutral-200">
      <span>Hover me</span>
      <div className="ml-1 transition group-hover:translate-x-1">
        <svg
          data-testid="geist-icon"
          height="16"
          strokeLinejoin="round"
          viewBox="0 0 16 16"
          width="16"
          style={{ color: "currentcolor" }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.75001 2H5.00001V3.5H5.75001H11.4393L2.21968 12.7197L1.68935 13.25L2.75001 14.3107L3.28034 13.7803L12.4988 4.56182V10.25V11H13.9988V10.25V3C13.9988 2.44772 13.5511 2 12.9988 2H5.75001Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </button>
  );
}

export function BlackIcon9() {
  return (
    <button className="group relative inline-flex h-12 items-center justify-center rounded-lg bg-neutral-950 px-6 font-medium text-neutral-200 transition-all duration-300 hover:bg-neutral-900 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700">
      <span className="relative z-10">Hover me</span>
      <div className="relative ml-1 size-5 overflow-hidden">
        <div className="group-hover:-translate-y-5 absolute transition-all duration-200 group-hover:translate-x-4">
          <svg
            data-testid="geist-icon"
            height="16"
            strokeLinejoin="round"
            viewBox="0 0 16 16"
            width="16"
            style={{ color: "currentcolor" }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.75001 2H5.00001V3.5H5.75001H11.4393L2.21968 12.7197L1.68935 13.25L2.75001 14.3107L3.28034 13.7803L12.4988 4.56182V10.25V11H13.9988V10.25V3C13.9988 2.44772 13.5511 2 12.9988 2H5.75001Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
    </button>
  );
}

export function BlackIcon10() {
  return (
    <button className="group relative inline-flex h-12 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-200">
      <span>Hover me</span>
      <div className="-rotate-45 ml-1 transition-all duration-200 group-hover:rotate-0">
        <svg
          data-testid="geist-icon"
          height="16"
          strokeLinejoin="round"
          viewBox="0 0 16 16"
          width="16"
          style={{ color: "currentcolor" }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.75001 2H5.00001V3.5H5.75001H11.4393L2.21968 12.7197L1.68935 13.25L2.75001 14.3107L3.28034 13.7803L12.4988 4.56182V10.25V11H13.9988V10.25V3C13.9988 2.44772 13.5511 2 12.9988 2H5.75001Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </button>
  );
}

export function BlackIcon11() {
  return (
    <button className="group inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-gradient-to-t from-neutral-950 to-neutral-900 px-3.5 py-2.5 font-medium text-white shadow-sm transition-all duration-300 ease-in-out hover:to-neutral-800 focus-visible:outline-2 focus-visible:outline-teal-500 focus-visible:outline-offset-2 disabled:pointer-events-none sm:text-sm dark:from-neutral-800 dark:to-neutral-700 dark:hover:to-neutral-600">
      Hover me
      <svg
        fill="none"
        stroke="currentColor"
        width="11"
        height="11"
        viewBox="0 0 10 10"
        aria-hidden="true"
        strokeWidth={1.5}
        className="-mr-0.5 transition-transform duration-300 group-hover:translate-x-1"
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
  );
}

export function BlackLoading1() {
  return (
    <button
      disabled
      className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg bg-neutral-950 px-6 font-medium text-neutral-200 transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-800 dark:text-neutral-100"
    >
      <svg
        data-testid="geist-icon"
        height="16"
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        width="16"
        style={{ color: "currentcolor" }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.00002 1.25C5.33749 1.25 3.02334 2.73677 1.84047 4.92183L1.48342 5.58138L2.80253 6.29548L3.15958 5.63592C4.09084 3.91566 5.90986 2.75 8.00002 2.75C10.4897 2.75 12.5941 4.40488 13.2713 6.67462H11.8243H11.0743V8.17462H11.8243H15.2489C15.6631 8.17462 15.9989 7.83883 15.9989 7.42462V4V3.25H14.4989V4V5.64468C13.4653 3.06882 10.9456 1.25 8.00002 1.25ZM1.50122 10.8555V12.5V13.25H0.0012207V12.5V9.07538C0.0012207 8.66117 0.337007 8.32538 0.751221 8.32538H4.17584H4.92584V9.82538H4.17584H2.72876C3.40596 12.0951 5.51032 13.75 8.00002 13.75C10.0799 13.75 11.8912 12.5958 12.8266 10.8895L13.1871 10.2318L14.5025 10.9529L14.142 11.6105C12.9539 13.7779 10.6494 15.25 8.00002 15.25C5.05453 15.25 2.53485 13.4313 1.50122 10.8555Z"
          fill="currentColor"
          className="mr-1 size-5 animate-spin text-white"
        ></path>
      </svg>
      <span className="relative z-10">Loading...</span>
    </button>
  );
}

export function BlackRound1() {
  return (
    <button className="group relative inline-flex size-12 items-center justify-center overflow-hidden rounded-full bg-neutral-950 font-medium text-neutral-200 transition-all duration-300 hover:bg-neutral-900 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700">
      <div className="translate-x-0 transition-all duration-300 group-hover:translate-x-[300%]">
        <svg
          data-testid="geist-icon"
          height="16"
          strokeLinejoin="round"
          viewBox="0 0 16 16"
          width="16"
          style={{ color: "currentcolor" }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.53033 2.21968L9 1.68935L7.93934 2.75001L8.46967 3.28034L12.4393 7.25001H1.75H1V8.75001H1.75H12.4393L8.46967 12.7197L7.93934 13.25L9 14.3107L9.53033 13.7803L14.6036 8.70711C14.9941 8.31659 14.9941 7.68342 14.6036 7.2929L9.53033 2.21968Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      <div className="absolute translate-x-[300%] transition-all duration-300 group-hover:translate-x-0">
        <svg
          data-testid="geist-icon"
          height="16"
          strokeLinejoin="round"
          viewBox="0 0 16 16"
          width="16"
          style={{ color: "currentcolor" }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.53033 2.21968L9 1.68935L7.93934 2.75001L8.46967 3.28034L12.4393 7.25001H1.75H1V8.75001H1.75H12.4393L8.46967 12.7197L7.93934 13.25L9 14.3107L9.53033 13.7803L14.6036 8.70711C14.9941 8.31659 14.9941 7.68342 14.6036 7.2929L9.53033 2.21968Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </button>
  );
}

export function BlackRound2() {
  return (
    <button className="group relative inline-flex size-12 items-center justify-center overflow-hidden rounded-full bg-neutral-950 transition-all duration-300 hover:bg-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700">
      <div className="transition duration-300 group-hover:rotate-[360deg]">
        <svg
          data-testid="geist-icon"
          height="16"
          strokeLinejoin="round"
          viewBox="0 0 16 16"
          width="16"
          style={{ color: "currentcolor" }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.53033 2.21968L9 1.68935L7.93934 2.75001L8.46967 3.28034L12.4393 7.25001H1.75H1V8.75001H1.75H12.4393L8.46967 12.7197L7.93934 13.25L9 14.3107L9.53033 13.7803L14.6036 8.70711C14.9941 8.31659 14.9941 7.68342 14.6036 7.2929L9.53033 2.21968Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </button>
  );
}

export function BlackRound3() {
  return (
    <button className="group relative inline-flex size-12 items-center justify-center overflow-hidden rounded-full bg-neutral-950 transition-all duration-300 hover:bg-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700">
      <div className="-rotate-45 transition duration-300 group-hover:rotate-0">
        <svg
          data-testid="geist-icon"
          height="16"
          strokeLinejoin="round"
          viewBox="0 0 16 16"
          width="16"
          style={{ color: "currentcolor" }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.53033 2.21968L9 1.68935L7.93934 2.75001L8.46967 3.28034L12.4393 7.25001H1.75H1V8.75001H1.75H12.4393L8.46967 12.7197L7.93934 13.25L9 14.3107L9.53033 13.7803L14.6036 8.70711C14.9941 8.31659 14.9941 7.68342 14.6036 7.2929L9.53033 2.21968Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </button>
  );
}

export function BlackRound4() {
  return (
    <button className="group relative inline-flex size-12 items-center justify-center overflow-hidden rounded-lg bg-neutral-950 font-medium text-neutral-200 transition-all duration-300 hover:w-32 hover:bg-neutral-900 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700">
      <div className="group-hover:-translate-x-3 inline-flex whitespace-nowrap opacity-0 transition-all duration-200 group-hover:opacity-100">
        Hover me
      </div>
      <div className="absolute right-3.5 transition-all duration-300 group-hover:translate-x-2">
        <svg
          data-testid="geist-icon"
          height="16"
          strokeLinejoin="round"
          viewBox="0 0 16 16"
          width="16"
          style={{ color: "currentcolor" }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.53033 2.21968L9 1.68935L7.93934 2.75001L8.46967 3.28034L12.4393 7.25001H1.75H1V8.75001H1.75H12.4393L8.46967 12.7197L7.93934 13.25L9 14.3107L9.53033 13.7803L14.6036 8.70711C14.9941 8.31659 14.9941 7.68342 14.6036 7.2929L9.53033 2.21968Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </button>
  );
}

export function BlackSm1() {
  return (
    <button className="cursor-pointer rounded-lg bg-neutral-950 px-3 py-1.5 font-medium text-sm text-white shadow-lg shadow-neutral-500/20 transition-all duration-200 hover:bg-neutral-900 active:scale-95 dark:bg-neutral-800 dark:text-neutral-100 dark:shadow-neutral-700/20 dark:hover:bg-neutral-700">
      Click me
    </button>
  );
}

export function BlackSm2() {
  return (
    <button className="cursor-pointer rounded-lg bg-neutral-950 px-3 py-1.5 font-medium text-neutral-100 text-sm transition-all duration-200 hover:bg-neutral-900 active:bg-neutral-800 dark:bg-neutral-800 dark:text-neutral-100 dark:active:bg-neutral-600 dark:hover:bg-neutral-700">
      Hover me
    </button>
  );
}

export function BlackSmLoading1() {
  return (
    <button
      className="inline-flex cursor-pointer items-center rounded-lg bg-neutral-950 px-3 py-1.5 font-medium text-neutral-100 text-sm transition-all duration-200 hover:bg-neutral-900 active:bg-neutral-800 disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-800 dark:text-neutral-100 dark:active:bg-neutral-600 dark:hover:bg-neutral-700"
      disabled
    >
      <div className="mr-2 size-3 animate-spin rounded-full border-2 border-neutral-100 border-t-transparent border-solid"></div>
      <span>Loading...</span>
    </button>
  );
}

export function BlackSquare1() {
  return (
    <button className="relative inline-flex size-12 items-center justify-center rounded-lg bg-neutral-950 transition-all duration-200 hover:bg-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700">
      <svg
        data-testid="geist-icon"
        height="16"
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        width="16"
        style={{ color: "currentcolor" }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.53033 2.21968L9 1.68935L7.93934 2.75001L8.46967 3.28034L12.4393 7.25001H1.75H1V8.75001H1.75H12.4393L8.46967 12.7197L7.93934 13.25L9 14.3107L9.53033 13.7803L14.6036 8.70711C14.9941 8.31659 14.9941 7.68342 14.6036 7.2929L9.53033 2.21968Z"
          fill="currentColor"
        ></path>
      </svg>
    </button>
  );
}

export function Teal1() {
  return (
    <button className="group relative h-12 overflow-hidden rounded-lg bg-teal-500 px-6 font-medium text-white transition-all duration-300 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700">
      <span className="relative z-10">Hover me</span>
      <div className="absolute inset-0 h-full w-0 bg-white/30 transition-[width] duration-300 ease-out group-hover:w-full"></div>
    </button>
  );
}

export function Teal2() {
  return (
    <button className="after:-z-10 relative z-0 h-12 rounded-lg bg-teal-500 px-6 font-medium text-white transition-all duration-300 after:absolute after:top-0 after:left-0 after:size-full after:rounded-lg after:bg-teal-500 after:transition-all after:duration-300 after:content-[''] hover:bg-teal-600 hover:after:scale-150 hover:after:opacity-0 dark:bg-teal-600 dark:hover:bg-teal-700 dark:after:bg-teal-600">
      Hover me
    </button>
  );
}

export function Teal3() {
  return (
    <button className="after:-z-10 relative z-0 h-12 rounded-full bg-teal-500 px-6 text-neutral-50 after:absolute after:top-0 after:left-0 after:size-full after:rounded-full after:bg-teal-500 active:scale-95 active:transition active:after:scale-x-125 active:after:scale-y-150 active:after:opacity-0 active:after:transition active:after:duration-500">
      Click me
    </button>
  );
}

export function Teal4() {
  return (
    <button className="group relative h-12 overflow-hidden rounded-lg bg-teal-500 px-6 text-neutral-50 transition hover:bg-teal-600">
      <span className="relative">Hover me</span>
      <div className="absolute inset-0 top-[20px] flex h-[calc(100%+40px)] w-full justify-center blur-md">
        <div className="relative h-full w-8 bg-white/30"></div>
      </div>
    </button>
  );
}

export function TealLoading1() {
  return (
    <button
      className="inline-flex h-12 items-center rounded-lg bg-teal-500 px-6 font-medium text-white transition-all duration-200 hover:bg-teal-600 disabled:pointer-events-none disabled:opacity-50 dark:bg-teal-600 dark:hover:bg-teal-700"
      disabled
    >
      <div className="mr-2 size-5 animate-spin rounded-full border-2 border-white border-t-transparent border-solid"></div>
      <span>Loading...</span>
    </button>
  );
}

export function GreySm1() {
  return (
    <button className="cursor-pointer rounded-lg bg-neutral-200 px-3 py-1.5 font-medium text-neutral-950 text-sm transition-all duration-200 hover:bg-neutral-300 active:bg-neutral-400 dark:bg-neutral-700 dark:text-neutral-100 dark:active:bg-neutral-500 dark:hover:bg-neutral-600">
      Hover me
    </button>
  );
}

export function Letters1() {
  return (
    <button className="group relative h-12 overflow-hidden rounded-lg border border-neutral-200 bg-transparent px-4 font-medium text-neutral-950 transition-all duration-300 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800">
      <span className="relative inline-flex">
        {"Hover me".split("").map((char, index) => (
          <span
            key={index}
            className={`duration-300 [transition-delay:${index * 20}ms] group-hover:[transform:rotateX(360deg)]`}
          >
            {char}
          </span>
        ))}
      </span>
    </button>
  );
}

export function Letters2() {
  return (
    <button className="group relative h-12 overflow-hidden rounded-lg border border-neutral-200 bg-transparent px-4 font-medium text-neutral-950 transition-all duration-300 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800">
      <span className="relative inline-flex">
        {"Hover me".split("").map((char, index) => (
          <span
            key={index}
            className={`duration-300 [transition-delay:${index * 20}ms] group-hover:[transform:rotateY(360deg)]`}
          >
            {char}
          </span>
        ))}
      </span>
    </button>
  );
}

export function Letters3() {
  return (
    <button className="group relative h-12 overflow-hidden rounded-lg border border-neutral-200 bg-transparent px-4 font-medium text-neutral-950 transition-all duration-300 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800">
      <span className="relative inline-flex overflow-hidden">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[110%] group-hover:skew-y-12">
          Hover me
        </div>
        <div className="absolute translate-y-[110%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          Hover me
        </div>
      </span>
    </button>
  );
}

export function Letters4() {
  return (
    <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-transparent px-4 font-medium text-neutral-950 transition-all duration-300 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800">
      <span className="relative inline-flex overflow-hidden">
        <div className="absolute origin-bottom transition duration-500 [transform:translateX(-150%)_skewX(33deg)] group-hover:[transform:translateX(0)_skewX(0deg)]">
          Hover me
        </div>
        <div className="transition duration-500 [transform:translateX(0%)_skewX(0deg)] group-hover:[transform:translateX(150%)_skewX(33deg)]">
          Hover me
        </div>
      </span>
    </button>
  );
}

export function Link1() {
  return (
    <button
      role="link"
      className="relative font-medium text-neutral-950 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-left after:scale-x-100 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-right hover:after:scale-x-0 dark:text-neutral-100 dark:after:bg-neutral-200"
    >
      Hover me
    </button>
  );
}

export function Link2() {
  return (
    <button
      role="link"
      className="font-medium text-base text-neutral-950 decoration-2 underline-offset-4 transition-colors hover:underline dark:text-neutral-100"
    >
      Hover me
    </button>
  );
}

export function Link3() {
  return (
    <button
      role="link"
      className="relative font-medium text-neutral-950 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65,0.05,0.36,1)] hover:after:origin-bottom-left hover:after:scale-x-100 dark:text-neutral-100 dark:after:bg-neutral-200"
    >
      Hover me
    </button>
  );
}

export function Link4() {
  return (
    <button
      role="link"
      className="relative font-medium text-neutral-950 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:translate-y-1 after:bg-neutral-800 after:opacity-0 after:transition after:duration-300 after:ease-in-out hover:after:translate-y-0 hover:after:opacity-100 dark:text-neutral-100 dark:after:bg-neutral-200"
    >
      Hover me
    </button>
  );
}

export function Link5() {
  return (
    <button
      role="link"
      className="relative font-medium text-neutral-950 after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:w-full after:origin-bottom after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65,0.05,0.36,1)] hover:after:origin-bottom hover:after:scale-x-100 dark:text-neutral-100 dark:after:bg-neutral-200"
    >
      Hover me
    </button>
  );
}

export function Link6() {
  return (
    <button
      role="link"
      className="relative bg-[length:100%_2px,0_2px] bg-[linear-gradient(#262626,#262626),linear-gradient(#3b82f6,#3b82f6)] bg-[position:100%_100%,0_100%] bg-no-repeat px-1 font-medium text-neutral-950 transition-[background-size,color] duration-300 hover:bg-[0_2px,100%_2px] dark:bg-[linear-gradient(#e5e5e5,#e5e5e5),linear-gradient(#3b82f6,#3b82f6)] dark:text-neutral-100"
    >
      Hover me
    </button>
  );
}

export function Link7() {
  return (
    <>
      <button
        role="link"
        className="relative bg-[length:100%_2px,0_2px] bg-[linear-gradient(#262626,#262626),linear-gradient(#3b82f6,#3b82f6)] bg-[position:100%_100%,0_100%] bg-no-repeat transition-[background-size,color] duration-500 hover:bg-[0_2px,100%_2px] hover:text-[#3b82f6]"
      >
        Hover me
      </button>
    </>
  );
}

export function Link8() {
  return (
    <button
      role="link"
      className="relative rounded-lg underline decoration-wavy underline-offset-4 transition-colors duration-300 hover:text-teal-500 hover:underline dark:text-neutral-200 dark:hover:text-teal-400"
    >
      Hover me
    </button>
  );
}

export function Neumorphism() {
  return (
    <div className="rounded-lg bg-gradient-to-b from-stone-300/40 to-transparent p-[4px]">
      <button className="group rounded-lg bg-gradient-to-b from-white to-stone-200/40 p-[4px] shadow-[0_1px_3px_rgba(0,0,0,0.5)] active:scale-[0.995] active:shadow-[0_0px_1px_rgba(0,0,0,0.5)]">
        <div className="rounded-lg bg-gradient-to-b from-stone-200/40 to-white/80 p-2">
          <div className="flex items-center gap-2">
            <svg
              data-testid="geist-icon"
              height="16"
              strokeLinejoin="round"
              viewBox="0 0 16 16"
              width="16"
              style={{ color: "currentcolor" }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.75 1.75V1H7.25V1.75V6.75H2.25H1.5V8.25H2.25H7.25V13.25V14H8.75V13.25V8.25H13.75H14.5V6.75H13.75H8.75V1.75Z"
                fill="#000000"
              ></path>
            </svg>
            <span className="font-semibold text-stone-600">Click Me</span>
          </div>
        </div>
      </button>
    </div>
  );
}

export function Outline1() {
  return (
    <button className="before:-translate-y-full relative h-12 overflow-hidden rounded-lg border border-neutral-200 bg-transparent px-6 before:absolute before:top-0 before:left-0 before:block before:size-full before:bg-neutral-300 before:transition-transform hover:before:translate-y-0 dark:border-neutral-700 dark:before:bg-neutral-600">
      <span className="relative dark:text-neutral-200">Hover me</span>
    </button>
  );
}

export function Outline2() {
  return (
    <button className="relative h-12 overflow-hidden rounded-lg border border-neutral-200 bg-transparent px-6 before:absolute before:bottom-0 before:left-0 before:block before:size-full before:translate-y-full before:bg-neutral-300 before:transition-transform hover:before:translate-y-0 dark:border-neutral-700 dark:before:bg-neutral-600">
      <span className="relative dark:text-neutral-200">Hover me</span>
    </button>
  );
}

export function Outline3() {
  return (
    <button className="before:-translate-x-full relative h-12 overflow-hidden rounded-lg border border-neutral-200 bg-transparent px-6 before:absolute before:bottom-0 before:left-0 before:block before:size-full before:bg-neutral-300 before:transition-transform hover:before:translate-x-0 dark:border-neutral-700 dark:before:bg-neutral-600">
      <span className="relative dark:text-neutral-200">Hover me</span>
    </button>
  );
}

export function Outline4() {
  return (
    <button className="relative h-12 overflow-hidden rounded-lg border border-neutral-200 bg-transparent px-6 before:absolute before:bottom-0 before:left-0 before:block before:size-full before:translate-x-full before:bg-neutral-300 before:transition-transform hover:before:translate-x-0 dark:border-neutral-700 dark:before:bg-neutral-600">
      <span className="relative dark:text-neutral-200">Hover me</span>
    </button>
  );
}

export function Shadow1() {
  return (
    <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-transparent px-6 font-medium transition-all duration-100 [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] dark:border-neutral-700 dark:text-neutral-200 active:[box-shadow:0px_0px_rgb(82_82_82)] dark:[box-shadow:5px_5px_rgb(212_212_212)]">
      Click me
    </button>
  );
}

export function Shadow2() {
  return (
    <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-transparent px-6 font-medium transition-all duration-100 [box-shadow:5px_5px_rgb(82_82_82)] hover:translate-x-[3px] hover:translate-y-[3px] dark:border-neutral-700 dark:text-neutral-200 hover:[box-shadow:0px_0px_rgb(82_82_82)] dark:[box-shadow:5px_5px_rgb(212_212_212)]">
      Hover me
    </button>
  );
}

export function Shadow3() {
  return (
    <button className="group relative">
      <div className="group-hover:-translate-x-3 group-hover:-translate-y-3 relative z-10 inline-flex h-12 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-transparent px-6 font-medium transition-all duration-300 dark:border-neutral-700 dark:text-neutral-200">
        Hover me
      </div>
      <div className="group-hover:-translate-x-3 group-hover:-translate-y-3 absolute inset-0 z-0 size-full rounded-lg transition-all duration-300 group-hover:[box-shadow:5px_5px_#a3a3a3,10px_10px_#d4d4d4,15px_15px_#e5e5e5] dark:group-hover:[box-shadow:5px_5px_#525252,10px_10px_#404040,15px_15px_#262626]"></div>
    </button>
  );
}

export function Shadow4() {
  return (
    <button className="group relative">
      <div className="group-hover:-translate-x-3 group-hover:-translate-y-3 relative z-10 inline-flex h-12 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-transparent px-6 font-medium transition-all duration-300 group-active:translate-x-0 group-active:translate-y-0 dark:border-neutral-700 dark:text-neutral-200">
        Hover me
      </div>
      <div className="group-hover:-translate-x-3 group-hover:-translate-y-3 absolute inset-0 z-0 size-full rounded-lg transition-all duration-300 group-active:translate-x-0 group-active:translate-y-0 group-active:shadow-none group-hover:[box-shadow:5px_5px_#a3a3a3,10px_10px_#d4d4d4,15px_15px_#e5e5e5] dark:group-hover:[box-shadow:5px_5px_#525252,10px_10px_#404040,15px_15px_#262626]"></div>
    </button>
  );
}

export function Shadow5() {
  return (
    <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-transparent px-6 font-medium transition-all [box-shadow:0px_4px_1px_#a3a3a3] active:translate-y-[2px] active:shadow-none dark:border-neutral-700 dark:text-neutral-200 dark:[box-shadow:0px_4px_1px_#525252]">
      Click me
    </button>
  );
}

export function SquareOutline1() {
  return (
    <button className="relative inline-flex size-12 items-center justify-center rounded-lg border border-neutral-300 bg-transparent transition-colors hover:bg-neutral-300 dark:border-neutral-600 dark:hover:bg-neutral-700">
      <svg
        data-testid="geist-icon"
        height="16"
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        width="16"
        style={{ color: "currentcolor" }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.53033 2.21968L9 1.68935L7.93934 2.75001L8.46967 3.28034L12.4393 7.25001H1.75H1V8.75001H1.75H12.4393L8.46967 12.7197L7.93934 13.25L9 14.3107L9.53033 13.7803L14.6036 8.70711C14.9941 8.31659 14.9941 7.68342 14.6036 7.2929L9.53033 2.21968Z"
          fill="currentColor"
        ></path>
      </svg>
    </button>
  );
}

export function SubtleSkeuomorphic1() {
  return (
    <button className="group h-8 select-none rounded-lg bg-gradient-to-b from-zinc-800 via-zinc-700 to-zinc-600 px-3 text-sm text-zinc-50 leading-8 shadow-[0_-1px_0_1px_rgba(0,0,0,0.8)_inset,0_0_0_1px_rgb(9_9_11)_inset,0_0.5px_0_1.5px_#71717a_inset] hover:bg-gradient-to-b hover:from-zinc-900 hover:via-zinc-900 hover:to-zinc-700 active:shadow-[0_3px_0_0_rgba(0,0,0)_inset] dark:from-zinc-700 dark:via-zinc-600 dark:to-zinc-500 dark:hover:from-zinc-800 dark:hover:via-zinc-800 dark:hover:to-zinc-600">
      <span className="block group-active:[transform:translate3d(0,1px,0)]">
        Click me
      </span>
    </button>
  );
}

export function SubtleSkeuomorphic2() {
  return (
    <button className="group h-8 select-none rounded-lg bg-white px-3 text-sm text-zinc-950 leading-8 shadow-[0_-1px_0_0px_#d4d4d8_inset,0_0_0_1px_#f4f4f5_inset,0_0.5px_0_1.5px_#fff_inset] hover:bg-zinc-50 hover:via-zinc-900 hover:to-zinc-800 active:shadow-[-1px_0px_1px_0px_#e4e4e7_inset,1px_0px_1px_0px_#e4e4e7_inset,0px_0.125rem_1px_0px_#d4d4d8_inset] dark:bg-zinc-800 dark:text-zinc-100 dark:shadow-[0_-1px_0_0px_#27272a_inset,0_0_0_1px_#18181b_inset,0_0.5px_0_1.5px_#3f3f46_inset] dark:hover:bg-zinc-700">
      <span className="block group-active:[transform:translate3d(0,1px,0)]">
        Click me
      </span>
    </button>
  );
}

export function SubtleSkeuomorphic3() {
  return (
    <button
      className="group flex size-8 select-none items-center justify-center rounded-lg bg-white text-zinc-950 leading-8 shadow-[0_-1px_0_0px_#d4d4d8_inset,0_0_0_1px_#f4f4f5_inset,0_0.5px_0_1.5px_#fff_inset] hover:bg-zinc-50 hover:via-zinc-900 hover:to-zinc-800 active:shadow-[-1px_0px_1px_0px_#e4e4e7_inset,1px_0px_1px_0px_#e4e4e7_inset,0px_0.125rem_1px_0px_#d4d4d8_inset] dark:bg-zinc-800 dark:text-zinc-100 dark:shadow-[0_-1px_0_0px_#27272a_inset,0_0_0_1px_#18181b_inset,0_0.5px_0_1.5px_#3f3f46_inset] dark:hover:bg-zinc-700"
      aria-label="Change language"
    >
      <span className="flex items-center group-active:[transform:translate3d(0,1px,0)]">
        <svg
          data-testid="geist-icon"
          height="16"
          strokeLinejoin="round"
          viewBox="0 0 16 16"
          width="16"
          style={{ color: "currentcolor" }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.268 14.0934C11.9051 13.4838 13.2303 12.2333 13.9384 10.6469C13.1192 10.7941 12.2138 10.9111 11.2469 10.9925C11.0336 12.2005 10.695 13.2621 10.268 14.0934ZM8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM8.48347 14.4823C8.32384 14.494 8.16262 14.5 8 14.5C7.83738 14.5 7.67616 14.494 7.51654 14.4823C7.5132 14.4791 7.50984 14.4759 7.50647 14.4726C7.2415 14.2165 6.94578 13.7854 6.67032 13.1558C6.41594 12.5744 6.19979 11.8714 6.04101 11.0778C6.67605 11.1088 7.33104 11.125 8 11.125C8.66896 11.125 9.32395 11.1088 9.95899 11.0778C9.80021 11.8714 9.58406 12.5744 9.32968 13.1558C9.05422 13.7854 8.7585 14.2165 8.49353 14.4726C8.49016 14.4759 8.4868 14.4791 8.48347 14.4823ZM11.4187 9.72246C12.5137 9.62096 13.5116 9.47245 14.3724 9.28806C14.4561 8.87172 14.5 8.44099 14.5 8C14.5 7.55901 14.4561 7.12828 14.3724 6.71194C13.5116 6.52755 12.5137 6.37904 11.4187 6.27753C11.4719 6.83232 11.5 7.40867 11.5 8C11.5 8.59133 11.4719 9.16768 11.4187 9.72246ZM10.1525 6.18401C10.2157 6.75982 10.25 7.36805 10.25 8C10.25 8.63195 10.2157 9.24018 10.1525 9.81598C9.46123 9.85455 8.7409 9.875 8 9.875C7.25909 9.875 6.53877 9.85455 5.84749 9.81598C5.7843 9.24018 5.75 8.63195 5.75 8C5.75 7.36805 5.7843 6.75982 5.84749 6.18401C6.53877 6.14545 7.25909 6.125 8 6.125C8.74091 6.125 9.46123 6.14545 10.1525 6.18401ZM11.2469 5.00748C12.2138 5.08891 13.1191 5.20593 13.9384 5.35306C13.2303 3.7667 11.9051 2.51622 10.268 1.90662C10.695 2.73788 11.0336 3.79953 11.2469 5.00748ZM8.48347 1.51771C8.4868 1.52089 8.49016 1.52411 8.49353 1.52737C8.7585 1.78353 9.05422 2.21456 9.32968 2.84417C9.58406 3.42562 9.80021 4.12856 9.95899 4.92219C9.32395 4.89118 8.66896 4.875 8 4.875C7.33104 4.875 6.67605 4.89118 6.04101 4.92219C6.19978 4.12856 6.41594 3.42562 6.67032 2.84417C6.94578 2.21456 7.2415 1.78353 7.50647 1.52737C7.50984 1.52411 7.51319 1.52089 7.51653 1.51771C7.67615 1.50597 7.83738 1.5 8 1.5C8.16262 1.5 8.32384 1.50597 8.48347 1.51771ZM5.73202 1.90663C4.0949 2.51622 2.76975 3.7667 2.06159 5.35306C2.88085 5.20593 3.78617 5.08891 4.75309 5.00748C4.96639 3.79953 5.30497 2.73788 5.73202 1.90663ZM4.58133 6.27753C3.48633 6.37904 2.48837 6.52755 1.62761 6.71194C1.54392 7.12828 1.5 7.55901 1.5 8C1.5 8.44099 1.54392 8.87172 1.62761 9.28806C2.48837 9.47245 3.48633 9.62096 4.58133 9.72246C4.52807 9.16768 4.5 8.59133 4.5 8C4.5 7.40867 4.52807 6.83232 4.58133 6.27753ZM4.75309 10.9925C3.78617 10.9111 2.88085 10.7941 2.06159 10.6469C2.76975 12.2333 4.0949 13.4838 5.73202 14.0934C5.30497 13.2621 4.96639 12.2005 4.75309 10.9925Z"
            fill="currentColor"
          ></path>
        </svg>
      </span>
    </button>
  );
}

export function SubtleSkeuomorphic4() {
  return (
    <button className="group h-8 select-none rounded-lg bg-red-600 px-3 text-sm text-zinc-50 leading-8 shadow-[0_-1px_0_1px_#7f1d1d_inset,0_0_0_1px_#b91c1c_inset,0_0.5px_0_1.5px_#f87171_inset] hover:bg-red-700 active:bg-red-800 active:shadow-[-1px_0px_1px_0px_rgba(0,0,0,.2)_inset,1px_0px_1px_0px_rgba(0,0,0,.2)_inset,0px_0.125rem_0px_0px_rgba(0,0,0,.6)_inset]">
      <span className="block group-active:[transform:translate3d(0,1px,0)]">
        Click me
      </span>
    </button>
  );
}

export function SubtleSkeuomorphic5() {
  return (
    <button className="group h-8 select-none rounded-lg bg-blue-600 px-3 text-sm text-zinc-50 leading-8 shadow-[0_-1px_0_1px_#1e3a8a_inset,0_0_0_1px_#1d4ed8_inset,0_0.5px_0_1.5px_#60a5fa_inset] hover:bg-blue-700 active:bg-blue-800 active:shadow-[-1px_0px_1px_0px_rgba(0,0,0,.2)_inset,1px_0px_1px_0px_rgba(0,0,0,.2)_inset,0px_0.125rem_0px_0px_rgba(0,0,0,.6)_inset]">
      <span className="block group-active:[transform:translate3d(0,1px,0)]">
        Click me
      </span>
    </button>
  );
}

export function White1() {
  return (
    <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 font-medium">
      <div className="inline-flex h-12 translate-y-0 items-center justify-center bg-white px-6 text-neutral-950 transition group-hover:translate-y-[150%]">
        Hover me
      </div>
      <div className="absolute inline-flex h-12 w-full translate-y-full items-center justify-center bg-teal-500 px-6 text-neutral-50 transition duration-300 group-hover:translate-y-0">
        Hover me
      </div>
    </button>
  );
}

export function White2() {
  return (
    <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 font-medium">
      <div className="inline-flex h-12 translate-x-0 items-center justify-center bg-white px-6 text-neutral-950 transition group-hover:translate-x-[150%]">
        Hover me
      </div>
      <div className="absolute inline-flex h-12 w-full translate-x-full items-center justify-center bg-teal-500 px-6 text-neutral-50 transition duration-300 group-hover:translate-x-0">
        Hover me
      </div>
    </button>
  );
}

export function White3() {
  return (
    <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-white font-medium">
      <div className="inline-flex h-12 translate-y-0 items-center justify-center px-6 text-neutral-950 transition duration-500 group-hover:translate-y-[150%]">
        Hover me
      </div>
      <div className="absolute inline-flex h-12 w-full translate-y-full items-center justify-center text-neutral-50 transition duration-500 group-hover:translate-y-0">
        <span className="absolute size-full translate-y-full skew-y-12 scale-y-0 bg-teal-500 transition duration-500 group-hover:translate-y-0 group-hover:scale-150"></span>
        <span className="z-10">Hover me</span>
      </div>
    </button>
  );
}

export const BUTTONS = [
  ClerkButton,
  Neumorphism,
  SubtleSkeuomorphic1,
  SubtleSkeuomorphic2,
  SubtleSkeuomorphic3,
  SubtleSkeuomorphic4,
  SubtleSkeuomorphic5,
  BlackIcon11,
  BlackSm1,
  BlackSm2,
  // White1,
  // White2,
  White3,
  // Shadow1,
  // Shadow2,
  Shadow3,
  Shadow4,
  Shadow5,
  Letters1,
  Letters2,
  // Letters3,
  Letters4,
  // Outline1,
  // Outline2,
  // Outline3,
  // Outline4,
  SquareOutline1,
  Link1,
  Link2,
  Link3,
  Link4,
  Link5,
  Link6,
  Link7,
  Link8,

  // GreySm1,
  Black1,
  Black2,
  // Black3,
  // Black4,
  Black5,
  Black6,
  Black7,
  Black8,
  Black9,
  Black10,
  Black11,
  Black12,
  Black13,
  Black14,
  // BlackLoading1,
  BlackIcon1,
  BlackIcon2,
  BlackIcon3,
  BlackIcon4,
  BlackIcon5,
  BlackIcon6,
  BlackIcon7,
  BlackIcon8,
  // BlackIcon9,
  BlackIcon10,

  BlackSmLoading1,
  // BlackRound1,
  // BlackRound2,
  // BlackRound3,
  // BlackRound4,
  // BlackSquare1,
  // TealLoading1,
  // Teal1,
  // Teal2,
  // Teal3,
  // Teal4,
];

interface ButtonsComponentProps {
  wrapper?: React.ComponentType<{ children: React.ReactNode }>;
}

const ButtonsComponent: React.FC<ButtonsComponentProps> = ({
  wrapper: Wrapper,
}) => {
  return (
    <>
      {BUTTONS.map((Button, index) =>
        Wrapper ? (
          <Wrapper key={index}>
            <Button />
          </Wrapper>
        ) : (
          <Button key={index} />
        ),
      )}
    </>
  );
};

export default ButtonsComponent;
