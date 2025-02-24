// src/app/programs/page.tsx
import ProgramsClient from './ProgramsClient';
import { fetchData } from '@/utils/fetchData';
import { Program } from '@/types/Program';

const ProgramsPage = async () => {
  const locale = 'en';
  const programs: Program[] = await fetchData('programs', locale);

  return (
    <div className="p-8">
      <ProgramsClient programs={programs} />
    </div>
  );
};

export default ProgramsPage;
