'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TabContext from '@mui/lab/TabContext'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'

// Component Imports
import CustomTabList from '@core/components/mui/TabList'
import VariantsTab from './VariantsTab'
import RestockTab from './RestockTab'

// Types
type TabValue = 'restock' | 'variants'

const ProductTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabValue>('restock')

  const handleChange = (_: React.SyntheticEvent, newValue: TabValue) => {
    setActiveTab(newValue)
  }

  return (
    <Card>
      <CardHeader title='مرتب' />
      <CardContent>
        <TabContext value={activeTab}>
          <div className='flex max-md:flex-col gap-6'>
            <div className='md:is-4/12'>
              <CustomTabList orientation='vertical' onChange={handleChange} pill='true'>
                <Tab value='restock' label='موجودی' icon={<i className='tabler-box' />} iconPosition='start' className='flex-row justify-start min-is-full text-start' />
                <Tab value='variants' label='متغیر' icon={<i className='tabler-link' />} iconPosition='start' className='flex-row justify-start min-is-full text-start' />
              </CustomTabList>
            </div>
            <div className='md:is-8/12'>
              <TabPanel value='restock' sx={{ p: 0 }}>
                <RestockTab />
              </TabPanel>
              <TabPanel value='variants' sx={{ p: 0 }}>
                <VariantsTab />
              </TabPanel>
            </div>
          </div>
        </TabContext>
      </CardContent>
    </Card>
  )
}

export default ProductTabs
