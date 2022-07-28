import React from 'react'
import cx from 'classnames'
import { ICarousel } from 'src/components/Carousel/Carousel.d'
import { Swiper } from 'swiper/react'
import styles from './Carousel.module.css'
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/scrollbar'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const Carousel: React.FC<ICarousel> = ({ classNames, children, ...rest }) => {
  const { centeredSlides } = rest

  return (
    <Swiper {...rest} className={cx(classNames, styles.swiper, centeredSlides && styles.center)}>
      {children}
    </Swiper>
  )
}

export default Carousel
