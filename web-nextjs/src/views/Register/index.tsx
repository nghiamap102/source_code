/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-irregular-whitespace */
import { Box, Button, Flex, Link as RedLink, Text } from '@chakra-ui/react'
import { FastField, Form, FormikProps, withFormik } from 'formik'
import Link from 'next/link'
import { FC, useEffect } from 'react'
import { UiCheckBoxField, UiInputField, UISelectField } from 'src/components/Field'
import { mainColor } from 'src/theme/theme'
import { checkValueError } from 'src/utils/helpers'
import validateFields from './ValidateFields'
import { useDispatch } from 'react-redux'
import { isNonEmptyArray } from 'src/utils'
import { updateCountryCode } from 'src/redux/reducers/country'
import { ICountries, IRegister } from 'src/pages/register'
import { updateDataRegister, updateErrorMessage } from 'src/redux/reducers/auth'
import { postRegisterAccount } from 'src/common/service/identify-service/authenticationService'
import get from 'lodash/get'

interface RegisterProps {
  isError?: boolean
  countriesList: ICountries[]
}

interface RegisterValue {
  firstName: string
  lastName: string
  email: string
  mobile: string
  country: string
  password: string
  confirm: string
  acceptAds: boolean
}

interface MyFormProps {
  isError?: boolean
  setStep?: Function
  dispatch?: Function
  dataRegister?: IRegister
  countryCode?: string
  countriesList: ICountries[]
  onOpen?: Function
}

const initialValue = {
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  country: '176',
  password: '',
  confirm: '',
  acceptAds: false
}

const Register: FC<RegisterProps & FormikProps<RegisterValue>> = ({ isSubmitting, values, countriesList }) => {
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
      <Box mb='16px'>
        <Flex w='100%' justify='space-between'>
          <Box flex='1' textAlign='left' width='100%' pr='8px'>
            <FastField
              name='password'
              component={UiInputField}
              label='Password'
              type='password'
              placeholder='Enter your password'
              isRequired
            />
          </Box>
          <Box flex='1' textAlign='left' width='100%' pl='8px'>
            <FastField
              name='confirm'
              component={UiInputField}
              label='Confirm Password'
              type='password'
              placeholder='Enter your password'
              isRequired
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
                    Privacy Policy.
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
                I agree to receive marketing, advertising, promotional information from Nom and Nom's third party
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
        style={{ color: mainColor.white, background: mainColor.primary }}
      >
        Next
      </Button>
    </Form>
  )
}

export const FormRegisterWrapper = withFormik<MyFormProps, RegisterValue>({
  mapPropsToValues: (props) => ({
    ...initialValue,
    ...props.dataRegister,
    termConditionCheckbox: false
  }),
  validate: checkValueError(validateFields),
  handleSubmit: async (values, { setSubmitting, props }) => {
    const { mobile = '' } = values
    const { setStep, dispatch, onOpen } = props
    const updateData = {
      ...props.dataRegister,
      ...values,
      mobile: `${props.countryCode || '+63'}${mobile}`
    }
    try {
      const {
        mobile = '',
        email = '',
        firstName = '',
        lastName = '',
        password = '',
        confirm = '',
        acceptAds = false
      } = updateData
      const result: any = await postRegisterAccount({
        phone: mobile,
        email,
        first_name: firstName,
        last_name: lastName,
        pass: password,
        pass_confirm: confirm,
        accept_ads: acceptAds,
        check_account_exist: true
      })
      if (result.status === 1) {
        setStep && setStep((pre: number) => pre + 1)
        dispatch && dispatch(updateDataRegister(updateData))
      }
    } catch (error: any) {
      const errorMessage = get(error, 'response.data.message', '')
      dispatch && dispatch(updateErrorMessage(errorMessage))
      onOpen && onOpen()
    } finally {
      setSubmitting(false)
    }
  }
})(Register)

export default FormRegisterWrapper
