/* eslint-disable react/no-unescaped-entities */
import { Alert, AlertIcon, Box, Button, Image, Text, Flex, Link as RedLink, Center } from '@chakra-ui/react'
import { FastField, Form, FormikProps, withFormik } from 'formik'
import React, { FC } from 'react'
import Link from 'next/link'
import { UiInputField } from 'src/components/Field'
import SocialLogin from 'src/components/SocialLogin'
import { mainColor } from 'src/theme/theme'
import { checkValueError } from 'src/utils/helpers'
import validateFields from './ValidateFields'
import { postLogin } from 'src/common/service/identify-service/authenticationService'
import { validateEmail } from 'src/utils'
import { validateMobile } from 'src/utils/validations'
import get from 'lodash/get'
import { updateErrorMessage, updateIsLogin } from 'src/redux/reducers/auth'
import { NextRouter } from 'next/router'
import { ISocialRegister } from './SocialRegister'

interface LoginProps {
  isError?: boolean
}

interface LoginValue {
  emailOrMobile: string
  password: string
}

interface MyFormProps {
  isError?: boolean
  dispatch?: Function
  router?: NextRouter
  dataSocialRegister?: ISocialRegister
}

const Login: FC<LoginProps & FormikProps<LoginValue>> = ({ isSubmitting, isError }) => {
  return (
    <Form>
      <Box px={{ base: '15px', md: '0' }}>
        {isError && (
          <Alert borderRadius='8' status='error' my='24px' border='1px' borderColor={mainColor.error}>
            <AlertIcon />
            Invalid Username or Password. You have 5 attempts before your account is locked for 30 minutes.
          </Alert>
        )}
        <Box px={{ base: '40px', md: '0' }} py={{ base: '24px', md: '0' }}>
          <Box mb='32px'>
            <FastField
              name='emailOrMobile'
              component={UiInputField}
              label='Email or Mobile no.'
              type='text'
              placeholder='Enter your Email or Mobile no.'
              isRequired
            />
          </Box>
          <Box mb='32px'>
            <FastField
              name='password'
              component={UiInputField}
              label='Password'
              type='password'
              placeholder='Enter your password'
              isRequired
            />
          </Box>
          <Button
            type='submit'
            borderRadius='8'
            isFullWidth
            isDisabled={isSubmitting}
            style={{ color: mainColor.white, background: mainColor.primary }}
          >
            Login
          </Button>
          <Text align='center' fontSize='15' mt='24px' mb='5px'>
            Don't have an account?{' '}
            <Link href='/register' passHref>
              <RedLink color='main.primary' style={{ textDecoration: 'underline' }}>
                {' '}
                Sign up here{' '}
              </RedLink>
            </Link>
          </Text>
          <Text align='center' fontSize='15' mb='63px'>
            <Link href='/forgot'>Forgot your password?</Link>
          </Text>
          <hr />
          <Text align='center' fontSize='15' my='-14px' mx='auto' width='120px' bg='white'>
            or Continue with
          </Text>
          <Box mt='32px'>
            <SocialLogin />
          </Box>
        </Box>
      </Box>
    </Form>
  )
}

export const FormLoginWrapper = withFormik<MyFormProps, LoginValue>({
  mapPropsToValues: () => ({ emailOrMobile: '', password: '' }),
  validate: checkValueError(validateFields),
  handleSubmit: async (values, { setSubmitting, props }) => {
    const { dispatch, router } = props
    try {
      const username = validateEmail(values.emailOrMobile) ? values.emailOrMobile : ''
      const phone = validateMobile(values.emailOrMobile) ? values.emailOrMobile : ''
      const response: any = await postLogin({ username, phone, password: values.password })

      if (response?.access_token) {
        localStorage.setItem('access_token', response?.access_token)
        localStorage.setItem('refresh_token', response.refresh_token)
        dispatch && dispatch(updateIsLogin(true))
        router && router.push('/')
      }
      setSubmitting(false)
    } catch (error: any) {
      const errorMessage = get(error, 'response.data.message', '')
      dispatch && dispatch(updateErrorMessage(errorMessage))
    }
  }
})(Login)

export default FormLoginWrapper
