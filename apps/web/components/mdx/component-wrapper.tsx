import { cn } from "@/lib/utils";

interface ComponentWrapperProps {
  className?: string;
  children: any;
}
const ComponentWrapper = ({ className, children }: ComponentWrapperProps) => {
  return (
    <div
      className={cn(
        "not-prose relative flex max-w-screen flex-col items-center justify-center overflow-hidden rounded-md border p-0 md:p-16",
        className,
      )}
    >
      {/* <div
        className={cn(
          `absolute inset-0 h-full w-full`,
          `bg-[radial-gradient(#00000055_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff22_1px,transparent_1px)]`,
          'lab-bg [background-size:16px_16px]'
        )}
      /> */}
      {children}
    </div>
  );
};

export default ComponentWrapper;
