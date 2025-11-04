import { Button } from "@/registry/ui/button";
import { Field, FieldControl, FieldLabel } from "@/registry/ui/field";
import { Form } from "@/registry/ui/form";
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/registry/ui/sheet";

export default function DialogDemo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Open Sheet
      </SheetTrigger>
      <SheetPopup>
        <Form>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4 px-4">
            <Field>
              <FieldLabel>Name</FieldLabel>
              <FieldControl type="text" defaultValue="Margaret Welsh" />
            </Field>
            <Field>
              <FieldLabel>Username</FieldLabel>
              <FieldControl type="text" defaultValue="@maggie.welsh" />
            </Field>
          </div>
          <SheetFooter>
            <SheetClose render={<Button variant="ghost" />}>Cancel</SheetClose>
            <Button type="submit">Save</Button>
          </SheetFooter>
        </Form>
      </SheetPopup>
    </Sheet>
  );
}
