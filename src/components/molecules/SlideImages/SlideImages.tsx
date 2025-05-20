import { Carousel } from 'antd';
import React from 'react';

import { DevPlus } from '@app/assets/images/index';
import {
  carousel_1,
  carousel_2,
  carousel_3,
  carousel_4,
} from '@app/assets/images/SlideImages/index';
import './SlideImages.scss';

const images = [carousel_1, carousel_2, carousel_3, carousel_4];

export const SlideImages = () => {
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
            <div key={index}>
              <img draggable={false} src={item} alt={item} />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};
