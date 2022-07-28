import React from 'react'
import Link from 'next/link'
import { Box, Image, Link as RedLink, Text, Button } from '@chakra-ui/react'
import Rating from 'src/components/Rating'
import { ButtonTransparentHover } from 'src/theme/components'
import { mainColor } from 'src/theme/theme'
import styles from './RecipesCard.module.css'
import { onErrorImage } from 'src/utils'
import { postToBookmark } from 'src/common/service/product-service/productService'
import { RECIPES_URL, ARTICLES_URL } from 'src/common/constants/router'

export type IDataRecipes = {
  name?: string
  star?: number
  countStar?: number
  date?: string
  time?: string
  author?: string
  srcAuthor?: string
  href?: string
  src?: string
  alt?: string
  element?: any
  isArticle?: boolean
}

export const RecipesCard: React.FC<IDataRecipes> = ({
  name,
  star,
  countStar,
  date,
  time,
  author,
  srcAuthor,
  href,
  src,
  alt,
  element,
  isArticle = false
}) => {
  const mediaImage = element?.field_image
  const counting = element?.counting
  const user = element?.uid
  const entity_id = element?.entity_id
  const urlDetailPage = isArticle ? `${ARTICLES_URL}/${entity_id}` : `${RECIPES_URL}/${entity_id}`

  return (
    <>
      <Box key={entity_id} position='relative' borderRadius='2px'>
        <Link href={urlDetailPage} passHref>
          <Box>
            <Image
              src={mediaImage?.absolute_url || src}
              fallbackSrc={'/images/recipes/recommend1.png' || onErrorImage(212, 305)}
              alt={mediaImage?.filename}
              className={styles.image}
              w='100%'
            />
            <Box className={styles.decription}>
              <RedLink>
                <Text className={styles.name}>{element?.title || name}</Text>
              </RedLink>
              {!isArticle && (
                <>
                  <Box className={styles.rating}>
                    <Rating rating={4 || element?.field_five_start_rating || star} />
                    <Text className={styles.count}>({counting?.number_of_review || 0})</Text>
                  </Box>
                  <Text className={styles.time}>{element?.created || date} 1</Text>
                  <Text className={styles.author} color={mainColor.orange}>
                    By{' '}
                    <RedLink>
                      <>
                        {user?.field_first_name} {user?.field_last_name}
                      </>
                    </RedLink>
                  </Text>
                </>
              )}
            </Box>

            <Box className={styles.action}>
              <Button
                size='xs'
                variant='ghost'
                onClick={(e) => {
                  e.stopPropagation()
                  postToBookmark({ entity_id })
                }}
                _hover={ButtonTransparentHover}
              >
                <Image src='/icons/bookmark.svg' alt='Bookmark' />
              </Button>
              <Button size='xs' variant='ghost' _hover={ButtonTransparentHover}>
                <Image src='/icons/share.svg' alt='Share' />
              </Button>
            </Box>
          </Box>
        </Link>
      </Box>
    </>
  )
}
