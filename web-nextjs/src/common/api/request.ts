import axios from 'axios'
import { URL_ID as BASE_URL } from '../config'
import { getSessionToken } from '../service/identify-service/authenticationService'

// import { getGuestToken } from 'src/common/service/customerService'

// axios.defaults.headers.common.Accept = "application/json";
// axios.defaults.timeout = 12000;

export const getAccessToken = () => {
  let accessToken: string | null = ''
  if (typeof window !== 'undefined') {
    accessToken = localStorage?.getItem('access_token')
  }
  //   return `Bearer accessToken`;
  return accessToken
}

export const isLogin = !!getAccessToken()

export const getCustomerId = () => {
  const userId = localStorage?.getItem('userId')
  //   return `Bearer accessToken`;
  return userId
}

export interface DistLocal {
  station_id: string
  name: string
  name_en: string
  short_id: string
}

export interface StationLocal {
  city?: {
    name: string
    name_en: string
    short_id: string
    station_id?: string
  }
  dist?: DistLocal
  station?: {
    id: string
    address: string
    address_en: string
    longitude: number
    latitude: number
    city_id: string
    code: string
    contact: string
    contact_email: string
    station_setting: any
    district_id: string
    ward_id: string
    station_functions: { key: string; id: string; name: string }[]
  }
}

export const getStation = (): StationLocal | null => {
  if (typeof window !== 'undefined') {
    const station = localStorage.getItem('station')
    return station ? JSON.parse(station) : null
  }
  return null
}

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosClient.interceptors.request.use((config: any) => {
  const token = getAccessToken()
  //   debugger;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  //   config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjMxODA2MDM0MDQsImp0aSI6IjFGNVZ6cTRNMEMxY1VOWTJJclNQeV9xUkV5bVZYMC1wR0NKUUNoYWwtS3A3a01US0ZTT3hTd3AxSTdzS3U2R1YtdGhHaEE9PSIsInN1YiI6IndFLWRuYThLb3BPUnNlNTRfLWZ5bVE9PSJ9.VVj9i2U7PM-V3o-6elv8PXF_dCyleI4r-OVb91_5cNg`;
  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }
    return response
  },
  async (error) => {
    if (error.response?.status === 401) {
      // //   localStorage.clear();
      // const response = { code: 'success', data: [{ value: '', data: { use_id: '' } }] }
      // if (response.code === 'success') {
      //   const { data } = response
      //   if (data && data[0]) {
      //     localStorage.setItem('accessToken', data[0].value)
      //     localStorage.setItem('userId', data[0]?.data?.use_id)
      //   }
      // }
    }
    if (error.response?.status === 403) {
      // const sessionToken: any = await getSessionToken()
      // sessionStorage.setItem('sessionToken', sessionToken)
    }
    throw error
  }
)

export default axiosClient
