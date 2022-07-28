import { Box, Flex, Image, Link, Select, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { IPopup } from './Popup.d'
import styles from './Popup.module.css'

const Popup: React.FC<IPopup> = ({
  titlePopup,
  descPopup,
  isOkBtn,
  isCancelBtn,
  isDesc,
  isImg,
  isDescLogin,
  imgPopup,
  contentOkBtn,
  contentCancelBtn,
  isBold,
  isSuccess,
  isMiniCart,
  product,
  urlReturn,
  onSubmit,
  onClose,
  size
}) => {
  const btnOk = `${styles.btn} ${styles.btnOk}`
  const btnCancel = `${styles.btn} ${styles.btnCancel}`
  const router = useRouter()

  useEffect(() => {
    let timer: any
    if (isSuccess) {
      timer = setTimeout(() => {
        onClose && onClose()
        if (urlReturn) router.push(urlReturn)
      }, 3000)
    }
    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const renderMiniCart = () => {
    return (
      <Box mt={6} mb={6}>
        <Flex>
          <Box className={styles.image} borderWidth='1px' borderRadius='base'>
            <Image src={product.productImage} alt={product.productName} />
            <Box className={styles.wishlist}>
              <Image src='/images/product/product-card/wishlist.svg' alt='wishlist' />
            </Box>
          </Box>
          <Box ml={4} className={styles.miniCartDetail}>
            <Box className={styles.content} py={1} color='main.textDark3'>
              {product.productName}
            </Box>
            <Select className={styles.size} placeholder='Select option'>
              <option defaultValue='option1'>Option 1</option>
              <option defaultValue='option2'>Option 2</option>
              <option defaultValue='option3'>Option 3</option>
            </Select>
            <Box className={styles.price} py={1} color='main.gray'>
              {product.priceDiscount && <span className={styles.discount}>{product.priceDiscount}</span>}
              {product.price}
            </Box>
            <Flex className={styles.counter}>
              <span className={styles.down}>-</span>
              <input type='text' defaultValue={1} />
              <span className={styles.up}>+</span>
            </Flex>
          </Box>
        </Flex>
      </Box>
    )
  }

  const renderDesc = () => {
    return (
      <Box className={styles.desc} mb={isDescLogin ? '16px' : '20px'} mt={isDescLogin ? '32px' : '20px'}>
        <Text fontWeight={isBold ? 600 : 0}>{descPopup}</Text>
      </Box>
    )
  }

  const renderImage = () => {
    return (
      <Box mt={6}>
        <Image className={styles.imagePopup} src={imgPopup} alt={titlePopup} />
      </Box>
    )
  }

  const renderBtnOk = () => {
    return (
      <Box className={btnOk} onClick={onSubmit} w={isDescLogin ? '260px' : ''}>
        {contentOkBtn}
      </Box>
    )
  }

  const renderBtnCancel = () => {
    return (
      <Box className={btnCancel} onClick={onClose}>
        {contentCancelBtn}
      </Box>
    )
  }

  const renderDescMore = () => {
    return (
      <Text align='center' fontSize={{ base: '15', md: '16' }} mt='16px'>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        Don't have an account?&nbsp;
        <Link color='main.primary' style={{ textDecoration: 'underline' }}>
          Sign up here
        </Link>
      </Text>
    )
  }

  return (
    <>
      <Box className={styles.container}>
        <Box className={styles.title}>{titlePopup}</Box>
        {isImg && renderImage()}
        {isDesc && renderDesc()}
        {isMiniCart && renderMiniCart()}
        {isOkBtn && renderBtnOk()}
        {isCancelBtn && renderBtnCancel()}
        {isDescLogin && renderDescMore()}
      </Box>
    </>
  )
}

export default Popup
