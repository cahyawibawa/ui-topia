import { ExamplesNav } from '@/components/examples-nav'
import { SiteFooter } from '@/components/site-footer'
import { HeroHomepage } from '@/components/static-hero'
import ButtonsPage from '../examples/buttons/page'

export default function Home() {
  return (
    <div className="container relative">
      <HeroHomepage />
      <ExamplesNav className="[&>a:first-child]:text-primary" />
      <div className="overflow-hidden rounded-[0.5rem] border shadow-md md:shadow-xl">
        <ButtonsPage />
      </div>
      <SiteFooter />
    </div>
  )
}
