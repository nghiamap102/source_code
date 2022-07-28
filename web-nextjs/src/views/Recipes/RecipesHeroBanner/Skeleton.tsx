import React, { FC } from 'react'
import { Flex, Box, Spacer } from '@chakra-ui/react'
import Skeleton from 'react-loading-skeleton'

const SkeletonBanner: FC = () => {
  return (
    <div>
      <Flex>
        <Box flexBasis='20%' h='400'>
          <Skeleton height='80%' />
          <Skeleton count={3} />
        </Box>
        <Spacer />
        <Box flexBasis='50%' h='400'>
          <Skeleton height='80%' />
          <Skeleton count={3} />
        </Box>
        <Spacer />
        <Box flexBasis='20%' h='400'>
          <Skeleton height='80%' />
          <Skeleton count={3} />
        </Box>
      </Flex>
    </div>
  )
}

export default SkeletonBanner
