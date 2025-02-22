"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

const Card = ({ title, image, description }) => (
  <motion.div
    className="card bg-white rounded-lg shadow-lg overflow-hidden"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {image && (
      <div className="relative w-full h-56">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
    )}
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  </motion.div>
);

export default Card;
