// src/app/programs/ProgramsClient.tsx
"use client";

import { useTranslation } from 'react-i18next';
import CardProgram from '@/components/CardProgram';
import { Suspense } from 'react';
import { Program } from '@/types/Program';

type ProgramsClientProps = {
  programs: Program[];
};

const ProgramsClient = ({ programs }: ProgramsClientProps) => {
  const { t, ready } = useTranslation('programs');

  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="space-y-6">
        <h1 className="text-4xl font-bold mb-6">
          {t('title', { defaultValue: 'Orchestra Programs' })}
        </h1>
        <div className="flex flex-col gap-6">
          {programs.map((program, index) => (
            <CardProgram key={index} {...program} />
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default ProgramsClient;
