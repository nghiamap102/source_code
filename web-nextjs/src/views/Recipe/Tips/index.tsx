import { Box, Text, Flex, Button, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import styles from './Tips.module.css'
import { CommentRecipes } from 'src/components/RecipesDetail/Comment'
import DialogPopup from 'src/components/DialogPopup'

export const TipsRecipes: React.FC<any> = ({ isLogin = false }) => {
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
  const { isOpen, onOpen, onClose } = useDisclosure()

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

      <Box className={styles.tips}>
        <Box>
          <Text className={styles.title}>Tips & Tricks</Text>
        </Box>
        <Flex marginTop='16px'>
          <Box width='50%' paddingRight={42}>
            <Box>
              <textarea className={styles.textArea} placeholder='Here is a sample placeholder' />
            </Box>
            <Button className={styles.buttonOrange} onClick={onOpen}>
              Submit
            </Button>
          </Box>
          <Box width='50%' className={styles.boxReviews}>
            <Box className={styles.displayFlexCenter} flexDirection='column' margin='5px 0px'>
              {comment?.map((ele, index) => {
                return (
                  <Box key={index}>
                    <CommentRecipes {...ele} />
                  </Box>
                )
              })}
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  )
}
