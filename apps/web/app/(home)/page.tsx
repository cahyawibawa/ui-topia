import { ExamplesNav } from '@/components/examples-nav'
import { Shell } from '@/components/shell'

import { HeroHomepage } from '@/components/static-hero'
import ButtonsPage from '../examples/buttons/page'

export default function Home() {
  return (
    <Shell>
      <HeroHomepage />
      <ExamplesNav className="[&>a:first-child]:text-primary" />
      <div className="overflow-hidden rounded-[0.5rem] border shadow-md md:shadow-xl">
        <ButtonsPage />
      </div>
    </Shell>
  )
}
