'use client'

import { Icons } from '@/components/icons'
import { useState } from 'react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import { toast } from 'sonner'

type CardComponentProps = {
  children: React.ReactNode
}

export const ButtonWrapper: React.FC<CardComponentProps> = ({ children }) => {
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
    <div className="bg-primary-foreground relative flex items-center justify-center rounded-md border px-0 py-24 md:px-2">
      <div className="absolute right-3 top-3 cursor-pointer bg-transparent p-2">
        <div onClick={onCopy}>
          {isCopied ? (
            <Icons.check className="text-foreground size-4" />
          ) : (
            <Icons.copy className="text-foreground size-4" />
          )}
        </div>
      </div>
      {children}
    </div>
  )
}
