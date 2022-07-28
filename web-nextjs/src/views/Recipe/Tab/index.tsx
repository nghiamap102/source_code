import React from 'react'
import {
  Box,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  AccordionPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  Flex,
  Select
} from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Swiper, SwiperSlide } from 'swiper/react'

import styles from './Tab.module.css'
import 'swiper/css'
import 'swiper/css/free-mode'
import { isNonEmptyArray } from 'src/utils'

export const TabRecipes: React.FC<any> = ({}) => {
  const cookingRecipe = [
    {
      title: '2 boneless, skinless chicken breasts',
      more: [
        {
          productName: 'Locally Tamarind My Bell 240mL Alu Can',
          productImage: '/images/product/product-card/draft-1.png',
          price: 'S$29.90',
          priceDiscount: 'S$49.90'
        }
      ]
    },
    {
      title: '4 boneless, skinless chicken thighs',
      more: [
        {
          productName: 'Locally Tamarind My Bell 240mL Alu Can',
          productImage: '/images/product/product-card/draft-1.png',
          price: 'S$29.90',
          priceDiscount: 'S$49.90'
        },
        {
          productName: 'Locally Tamarind My Bell 240mL Alu Can',
          productImage: '/images/product/product-card/draft-1.png',
          price: 'S$29.90',
          priceDiscount: 'S$49.90'
        }
      ]
    },
    {
      title: '1 cup salsa, homemade or store-bought'
    },
    {
      title: '1/2 cup chicken stock'
    },
    {
      title: '1 teaspoon chili powder'
    },
    {
      title: '1/2 teaspoon ground cumin'
    },
    {
      title: 'Kosher salt and freshly ground black pepper, to taste'
    },
    {
      title: '12 ounces tortilla chips'
    }
  ]

  const renderMiniCart = (productArr: {}[]) => {
    return (
      <Swiper slidesPerView={1.5} spaceBetween={30} modules={[]} className='mySwiper'>
        {productArr.map((product: any, index: number) => (
          <SwiperSlide key={index}>
            <Box mt={6} mb={6}>
              <Flex>
                <Box className={styles.image} borderWidth='1px' borderRadius='base'>
                  <Image src={product.productImage} alt={product.productName} />
                  <Box className={styles.wishlist}>
                    <Image src='/images/product/product-card/wishlist.svg' alt='wishlist' />
                  </Box>
                </Box>
                <Box ml={4} className={styles.miniCartDetail}>
                  <Box className={styles.content} py={1} color='main.textDark3'>
                    {product.productName}
                  </Box>
                  <Select className={styles.size} placeholder='Select option'>
                    <option defaultValue='option1'>Option 1</option>
                    <option defaultValue='option2'>Option 2</option>
                    <option defaultValue='option3'>Option 3</option>
                  </Select>
                  <Box className={styles.price} py={1} color='main.gray'>
                    {product.priceDiscount && <span className={styles.discount}>{product.priceDiscount}</span>}
                    {product.price}
                  </Box>
                  <AddIcon className={styles.icon} />
                </Box>
              </Flex>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    )
  }

  const renderNeed = () => {
    return (
      <TabPanel>
        {isNonEmptyArray(cookingRecipe) &&
          cookingRecipe.map((ele, index) => (
            <Box key={ele.title + index}>
              {ele.more && (
                <Accordion allowMultiple>
                  <AccordionItem>
                    {({ isExpanded }) => (
                      <>
                        <h2>
                          <AccordionButton>
                            <Box flex='1' textAlign='left'>
                              <Text>{ele.title}</Text>
                            </Box>
                            {isExpanded ? (
                              <MinusIcon fontSize='12px' className={styles.icon} />
                            ) : (
                              <AddIcon className={styles.icon} fontSize='12px' />
                            )}
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>{renderMiniCart(ele.more)}</AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                </Accordion>
              )}
              {!ele.more && (
                <Accordion>
                  <AccordionItem borderBottomWidth={0}>
                    <AccordionButton>
                      <Box flex='1' textAlign='left'>
                        <Text>{ele.title}</Text>
                      </Box>
                    </AccordionButton>
                  </AccordionItem>
                </Accordion>
              )}
            </Box>
          ))}
      </TabPanel>
    )
  }

  const renderMake = () => {
    return (
      <TabPanel>
        <Accordion allowToggle>
          <AccordionItem className={styles.boxItemMake}>
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      <Flex>
                        <Text className={styles.numMake}>1</Text> <Text ml={3}>Section 1 title</Text>
                      </Flex>
                    </Box>
                    {isExpanded ? (
                      <Image src='/images/playIconActive.svg' alt='' />
                    ) : (
                      <Image src='/images/playIcon.svg' alt='' />
                    )}
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Flex>
                    <Image src='/images/recipesdetail/imgVideo1.png' alt='Video' />
                    <Image ml={3} src='/images/recipesdetail/imgVideo2.png' alt='Video2' />
                  </Flex>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>

          <AccordionItem className={styles.boxItemMake}>
            {({ isExpanded }) => (
              <>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      <Flex>
                        <Text className={styles.numMake}>2</Text>{' '}
                        <Text ml={3}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua.
                        </Text>
                      </Flex>
                    </Box>
                    {isExpanded ? (
                      <Image src='/images/playIconActive.svg' alt='' />
                    ) : (
                      <Image src='/images/playIcon.svg' alt='' />
                    )}
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>
      </TabPanel>
    )
  }
  return (
    <Box>
      <Text>
        Need to whip up the BEST EVER nachos for a crowd with minimal effort? THIS IS IT! Fully loaded and so so good.
      </Text>
      <Tabs className={styles.boxTab}>
        <TabList className={styles.tablist}>
          <Tab className={styles.tab}>What you need</Tab>
          <Tab className={styles.tab}>Let’s make it!</Tab>
        </TabList>

        <TabPanels>
          {renderNeed()}
          {renderMake()}
        </TabPanels>
      </Tabs>
    </Box>
  )
}
