import TabPanel from '@mui/lab/TabPanel'
import SeoForm from '@/components/seo/SeoForm'

const SeoTab: React.FC = () => {
  return (
    <TabPanel value='seo' className='flex flex-col gap-4'>
      <SeoForm />
    </TabPanel>
  )
}

export default SeoTab
