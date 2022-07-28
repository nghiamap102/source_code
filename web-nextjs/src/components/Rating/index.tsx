import React from 'react'
import { Box, Flex, Image } from '@chakra-ui/react'

const MAX_RATING_POINT: number = 5

interface IRating {
  rating?: number
}
const Rating: React.FC<IRating> = ({ rating = 0 }) => {
  return (
    <Flex alignItems='flex-end' className='rating'>
      {rating > 0 &&
        Array.from({ length: rating }, (_, i) => (
          <Box mr={1} key={i}>
            <Image src='/images/product/product-card/star.svg' alt='star rating' />
          </Box>
        ))}
      {Array.from({ length: MAX_RATING_POINT }, (_, i) => (
        <Box mr={1} key={i}>
          <Image src='/images/product/product-card/star-outline.svg' alt='star outline' />
        </Box>
      )).splice(rating)}
    </Flex>
  )
}

export default Rating
