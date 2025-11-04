import { Button } from "@/registry/ui/button";
import {
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/registry/ui/sheet";

export default function DialogDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>
          Open Right
        </SheetTrigger>
        <SheetPopup showCloseButton={false}>
          <SheetHeader>
            <SheetTitle>Right</SheetTitle>
            <SheetDescription>Right side of the screen.</SheetDescription>
          </SheetHeader>
        </SheetPopup>
      </Sheet>
      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>
          Open Left
        </SheetTrigger>
        <SheetPopup side="left" showCloseButton={false}>
          <SheetHeader>
            <SheetTitle>Left</SheetTitle>
            <SheetDescription>Left side of the screen.</SheetDescription>
          </SheetHeader>
        </SheetPopup>
      </Sheet>
      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>
          Open Top
        </SheetTrigger>
        <SheetPopup side="top" showCloseButton={false}>
          <SheetHeader>
            <SheetTitle>Top</SheetTitle>
            <SheetDescription>Top of the screen.</SheetDescription>
          </SheetHeader>
        </SheetPopup>
      </Sheet>
      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>
          Open Bottom
        </SheetTrigger>
        <SheetPopup side="bottom" showCloseButton={false}>
          <SheetHeader>
            <SheetTitle>Bottom</SheetTitle>
            <SheetDescription>Bottom of the screen.</SheetDescription>
          </SheetHeader>
        </SheetPopup>
      </Sheet>
    </div>
  );
}
