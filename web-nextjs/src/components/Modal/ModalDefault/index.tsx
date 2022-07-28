import React, { useImperativeHandle, useEffect } from 'react'
import {
  Modal as ModalChakra,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  ModalBody,
  ModalProps as ModalPropsChakra,
  SpaceProps,
  BackgroundProps
} from '@chakra-ui/react'

export type ModalType = Omit<ModalPropsChakra, 'isOpen' | 'onClose' | 'children'>

interface ModalProps extends ModalType {
  header?: React.ReactElement
  footer?: React.ReactElement
  styleHeader?: SpaceProps
  styleBody?: SpaceProps | BackgroundProps
  styleFooter?: SpaceProps
  // eslint-disable-next-line no-unused-vars
  onChangeModal?: (isOpen: boolean) => void
}

export interface ModalRef {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const Modal = React.forwardRef<ModalRef, React.PropsWithChildren<ModalProps>>(
  ({ header, footer, children, styleHeader, styleBody, styleFooter, onChangeModal, ...props }, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
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

    useEffect(() => {
      onChangeModal?.(isOpen)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen])

    return (
      <ModalChakra isOpen={isOpen} onClose={onClose} isCentered {...props}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader {...styleHeader}>{header}</ModalHeader>
          <ModalBody {...styleBody}>{children}</ModalBody>
          <ModalFooter {...styleFooter}>{footer}</ModalFooter>
        </ModalContent>
      </ModalChakra>
    )
  }
)

export default Modal
