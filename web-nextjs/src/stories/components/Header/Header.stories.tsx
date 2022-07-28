import React, { ReactChild, ReactChildren } from 'react'
import { Provider } from 'react-redux'
import store from 'src/app/store'
import Header from 'src/components/Layout/Header'
import { ChakraProvider } from '@chakra-ui/react'
import Global from 'src/theme/global'
import theme from 'src/theme/theme'
// import data from 'src/mock/components/Header/data.json'

interface IChildren {
  children: ReactChild | ReactChildren
}

const Store: React.FC<IChildren> = ({ children }) => (
  <ChakraProvider theme={theme}>
    <Global />
    <Provider store={store}>{children}</Provider>
  </ChakraProvider>
)

const HeaderStories = {
  title: 'Components/Layout/Header',
  component: Header,
  decorators: [(story: any) => <>{story()}</>]
}
export default HeaderStories

const Template = (args: any) => <Header {...args} />

export const DefaultHeader: any = Template.bind({})

DefaultHeader.decorators = [(story: any) => <Store>{story()}</Store>]
