import fs from 'fs';
import path from 'path';

export const fetchData = (type: 'programs' | 'alumni', locale: string) => {
  try {
    // Данные загружаются из src/data, а не из public/locales
    const filePath = path.join(process.cwd(), `src/data/${locale}/${type}.json`);
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Failed to load ${type} data:`, error);
    return [];
  }
};
