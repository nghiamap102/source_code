import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Box, Image, Select, Text, Link as RedLink, Flex } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from 'src/app/rootReducer'
import { getUsersService } from 'src/common/service/identify-service/userService'
import { updateIsLogin, updateUserInfo } from 'src/redux/reducers/auth'
import styles from '../Header.module.css'
import { postLogout } from 'src/common/service/identify-service/authenticationService'

const MultiLanguage: React.FC = () => {
  const [retryCallAPI, setRetryCallAPI] = useState({ type: '', isRetry: false })
  const dispatch = useDispatch()
  const { userInfo, isLogin, isFirstSocialLogin }: any = useSelector<RootReducer>((item) => item.auth)
  useEffect(() => {
    const fetchData = async () => {
      const response: any = await getUsersService()
      if (response?.status === 1) {
        dispatch(updateUserInfo(response.data))
      }
    }
    if (isLogin && Object.entries(userInfo).length === 0) {
      fetchData()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo])

  const handleLogout = async (e: any) => {
    try {
      e.preventDefault()
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      dispatch(updateUserInfo({}))
      dispatch(updateIsLogin(false))
      // await postLogout()
    } catch (error: any) {
      if (error?.response.status === 403) {
        setRetryCallAPI({ type: 'logout', isRetry: true })
      }
    }
  }
  return (
    <Flex justifyContent='flex-end'>
      <Box fontSize='caption'>
        {isLogin ? (
          <Box display={'flex'}>
            <Box width='32px' height='32px' className={styles.dropdown}>
              <Image
                src='/images/common/avatar.jpg'
                alt='default-avatar'
                borderRadius={'50%'}
                border={`1px solid main.whiteGrey`}
              />{' '}
              <Box className={styles['dropdown-content']}>
                <RedLink onClick={handleLogout}>Log out</RedLink>
              </Box>
            </Box>
            {userInfo?.field_first_name && userInfo?.field_last_name && (
              <Text
                fontSize='14'
                padding={'7px 12px 3px'}
              >{`${userInfo?.field_first_name} ${userInfo?.field_last_name}`}</Text>
            )}
          </Box>
        ) : (
          <Text fontSize='14' padding={'7px 12px 3px'}>
            <Link href='/login' passHref>
              <RedLink>Login</RedLink>
            </Link>{' '}
            /{' '}
            <Link href='/register' passHref>
              <RedLink>Signup</RedLink>
            </Link>
          </Text>
        )}
      </Box>
      {/* <Box>
        <Flex>
          <Image src='/images/common/en.svg' alt='EN' />
          <Select
            ml={2}
            variant='unstyled'
            placeholder='EN'
            fontWeight={700}
            color='main.textDark2'
            icon={<Image src='/icons/chevron-down.svg' alt='down' />}
          >
            <option value='option2'>FR</option>
            <option value='option3'>CN</option>
          </Select>
        </Flex>
      </Box> */}
    </Flex>
  )
}

export default MultiLanguage
