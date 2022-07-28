import React, { ReactChild, ReactChildren } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Provider } from 'react-redux'
import store from 'src/app/store'
import { ChakraProvider } from '@chakra-ui/react'
import Fonts from 'src/theme/common/fonts'
import theme from 'src/theme/theme'
import { RecipesHome } from 'src/components/Recipes/Home'
import data from 'src/mock/components/recipes/data.json'
import get from 'lodash/get'

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
  component: RecipesHome
} as ComponentMeta<typeof RecipesHome>

const Template: ComponentStory<typeof RecipesHome> = (args) => <RecipesHome {...args} />

export const RecipesBase = Template.bind({})

RecipesBase.args = {
  listRecipes: get(data, 'recipes'),
  avaSrc: '/images/recipes/avatar.jpg',
  name: 'Beidou',
  point: 3.764
}
RecipesBase.decorators = [(story: any) => <Store>{story()}</Store>]
