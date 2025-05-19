import { Carousel } from 'antd';
import React from 'react';
import './PublicLayoutCarousel.scss';

interface ImageSlide {
  images: string[];
}

export default function PublicLayoutCarousel({ images }: ImageSlide) {
  return (
    <div id='container-public-layout-carousel'>
      <Carousel autoplay={true} autoplaySpeed={3000} draggable swipeToSlide={true} touchMove={true}>
        {images.map((item: string, index: number) => (
          <div key={index} className=''>
            <img draggable={false} src={item} alt={item} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
