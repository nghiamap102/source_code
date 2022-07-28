import React, { useImperativeHandle } from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  Center,
  Divider,
  ModalBody,
  HStack
} from '@chakra-ui/react'
import { useIntl } from 'react-intl'

interface ConfirmRemoveModalProps {
  onConfirm?: () => void
}
export interface ConfirmRemoveModalRef {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const ConfirmRemoveModal = React.forwardRef<ConfirmRemoveModalRef, ConfirmRemoveModalProps>(({ onConfirm }, ref) => {
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

  const onClickConfirm = () => {
    onConfirm?.()
    onClose()
  }

  const onClickCancel = () => {
    onClose()
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClickCancel} isCentered size='sm'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Center fontSize='1.125rem' fontWeight={500}>
              {intl.formatMessage({
                id: '78pQtK',
                defaultMessage: 'Lưu ý',
                description: ''
              })}
            </Center>
          </ModalHeader>
          <Divider />

          <ModalBody pb={6}>
            <Center textAlign='center'>
              {intl.formatMessage({
                id: 'buVi4g',
                defaultMessage: 'Bạn có chắc chắn xoá món hàng này?',
                description: ''
              })}
            </Center>
          </ModalBody>
          <Divider />
          <ModalFooter>
            <HStack w='100%'>
              <Button
                // mr={3}
                bgColor='white'
                border='1px solid #A7AEB6'
                bg='main.300'
                color={'black'}
                isFullWidth={true}
                onClick={onClickCancel}
                fontWeight={600}
              >
                {intl.formatMessage({
                  id: '9BYcco',
                  defaultMessage: 'Quay lại',
                  description: ''
                })}
              </Button>
              <Button
                colorScheme='main'
                // mr={3}
                bg='main.300'
                color={'black'}
                isFullWidth={true}
                onClick={onClickConfirm}
                border={'none'}
                fontWeight={600}
              >
                {intl.formatMessage({
                  id: 'WlUf4f',
                  defaultMessage: 'Tiếp tục',
                  description: ''
                })}
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
})

export default ConfirmRemoveModal
