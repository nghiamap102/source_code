import React from 'react'
import Modal, { ModalRef } from '../ModalDefault'
import { Button, Center, Text, Flex } from '@chakra-ui/react'
import { useIntl } from 'react-intl'

interface LogoutModalProps {
  onClose: () => void
  onConfirm: () => void
}

const LogoutModal = React.forwardRef<ModalRef, LogoutModalProps>(({ onClose, onConfirm }, ref) => {
  const intl = useIntl()
  return (
    <Modal
      size='sm'
      ref={ref}
      footer={
        <Flex w='full'>
          <Button flex='1' mr='10px' bg='#FFCB47' onClick={onConfirm}>
            Có
          </Button>
          <Button flex='1' variant='outline' onClick={onClose}>
            {intl.formatMessage({
              id: 'DQN1fb',
              defaultMessage: 'Không',
              description: ''
            })}
          </Button>
        </Flex>
      }
    >
      <Center>
        <Text>
          {intl.formatMessage({
            id: 'U54zrO',
            defaultMessage: 'Bạn có muốn đăng xuất không?',
            description: ''
          })}
        </Text>
      </Center>
    </Modal>
  )
})

export default LogoutModal
