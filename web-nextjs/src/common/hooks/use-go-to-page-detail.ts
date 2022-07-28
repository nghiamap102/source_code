import { useRef } from 'react'
import { useCheckConfirm18 } from 'src/common/hooks/use-confirm-18'
import { ToastConst } from 'src/common/constants'
import { useShowToast } from 'src/common/hooks/use-toast'
import { useRouter } from 'next/router'
export const useGoToPageDetail = () => {
  const router = useRouter()
  const idRef = useRef<string>()
  const parentCodeRef = useRef<string>()
  const { checkConfirm18 } = useCheckConfirm18()
  const { toastInfo } = useShowToast()

  const resolveConfirm18 = () => {
    if (!!parentCodeRef.current) {
      router.push(`/products/${idRef.current}${parentCodeRef.current && `?parent_code=${parentCodeRef.current}`}`, '', {
        locale: router.locale
      })
    } else {
      router.push(`/products/${idRef.current}`, '', { locale: router.locale })
    }
  }

  const rejectConfirm18 = () => {
    toastInfo(ToastConst.CONFIRM_18_CONSTANT)
  }

  const handelGoToPageDetail = ({
    sku_id,
    parent_code,
    age_verification
  }: {
    sku_id: string
    parent_code?: string
    age_verification?: boolean
  }) => {
    idRef.current = sku_id
    parentCodeRef.current = parent_code
    checkConfirm18(age_verification ?? false, resolveConfirm18, rejectConfirm18)
  }

  return { handelGoToPageDetail }
}
