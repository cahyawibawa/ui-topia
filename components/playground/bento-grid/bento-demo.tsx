import { Calendar } from '@/components/ui/calendar'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'
import {
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from '@radix-ui/react-icons'
import { BentoCard, BentoGrid } from './_components/bento-grid'
import Globe from './_components/globe'
import Marquee from './_components/marquee'

const files = [
  {
    name: 'bitcoin.pdf',
    body: 'Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.',
  },
  {
    name: 'finances.xlsx',
    body: 'A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.',
  },
  {
    name: 'logo.svg',
    body: 'Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.',
  },
  {
    name: 'keys.gpg',
    body: 'GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.',
  },
  {
    name: 'seed.txt',
    body: 'A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.',
  },
]

const features = [
  {
    Icon: FileTextIcon,
    name: 'Marquee  ',
    description:
      'An infinite scrolling component that can be used to display text, images, or videos.',
    href: 'https://magicui.design/docs/components/marquee',
    cta: 'Learn more',
    className: 'col-span-3 lg:col-span-1',
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
  },
  {
    Icon: InputIcon,
    name: 'cmdk',
    description: 'Fast, composable, unstyled command menu for React',
    href: 'https://cmdk.paco.me/',
    cta: 'Learn more',
    className: 'col-span-3 lg:col-span-2',
    background: (
      <Command className="absolute right-10 top-10 w-[70%] origin-top translate-x-0 border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:-translate-x-10">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>cahyawibawa.dev</CommandItem>
            <CommandItem>uitopia.xyz</CommandItem>
            <CommandItem>finances.xlsx</CommandItem>
            <CommandItem>logo.svg</CommandItem>
            <CommandItem>keys.gpg</CommandItem>
            <CommandItem>seed.txt</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    ),
  },
  {
    Icon: GlobeIcon,
    name: 'COBE',
    description: 'A lightweight (5kB) WebGL globe lib.',
    href: 'https://www.npmjs.com/package/cobe',
    cta: 'Learn more',
    className: 'col-span-3 lg:col-span-2',
    background: (
      <Globe className="top-0 size-[600px] transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_30%,#000_100%)] group-hover:scale-105 sm:left-40" />
    ),
  },
  {
    Icon: CalendarIcon,
    name: 'Calendar',
    description: 'The Calendar component is built on top of React DayPicker.',
    className: 'col-span-3 lg:col-span-1',
    href: 'https://ui.shadcn.com/docs/components/calendar',
    cta: 'Learn more',
    background: (
      <Calendar
        mode="single"
        selected={new Date(2022, 4, 11, 0, 0, 0)}
        className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
      />
    ),
  },
]

export function BentoDemo() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  )
}

// <Marquee
//   pauseOnHover
//   className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
// >
//   {files.map((f, idx) => (
//     <figure
//       key={idx}
//       className={cn(
//         'relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4',
//         'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
//         'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]',
//         'transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none'
//       )}
//     >
//       <div className="flex flex-row items-center gap-2">
//         <div className="flex flex-col">
//           <figcaption className="text-sm font-medium dark:text-white ">
//             {f.name}
//           </figcaption>
//         </div>
//       </div>
//       <blockquote className="mt-2 text-xs">{f.body}</blockquote>
//     </figure>
//   ))}
// </Marquee>
