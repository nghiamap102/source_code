import React, { ReactChild, ReactChildren } from 'react'
import { Provider } from 'react-redux'
import store from 'src/app/store'
import RecipesSearch from 'src/components/Recipes/RecipesSearch'
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

const RecipesSearchStories = {
  title: 'Components/Recipes/RecipesSearch',
  component: RecipesSearch,
  decorators: [(story: any) => <>{story()}</>]
}
export default RecipesSearchStories

const Template = (args: any) => <RecipesSearch {...args} />

export const DefaultRecipesSearch: any = Template.bind({})

DefaultRecipesSearch.decorators = [(story: any) => <Store>{story()}</Store>]
