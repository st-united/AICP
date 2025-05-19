import { Carousel } from 'antd';
import React from 'react';

import './PublicLayoutCarousel.scss';
import { DevPlus } from '@app/assets/images/index';

interface ImageSlideProps {
  images: string[];
}

export const SlideImage = ({ images }: ImageSlideProps) => {
  return (
    <>
      <div className='h-[80px] w-[200px] flex items-start'>
        <img src={DevPlus} className='w-full h-full' alt='dev plus' />
      </div>
      <div id='container-public-layout-carousel'>
        <Carousel
          autoplay={true}
          autoplaySpeed={3000}
          draggable
          swipeToSlide={true}
          touchMove={true}
        >
          {images.map((item: string, index: number) => (
            <div key={index} className=''>
              <img draggable={false} src={item} alt={item} />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};
