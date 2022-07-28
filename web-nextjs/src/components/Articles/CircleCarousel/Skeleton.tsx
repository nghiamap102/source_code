import React from 'react'
import { Flex, Box } from '@chakra-ui/react'
import Skeleton from 'react-loading-skeleton'

const SkeletonComponent = () => {
  return (
    <Flex justifyContent='space-between' margin='0 -5rem'>
      {Array.from({ length: 9 }).map((_, i: number) => (
        <Box h={180} w={180} key={i}>
          <Skeleton height='100%' circle />
        </Box>
      ))}
    </Flex>
  )
}

export default SkeletonComponent
