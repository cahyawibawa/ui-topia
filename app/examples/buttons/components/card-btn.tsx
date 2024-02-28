'use client'

import { Icons } from '@/components/icons'
import { useState } from 'react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import { toast } from 'sonner'

type CardComponentProps = {
  children: React.ReactNode
}

export const CardComponent: React.FC<CardComponentProps> = ({ children }) => {
  const [isCopied, setIsCopied] = useState(false)

  const getCode = () => {
    const div = document.createElement('div')
    const root = createRoot(div)
    flushSync(() => {
      root.render(children)
    })

    const code = div.innerHTML
    return code
  }

  const onCopy = () => {
    const code = getCode()
    toast.success('Copied to clipboard!')
    void navigator.clipboard.writeText(code)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  return (
    <div className="relative flex items-center justify-center rounded-md border bg-neutral-50 px-0 py-24 md:px-2">
      <div className="absolute right-3 top-3 cursor-pointer bg-transparent p-2">
        <div onClick={onCopy}>
          {isCopied ? (
            <Icons.check className="size-4 text-neutral-600" />
          ) : (
            <Icons.copy className="size-4 text-neutral-600" />
          )}
        </div>
      </div>
      {children}
    </div>
  )
}
