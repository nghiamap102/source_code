export interface IHeroBannerList {
  bannerList: Array<IHeroBanner>
  centeredSlides?: boolean
}

interface IHeroBanner {
  bannerImage?: string
  bannerName?: string
  navigationLink?: string
  isExternal?: boolean
}
