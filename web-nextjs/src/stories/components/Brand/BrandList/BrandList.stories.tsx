import React, { ReactChild, ReactChildren } from 'react'
import { Provider } from 'react-redux'
import store from 'src/app/store'
import BrandList from 'src/components/Brand/BrandList'
import { ChakraProvider } from '@chakra-ui/react'
import Global from 'src/theme/global'
import theme from 'src/theme/theme'
import data from 'src/mock/components/BrandList/data.json'

interface IChildren {
  children: ReactChild | ReactChildren
}

const Store: React.FC<IChildren> = ({ children }) => (
  <ChakraProvider theme={theme}>
    <Global />
    <Provider store={store}>{children}</Provider>
  </ChakraProvider>
)

const BrandListStories = {
  title: 'Components/Brand/BrandList',
  component: BrandList,
  decorators: [(story: any) => <>{story()}</>]
}
export default BrandListStories

const Template = (args: any) => <BrandList {...args} />

export const DefaultBrandList: any = Template.bind({})

DefaultBrandList.args = {
  brandList: data
}

DefaultBrandList.decorators = [(story: any) => <Store>{story()}</Store>]
