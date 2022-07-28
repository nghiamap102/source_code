import React from 'react'
import { Box, Image, Flex, Text } from '@chakra-ui/react'
import { mainColor } from 'src/theme/theme'
const HeaderMobile = () => {
  return (
    <Box background={mainColor.blackOverlay}>
      <Flex justifyContent='space-between' alignItems='center' width='100%' pt='10px'>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Box height='30px' width='30px' overflow='hidden' margin-right='15px'>
            <Image src='/images/recipes/avatar.jpg' alt='Avatar' border-radius='full' />
          </Box>
          <Box>
            <Text fontSize='subHead'>Hello, Jersey</Text>
            <Text fontSize='caption'>
              <span>9999</span> Pts
            </Text>
          </Box>
        </Box>
        <Flex justifyContent='space-between' alignItems='center'>
          <Image src='/images/recipes/search.svg' alt='Search' px={2} mr={4} />
          <Image src='/images/recipes/cart.svg' alt='Cart' px={2} />
        </Flex>
      </Flex>
    </Box>
  )
}

export default HeaderMobile
