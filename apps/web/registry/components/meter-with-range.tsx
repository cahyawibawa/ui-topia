"use client";

import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@/registry/ui/meter";

export default function MeterWithRangeDemo() {
  return (
    <Meter value={700} min={500} max={1000}>
      <div className="flex items-center justify-between gap-2">
        <MeterLabel>Bandwidth (Mbps)</MeterLabel>
        <MeterValue>{(_formatted, value) => value}</MeterValue>
      </div>
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
    </Meter>
  );
}
