import { Divider } from '@chakra-ui/react'
import { StyleProps } from '@chakra-ui/system'

import React from 'react'

function MyDivider(props: { customStyles?: StyleProps }) {
  return (
    <Divider
      orientation='horizontal'
      h='0.1px'
      mt='3px'
      mb='10px'
      bgColor='#CFD2D6'
      border='none'
      {...props.customStyles}
    />
  )
}

export default MyDivider
