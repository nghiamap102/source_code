import { Box, Center, Flex, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from 'src/app/rootReducer'
import DialogPopup from 'src/components/DialogPopup'
import Layout from 'src/components/Layout/Container'
import Otp from 'src/views/OTP'
import ExpiredOTP from 'src/views/OTP/ExpiredOTP'
import VerifiedAccount from 'src/views/VerifiedAccount'

const VerifiedAccountWrapper = () => {
  const [step, setStep] = useState<number>(1)
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const dispatch = useDispatch()
  const [phoneOrEmailOTP, setPhoneOrEmailOTP] = useState<string>('verifyOTP')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { informationOTP, errorMessage, successMessage, urlReturn }: any = useSelector<RootReducer>((item) => item.auth)
  return (
    <Layout>
      <Box>
        <Flex minH='100vh' bg='#E5E5E5' justify='center'>
          <Center>
            <Box
              w={step === 1 ? '800px' : '540px'}
              mx='auto'
              bg='#fff'
              px='24px'
              py='40px'
              borderRadius='16px'
              border='1px'
              borderColor='#D9D9D6'
            >
              {step === 1 && (
                <VerifiedAccount setStep={setStep} isVerified={isVerified} setPhoneOrEmailOTP={setPhoneOrEmailOTP} />
              )}
              {step === 2 && (phoneOrEmailOTP === 'verifyOTP' || phoneOrEmailOTP === 'verifyEmail') && (
                <Otp
                  setPhoneOrEmailOTP={setPhoneOrEmailOTP}
                  isTitle={false}
                  setStep={setStep}
                  setIsVerified={setIsVerified}
                  namePage='VerifiedAccount'
                  uid={informationOTP?.uid}
                  hash={informationOTP?.hash}
                  dispatch={dispatch}
                  onOpen={onOpen}
                />
              )}
              {step === 2 && phoneOrEmailOTP === 'expiredOTP' && (
                <ExpiredOTP
                  setPhoneOrEmailOTP={setPhoneOrEmailOTP}
                  uid={informationOTP?.uid}
                  hash={informationOTP?.hash}
                  onOpen={onOpen}
                />
              )}
              {/* {step === 2 && phoneOrEmailOTP === 'verifyEmail' && (
            <>
              <Text fontSize={{ base: '20' }} mb='24px' fontWeight='600'>
                Verify Email
              </Text>
              <Text fontSize={{ base: '13' }} fontWeight='400'>
                A verification link has been sent to your registered email account. Please click on the link to verify
                your email address and continue with the registration process. If you do not receive the email within
                the next few minutes, please check your email account’s Junk/Spam folder
              </Text>
            </>
          )} */}
            </Box>
          </Center>
        </Flex>
        {errorMessage && (
          <DialogPopup
            titlePopup='Error'
            isOpen={isOpen}
            onClose={onClose}
            descPopup={errorMessage}
            isDesc
            isOkBtn
            contentOkBtn='Close'
          />
        )}
        {successMessage && (
          <DialogPopup
            titlePopup='Success'
            isOpen={isOpen}
            onClose={onClose}
            descPopup={successMessage}
            isDesc
            isOkBtn
            contentOkBtn='Close'
            urlReturn={urlReturn}
          />
        )}
      </Box>
    </Layout>
  )
}

export default VerifiedAccountWrapper
