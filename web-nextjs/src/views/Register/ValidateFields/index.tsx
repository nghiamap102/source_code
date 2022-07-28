import {
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validateEmail,
  validateMobile,
  validateRetype,
  validateRequiredCheckbox
} from 'src/utils/validations'

const validateFields = {
  firstName: [
    {
      validator: validateRequired,
      code: 'This field is required'
    }
  ],
  lastName: [
    {
      validator: validateRequired,
      code: 'This field is required'
    }
  ],
  email: [
    {
      validator: validateRequired,
      code: 'This field is required'
    },
    {
      validator: validateEmail,
      code: 'Please provide a valid email address'
    }
  ],
  mobile: [
    {
      validator: validateRequired,
      code: 'This field is required'
    },
    {
      validator: validateMobile,
      code: 'Please provide a valid phone number'
    }
  ],
  password: [
    {
      validator: validateRequired,
      code: 'This field is required'
    },
    {
      validator: validateMinLength(8),
      code: `Password need to be at least {number} character`,
      codeOptions: {
        number: 8
      }
    },
    {
      validator: validateMaxLength(15),
      code: `Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character (using:!@#%*&) and must be between 8 - 15 characters in length.`
    }
  ],
  confirm: [
    {
      validator: validateRequired,
      code: 'This field is required'
    },
    {
      validator: validateMinLength(8),
      code: `Password need to be at least {number} character`,
      codeOptions: {
        number: 8
      }
    },
    {
      validator: validateRetype,
      code: `Password do not match. Please retype your password`
    }
  ],
  termConditionCheckbox: [
    {
      validator: validateRequiredCheckbox,
      code: 'Please confirm Terms & Conditions and Privacy Policy'
    }
  ]
}

export default validateFields
