'use client'

import { Box, IconButton, Typography, Chip } from '@mui/material'
import { useRouter } from 'next/navigation'
import tableStyles from '@core/styles/table.module.css'
import RemoveProductModal from './RemoveProductModal'
import { Product } from '@/types/app/product.type'

const DesktopProductTable = ({ products }: { products: Product[] }) => {
  const router = useRouter()

  const handleEditProduct = (id: number) => {
    router.push(`/products/edit?id=${id}`)
  }

  return (
    <div className='overflow-x-auto'>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <th>تصویر</th>
            <th>نام محصول</th>
            <th>نامک</th>
            <th>وضعیت</th>
            <th>قیمت پایه</th>
            <th>قیمت فروش</th>
            <th>نوع</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={8} className='text-center'>
                هیچ محصولی یافت نشد
              </td>
            </tr>
          ) : (
            products.map(product => (
              <tr key={product.id}>
                <td>
                  {product.mainImageId && product.mainImage?.thumbnailUrl ? (
                    <img
                      src={product.mainImage.thumbnailUrl}
                      alt={product.name || 'تصویر محصول'}
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                  ) : (
                    <Typography color='text.secondary'>-</Typography>
                  )}
                </td>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {product.name || '-'}
                  </Typography>
                </td>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {product.slug || '-'}
                  </Typography>
                </td>
                <td>
                  {product.status ? (
                    <Chip label={product.status === 'PUBLISHED' ? 'منتشر شده' : 'پیش‌نویس'} color={product.status === 'PUBLISHED' ? 'success' : 'warning'} size='small' />
                  ) : (
                    <Typography color='text.secondary'>-</Typography>
                  )}
                </td>
                <td>
                  <Typography color='text.primary'>{product.basePrice ? `${product.basePrice.toLocaleString('fa-IR')} تومان` : '-'}</Typography>
                </td>
                <td>
                  <Typography color='text.primary'>{product.salePrice ? `${product.salePrice.toLocaleString('fa-IR')} تومان` : '-'}</Typography>
                </td>
                <td>
                  {product.type ? (
                    <Chip label={product.type === 'SIMPLE' ? 'ساده' : 'متغیر'} color={product.type === 'SIMPLE' ? 'primary' : 'secondary'} size='small' />
                  ) : (
                    <Typography color='text.secondary'>-</Typography>
                  )}
                </td>
                <td>
                  <Box display='flex' alignItems='center' gap={2}>
                    <RemoveProductModal id={product.id}>
                      <IconButton size='small'>
                        <i className='tabler-trash text-gray-500 text-lg' />
                      </IconButton>
                    </RemoveProductModal>
                    <IconButton size='small' onClick={() => handleEditProduct(product.id)}>
                      <i className='tabler-edit text-gray-500 text-lg' />
                    </IconButton>
                  </Box>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DesktopProductTable
