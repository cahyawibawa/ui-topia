import { ReactNode } from 'react'

export function Button(props: { className?: string; children: ReactNode }) {
  return (
    <button
      className={`flex items-center justify-center rounded-full border-2 border-[#161616] p-2 text-[#9C9BA1] hover:bg-[#161616] hover:text-white ${
        props.className || ''
      }`.trim()}
    >
      {props.children}
    </button>
  )
}
