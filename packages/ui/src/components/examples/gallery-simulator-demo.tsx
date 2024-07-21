'use client'

import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { IoShareOutline } from 'react-icons/io5'

import EachImageSelector from '../each-image-selector'
import IphoneSimulator from '../iphone-simulator'

const images = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1721069662098-f2031c2319b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI5fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1719773188310-85c82542f677?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU4fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1721010210272-564595562e9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDczfDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1719844841024-3c7166816fc7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIzMnw2c01WalRMU2tlUXx8ZW58MHx8fHx8',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1540821973538-7bcd8b4a4935?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1540820676195-1e09a8df65dd?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?q=80&w=2452&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=2488&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
]

export default function GallerySimulatorDemo() {
  const [selectedImage, setSelectedImage] = useState(1)
  const [isClicked, setIsClicked] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  const onClickHandler = () => setIsClicked(!isClicked)
  const onShareClickHandler = () => setIsOpen(!isOpen)

  useEffect(() => {
    const currentContainer = containerRef.current
    if (currentContainer) {
      const selectedElement = currentContainer.querySelector(
        `[data-id="${selectedImage}"]`
      ) as HTMLDivElement
      if (selectedElement) {
        const scrollX =
          selectedElement.offsetLeft +
          selectedElement.clientWidth / 2 -
          currentContainer.clientWidth / 2
        currentContainer.scrollLeft = scrollX
      }
    }
  }, [selectedImage, isClicked])

  return (
    <IphoneSimulator
      textColor={isOpen ? 'white' : 'black'}
      mainClassName="py-0"
    >
      <MotionConfig transition={{ duration: 0.6, type: 'spring', bounce: 0 }}>
        <motion.div
          animate={isOpen ? { scale: 0.85 } : {}}
          className="h-full overflow-hidden rounded-xl"
        >
          <div
            className={`absolute inset-0 -z-10 duration-150 ${isClicked ? 'bg-white' : 'bg-black'}`}
          ></div>
          <div className="h-full">
            <AnimatePresence>
              {isClicked ? (
                <motion.header
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-0 z-20 h-24 w-full border-b bg-[#FAF9F9]"
                ></motion.header>
              ) : null}
            </AnimatePresence>
            <div
              className="flex h-full items-center justify-center overflow-hidden"
              onClick={onClickHandler}
            >
              <motion.img
                key={selectedImage}
                layoutId={images
                  .find((image) => image.id === selectedImage)
                  ?.id.toString()}
                src={images.find((image) => image.id === selectedImage)?.url}
                className="max-h-[600px] w-full object-cover"
              />
            </div>
            <AnimatePresence>
              {isClicked ? (
                <motion.footer
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-0 left-0 h-32 w-full border-t bg-[#FAF9F9] pt-0.5"
                >
                  <div
                    ref={containerRef}
                    className="no-scrollbar flex gap-0.5 overflow-auto"
                  >
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-8 w-8"
                        style={{ flex: '0 0 auto' }}
                      ></div>
                    ))}
                    <AnimatePresence initial={false}>
                      {images.map((image) => (
                        <EachImageSelector
                          key={image.id}
                          id={image.id}
                          url={image.url}
                          selectedImage={selectedImage}
                          onImageClickHandler={setSelectedImage}
                        />
                      ))}
                    </AnimatePresence>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-8 w-8"
                        style={{ flex: '0 0 auto' }}
                      ></div>
                    ))}
                  </div>

                  <div className="p-4">
                    <button
                      className="text-2xl text-blue-500"
                      onClick={onShareClickHandler}
                    >
                      <IoShareOutline />
                    </button>
                  </div>
                </motion.footer>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>

        <AnimatePresence>
          {isOpen ? (
            <motion.div
              className="absolute bottom-0 left-0 isolate flex h-[90%] w-full flex-col pt-8"
              onClick={onShareClickHandler}
            >
              <motion.div
                initial={{ transform: 'translateY(100%)' }}
                animate={{ transform: 'translateY(0%)' }}
                exit={{ transform: 'translateY(100%)' }}
                className="absolute inset-0 -z-10 rounded-t-xl bg-white"
              />

              <div className="flex justify-center">
                <motion.img
                  layoutId={images
                    .find((image) => image.id === selectedImage)
                    ?.id.toString()}
                  src={images.find((image) => image.id === selectedImage)?.url}
                  className="w-48 object-cover"
                  style={{ borderRadius: 12 }}
                />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.3 } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                className="mt-4 px-4 text-center text-sm leading-5 text-[#909092]"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                accusamus obcaecati quidem reprehenderit porro sunt nostrum
                deserunt assumenda, dolor illum debitis quisquam autem ab ipsum
                architecto! Inventore voluptatibus commodi assumenda?
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.3 } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                className="mb-4 mt-auto p-4"
              >
                <button className="h-10 w-full rounded-lg bg-blue-500 font-medium text-white">
                  Share
                </button>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </MotionConfig>
    </IphoneSimulator>
  )
}
