import TabPanel from '@mui/lab/TabPanel'
import SeoFormWithContext from '@/components/seo/context/SeoFormWithContext'

const SeoTab: React.FC = () => {
  return (
    <TabPanel value='seo' className='flex flex-col gap-4'>
      <SeoFormWithContext />
    </TabPanel>
  )
}

export default SeoTab
