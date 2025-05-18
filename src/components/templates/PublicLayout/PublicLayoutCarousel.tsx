import { Carousel } from 'antd';
import React from 'react';
import './PublicLayoutCarousel.scss';

interface ImageSlide {
  images: string[];
}

export default function PublicLayoutCarousel({ images }: ImageSlide) {
  return (
    <>
      <Carousel draggable swipeToSlide={true} touchMove={true}>
        {images.map((item: string, index: number) => (
          <div key={index} className=''>
            <img draggable={false} src={item} alt={item} />
          </div>
        ))}
      </Carousel>
    </>
  );
}
