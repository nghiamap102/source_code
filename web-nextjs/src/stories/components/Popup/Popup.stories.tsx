import React, { ReactChild, ReactChildren } from 'react'
import { Provider } from 'react-redux'
import store from 'src/app/store'
import Popup from 'src/components/Popup'
import { ChakraProvider } from '@chakra-ui/react'
import Fonts from 'src/theme/common/fonts'
import theme from 'src/theme/theme'

interface IChildren {
  children: ReactChild | ReactChildren
}

const Store: React.FC<IChildren> = ({ children }) => (
  <ChakraProvider theme={theme}>
    <Fonts />
    <Provider store={store}>{children}</Provider>
  </ChakraProvider>
)

const PopupStories = {
  title: 'Components/Popup',
  component: Popup,
  decorators: [(story: any) => <div>{story()}</div>]
}
export default PopupStories

const Template = (args: any) => <Popup {...args} />

export const PopupDraft: any = Template.bind({})

PopupDraft.args = {
  titlePopup: 'Join Group',
  descPopup: 'Are you sure you want to join “Fruit” group?',
  isOkBtn: true,
  contentOkBtn: 'Join',
  isCancelBtn: false,
  contentCancelBtn: 'No, Thanks',
  isImg: false,
  imgPopup: '/images/product/product-card/star.svg',
  isBold: false,
  isMiniCart: true,
  product: {
    productName: 'Locally Tamarind My Bell 240mL Alu Can',
    productImage: '/images/product/product-card/draft-1.png',
    productPath: 'https://www.figma.com/',
    price: 'S$29.90',
    priceDiscount: 'S$49.90',
    rating: 1,
    isWishlisted: false,
    isExternal: false
  }
}

PopupDraft.decorators = [(story: any) => <Store>{story()}</Store>]
