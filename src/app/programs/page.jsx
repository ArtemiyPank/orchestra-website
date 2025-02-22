'use client';

import Card from '@/components/Card';
import { useTranslation } from 'react-i18next';

const OrchestraPrograms = () => {
  const { t } = useTranslation('programs');

  const programs = [
    {
      title: t('classicalTitle'),
      image: '/images/program1.jpg',
      description: t('classicalDescription'),
    },
    {
      title: t('modernTitle'),
      image: '/images/program2.jpg',
      description: t('modernDescription'),
    },
    {
      title: t('jazzTitle'),
      image: '/images/program3.jpg',
      description: t('jazzDescription'),
    },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-dark-color">{t('title')}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((program) => (
          <Card key={program.title} {...program} />
        ))}
      </div>
    </div>
  );
};

export default OrchestraPrograms;
