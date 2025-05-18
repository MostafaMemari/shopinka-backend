'use client'

import { useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Tab from '@mui/material/Tab'

import { ProductType } from '@/types/app/product.type'
import VariantsTab from './VariantsTab'
import SeoTabContent from '../SeoTabContent'
import VariableTabContent from './VariableTabContent'

interface Props {
  productType: ProductType
}

const ProductFormTabs = ({ productType }: Props) => {
  const [tabValue, setTabValue] = useState('1')

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue)
  }

  return (
    <Card>
      <CardHeader title='جزئیات محصول' />
      <TabContext value={tabValue}>
        <CardContent>
          <TabList onChange={handleChange} aria-label='جزئیات محصول'>
            <Tab value='1' label='نوع محصول' />
            <Tab value='2' label='متغیر محصول' disabled={productType !== 'VARIABLE'} />
            <Tab value='3' label='سئو' />
          </TabList>
        </CardContent>
        <TabPanel value='1'>
          <VariantsTab />
        </TabPanel>
        <TabPanel value='2'>
          <VariableTabContent />
        </TabPanel>
        <TabPanel value='3'>
          <SeoTabContent />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default ProductFormTabs
