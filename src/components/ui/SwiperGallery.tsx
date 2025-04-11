import React, { memo, useEffect, useState } from 'react';
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
  const [imagesLoaded, setImagesLoaded] = useState(false);
  // Remove unused preloadedImages state
  
  // Preload images before rendering Swiper
  useEffect(() => {
    let mounted = true;
    let loadedCount = 0;
    
    const preloadImage = (src: string) => {
      const img = new Image();
      img.src = src;
      
      img.onload = () => {
        loadedCount++;
        if (mounted && loadedCount === images.length) {
          setImagesLoaded(true);
        }
      };
      
      img.onerror = () => {
        loadedCount++;
        if (mounted && loadedCount === images.length) {
          setImagesLoaded(true);
        }
      };
    };
    
    // Preload all images
    images.forEach(image => preloadImage(image.src));
    
    return () => { mounted = false; };
  }, [images]);
  
  return (
    <div className={`relative ${height} rounded-lg overflow-hidden shadow-md bg-gray-100`}>
      {imagesLoaded ? (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={images.length > 1}
          className="h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="bg-gray-100">
              <div className="w-full h-full bg-center bg-cover" style={{ backgroundImage: `url(${image.src})` }}
              role="img" aria-label={image.alt} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default memo(SwiperGallery);