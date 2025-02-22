'use client';

import Card from '@/components/Card';
import { useTranslation } from 'react-i18next';

const AlumniInterviews = () => {
  const { t } = useTranslation('alumni');

  const alumni = [
    {
      title: t('annaTitle'),
      image: '/images/alumni1.jpg',
      description: t('annaDescription'),
    },
    {
      title: t('davidTitle'),
      image: '/images/alumni2.jpg',
      description: t('davidDescription'),
    },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-dark-color">{t('title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {alumni.map((person) => (
          <Card key={person.title} {...person} />
        ))}
      </div>
    </div>
  );
};

export default AlumniInterviews;
