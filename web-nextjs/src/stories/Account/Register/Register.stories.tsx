import React from 'react'
import Register from 'src/views/Register'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'FormRegister',
  component: Register
}
const countriesList = [
  {
    tid: '1',
    name: 'Philipines',
    field_dial_code: '+63'
  }
]

export const FormRegister = () => <Register countriesList={countriesList} />
