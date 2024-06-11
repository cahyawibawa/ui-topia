import { CardComponent } from '@/app/examples/buttons/_components/card-btn'
import { BUTTONS } from '@ui/topia'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buttons',
  description: 'Check out some buttons.',
}
export default function ButtonsPage() {
  return (
    <section className="mx-auto">
      <div className="grid gap-6 p-10 pb-6 md:grid-cols-2 lg:grid-cols-4">
        {BUTTONS?.map((Comp) => {
          return (
            <CardComponent key={Comp.name}>
              <Comp />
            </CardComponent>
          )
        })}
      </div>
    </section>
  )
}
