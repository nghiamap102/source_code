import React from 'react'
import { Box, Container, UnorderedList, ListItem, Link } from '@chakra-ui/react'
import { IBreadCrumb } from 'src/components/BreadCrumb/BreadCrumb.d'
import { useDeviceDetect } from 'src/hooks'
import styles from './BreadCrumb.module.css'
import { isNonEmptyArray } from 'src/utils'

const BreadCrumb: React.FC<IBreadCrumb> = ({ items, disableLinkLastBreadcrumb = false }) => {
  const renderItemBreadcrumbs = ({
    navigationLink = '',
    isLastBreadcrumb = false,
    disableLinkLastBreadcrumb = false,
    title = ''
  }) => {
    if (navigationLink && (!isLastBreadcrumb || (isLastBreadcrumb && !disableLinkLastBreadcrumb))) {
      return (
        <Link href={navigationLink} title={title}>
          {title}
        </Link>
      )
    }
    return <span title={title}>{title}</span>
  }
  const { isDesktop } = useDeviceDetect()

  return (
    <Box>
      {isDesktop && (
        <Box className={styles.breadcrumbs}>
          <Container>
            <UnorderedList m={0}>
              {isNonEmptyArray(items) &&
                items.map((element, index) => {
                  const title: string = element?.title || ''
                  const navigationLink = element?.navigationLink
                  const isLastBreadcrumb = index === items?.length - 1
                  return (
                    <ListItem key={`breadcrumbs-${title}-${index}`}>
                      {renderItemBreadcrumbs({ navigationLink, title, isLastBreadcrumb, disableLinkLastBreadcrumb })}
                    </ListItem>
                  )
                })}
            </UnorderedList>
          </Container>
        </Box>
      )}
    </Box>
  )
}
export default BreadCrumb
