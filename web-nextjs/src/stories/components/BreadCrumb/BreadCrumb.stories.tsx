import React, { ReactChild, ReactChildren } from 'react'
import { Provider } from 'react-redux'
import store from 'src/app/store'
import BreadCrumb from 'src/components/BreadCrumb'
import { ChakraProvider } from '@chakra-ui/react'
import Global from 'src/theme/global'
import theme from 'src/theme/theme'
import data from 'src/mock/components/BreadCrumb/data.json'

interface IChildren {
  children: ReactChild | ReactChildren
}

const Store: React.FC<IChildren> = ({ children }) => (
  <ChakraProvider theme={theme}>
    <Global />
    <Provider store={store}>{children}</Provider>
  </ChakraProvider>
)

const BreadCrumbStories = {
  title: 'Components/BreadCrumb',
  component: BreadCrumb,
  decorators: [(story: any) => <>{story()}</>]
}
export default BreadCrumbStories

const Template = (args: any) => <BreadCrumb {...args} />

export const DefaultBreadCrumb: any = Template.bind({})
export const DisableLastBreadCrumb: any = Template.bind({})

DefaultBreadCrumb.args = {
  items: data
}
DisableLastBreadCrumb.args = {
  items: data,
  disableLinkLastBreadcrumb: true
}

DefaultBreadCrumb.decorators = [(story: any) => <Store>{story()}</Store>]
DisableLastBreadCrumb.decorators = [(story: any) => <Store>{story()}</Store>]
