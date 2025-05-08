// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const ProductAddHeader = () => {
  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          افزودن محصول جدید
        </Typography>
        <Typography>مدیریت محصولات فروشگاه شما</Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Button variant='tonal' color='secondary'>
          لغو
        </Button>
        <Button variant='tonal'>ذخیره پیش‌نویس</Button>
        <Button variant='contained'>انتشار محصول</Button>
      </div>
    </div>
  )
}

export default ProductAddHeader
