import { AxiosResponse, AxiosError } from 'axios'
import axiosClient from 'src/common/api/request'
import API, { CLIENT_ID, CLIENT_SECRET } from 'src/common/config'

export const getSessionToken = () => {
  return axiosClient
    .get(API.IDENTIFY.SESSION_TOKEN_URL)
    .then((response: AxiosResponse) => {
      return response
    })
    .catch((error: AxiosError) => {})
}
interface IPayloadLogin {
  grant_type?: string
  username: string
  phone: string
  password: string
  client_secret?: string
  client_id?: string
}

export const postLogin = (payload: IPayloadLogin) => {
  return axiosClient.post(`${API.IDENTIFY.NEW_LOGIN_URL}`, {
    client_secrect: CLIENT_SECRET,
    client_id: CLIENT_ID,
    email: payload?.username,
    phone: payload.phone,
    password: payload.password
  })
}

interface IPayloadLoginFacebook {
  grand_type?: string
  facebook_access_token: string
  facebook_token_expires_in: number
  client_secret?: string
  client_id?: string
}

export const postLoginFacbook = (payload: IPayloadLoginFacebook) => {
  const formData = new FormData()
  formData.append('grant_type', 'facebook_login_grant')
  formData.append('client_secret', CLIENT_SECRET)
  formData.append('client_id', CLIENT_ID)
  formData.append('facebook_access_token', payload.facebook_access_token)
  formData.append('facebook_token_expires_in', payload.facebook_token_expires_in?.toString())
  return axiosClient.post(`${API.IDENTIFY.LOGIN_URL}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

interface IPayloadLoginGoogle {
  grant_type?: string
  google_access_token: string
  google_token_expires_in: number
  client_secrect?: string
  client_id?: string
}

export const postLoginGoogle = (payload: IPayloadLoginGoogle) => {
  const formData = new FormData()
  formData.append('grant_type', 'google_login_grant')
  formData.append('client_secret', CLIENT_SECRET)
  formData.append('client_id', CLIENT_ID)
  formData.append('google_access_token', payload.google_access_token)
  formData.append('google_token_expires_in', payload.google_token_expires_in?.toString())
  return axiosClient.post(`${API.IDENTIFY.LOGIN_URL}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

interface IPayloadLoginTiktok {
  grand_type?: string
  tiktok_access_token: string
  tiktok_token_expires_in?: string
  client_secrect?: string
  client_id?: string
}

export const postLoginTiktok = (payload: IPayloadLoginTiktok) => {
  return axiosClient.post(`${API.IDENTIFY.LOGIN_URL}`, {
    grand_type: 'tiktok_login_grant',
    client_secret: CLIENT_SECRET,
    client_id: CLIENT_ID,
    ...payload
  })
}

export const postLogout = () => {
  return axiosClient.post(
    `${API.IDENTIFY.LOGOUT_URL}`,
    { client_id: CLIENT_ID },
    {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': sessionStorage.getItem('sessionToken') || ''
      }
    }
  )
}

export interface IPayloadRegisterAccount {
  phone?: string
  email?: string
  first_name: string
  last_name: string
  pass: string
  pass_confirm: string
  country?: string
  accept_ads: boolean
  cuisine_types?: string[]
  key_ingredients?: string[]
  special_tags?: string[]
  cooking_level?: string[]
  check_account_exist?: boolean
}

export const postRegisterAccount = (payload: IPayloadRegisterAccount) => {
  return axiosClient.post(`${API.IDENTIFY.REGISTER_URL}`, {
    ...payload
  })
}

interface IPayloadVerifyOTP {
  client_id?: string
  client_secrect?: string
  otp: string
}

export const postVerifyOtpEmail = (uid: string, hash: string) => {
  return axiosClient.post(`${API.IDENTIFY.VERIFY_OTP_EMAIL_URL}/${uid}/${hash}/request`, {})
}

export const postVerifyOtpSMS = (uid: string, hash: string) => {
  return axiosClient.post(`${API.IDENTIFY.VERIFY_OTP_SMS_URL}/${uid}/${hash}/request`, {})
}

interface IVerifyOTP {
  uid: string
  hash: string
  otp: string
}

export const postVerifyOTP = ({ uid, hash, otp }: IVerifyOTP) => {
  return axiosClient.post(`${API.IDENTIFY.OTP_URL}/${uid}/${hash}/verify`, {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    otp
  })
}

export const postResendOTP = (uid: string, hash: string) => {
  return axiosClient.post(`${API.IDENTIFY.OTP_URL}/${uid}/${hash}/resend`, {})
}

interface IPayloadForgotPass {
  phone?: string
  email?: string
}

export const postForgotPass = (payload: IPayloadForgotPass) => {
  return axiosClient.post(`${API.IDENTIFY.FOGOTPASS_URL}`, {
    ...payload
  })
}

interface IPayloadResetPass {
  pass: string
  pass_confirm: string
}

export const postResetPass = (payload: IPayloadResetPass) => {
  return axiosClient.post(`${API.IDENTIFY.RESETPASS_URL}`, {
    client_secret: CLIENT_SECRET,
    client_id: CLIENT_ID,
    ...payload
  })
}

interface IPayloadRefreshToken {
  refresh_token: string
  grant_type?: string
  client_secret?: string
  client_id?: string
}

export const postRefreshToken = (payload: IPayloadRefreshToken) => {
  return axiosClient.post(`${API.IDENTIFY.LOGIN_URL}`, {
    grant_type: 'refresh_token',
    client_secret: CLIENT_SECRET,
    client_id: CLIENT_ID,
    ...payload
  })
}
