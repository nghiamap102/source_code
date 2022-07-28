import { Button, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { postResendOTP } from 'src/common/service/identify-service/authenticationService'
import { updateErrorMessage } from 'src/redux/reducers/auth'
import { mainColor } from 'src/theme/theme'

interface ExpiredOTPProps {
  setPhoneOrEmailOTP: Function
  uid: string
  hash: string
  onOpen?: Function
}

const ExpiredOTP: FC<ExpiredOTPProps> = ({ setPhoneOrEmailOTP, uid, hash, onOpen }) => {
  const dispatch = useDispatch()
  const handleResendOTP = async () => {
    const response: any = await postResendOTP(uid, hash)
    if (response.status === 1) {
      setPhoneOrEmailOTP('verifyOTP')
    } else {
      dispatch(updateErrorMessage(response?.message))
      onOpen && onOpen()
    }
  }
  return (
    <>
      <Text fontSize='15' my='24px'>
        A security code has been send to your number phone! Please input the code here.
      </Text>
      <Button
        borderRadius='8'
        isFullWidth
        colorScheme='cyan'
        style={{ color: mainColor.white, background: mainColor.primary }}
        onClick={handleResendOTP}
      >
        Resend
      </Button>
    </>
  )
}

export default ExpiredOTP
