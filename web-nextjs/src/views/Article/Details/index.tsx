import { Box, Button, Image, Text, useDisclosure, Grid, Flex } from '@chakra-ui/react'
import React from 'react'
import { CommentRecipes } from 'src/components/RecipesDetail/Comment'
import { isNonEmptyArray, onErrorImage } from 'src/utils'
import { IArticles } from 'src/utils/Module'
import styles from './Articles.module.css'

export const ArticlesDetail: React.FC<IArticles> = ({ ...recipesArticles }) => {
  const fieldImage = recipesArticles?.field_image
  const tag = recipesArticles?.field_tags
  const user = recipesArticles?.uid
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
  const renderAuthor = () => {
    return (
      <Box padding='5px 0px' mb={'30px'}>
        <Box className={styles.displayFlexStart}>
          <Box className={styles.avatarWrapper}>
            <Image alt='Avatar' fallbackSrc={onErrorImage(40, 40)} />
          </Box>
          <Box marginLeft='10px'>
            <Text className={styles.nameUser}>Alex</Text>
            <Text className={styles.rank}>Gold member</Text>
          </Box>
        </Box>
        <Box className={styles.displayFlexStart} mt={'8px'}>
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

  const renderTag = () => {
    return (
      <Box className={styles.boxTag} mt={3} mb={3}>
        <Text className={styles.titleSmall}>Tags:</Text>
        {tag &&
          tag?.map((ele: any, index: Number) => (
            <Box className={styles.itemTag} key={ele.name + index}>
              <Text className={styles.text}>{ele.name}</Text>
            </Box>
          ))}
      </Box>
    )
  }

  return (
    <>
      <Box marginBottom='31px'>
        <Image src={fieldImage?.absolute_url} fallbackSrc={onErrorImage(1920, 117)} alt='Ads Banner' />
      </Box>
      <Box>
        <Text className={styles.title}>{recipesArticles?.title}</Text>
      </Box>
      {renderAuthor()}
      <Box>
        <Box dangerouslySetInnerHTML={{ __html: recipesArticles?.body || '' }}></Box>
      </Box>
      <Flex>
        <Box mr={10}>
          {renderTag()}
          <Box className={styles.displayFlexCenter} flexDirection='column' alignItems={'flex-start'}>
            {comment?.map((ele, index) => {
              return (
                <Box key={index}>
                  <CommentRecipes {...ele} />
                </Box>
              )
            })}
          </Box>
        </Box>
        <Box background={'#012CDB'} padding={'18px'} w={'362px'} h={'fit-content'}>
          <Flex>
            <Image src='/icons/sun.svg' alt='Sun' />
            <Box ml={3}>
              <Text color={'white'} fontSize={'18px'} fontWeight={600} lineHeight={'26px'}>
                Survey
              </Text>
            </Box>
          </Flex>
          <Box mt={'16px'}>
            <Text color={'white'} fontSize={'15px'} fontWeight={600} lineHeight={'18px'}>
              Do you like Ketchup?
            </Text>
          </Box>
          <Grid templateColumns='repeat(5, 1fr)' gap={8} mt={'8px'}>
            <Image src='/icons/sad.svg' alt='Sun' />
            <Image src='/icons/thinking.svg' alt='Sun' />
            <Image src='/icons/slightly.svg' alt='Sun' />
            <Image src='/icons/grinning.svg' alt='Sun' />
            <Image src='/icons/smile.svg' alt='Sun' />
          </Grid>
        </Box>
      </Flex>
      <Box>
        <textarea className={styles.textArea} placeholder='Here is a sample placeholder' />
      </Box>
      <Button className={styles.buttonOrange} onClick={onOpen}>
        Submit
      </Button>
    </>
  )
}
