import React from 'react'
import Link from 'next/link'
import API from 'src/common/config'
import ButtonAction from './ButtonAction'
import Navigation from './Navigation'
import MultiLanguage from './MultiLanguage'
import { SearchBar } from 'src/components/SearchBar'
import { onErrorImage } from 'src/utils'
import { Box, Container, Image, Flex } from '@chakra-ui/react'

const MainHeader: React.FC = () => {
  return (
    <Box bg='main.white' py='10px'>
      <Container>
        <MultiLanguage />
        <Flex alignItems='center'>
          <Box cursor='pointer'>
            <Link href='/' passHref>
              <Image src='/images/common/logo-nutri.png' alt='Nutri Asia' fallbackSrc={onErrorImage(112, 60)} />
            </Link>
          </Box>
          <Box flexGrow={2} ml={14}>
            <Navigation />
          </Box>
          <Box mr='30px'>
            <SearchBar
              api={API.MOCK.SEARCH_BAR}
              placeholder='Search'
              borderColor='main.whiteGrey'
              color='main.textDark2'
            />
          </Box>
          <ButtonAction />
        </Flex>
      </Container>
    </Box>
  )
}

export default MainHeader
