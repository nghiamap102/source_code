import { Button, Flex, Center, Text } from '@chakra-ui/react'
import { FastField, Form, FormikProps, withFormik } from 'formik'
import React, { FC } from 'react'
import { postVerifyOTP } from 'src/common/service/identify-service/authenticationService'
import CountDown from 'src/components/CountDown'
import { UiVerifyField } from 'src/components/Field'
import { updateErrorMessage, updateUrlReturn } from 'src/redux/reducers/auth'
import { mainColor } from 'src/theme/theme'
import { nextFocusInput } from 'src/utils'
import { checkValueError } from 'src/utils/helpers'
import validateFields from './ValidateFields'
import get from 'lodash/get'

interface OtpProps {
  errors?: {
    codeOTP: string
  }
  setPhoneOrEmailOTP: Function
  isTitle?: boolean
}

interface OtpValue {
  text_1: string
  text_2: string
  text_3: string
  text_4: string
  text_5: string
  text_6: string
}

interface MyFormProps {
  errors?: {
    codeOTP: string
  }
  setPhoneOrEmailOTP: Function
  setStep?: Function
  setIsVerified?: Function
  isTitle?: boolean
  namePage?: string
  uid: string
  hash: string
  dispatch: Function
  onOpen: Function
}

const Otp: FC<OtpProps & FormikProps<OtpValue>> = ({ errors, isSubmitting, setPhoneOrEmailOTP, isTitle = true }) => {
  return (
    <Form>
      {isTitle && (
        <Text fontSize='17' my='24px' style={{ fontWeight: 600 }}>
          Verify Phone number
        </Text>
      )}
      <Text fontSize='15' my='24px'>
        A security code has been send to your number phone! Please input the code here.
      </Text>
      <Flex justify='center'>
        <Center>
          <FastField name='text_1' component={UiVerifyField} type='text' nextFocusInput={nextFocusInput} />
        </Center>
        <Center>
          <FastField name='text_2' component={UiVerifyField} type='text' nextFocusInput={nextFocusInput} />
        </Center>
        <Center>
          <FastField name='text_3' component={UiVerifyField} type='text' nextFocusInput={nextFocusInput} />
        </Center>
        <Center>
          <FastField name='text_4' component={UiVerifyField} type='text' nextFocusInput={nextFocusInput} />
        </Center>
        <Center>
          <FastField name='text_5' component={UiVerifyField} type='text' nextFocusInput={nextFocusInput} />
        </Center>
        <Center>
          <FastField name='text_6' component={UiVerifyField} type='text' nextFocusInput={nextFocusInput} />
        </Center>
      </Flex>
      {errors?.codeOTP && (
        <Text align='center' fontSize='15' my='24px' color='red'>
          {errors?.codeOTP}
        </Text>
      )}
      <Text align='center' fontSize='15' my='24px'>
        Not recieve the code? Resend Code in <CountDown setPhoneOrEmailOTP={setPhoneOrEmailOTP} />s
      </Text>
      <Button
        type='submit'
        borderRadius='8'
        isFullWidth
        isDisabled={isSubmitting}
        colorScheme='cyan'
        style={{ color: mainColor.white, background: mainColor.primary }}
      >
        Submit
      </Button>
    </Form>
  )
}

export const OtpWrapper = withFormik<MyFormProps, OtpValue>({
  mapPropsToValues: () => {
    return {
      text_1: '',
      text_2: '',
      text_3: '',
      text_4: '',
      text_5: '',
      text_6: ''
    }
  },
  validate: checkValueError(validateFields),
  handleSubmit: async (values, { setSubmitting, props, setFieldError }) => {
    const { setStep, setIsVerified, namePage, uid, hash, dispatch, onOpen } = props
    const otp = `${values.text_1}${values.text_2}${values.text_3}${values.text_4}${values.text_5}${values.text_6}`
    try {
      const response: any = await postVerifyOTP({ uid, hash, otp })
      if (response.access_token) {
        if (namePage === 'VerifiedAccount') {
          setIsVerified && setIsVerified(true)
          setStep && setStep(1)
        } else {
          localStorage.setItem('access_token', response.access_token)
          localStorage.setItem('refresh_token', response.refresh_token)
          setStep && setStep(3)
        }
        // dispatch(updateUrlReturn('/'))
        // onOpen && onOpen()
      }
    } catch (error: any) {
      const errorMessage = get(error, 'response.data.message', '')
      setFieldError('codeOTP', errorMessage)
      // dispatch(updateErrorMessage(errorMessage))
      // onOpen && onOpen()
    }

    setSubmitting(false)
  }
})(Otp)

export default OtpWrapper
