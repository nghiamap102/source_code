import React, { ReactChild, ReactChildren } from 'react'
import { Provider } from 'react-redux'
import store from 'src/app/store'
import { ProductCardDetails } from 'src/components/Product/ProductCardDetails'
import { ChakraProvider } from '@chakra-ui/react'
import Fonts from 'src/theme/common/fonts'
import theme from 'src/theme/theme'
import data from 'src/mock/components/ProductList/data.json'

interface IChildren {
  children: ReactChild | ReactChildren
}

const Store: React.FC<IChildren> = ({ children }) => (
  <ChakraProvider theme={theme}>
    <Fonts />
    <Provider store={store}>{children}</Provider>
  </ChakraProvider>
)

const ProductCardDetailsStories = {
  title: 'Components/Product/ProductCardDetails',
  component: ProductCardDetails,
  decorators: [(story: any) => <div>{story()}</div>]
}
export default ProductCardDetailsStories

const Template = (args: any) => <ProductCardDetails {...args} />

export const ProductCardDetailsDraft: any = Template.bind({})

ProductCardDetailsDraft.args = {
  productName: 'Locally Tamarind My Bell 240mL Alu Can',
  productImage: '/images/product/product-card/draft-1.png',
  productPath: 'https://www.figma.com/',
  price: 'S$29.90',
  priceDiscount: 'S$49.90',
  rating: 1,
  isWishlisted: false,
  isExternal: false,
  producList: data
}

ProductCardDetailsDraft.decorators = [(story: any) => <Store>{story()}</Store>]
