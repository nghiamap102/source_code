import { useMediaQuery } from '@chakra-ui/react'

const useDeviceDetect = () => {
  const [isDesktop] = useMediaQuery('(min-width: 768px)')
  const [isMobile] = useMediaQuery('(max-width: 767px)')

  return { isDesktop, isMobile }
}

export default useDeviceDetect
