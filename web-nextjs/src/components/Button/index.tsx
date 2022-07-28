import { Button } from '@chakra-ui/react'
import React from 'react'

type ButtonProps = {
  children: string
} & React.ComponentProps<typeof Button>

export const ButtonTest = ({ children, ...props }: ButtonProps) => {
  return (
    <Button backgroundColor='rgba(8, 232, 222, 1)' {...props}>
      {children}
    </Button>
  )
}
