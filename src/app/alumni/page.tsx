// src/app/alumni/page.tsx
import AlumniClient from './AlumniClient';
import { fetchData } from '@/utils/fetchData';
import { Alumni } from '@/types/Alumni';

const AlumniPage = async () => {
  const locale = 'en'; // Можно сделать динамическим через контекст или роутер
  const alumni: Alumni[] = fetchData('alumni', locale);

  return (
    <div className="p-8">
      <AlumniClient alumni={alumni} />
    </div>
  );
};

export default AlumniPage;
