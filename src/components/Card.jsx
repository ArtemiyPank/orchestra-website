"use client";

import Image from 'next/image';

const Card = ({ title, image, description }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
    {image && (
      <div className="relative w-full h-56">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
    )}
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  </div>
);

export default Card;
