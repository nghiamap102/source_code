import { stringOrNumber } from '@chakra-ui/core'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { UiCustomCheckBoxField } from 'src/components/Field'
import { mainColor } from 'src/theme/theme'
import get from 'lodash/get'
import { useDispatch } from 'react-redux'
import {
  updateErrorMessage,
  updateSuccessMessage,
  updateUrlReturn
} from 'src/redux/reducers/auth'
import { ISocialRegister } from '../SocialRegister'
import { editUserService } from 'src/common/service/identify-service/userService'
import { HOME_URL } from 'src/common/constants/router'

interface ListTypeProps {
  name: string
  des: string
  setStep: Function
  step?: number
  data: any
  onOpen?: () => void
  // eslint-disable-next-line no-unused-vars
  onChange: (value: stringOrNumber[]) => void
  dataSocialRegister?: ISocialRegister
}

const ListType: FC<ListTypeProps> = ({ name, des, setStep, data, onChange, step, dataSocialRegister, onOpen }) => {
  const dispatch = useDispatch()
  const handleNext = async () => {
    if (step === 5 && dataSocialRegister) {
      try {
        const {
          mobile = '',
          email = '',
          firstName = '',
          lastName = '',
          acceptAds = false,
          cuisine_types = [],
          key_ingredients = [],
          special_tags = [],
          cooking_level = []
        } = dataSocialRegister
        const result: any = await editUserService({
          phone: mobile,
          email,
          first_name: firstName,
          last_name: lastName,
          accept_ads: acceptAds,
          cuisine_types,
          key_ingredients,
          special_tags,
          cooking_level
        })
        if (result?.message) {
          dispatch(updateSuccessMessage(result?.message))
          dispatch(updateUrlReturn(HOME_URL))
          localStorage.removeItem('isFirstSocialLogin')
          onOpen && onOpen()
        }
      } catch (error: any) {
        const errorMessage = get(error, 'response.data.message', '')
        dispatch(updateErrorMessage(errorMessage))
        onOpen && onOpen()
      }
    } else {
      setStep &&
        setStep((pre: number) => {
          if (pre === 5) return pre
          return pre + 1
        })
    }
  }

  return (
    <Box>
      <Text fontSize='20' my='24px' fontWeight='600'>
        {name}
      </Text>
      <Text fontSize='12' my='24px' fontWeight='400'>
        {des}
      </Text>
      <Box>
        <UiCustomCheckBoxField data={data} onChange={onChange} />
      </Box>
      <Flex justify='center' mt='40px'>
        <Box px='10px' maxW='165px' w='100%'>
          <Button
            type='submit'
            borderRadius='8'
            border={`1px solid ${mainColor.orange}`}
            w='100%'
            style={{ color: 'main.orange', background: 'main.white' }}
            onClick={() => setStep && setStep((pre: number) => pre - 1)}
          >
            Back
          </Button>
        </Box>
        <Box px='10px' maxW='165px' w='100%'>
          <Button
            type='submit'
            borderRadius='8'
            w='100%'
            style={{ color: mainColor.white, background: mainColor.orange }}
            onClick={handleNext}
          >
            Next
          </Button>
        </Box>
      </Flex>
    </Box>
  )
}

export default ListType
