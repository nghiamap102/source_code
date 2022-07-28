import { FormControl, Input } from '@chakra-ui/react'
import React, { FC } from 'react'

export interface UiVerifyFieldProps {
  field: { name: string; onChange: Function }
  form: { errors: { [key: string]: any }; touched: { [key: string]: any } }
  type: string
  placeholder?: string
  disabled?: boolean
  isRequired?: boolean
  nextFocusInput?: Function
}

const UiVerifyField: FC<UiVerifyFieldProps> = ({
  field,
  form,
  type = 'text',
  placeholder = '',
  disabled = false,
  isRequired = false,
  nextFocusInput
}) => {
  const { name } = field
  const { errors, touched } = form
  const showError = errors[name] && touched[name]

  const handleChange = (selected: any) => {
    const { maxLength, value } = selected.target
    field.onChange(selected)
    if (typeof nextFocusInput === 'function') nextFocusInput({ maxLength, value, name })
  }

  return (
    <>
      <FormControl mx='10px' isInvalid={showError} isRequired={isRequired}>
        <Input
          {...field}
          shadow='0'
          border='0'
          borderBottom='1px'
          borderRadius='0'
          w='40px'
          id={name}
          onChange={handleChange}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={1}
        />
      </FormControl>
    </>
  )
}

export default UiVerifyField
