'use client'

import { DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu'
import { useHero } from '@/hooks/use-hero-selection'
import { CarouselProgressBar } from './carousel-hero'
import { HeroHomepage } from './static-hero'

export function HeroCheckbox() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const { isChecked, toggleCheckbox } = useHero()
  return (
    <DropdownMenuCheckboxItem
      checked={isChecked}
      onCheckedChange={toggleCheckbox}
      className="cursor-pointer"
    >
      Static Hero
    </DropdownMenuCheckboxItem>
  )
}

export function SwitcherHero() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const { isChecked } = useHero()

  return <>{isChecked ? <HeroHomepage /> : <CarouselProgressBar />}</>
}
