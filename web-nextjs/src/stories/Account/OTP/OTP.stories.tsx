import { useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from 'src/app/rootReducer'
import Otp from 'src/views/OTP'

export const FormOTP = () => {
  const [phoneOTP, setPhoneOTP] = useState<string>('verifyOTP')
  const dispatch = useDispatch()
  const { onOpen } = useDisclosure()
  const { informationOTP }: any = useSelector<RootReducer>((item) => item.auth)
  return (
    <Otp
      setPhoneOrEmailOTP={setPhoneOTP}
      uid={informationOTP?.uid}
      hash={informationOTP?.hash}
      dispatch={dispatch}
      onOpen={onOpen}
    />
  )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'FormOTP',
  component: Otp
}
