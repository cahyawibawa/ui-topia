"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { useInterval } from "usehooks-ts";

export default function TransactionButton() {
  return (
    <main className="flex size-full flex-col items-center justify-center overflow-y-auto p-4 md:p-8">
      <div className="flex w-full max-w-md items-center justify-center">
        <Button />
      </div>
    </main>
  );
}

function Button() {
  const [counter, setCounter] = useState(0);

  const state = useMemo<"success" | "error" | "pending">(
    () =>
      counter === 0
        ? "pending"
        : counter === 1
          ? "error"
          : counter === 2
            ? "pending"
            : "success",
    [counter],
  );

  useInterval(() => {
    setCounter((c) => (c + 1) % 4);
  }, 1600);

  return (
    <motion.button
      style={{
        color:
          state === "pending"
            ? "#4DAFFF"
            : state === "success"
              ? "#34C759"
              : state === "error"
                ? "#FF3F3F"
                : "",
        background:
          state === "pending"
            ? "rgb(77, 175, 255, 0.1)"
            : state === "success"
              ? "rgb(52, 199, 89, 0.15)"
              : state === "error"
                ? "rgb(255, 63, 63, 0.1)"
                : "",
        transformOrigin: "30% center",
      }}
      transition={{
        type: "spring",
        bounce: 0.3,
        duration: 0.6,
      }}
      layout="position"
      className="flex h-14 cursor-default items-center gap-2.5 overflow-hidden rounded-full px-6 font-semibold text-base tracking-[-0.4px]"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={state}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.4,
          }}
          className="block size-6 shrink-0"
        >
          {ICON[state]}
        </motion.span>
      </AnimatePresence>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={state}
          initial={{ x: (state === "pending" ? -1 : 1) * 48, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{
            x: (state === "pending" ? -1 : 1) * 48,
            opacity: 0,
          }}
          transition={{
            type: "spring",
            bounce: 0.3,
            duration: 0.6,
          }}
          className="line-clamp-1"
        >
          {LABEL[state]}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

function LoaderIcon(props: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      fill="currentColor"
    >
      <path
        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        opacity=".3"
      />
      <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="0.3s"
          values="0 12 12;360 12 12"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}

function SolidWarningIcon(props: { className: string }) {
  return (
    <motion.svg
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      style={{ scale: 1.15 }}
      animate={{ x: [0, -4, 4, -4, 0] }}
      transition={{ duration: 0.15, delay: 0.5 }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.74593 19.7973C3.65032 18.9993 4.18696 18.0236 5.26023 16.0722L9.49513 8.37237C10.6379 6.29468 11.2092 5.25584 11.9642 4.91216C12.6223 4.61261 13.3777 4.61261 14.0358 4.91216C14.7908 5.25584 15.3621 6.29468 16.5049 8.37237L20.7398 16.0722C21.813 18.0236 22.3497 18.9993 22.2541 19.7973C22.1706 20.4936 21.7986 21.1228 21.2287 21.5315C20.5755 21.9999 19.462 21.9999 17.2349 21.9999H8.76509H8.76506C6.538 21.9999 5.42447 21.9999 4.77134 21.5315C4.20142 21.1228 3.82936 20.4936 3.74593 19.7973ZM13.0002 10.4999C13.5525 10.4999 14.0002 10.9476 14.0002 11.4999V14.4999C14.0002 15.0522 13.5525 15.4999 13.0002 15.4999C12.4479 15.4999 12.0002 15.0522 12.0002 14.4999V11.4999C12.0002 10.9476 12.4479 10.4999 13.0002 10.4999ZM12.0205 17.7993C12.1313 17.2582 12.6598 16.9094 13.2008 17.0202L13.2057 17.0212C13.7468 17.1321 14.0955 17.6605 13.9847 18.2016C13.8739 18.7426 13.3455 19.0914 12.8044 18.9806L12.7996 18.9796C12.2585 18.8688 11.9097 18.3403 12.0205 17.7993Z"
        fill="currentColor"
      />
    </motion.svg>
  );
}

function SolidCheckIcon(props: { className: string }) {
  return (
    <svg
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <g clipPath="url(#clip0_114_308)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.75 13C1.75 19.2129 6.78656 24.2494 12.9995 24.2494C19.2124 24.2494 24.249 19.2129 24.249 13C24.249 6.78705 19.2124 1.75049 12.9995 1.75049C6.78656 1.75049 1.75 6.78705 1.75 13ZM18.3724 11.1447C18.8666 10.6626 18.8763 9.87119 18.3942 9.37705C17.9121 8.88291 17.1207 8.87316 16.6266 9.35526L11.384 14.4702L9.40624 12.386C8.93103 11.8852 8.13984 11.8645 7.63907 12.3397C7.1383 12.8149 7.11758 13.6061 7.59279 14.1069L10.443 17.1104C10.6733 17.3531 10.9912 17.4933 11.3256 17.4997C11.6601 17.5062 11.9832 17.3783 12.2226 17.1447L18.3724 11.1447Z"
          fill="currentColor"
        />
        <path
          d="M12.9995 24.2494C6.78656 24.2494 1.75 19.2129 1.75 13C1.75 6.78705 6.78656 1.75049 12.9995 1.75049C19.2124 1.75049 24.249 6.78705 24.249 13C24.249 19.2129 19.2124 24.2494 12.9995 24.2494Z"
          stroke="currentColor"
          strokeWidth="2"
        />
      </g>
      <defs>
        <clipPath id="clip0_114_308">
          <rect width="26" height="26" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

const ICON = {
  pending: <LoaderIcon className="size-full" />,
  success: <SolidCheckIcon className="size-full" />,
  error: <SolidWarningIcon className="size-full" />,
};

const LABEL = {
  pending: "Analyzing Transaction",
  success: "Transaction Safe",
  error: "Transaction Warning",
};
