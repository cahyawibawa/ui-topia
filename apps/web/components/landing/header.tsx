export const Header = () => {
  return (
    <header className="header">
      <div className="flex flex-row gap-4">
        <div
          className="header-card relative max-w-xs border-2 border-blue-400 p-2 sm:p-4"
          style={{ transform: "rotate(2deg)" }}
        >
          {/* Corner SVGs */}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="-top-1.5 -left-1.5 absolute"
          >
            <rect
              x="0.6"
              y="0.6"
              width="10.8"
              height="10.8"
              fill="white"
              stroke="#0C8CE8"
              strokeWidth="1.2"
            ></rect>
          </svg>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="-top-1.5 -right-1.5 absolute"
          >
            <rect
              x="0.6"
              y="0.6"
              width="10.8"
              height="10.8"
              fill="white"
              stroke="#0C8CE8"
              strokeWidth="1.2"
            ></rect>
          </svg>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="-bottom-1.5 -left-1.5 absolute"
          >
            <rect
              x="0.6"
              y="0.6"
              width="10.8"
              height="10.8"
              fill="white"
              stroke="#0C8CE8"
              strokeWidth="1.2"
            ></rect>
          </svg>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="-bottom-1.5 -right-1.5 absolute"
          >
            <rect
              x="0.6"
              y="0.6"
              width="10.8"
              height="10.8"
              fill="white"
              stroke="#0C8CE8"
              strokeWidth="1.2"
            ></rect>
          </svg>

          <div className="flex flex-col gap-2">
            <a
              href="/"
              className="font-redaction font-semibold text-lg leading-none tracking-wider no-underline"
            >
              uitopia
            </a>
          </div>
          <p className="mt-2 font-sans text-sm">
            Small laboratory for experimental blocks and distinctive components.
          </p>
          <div className="mt-4 flex flex-row gap-2">
            <a
              href="/docs/ui"
              className="customButton button-shadow button-link relative inline-flex h-7 w-fit items-center justify-center whitespace-nowrap rounded-full px-3 py-1 font-medium text-[13px] text-white no-underline transition-colors hover:bg-foreground/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Docs
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 opacity-50 transition-transform duration-200 group-hover:translate-x-1"
              >
                <path
                  d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              className="group button-link relative inline-flex h-7 w-fit items-center justify-center whitespace-nowrap rounded-full bg-transparent px-3 py-1 font-medium text-[13px] text-foreground/80 no-underline shadow-none transition-colors hover:bg-transparent hover:text-foreground/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              href="/blocks"
            >
              Blocks
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 opacity-50 transition-transform duration-200 group-hover:translate-x-1"
              >
                <path
                  d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
