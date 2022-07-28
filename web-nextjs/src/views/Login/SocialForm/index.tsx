import { Box, Button, Text, Link as RedLink, Flex } from '@chakra-ui/react'
import { Form, withFormik, FastField, FormikProps } from 'formik'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { UiCheckBoxField, UiInputField, UISelectField } from 'src/components/Field'
import { checkValueError } from 'src/utils/helpers'
import { validateRequired } from 'src/utils/validations'
import { isNonEmptyArray } from 'src/utils'
import { ICountries } from 'src/pages/register'
import { useDispatch } from 'react-redux'
import { updateCountryCode } from 'src/redux/reducers/country'
import { mainColor } from 'src/theme/theme'
import { NextRouter } from 'next/router'
import { updateDataSocialRegister } from 'src/redux/reducers/auth'
import { ISocialRegister } from '../SocialRegister'

interface SocialValue {
  mobile: string
  country: string
}

interface ISocialGoogleLogin {
  google_access_token?: string
  google_token_expires_in?: number
  isSocialLogin: false
  mobile: string
}

interface ISocialFacebookLogin {
  facebook_access_token?: string
  facebook_token_expires_in?: number
  isSocialLogin: false
  mobile: string
}

interface MyFormProps {
  isError?: boolean
  countryCode?: string
  dispatch?: Function
  setStep?: Function
  dataSocialRegister?: ISocialRegister
  countriesList: ICountries[]
  socialLoginGoogle?: ISocialGoogleLogin
  socialLoginFacebook?: ISocialFacebookLogin
  router?: NextRouter
  onOpen?: Function
}
interface SocialProps {
  isError?: boolean
  countriesList: ICountries[]
  dataSocialRegister?: ISocialRegister
  countryCode?: string
}

const SocialForm: React.FC<SocialProps & FormikProps<SocialValue>> = ({
  countriesList,
  values,
  isSubmitting,
  setFieldValue,
  countryCode,
  dataSocialRegister
}) => {
  useEffect(() => {
    if (dataSocialRegister?.email) {
      setFieldValue('email', dataSocialRegister?.email)
    }
    if (dataSocialRegister?.firstName) {
      setFieldValue('firstName', dataSocialRegister?.firstName)
    }
    if (dataSocialRegister?.lastName) {
      setFieldValue('lastName', dataSocialRegister?.lastName)
    }
    if (dataSocialRegister?.mobile) {
      const newMobile = dataSocialRegister?.mobile.replace(countryCode || '+63', '')
      setFieldValue('mobile', newMobile)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dataSocialRegister?.email,
    dataSocialRegister?.firstName,
    dataSocialRegister?.lastName,
    dataSocialRegister?.mobile
  ])

  const mapCountries = (isNonEmptyArray(countriesList) &&
    countriesList.map((ele: { tid: string; name: string }) => ({
      value: ele.tid,
      label: ele.name
    }))) || [{ value: '176', label: 'Philippines ' }]
  const dispatch = useDispatch()

  useEffect(() => {
    if (values.country && isNonEmptyArray(countriesList)) {
      const countryCode = countriesList.filter((ele: ICountries) => ele.tid === values.country)
      dispatch(updateCountryCode(countryCode[0].field_dial_code))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.country])
  return (
    <Form>
      <Text fontSize='20' my='24px' style={{ fontWeight: 600 }}>
        Create an account
      </Text>
      <Box mb='16px'>
        <Flex w='100%' justify='space-between'>
          <Box flex='1' textAlign='left' width='100%' pr='8px'>
            <FastField
              name='firstName'
              component={UiInputField}
              label='First name'
              type='text'
              placeholder='Enter your username'
              isRequired
            />
          </Box>
          <Box flex='1' textAlign='left' width='100%' pl='8px'>
            <FastField
              name='lastName'
              component={UiInputField}
              label='Last name'
              type='text'
              placeholder='Enter your username'
              isRequired
            />
          </Box>
        </Flex>
      </Box>
      <Box mb='16px'>
        <FastField
          name='email'
          component={UiInputField}
          label='Email Address'
          type='text'
          placeholder='Enter your email'
          isRequired
        />
      </Box>
      <Box mb='16px' zIndex='10'>
        <Flex w='100%' justify='space-between'>
          <Box flex='1' textAlign='left' width='100%' pr='8px'>
            <FastField
              name='country'
              component={UISelectField}
              label='Country'
              options={mapCountries}
              defaultValue={{ value: '176', label: 'Philippines' }}
            />
          </Box>
          <Box flex='1' textAlign='left' width='100%' pl='8px'>
            <FastField
              name='mobile'
              component={UiInputField}
              label='Mobile number'
              type='text'
              placeholder='Enter your mobile no.'
              isRequired
              countriesList
            />
          </Box>
        </Flex>
      </Box>
      <Text fontSize='12' my='24px'>
        Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character (using:!@#%*&) and must
        be between 8 - 15 characters in length.
      </Text>
      <hr />
      {/* <Text align='center' fontSize='15' my='-14px' mx='auto' width='53px' bg='white'>
      or
    </Text>
    <Box my='32px'>
      <SocialLogin />
    </Box> */}
      <Text fontSize='17' my='24px'>
        Contact Preferences
      </Text>
      <Box mb='32px'>
        <Box mb='18px'>
          <FastField
            name='termConditionCheckbox'
            component={UiCheckBoxField}
            label={
              <Text fontSize='14'>
                I have read and accept the{' '}
                <Link href='/term-condition' passHref>
                  <RedLink color='main.pinkTermCondition'> Terms & Conditions</RedLink>
                </Link>{' '}
                and{' '}
                <Link href='/privacy-policy' passHref>
                  <RedLink color='main.pinkTermCondition' fontWeight={300}>
                    Privacy Policy.
                  </RedLink>
                </Link>
              </Text>
            }
            type='checkbox'
          />
        </Box>
        <Box mb='18px'>
          <FastField
            name='acceptAds'
            component={UiCheckBoxField}
            label={
              <Text fontSize='14'>
                I agree to receive marketing, advertising, promotional information from Nom and Nom&apos;s third party
                service providers, and hereby authorize and consent Nom to send me marketing, advertising, promotional,
                and membership information.
              </Text>
            }
            type='checkbox'
          />
        </Box>
      </Box>
      <Text fontSize='14' mb='18px'>
        Email / SMS cost is not included
      </Text>
      <Button
        type='submit'
        borderRadius='8'
        isFullWidth
        isDisabled={isSubmitting}
        style={{ color: mainColor.white, background: mainColor.orange }}
      >
        Next
      </Button>
    </Form>
  )
}
const validateFields = {
  mobile: [
    {
      validator: validateRequired,
      code: 'Phone number is required'
    }
  ]
}

const initialValue = {
  mobile: '',
  country: '',
  email: '',
  firstName: '',
  lastName: '',
  acceptAds: false
}

export const FormSocialWrapper = withFormik<MyFormProps, SocialValue>({
  mapPropsToValues: (props) => ({
    ...initialValue,
    ...props.dataSocialRegister,
    termConditionCheckbox: false
  }),
  validate: checkValueError(validateFields),
  handleSubmit: async (values, { setSubmitting, props }) => {
    const { mobile = '' } = values
    const { setStep, dispatch, onOpen } = props
    const updateData = {
      ...props.dataSocialRegister,
      ...values,
      mobile: `${props.countryCode || '+63'}${mobile}`
    }
    setStep && setStep((pre: number) => pre + 1)
    dispatch && dispatch(updateDataSocialRegister(updateData))
    setSubmitting(false)
  }
})(SocialForm)

export default FormSocialWrapper
