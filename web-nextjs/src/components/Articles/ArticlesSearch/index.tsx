import React from 'react'
import {
  Box,
  Flex,
  Square,
  Image,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
  Center
} from '@chakra-ui/react'
import { AutoCompleteContainer, AutoCompleteItem, AutoCompleteItemButton } from 'src/components/SearchBar/styles'
import { isNonEmptyArray } from 'src/utils'
import { ButtonOrangeHover } from 'src/theme/components/Button'
import { IArticles } from 'src/utils/Module'

interface IArticlesSearch {
  data: IArticles[]
  initialValue: string
  handleSearch?: () => void
  onFillSuggestion: Function
  handleInputSearch?: Function
  isSearchVisible: boolean
  isLoading?: boolean
  ref?: React.RefObject<HTMLElement>
}

const ArticlesSearch = React.forwardRef<HTMLElement, IArticlesSearch>(
  ({ data, initialValue, handleSearch, onFillSuggestion, handleInputSearch, isSearchVisible, isLoading }, ref) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onFillSuggestion(e.target.value)
      handleInputSearch && handleInputSearch(e)
    }

    return (
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          handleSearch && handleSearch()
        }}
      >
        <Flex borderRadius='5'>
          <Square
            borderTopLeftRadius='5'
            borderBottomLeftRadius='5'
            bg='main.gray2'
            position='relative'
            flexBasis='80%'
          >
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<Image src='/icons/search-gray.svg' alt='Search Recipes' />}
              />
              <Input
                px={8}
                py={5}
                borderColor='transparent'
                focusBorderColor='transparent'
                _hover={{
                  borderColor: 'transparent'
                }}
                type='tel'
                placeholder='Search in Recipes'
                name='search-input'
                value={initialValue}
                onChange={handleInputChange}
              />
            </InputGroup>

            {isSearchVisible && (
              <AutoCompleteContainer
                style={
                  !isNonEmptyArray(data)
                    ? {
                        display: 'flex',
                        justifyContent: 'center'
                      }
                    : {}
                }
              >
                <>
                  {isLoading ? (
                    <Center>
                      <Spinner />
                    </Center>
                  ) : (
                    <>
                      {isNonEmptyArray(data) ? (
                        data.map((element, index) => {
                          const { entity_id, title } = element
                          return (
                            <AutoCompleteItem key={`${entity_id}-${index}`}>
                              <AutoCompleteItemButton onClick={() => onFillSuggestion(title)}>
                                <Box textAlign='center'>
                                  <span>{title}</span>
                                </Box>
                              </AutoCompleteItemButton>
                            </AutoCompleteItem>
                          )
                        })
                      ) : (
                        <Center>
                          <Text fontWeight={700}>Not found</Text>
                        </Center>
                      )}
                    </>
                  )}
                </>
              </AutoCompleteContainer>
            )}
          </Square>

          <Square flexBasis='20%' bg='main.gray2'>
            <Button
              color='main.white'
              bg='main.orange'
              height='100%'
              variant='solid'
              type='submit'
              isFullWidth
              py={5}
              _hover={ButtonOrangeHover}
              isLoading={isLoading}
            >
              Search
            </Button>
          </Square>
        </Flex>
      </form>
    )
  }
)

export default ArticlesSearch
