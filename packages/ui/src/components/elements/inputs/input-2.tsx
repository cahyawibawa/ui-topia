import { Input } from "@/components/input";
import { Label } from "@/components/label";

export default function InputDemo() {
  return (
    <div className="space-y-2">
      <Label htmlFor="input-02">Input with start inline add-on</Label>
      <div className="relative">
        <Input
          id="input-02"
          className="peer ps-16"
          placeholder="google.com"
          type="text"
        />
        <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground text-sm peer-disabled:opacity-50">
          https://
        </span>
      </div>
    </div>
  );
}
