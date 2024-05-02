import { CodeIcon, ExternalLinkIcon } from '@radix-ui/react-icons'
import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { work } from '../../../data/playground'

export const metadata: Metadata = {
  title: 'Playground',
  description: 'Check out some playground built using the components.',
}
export default function PlaygroundPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto flex flex-col gap-8 py-8">
        {work.map((item) => (
          <div
            key={item.url}
            className="flex flex-col gap-2 bg-white/50 p-4 md:rounded-[14px]"
          >
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">{item.label}</div>
              <div className="flex items-center gap-4">
                <a
                  className="flex items-center gap-1 rounded-md bg-black/5 px-2 py-1 text-sm opacity-75"
                  href={`https://github.com/cahyawibawa/ui-topia/tree/main/app${item.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Code <CodeIcon className="size-5" />
                </a>
                <Link
                  href={item.url}
                  className="flex items-center gap-1 rounded-md bg-black/5 px-2 py-1 text-sm opacity-75"
                >
                  Preview <ExternalLinkIcon className="size-4" />
                </Link>
              </div>
            </div>
            <div className="text-sm">
              Design:{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={item.designer.url}
                className="font-semibold underline"
              >
                {item.designer.label}
              </a>
            </div>
            <div className="flex flex-col gap-2">
              {item.images.map((image) => {
                return (
                  <div
                    key={image.src}
                    className="overflow-hidden rounded-[10px] border"
                  >
                    <Image alt={item.label} src={image} />
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
