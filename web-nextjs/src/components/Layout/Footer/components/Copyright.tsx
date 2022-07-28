import React from 'react'
import { Box, Link, Grid, GridItem, Image, Text, Flex } from '@chakra-ui/react'
import { isNonEmptyArray, onErrorImage } from 'src/utils'

const Copyright: React.FC = () => {
  const paymentList = ['visa', 'mastercard', 'jcb', 'american-express', 'gcash']

  return (
    <Grid
      templateColumns={{
        md: 'repeat(5, 1fr)'
      }}
      justifyContent={{
        base: 'center',
        md: 'start'
      }}
      gap={4}
    >
      <GridItem
        colSpan={{
          md: 4
        }}
      >
        <Flex color='main.shuttleGrey' flexWrap='wrap'>
          <Text mr={4}>Copyright © 2021 Nutri. All rights reserved.</Text>
          <Link href='nutri-site-use.html' textDecoration='underline'>
            Site Use
          </Link>
        </Flex>
      </GridItem>
      <GridItem
        colStart={{
          md: 5
        }}
        colEnd={{
          md: 12
        }}
      >
        <Flex
          justifyContent={{
            base: 'space-between',
            md: 'flex-start'
          }}
        >
          {isNonEmptyArray(paymentList) &&
            paymentList.map((payment) => (
              <Box key={payment} ml={'20px'}>
                <Link href={`${payment}.html`} textDecoration='underline'>
                  <Image src={`/icons/${payment}.png`} alt={payment} fallbackSrc={onErrorImage(62, 28)} />
                </Link>
              </Box>
            ))}
        </Flex>
      </GridItem>
    </Grid>
  )
}

export default Copyright
