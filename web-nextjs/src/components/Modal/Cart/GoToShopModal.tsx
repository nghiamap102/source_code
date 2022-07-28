import React, { useImperativeHandle } from 'react'
import {
  Button,
  Modal,
  Box,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  Center,
  Divider,
  ModalBody,
  Icon
} from '@chakra-ui/react'

import { FaShoppingCart } from 'react-icons/fa'
import { useIntl } from 'react-intl'

interface GoToShopModalProps {
  onGoToShopping: () => void
}
export interface GoToShopModalRef {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const GoToShopModal = React.forwardRef<GoToShopModalRef, GoToShopModalProps>(({ onGoToShopping }, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const intl = useIntl()

  useImperativeHandle(
    ref,
    () => ({
      isOpen,
      onOpen,
      onClose
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const onClick = () => {
    onGoToShopping && onGoToShopping()
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size='sm'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Center>
              <Box borderRadius='14px' padding='1rem' backgroundColor='#EBFBFA'>
                <Icon as={FaShoppingCart} boxSize='1.9rem' color='#00C7C4' />
              </Box>
            </Center>
          </ModalHeader>
          <ModalBody pb={6}>
            <Center textAlign='center'>
              {intl.formatMessage({
                id: 'WKNtNT',
                defaultMessage: 'Giỏ hàng bị trống, vui lòng cập nhật lại giỏ hàng của bạn',
                description: ''
              })}
            </Center>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <Button
              colorScheme='main'
              // mr={3}
              bg='main.300'
              color={'black'}
              isFullWidth={true}
              onClick={onClick}
              border={'none'}
              fontWeight={600}
            >
              {intl.formatMessage({
                id: '6SUb-p',
                defaultMessage: 'Cập nhật',
                description: ''
              })}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
})

export default GoToShopModal
