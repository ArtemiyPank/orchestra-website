'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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
      <h1 className="text-5xl font-extrabold mb-8 text-center text-dark-color">
        {t('title')}
      </h1>

      <div className="relative w-full h-96 mb-8">
        <Image
          src="/images/orchestra.jpg"
          alt="Atid Raziel Orchestra"
          fill
          className="object-cover rounded-lg shadow-xl"
        />
      </div>

      <div className="text-lg space-y-6 leading-relaxed">
        <p>{t('description1')}</p>
        <p>{t('description2')}</p>
        <p>{t('description3')}</p>
        <p>{t('description4')}</p>
      </div>

      <div className="flex flex-col md:flex-row items-center mt-12">
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
      </div>
    </section>
  );
};

export default AboutContent;
