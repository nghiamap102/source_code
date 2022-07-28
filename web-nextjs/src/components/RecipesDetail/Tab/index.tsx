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
  AccordionButton
} from '@chakra-ui/react'
import React from 'react'
import styles from './Tab.module.css'
import { isNonEmptyArray } from 'src/utils'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'

type TabRecipesProps = {
  recipesContent: Array<{
    content: string
    more: boolean
  }>
  onCickMore?: () => void
}

export const TabRecipes: React.FC<TabRecipesProps> = ({ recipesContent, onCickMore }) => {
  return (
    <Box>
      <Text>
        Need to whip up the BEST EVER nachos for a crowd with minimal effort? THIS IS IT! Fully loaded and so so good.
      </Text>
      <Tabs className='' border='1px solid #D9D9D6;' borderRadius='8px'>
        <TabList className={styles.tablist}>
          <Tab className={styles.tab}>What you need</Tab>
          <Tab className={styles.tab}>Let’s make it!</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {isNonEmptyArray(recipesContent) &&
              recipesContent.map((ele) => (
                <Box>
                  {ele.more && (
                    <Accordion allowMultiple>
                      <AccordionItem>
                        {({ isExpanded }) => (
                          <>
                            <h2>
                              <AccordionButton>
                                <Box flex='1' textAlign='left'>
                                  <Text>{ele.content}</Text>
                                </Box>
                                {isExpanded ? (
                                  <MinusIcon fontSize='12px' className={styles.icon} />
                                ) : (
                                  <AddIcon className={styles.icon} fontSize='12px' />
                                )}
                              </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                              ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </AccordionPanel>
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
                            <Text>{ele.content}</Text>
                          </Box>
                        </AccordionButton>
                      </AccordionItem>
                    </Accordion>
                  )}
                </Box>
              ))}
          </TabPanel>
          <TabPanel>dfhsd</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
