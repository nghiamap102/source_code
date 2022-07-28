import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogBody } from '@chakra-ui/react'
import Popup from 'src/components/Popup'
import React from 'react'

interface IDialogPopup {
  titlePopup: string
  isDesc?: boolean
  isCancelBtn?: boolean
  isOkBtn?: boolean
  contentCancelBtn?: string
  contentOkBtn?: string
  descPopup?: string
  isSuccess?: boolean
  urlReturn?: string
  isOpen: boolean
  onClose: () => void
  onSubmit?: () => {}
  size?: string
  isDescLogin?: boolean
}

const DialogPopup = React.forwardRef<any, IDialogPopup>((props, ref: any) => {
  const {
    titlePopup = '',
    isDesc = false,
    isCancelBtn = false,
    contentOkBtn = '',
    isOkBtn,
    contentCancelBtn = '',
    descPopup = '',
    isOpen,
    isDescLogin = false,
    onClose,
    onSubmit,
    size = '',
    isSuccess,
    urlReturn
  } = props
  return (
    <>
      <AlertDialog leastDestructiveRef={ref} onClose={onClose} isOpen={isOpen} isCentered>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogBody>
            <>
              <Popup
                titlePopup={titlePopup}
                isDesc={isDesc}
                isCancelBtn={isCancelBtn}
                isOkBtn={isOkBtn}
                contentCancelBtn={contentCancelBtn}
                contentOkBtn={contentOkBtn}
                descPopup={descPopup}
                onSubmit={onSubmit}
                urlReturn={urlReturn}
                isSuccess={isSuccess}
                onClose={onClose}
                size={size}
                isDescLogin={isDescLogin}
              />
            </>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
})

export default DialogPopup
