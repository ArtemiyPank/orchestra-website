"use client";

import { Alumni } from '@/types/Alumni';

const CardAlumni = ({ name, description, image, story }: Alumni) => {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">{name}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        <p className="text-gray-600">{story}</p>
      </div>
    </div>
  );
};

export default CardAlumni;
