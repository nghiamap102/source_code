import { Box, Image, Text } from '@chakra-ui/react'
import React, { ReactChild, ReactChildren, ReactNode } from 'react'
import styles from './Header.module.css'

export type HeaderProps = {
  background?: string
  width?: string | number
  onClickSearch?: () => void
  onClickCart?: () => void
  children?: ReactChild | ReactChildren | ReactNode
}

export const HeaderRecipes: React.FC<HeaderProps> = ({ children, ...props }) => {
  return (
    <Box className={styles.header} {...props}>
      <Box className={styles.headerInner}>
        <Text>9:41</Text>
        <Box className={styles.d_fl_center}>
          <Image src='/images/recipes/wave.svg' alt='Wave' className={styles.icon} />
          <Image src='/images/recipes/wifi.svg' alt='Wifi' className={styles.icon} />
          <Image src='/images/recipes/battery.svg' alt='Battery' className={styles.icon} />
        </Box>
      </Box>
      {children}
    </Box>
  )
}
