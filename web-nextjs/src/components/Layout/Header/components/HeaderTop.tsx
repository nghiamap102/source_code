import React from 'react'
import { Box, Container, Flex, Spacer, UnorderedList, ListItem, Link } from '@chakra-ui/react'

const HeaderTop: React.FC = () => {
  return (
    <Box py={3.5} bg='main.whiteGray'>
      <Container>
        <Flex color='main.primary' fontWeight={700} fontSize='caption'>
          <Box>
            <UnorderedList display='flex' listStyleType='none' mx='0'>
              <ListItem mr='30px'>
                <Link href='#'>FREE LOCAL DELIVERY ABOVE ₱150</Link>
              </ListItem>
            </UnorderedList>
          </Box>
          <Spacer />
          <Box>
            <Flex>
              <UnorderedList display='flex' listStyleType='none' mx='0'>
                <ListItem>
                  <Link href='#'>CREDIT CARD PAYMENT NOW AVAILABLE!</Link>
                </ListItem>
              </UnorderedList>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default HeaderTop
