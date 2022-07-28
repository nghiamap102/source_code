import React, { ReactChild, ReactChildren } from 'react'
import { Provider } from 'react-redux'
import store from 'src/app/store'
import Dropdown from 'src/components/Dropdown'
import { ChakraProvider } from '@chakra-ui/react'
import theme from 'src/theme/theme'
import Global from 'src/theme/global'
import data from 'src/mock/components/Dropdown/data.json'

interface IChildren {
  children: ReactChild | ReactChildren
}

const Store: React.FC<IChildren> = ({ children }) => (
  <ChakraProvider theme={theme}>
    <Global />
    <Provider store={store}>{children}</Provider>
  </ChakraProvider>
)

const DropdownStories = {
  title: 'Components/Dropdown',
  component: Dropdown,
  decorators: [(story: any) => <>{story()}</>]
}
export default DropdownStories

const Template = (args: any) => <Dropdown {...args} />

export const DefaulDropdown: any = Template.bind({})

DefaulDropdown.args = {
  label: 'Highest Rating',
  dropdownList: data
}

DefaulDropdown.decorators = [(story: any) => <Store>{story()}</Store>]
