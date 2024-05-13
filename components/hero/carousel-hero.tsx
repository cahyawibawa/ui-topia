/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
'use client'

import { buttonVariants } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import Autoplay from 'embla-carousel-autoplay'
import ClassNames from 'embla-carousel-class-names'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Icons } from '../icons'
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '../page-header'

// import { useMounted } from "@/hooks/use-mounted";

const slides = [
  {
    title: 'Make your website look better, Instantly.',
    imageUrl: '/images/hero-banner-1.webp',
  },

  {
    title: 'Find beautifully UI elements references.',
    imageUrl: '/images/hero-banner-2.webp',
  },
]

const BlockInfos = () => (
  <PageHeader>
    <PageHeaderDescription>
      <span className="hidden md:inline">{siteConfig.blockInfos}</span>
      <span className="inline md:hidden">{siteConfig.blockInfos}</span>
    </PageHeaderDescription>
    <PageActions>
      <Link href="/docs" className={cn(buttonVariants({ variant: 'outline' }))}>
        Get Started
      </Link>
      <Link
        target="_blank"
        rel="noreferrer"
        href={siteConfig.links.github}
        className={cn(buttonVariants())}
      >
        <Icons.gitHub className="mr-2 size-4" />
        GitHub
      </Link>
    </PageActions>
  </PageHeader>
)

const intervalAutoplay: number = 4000

export function CarouselProgressBar() {
  // const mounted = useMounted();
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState<number>(slides.length)
  // FIX: Why slides.length ? The first dot don't show the animation progress bar if its 0. And current is set in useEffect after initial render

  const goToIndex = (index: number) => {
    if (!api) {
      return
    }
    setCurrent(index)
    api?.scrollTo(index, true)
  }

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  // if (!mounted)
  //   return (
  //     <div className="h-[420px] w-full overflow-hidden border-b-2 md:h-[480px]" />
  //   );

  return (
    <section className="mb-8 h-[420px] w-full overflow-hidden border-b border-muted md:h-[580px]">
      <Carousel
        className="relative h-full"
        opts={{
          loop: false,
          inViewThreshold: 1,
          dragFree: false,
          skipSnaps: true,
        }}
        plugins={[
          Autoplay({
            delay: intervalAutoplay,
            stopOnInteraction: false,
          }),
          ClassNames(),
        ]}
        setApi={setApi}
      >
        <CarouselContent
          className={cn('fade__container', !!api ? 'fade__is-ready' : '')}
        >
          {slides.map((item) => (
            <CarouselItem key={item.title} className="fade__slide">
              <div className=" flex size-full flex-col items-center justify-between py-6 md:pt-16">
                <Image
                  className="absolute top-0 hidden h-full w-auto object-cover md:block"
                  src={item.imageUrl}
                  alt={item.title}
                  width={2000}
                  height={480}
                  priority
                />
                <div className="flex max-w-[355px] items-center justify-center text-center md:max-w-fit md:px-6">
                  <PageHeaderHeading>{item.title}</PageHeaderHeading>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute inset-0 z-10 flex h-full items-center justify-center">
          <BlockInfos />
        </div>

        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
          <div className="flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className="relative h-[3px] w-12 overflow-hidden rounded-full"
              >
                <div className="absolute size-full bg-muted-foreground/30 dark:bg-muted-foreground/70"></div>
                <div
                  className={cn(
                    'relative z-10 h-full w-0 bg-primary',
                    current === index ? 'w-full animate-progress-bar' : ''
                  )}
                  style={
                    current === index
                      ? {
                          transitionDuration: `${intervalAutoplay}ms`,
                          animationDuration: `${intervalAutoplay}ms`,
                        }
                      : {}
                  }
                />
              </button>
            ))}
          </div>
        </div>
      </Carousel>
    </section>
  )
}
