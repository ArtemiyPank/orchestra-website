"use client";

import { useEffect, useState } from "react";
import { Program } from "@/types/Program";
import { Dialog } from "@headlessui/react";
import DynamicPhotoGrid from "./DynamicPhotoGrid";
import { loadProgramPhotos } from "@/utils/ProgramPhotosLoader";
import Image from "next/image";

const CardProgram = ({ 
  title, 
  description, 
  songs, 
  videoLink, 
  photoFolder, 
  photoGrid, 
  selectedPhotos 
}: Program) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const loadedPhotos = await loadProgramPhotos(photoFolder);
      
      // Фильтрация фотографий по явно указанным именам
      const filteredPhotos = selectedPhotos?.length
        ? loadedPhotos.filter(photo => selectedPhotos.includes(photo.split('/').pop() || ""))
        : [];

      setPhotos(filteredPhotos);
    };

    fetchPhotos();
  }, [photoFolder, selectedPhotos]);

  const openGallery = (index: number) => {
    setActiveImageIndex(index);
    setIsOpen(true);
  };

  const closeGallery = () => {
    setIsOpen(false);
  };

  if (!photoGrid || photos.length === 0) {
    console.warn(`Пропущена программа: "${title}". Сетка: "${photoGrid}", Фото: ${photos.length}`);
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-lg overflow-hidden mb-10">
      
      <div className="flex-1 p-8 flex flex-col justify-between">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">{title}</h2>
        <p className="text-gray-600 mb-6 text-lg">{description}</p>

        {songs && songs.length > 0 && (
          <details className="mb-6">
            <summary className="text-peach-color cursor-pointer text-lg">
              🎵 Show songs
            </summary>
            <ul className="list-disc pl-5 text-peach-color mt-2 space-y-1">
              {songs.map((song, index) => (
                <li key={index}>{song}</li>
              ))}
            </ul>
          </details>
        )}

        {videoLink && (
          <a
            href={videoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-peach-color text-white px-8 py-3 rounded-full font-semibold mt-6 transition-transform transform hover:scale-105"
          >
            🎬 Watch Video
          </a>
        )}
      </div>

      <div className="flex-1">
        <DynamicPhotoGrid
          photos={photos.map((src, index) => ({
            src,
            alt: `Photo ${index + 1} of ${title}`,
          }))}
          openGallery={openGallery}
          gridClass={photoGrid} 
          selectedPhotoNames={selectedPhotos} 
        />
      </div>

      <Dialog open={isOpen} onClose={closeGallery} className="relative z-50">
        <div className="fixed inset-0 bg-black bg-opacity-75" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-4xl">
            <Image
              src={photos[activeImageIndex]}
              alt={`Gallery image ${activeImageIndex + 1}`}
              width={800}
              height={600}
              className="object-contain"
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default CardProgram;
