import { Label } from "@/registry/ui/label";
import { Slider, SliderValue } from "@/registry/ui/slider";

export default function SliderWithLabelValue() {
  return (
    <Slider defaultValue={50}>
      <div className="mb-2 flex items-center justify-between gap-1">
        <Label className="font-medium text-sm">Opacity</Label>
        <SliderValue />
      </div>
    </Slider>
  );
}
