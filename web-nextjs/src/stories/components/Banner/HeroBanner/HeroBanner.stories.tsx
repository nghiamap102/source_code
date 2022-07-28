import React, { ReactChild, ReactChildren } from 'react'
import { Provider } from 'react-redux'
import store from 'src/app/store'
import HeroBanner from 'src/components/Banner/HeroBanner'
import { ChakraProvider } from '@chakra-ui/react'
import theme from 'src/theme/theme'
import Global from 'src/theme/global'
import data from 'src/mock/components/HeroBanner/data.json'

interface IChildren {
  children: ReactChild | ReactChildren
}

const Store: React.FC<IChildren> = ({ children }) => (
  <ChakraProvider theme={theme}>
    <Global />
    <Provider store={store}>{children}</Provider>
  </ChakraProvider>
)

const HeroBannerStories = {
  title: 'Components/Banner/HeroBanner',
  component: HeroBanner,
  decorators: [(story: any) => <>{story()}</>]
}
export default HeroBannerStories

const Template = (args: any) => <HeroBanner {...args} />

export const DefaulHeroBanner: any = Template.bind({})

DefaulHeroBanner.args = {
  bannerList: data
}

DefaulHeroBanner.decorators = [(story: any) => <Store>{story()}</Store>]
