import React, { ReactChild, ReactChildren } from 'react'
import { Provider } from 'react-redux'
import store from 'src/app/store'
import Footer from 'src/components/Layout/Footer'
import { ChakraProvider } from '@chakra-ui/react'
import Global from 'src/theme/global'
import theme from 'src/theme/theme'
import data from 'src/mock/components/Footer/data.json'

interface IChildren {
  children: ReactChild | ReactChildren
}

const Store: React.FC<IChildren> = ({ children }) => (
  <ChakraProvider theme={theme}>
    <Global />
    <Provider store={store}>{children}</Provider>
  </ChakraProvider>
)

const FooterStories = {
  title: 'Components/Layout/Footer',
  component: Footer,
  decorators: [(story: any) => <>{story()}</>]
}
export default FooterStories

const Template = (args: any) => <Footer {...args} />

export const DefaultFooter: any = Template.bind({})

DefaultFooter.args = {
  footerNavigation: data
}

DefaultFooter.decorators = [(story: any) => <Store>{story()}</Store>]
