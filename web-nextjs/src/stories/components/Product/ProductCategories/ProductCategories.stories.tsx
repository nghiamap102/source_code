import React, { ReactChild, ReactChildren } from 'react'
import { Provider } from 'react-redux'
import store from 'src/app/store'
import ProductCategories from 'src/components/Product/ProductCategories'
import { ChakraProvider } from '@chakra-ui/react'
import Global from 'src/theme/global'
import theme from 'src/theme/theme'
import data from 'src/mock/components/ProductCategories/data.json'

interface IChildren {
  children: ReactChild | ReactChildren
}

const Store: React.FC<IChildren> = ({ children }) => (
  <ChakraProvider theme={theme}>
    <Global />
    <Provider store={store}>{children}</Provider>
  </ChakraProvider>
)

const ProductCategoriesStories = {
  title: 'Components/Product/ProductCategories',
  component: ProductCategories,
  decorators: [(story: any) => <>{story()}</>]
}
export default ProductCategoriesStories

const Template = (args: any) => <ProductCategories {...args} />

export const DefaultProductCategories: any = Template.bind({})

DefaultProductCategories.args = {
  categoryList: data,
  title: 'Product Categories'
}

DefaultProductCategories.decorators = [(story: any) => <Store>{story()}</Store>]
