import { Box, Image, Link, Text } from '@chakra-ui/react'
import React from 'react'
import styles from './MobileNavigation.module.css'

type MobileNavigationProps = {}

const MobileNavigation: React.FC<MobileNavigationProps> = ({}) => {
  return (
    <>
      <style jsx global>{`
        body {
          margin-bottom: 60px;
        }
      `}</style>
      <Box className={styles.navigation}>
        <Box className={styles.item}>
          <Link href='/home'>
            <Image src='/images/recipes/home.svg' alt='Home' className={styles.icon} />
            <Text>Home</Text>
          </Link>
        </Box>
        <Box className={styles.item}>
          <Link href='/home'>
            <Image src='/images/recipes/recipes.svg' alt='Recipes' className={styles.icon} />
            <Text>Recipes</Text>
          </Link>
        </Box>
        <Box className={styles.item}>
          <Link href='/home'>
            <Image src='/images/recipes/article.svg' alt='Articles' className={styles.icon} />
            <Text>Articles</Text>
          </Link>
        </Box>
        <Box className={styles.item}>
          <Link href='/home'>
            <Image src='/images/recipes/shop.svg' alt='Shop' className={styles.icon} />
            <Text>Shop</Text>
          </Link>
        </Box>
        <Box className={styles.item}>
          <Link href='/home'>
            <Image src='/images/recipes/chat.svg' alt='Shop' className={styles.icon} />
            <Text>Shop</Text>
          </Link>
        </Box>
        <Box className={styles.item}>
          <Link href='/home'>
            <Image src='/images/recipes/calendar.svg' alt='Shop' className={styles.icon} />
            <Text>Shop</Text>
          </Link>
        </Box>
      </Box>
    </>
  )
}
export default MobileNavigation
