import React, { ReactChild, ReactChildren } from 'react'
import { Provider } from 'react-redux'
import store from 'src/app/store'
import ProductCard from 'src/components/Product/ProductCard'
import { ChakraProvider } from '@chakra-ui/react'
import Global from 'src/theme/global'
import theme from 'src/theme/theme'

interface IChildren {
  children: ReactChild | ReactChildren
}

const Store: React.FC<IChildren> = ({ children }) => (
  <ChakraProvider theme={theme}>
    <Global />
    <Provider store={store}>{children}</Provider>
  </ChakraProvider>
)

const ProductCardStories = {
  title: 'Components/Product/ProductCard',
  component: ProductCard,
  decorators: [(story: any) => <div>{story()}</div>]
}
export default ProductCardStories

const Template = (args: any) => <ProductCard {...args} />

export const ProductCardDraft: any = Template.bind({})

ProductCardDraft.args = {
  productName: 'Locally Tamarind My Bell 240mL Alu Can',
  productImage: '/images/product/product-card/draft-1.png',
  productPath: 'https://www.figma.com/',
  price: 'S$29.90',
  priceDiscount: 'S$49.90',
  rating: 1,
  isWishlisted: false,
  isExternal: false
}

ProductCardDraft.decorators = [(story: any) => <Store>{story()}</Store>]
