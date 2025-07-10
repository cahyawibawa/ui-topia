import { ArrowRight, Blocks } from "lucide-react";
import Link from "next/link";

export function Announcement() {
  return (
    <Link
      className="group mb-2 inline-flex items-center gap-2 px-0.5 font-medium text-sm"
      href="/blocks"
    >
      <Blocks className="mr-1 size-3.5" />
      <span className="underline-offset-4 group-hover:underline">
        New blocks components
      </span>
      <ArrowRight className="ml-1 size-3.5" />
    </Link>
  );
}
