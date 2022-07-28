import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { ChakraProvider, Box } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl'
import { useRouter } from 'next/router'

import Global from 'src/theme/global'
import theme from 'src/theme/theme'
import store from '../app/store'
import { Confirm18Provider } from 'src/common/context'
import loadIntlMessages from 'src/common/helper/loadIntlMessages'
import './_app.css'

type NextPageWithLayout = NextPage & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export async function getStaticProps(ctx: any) {
  return {
    props: {
      intlMessages: await loadIntlMessages(ctx)
    }
  }
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  const { locale, defaultLocale } = useRouter()

  return (
    <ChakraProvider theme={theme}>
      <Global />
      <Provider store={store}>
        <Box color='#000' bg='#fff'>
          {getLayout(
            // <AuthProvider>
            <Confirm18Provider>
              <IntlProvider locale={locale ?? ''} defaultLocale={defaultLocale} messages={pageProps.intlMessages}>
                <Head>
                  <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
                  />
                </Head>
                <Component {...pageProps} />{' '}
              </IntlProvider>
            </Confirm18Provider>
            //  </AuthProvider>
          )}
        </Box>
      </Provider>
    </ChakraProvider>
  )
}

export default MyApp
