import React, { ReactChild, ReactChildren } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Provider } from 'react-redux'
import store from 'src/app/store'
import { ChakraProvider } from '@chakra-ui/react'
import Fonts from 'src/theme/common/fonts'
import theme from 'src/theme/theme'
import _ from 'lodash'
import data from 'src/mock/components/recipesdetaildesktop/data.json'
// import { RecipesDetailDesktop } from 'src/pages/recipes/[id]'

interface IChildren {
  children: ReactChild | ReactChildren
}

const Store: React.FC<IChildren> = ({ children }) => (
  <ChakraProvider theme={theme}>
    <Fonts />
    <Provider store={store}>{children}</Provider>
  </ChakraProvider>
)

// export default {
//   title: 'Components/RecipesDetailDesktop',
//   component: RecipesDetailDesktop
// } as ComponentMeta<typeof RecipesDetailDesktop>

// const Template: ComponentStory<typeof RecipesDetailDesktop> = (args) => <RecipesDetailDesktop {...args} />

// export const RecipesDetailDesktopBase: any = Template.bind({})

// RecipesDetailDesktopBase.args = {
//   recipesDetails: data
// }
// RecipesDetailDesktopBase.decorators = [(story: any) => <Store>{story()}</Store>]
