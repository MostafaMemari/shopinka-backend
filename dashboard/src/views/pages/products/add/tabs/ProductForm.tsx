'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TabContext from '@mui/lab/TabContext'
import Tab from '@mui/material/Tab'
import Divider from '@mui/material/Divider'

// Component Imports
import CustomTabList from '@core/components/mui/TabList'
import ShippingTab from './ShippingTab'
import VariantsTab from './VariantsTab'
import SeoTab from './SeoTab'
import RestockTab from './RestockTab'

// Types
type TabValue = 'restock' | 'shipping' | 'variants' | 'seo'

const ProductTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabValue>('restock')
  const [isBelowMdScreen, setIsBelowMdScreen] = useState<boolean>(false)

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
                <Tab value='shipping' label='حمل‌ونقل' icon={<i className='tabler-car' />} iconPosition='start' className='flex-row justify-start min-is-full text-start' />
                <Tab value='variants' label='متغیر' icon={<i className='tabler-link' />} iconPosition='start' className='flex-row justify-start min-is-full text-start' />
                <Tab value='seo' label='سئو' icon={<i className='tabler-search' />} iconPosition='start' className='flex-row justify-start min-is-full text-start' />
              </CustomTabList>
            </div>
            <Divider orientation={isBelowMdScreen ? 'horizontal' : 'vertical'} flexItem />
            <div className='md:is-8/12'>
              <RestockTab />
              <ShippingTab />
              <VariantsTab />
              <SeoTab />
            </div>
          </div>
        </TabContext>
      </CardContent>
    </Card>
  )
}

export default ProductTab
