import useEmblaCarousel from 'embla-carousel-react'
import React, { useState, useEffect, useCallback } from 'react'
import './PublicLayoutCarousel.scss'
import Autoplay from 'embla-carousel-autoplay'

interface ImageSlide {
  images: string[]
  autoplayOptions?: {
    delay: number
    stopOnInteraction: boolean
    stopOnMouseEnter: boolean
  }
}

export default function PublicLayoutCarousel({
  images,
  autoplayOptions = {
    delay: 4000,
    stopOnInteraction: true,
    stopOnMouseEnter: true
  },
}: ImageSlide) {

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [
      Autoplay({
        delay: autoplayOptions.delay,
        stopOnInteraction: autoplayOptions.stopOnInteraction,
        stopOnMouseEnter: autoplayOptions.stopOnMouseEnter
      })
    ]
  )

  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex mb-28">
        {images.map((item: string, index: number) => (
          <div key={index} className='embla__slide'>
            <img draggable={false} src={item} alt="carousel image" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        {scrollSnaps.map((_, index) => (
          <div
            key={index}
            className={`embla__dot ${index === selectedIndex ? 'bg-[#096DD9]' : ''}`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}