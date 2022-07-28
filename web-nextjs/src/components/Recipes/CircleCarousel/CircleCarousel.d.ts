import { ICategoryItem } from 'src/utils/Module'
export interface ICircleCarousel {
  listItem: ICategoryItem[]
  isLoading?: boolean
}
export interface ICircleCarouselProps {
  title: string
  images: string
  navigationLink: string
}
