'use client'

import { Box, IconButton, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import tableStyles from '@core/styles/table.module.css'
import { Product } from '@/types/app/product.type'
import RemoveProductModal from './RemoveProductModal'
import { stripHtml, truncateText } from '@/utils/formatters'

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
            <th>نامک محصول</th>
            <th>توضیحات</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={5} className='text-center'>
                داده‌ای موجود نیست
              </td>
            </tr>
          ) : (
            products.map(product => (
              <tr key={product.id}>
                <td>
                  {product.mainImageId && product.mainImage?.thumbnailUrl ? (
                    <img src={product.mainImage.thumbnailUrl} alt={product.name || 'تصویر محصول'} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                  ) : (
                    <Typography color='text.secondary'>-</Typography>
                  )}
                </td>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {product.name}
                  </Typography>
                </td>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {product.slug || '-'}
                  </Typography>
                </td>
                <td>
                  <Typography className='font-medium line-clamp-2 max-w-[300px] text-ellipsis overflow-hidden' color='text.primary'>
                    {truncateText(stripHtml(product.description || '-'))}
                  </Typography>
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
