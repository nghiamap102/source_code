import React from 'react'
import { Box, Grid, Image, Flex, Text } from '@chakra-ui/react'

export const ArticlesSurvey: React.FC<any> = ({}) => {
  return (
    <>
      <Grid templateColumns='repeat(2, 1fr)' gap={8} my={'27px'}>
        <Box background={'#012CDB'} padding={'18px'}>
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
        <Box background={'#012CDB'} padding={'18px'}>
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
      </Grid>
    </>
  )
}

export default ArticlesSurvey
