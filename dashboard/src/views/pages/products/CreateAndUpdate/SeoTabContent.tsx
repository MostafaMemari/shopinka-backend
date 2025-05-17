'use client'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import SeoFormWithContext from '@/components/seo/context/SeoFormWithContext'

const SeoTabContent = () => {
  return (
    <Card>
      <CardHeader title='تنظیمات سئو' />
      <CardContent>
        <SeoFormWithContext />
      </CardContent>
    </Card>
  )
}

export default SeoTabContent
