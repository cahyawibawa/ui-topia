import { Button } from "@/components/shadcn-ui/button";
import {
  RiFacebookFill,
  RiGithubFill,
  RiGoogleFill,
  RiTwitterXFill,
} from "@remixicon/react";

export default function ButtonDemo() {
  return (
    <div className="flex flex-col gap-2">
      <Button variant="outline">
        <RiGoogleFill
          className="me-3 text-[#DB4437] dark:text-white/60"
          size={16}
          aria-hidden="true"
        />
        Login with Google
      </Button>
      <Button variant="outline">
        <RiGithubFill
          className="me-3 text-[#333333] dark:text-white/60"
          size={16}
          aria-hidden="true"
        />
        Login with GitHub
      </Button>
    </div>
  );
}
