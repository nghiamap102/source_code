import { Button, Flex, Image, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootReducer } from 'src/app/rootReducer'
import { postVerifyOtpEmail, postVerifyOtpSMS } from 'src/common/service/identify-service/authenticationService'
import { mainColor } from 'src/theme/theme'

interface VerifiedAccountProps {
  isVerified?: boolean
  setStep?: Function
  setPhoneOrEmailOTP?: Function
}

const VerifiedAccount: FC<VerifiedAccountProps> = ({ isVerified, setStep, setPhoneOrEmailOTP }) => {
  const router = useRouter()
  const { informationOTP }: any = useSelector<RootReducer>((item) => item.auth)

  useEffect(() => {
    if (!informationOTP.uid && !informationOTP.hash) {
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [informationOTP.uid, informationOTP.hash])

  const handleSentOTPToEmail = async () => {
    const { hash = '', uid = '' } = informationOTP
    const response = await postVerifyOtpEmail(uid, hash)
    if (response) {
      typeof setStep === 'function' && setStep(2)
      typeof setPhoneOrEmailOTP === 'function' && setPhoneOrEmailOTP('verifyEmail')
    }
  }

  const handleSendOTPToSMS = async () => {
    const { hash = '', uid = '' } = informationOTP
    const response = await postVerifyOtpSMS(uid, hash)
    if (response) {
      typeof setStep === 'function' && setStep(2)
      typeof setPhoneOrEmailOTP === 'function' && setPhoneOrEmailOTP('verifyOTP')
    }
  }

  const renderAccountCreated = () => (
    <>
      <Image borderRadius='10px' src='images/account/chinese-shutterstock.png' alt='chinese shutterstock' />
      <Text align='center' fontSize={{ base: '20', md: '24' }} my={{ base: '10px', md: '16px' }} fontWeight='700'>
        Account Created!
      </Text>
      <Text align='center' fontSize={{ md: '15' }} my={{ base: '10px', md: '16px' }} fontWeight='600'>
        Thank you for registering with Nutri Asia. Please verify your account to continue using other features.
      </Text>
      <Flex justify='center' style={{ flexDirection: 'column' }}>
        <>
          <Button
            borderRadius='8'
            my={{ base: '8px' }}
            mx='auto'
            w='100%'
            maxW='300px'
            style={{ color: mainColor.white, background: mainColor.primary }}
            onClick={handleSentOTPToEmail}
          >
            OTP code will be sent to email
          </Button>
          <Button
            borderRadius='8'
            my={{ base: '8px' }}
            mx='auto'
            w='100%'
            maxW='300px'
            style={{ color: mainColor.white, background: mainColor.primary }}
            onClick={handleSendOTPToSMS}
          >
            OTP code will be sent to mobile no.
          </Button>
        </>
      </Flex>
    </>
  )

  const renderAccountVerified = () => (
    <>
      <Image borderRadius='10px' src='images/account/chinese-shutterstock.png' alt='chinese shutterstock' />
      <Text align='center' fontSize={{ base: '20', md: '24' }} my={{ base: '10px', md: '16px' }} fontWeight='700'>
        Account Verified!
      </Text>
      <Text align='center' fontSize={{ md: '15' }} my={{ base: '10px', md: '16px' }} fontWeight='600'>
        Thank you for registering with Nutri Asia. Enjoying!
      </Text>
      <Flex justify='center' style={{ flexDirection: 'column' }}>
        <Button
          borderRadius='8'
          my={{ base: '8px' }}
          mx='auto'
          w='100%'
          maxW='300px'
          style={{ color: mainColor.white, background: mainColor.primary }}
          onClick={() => router.push('/login')}
        >
          Login
        </Button>
      </Flex>
    </>
  )

  return (
    <>
      {!isVerified && renderAccountCreated()}
      {isVerified && renderAccountVerified()}
    </>
  )
}

export default VerifiedAccount
