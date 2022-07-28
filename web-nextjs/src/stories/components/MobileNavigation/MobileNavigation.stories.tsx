import React, { ReactChild, ReactChildren } from 'react'
import { Provider } from 'react-redux'
import store from 'src/app/store'
import MobileNavigation from 'src/components/MobileNavigation'
import { Box, ChakraProvider } from '@chakra-ui/react'
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
const render = (
  <Box position='relative' height='1000px' bg='main.light_orange'>
    <MobileNavigation />
  </Box>
)

const MobileNavigationStories = {
  title: 'Components/MobileNavigation',
  component: render,
  decorators: [(story: any) => <>{story()}</>]
}
export default MobileNavigationStories

const Template = (args: any) => (
  <Box position='relative' height='1000px' bg='main.light_orange'>
    <MobileNavigation {...args} />
  </Box>
)

export const DefaultMobileNavigation: any = Template.bind({})

DefaultMobileNavigation.decorators = [(story: any) => <Store>{story()}</Store>]
