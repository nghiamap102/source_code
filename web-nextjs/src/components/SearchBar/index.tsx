import { Box } from '@chakra-ui/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { IoIosRefresh } from 'react-icons/io'
import { AutoCompleteContainer, AutoCompleteItem, AutoCompleteItemButton } from './styles'
import styles from './SearchBar.module.css'

import { InputField } from 'src/stories/components/Input/Input.stories'
import axios from 'axios'
import filter from 'lodash/filter'
import { isNonEmptyArray } from 'src/utils'

interface IData {
  name: string
  code: string
  id: number
}

type SearchBarprops = {
  color: string
  api: string
  placeholder?: string
  borderColor?: string
  borderRadius?: string
  backgroundColor?: string
}

export const SearchBar: React.FC<SearchBarprops> = ({ api, color, ...props }) => {
  const [dataArr, setDataArr] = useState<any>([])

  const [value_input, setValue_input] = useState<string>('')

  const [isComponentVisible, setIsComponentVisible] = useState(true)

  const TimeoutRef: any = useRef()

  useEffect(() => {}, [dataArr])

  const onTextChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setValue_input(value)
    debounceSuggestion(value)
    if (value?.length > 0) {
      setIsComponentVisible(true)
    }
  }

  const debounceSuggestion = useCallback((value) => {
    if (TimeoutRef.current) {
      clearTimeout(TimeoutRef.current)
    }
    TimeoutRef.current = setTimeout(() => {
      fetchSuggestion(value)
    }, 500)
  }, [])

  const fetchSuggestion = async (key: string) => {
    await axios.get(`${api}${key}`).then((res) => {
      setDataArr(res.data)
    })
  }

  const suggestionSelected = (value: string) => {
    setIsComponentVisible(false)
    setValue_input(value)
  }

  const handleRemove = (value: string) => {
    setDataArr(filter(dataArr, (ele) => ele.name !== value))
  }

  return (
    <Box position='relative'>
      <Box>
        <InputField value_input={value_input} onTextChanged={onTextChanged} color={color} {...props} />
      </Box>
      {isNonEmptyArray(dataArr) && isComponentVisible && (
        <AutoCompleteContainer>
          {dataArr.map((ele: IData) => {
            const initialEle = { code: '', name: '' }
            const { code, name } = ele || initialEle
            return (
              <AutoCompleteItem key={code + 1}>
                <AutoCompleteItemButton>
                  <IoIosRefresh className={styles.refresh_icon} />
                  <Box textAlign='center' onClick={() => suggestionSelected(name)}>
                    <span>{name}</span>
                  </Box>
                  <AiOutlineClose onClick={() => handleRemove(name)} />
                </AutoCompleteItemButton>
              </AutoCompleteItem>
            )
          })}
        </AutoCompleteContainer>
      )}
    </Box>
  )
}
