import React, { memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface SwiperGalleryProps {
  images: Array<{
    src: string;
    alt: string;
  }>;
  height?: string;
}

const SwiperGallery: React.FC<SwiperGalleryProps> = ({ 
  images, 
  height = "h-[400px]" 
}) => {
  return (
    <div className={`relative ${height} rounded-lg overflow-hidden shadow-md`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-full"
        preloadImages={false}
        lazy={true}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover swiper-lazy"
            />
            <div className="swiper-lazy-preloader"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default memo(SwiperGallery);