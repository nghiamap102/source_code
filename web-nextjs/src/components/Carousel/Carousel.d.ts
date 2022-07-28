import { ReactChild, ReactChildren, ReactNode } from 'react'

export interface ICarousel {
  children: ReactNode | ReactChild | ReactChildren
  classNames?: string

  slidesPerView?: number | 1
  spaceBetween?: number
  speed?: number
  direction?: 'vertical' | 'horizontal' | undefined
  slidesPerGroup?: number
  pagination?: PaginationOpts | boolean
  centeredSlides?: boolean
  mousewheel?: boolean
  loop?: boolean
  grabCursor?: boolean
  loopFillGroupWithBlank?: boolean
  keyboard?: boolean
  cssMode?: boolean
  navigation?: boolean
  preventInteractionOnTransition?: boolean
  allowSlideNext?: boolean
  allowTouchMove?: boolean
  grid?: GridOpts
  scrollbar?: ScrollBarOpts
  modules?: Modules[]
  initialSlide?: number | 1
  onInit?: () => void
}

interface GridOpts {
  rows: number
}
interface PaginationOpts {
  clickable: boolean
}
interface ScrollBarOpts {
  hide: boolean
}
interface Modules {
  name: string
}
