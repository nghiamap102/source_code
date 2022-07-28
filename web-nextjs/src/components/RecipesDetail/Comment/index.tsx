import React, { useRef } from 'react'
import {
  Box,
  Image,
  Text,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  Flex
} from '@chakra-ui/react'
import { mainColor } from 'src/theme/theme'
import styles from './Comment.module.css'

type CommentRecipesProps = {
  cmt?: boolean
  reply?: boolean
  srcAvatar?: string
  rank: string
  content: string
}
export const CommentRecipes: React.FC<CommentRecipesProps> = ({ cmt, reply, srcAvatar, rank, content }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)
  const renderDialogReply = () => {
    return (
      <AlertDialog onClose={onClose} isOpen={isOpen} isCentered leastDestructiveRef={cancelRef}>
        <AlertDialogOverlay />
        <AlertDialogContent className={styles.alertContent}>
          <AlertDialogBody>
            <>
              <Flex className={styles.dialogCmt}>
                <Box className={styles.titleDialog}>
                  Repling to <span className={styles.userNameReply}>Ayaka</span>
                </Box>
                <Box>
                  <Image onClick={onClose} src='/images/icon-close.svg' alt='Close' />
                </Box>
              </Flex>
              <Box mt={2}>
                <Flex className={styles.userCmt}>
                  <Box className={styles.avatarWrapper} height='36px' width='36px'>
                    {srcAvatar && <Image src={srcAvatar} alt='Avatar' />}
                    {!srcAvatar && <Image src='/images/recipesdetail/avatar.png' alt='Avatar' />}
                  </Box>
                  <Box ml={1} className={styles.userName}>
                    Ayaka
                  </Box>
                </Flex>
              </Box>
              <Box mt={2}>
                <textarea className={styles.textArea} placeholder='Here is a sample placeholder' />
              </Box>
              <Box mt={2} className={styles.text}>
                By clicking Post you agree to NutriAsia community <span className={styles.desReply}>Guidelines</span>{' '}
                and <span className={styles.desReply}>Terms of Use</span>.
              </Box>
              <Box mt={4}>
                <button className={styles.btnAlert} ref={cancelRef} onClick={onClose}>
                  Submit
                </button>
              </Box>
            </>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  return (
    <Box>
      {renderDialogReply()}
      {cmt && (
        <Box className={styles.dislayFlexCenter} alignItems='start' margin='8px 0px'>
          <Box className={styles.dislayFlexCenter} marginRight='10px'>
            <Box className={styles.avatarWrapper} height='36px' width='36px'>
              {srcAvatar && <Image src={srcAvatar} alt='Avatar' />}
              {!srcAvatar && <Image src='/images/recipesdetail/avatar.png' alt='Avatar' />}
            </Box>
          </Box>
          <Box>
            <Text className={styles.titleSmall}>
              Ayaka <span className={`${styles.subText} ${styles.pl_5} `}>{rank}</span>
            </Text>
            <Text className={styles.text}>{content}</Text>
            <Box className={styles.displayFlexBtw} margin='6px 0px'>
              <Text className={styles.subText} color={mainColor.gray}>
                21.02.2022 - 15:30
              </Text>
              <Box className={styles.dislayFlexCenter}>
                <Box className={`${styles.dislayFlexCenter} ${styles.icon} `}>
                  <Image src='/images/recipesdetail/like.svg' alt='Like' />
                  <span className={`${styles.subText} ${styles.pl_5}`}>10</span>
                </Box>
                <Box onClick={onOpen} className={styles.icon}>
                  <Image src='/icons/chat.svg' alt='Like' />
                </Box>
                <Box className={styles.icon}>
                  <Image src='/images/recipesdetail/report.svg' alt='Like' />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {reply && (
        <Box className={styles.dislayFlexCenter} alignItems='start' margin='8px 0px'>
          <Box className={styles.dislayFlexCenter} marginRight='10px' marginLeft='46px'>
            <Box className={styles.avatarWrapper} height='36px' width='36px'>
              <Image src='/images/recipesdetail/customer1.png' alt='Avatar' />
            </Box>
          </Box>
          <Box>
            <Text className={styles.titleSmall}>
              Ayaka <span className={styles.subText}>New member</span>
            </Text>
            <Text className={styles.text}>{content}</Text>
            <Box className={styles.displayFlexBtw} margin='6px 0px'>
              <Text className={styles.subText} color={mainColor.gray}>
                21.02.2022 - 15:30
              </Text>
              <Box className={styles.dislayFlexCenter}>
                <Box className={`${styles.dislayFlexCenter} ${styles.icon} `}>
                  <Image src='/images/recipesdetail/like.svg' alt='Like' />
                  <span className={`${styles.subText} ${styles.pl_5}`}>10</span>
                </Box>
                <Box className={styles.icon}>
                  <Image src='/icons/chat.svg' alt='Like' />
                </Box>
                <Box className={styles.icon}>
                  <Image src='/images/recipesdetail/report.svg' alt='Like' />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}
