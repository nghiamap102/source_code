import { Box, Grid, GridItem, Image, Link, Text } from '@chakra-ui/react'
import React, { ReactChild, ReactChildren, ReactNode } from 'react'
import { HeaderRecipes } from '../Header'
import { IDataRecipes, RecipesCard } from '../RecipesCard'
import { GridCardRecipes } from '../GridCard'
import styles from './ListingFull.module.css'
import { CarouselCardRecipes } from '../CarouselCard'
import MobileNavigation from 'src/components/MobileNavigation'
import 'src/pages/_app.css'
import { isNonEmptyArray } from 'src/utils'

type ITitle = {
  title: string
  icon: string
  image: string
  alt: string
  href: string
}
type RecipesListingFullProps = {
  avaSrc: string
  listRecommend: IDataRecipes[]
  listRecipes: Array<IDataRecipes>
  listTitle: Array<ITitle>
  children: ReactChild | ReactChildren | ReactNode
  onClickSearch?: () => void
  onClickCart?: () => void
}

export const RecipesListingFull: React.FC<RecipesListingFullProps> = ({
  avaSrc,
  listRecipes,
  listTitle,
  listRecommend,
  onClickCart,
  onClickSearch,
  children
}) => {
  return (
    <Box position='relative'>
      {children}
      <HeaderRecipes background='linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0))'>
        <Box className={styles.userSection}>
          <Box position='relative'>
            <Link>
              <Box className={styles.avatar}>
                {!avaSrc && <Image src='/images/recipes/avatar.jpg' alt='Avatar' />}
                {avaSrc && <Image src={avaSrc} alt='Avatar' />}
              </Box>
              <Box className={styles.more}>
                <Image src='/images/recipes/icon_list.svg' alt='More' />
              </Box>
            </Link>
          </Box>
          <Text paddingLeft={4}>Recipes</Text>
          <Box className={styles.d_fl_center}>
            <Image src='/images/recipes/search.svg' alt='Search' className={styles.search} onClick={onClickCart} />
            <Image src='/images/recipes/cart.svg' alt='Cart' className={styles.cart} onClick={onClickSearch} />
          </Box>
        </Box>
      </HeaderRecipes>
      {isNonEmptyArray(listRecipes) && listRecipes.map((element) => <RecipesCard {...element} />)}
      <Grid templateColumns='repeat(10, 1fr)'>
        {isNonEmptyArray(listTitle) &&
          listTitle?.map((element) => (
            <GridItem key={element.alt + 1} colSpan={5} position='relative'>
              <Link href={element.href}>
                <Image src={element.image} alt={element.alt} />
                <Box className={styles.overlay}></Box>
                <Box className={styles.content}>
                  <Image src={element.icon} alt={element.alt} />
                  <Text>{element.title}</Text>
                </Box>
              </Link>
            </GridItem>
          ))}
      </Grid>

      <Image src='/images/recipes/banner.png' alt='Banner' />
      <Box className={styles.across}></Box>

      <Box padding='0px 15px'>
        <Box className={`${styles.d_fl_btw} ${styles.heading}`}>
          <Text>Recipe recommend for you</Text>
          <Link>View all</Link>
        </Box>
        <GridCardRecipes listItem={listRecommend} />
      </Box>
      <Box padding='0px 15px'>
        <Box className={`${styles.d_fl_btw} ${styles.heading}`}>
          <Text>Featured Recipe</Text>
          <Link>View all</Link>
        </Box>
        <Box>{/* <CarouselCardRecipes listItem={listRecommend} /> */}</Box>
      </Box>

      <Box padding='0px 15px'>
        <Box className={`${styles.d_fl_btw} ${styles.heading}`}>
          <Text>Recipe recommend for you</Text>
          <Link>View all</Link>
        </Box>
        <GridCardRecipes listItem={listRecommend} />
      </Box>
      <MobileNavigation />
    </Box>
  )
}
