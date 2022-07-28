import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import React from 'react'

export interface InputProp {
  value_input: string
  onTextChanged?: (e: React.ChangeEvent<HTMLInputElement>) => void
  color: string
  placeholder?: string
}

export const InputField = ({ color, value_input, onTextChanged, ...props }: InputProp) => {
  return (
    <InputGroup>
      <InputLeftElement children={<Search2Icon color={color} />} />
      <Input value={value_input} onChange={onTextChanged} type={'text'} {...props} />
    </InputGroup>
  )
}
