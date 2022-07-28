import React, { ReactChild, ReactChildren } from 'react'
import { Provider } from 'react-redux'
import store from 'src/app/store'
import { ProductCardRecipes } from 'src/components/Product/ProductCardRecipes'
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

const ProductCardRecipesStories = {
  title: 'Components/Product/ProductCardRecipes',
  component: ProductCardRecipes,
  decorators: [(story: any) => <div>{story()}</div>]
}
export default ProductCardRecipesStories

const Template = (args: any) => <ProductCardRecipes {...args} />

export const ProductCardRecipesDraft: any = Template.bind({})

ProductCardRecipesDraft.args = {
  productName: 'Locally Tamarind My Bell 240mL Alu Can',
  productImage: '/images/product/product-card/product-draft.png',
  productPath: 'https://www.figma.com/',
  price: 'S$7.90',
  priceDiscount: 'S$7.90',
  rating: 4,
  isWishlisted: false,
  isExternal: false
}

ProductCardRecipesDraft.decorators = [(story: any) => <Store>{story()}</Store>]
