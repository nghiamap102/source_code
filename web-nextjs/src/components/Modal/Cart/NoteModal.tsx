import { Box, Button, Center, Divider, Heading, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'
import Modal, { ModalRef } from '../ModalDefault'

interface NoteModalProps {
  onCloseModal?: () => void
  // eslint-disable-next-line no-unused-vars
  onConfirmModal?: (valueNote: string) => void
  valueInit: string
}

const NoteModal = React.forwardRef<ModalRef, NoteModalProps>(({ onCloseModal, onConfirmModal, valueInit }, ref) => {
  const [valueNote, setValueNote] = useState<string>(valueInit)
  const intl = useIntl()
  const onClose = () => {
    onCloseModal?.()
  }
  const onConfirm = () => {
    onConfirmModal?.(valueNote)
  }

  const onChangeModal = (isOpen: boolean) => {
    if (isOpen) {
      setValueNote(valueInit)
    }
  }

  return (
    <Modal
      onChangeModal={onChangeModal}
      ref={ref}
      header={
        <Box>
          <Center pb='15px'>
            <Heading size='md'>
              {intl.formatMessage({
                id: 'Bh9_OF',
                defaultMessage: 'Ghi chú',
                description: ''
              })}
            </Heading>
          </Center>
          <Divider />
        </Box>
      }
      footer={
        <Box display='flex' w='full'>
          <Button flex='1' variant='outline' mr='10px' onClick={onClose}>
            {intl.formatMessage({
              id: 'FP32eM',
              defaultMessage: 'Huỷ',
              description: ''
            })}
          </Button>
          <Button flex='1' bg='#FFCB47' isDisabled={valueNote === valueInit} onClick={onConfirm}>
            {intl.formatMessage({
              id: 'B_A6UF',
              defaultMessage: 'Lưu',
              description: ''
            })}
          </Button>
        </Box>
      }
    >
      <Textarea
        placeholder={intl.formatMessage({
          id: 'Bh9_OF',
          defaultMessage: 'Ghi chú',
          description: ''
        })}
        value={valueNote}
        onChange={(e) => setValueNote(e.target.value)}
      />
    </Modal>
  )
})

export default NoteModal
