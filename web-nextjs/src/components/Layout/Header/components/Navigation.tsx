import React from 'react'
import cx from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../Header.module.css'
import { isNonEmptyArray } from 'src/utils'
import { Box, UnorderedList, ListItem } from '@chakra-ui/react'
import { ARTICLES_URL, HOME_URL, RECIPES_URL, SHOP_URL, DISCUSSION_URL, EVENTS_URL } from 'src/common/constants/router'

const Navigation: React.FC = () => {
  const router = useRouter()
  const dataNavigation = [
    {
      url: HOME_URL,
      title: 'Home'
    },
    {
      url: RECIPES_URL,
      title: 'Recipes'
    },
    {
      url: ARTICLES_URL,
      title: 'Articles'
    },
    {
      url: DISCUSSION_URL,
      title: 'Discussion'
    },
    {
      url: SHOP_URL,
      title: 'Shop'
    },
    {
      url: EVENTS_URL,
      title: 'Events'
    }
  ]

  const getActiveNav = (title: any): boolean => {
    if (router.route === HOME_URL && title.toLowerCase() === 'home') return true

    return router.route.toLowerCase().includes(title.toLowerCase())
  }
  return (
    <Box>
      <UnorderedList display='flex' listStyleType='none' mx='0' fontWeight={600}>
        {isNonEmptyArray(dataNavigation) &&
          dataNavigation.map((element) => (
            <ListItem mr='30px' key={element.title} className={cx(getActiveNav(element.title) && styles['nav-active'])}>
              <Link href={element.url}>{element.title}</Link>
            </ListItem>
          ))}
      </UnorderedList>
    </Box>
  )
}

export default Navigation
