/* eslint-disable no-irregular-whitespace */
import { Box, Button } from '@chakra-ui/react'
import { FastField, Form, FormikProps, withFormik } from 'formik'
import React, { FC } from 'react'
import { postForgotPass } from 'src/common/service/identify-service/authenticationService'
import { UiInputField } from 'src/components/Field'
import { mainColor } from 'src/theme/theme'
import get from 'lodash/get'
import { updateErrorMessage, updateInformationOTP } from 'src/redux/reducers/auth'

interface ForgotPassProps {
  isError?: boolean
}

interface ForgotPassValue {
  emailOrMobile: string
}

interface MyFormProps {
  isError?: boolean
  setStep?: Function
  dispatch?: Function
  onOpen?: Function
}

const ForgotPass: FC<ForgotPassProps & FormikProps<ForgotPassValue>> = ({ isSubmitting }) => {
  return (
    <Form>
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
      <Button
        type='submit'
        borderRadius='8'
        isFullWidth
        isDisabled={isSubmitting}
        style={{ color: mainColor.white, background: mainColor.primary }}
      >
        Submit
      </Button>
    </Form>
  )
}

export const FormForgotPassWrapper = withFormik<MyFormProps, ForgotPassValue>({
  mapPropsToValues: () => ({
    emailOrMobile: ''
  }),
  handleSubmit: async (values, { setSubmitting, props }) => {
    const { setStep, dispatch, onOpen } = props
    try {
      const response: any = await postForgotPass({ email: values?.emailOrMobile })
      if (response) {
        dispatch && dispatch(updateInformationOTP({ uid: response?.data?.uid, hash: response?.data?.hash }))
        setStep && setStep(2)
        setSubmitting(false)
      }
    } catch (error) {
      const errorMessage = get(error, 'response.data.message', '')
      dispatch && dispatch(updateErrorMessage(errorMessage))
      onOpen && onOpen()
    }
  }
})(ForgotPass)

export default FormForgotPassWrapper
