import React, { useRef, useState } from 'react'
import { Box, Text, Flex, useOutsideClick } from '@chakra-ui/react'
import classNames from 'classnames'
import styles from './Dropdown.module.css'
import { useDeviceDetect } from 'src/hooks'
import { IDropdown, IDropdownValue } from './Dropdown.d'
import { isNonEmptyArray } from 'src/utils'

const Dropdown: React.FC<IDropdown> = ({
  onChange,
  isEmpty = false,
  label,
  dropdownName,
  dropdownList,
  size = 'lg'
}) => {
  const { isMobile } = useDeviceDetect()

  const [isSelectFilter, setIsSelectFilter] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [labelDropdown, setLabelDropdown] = useState(label)

  const onChangeSelect = ({ type, value, code }: IDropdownValue) => {
    if (!onChange) return

    const obj: any = {}
    obj[type] = code
    onChange(obj)
    setLabelDropdown(value)
    setIsSelectFilter(false)
  }

  useOutsideClick({
    ref: dropdownRef,
    handler: () => {
      if (isMobile) return
      setIsSelectFilter(false)
    }
  })

  const renderSortList = () => {
    return (
      <>
        {isNonEmptyArray(dropdownList) &&
          dropdownList.map((element, index) => {
            return (
              <Box
                key={element.code + index}
                className={classNames(
                  styles['select-item'],
                  // element.selected && styles.active,
                  element.name === labelDropdown && styles.active
                )}
                onClick={() => {
                  onChangeSelect({
                    type: element.type,
                    code: element.code,
                    value: element.name
                  })
                }}
                aria-hidden='true'
                backgroundImage={element.name === labelDropdown ? "url('/icons/check-orange.svg')" : ''}
              >
                <span className={styles['select-text']}>{element.name}</span>
              </Box>
            )
          })}
      </>
    )
  }

  return (
    <Box>
      <Box className={classNames('short-bar__item', 'short-by', isEmpty && styles['search-empty'])}>
        <Flex alignItems='center'>
          {dropdownName && (
            <Text fontWeight={400} fontSize='body' mr={4}>
              {dropdownName}
            </Text>
          )}
          <Box
            className={classNames(styles['short-bar__item--selected'], styles[`short-bar__${size}`])}
            ref={dropdownRef}
          >
            <Box
              className={styles['select-selected']}
              onClick={() => {
                setIsSelectFilter(!isSelectFilter)
              }}
              aria-hidden='true'
              backgroundImage="url('/icons/chevron-down.svg')"
            >
              {labelDropdown}
            </Box>
            <Box className={classNames(styles['select-items'], isSelectFilter && styles.isActive)}>
              {renderSortList()}
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default Dropdown
