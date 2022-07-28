import React from 'react'
import Login from 'src/views/Login'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'FormLogin',
  component: Login
}

export const FormLogin = () => <Login />
export const FormLoginError = () => <Login isError />
