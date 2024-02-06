import type { ReactElement } from 'react'
import Layout from '../components/layout'

 
function Page(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
 
export default Page