import { useEffect, useState } from 'react'
import { LocalStorageConst } from '../constants'

const MAX_STORE_LOCAL = 5

const getRecentSearchLocalStorage = (): string[] => {
  const data = localStorage.getItem(LocalStorageConst.RECENT_SEARCH_KEY_LOCAL_STORAGE)
  return data ? JSON.parse(data) : null
}

const setRecentSearchLocalStorage = (params: string[]) => {
  localStorage.setItem(LocalStorageConst.RECENT_SEARCH_KEY_LOCAL_STORAGE, JSON.stringify(params))
}

export const useRecentSearch = () => {
  const [recentSearch, setRecentSearch] = useState<string[]>([])

  const saveRecentSearch = (arrRecentSearchNew: string[]) => {
    setRecentSearch(arrRecentSearchNew)
    setRecentSearchLocalStorage(arrRecentSearchNew)
  }

  const pushRecentSearch = (params: string) => {
    let recentSearchNew = [...recentSearch].filter((e) => e !== params)
    if (recentSearchNew.length >= MAX_STORE_LOCAL) {
      recentSearchNew.pop()
    }
    saveRecentSearch([params, ...recentSearchNew])
  }

  const removeRecentSearch = (params: string) => {
    let recentSearchNew = [...recentSearch].filter((e) => e !== params)
    saveRecentSearch(recentSearchNew)
  }

  useEffect(() => {
    const data = getRecentSearchLocalStorage()
    if (data) {
      setRecentSearch(data)
    } else {
      setRecentSearchLocalStorage([])
    }
  }, [])

  return { recentSearch, pushRecentSearch, removeRecentSearch }
}
