import { Button, Box, Image } from '@chakra-ui/react'
import React from 'react'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { FACEBOOK_APP_ID, GOOGLE_CLIENT_ID } from 'src/common/config'
import { postLoginFacbook, postLoginGoogle } from 'src/common/service/identify-service/authenticationService'
import { getUsersService } from 'src/common/service/identify-service/userService'
import { useDispatch } from 'react-redux'
import { updateDataSocialRegister, updateIsFirstSocialLogin, updateIsLogin } from 'src/redux/reducers/auth'
import { useRouter } from 'next/router'
import { HOME_URL } from 'src/common/constants/router'

const SocialLogin = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const responseGoogle = async (response) => {
    const result = await postLoginGoogle({
      google_access_token: response?.accessToken,
      google_token_expires_in: response?.tokenObj?.expires_in
    })
    if (result) {
      localStorage.setItem('access_token', result?.access_token)
      const response = await getUsersService()
      if (response?.data.field_u_first_login === 'True') {
        localStorage.setItem('isFirstSocialLogin', true)
        dispatch(updateIsFirstSocialLogin(true))
        const {
          field_accept_ads,
          field_cooking_level,
          field_country,
          field_cuisine_types,
          field_first_name,
          field_key_ingredients,
          field_last_name,
          field_mobile_number,
          field_special_tags
        } = response?.data
        const dataSocialRegister = {
          email: response?.data.mail,
          firstName: field_first_name !== null ? field_first_name : '',
          lastName: field_last_name !== null ? field_last_name : '',
          mobile: field_mobile_number !== null ? field_mobile_number?.title : '',
          country: field_country !== null ? field_country : '',
          acceptAds: field_accept_ads || false,
          cuisine_types: field_cuisine_types !== null ? field_cuisine_types : [],
          key_ingredients: field_key_ingredients !== null ? field_key_ingredients : [],
          special_tags: field_special_tags !== null ? field_special_tags : [],
          cooking_level: field_cooking_level !== null ? field_cooking_level : []
        }
        dispatch(updateDataSocialRegister({...dataSocialRegister}))
      } else {
        dispatch(updateIsFirstSocialLogin(false))
        dispatch(updateIsLogin(true))
        router.push(HOME_URL)
      }
    }
  }
  
  const responseFacebook = async (response) => {
    const result = await postLoginFacbook({
      facebook_access_token: response?.accessToken,
      facebook_token_expires_in: response?.expiresIn
    })
    if (result) {
      localStorage.setItem('access_token', result?.access_token)
      const response = await getUsersService()
      if (response?.data.field_u_first_login === 'True') {
        dispatch(updateIsFirstSocialLogin(true))
        const {
          field_accept_ads,
          field_cooking_level,
          field_country,
          field_cuisine_types,
          field_first_name,
          field_key_ingredients,
          field_last_name,
          field_mobile_number,
          field_special_tags
        } = response?.data
        const dataSocialRegister = {
          email: response?.data.mail,
          firstName: field_first_name !== null ? field_first_name : '',
          lastName: field_last_name !== null ? field_last_name : '',
          mobile: field_mobile_number !== null ? field_mobile_number?.title : '',
          country: field_country !== null ? field_country : '',
          acceptAds: field_accept_ads || false,
          cuisine_types: field_cuisine_types !== null ? field_cuisine_types : [],
          key_ingredients: field_key_ingredients !== null ? field_key_ingredients : [],
          special_tags: field_special_tags !== null ? field_special_tags : [],
          cooking_level: field_cooking_level !== null ? field_cooking_level : []
        }
        dispatch(updateDataSocialRegister({...dataSocialRegister}))
      } else {
        dispatch(updateIsFirstSocialLogin(false))
        dispatch(updateIsLogin(true))
        router.push(HOME_URL)
      }
    }
  }

  return (
    <Box textAlign='center'>
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText='Login'
        render={(renderProps) => (
          <Button
            borderRadius='8'
            maxW='40px'
            p='8px'
            mx='8px'
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={{ background: '#F4F6F8' }}
          >
            <Image src='/icons/gg.svg' alt='gg' />
          </Button>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      <FacebookLogin
        appId={FACEBOOK_APP_ID}
        callback={responseFacebook}
        render={(renderProps) => (
          <Button
            borderRadius='8'
            maxW='40px'
            p='8px'
            mx='8px'
            style={{ background: '#F4F6F8' }}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <Image src='/icons/fb.svg' alt='fb' />
          </Button>
        )}
      />

      <Button borderRadius='8' maxW='40px' p='8px' mx='8px' style={{ background: '#F4F6F8' }}>
        <Image src='/icons/Tiktok.svg' alt='fb' />
      </Button>
    </Box>
  )
}

export default SocialLogin
