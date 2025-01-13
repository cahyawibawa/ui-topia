import { Input } from "@/components/input";

export default function InputDemo() {
  return (
    <div className="group relative">
      <label
        htmlFor="input-05"
        className="-translate-y-1/2 absolute top-1/2 block origin-start cursor-text px-1 text-muted-foreground/70 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:font-medium group-focus-within:text-foreground group-focus-within:text-xs has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground has-[+input:not(:placeholder-shown)]:text-xs"
      >
        <span className="inline-flex bg-background px-2">
          Input with label animation
        </span>
      </label>
      <Input id="input-05" type="email" placeholder="" />
    </div>
  );
}
