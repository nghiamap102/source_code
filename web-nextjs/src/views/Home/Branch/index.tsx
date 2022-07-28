import { Skeleton, Image, Container } from '@chakra-ui/react'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'

import React from 'react'
import styled from 'styled-components'

import SectionTitle from '../../../components/SectionTitle'

const favoriteBranches = [
  {
    id: 1,
    url: '/images/Branch.png',
    alt: 'branch'
  },
  {
    id: 2,
    url: '/images/Branch.png',
    alt: 'branch'
  },
  {
    id: 3,
    url: '/images/Branch.png',
    alt: 'branch'
  },
  {
    id: 4,
    url: '/images/Branch.png',
    alt: 'branch'
  },
  {
    id: 5,
    url: '/images/Branch.png',
    alt: 'branch'
  },
  {
    id: 6,
    url: '/images/Branch.png',
    alt: 'branch'
  },
  {
    id: 7,
    url: '/images/Branch.png',
    alt: 'branch'
  },
  {
    id: 8,
    url: '/images/Branch.png',
    alt: 'branch'
  },
  {
    id: 9,
    url: '/images/Branch.png',
    alt: 'branch'
  },
  {
    id: 10,
    url: '/images/Branch.png',
    alt: 'branch'
  },
  {
    id: 11,
    url: '',
    alt: 'branch'
  }
]

const StyledSwiper = styled(Swiper)`
  .swiper-slide {
    width: 263px;
  }
`

function Branch() {
  return (
    <>
      <SectionTitle content={'Thương hiệu yêu thích'} />
      <StyledSwiper spaceBetween={20} slidesPerView='auto'>
        {favoriteBranches.map((branch) => (
          <SwiperSlide key={branch.id}>
            <Skeleton
              isLoaded={Boolean(branch.url)}
              display='flex'
              alignContent='center'
              maxW='263px'
              maxH='150px'
              bg='#fff'
            >
              <Image w='' src={branch.url} alt={branch.alt} m='auto' />
            </Skeleton>
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </>
  )
}

export default Branch
