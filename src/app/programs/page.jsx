'use client';

import CardProgram from '@/components/CardProgram';
import { useTranslation } from 'react-i18next';
import { Suspense } from 'react';

const OrchestraPrograms = () => {
  const { t } = useTranslation('programs');

  if (!t) {
    return <div>Loading...</div>;
  }

  const programs = [
    {
      title: t('classicalTitle') || 'Classical Evening',
      description: t('classicalDescription') || 'A beautiful selection of classical music pieces.',
      songs: ['Symphony No. 5 by Beethoven', 'The Four Seasons by Vivaldi', 'Canon in D by Pachelbel'],
      photos: ['/images/classical1.jpg', '/images/classical2.jpg'],
      videoLink: 'https://www.youtube.com/watch?v=example'
    },
    {
      title: t('modernTitle') || 'Modern Tunes',
      description: t('modernDescription') || 'Experience modern music with a classical twist.',
      songs: ['Shape of You (Classical Cover)', 'Billie Jean (Orchestra Version)'],
      photos: ['/images/modern1.jpg', '/images/modern2.jpg'],
      videoLink: null
    }
  ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <h1 className="text-4xl font-bold mb-6 text-dark-color">
          {t('title') || 'Orchestra Programs'}
        </h1>
        <div className="space-y-6">
          {programs.map((program) => (
            <CardProgram key={program.title} {...program} />
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default OrchestraPrograms;
