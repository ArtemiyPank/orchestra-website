// src/app/programs/page.tsx
import ProgramsClient from './ProgramsClient';
import { fetchData } from '@/utils/fetchData';
import { Program } from '@/types/Program';

const ProgramsPage = async () => {
  const locale = 'en'; // Можно сделать динамическим, например, через контекст i18next
  const programs: Program[] = fetchData('programs', locale);

  return (
    <div className="p-8">
      <ProgramsClient programs={programs} />
    </div>
  );
};

export default ProgramsPage;
