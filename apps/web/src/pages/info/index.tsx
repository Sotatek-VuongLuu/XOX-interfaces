import { PageMeta } from 'components/Layout/Page'
import { InfoPageLayout } from 'views/Info'
import Overview from 'views/Info/Overview'

const InfoPage = () => {
  return (
    <>
      <PageMeta />
      <Overview />
    </>
  )
}

InfoPage.Layout = InfoPageLayout
InfoPage.chains = [] // set all

export default InfoPage
