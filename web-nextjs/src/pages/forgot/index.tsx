import { Container, Image, Link, Text, Button, Box, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from 'src/app/rootReducer'
import { postResendOTP } from 'src/common/service/identify-service/authenticationService'
import DialogPopup from 'src/components/DialogPopup'
import Layout from 'src/components/Layout/Container'
import { updateErrorMessage } from 'src/redux/reducers/auth'
import { mainColor } from 'src/theme/theme'
import ForgotPass from 'src/views/Forgot'
import Otp from 'src/views/OTP'
import ResetPass from './resetPass'

const ForgotWrapper = () => {
  const [step, setStep] = useState<number>(1)
  const [phoneOTP, setPhoneOTP] = useState<string>('verifyOTP')
  const { informationOTP, errorMessage, successMessage, urlReturn }: any = useSelector<RootReducer>((item) => item.auth)

  const { onOpen, isOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()
  const handleResendOTP = async () => {
    const response: any = await postResendOTP(informationOTP?.uid, informationOTP?.hash)
    if (response.status === 1) {
      setPhoneOTP('verifyOTP')
    } else {
      dispatch(updateErrorMessage(response?.message))
      onOpen && onOpen()
    }
  }
  return (
    <Layout>
      <Box minH='100vh' bg={{ base: mainColor.white, md: mainColor.bgDefault }} display='flex' alignItems={'center'}>
        <Container py={{ base: '32px' }}>
          <Link href='/login' mb='17px' display={{ base: 'block', md: 'none' }}>
            <Image src='/icons/left.svg' alt='iconLeft' />
          </Link>
          <Box
            maxW={{ base: '100%', md: '561px' }}
            w='100%'
            mx='auto'
            bg={mainColor.white}
            px={{ base: '0', md: '24px' }}
            py={{ base: '0', md: '40px' }}
            borderRadius='16px'
            border={{ base: 'none', md: `1px solid ${mainColor.whiteGray}` }}
          >
            <Text fontSize='17' mb='24px' style={{ fontWeight: 600 }}>
              Forgot password
            </Text>
            {step === 1 && <ForgotPass setStep={setStep} onOpen={onOpen} dispatch={dispatch} />}
            {step === 2 && phoneOTP === 'verifyOTP' && (
              <Otp
                setPhoneOrEmailOTP={setPhoneOTP}
                isTitle={false}
                setStep={setStep}
                uid={informationOTP?.uid}
                hash={informationOTP?.hash}
                dispatch={dispatch}
                onOpen={onOpen}
              />
            )}
            {step === 2 && phoneOTP === 'expiredOTP' && (
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
            )}
            {step === 3 && <ResetPass dispatch={dispatch} onOpen={onOpen} />}
          </Box>
        </Container>
        {errorMessage && (
          <DialogPopup
            titlePopup='Error'
            isOpen={isOpen}
            onClose={onClose}
            descPopup={errorMessage}
            isDesc
            isCancelBtn
            contentCancelBtn='Close'
          />
        )}
        {successMessage && (
          <DialogPopup
            titlePopup='Success'
            isOpen={isOpen}
            onClose={onClose}
            descPopup={successMessage}
            isSuccess
            urlReturn={urlReturn}
            isDesc
          />
        )}
      </Box>
    </Layout>
  )
}

export default ForgotWrapper
