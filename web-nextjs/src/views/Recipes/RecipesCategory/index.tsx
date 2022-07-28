import React from 'react'
import { Box, Text, Grid, GridItem, Link, Image } from '@chakra-ui/react'
import { isNonEmptyArray, onErrorImage } from 'src/utils'
import { ICircleCarousel } from 'src/components/Recipes/CircleCarousel/CircleCarousel.d'

const RecipesCategory: React.FC<ICircleCarousel> = ({ listItem }) => {
  return (
    <Grid templateColumns='repeat(2, 1fr)'>
      {isNonEmptyArray(listItem) &&
        listItem?.map((element, index) => (
          <GridItem key={element.name + index} textAlign='center' display='inline-block'>
            {/* <Link href={element.navigationLink}> */}
            <Box position='relative'>
              <Image
                src={element.field_thumbnail}
                alt={element.name}
                mx='auto'
                w='100%'
                fallbackSrc={'/images/recipes/recipe-category-mobile.jpg' || onErrorImage(188, 188)}
              />
              <Box position='absolute' bottom='0' left='0' w='100%' h='100%' background='main.overlay' zIndex='0' />
              <Text
                position='absolute'
                top='50%'
                left='50%'
                transform='translate(-50%,-50%)'
                color='main.white'
                fontSize='body'
                fontWeight={700}
              >
                {element.name}
              </Text>
            </Box>
            {/* </Link> */}
          </GridItem>
        ))}
    </Grid>
  )
}

export default RecipesCategory
