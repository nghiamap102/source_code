import { CloseIcon } from '@chakra-ui/icons'
import { Box, Button, Center, Heading, IconButton, Image, Text, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import Modal, { ModalRef } from '../ModalDefault'
import moment from 'moment'
import { useIntl } from 'react-intl'

interface NoteModalProps {
  onCloseModal?: () => void
  onConfirmModal?: () => void
  code?: string
  expiryDate?: string
  shortDescription?: string
  longDescription?: string[]
  isApplied: boolean
}

const DetailVoucherModal = React.forwardRef<ModalRef, NoteModalProps>(
  ({ onCloseModal, onConfirmModal, code, expiryDate, shortDescription, longDescription, isApplied }, ref) => {
    const intl = useIntl()
    const onClose = () => {
      onCloseModal?.()
    }

    const onConfirm = () => {
      onConfirmModal?.()
    }

    return (
      <Modal
        size={'sm'}
        ref={ref}
        header={
          <Box backgroundColor={'#FFCC46'} padding={'10px 0'}>
            <Center>
              <Heading size='md'>
                <Image src='/BIPBIPBLUE-1.png' w={'50px'} h={'50px'} alt={'image'} />
              </Heading>
              <IconButton
                onClick={onClose}
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
          </Box>
        }
        styleHeader={{
          padding: '5px'
        }}
        footer={
          <Box display='flex' w='full'>
            <Button
              flex='1'
              bg={!isApplied ? '#FFCB47' : 'white'}
              borderColor={isApplied ? 'gray' : 'white'}
              borderWidth={'1px'}
              // onClick={onConfirm}>{!isApplied ? "Sử dụng bây giờ" : "Huỷ sử dụng"}</Button>
              onClick={onConfirm}
            >
              {!isApplied
                ? intl.formatMessage({
                    id: 'IYzY7I',
                    defaultMessage: 'Sử dụng bây giờ',
                    description: ''
                  })
                : intl.formatMessage({
                    id: 'aF4wuM',
                    defaultMessage: 'Huỷ sử dụng',
                    description: ''
                  })}
            </Button>
          </Box>
        }
        styleBody={{
          backgroundColor: '#F2F2F2',
          padding: '0 10px'
        }}
      >
        <VStack
          alignItems={'self-start'}
          mb={'20px'}
          backgroundColor={'white'}
          borderRadius={'5px'}
          p={'15px 20px'}
          mt={'5px'}
        >
          <HStack>
            <Text
              py='3px'
              fontWeight='600'
              display={'inline-block'}
              bg='#FFCB47'
              fontSize={'12px'}
              // mb={expiryDate ? 0 : '10px'}
              textTransform='uppercase'
            >
              {code}
            </Text>
            {expiryDate && (
              <Text color={'#787880'}>
                {' '}
                {intl.formatMessage({
                  id: 'R3w3rz',
                  defaultMessage: 'HSD:',
                  description: ''
                })}{' '}
                {moment(expiryDate).format('DD/MM/YYYY')}
              </Text>
            )}
          </HStack>
          <Text marginTop={0}>{shortDescription}</Text>
        </VStack>
        <VStack alignItems={'self-start'} backgroundColor={'white'} borderTopRadius={'5px'} p={'10px'} mt={'5px'}>
          <Text w='full' wordBreak='break-word' mb={'10px'}>
            {intl.formatMessage({
              id: 'zTxUXJ',
              defaultMessage: 'ĐIỀU KIỆN ÁP DỤNG',
              description: ''
            })}
          </Text>
          {longDescription && longDescription?.length > 0 ? (
            longDescription?.map((des) => <Text fontSize={'13px'}>- {des ?? 'NaN'}</Text>)
          ) : (
            <Text color={'red'}>
              {intl.formatMessage({
                id: 'NnEGbl',
                defaultMessage: 'Không có điều kiện áp dụng.',
                description: ''
              })}
            </Text>
          )}
        </VStack>
      </Modal>
    )
  }
)

export default DetailVoucherModal
