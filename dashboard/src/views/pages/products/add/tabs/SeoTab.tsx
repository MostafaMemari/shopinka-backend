import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import TabPanel from '@mui/lab/TabPanel'
import CustomTextField from '@core/components/mui/TextField'
import MenuItem from '@mui/material/MenuItem'
import { useFormContext } from 'react-hook-form'
import SeoForm from '@/components/seo/SeoForm'

const SeoTab: React.FC = () => {
  const {
    register,
    formState: { errors },
    setValue,
    getValues
  } = useFormContext()

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    const keywords = value
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0)

    setValue('seo_keywords', keywords.length > 0 ? keywords : undefined)
  }

  return (
    <TabPanel value='seo' className='flex flex-col gap-4'>
      <SeoForm />
    </TabPanel>
  )
}

export default SeoTab
