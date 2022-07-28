import React from 'react'
import Layout from 'src/components/Layout/Container'
import Shop from 'src/views/Shop'
// import loadIntlMessages from 'src/common/helper/loadIntlMessages'

const ShopPage: React.FC = () => {
  return (
    <Layout>
      <Shop />
    </Layout>
  )
}

export default ShopPage
// export async function getStaticProps(ctx: any) {
//   return {
//     props: {
//       intlMessages: await loadIntlMessages(ctx)
//     }
//   }
// }
