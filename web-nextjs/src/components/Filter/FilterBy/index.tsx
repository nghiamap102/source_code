import React from 'react'
import { isNonEmptyArray } from 'src/utils'
import {
  Box,
  Checkbox,
  ListItem,
  List,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from '@chakra-ui/react'
import { IFilterBy, IFilterItem } from 'src/utils/Module'
import Skeleton from 'react-loading-skeleton'

const FilterBy: React.FC<IFilterBy> = ({
  filterOption,
  listFilterTag,
  handleCheckFilter,
  className,
  isLoading = false
}) => {
  return (
    <Box className={className}>
      {isLoading ? (
        <Skeleton count={8} height={40} />
      ) : (
        <Accordion defaultIndex={[0]} allowToggle>
          {isNonEmptyArray(filterOption?.data) &&
            filterOption.data.map((element: IFilterItem, index: number) => {
              return (
                <AccordionItem border='none' key={index}>
                  <h2>
                    <AccordionButton px={0} _focus={{}} _hover={{}}>
                      <Box flex='1' textAlign='left' color='main.textDark2' fontWeight={600}>
                        {element.label}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <List>
                      {element.item &&
                        isNonEmptyArray(element.item) &&
                        element.item.map((list, index) => {
                          return (
                            <ListItem key={list.tid} pt={3} cursor='pointer'>
                              <Checkbox
                                size='md'
                                display='flex'
                                flexDirection='row-reverse'
                                justifyContent='space-between'
                                color='main.textDark'
                                isChecked={listFilterTag.some((e) => e.tid === list.tid)}
                                onChange={(e) =>
                                  handleCheckFilter(e, {
                                    ...list,
                                    key: element.label,
                                    ...(filterOption.map_key && {
                                      unique_key: `${filterOption.map_key[element.bundle]}[${index}]`,
                                      bundle_key: filterOption.map_key[element.bundle]
                                    })
                                  })
                                }
                              >
                                {list.label}
                              </Checkbox>
                            </ListItem>
                          )
                        })}
                    </List>
                  </AccordionPanel>
                </AccordionItem>
              )
            })}
        </Accordion>
      )}
    </Box>
  )
}

export default FilterBy
