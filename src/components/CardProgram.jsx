"use client";

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay } from 'react-icons/fa'; // Иконка Play

const CardProgram = ({ 
  title, 
  description, 
  photos = [], 
  songs = [], 
  videoLink = null 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card bg-white rounded-lg shadow-lg overflow-hidden mb-8 flex flex-col">
      
      <div className="flex flex-col md:flex-row">
        
        {/* Секция с фотографиями слева */}
        <div className="flex-none w-full md:w-1/2 h-64 md:h-auto relative grid grid-cols-2 gap-2 p-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative w-full h-32 md:h-40">
              <Image 
                src={photo} 
                alt={`Photo ${index + 1}`} 
                fill 
                className="object-cover rounded-lg shadow-sm" 
              />
            </div>
          ))}
        </div>

        {/* Секция с описанием программы справа */}
        <div className="flex-auto p-4 md:p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-700 mb-4">{description}</p>

            {/* Красивая кнопка для просмотра видео */}
            {videoLink && (
              <motion.a 
                href={videoLink} 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-gradient-to-r from-[#D48166] to-[#BF6C4F] text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
              >
                <FaPlay className="mr-2" />
                Watch Video
              </motion.a>
            )}
          </div>
        </div>
      </div>

      {/* Раскрывающийся список композиций */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <button 
          className="text-primary-color font-semibold mb-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Hide Songs' : 'Show Songs'}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.ul
              className="list-disc pl-5 space-y-1 mt-2 text-gray-600"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {songs.map((song, index) => (
                <li key={index}>{song}</li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CardProgram;
