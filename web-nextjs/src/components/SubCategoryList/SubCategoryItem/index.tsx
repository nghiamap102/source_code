import { Button } from '@chakra-ui/react'
import React, { FC } from 'react'

interface Props {
  id: number
  name: string
  setActiveSubCategory: any
  isSelected: boolean
  setCategoryLevel: any
}

const SubCategoryItem: FC<Props> = ({ id, name, setActiveSubCategory, setCategoryLevel, isSelected }) => {
  const onClickSubCategoryItem = () => {
    setActiveSubCategory(id)
    setCategoryLevel(2)
  }

  return (
    <Button
      colorScheme='teal'
      variant='outline'
      borderRadius='12px'
      mb='0.5rem'
      mr='0.5rem'
      p='0.5rem'
      onClick={onClickSubCategoryItem}
      bg={isSelected ? '#E6FFFA' : 'white'}
    >
      {name}
    </Button>
  )
}

export default SubCategoryItem
