// src/app/alumni/page.tsx
import AlumniClient from './AlumniClient';
import { fetchData } from '@/utils/fetchData';
import { Alumni } from '@/types/Alumni';

const AlumniPage = async () => {
  const locale = 'en';
  const alumni: Alumni[] = await fetchData('alumni', locale);

  return (
    <div className="p-8">
      <AlumniClient alumni={alumni} />
    </div>
  );
};

export default AlumniPage;
