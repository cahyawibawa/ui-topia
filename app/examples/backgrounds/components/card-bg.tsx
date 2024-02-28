'use client'

import { Icons } from '@/components/icons'
import React, { useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import { toast } from 'sonner'

type CardBgProps = {
  children: React.ReactElement
  setPreview: (preview: React.ReactNode) => void
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

const CardBg: React.FC<CardBgProps> = ({
  children,
  setPreview,
  theme,
  setTheme,
}) => {
  const [isCopied, setIsCopied] = useState(false)

  const copyCode = () => {
    const code = ReactDOMServer.renderToString(children)

    void navigator.clipboard.writeText(code)
    toast.success('Copied to clipboard')
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  return (
    <div className="relative min-h-[300px] w-full overflow-hidden rounded-md border">
      <div className="absolute right-3 top-3 z-10 cursor-pointer p-2">
        <div className="flex space-x-4">
          <div
            onClick={() => {
              setPreview(children)
              setTheme(theme)
            }}
          >
            <Icons.preview className="size-4 text-neutral-600" />
          </div>
          <div onClick={copyCode}>
            {isCopied ? (
              <Icons.check className="size-4 text-neutral-600" />
            ) : (
              <Icons.copy className="size-4 text-neutral-600" />
            )}
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

export default CardBg
