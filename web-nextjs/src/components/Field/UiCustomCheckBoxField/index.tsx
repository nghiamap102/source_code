/* eslint-disable no-sparse-arrays */
import { Box, Checkbox, CheckboxGroup, Flex, Stack, Text } from '@chakra-ui/react'
import { StringOrNumber } from '@chakra-ui/utils'
import React, { FC } from 'react'
import { isNonEmptyArray } from 'src/utils'

interface UiCustomCheckBoxFieldProps {
  data: any
  // eslint-disable-next-line no-unused-vars
  onChange: (value: StringOrNumber[]) => void
}

const UiCustomCheckBoxField: FC<UiCustomCheckBoxFieldProps> = ({ data, onChange }) => {
  return (
    <Box className='customCheckBoxField'>
      <CheckboxGroup colorScheme='green' onChange={onChange}>
        <Stack>
          <Flex justify='center' style={{ flexWrap: 'wrap' }}>
            {isNonEmptyArray(data) &&
              data.map((ele: any, index: number) => (
                <Box p='15px' key={index}>
                  <Checkbox name={ele?.name} value={ele?.name}>
                    <Text fontSize='12px' fontWeight='700' color='main.primary'>
                      {ele?.name}
                    </Text>
                  </Checkbox>
                </Box>
              ))}
          </Flex>
        </Stack>
      </CheckboxGroup>
    </Box>
  )
}

export default UiCustomCheckBoxField
