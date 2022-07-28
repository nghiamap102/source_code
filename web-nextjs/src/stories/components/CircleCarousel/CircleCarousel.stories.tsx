import React, { ReactChild, ReactChildren } from 'react'
import { Provider } from 'react-redux'
import store from 'src/app/store'
import CircleCarousel from 'src/components/Recipes/CircleCarousel'
import { ChakraProvider } from '@chakra-ui/react'
import Global from 'src/theme/global'
import theme from 'src/theme/theme'
import data from 'src/mock/components/CircleCarousel/data.json'

interface IChildren {
  children: ReactChild | ReactChildren
}

const Store: React.FC<IChildren> = ({ children }) => (
  <ChakraProvider theme={theme}>
    <Global />
    <Provider store={store}>{children}</Provider>
  </ChakraProvider>
)

const CircleCarouselStories = {
  title: 'Components/CircleCarousel',
  component: CircleCarousel,
  decorators: [(story: any) => <>{story()}</>]
}
export default CircleCarouselStories

const Template = (args: any) => <CircleCarousel {...args} />

export const DefaultCircleCarousel: any = Template.bind({})

DefaultCircleCarousel.args = {
  listItem: data
}

DefaultCircleCarousel.decorators = [(story: any) => <Store>{story()}</Store>]
