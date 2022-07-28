import { FormikValues } from 'formik'
import { IntlMessageFormat } from 'intl-messageformat'
import get from 'lodash/get'
import has from 'lodash/has'
import keys from 'lodash/keys'
import { ICarouselItem, ICarouselList } from '../Module.d'

const isNonEmptyArray = (items: Array<any>) => Array.isArray(items) && items.length > 0

const stringToHTML = (str: string) => {
  const e = document.createElement('div')
  e.innerHTML = str
  return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue
}

const onErrorImage = (w: number = 150, h?: number): string => {
  const resource = 'https://via.placeholder.com'
  const imgSize = h ? `${w}x${h}` : w

  return `${resource}/${imgSize}`
}

const getBanner = (data: ICarouselItem) => {
  const desktop = data.field_ci_image_desktop
  const mobile = data.field_ci_image_mobile

  return {
    desktop: {
      url: desktop?.url,
      absolute_url: desktop?.absolute_url
    },
    mobile: {
      url: mobile?.url,
      absolute_url: mobile?.absolute_url
    }
  }
}

const mappingDataBanner = (data: ICarouselList) => {
  const carouselItem = get(data, 'field_carousel_items', [])
  if (!isNonEmptyArray(carouselItem)) return []

  return carouselItem.map((data: ICarouselItem) => {
    const images = getBanner(data)
    const { title, uid, created } = data
    return {
      uid,
      title,
      created,
      images: {
        desktop: images?.desktop.absolute_url || images?.desktop.url,
        mobile: images?.mobile.absolute_url || images?.mobile.url
      },
      fallback: {
        desktop: onErrorImage(1440, 900),
        mobile: onErrorImage(300, 400)
      }
    }
  })
}

export type validationFieldProps = {
  validator: (...params: any) => boolean
  code: string
  codeOptions?: {
    [key: string]: any
  }
}

export interface IValidations {
  [key: string]: validationFieldProps[]
}

const checkValueError = (validations: IValidations) => (values: FormikValues, props?: any) => {
  const error: { [key: string]: any } = {}
  let checkValidate = false
  keys(validations).forEach((path: string) => {
    const pathValue = get(values, path)
    const isExistingKey = has(values, path)
    if (!isExistingKey) {
      // tslint:disable-next-line:no-console
      console && console.error(`The field ${path} does not existing on the form`)
    }
    for (let i = 0; i < validations[path].length; i += 1) {
      const pathItem = validations[path][i] ?? {}
      checkValidate = pathItem.validator(pathValue, values, props)
      if (!checkValidate) {
        const code = pathItem.code
        const codeOptions = pathItem.codeOptions ?? {}
        const codeOptionLength = Object.entries(codeOptions)?.length
        const newMessageFormat =
          codeOptionLength > 0
            ? new IntlMessageFormat(code, 'en').format({ ...codeOptions })
            : new IntlMessageFormat(code, 'en').format()
        error[path] = newMessageFormat
        return error
      }
    }
  })

  return error
}

const paginationWithDots = (c: any, m: any) => {
  const current = c
  const last = m
  const delta = 2
  const left = current - delta
  const right = current + delta + 1
  const range = []
  const rangeWithDots = []
  let l

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i <= last; i++) {
    if (i === 0 || i === last || (i >= left && i < right)) {
      range.push(i)
    }
  }

  for (const i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l !== 1) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(i)
    l = i
  }

  return rangeWithDots
}

const omit = (obj: any, keyss: any) => Object.fromEntries(Object.entries(obj).filter(([k]) => !keyss.includes(k)))

export {
  isNonEmptyArray,
  stringToHTML,
  getBanner,
  checkValueError,
  onErrorImage,
  paginationWithDots,
  mappingDataBanner,
  omit
}
