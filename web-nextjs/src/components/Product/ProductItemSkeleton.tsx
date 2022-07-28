import React from 'react'
import { Box, Skeleton, SkeletonText, Grid, GridItem } from '@chakra-ui/react'

export const ProductItemSkeleton = () => {
  return (
    <Box borderRadius='10px' h='307px' overflow='hidden' bg='#fff' pt='10px'>
      <Skeleton isLoaded={false} height='145px' m={'10px'} />
      <SkeletonText isLoaded={false} noOfLines={4} spacing={2} m={'10px'} />
      <Skeleton isLoaded={false} height='38px' p='10px' margin={'30px 10px'} borderWidth='2px' />
    </Box>
  )
}

export const SectionProductsSkeleton = () => {
  return (
    <>
      <Box display='flex' justifyContent='space-between' alignItems='center' my={{ base: '1rem', md: '2rem' }}>
        <Skeleton isLoaded={false} height='20px' w={'300px'} />
        <Skeleton isLoaded={false} height='20px' w={'100px'} />
      </Box>
      <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' }} gap='1.2rem'>
        {LoadingProductSkeleton()}
      </Grid>
    </>
  )
}

export const LoadingProductSkeleton = () => {
  return [...new Array(20).keys()].map((e) => (
    <GridItem colSpan={1} key={e}>
      <ProductItemSkeleton />
    </GridItem>
  ))
}
