export interface IFooterNavList {
  footerNavigation?: Array<IFooterNavigation>
}

export interface IFooterNavigation {
  name: string
  navigationLink: string
  subNavigations: Array<FooterSubNavigation>
}
type FooterSubNavigation = Omit<IFooterNavigation, 'subNavigations'>
