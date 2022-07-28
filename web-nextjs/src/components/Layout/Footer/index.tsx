import React from 'react'
import { useDeviceDetect } from 'src/hooks'
import { Container, Box, Grid, GridItem, Image, Flex, Text, Link } from '@chakra-ui/react'
import Navigation from './components/Navigation'
import Copyright from './components/Copyright'
import { IFooterNavList } from './Footer.d'

import { isNonEmptyArray, onErrorImage } from 'src/utils'
import { mainColor } from 'src/theme/theme'

const Footer: React.FC<IFooterNavList> = ({ footerNavigation }) => {
  const { isDesktop } = useDeviceDetect()

  const paymentList = ['jxt', 'flash', 'entrego', 'ninjaxpress']
  const socialMedia = ['facebook2', 'youtube', 'instagram']

  const shipping = (
    <Grid templateColumns='repeat(6, 1fr)' gap={4}>
      {isNonEmptyArray(paymentList) &&
        paymentList.map((payment) => (
          <GridItem key={payment}>
            <Link href={`${payment}.html`} textDecoration='underline'>
              <Image src={`/icons/${payment}.png`} alt={payment} fallbackSrc={onErrorImage(62, 28)} />
            </Link>
          </GridItem>
        ))}
    </Grid>
  )

  const social = (
    <Flex
      justifyContent={{
        base: 'center',
        md: 'space-between'
      }}
    >
      {isNonEmptyArray(socialMedia) &&
        socialMedia.map((item) => (
          <Box key={item}>
            <Link href={`${item}.html`} textDecoration='underline'>
              <Image src={`/icons/${item}.png`} alt={item} />
            </Link>
          </Box>
        ))}
    </Flex>
  )

  const footerApp = (
    <Box>
      <Text fontWeight={500} mb={4}>
        Nom App
      </Text>
      <Flex
        flexDirection={{
          base: 'row',
          md: 'column'
        }}
        justifyContent={{
          base: 'center',
          md: 'flex-start'
        }}
      >
        <Box mb={2} mr={2}>
          <Link href='https://www.apple.com/app-store' display='inline-block'>
            <Image src='/images/footer/app-store.png' alt='App Store' fallbackSrc={onErrorImage(132, 38)} />
          </Link>
        </Box>
        <Box mb={2}>
          <Link href='https://play.google.com/store' display='inline-block'>
            <Image src='/images/footer/google-play.png' alt='Google Play' fallbackSrc={onErrorImage(132, 38)} />
          </Link>
        </Box>
      </Flex>
    </Box>
  )

  return (
    <>
      <Box>
        <Box bg='main.primary' color='main.white' pt={10} pb={6}>
          <Container>
            <Flex
              flexDirection={{
                base: 'column',
                md: 'row'
              }}
            >
              <Box
                flexBasis='20%'
                margin={{
                  base: '0 auto',
                  md: '0'
                }}
              >
                <Image src='/images/common/logo-footer-nutri.png' alt='logo' />
              </Box>
              <Box
                flexBasis='80%'
                textAlign={{
                  base: 'center',
                  md: 'left'
                }}
              >
                <Flex
                  flexDirection={{
                    base: 'column',
                    md: 'row'
                  }}
                  justifyContent={{
                    base: 'space-between'
                  }}
                >
                  <Box flexBasis='80%'>
                    <Navigation footerNavigation={footerNavigation} />
                  </Box>

                  <Box flexBasis='20%'>{footerApp}</Box>
                </Flex>
                <Flex
                  justifyContent={{
                    base: 'center',
                    md: 'flex-start'
                  }}
                >
                  <Box
                    flexBasis='80%'
                    display={{
                      base: 'none',
                      md: 'block'
                    }}
                  >
                    <>
                      <Box>
                        <Text fontWeight={500} mb={2}>
                          Delivery Service
                        </Text>
                      </Box>
                      {shipping}
                    </>
                  </Box>
                  <Box
                    flexBasis={{
                      md: '20%'
                    }}
                  >
                    <Box>
                      <Text fontWeight={500} mb={2}>
                        Follow us
                      </Text>
                    </Box>
                    {social}
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Container>
        </Box>

        <Container>
          <Box py={2}>
            <Copyright />
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default Footer
