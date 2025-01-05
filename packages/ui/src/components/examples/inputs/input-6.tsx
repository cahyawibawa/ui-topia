import { Input } from "@/components/input";

export default function InputDemo() {
  return (
    <div className="group relative">
      <label
        htmlFor="input-06"
        className="-translate-y-1/2 absolute start-1 top-0 z-10 block bg-background px-2 font-medium text-foreground text-xs group-has-[:disabled]:opacity-50"
      >
        Input with overlapping label
      </label>
      <Input id="input-06" className="h-10" placeholder="Email" type="email" />
    </div>
  );
}
