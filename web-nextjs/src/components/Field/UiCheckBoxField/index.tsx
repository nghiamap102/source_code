import { Checkbox } from '@chakra-ui/react'
import React, { FC } from 'react'

export interface UiCheckBoxFieldProps {
  field: { name: string; onChange: Function }
  form: { errors: { [key: string]: any }; touched: { [key: string]: boolean }; setErrors: Function }
  type: string
  label?: string
  placeholder?: string
  disabled?: boolean
  autoComplete?: string
  onFocus?: any
}

const UiCheckBoxField: FC<UiCheckBoxFieldProps> = ({
  field,
  type = 'checkbox',
  disabled = false,
  label = '',
  form
}) => {
  const { name, onChange } = field
  const { errors, touched } = form
  const showError = errors[name] && touched[name]

  return (
    <Checkbox
      {...field}
      isInvalid={showError}
      size='lg'
      colorScheme='orange'
      type={type}
      isDisabled={disabled}
      onChange={(e) => {
        onChange(e)
      }}
      alignItems='start'
    >
      {label}
    </Checkbox>
  )
}

export default UiCheckBoxField
