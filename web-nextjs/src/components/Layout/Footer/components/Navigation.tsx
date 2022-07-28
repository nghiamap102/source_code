import React from 'react'
import {
  Box,
  Link,
  Text,
  Grid,
  GridItem,
  UnorderedList,
  ListItem,
  List,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from '@chakra-ui/react'
import { isNonEmptyArray } from 'src/utils'

import { IFooterNavList } from '../Footer.d'
import data from 'src/mock/components/Footer/data.json'
import { useDeviceDetect } from 'src/hooks'

const Navigation: React.FC<IFooterNavList> = ({ footerNavigation = data }) => {
  const { isDesktop, isMobile } = useDeviceDetect()
  return (
    <Box>
      {isMobile && (
        <Box>
          <Accordion allowToggle>
            {isNonEmptyArray(footerNavigation) &&
              footerNavigation.map((element, index: number) => {
                const { name, subNavigations } = element
                return (
                  <AccordionItem border='none' key={index} px={4}>
                    <AccordionButton px={0} _focus={{}} _hover={{}}>
                      <Box flex='1' textAlign='left'>
                        <Text fontWeight={600}>{name}</Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>

                    <AccordionPanel pb={4} pl={0}>
                      <List>
                        <UnorderedList listStyleType='none' ml={0}>
                          {subNavigations &&
                            isNonEmptyArray(subNavigations) &&
                            subNavigations.map((subNav, i: number) => (
                              <ListItem key={i}>
                                <Link href={subNav.navigationLink}>{subNav.name}</Link>
                              </ListItem>
                            ))}
                        </UnorderedList>
                      </List>
                    </AccordionPanel>
                  </AccordionItem>
                )
              })}
          </Accordion>
        </Box>
      )}

      {isDesktop && (
        <Grid templateColumns={{ md: 'repeat(4, 1fr)', base: 'repeat(2, 2fr)' }} gap={7}>
          {isNonEmptyArray(footerNavigation) &&
            footerNavigation.map((element, index: number) => {
              const { navigationLink, name, subNavigations } = element
              return (
                <GridItem key={index} w='100%'>
                  <Box mb={2}>
                    <Link href={navigationLink} fontWeight={500}>
                      {name}
                    </Link>
                  </Box>

                  <UnorderedList listStyleType='none' ml={0}>
                    {isNonEmptyArray(subNavigations) &&
                      subNavigations.map((subNav, i: number) => (
                        <ListItem key={i}>
                          <Link href={subNav.navigationLink}>{subNav.name}</Link>
                        </ListItem>
                      ))}
                  </UnorderedList>
                </GridItem>
              )
            })}
        </Grid>
      )}
    </Box>
  )
}

export default Navigation
