import { stringOrNumber } from '@chakra-ui/core'
import { Box, Flex, Image, Link as RedLink, Text, useDisclosure } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducer } from 'src/app/rootReducer'
import { getDataCollection } from 'src/common/service/cms-service/recipeListService'
import DialogPopup from 'src/components/DialogPopup'
import { updateDataRegister } from 'src/redux/reducers/auth'
import { mainColor } from 'src/theme/theme'
import Register from 'src/views/Register'
import ListType from 'src/views/Register/ListType'
import API from 'src/common/config'
export interface ICountries {
  tid: string
  name: string
  field_dial_code: string
}

export interface IRegister {
  firstName: string
  lastName: string
  email: string
  mobile: string
  country: string
  password: string
  confirm: string
  acceptAds: false
  cuisine_types: []
  key_ingredients: []
  special_tags: []
  cooking_level: []
}

const RegisterWrapper = ({ countries }: any) => {
  const [step, setStep] = useState<number>(1)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { dataRegister, errorMessage, successMessage, urlReturn }: any = useSelector<RootReducer>((item) => item.auth)
  const { countryCode }: any = useSelector<RootReducer>((item) => item.country)
  const dispatch = useDispatch()
  const [cuisineTypes, setCuisineTypes] = useState([])
  const [cookingLevel, setCookingLevel] = useState([])
  const [specialTags, setSpecialTags] = useState([])
  const [keyIngredients, setKeyIngredients] = useState([])

  const handleChangeCuisineType = (value: stringOrNumber[]) => {
    dispatch(updateDataRegister({ ...dataRegister, cuisine_types: value }))
  }

  const handleChangeCookingLevel = (value: stringOrNumber[]) => {
    dispatch(updateDataRegister({ ...dataRegister, cooking_level: value }))
  }

  const handleChangeSpecialTags = (value: stringOrNumber[]) => {
    dispatch(updateDataRegister({ ...dataRegister, special_tags: value }))
  }

  const handleChangeKeyIngredients = (value: stringOrNumber[]) => {
    dispatch(updateDataRegister({ ...dataRegister, key_ingredients: value }))
  }

  const getCuisineTypes = async () => {
    const response: any = await getDataCollection('cuisine_types')
    if (response) {
      setCuisineTypes(response.results)
    }
  }

  const getCookingLevel = async () => {
    const response: any = await getDataCollection('cooking_level')
    if (response) {
      setCookingLevel(response.results)
    }
  }

  const getSpecialTags = async () => {
    const response: any = await getDataCollection('special_tags')
    if (response) {
      setSpecialTags(response.results)
    }
  }

  const getKeyIngredients = async () => {
    const response: any = await getDataCollection('key_ingredients')
    if (response) {
      setKeyIngredients(response.results)
    }
  }

  useEffect(() => {
    switch (step) {
      case 2:
        getCuisineTypes()
        break
      case 3:
        getSpecialTags()
        break
      case 4:
        getKeyIngredients()
        break
      case 5:
        getCookingLevel()
        break
      default:
        break
    }
  }, [step])

  const arrRenderUI = [
    <Register
      setStep={setStep}
      dataRegister={dataRegister}
      countryCode={countryCode}
      dispatch={dispatch}
      countriesList={countries}
      onOpen={onOpen}
    />,
    <ListType
      setStep={setStep}
      name='Cuisines types'
      des='Select your favorite cuisines to see more of what you like.'
      data={cuisineTypes}
      onChange={handleChangeCuisineType}
    />,
    <ListType
      setStep={setStep}
      name='Special Tags'
      des='Select from the special tags below and we will only show you recipes that match.'
      data={specialTags}
      onChange={handleChangeSpecialTags}
    />,
    <ListType
      setStep={setStep}
      name='Topics'
      des='Add topics to see more of what you like.'
      data={keyIngredients}
      onChange={handleChangeKeyIngredients}
    />,
    <ListType
      setStep={setStep}
      name='Cooking level'
      des='My cooking level is ...'
      data={cookingLevel}
      onChange={handleChangeCookingLevel}
      dataRegister={dataRegister}
      onOpen={onOpen}
      step={step}
    />
  ]

  const handleAnimationStep = (index: number) => {
    return step === index ? 0 : (index - step) * 100
  }

  return (
    <Box>
      <Flex h='100vh' overflow='hidden' position='relative' style={{ justifyContent: 'center', alignItems: 'center' }}>
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
            maxW={{ base: '100%', md: '540px' }}
            w='100%'
            m='auto'
            h={{ base: '100%' }}
          >
            <Box
              w='100%'
              maxH={{ base: '100%' }}
              h={{ base: '100%', md: 'auto' }}
              overflow={{ base: 'scroll', md: 'initial' }}
              position={{ base: 'relative' }}
              bottom='0'
              left='0'
              flex={{ base: 'auto', md: '1' }}
              background={mainColor.white}
              borderTopLeftRadius={{ base: '0', md: '20px' }}
              borderTopRightRadius={{ base: '0', md: '20px' }}
              px='15px'
              pb='15px'
            >
              <Link href={'/login'} passHref>
                <RedLink>
                  <Flex>
                    <Image mr='20px' src='/icons/left.svg' alt='icon_left' />
                    <Text fontSize='17' my='24px' style={{ fontWeight: 600 }}>
                      Back to Login
                    </Text>
                  </Flex>
                </RedLink>
              </Link>
              <Image src='/images/common/logo-nutri.png' mx='auto' alt='logo' />
              <Flex position='relative' style={{ overflowX: 'clip' }}>
                {arrRenderUI.map((ele: any, index: number) => {
                  return (
                    <Box
                      position='absolute'
                      flex='0 0 100%'
                      w='100%'
                      px='15px'
                      pb='15px'
                      transition='.3s all ease-in-out'
                      transform={`translateX(${handleAnimationStep(index + 1)}%)`}
                    >
                      {ele}
                    </Box>
                  )
                })}
              </Flex>
            </Box>
          </Box>
        </Box>
      </Flex>
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

export default RegisterWrapper
