import React, { FC } from 'react'
import Head from 'next/head'
// import useSWR from "swr";
import Footer from '../Footer'
import Header from '../Header'
import { useIntl } from 'react-intl'

interface Props {
  children: React.ReactNode
  showFooter?: boolean
}

const Layout: FC<Props> = ({ children, showFooter = true }) => {
  const intl = useIntl()
  return (
    <>
      <Head>
        <title>
          {intl.formatMessage({
            id: 'ToqzfH',
            defaultMessage: 'Nutri Asia',
            description: ''
          })}
        </title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <Header />
      {children}
      {showFooter && <Footer />}
    </>
  )
}

export default Layout
