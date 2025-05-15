import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { FC } from 'react'

interface ProductAddHeaderProps {
  onButtonClick: (buttonType: 'cancel' | 'draft' | 'publish') => void
  isLoading: boolean
  isUpdate: boolean
}

const ProductAddHeader: FC<ProductAddHeaderProps> = ({ onButtonClick, isLoading, isUpdate }) => {
  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          {isUpdate ? 'ویرایش محصول' : 'افزودن محصول جدید'}
        </Typography>
        <Typography>مدیریت محصولات فروشگاه شما</Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Button variant='tonal' color='secondary' type='button' onClick={() => onButtonClick('cancel')} disabled={isLoading}>
          لغو
        </Button>
        {!isUpdate && (
          <Button variant='tonal' type='button' onClick={() => onButtonClick('draft')} disabled={isLoading}>
            ذخیره پیش‌نویس
          </Button>
        )}
        <Button variant='contained' color='primary' type='button' onClick={() => onButtonClick('publish')} disabled={isLoading}>
          {isLoading ? 'در حال ارسال...' : isUpdate ? 'به‌روزرسانی محصول' : 'انتشار محصول'}
        </Button>
      </div>
    </div>
  )
}

export default ProductAddHeader
