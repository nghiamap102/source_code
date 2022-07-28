import React from 'react'
import Rating from 'src/components/Rating'

import { isNonEmptyArray } from 'src/utils'

import { Box, Image, Text, Flex, Button, useDisclosure } from '@chakra-ui/react'
import { ReviewRecipesDetail } from 'src/components/RecipesDetail/Review'
import DialogPopup from 'src/components/DialogPopup'

import styles from './Reviews.module.css'

export const ReviewsRecipes: React.FC<any> = ({ isLogin = false }) => {
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
      imgCmt: []
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
  const Arr = ['All', '5 stars (5)', '4 stars (4)', '3 stars (2)', '2 stars (1)', '1 stars (0)', 'Have picture (1)']
  const { isOpen, onOpen, onClose } = useDisclosure()

  const renderBtnAddReview = () => {
    return (
      <>
        <Box>
          <Flex className={styles.boxAddPhoto}>
            <Box>Rate stars to earn more points</Box>
            <Box>
              <Rating rating={3} />
            </Box>
          </Flex>
        </Box>
        <Box>
          <textarea className={styles.textArea} placeholder='Here is a sample placeholder' />
        </Box>
        <Box>
          <Flex alignItems='center'>
            <Box>
              <Image src='/images/recipesdetail/addPhoto.svg' alt='Add Image' />
            </Box>
            <Box className={styles.textAddPhoto}>
              <Text>Add photos or videos</Text>
            </Box>
          </Flex>
        </Box>
        <Button className={styles.buttonOrange} onClick={onOpen}>
          Submit
        </Button>
      </>
    )
  }

  const rendeRating = () => {
    return (
      <Box className={styles.boxTags}>
        <Rating rating={3} />
        <Box className={styles.tags}>
          {Arr.map((name, index) => (
            <div key={name + index} className={styles.btnTag}>
              {name}
            </div>
          ))}
        </Box>
      </Box>
    )
  }

  const renderReview = () => {
    return (
      <Box>
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
      </Box>
    )
  }

  return (
    <>
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
      <Box className={styles.reviews}>
        <Box marginBottom='20px'>
          <Text className={styles.title}>Reviews</Text>
        </Box>
        <Flex>
          <Box width='50%' paddingRight={42}>
            {renderBtnAddReview()}
          </Box>
          <Box width='50%' className={styles.boxReviews}>
            {rendeRating()}
            {renderReview()}
          </Box>
        </Flex>
      </Box>
    </>
  )
}
