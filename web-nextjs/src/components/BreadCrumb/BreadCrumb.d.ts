export interface IBreadCrumb {
  items: Array<IBreadCrumbItem>
  disableLinkLastBreadcrumb?: boolean
}

interface IBreadCrumbItem {
  id: string | number
  title?: string
  navigationLink?: string
}
