import { CardComponent } from '@/components/card-btn'
import { BUTTONS } from '@/data/buttons'
import React from 'react'

export default function ButtonsPage() {
  return (
    <section className="mx-auto">
      <div className="grid grid-cols-1 gap-6 p-10 pb-6 md:grid-cols-2 lg:grid-cols-4">
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
