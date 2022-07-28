import { useEffect } from 'react'

interface IRef {
  current: HTMLElement | null
}

const useOnClickOutSide = (ref: IRef | null, handler: (arg: any) => void) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref?.current || ref?.current.contains(event.target)) return
      handler(event)
    }
    document.addEventListener('mousedown', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [ref, handler])
}

export default useOnClickOutSide
