import { IProductCard } from 'src/components/Product/ProductCard/ProductCard.d'
export interface IPopup {
  titlePopup: string
  descPopup: string
  isOkBtn?: boolean
  contentOkBtn?: string
  isCancelBtn?: boolean
  contentCancelBtn?: string
  isImg?: boolean
  imgPopup?: string
  isBold?: boolean
  isDesc?: boolean
  isMiniCart?: boolean
  product?: Object<IProductCard>
  isSuccess?: boolean
  urlReturn?: string
  // eslint-disable-next-line no-undef
  onSubmit?: () => voild
  // eslint-disable-next-line no-undef
  onClose?: () => voild
  size?: string
  isDescLogin?: boolean
}
