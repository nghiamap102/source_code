import React from 'react'
import { isNonEmptyArray } from 'src/utils'
import { Box, Flex, Alert, Button, AlertDescription } from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import { IFilterTag } from './FilterTag.d'

const FilterTag: React.FC<IFilterTag> = ({ className, listFilterTag, onRemoveTag }) => {
  return (
    <Box className={className}>
      <Flex flexWrap='wrap'>
        {isNonEmptyArray(listFilterTag) &&
          listFilterTag.map((element, index: number) => (
            <Alert key={index} bg='main.light_orange' borderRadius='50' width='fit-content' padding={2} my={1} mr={2}>
              <AlertDescription fontSize='12px' color='main.textDark2' mr='10px'>
                {element.key} : {element.label}
              </AlertDescription>
              <Button
                variant='link'
                minWidth='auto'
                _focus={{}}
                onClick={() => {
                  onRemoveTag && onRemoveTag(element)
                }}
              >
                <SmallCloseIcon border='1px' borderRadius='50%' borderColor='main.grayCool' />
              </Button>
            </Alert>
          ))}
      </Flex>
    </Box>
  )
}

export default FilterTag
