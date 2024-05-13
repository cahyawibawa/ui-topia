import { Accordion, Accordions } from 'fumadocs-ui/components/accordion'
import { type ReactNode } from 'react'
// import ConnectModal from '../playground/connect-modal'
// import RippleCard from '../playground/ripple-card'
import { Wrapper } from './wrapper'

export default {
  // rippleCard: (
  //   <Wrapper className="flex h-[40rem] w-full items-center justify-center">
  //     <RippleCard />
  //   </Wrapper>
  // ),
  // connectModal: (
  //   <Wrapper className="flex h-[40rem] w-full items-center justify-center">
  //     <ConnectModal />
  //   </Wrapper>
  // ),

  accordion: (
    <Wrapper>
      <Accordions type="single" collapsible>
        <Accordion id="what-is-fumadocs" title="What is Fumadocs?">
          A framework for building documentations
        </Accordion>
        <Accordion id="ux" title="What do we love?">
          We love websites with a good user experience
        </Accordion>
      </Accordions>
    </Wrapper>
  ),
} as Record<string, ReactNode>
