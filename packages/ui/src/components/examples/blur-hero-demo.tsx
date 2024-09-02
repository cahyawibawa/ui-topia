import { motion } from "framer-motion";

export default function BlurHeroDemo() {
  return (
    <main className="flex size-full flex-col items-center justify-center p-6 md:p-112">
      <div className="max-w-screen-md">
        <Headline text="Build modern websites with ui/topia" />
        <motion.p
          className="mt-6 text-balance text-[21px] text-muted-foreground leading-[28px]"
          initial={{ filter: "blur(12px)", opacity: 0, y: 24 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            bounce: 0,
            duration: 1.8,
            delay: 1,
          }}
        >
          Collection of fine-tuned UI components ready for instant use.
          <br />
          Browse, copy, paste, and elevate your project effortlessly.
        </motion.p>
        <motion.button
          className="mt-12 h-[40px] rounded-[10px] bg-primary px-4 font-medium text-[15px] text-primary-foreground leading-none"
          initial={{ filter: "blur(12x)", opacity: 0, y: 16 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            bounce: 0,
            duration: 1.4,
            delay: 1.2,
          }}
        >
          Start building
        </motion.button>
      </div>
    </main>
  );
}

function Headline(props: { text: string }) {
  return (
    <p className="text-balance text-[56px] text-foreground leading-[61px]">
      {props.text.split(" ").map((word, index) => (
        <motion.span
          className="inline-block"
          key={word}
          initial={{ opacity: 0, filter: "blur(16px)", y: 8 + 1 * (index + 2) }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            delay: 0.04 * (index + 12),
            type: "spring",
            bounce: 0,
            duration: 0.7 + 0.1 * (index + 4),
          }}
        >
          {word}&#160;
        </motion.span>
      ))}
    </p>
  );
}
