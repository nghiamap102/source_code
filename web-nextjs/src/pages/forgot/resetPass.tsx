/* eslint-disable no-irregular-whitespace */
import { Box, Button } from '@chakra-ui/react'
import { FastField, Form, FormikProps, withFormik } from 'formik'
import React, { FC } from 'react'
import { postResetPass } from 'src/common/service/identify-service/authenticationService'
import { UiInputField } from 'src/components/Field'
import { updateErrorMessage, updateSuccessMessage, updateUrlReturn } from 'src/redux/reducers/auth'
import { mainColor } from 'src/theme/theme'
import get from 'lodash/get'
import { LOGIN_URL } from 'src/common/constants/router'

interface ResetPassProps {
  isError?: boolean
}

interface ResetPassValue {
  newPassword: string
  confirmPassword: string
}

interface MyFormProps {
  isError?: boolean
  setStep?: Function
  dispatch?: Function
  onOpen?: Function
}

const ResetPass: FC<ResetPassProps & FormikProps<ResetPassValue>> = ({ isSubmitting }) => {
  return (
    <Form>
      <Box mb='32px'>
        <FastField
          name='newPassword'
          component={UiInputField}
          label='New password'
          type='password'
          placeholder='Enter new password'
          isRequired
        />
      </Box>
      <Box mb='32px'>
        <FastField
          name='confirmPassword'
          component={UiInputField}
          label='Confirm new password'
          type='password'
          placeholder='Renter new password'
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

export const FormResetPassWrapper = withFormik<MyFormProps, ResetPassValue>({
  mapPropsToValues: () => ({
    newPassword: '',
    confirmPassword: ''
  }),
  handleSubmit: async (values, { setSubmitting, props }) => {
    const { setStep, dispatch, onOpen } = props
    try {
      const response: any = await postResetPass({ pass: values.newPassword, pass_confirm: values.confirmPassword })
      if (response.status === 1) {
        dispatch && dispatch(updateSuccessMessage(response.message))
        dispatch && dispatch(updateUrlReturn(LOGIN_URL))
        onOpen && onOpen()
      }
      setSubmitting(false)
    } catch (error) {
      const errorMessage = get(error, 'response.data.message', '')
      dispatch && dispatch(updateErrorMessage(errorMessage))
      onOpen && onOpen()
    }
  }
})(ResetPass)

export default FormResetPassWrapper
