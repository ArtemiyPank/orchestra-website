import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import "@/styles/photo-grids.css";

type Photo = {
  src: string;
  alt: string;
  ratio?: number; // Соотношение сторон изображения
};

type DynamicPhotoGridProps = {
  photos: Photo[];
  openGallery: (index: number) => void;
  gridClass?: string; // Возможность указать конкретную сетку
  selectedPhotoNames?: string[]; // Возможность указать конкретные фото
};

// 🎲 13 шаблонов сеток с требованиями к типам фотографий
const gridTemplates = [
  { template: "grid-template-1", required: { horizontal: 1, vertical: 1, square: 2 } },
  { template: "grid-template-2", required: { horizontal: 1, vertical: 1, square: 2 } },
  { template: "grid-template-3", required: { horizontal: 1, vertical: 1, square: 2 } },
  { template: "grid-template-4", required: { horizontal: 1, vertical: 1, square: 2 } },
  { template: "grid-template-5", required: { horizontal: 2, vertical: 1 } },
  { template: "grid-template-6", required: { horizontal: 2, vertical: 1 } },
  { template: "grid-template-7", required: { square: 4 } },
  { template: "grid-template-8", required: { square: 1, horizontal: 2 } },
  { template: "grid-template-9", required: { square: 1, horizontal: 2 } },
  { template: "grid-template-10", required: { horizontal: 2 } },
  { template: "grid-template-11", required: { horizontal: 3 } },
  { template: "grid-template-12", required: { horizontal: 5 } },
  { template: "grid-template-13", required: { horizontal: 5 } }
];

const getRandomElement = <T,>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

const DynamicPhotoGrid: React.FC<DynamicPhotoGridProps> = ({ 
  photos, 
  openGallery, 
  gridClass, 
  selectedPhotoNames 
}) => {
  const [photosWithRatios, setPhotosWithRatios] = useState<Photo[]>([]);

  useEffect(() => {
    const calculateImageRatios = async () => {
      const photosWithRatios = await Promise.all(
        photos.map(async (photo) => {
          return new Promise<Photo>((resolve) => {
            const img = new window.Image();
            img.src = photo.src;
            img.onload = () => {
              const ratio = img.naturalWidth / img.naturalHeight;
              resolve({ ...photo, ratio });
            };
          });
        })
      );
      setPhotosWithRatios(photosWithRatios);
    };

    calculateImageRatios();
  }, [photos]);

  const { selectedPhotos, chosenGridClass } = useMemo(() => {
    // 🛠️ Если указаны конкретные фото и сетка, используем их
    if (gridClass && selectedPhotoNames?.length) {
      const filteredPhotos = photosWithRatios.filter(photo =>
        selectedPhotoNames.includes(photo.src.split('/').pop() || "")
      );
      console.log("Используется явная сетка:", gridClass);
      console.log("Используемые фотографии:", filteredPhotos.map(p => p.src));

      return { selectedPhotos: filteredPhotos, chosenGridClass: gridClass };
    }

    // 🎲 Автоматический выбор подходящей сетки
    const suitableTemplates = gridTemplates.filter(({ required }) => {
      return photos.length >= Object.values(required).reduce((sum, val) => sum + val, 0);
    });

    if (suitableTemplates.length > 0) {
      const chosenTemplate = getRandomElement(suitableTemplates);
      const selected: Photo[] = photos.slice(0, Object.values(chosenTemplate.required).reduce((a, b) => a + b, 0));

      console.log("Выбранная случайная сетка:", chosenTemplate.template);
      console.log("Выбранные фотографии:", selected.map(photo => photo.src));

      return { selectedPhotos: selected, chosenGridClass: chosenTemplate.template };
    }

    console.warn("Нет подходящих шаблонов, используется стандартная сетка.");
    return { selectedPhotos: photosWithRatios.slice(0, 5), chosenGridClass: "grid-template-1" };
  }, [photosWithRatios, gridClass, selectedPhotoNames]);

  return (
    <div className={`photo-grid-container ${chosenGridClass}`}>
      {selectedPhotos.map((photo, index) => (
        <div
          key={index}
          className={`photo-item photo-${index + 1}`}
          onClick={() => openGallery(index)}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
};

export default DynamicPhotoGrid;
