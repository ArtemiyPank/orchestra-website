'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AboutContent = () => {
  const { t } = useTranslation('about');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <section className="mb-10 px-4 md:px-0">
      <motion.h1
        className="text-5xl font-extrabold mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {t('title')}
      </motion.h1>

      <motion.div
        className="relative w-full h-96 mb-8"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/images/orchestra.jpg"
          alt="Atid Raziel Orchestra"
          fill
          className="object-cover rounded-lg shadow-xl"
        />
      </motion.div>

      <motion.div
        className="text-lg space-y-6 leading-relaxed"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p>{t('description1')}</p>
        <p>{t('description2')}</p>
        <p>{t('description3')}</p>
        <p>{t('description4')}</p>
      </motion.div>

      <motion.div
        className="flex flex-col md:flex-row items-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="relative w-full md:w-1/2 h-80 mb-6 md:mb-0">
          <Image
            src="/images/conductor.jpg"
            alt="Lev Arshtein"
            fill
            className="object-cover rounded-lg shadow-xl"
          />
        </div>
        <div className="md:ml-8 w-full md:w-1/2 text-lg">
          <h2 className="text-3xl font-bold mb-4">{t('conductorTitle')}</h2>
          <p className="leading-relaxed">{t('conductorDescription')}</p>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutContent;
