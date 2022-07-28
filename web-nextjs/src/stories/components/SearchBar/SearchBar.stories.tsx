import React from 'react'
import API from 'src/common/config'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SearchBarTheme } from 'src/theme/theme'
import { SearchBar } from 'src/components/SearchBar'

export default {
  title: 'Example/SearchBar',
  component: SearchBar
} as ComponentMeta<typeof SearchBar>

const Template: ComponentStory<typeof SearchBar> = (args) => <SearchBar {...args} />

export const SearchBarTest = Template.bind({})
SearchBarTest.args = {
  placeholder: 'Find a product',
  borderColor: SearchBarTheme.color.gray,
  borderRadius: SearchBarTheme.borderRadius[3],
  backgroundColor: SearchBarTheme.backgroundColor.white,
  color: SearchBarTheme.color.gray,
  api: API.MOCK.SEARCH_BAR
}
