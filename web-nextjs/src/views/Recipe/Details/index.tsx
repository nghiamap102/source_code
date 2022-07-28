import React from 'react'
import Rating from 'src/components/Rating'

import { Box, Button, Checkbox, Image, Link, Text, Flex, useDisclosure } from '@chakra-ui/react'
import { CarouselCardRecipes } from 'src/components/Recipes/CarouselCard'
import { TabRecipes } from 'src/views/Recipe/Tab'
import DialogPopup from 'src/components/DialogPopup'

import { DetailsRecipesProps } from '../RecipesDetail'

import styles from './Details.module.css'

import { isNonEmptyArray, onErrorImage } from 'src/utils'

export const DetailsRecipesDetail: React.FC<DetailsRecipesProps> = ({
  recipesDetails,
  carouselList,
  isLogin = false
}) => {
  const user = recipesDetails?.uid
  const fieldCategory = recipesDetails?.field_category
  const cookingTime = recipesDetails?.field_cooking_time
  const tag = recipesDetails?.field_special_tags
  const fileThumbnail = recipesDetails?.field_thumbnail?.field_media_image

  const { isOpen, onOpen, onClose } = useDisclosure()
  const renderDetailRecipe = () => {
    return (
      <Box>
        <Flex justifyContent='space-between'>
          <Box>
            <Text className={styles.name}>{recipesDetails?.title}</Text>
            <Text className={styles.time}>{recipesDetails?.created}</Text>
            <Button className={styles.buttonWhite} backgroundColor='transparent'>
              <Link href='#' className={styles.beginner}>
                {fieldCategory?.name}
              </Link>
            </Button>
          </Box>

          <Box>
            <Image src='/images/save.svg' alt='Save' onClick={onOpen} />
          </Box>
        </Flex>
      </Box>
    )
  }

  const renderUser = () => {
    return (
      <>
        <Box className={styles.displayFlexBtw} padding='5px 0px' marginBottom='13px'>
          <Box className={styles.displayFlexStart}>
            <Box className={styles.avatarWrapper}>
              <Image src={user?.user_picture} alt='Avatar' fallbackSrc={onErrorImage(40, 40)} />
            </Box>
            <Box marginLeft='10px'>
              <Text className={styles.nameUser}>{user?.name}</Text>
              <Text className={styles.rank}>Gold member</Text>
            </Box>
          </Box>
          <Box className={styles.displayFlexStart}>
            <Box className={`${styles.item} ${styles.displayFlexCenter}`}>
              <Image src='/images/recipesdetail/share.svg' alt='Share' />
              <Text>1.5k</Text>
            </Box>
            <Box className={`${styles.item} ${styles.displayFlexCenter}`}>
              <Image src='/icons/chat.svg' alt='Comment' />
              <Text>2</Text>
            </Box>
            <Box className={`${styles.item} ${styles.displayFlexCenter}`}>
              <Image src='/icons/wishlist.svg' alt='Heart' />
              <Text>1.1k</Text>
            </Box>
            <Box className={`${styles.item} ${styles.displayFlexCenter}`}>
              <Image src='/images/recipesdetail/copy.svg' alt='Copy' />
            </Box>
          </Box>
        </Box>
      </>
    )
  }

  const renderRate = () => {
    return (
      <>
        <Box className={styles.displayFlexBtw} padding='15px 0px'>
          <Box>
            <Checkbox>
              <Text className={styles.text}>Mark as Cooked</Text>
            </Checkbox>
          </Box>
          <Box className={styles.displayFlexCenter}>
            <Rating rating={4} />
            <Text padding='0 8px'>(1276)</Text>
          </Box>
        </Box>
      </>
    )
  }

  const renderCookingRecipe = () => {
    return (
      <>
        <Box className={`${styles.note} ${styles.displayFlexCenter}`} flexDirection='column'>
          <Text className={styles.heading} dangerouslySetInnerHTML={{ __html: cookingTime?.description }}></Text>
          <Box className={styles.displayFlexBtw}>
            <Box className={styles.itemNote}>
              <Text>Prep time:</Text>
              <Text className={styles.subItem}>{cookingTime?.name}</Text>
            </Box>
            <Box className={styles.itemNote}>
              <Text>Total Cost</Text>
              <Text className={styles.subItem}>{cookingTime?.name}</Text>
            </Box>
            <Box className={styles.itemNote}>
              <Text>Cooking time:</Text>
              <Text className={styles.subItem}>{cookingTime?.name}</Text>
            </Box>
            <Box className={styles.itemNote}>
              <Text>Servings:</Text>
              <Box className={`${styles.displayFlexCenter} ${styles.subItem}`}>
                <Box position='relative' padding='0px 8px'>
                  <Image src='/images/recipesdetail/minus.svg' alt='Minus' />
                </Box>
                <Text>6</Text>
                <Box position='relative' padding='0px 8px'>
                  <Image src='/images/recipesdetail/minus.svg' alt='Minus' />
                  <Image src='/images/recipesdetail/vertical.svg' alt='Vertical' className={styles.plus} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    )
  }

  const renderTag = () => {
    return (
      <Box className={styles.boxTag}>
        <Text className={styles.titleSmall}>Tags:</Text>
        {isNonEmptyArray(tag) &&
          tag?.map((ele: any, index: Number) => (
            <Box className={styles.itemTag} key={ele.name + index}>
              <Text className={styles.text}>{ele.name}</Text>
            </Box>
          ))}
      </Box>
    )
  }

  return (
    <Box marginBottom='31px'>
      {!isLogin && (
        <DialogPopup
          titlePopup='Welcome, Guest!'
          isDesc
          isOkBtn
          isDescLogin
          contentOkBtn='Login'
          descPopup='You need an account to continue!'
          isOpen={isOpen}
          onClose={onClose}
          size='2xl'
        />
      )}
      <Flex>
        <Box width='50%' paddingRight='42px'>
          <Box className={styles.backWrapper}>
            <Image
              className={styles.imgRecipesDetails}
              src={fileThumbnail?.field_media_image?.uri}
              fallbackSrc={onErrorImage(550, 373)}
              alt='Recipes'
            />
          </Box>
          <Box className={styles.relatedBox}>
            <CarouselCardRecipes {...carouselList} />
          </Box>
        </Box>
        <Box width='50%'>
          {renderDetailRecipe()}
          <Box padding='13px'>
            {renderUser()}
            {renderCookingRecipe()}
            {renderRate()}
            <TabRecipes />
          </Box>
          {renderTag()}
        </Box>
      </Flex>
    </Box>
  )
}
