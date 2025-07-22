import { Carousel } from 'antd';

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
      <div className='h-[60px] w-[150px] sm:h-[70px] sm:w-[180px] md:h-[80px] md:w-[200px] flex items-start'>
        <img src={DevPlus} className='w-full h-full' alt='dev plus' />
      </div>
      <div
        id='container-public-layout-carousel'
        className='w-full max-w-[100vw] sm:max-w-[90vw] md:max-w-[80vw] mx-auto'
      >
        <Carousel
          autoplay={true}
          autoplaySpeed={3000}
          draggable
          swipeToSlide={true}
          touchMove={true}
          dots={true}
          adaptiveHeight={true}
        >
          {images.map((item: string, index: number) => (
            <div key={index} className='px-2 sm:px-4'>
              <img
                draggable={false}
                src={item}
                alt={item}
                className='w-full h-auto object-cover rounded-lg'
              />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};
