export type PhotoType = "horizontal" | "vertical" | "square"

// Интерфейс для фотографии
export interface Photo {
  src: string
  alt: string
  ratio?: number
  type?: PhotoType
}

