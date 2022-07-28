import { Box, Heading, Button, Icon } from '@chakra-ui/react'
import { StyleProps } from '@chakra-ui/system'
import { MdKeyboardArrowRight } from 'react-icons/md'

import React, { FC } from 'react'
import router from 'next/router'
import { useIntl } from 'react-intl'

interface Props {
  content: string
  showAllButton?: Boolean
  customStyles?: StyleProps
  keyword?: string
  keyCollection?: string
}

const SectionTitle: FC<Props> = ({ customStyles, content, showAllButton = true, keyword = '', keyCollection }) => {
  const intl = useIntl()
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      my={{ base: '1rem', md: '2rem' }}
      {...customStyles}
    >
      <Heading as='h1' fontSize='1.8rem'>
        {content}
      </Heading>
      {showAllButton && (
        <Box>
          <Button
            variant='link'
            color='second.600'
            fontWeight={600}
            onClick={() => {
              router.push(`/search?keyword=${keyword}${keyCollection && '&key_collection=' + keyCollection}`)
            }}
          >
            {intl.formatMessage({
              id: 'McL3Aw',
              defaultMessage: 'Tất cả',
              description: ''
            })}
            <Icon as={MdKeyboardArrowRight} boxSize='1.5rem' />
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default SectionTitle
