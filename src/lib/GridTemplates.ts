import type { Photo } from "@/types/photo"

// Интерфейс для шаблона сетки
export interface GridTemplate {
  id: string
  name: string
  // Количество фотографий в шаблоне
  photoCount: number
  // Функция для определения "счета" соответствия шаблона имеющимся фотографиям
  getScore: (photos: Photo[]) => number
}

// Определяем шаблоны сеток для разного количества фотографий
export const gridTemplates: GridTemplate[] = [
  // Шаблоны для 2 фотографий
  {
    id: "grid-2-a",
    name: "2 фото: горизонтальные в ряд",
    photoCount: 2,
    getScore: (photos) => {
      const horizontalCount = photos.filter((p) => p.type === "horizontal").length
      return horizontalCount * 2
    },
  },
  {
    id: "grid-2-b",
    name: "2 фото: вертикальные в столбец",
    photoCount: 2,
    getScore: (photos) => {
      const verticalCount = photos.filter((p) => p.type === "vertical").length
      return verticalCount * 2
    },
  },
  {
    id: "grid-2-c",
    name: "2 фото: большая и маленькая",
    photoCount: 2,
    getScore: (photos) => {
      // Идеально, если фотографии разных типов
      return photos[0]?.type !== photos[1]?.type ? 3 : 1
    },
  },
  {
    id: "grid-2-d",
    name: "2 фото: диагональное расположение",
    photoCount: 2,
    getScore: (photos) => {
      // Хорошо для квадратных фото
      const squareCount = photos.filter((p) => p.type === "square").length
      return squareCount * 1.5
    },
  },

  // Шаблоны для 3 фотографий
  {
    id: "grid-3-a",
    name: "3 фото: горизонтальные в ряд",
    photoCount: 3,
    getScore: (photos) => {
      const horizontalCount = photos.filter((p) => p.type === "horizontal").length
      return horizontalCount * 1.5
    },
  },
  {
    id: "grid-3-b",
    name: "3 фото: вертикальная + 2 квадратных",
    photoCount: 3,
    getScore: (photos) => {
      const verticalCount = photos.filter((p) => p.type === "vertical").length
      const squareCount = photos.filter((p) => p.type === "square").length
      return verticalCount * 2 + squareCount
    },
  },
  {
    id: "grid-3-c",
    name: "3 фото: большая горизонтальная + 2 маленьких",
    photoCount: 3,
    getScore: (photos) => {
      const hasHorizontalFirst = photos[0]?.type === "horizontal" ? 3 : 0
      return hasHorizontalFirst + 1
    },
  },
  {
    id: "grid-3-d",
    name: "3 фото: вертикальная слева + 2 справа",
    photoCount: 3,
    getScore: (photos) => {
      const hasVerticalFirst = photos[0]?.type === "vertical" ? 3 : 0
      return hasVerticalFirst + 1
    },
  },
  {
    id: "grid-3-e",
    name: "3 фото: горизонтальная сверху + 2 снизу",
    photoCount: 3,
    getScore: (photos) => {
      const hasHorizontalFirst = photos[0]?.type === "horizontal" ? 3 : 0
      return hasHorizontalFirst + 1
    },
  },

  // Шаблоны для 4 фотографий
  {
    id: "grid-4-a",
    name: "4 фото: сетка 2x2",
    photoCount: 4,
    getScore: (photos) => {
      const squareCount = photos.filter((p) => p.type === "square").length
      return squareCount * 1.5
    },
  },
  {
    id: "grid-4-b",
    name: "4 фото: большая + 3 маленьких",
    photoCount: 4,
    getScore: (photos) => {
      const hasHorizontalFirst = photos[0]?.type === "horizontal" ? 3 : 0
      const hasVerticalFirst = photos[0]?.type === "vertical" ? 2 : 0
      return Math.max(hasHorizontalFirst, hasVerticalFirst) + 1
    },
  },
  {
    id: "grid-4-c",
    name: "4 фото: 2 строки по 2 фото",
    photoCount: 4,
    getScore: (photos) => {
      // Хорошо работает с чередованием горизонтальных и вертикальных фото
      const types = photos.map((p) => p.type)
      const alternating = types[0] !== types[1] && types[2] !== types[3] ? 3 : 1
      return alternating
    },
  },
  {
    id: "grid-4-d",
    name: "4 фото: T-образная сетка",
    photoCount: 4,
    getScore: (photos) => {
      const hasHorizontalFirst = photos[0]?.type === "horizontal" ? 2 : 0
      return hasHorizontalFirst + 1
    },
  },
  {
    id: "grid-4-e",
    name: "4 фото: перевернутая T-образная сетка",
    photoCount: 4,
    getScore: (photos) => {
      const hasHorizontalLast = photos[3]?.type === "horizontal" ? 2 : 0
      return hasHorizontalLast + 1
    },
  },
  {
    id: "grid-4-f",
    name: "4 фото: L-образная сетка",
    photoCount: 4,
    getScore: (photos) => {
      const hasVerticalFirst = photos[0]?.type === "vertical" ? 2 : 0
      return hasVerticalFirst + 1
    },
  },

  // Шаблоны для 5 фотографий
  {
    id: "grid-5-a",
    name: "5 фото: мозаика",
    photoCount: 5,
    getScore: (photos) => {
      // Бонус за разнообразие типов фотографий
      const diversity = new Set(photos.map((p) => p.type)).size * 2
      return diversity
    },
  },
  {
    id: "grid-5-b",
    name: "5 фото: большая + 4 маленьких",
    photoCount: 5,
    getScore: (photos) => {
      const hasHorizontalFirst = photos[0]?.type === "horizontal" ? 3 : 0
      return hasHorizontalFirst + 1
    },
  },
  {
    id: "grid-5-c",
    name: "5 фото: 2 большие + 3 маленьких",
    photoCount: 5,
    getScore: (photos) => {
      const horizontalCount = photos.slice(0, 2).filter((p) => p.type === "horizontal").length
      return horizontalCount * 2
    },
  },
  {
    id: "grid-5-d",
    name: "5 фото: крест",
    photoCount: 5,
    getScore: (photos) => {
      const squareCount = photos.filter((p) => p.type === "square").length
      return squareCount * 1.5
    },
  },
  {
    id: "grid-5-e",
    name: "5 фото: квинтет",
    photoCount: 5,
    getScore: (photos) => {
      // Хорошо для смешанных типов
      console.log(photos);
      return 2
    },
  },

  // Шаблоны для 6 фотографий
  {
    id: "grid-6-a",
    name: "6 фото: сетка 3x2",
    photoCount: 6,
    getScore: (photos) => {
      const squareCount = photos.filter((p) => p.type === "square").length
      return squareCount
    },
  },
  {
    id: "grid-6-b",
    name: "6 фото: большая + 5 маленьких",
    photoCount: 6,
    getScore: (photos) => {
      const hasHorizontalFirst = photos[0]?.type === "horizontal" ? 3 : 0
      return hasHorizontalFirst + 1
    },
  },
  {
    id: "grid-6-c",
    name: "6 фото: 3 строки по 2 фото",
    photoCount: 6,
    getScore: (photos) => {
      // Хорошо работает с чередованием горизонтальных и вертикальных фото
      const horizontalCount = photos.filter((p) => p.type === "horizontal").length
      const verticalCount = photos.filter((p) => p.type === "vertical").length
      return Math.min(horizontalCount, verticalCount) * 1.5
    },
  },
  {
    id: "grid-6-d",
    name: "6 фото: 2 большие + 4 маленьких",
    photoCount: 6,
    getScore: (photos) => {
      const horizontalCount = photos.slice(0, 2).filter((p) => p.type === "horizontal").length
      return horizontalCount * 2
    },
  },
  {
    id: "grid-6-e",
    name: "6 фото: мозаика с акцентом",
    photoCount: 6,
    getScore: (photos) => {
      const hasHorizontalFirst = photos[0]?.type === "horizontal" ? 2 : 0
      const diversity = new Set(photos.map((p) => p.type)).size
      return hasHorizontalFirst + diversity
    },
  },

  // Шаблоны для 7 фотографий
  {
    id: "grid-7-a",
    name: "7 фото: мозаика",
    photoCount: 7,
    getScore: (photos) => {
      // Бонус за разнообразие типов фотографий
      const diversity = new Set(photos.map((p) => p.type)).size * 2
      return diversity
    },
  },
  {
    id: "grid-7-b",
    name: "7 фото: большая + 6 маленьких",
    photoCount: 7,
    getScore: (photos) => {
      const hasHorizontalFirst = photos[0]?.type === "horizontal" ? 3 : 0
      return hasHorizontalFirst + 1
    },
  },
  {
    id: "grid-7-c",
    name: "7 фото: 3 большие + 4 маленьких",
    photoCount: 7,
    getScore: (photos) => {
      const horizontalCount = photos.slice(0, 3).filter((p) => p.type === "horizontal").length
      return horizontalCount * 1.5
    },
  },
  {
    id: "grid-7-d",
    name: "7 фото: сложная мозаика",
    photoCount: 7,
    getScore: (photos) => {
      // Хорошо для смешанных типов
      const diversity = new Set(photos.map((p) => p.type)).size * 1.5
      return diversity
    },
  },
  {
    id: "grid-7-e",
    name: "7 фото: галерея с акцентом",
    photoCount: 7,
    getScore: (photos) => {
      const hasHorizontalFirst = photos[0]?.type === "horizontal" ? 2 : 0
      const hasVerticalFirst = photos[0]?.type === "vertical" ? 2 : 0
      return Math.max(hasHorizontalFirst, hasVerticalFirst) + 1
    },
  },

  // Дополнительные шаблоны для большего количества фотографий
  {
    id: "grid-8-a",
    name: "8 фото: сетка 4x2",
    photoCount: 8,
    getScore: (photos) => {
      const squareCount = photos.filter((p) => p.type === "square").length
      return squareCount
    },
  },
  {
    id: "grid-8-b",
    name: "8 фото: мозаика с акцентами",
    photoCount: 8,
    getScore: (photos) => {
      const diversity = new Set(photos.map((p) => p.type)).size * 2
      return diversity
    },
  },
  {
    id: "grid-9-a",
    name: "9 фото: сетка 3x3",
    photoCount: 9,
    getScore: (photos) => {
      const squareCount = photos.filter((p) => p.type === "square").length
      return squareCount * 1.5
    },
  },
  {
    id: "grid-9-b",
    name: "9 фото: сложная композиция",
    photoCount: 9,
    getScore: (photos) => {
      const diversity = new Set(photos.map((p) => p.type)).size * 2
      return diversity
    },
  },
  {
    id: "grid-10-a",
    name: "10 фото: мозаика",
    photoCount: 10,
    getScore: (photos) => {
      const diversity = new Set(photos.map((p) => p.type)).size * 2
      return diversity
    },
  },
  {
    id: "grid-12-a",
    name: "12 фото: сетка 4x3",
    photoCount: 12,
    getScore: (photos) => {
      const squareCount = photos.filter((p) => p.type === "square").length
      return squareCount
    },
  },
]

