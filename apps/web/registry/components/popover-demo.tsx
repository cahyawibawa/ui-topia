import { Button } from "@/registry/ui/button";
import { Field } from "@/registry/ui/field";
import { Form } from "@/registry/ui/form";
import {
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/ui/popover";
import { Textarea } from "@/registry/ui/textarea";

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open Popover
      </PopoverTrigger>
      <PopoverPopup className="w-80">
        <div className="mb-4">
          <PopoverTitle className="text-base">Send us feedback</PopoverTitle>
          <PopoverDescription>
            Let us know how we can improve.
          </PopoverDescription>
        </div>
        <Form>
          <Field>
            <Textarea
              id="feedback"
              placeholder="How can we improve?"
              aria-label="Send feedback"
            />
          </Field>
          <Button type="submit">Send feedback</Button>
        </Form>
      </PopoverPopup>
    </Popover>
  );
}
