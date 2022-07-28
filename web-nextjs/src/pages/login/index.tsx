import { Box, Flex, Image, Link as RedLink, Text, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from 'src/app/rootReducer'
import API from 'src/common/config'
import DialogPopup from 'src/components/DialogPopup'
import { updateErrorMessage } from 'src/redux/reducers/auth'
import { mainColor } from 'src/theme/theme'
import Login from 'src/views/Login'
import SocialLoginRegister from 'src/views/Login/SocialRegister'

const LoginWrapper = ({ countries }: any) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { isOpen, onClose } = useDisclosure()
  const { errorMessage, isFirstSocialLogin }: any = useSelector<RootReducer>((item) => item.auth)

  useEffect(() => {
    dispatch(updateErrorMessage(''))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Box>
      {isFirstSocialLogin && <SocialLoginRegister countries={countries} />}
      {!isFirstSocialLogin && (
        <Flex
          h='100vh'
          overflow='hidden'
          position='relative'
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <Box
            maxW={{ base: '100%', md: '700px' }}
            flex='auto'
            h='100%'
            overflow='hidden'
            backgroundImage="url('/images/account/bannerLogin.png')"
            backgroundRepeat='no-repeat'
            bgSize='cover'
          ></Box>
          <Box position='absolute' top='0' left='0' w='100%' h='100%' background='rgba(0, 0, 0, 0.25)' zIndex='0' />
          <Box zIndex='1' background={{ md: mainColor.white }} h='100%' flex={{ md: '1' }} overflow='scroll' py='25px'>
            <Box
              position={{ base: 'absolute', md: 'relative' }}
              top='0'
              left='0'
              w='100%'
              h={{ base: '40%', md: 'auto' }}
            >
              <RedLink onClick={() => router.back()}>
                <Flex>
                  <Image mx='20px' src='/icons/left.svg' alt='icon_left' />
                  <Text fontSize='17' style={{ fontWeight: 600 }}>
                    Back
                  </Text>
                </Flex>
              </RedLink>
              <Flex flexDirection='column' alignItems='center' justifyContent='center' h='100%'>
                <Image src='/images/common/logo-nutri.png' mx='auto' alt='logo' />
                <Text
                  align='center'
                  fontSize={{ base: '20', md: '36' }}
                  my={{ base: '10px', md: '32px' }}
                  color={{ base: 'white', md: 'black' }}
                  style={{ fontWeight: 700 }}
                >
                  Hello Again!
                </Text>
                <Text
                  align='center'
                  fontSize={{ base: '15', md: '17' }}
                  mb={{ base: '0', md: '32px' }}
                  color={{ base: 'white', md: 'black' }}
                  style={{ fontWeight: 600 }}
                >
                  Login or sign up to enjoy exclusive
                  <br /> rewards
                </Text>
              </Flex>
            </Box>
            <Box
              w='100%'
              maxH={{ base: '60%', md: '100%' }}
              h={{ base: '100%', md: 'auto' }}
              overflow={{ base: 'scroll', md: 'initial' }}
              position={{ base: 'absolute', md: 'relative' }}
              bottom='0'
              left='0'
              flex={{ base: 'auto', md: '1' }}
              background={mainColor.white}
              borderTopLeftRadius='20px'
              borderTopRightRadius='20px'
            >
              <Box mx={{ base: '0', md: 'auto' }} maxW={{ base: '100%', md: '330px' }} w='100%'>
                <Login dispatch={dispatch} router={router} isError={!!errorMessage} />
              </Box>
            </Box>
          </Box>
        </Flex>
      )}
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
    </Box>
  )
}

export async function getStaticProps() {
  const response = await fetch(API.IDENTIFY.COUNTRIES_URL)
  const data = await response.json()
  return {
    props: {
      countries: data
    }
  }
}

export default LoginWrapper
