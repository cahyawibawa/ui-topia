"use client";

import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { useHero } from "@/hooks/use-hero-selection";
import { CarouselProgressBar } from "./carousel-hero";
import { HeroHomepage } from "./static-hero";

export function HeroCheckbox() {
  const { isChecked, toggleCheckbox } = useHero();
  return (
    <DropdownMenuCheckboxItem
      checked={isChecked}
      onCheckedChange={toggleCheckbox}
      className="cursor-pointer"
    >
      Static Hero
    </DropdownMenuCheckboxItem>
  );
}

export function SwitcherHero() {
  const { isChecked } = useHero();

  return <>{isChecked ? <HeroHomepage /> : <CarouselProgressBar />}</>;
}
