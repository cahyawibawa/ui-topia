import { Button } from "@/registry/ui/button";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@/registry/ui/tooltip";

export default function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>
        Hover me
      </TooltipTrigger>
      <TooltipPopup>Helpful hint</TooltipPopup>
    </Tooltip>
  );
}
