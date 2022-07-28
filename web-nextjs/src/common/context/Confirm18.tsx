import React, { useState, useRef, useEffect } from 'react'
import { Confirm18Modal } from 'src/components/Modal/Confirm18'
import { ModalRef } from 'src/components/Modal/ModalDefault'
import { getCustomerId } from '../api/request'
import { LocalStorageConst } from '../constants'
interface Confirm18 {
  // isShowModal?: boolean;
  // setIsShowModal?: (isShow: boolean) => void
  showModal?: (resolve: () => void, reject: () => void) => void
}
export const Confirm18Context = React.createContext<Confirm18>({})

/**
 * TODO:
 * NOTE bug: when not login => {id: undefined, ...}
 * Comeback resolve when you need use id to do something
 * Note: set id again when login success
 */
const saveConfirm18LocalStorage = (params: { isUnder18: boolean }) => {
  const id = getCustomerId()
  localStorage.setItem(LocalStorageConst.CONFIRM_18_KEY_LOCAL_STORAGE, JSON.stringify({ id, ...params }))
}

export const getConfirm18LocalStorage = (): { id: string; isUnder18: boolean } | null => {
  const data = localStorage.getItem(LocalStorageConst.CONFIRM_18_KEY_LOCAL_STORAGE) ?? ''
  return data ? JSON.parse(data) : null
}

const Confirm18Provider: React.FC = ({ children }) => {
  const modalRef = useRef<ModalRef>(null)
  const reSolveRef = useRef<() => void>()
  const rejectRef = useRef<() => void>()

  const showModal = (resolve: () => void, reject: () => void) => {
    modalRef.current?.onOpen()
    reSolveRef.current = resolve
    rejectRef.current = reject
  }

  const hideModal = () => {
    modalRef.current?.onClose()
  }

  const onUnder18 = () => {
    saveConfirm18LocalStorage({ isUnder18: true })
    rejectRef.current?.()
    hideModal()
  }

  const onOlder18 = () => {
    saveConfirm18LocalStorage({ isUnder18: false })
    reSolveRef.current?.()
    hideModal()
  }

  return (
    <Confirm18Context.Provider
      value={{
        showModal
      }}
    >
      {children}
      <Confirm18Modal ref={modalRef} onResolve={onOlder18} onReject={onUnder18} onCloseModal={hideModal} />
    </Confirm18Context.Provider>
  )
}

export default Confirm18Provider
