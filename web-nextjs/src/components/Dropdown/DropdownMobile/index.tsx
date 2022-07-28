import React, { useState } from 'react'
import cx from 'classnames'
import {
  Box,
  Text,
  Flex,
  Image,
  ListItem,
  UnorderedList,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import FilterBy from 'src/components/Filter/FilterBy'
import FilterTag from 'src/components/Filter/FilterTag'
import styles from './DropdownMobile.module.css'
import { IItemCheckbox, IFilterData } from 'src/utils/Module'
import { isNonEmptyArray } from 'src/utils'
import { IDropdownList } from '../Dropdown'
import { ButtonOrangeHover } from 'src/theme/components'

interface IDropdownMobile {
  listFilterTag: IItemCheckbox[]
  handleCheckFilter: Function
  isLoading?: boolean
  filterOption: IFilterData
  filterSortBy: IDropdownList[]
  onChange: (obj: any) => void
  onRemoveTag: (obj: any) => void
}

const DropdownMobile: React.FC<IDropdownMobile> = ({
  listFilterTag,
  handleCheckFilter,
  filterOption,
  onChange,
  onRemoveTag,
  filterSortBy,
  isLoading
}) => {
  const { isOpen: isOpenSort, onOpen: onOpenSort, onClose: onCloseSort } = useDisclosure()
  const { isOpen: isOpenFilter, onOpen: onOpenFilter, onClose: onCloseFilter } = useDisclosure()

  const [activeSort, setActiveSort] = useState('')

  const onChangeSortBy = ({ type, value, code }: any) => {
    if (!onChange) return

    const obj: any = {}
    obj[type] = code
    onChange(obj)
    setActiveSort(value)
    onCloseSort()
  }
  return (
    <Box>
      <Box>
        <Box mb={3.5}>
          <Flex alignItems='center' justifyContent='space-between' color='main.grayCool' fontWeight={700}>
            <Box
              className={styles['dropdown-button']}
              borderBottomWidth='1px'
              borderColor='main.whiteGray'
              flexBasis='50%'
            >
              <Flex alignItems='center' justifyContent='center'>
                <Button mr={3} variant='link' onClick={onOpenSort} textTransform='uppercase' width='100%'>
                  <Box mr={2} py={3.5}>
                    Sort
                  </Box>
                  <Box py={3.5}>
                    <Image src='/icons/chevron-down.svg' alt='dropdown' />
                  </Box>
                </Button>
              </Flex>
            </Box>
            <Box
              className={styles['dropdown-button']}
              borderBottomWidth='1px'
              borderColor='main.whiteGray'
              flexBasis='50%'
            >
              <Flex alignItems='center' justifyContent='center'>
                <Button mr={3} variant='link' onClick={onOpenFilter} textTransform='uppercase' width='100%'>
                  <Box mr={2} py={3.5}>
                    <Text>Filter</Text>
                  </Box>
                  <Box py={3.5}>
                    <Image src='/icons/chevron-down.svg' alt='dropdown' />
                  </Box>
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Box>
      <Drawer isOpen={isOpenSort} placement='bottom' onClose={onCloseSort}>
        <DrawerOverlay />
        <DrawerContent>
          {/* <DrawerCloseButton /> */}
          <DrawerBody p={4} color='main.textDark2'>
            <UnorderedList listStyleType='none' m={0}>
              {isNonEmptyArray(filterSortBy) &&
                filterSortBy.map((element: any, index: number) => (
                  <ListItem
                    key={element.code + index}
                    py={3.5}
                    borderBottomWidth='1px'
                    borderColor='main.whiteGray'
                    className={cx(styles['sort-item'], element.name === activeSort && styles['sort-item-active'])}
                    backgroundImage={element.name === activeSort ? "url('/icons/check-orange.svg')" : ''}
                    onClick={() => {
                      onChangeSortBy({
                        type: element.type,
                        code: element.code,
                        value: element.name
                      })
                    }}
                  >
                    {element.name}
                  </ListItem>
                ))}
            </UnorderedList>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Drawer isOpen={isOpenFilter} placement='bottom' size='full' onClose={onCloseFilter}>
        <DrawerOverlay />
        <DrawerContent>
          {/* <DrawerCloseButton /> */}
          <DrawerBody p={4} color='main.textDark2'>
            <FilterTag listFilterTag={listFilterTag} onRemoveTag={onRemoveTag} />
            <Button color='main.red' variant='link' my={4}>
              Clear filter
            </Button>
            <FilterBy
              filterOption={filterOption}
              listFilterTag={listFilterTag}
              handleCheckFilter={handleCheckFilter}
              isLoading={isLoading}
            />
            <Button
              isLoading={isLoading}
              bg='main.primary'
              color='main.white'
              isFullWidth
              _hover={ButtonOrangeHover}
              onClick={onCloseFilter}
            >
              Apply
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default DropdownMobile
