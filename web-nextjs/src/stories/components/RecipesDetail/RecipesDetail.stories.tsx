import React, { ReactChild, ReactChildren } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Provider } from 'react-redux'
import store from 'src/app/store'
import { ChakraProvider } from '@chakra-ui/react'
import Fonts from 'src/theme/common/fonts'
import theme from 'src/theme/theme'
import _ from 'lodash'
import { RecipesDetail } from 'src/components/RecipesDetail'

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
  title: 'Components/RecipesDetail',
  component: RecipesDetail
} as ComponentMeta<typeof RecipesDetail>

const Template: ComponentStory<typeof RecipesDetail> = (args) => <RecipesDetail {...args} />

export const RecipesDetailBase = Template.bind({})

RecipesDetailBase.args = {}
RecipesDetailBase.decorators = [(story: any) => <Store>{story()}</Store>]
