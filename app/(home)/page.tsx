import { ExamplesNav } from '@/components/examples-nav'
import { SwitcherHero } from '@/components/hero/switcher-hero'
import { Shell } from '@/components/shell'
import ButtonsPage from '../examples/buttons/page'

export default function Home() {
  return (
    <Shell>
      <SwitcherHero />
      <ExamplesNav className="[&>a:first-child]:text-primary" />
      <div className="overflow-hidden rounded-[0.5rem] border shadow-md md:shadow-xl">
        <ButtonsPage />
      </div>
    </Shell>
  )
}
