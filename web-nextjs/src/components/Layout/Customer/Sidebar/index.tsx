import Link from 'next/link'
import { Box, Flex, BoxProps, FlexProps, Image } from '@chakra-ui/react'

import { ReactText } from 'react'
import React from 'react'
import { FormattedMessageFixed } from 'src/common/helper/FormattedMessageFixed'
interface LinkItemProps {
  key: string
  name: string
  // icon: IconType;
  icon: string
  router: string
}
const LinkItems: Array<LinkItemProps> = [
  // { name: "Thông tin tài khoản", icon: FiHome },
  // { name: "Thông báo", icon: FiTrendingUp },
  // { name: "Quản lý đơn hàng", icon: FiCompass },
  // { name: "Số địa chỉ", icon: FiStar },
  // { name: "Thông tin xuất hóa đơn", icon: FiSettings },
  // { name: "Sản phẩm yêu thích", icon: FiSettings },
  {
    key: 'infoAccount',
    name: 'Thông tin tài khoản',
    icon: '/icons/user.svg',
    router: '/customer/account'
  },
  {
    key: 'notification',
    name: 'Thông báo',
    icon: '/icons/noti.svg',
    router: '/customer/notification'
  },
  {
    key: 'orderManagement',
    name: 'Quản lý đơn hàng',
    icon: '/icons/order.svg',
    router: '/order/history'
  },
  // { name: "Số địa chỉ", icon: "/icons/address.svg", router: "#" },
  // { name: "Thông tin xuất hóa đơn", icon: "/icons/invoice.svg", router: "#" },
  {
    key: 'productFavorite',
    name: 'Sản phẩm yêu thích',
    icon: '/icons/favorite.svg',
    router: '/customer/favorite'
  }
]

interface NavItemProps extends FlexProps {
  // icon: IconType;
  href: string
  icon: string
  children: ReactText
}
const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
  return (
    <Link href={href || '/'} passHref>
      <Flex
        align='center'
        p='2'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        _hover={{
          bg: 'second.40'
        }}
        {...rest}
      >
        {icon && (
          // <Icon
          //   mr="4"
          //   fontSize="16"
          //   _groupHover={{
          //     color: "white",
          //   }}
          //   as={icon}
          // />
          // <Box bg="#fff" w="24px" h="24px" borderRadius="8%">
          <Image src={icon} display='inline-block' mr='10px' alt='icon-image' />
          // </Box>
        )}
        {children}
      </Flex>
    </Link>
  )
}

interface SidebarProps extends BoxProps {
  //   onClose: () => void;
}

const renderFormattedMessageFixed = (link: LinkItemProps): any => {
  return <FormattedMessageFixed id={link.key} defaultMessage={link.name} description='' />
}

const SidebarContent = ({ ...rest }: SidebarProps) => {
  return (
    <Box
      // bg={useColorModeValue("white", "gray.900")}
      // borderRight="1px"
      // borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: 'full', md: 60 }}
      //   pos="fixed"
      //   h="full"
      {...rest}
    >
      {LinkItems.map((link) => (
        <NavItem key={link.name} href={link.router} icon={link.icon}>
          {renderFormattedMessageFixed(link)}
        </NavItem>
      ))}
    </Box>
  )
}

export default SidebarContent
