import React from 'react'
import { Box } from '@chakra-ui/react'
import HeaderTop from './components/HeaderTop'
import MainHeader from './components/MainHeader'
import HeaderMobile from './components/HeaderMobile'

const Header: React.FC = () => {
  return (
    <>
      <Box>
        <Box
          display={{
            base: 'none',
            md: 'block'
          }}
        >
          <HeaderTop />
          <MainHeader />
        </Box>
        <Box
          display={{
            base: 'block',
            md: 'none'
          }}
        >
          <HeaderMobile />
        </Box>
      </Box>
    </>
  )
}

export default Header
