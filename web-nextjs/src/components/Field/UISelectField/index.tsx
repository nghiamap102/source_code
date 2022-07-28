import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { isEmpty } from 'lodash'
import React, { FC, useEffect, useState } from 'react'
import Select from 'react-select'

interface UiVerifyFieldProps {
  field: { name: string; value: any; onChange: Function }
  form: { errors: { [key: string]: any }; touched: { [key: string]: any } }
  type: string
  label: string
  placeholder?: string
  disabled?: boolean
  isRequired?: boolean
  nextFocusInput?: Function
  options: []
  _onChange?: Function
  defaultValue: string
}

const UISelectField: FC<UiVerifyFieldProps> = ({
  field,
  form,
  label = '',
  placeholder = '',
  disabled = false,
  options,
  _onChange,
  defaultValue
}) => {
  const { name, value } = field
  const { errors, touched } = form

  const showError = errors[name] && touched[name]
  const selectedOption: any = options.find((option: any) => option.value === (value || defaultValue))

  const handleChange = (selected: any) => {
    const selectedValue = selected ? selected.value : selected
    const changeEvent = {
      target: {
        name,
        value: selectedValue
      }
    }
    field.onChange(changeEvent)
    _onChange && _onChange(changeEvent)
  }

  useEffect(() => {
    if (!isEmpty(selectedOption)) {
      const changeEvent = {
        target: {
          name,
          value: selectedOption.value
        }
      }
      _onChange && _onChange(changeEvent)
    }
  }, [selectedOption])

  return (
    <FormControl isInvalid={showError}>
      {label && (
        <FormLabel htmlFor={name} fontSize='15px'>
          {label}
        </FormLabel>
      )}
      <Select
        id={name}
        instanceId={name}
        defaultValue
        {...field}
        value={selectedOption || defaultValue || ''}
        onChange={handleChange}
        isDisabled={disabled}
        placeholder={placeholder}
        options={options}
        components={{
          IndicatorSeparator: () => null
        }}
      />
      {showError && <FormErrorMessage>{errors[name]}</FormErrorMessage>}
    </FormControl>
  )
}

export default UISelectField
