import { useRef } from "react";

import CSSBox, { type CSSBoxRef } from "./css-box";

export default function CSSBoxDemo() {
  const boxRef = useRef<CSSBoxRef>(null);

  // Example text face component
  const TextFace = ({
    texts,
    className,
  }: {
    texts: string[];
    className?: string;
  }) => (
    <div className={`flex flex-col ${className || ""}`}>
      {texts.map((text, i) => (
        <div key={i} className="font-bold text-[#0015ff] tracking-wider">
          {text}
        </div>
      ))}
    </div>
  );

  return (
    <CSSBox
      ref={boxRef}
      width={200}
      height={200}
      depth={200}
      perspective={600}
      stiffness={100}
      damping={30}
      faces={{
        front: (
          <TextFace
            texts={["YOU CAN", "JUST", "DO THINGS"]}
            className="h-full w-full select-none items-end justify-end p-2 text-right"
          />
        ),
        back: (
          <TextFace
            texts={["MAKE THINGS", "YOU WISH", "EXISTED"]}
            className="h-full w-full select-none justify-end p-2 text-left"
          />
        ),
        right: (
          <TextFace
            texts={["MAKE THINGS", "YOU WISH", "EXISTED"]}
            className="h-full w-full select-none justify-end p-2 text-left"
          />
        ),
        left: (
          <TextFace
            texts={["BREAK", "THINGS", "MOVE", "FAST"]}
            className="h-full w-full select-none items-end p-2"
          />
        ),
        top: (
          <TextFace
            texts={["YOU CAN", "JUST", "DO THINGS"]}
            className="h-full w-full select-none items-end justify-end p-2 text-right"
          />
        ),
        bottom: (
          <TextFace
            texts={["BREAK", "THINGS", "MOVE", "FAST"]}
            className="h-full w-full select-none items-end p-2"
          />
        ),
      }}
      className="text-3xl"
    />
  );
}
