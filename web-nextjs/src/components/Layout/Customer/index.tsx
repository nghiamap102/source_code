import { Stack, Box, Container } from '@chakra-ui/react'
import React, { FC } from 'react'

import Sidebar from './Sidebar'
import Fold from 'src/components/Banner/Fold'

interface Props {
  children: React.ReactNode
  showFooter?: boolean
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <Box bg='sub.100' minH='calc(100vh - 154px - 330.02px)'>
      <Fold />
      <Box py='3rem'>
        <Container maxW={'6xl'}>
          <Stack direction={['column', 'row']}>
            <Box display={{ base: 'none', md: 'block' }} w='240px'>
              <Sidebar />
            </Box>
            <Box w={{ base: '100%', md: 'calc(100% - 240px)' }}>{children}</Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}

export default Layout
