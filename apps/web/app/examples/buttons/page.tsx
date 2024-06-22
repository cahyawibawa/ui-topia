import { ButtonWrapper } from '@/components/btn-wrapper'
import { registry } from '@ui/topia'
import { type Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Buttons',
  description: 'Check out some buttons.',
}

const ButtonsComponent = registry.buttons.component

export default function ButtonsPage() {
  if (!ButtonsComponent) {
    return <div>Button component not found</div>
  }

  return (
    <section className="mx-auto">
      <div className="grid gap-6 p-10 pb-6 md:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<div>Loading buttons...</div>}>
          <ButtonsComponent wrapper={ButtonWrapper} />
        </Suspense>
      </div>
    </section>
  )
}
