import { useState } from 'react'
import TabPanel from '@mui/lab/TabPanel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

const ShippingTab: React.FC = () => {
  const [shippingMethods, setShippingMethods] = useState<string[]>([])

  const handleShippingChange = (method: string) => {
    setShippingMethods(prev => (prev.includes(method) ? prev.filter(m => m !== method) : [...prev, method]))
  }

  return (
    <TabPanel value='shipping'>
      <div className='flex flex-col gap-4'>
        <Typography className='font-medium'>روش‌های حمل‌ونقل</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControlLabel control={<Checkbox checked={shippingMethods.includes('post')} onChange={() => handleShippingChange('post')} />} label='پست' />
          <FormControlLabel control={<Checkbox checked={shippingMethods.includes('tipax')} onChange={() => handleShippingChange('tipax')} />} label='تیپاکس' />
          <FormControlLabel control={<Checkbox checked={shippingMethods.includes('courier')} onChange={() => handleShippingChange('courier')} />} label='پیک' />
        </Box>
      </div>
    </TabPanel>
  )
}

export default ShippingTab
