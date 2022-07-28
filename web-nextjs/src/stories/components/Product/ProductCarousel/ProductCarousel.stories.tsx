import React, { ReactChild, ReactChildren } from 'react'
import { Provider } from 'react-redux'
import store from 'src/app/store'
import ProductCarousel from 'src/components/Product/ProductCarousel'
import { ChakraProvider } from '@chakra-ui/react'
import Global from 'src/theme/global'
import theme from 'src/theme/theme'
import data from 'src/mock/components/ProductList/data.json'

interface IChildren {
  children: ReactChild | ReactChildren
}

const Store: React.FC<IChildren> = ({ children }) => (
  <ChakraProvider theme={theme}>
    <Global />
    <Provider store={store}>{children}</Provider>
  </ChakraProvider>
)

const ProductCarouselStories = {
  title: 'Components/Product/ProductCarousel',
  component: ProductCarousel,
  decorators: [(story: any) => <>{story()}</>]
}
export default ProductCarouselStories

const Template = (args: any) => <ProductCarousel {...args} />

export const DefaultProductCarousel: any = Template.bind({})

DefaultProductCarousel.args = {
  productList: data,
  title: 'Top trending products'
}

DefaultProductCarousel.decorators = [(story: any) => <Store>{story()}</Store>]
