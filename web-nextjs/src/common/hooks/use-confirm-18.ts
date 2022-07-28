import { useContext } from 'react'
import { Confirm18Context } from '../context'
import { getConfirm18LocalStorage } from '../context/Confirm18'

export const useCheckConfirm18 = () => {
  const { showModal } = useContext(Confirm18Context)

  const checkHasConfirm18 = (): boolean | null => {
    const data = getConfirm18LocalStorage()
    if (data) {
      const { isUnder18 } = data
      if (isUnder18) {
        return true
      } else {
        return false
      }
    } else {
      return null
    }
  }

  const checkConfirm18 = (isCheck: boolean | null, resolve: () => void, reject: () => void) => {
    if (isCheck) {
      const hasConfirm18 = checkHasConfirm18()
      if (hasConfirm18 !== null) {
        if (hasConfirm18) {
          reject()
        } else {
          resolve()
        }
      } else {
        showModal?.(resolve, reject)
      }
    } else {
      resolve()
    }
  }

  return { checkConfirm18, checkHasConfirm18 }
}
