import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootReducer } from 'src/app/rootReducer'
import { ICountries } from 'src/pages/register'

export interface UiInputFieldProps {
  field: { name: string }
  form: { errors: { [key: string]: any }; touched: { [key: string]: any } }
  type: string
  label?: string
  placeholder?: string
  disabled?: boolean
  autoComplete?: string
  onFocus?: any
  isRequired?: boolean
  countriesList?: ICountries[]
}

const UiInputField: FC<UiInputFieldProps> = ({
  field,
  form,
  type = 'text',
  label = '',
  placeholder = '',
  autoComplete = 'off',
  disabled = false,
  onFocus,
  isRequired = false
}) => {
  const [show, setShow] = useState<boolean>(() => (type === 'password' ? false : true))
  const { countryCode }: any = useSelector<RootReducer>((item) => item.country)
  const handleClick = () => setShow(!show)
  const { name } = field
  const { errors, touched } = form
  const showError = errors[name] && touched[name]

  return (
    <>
      <FormControl isInvalid={showError} isRequired={isRequired}>
        {label && (
          <FormLabel htmlFor={name} fontSize='15px'>
            {label}
          </FormLabel>
        )}
        <InputGroup>
          {name === 'mobile' && (
            <Input
              readOnly
              value={countryCode}
              borderRadius='8'
              marginRight='8px'
              disabled
              background='main.whiteGray'
              width='25%'
              padding='0 8px'
            />
          )}
          <Input
            {...field}
            id={name}
            type={!show ? type : 'text'}
            placeholder={placeholder}
            autoComplete={autoComplete}
            disabled={disabled}
            onFocus={onFocus}
            borderRadius='8'
          />
          {type === 'password' && (
            <InputRightElement width='4.5rem' zIndex={0}>
              <Box bg='none' onClick={handleClick}>
                <Image src='/icons/Eye.svg' alt='eye' />
              </Box>
            </InputRightElement>
          )}
        </InputGroup>
        {showError && <FormErrorMessage>{errors[name]}</FormErrorMessage>}
      </FormControl>
    </>
  )
}

export default UiInputField
