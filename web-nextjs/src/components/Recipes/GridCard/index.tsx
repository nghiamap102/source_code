import { Box, Grid, GridItem, Image, Link, Text } from '@chakra-ui/react'
import React from 'react'
import Rating from 'src/components/Rating'
import { mainColor } from 'src/theme/theme'
import { isNonEmptyArray } from 'src/utils'
import { IDataRecipes } from '../RecipesCard'
import styles from './GridCard.module.css'

interface GridCardRecipesProps {
  listItem: IDataRecipes[]
}
export const GridCardRecipes: React.FC<GridCardRecipesProps> = ({ listItem }) => {
  return (
    <Grid templateColumns='repeat(10, 1fr)' gap={4}>
      {isNonEmptyArray(listItem) &&
        listItem?.map((ele, i: number) => (
          <GridItem key={i} colSpan={5} position='relative'>
            <Image src={ele.src} alt={ele.alt} />
            <Box className={styles.decriptionSmall}>
              <Text className={styles.nameSmall}>{ele.name}</Text>
              <Box className={styles.ratingSmall}>
                <Rating rating={ele.star} />
                <Text className={styles.countSmall}>(1276)</Text>
              </Box>
              <Text className={styles.timeSmall}>
                {ele.date} - {ele.time}
              </Text>
              <Text className={styles.authorSmall}>
                By{' '}
                <Link href={ele.srcAuthor} color={mainColor.primary}>
                  {ele.author}
                </Link>
              </Text>
            </Box>
          </GridItem>
        ))}
    </Grid>
  )
}
