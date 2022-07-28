import { Image } from '@chakra-ui/react'
import { StyleProps } from '@chakra-ui/system'

import React, { FC } from 'react'

interface Props {
  customStyles?: StyleProps
}

const Fold: FC<Props> = ({ customStyles }) => {
  return (
    <Image
      src='/images/fold-banner.png'
      bg='main.300'
      w='100%'
      h={{ base: '13.03px', md: '50px' }}
      mb={{ base: '-13.03px', md: '-50px' }}
      {...customStyles}
      alt='fold-banner'
    />
  )
}

export default Fold
