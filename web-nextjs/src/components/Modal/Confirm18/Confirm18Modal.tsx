const dataLang = {
  vi: {
    title: 'Yêu cầu xác minh tuổi',
    txtContent:
      'Bạn phải từ 18 tuổi trở lên mới có thể truy cập vào sản phẩm / danh mục này. Vui lòng xác minh tuổi của bạn',
    txtConfirm: 'Tôi trên 18 tuổi',
    txtCancel: 'Tôi chưa đủ 18 tuổi'
  },
  en: {
    title: 'Age Verification',
    txtContent:
      'You must be 18 years old or older to access this product/category information. Please verify your age by seleting below.',
    txtConfirm: 'I’m 18 or older',
    txtCancel: 'I’m under 18'
  }
}

import React from 'react'
import Modal, { ModalRef } from '../ModalDefault'
import { Text, Box, Button, Divider, Heading, Center, IconButton } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

interface Confirm18ModalProps {
  onCloseModal: () => void
  onResolve: () => void
  onReject: () => void
}

const Confirm18Modal = React.forwardRef<ModalRef, Confirm18ModalProps>(({ onCloseModal, onResolve, onReject }, ref) => {
  const [lang] = React.useState<'vi' | 'en'>('vi')

  const onClickClose = () => {
    onCloseModal?.()
  }

  return (
    <Modal
      ref={ref}
      styleHeader={{ p: '0' }}
      header={
        <Box>
          <Center p='20px 0'>
            <Heading size='md'>{dataLang?.[lang].title}</Heading>
            <IconButton
              onClick={onClickClose}
              position='absolute'
              top='10px'
              right='10px'
              alignItems='flex-end'
              variant='unstyled'
              colorScheme='teal'
              aria-label='Close category'
              icon={<CloseIcon />}
            />
          </Center>
          <Divider />
        </Box>
      }
      footer={
        <Box w='full' display={'flex'} flexDirection={'column'}>
          <Button w='full' bg='#FFCC46' onClick={() => onResolve()}>
            {dataLang?.[lang].txtConfirm}
          </Button>
          <Button variant={'link'} color={'#FF3D00'} textDecoration={'underline'} mt='20px' onClick={() => onReject()}>
            {dataLang?.[lang].txtCancel}
          </Button>
        </Box>
      }
    >
      <Text fontWeight={400}>{dataLang?.[lang].txtContent}</Text>
    </Modal>
  )
})

export default Confirm18Modal
