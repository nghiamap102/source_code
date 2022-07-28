import React, { ReactChild, ReactChildren } from 'react'
import { Provider } from 'react-redux'
import store from 'src/app/store'
import ProductList from 'src/components/Product/ProductList'
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

const ProductListStories = {
  title: 'Components/Product/ProductList',
  component: ProductList,
  decorators: [(story: any) => <>{story()}</>]
}
export default ProductListStories

const Template = (args: any) => <ProductList {...args} />

export const DefaultProductList: any = Template.bind({})

DefaultProductList.args = {
  productList: data
}

DefaultProductList.decorators = [(story: any) => <Store>{story()}</Store>]
