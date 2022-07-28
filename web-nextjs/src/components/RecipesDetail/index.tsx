import React, { useRef } from 'react'
import Rating from 'src/components/Rating'
import { isNonEmptyArray, onErrorImage } from 'src/utils'

import { useDisclosure, Box, Button, Checkbox, Image, Link, Text } from '@chakra-ui/react'
import { CarouselCardRecipes } from '../Recipes/CarouselCard'
import { TabRecipes } from 'src/views/Recipe/Tab'
import { ReviewRecipesDetail } from './Review'
import { CommentRecipes } from './Comment'
import { DetailsRecipesProps } from 'src/views/Recipe/RecipesDetail'

import styles from './RecipesDetail.module.css'
import { get } from 'lodash'
import DialogPopup from '../DialogPopup'

export const RecipesDetail: React.FC<DetailsRecipesProps> = ({ recipesDetails, carouselList, banner }) => {
  const comment = [
    {
      reply: false,
      cmt: true,
      rank: 'New menber',
      srcAvatar: '/images/recipesdetail/avatar.png',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua? You can change to Thai Fish Sauce'
    },
    {
      reply: true,
      cmt: false,
      rank: 'New menber',
      srcAvatar: '/images/recipesdetail/avatar.png',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua? You can change to Thai Fish Sauce'
    },
    {
      reply: false,
      cmt: true,
      rank: 'New menber',
      srcAvatar: '/images/recipesdetail/avatar.png',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua? You can change to Thai Fish Sauce'
    },
    {
      reply: true,
      cmt: false,
      rank: 'New menber',
      srcAvatar: '/images/recipesdetail/avatar.png',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua? You can change to Thai Fish Sauce'
    }
  ]

  const review = [
    {
      name: 'Ayaka',
      rank: 'New member',
      date: '21.02.2022',
      rating: 4,
      time: '15:30',
      countLike: 3,
      cmt: 'Good',
      srcAvatar: '',
      imgCmt: [
        {
          src: '/images/recipesdetail/cmt1.png',
          alt: 'Picture'
        },
        {
          src: '/images/recipesdetail/cmt2.png',
          alt: 'Picture'
        },
        {
          src: '/images/recipesdetail/cmt3.png',
          alt: 'Picture'
        },
        {
          src: '/images/recipesdetail/cmt4.png',
          alt: 'Picture'
        }
      ]
    },
    {
      name: 'Ayaka',
      rank: 'New member',
      date: '21.02.2022',
      time: '15:30',
      countLike: 3,
      rating: 4,
      imgCmt: [],
      srcAvatar: '',
      cmt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmo tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
    }
  ]

  const { isOpen, onOpen, onClose } = useDisclosure()
  const user = recipesDetails?.uid
  const fieldCategory = recipesDetails?.field_category
  const cookingTime = recipesDetails?.field_cooking_time
  const tag = recipesDetails?.field_special_tags
  const fileThumbnail = recipesDetails?.field_thumbnail
  const cancelRef = useRef(null)

  const onClickBack = () => {}

  const saveRecipes = () => {}

  const dialog = () => {
    return (
      <DialogPopup
        titlePopup='Successful!'
        isDesc
        isCancelBtn
        isOkBtn
        contentCancelBtn='No'
        contentOkBtn='Yes'
        descPopup='This recipe was saved successfully! Would you like to move to your folder now?'
        isOpen={isOpen}
        onClose={onClose}
      />
    )
  }

  const renderHeader = () => {
    return (
      <>
        <Box className={styles.header}>
          <Box className={styles.headerInner}>
            <Box className={styles.backWrapper} onClick={onClickBack}>
              <Image src='/images/recipesdetail/back.svg' alt='Back' />
            </Box>
          </Box>
        </Box>

        <Box position='relative'>
          <Image src={fileThumbnail?.field_media_image?.uri} fallbackSrc={onErrorImage(375, 720)} alt='Recipes' />
          <Box className={styles.decription}>
            <Text className={styles.name}>{recipesDetails?.title}</Text>
            <Text className={styles.time}>{recipesDetails?.created}</Text>
            <Button className={styles.buttonWhite} backgroundColor='transparent'>
              <Link href='#' className={styles.beginner}>
                {fieldCategory?.name}
              </Link>
            </Button>
            <Box className={styles.saveRecipes} onClick={saveRecipes}>
              <Image src='/images/recipesdetail/save.svg' alt='Save' onClick={onOpen} />
            </Box>
          </Box>
        </Box>
      </>
    )
  }

  const renderUser = () => {
    return (
      <Box className={styles.displayFlexBtw} padding='5px 0px' marginBottom='13px'>
        <Box className={styles.displayFlexStart}>
          <Box className={styles.avatarWrapper}>
            <Image src='/images/recipesdetail/avatar.png' alt='Avatar' />
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
    )
  }

  const renderCookingTime = () => {
    return (
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
    )
  }

  const renderTapRecipe = () => {
    return (
      <>
        {' '}
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
        <TabRecipes />
      </>
    )
  }

  const renderTags = () => {
    return (
      <>
        <Box display='flex' paddingLeft='13px' alignItems='center'>
          <Text className={styles.titleSmall}>Tags:</Text>
          {isNonEmptyArray(tag) &&
            tag.map((ele: any, index: Number) => (
              <Box key={ele.name + index} className={styles.itemTag}>
                <Text className={styles.text}>{ele.name}</Text>
              </Box>
            ))}
        </Box>
      </>
    )
  }

  const renderComment = () => {
    return (
      <>
        {' '}
        <Text className={styles.title}>Tips & Tricks</Text>
        <Box className={styles.displayFlexCenter} flexDirection='column' margin='5px 0px'>
          {comment?.map((ele, index) => {
            return (
              <Box key={index}>
                <CommentRecipes
                  cmt={ele.cmt}
                  reply={ele.reply}
                  srcAvatar={ele.srcAvatar}
                  rank={ele.rank}
                  content={ele.content}
                />
              </Box>
            )
          })}
        </Box>
        <Button
          backgroundColor='transparent'
          className={styles.buttonOrange}
          style={{ width: '100%', borderRadius: '8px', fontWeight: 700, fontSize: '16px' }}
        >
          See all Tips & Tricks
        </Button>
      </>
    )
  }

  const renderReview = () => {
    return (
      <>
        <Text className={styles.title}>Reviews</Text>
        <Box className={styles.displayFlexStart}>
          <Rating rating={4} />
          <Text padding='0px 12px' className={styles.text}>
            4.3/5 (11 reviews)
          </Text>
        </Box>
        <Text className={styles.textCmt}>Write a review!!</Text>

        {isNonEmptyArray(review) &&
          review.map((ele, index) => {
            const initialComment = {
              name: '',
              rank: '',
              date: '',
              time: '',
              rating: 0,
              countLike: 0,
              srcAvatar: '',
              imgCmt: '',
              cmt: ''
            }
            const { name, rank, date, time, countLike, rating, srcAvatar, imgCmt, cmt } = ele || initialComment
            const val = {
              name,
              rank,
              date,
              time,
              countLike,
              rating,
              srcAvatar,
              imgCmt,
              cmt
            }
            return <ReviewRecipesDetail key={name + index} {...val} />
          })}
        <Button
          backgroundColor='transparent'
          className={styles.buttonOrange}
          style={{ width: '100%', borderRadius: '8px', fontWeight: 700, fontSize: '16px' }}
        >
          See all review
        </Button>
      </>
    )
  }

  const renderRelated = () => {
    return (
      <>
        <Box className={styles.title} padding='3px 0px'>
          <Text>Related</Text>
        </Box>
        <Box>
          <CarouselCardRecipes {...carouselList} />
        </Box>
      </>
    )
  }

  return (
    <>
      {dialog()}
      <Box position='relative' overflow='hidden'>
        {renderHeader()}
        <Box padding='13px'>
          {renderUser()}
          {renderCookingTime()}
          {renderTapRecipe()}
        </Box>
        {renderTags()}

        <Box padding='13px'>{renderComment()}</Box>

        <Box padding='13px'>{renderReview()}</Box>

        <Box padding='13px'>{renderRelated()}</Box>

        <Image
          src={get(banner, 'results')?.field_ad_image_desktop?.uri}
          fallbackSrc={onErrorImage(1138, 117)}
          alt='Ads Banner'
        />
      </Box>
    </>
  )
}
