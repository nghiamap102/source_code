import { validateRequired, validateMinLength, validateEmail, validateEmailOrPhone } from 'src/utils/validations'

const validateFields = {
  emailOrMobile: [
    {
      validator: validateRequired,
      code: 'Email or Mobile number is required'
    },
    {
      validator: validateEmailOrPhone,
      code: 'Please provide a valid email address or mobile number'
    }
  ],
  password: [
    {
      validator: validateRequired,
      code: 'Password is required'
    }
    // {
    //   validator: validateMinLength(20),
    //   code: `Password need to be at least {number} character`,
    // }
  ]
}

export default validateFields
