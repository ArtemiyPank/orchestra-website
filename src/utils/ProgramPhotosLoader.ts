export const loadProgramPhotos = async (photoFolder: string): Promise<string[]> => {
    try {
        const response = await fetch(`/api/photos/${photoFolder}`);
        if (!response.ok) {
            console.error(`Не удалось загрузить изображения из папки: ${photoFolder}`);
            return [];
        }
        return await response.json();
    } catch (error) {
        console.error("Ошибка при получении изображений:", error);
        return [];
    }
};
