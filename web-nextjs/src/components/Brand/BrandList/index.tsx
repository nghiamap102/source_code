import React from 'react'
import {
  Box,
  Link,
  Text,
  Flex,
  Image,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure
} from '@chakra-ui/react'

import { IBrandList } from 'src/components/Brand/BrandList/BrandList.d'
import { isNonEmptyArray } from 'src/utils'
import { SwiperSlide } from 'swiper/react'
import { useDeviceDetect } from 'src/hooks'
import Carousel from 'src/components/Carousel'

const BrandList: React.FC<IBrandList> = ({ brandList = [] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isMobile } = useDeviceDetect()
  return (
    <>
      <Box>
        {isNonEmptyArray(brandList) && (
          <>
            {isMobile && (
              <Text fontSize='lg' fontWeight={600} color='main.textDark2' mb={4}>
                Brands
              </Text>
            )}
            <Box>
              <Flex>
                {isMobile && (
                  <Flex basis='10%' borderRight='1px' borderColor='main.grayCool' pr={4} mr={4}>
                    <Button bg='main.primary' borderRadius='50%' onClick={onOpen}>
                      <Image src='/icons/hamburger.png' alt='Brand button' />
                    </Button>
                  </Flex>
                )}

                <Carousel slidesPerView={isMobile ? 3.5 : 10}>
                  {isNonEmptyArray(brandList) &&
                    brandList.map((element, i) => (
                      <SwiperSlide>
                        <Box key={i}>
                          <Link href={element.navigationLink}>
                            <Image src={element.brandImage} alt={element.brandName} />
                          </Link>
                        </Box>
                      </SwiperSlide>
                    ))}
                </Carousel>
              </Flex>
            </Box>
            <Drawer placement='bottom' onClose={onClose} isOpen={isOpen} size='md'>
              <DrawerOverlay />
              <DrawerContent borderTopLeftRadius='30px' borderTopRightRadius='30px'>
                <DrawerHeader>
                  <Text fontSize='lg' fontWeight={600} color='main.textDark2' align='center'>
                    Brands
                  </Text>
                </DrawerHeader>
                <DrawerBody>
                  <Flex justifyContent='space-between' flexWrap='wrap'>
                    {Array.isArray(brandList) &&
                      brandList.length > 0 &&
                      brandList.map((element, i) => (
                        <Flex key={i} px={3} flexBasis='25%' flexGrow={0} flexShrink={0} mx='auto'>
                          <Link href={element.navigationLink}>
                            <Image src={element.brandImage} alt={element.brandName} />
                          </Link>
                        </Flex>
                      ))}
                  </Flex>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        )}
      </Box>
    </>
  )
}

export default BrandList
