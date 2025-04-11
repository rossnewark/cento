import React, { memo } from 'react';
import { Phone, Mail } from 'lucide-react';
import SwiperGallery from './SwiperGallery';

interface ContactInfoProps {
  phone: string;
  email: string;
  address: React.ReactNode;
  image: {
    src: string;
    alt: string;
  };
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  phone,
  email,
  address,
  image
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <Phone className="w-6 h-6 text-blue-900 mr-2" />
          <span className="text-gray-600">{phone}</span>
        </div>
        <div className="flex items-center">
          <Mail className="w-6 h-6 text-blue-900 mr-2" />
          <span className="text-gray-600">{email}</span>
        </div>
      </div>
      
      <SwiperGallery 
        images={[image]} 
        height="h-[300px]" 
      />
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-600">
          {address}
        </p>
      </div>
    </div>
  );
};

export default memo(ContactInfo);