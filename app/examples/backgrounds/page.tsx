'use client'

import React, { useState } from 'react'
import { BACKGROUND_OPTIONS } from './components/background'
import CardBg from './components/card-bg'

export default function BackgroundPage() {
  const [preview, setPreview] = useState<null | React.ReactNode>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // const resetBg = () => {
  //   setPreview(null);
  //   setTheme('light');
  // };
  return (
    <section className="mx-auto">
      <div className={`${theme}`}>
        <div className="fixed left-0 top-0 -z-10 size-full">
          {preview ? preview : null}
        </div>
        <div className="grid grid-cols-1 gap-6 p-10 pb-6 md:grid-cols-2 lg:grid-cols-4">
          {BACKGROUND_OPTIONS.map((background, index) => {
            return (
              <CardBg
                key={index}
                setPreview={setPreview}
                theme={background.theme}
                setTheme={setTheme}
              >
                {background.component}
              </CardBg>
            )
          })}
        </div>
      </div>
    </section>
  )
}
