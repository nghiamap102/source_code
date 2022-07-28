import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export const useLangSwitch = () => {
  const router = useRouter()
  const [lang, setLang] = useState<string>(router?.defaultLocale ?? 'vi')

  const getContentWithLanguage = ({ contentVi, contentEn }: { contentVi?: string; contentEn?: string }): string => {
    return lang === 'en' ? contentEn ?? '' : contentVi ?? ''
  }

  useEffect(() => {
    if (router?.locale) {
      setLang(router?.locale)
    }
  }, [router])

  return { lang, getContentWithLanguage }
}
