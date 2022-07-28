import React from 'react'
import { Box, Flex, Image, Link } from '@chakra-ui/react'
import { onErrorImage } from 'src/utils'
import styles from '../Header.module.css'

const ButtonAction: React.FC = () => {
  return (
    <Box>
      <Flex alignItems='center'>
        <Box
          width='30px'
          height='30px'
          p={1.5}
          position='relative'
          border='1px'
          borderColor='main.whiteGrey'
          borderRadius='50%'
          ml={4}
        >
          <Link href='#'>
            <Image className={styles.icon} src='/icons/wishlist.svg' alt='wishlist' fallbackSrc={onErrorImage(20)} />
          </Link>
        </Box>
        <Box
          width='30px'
          height='30px'
          p={1.5}
          position='relative'
          border='1px'
          borderColor='main.whiteGrey'
          borderRadius='50%'
          ml={4}
        >
          <Link href='#'>
            <Image className={styles.icon} src='/icons/cart.svg' alt='cart' fallbackSrc={onErrorImage(20)} />
          </Link>
        </Box>
        <Box
          width='30px'
          height='30px'
          p={1.5}
          position='relative'
          border='1px'
          borderColor='main.whiteGrey'
          borderRadius='50%'
          ml={4}
        >
          <Link href='#'>
            <Image className={styles.icon} src='/icons/chat.svg' alt='chat' fallbackSrc={onErrorImage(20)} />
          </Link>
        </Box>
      </Flex>
    </Box>
  )
}

export default ButtonAction
