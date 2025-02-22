// src/app/alumni/AlumniClient.tsx
"use client";

import { useTranslation } from 'react-i18next';
import { Suspense } from 'react';
import CardAlumni from '@/components/CardAlumni';
import { Alumni } from '@/types/Alumni';

type AlumniClientProps = {
  alumni: Alumni[];
};

const AlumniClient = ({ alumni }: AlumniClientProps) => {
  const { t, ready } = useTranslation('alumni');

  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="space-y-6">
        <h1 className="text-4xl font-bold mb-6">
          {t('title', { defaultValue: 'Our Alumni' })}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alumni.map((person, index) => (
            <CardAlumni key={index} {...person} />
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default AlumniClient;
