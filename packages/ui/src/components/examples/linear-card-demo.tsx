'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { CrossIcon, PlusIcon } from '../icons'
import { Button } from '../ui/custom-btn'

interface OfferingProps {
  id: number
  title: string
  description: string
  banner: string
}

const OFFERINGS = [
  {
    id: 1,
    title: 'Designed to move fast',
    description:
      'Linear is built in pursuit of high-performance. With its keyboard-first design, realtime sync, and zero-friction workflows, it delivers a focused experience ideal for fast-paced development environments.',
    banner:
      'https://linear.app/cdn-cgi/imagedelivery/fO02fVwohEs9s9UHFwon6A/0e6d3edd-cd37-4bf8-c1bf-b93960169400/f=auto,dpr=2,q=95,fit=scale-down,metadata=none',
  },
  // add more data here
]

export default function LinearCardDemo() {
  const [selectedOffering, setSelectedOffering] =
    useState<OfferingProps | null>(null)

  return (
    <>
      <main className="size-full overflow-y-auto p-6 md:p-12">
        <ul className="flex size-full flex-wrap items-center justify-center gap-4">
          {OFFERINGS.map((offering) => (
            <Card
              key={offering.id}
              offering={offering}
              onClick={() => setSelectedOffering(offering)}
            />
          ))}
        </ul>
      </main>
      <Modal
        offering={selectedOffering}
        onClick={() => setSelectedOffering(null)}
      />
      <TailwindCDNWorkaround />
    </>
  )
}

function Card(props: { offering: OfferingProps; onClick: () => void }) {
  return (
    <motion.li
      key={props.offering.title}
      className="flex aspect-[336/360] h-[360px] cursor-pointer flex-col justify-end text-balance rounded-[30px] border bg-[#080A0A] px-7 py-8 text-[21px] text-white hover:brightness-125"
      layoutId={`offeringContainer${props.offering.id}`}
      onClick={props.onClick}
    >
      <motion.img
        src={props.offering.banner}
        alt="Banner"
        layoutId={`offeringBanner${props.offering.id}`}
      />
      <div className="flex items-center justify-between">
        <motion.p
          className="text-balance"
          layoutId={`offeringHeading${props.offering.id}`}
        >
          {props.offering.title}
        </motion.p>
        <Button>
          <PlusIcon className="size-4" />
        </Button>
      </div>
      <motion.span layoutId={`offeringDescription${props.offering.id}`} />
    </motion.li>
  )
}

function Modal(props: { offering: OfferingProps | null; onClick: () => void }) {
  return (
    <>
      <AnimatePresence>
        {!!props.offering && (
          <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center"
            initial={{ backdropFilter: 'blur(0px)' }}
            animate={{ backdropFilter: 'blur(32px)' }}
            exit={{ backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!!props.offering && (
          <motion.div
            className="fixed inset-0 z-10 flex flex-col justify-end"
            onClick={props.onClick}
          >
            <motion.div
              className="relative mx-auto h-[96vh] max-w-[960px] overflow-y-auto rounded-t-[30px] border bg-[#090A0B] p-8"
              layoutId={`offeringContainer${props.offering.id}`}
            >
              <motion.img
                src={props.offering.banner}
                alt="Banner"
                className="-mt-8"
                layoutId={`offeringBanner${props.offering.id}`}
              />
              <div className="mx-auto -mt-20 max-w-xl md:-mt-60">
                <motion.p
                  className="text-balance text-[56px] font-medium leading-[60px] text-white"
                  layoutId={`offeringHeading${props.offering.id}`}
                >
                  {props.offering.title}
                </motion.p>
                <motion.p
                  className="mt-8 text-[15px] font-medium text-[#969799]"
                  layoutId={`offeringDescription${props.offering.id}`}
                >
                  {props.offering.description}
                </motion.p>
              </div>
              <Button className="absolute right-8 top-8">
                <CrossIcon className="size-5" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/*
NOTE: Only required to work with Tailwind CDN.
Include all conditionally rendered classes in a hidden div
to ensure Tailwind generates these classes in advance.
*/
function TailwindCDNWorkaround() {
  return (
    <div className="fixed absolute relative inset-0 right-8 top-8 z-10 mx-auto mx-auto -mt-20 -mt-8 mt-8 flex flex hidden size-5 h-[96vh] max-w-[960px] max-w-xl flex-col items-center justify-end justify-center overflow-y-auto text-balance rounded-t-[30px] bg-[#090A0B] p-8 text-[15px] text-[56px] font-medium font-medium leading-[60px] text-[#969799] text-white md:-mt-60" />
  )
}
