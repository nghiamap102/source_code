import { useToast } from '@chakra-ui/react'

const DURATION = 1500

export const useShowToast = () => {
  const toast = useToast()

  const toastSuccess = (title: string) => {
    toast({
      title: title,
      status: 'success',
      duration: DURATION,
      isClosable: true
    })
  }

  const toastError = (title: string) => {
    toast({
      title: title,
      status: 'error',
      duration: DURATION,
      isClosable: true
    })
  }

  const toastInfo = (title: string) => {
    toast({
      title: title,
      status: 'info',
      duration: DURATION,
      isClosable: true
    })
  }
  return { toastSuccess, toastError, toastInfo }
}
