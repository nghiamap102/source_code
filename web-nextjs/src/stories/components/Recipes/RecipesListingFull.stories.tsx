import React, { ReactChild, ReactChildren } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Provider } from 'react-redux'
import store from 'src/app/store'
import { ChakraProvider } from '@chakra-ui/react'
import Fonts from 'src/theme/common/fonts'
import theme from 'src/theme/theme'
import get from 'lodash/get'
import data from 'src/mock/components/recipes/data.json'
import { RecipesListingFull } from 'src/components/Recipes/ListingFull'

interface IChildren {
  children: ReactChild | ReactChildren
}

const Store: React.FC<IChildren> = ({ children }) => (
  <ChakraProvider theme={theme}>
    <Fonts />
    <Provider store={store}>{children}</Provider>
  </ChakraProvider>
)

export default {
  title: 'Components/Recipes',
  component: RecipesListingFull
} as ComponentMeta<typeof RecipesListingFull>

const Template: ComponentStory<typeof RecipesListingFull> = (args) => <RecipesListingFull {...args} />

export const RecipesListingFullBase = Template.bind({})

RecipesListingFullBase.args = {
  listRecipes: get(data, 'recipesListing'),
  listTitle: get(data, 'listTitle'),
  listRecommend: get(data, 'recommend'),
  avaSrc: '/images/recipes/avatar.jpg'
}
RecipesListingFullBase.decorators = [(story: any) => <Store>{story()}</Store>]
