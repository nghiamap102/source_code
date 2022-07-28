import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ButtonTest } from '../../../components/Button'

export default {
  title: 'Example/Buttons',
  component: ButtonTest
} as ComponentMeta<typeof ButtonTest>

const Template: ComponentStory<typeof ButtonTest> = (args) => <ButtonTest {...args} />

export const ButtonBase = Template.bind({})
ButtonBase.args = {
  children: 'ADD TO CART',
  backgroundColor: 'rgba(8, 232, 222, 1)',
  width: '200px',
  margin: 'auto'
}
