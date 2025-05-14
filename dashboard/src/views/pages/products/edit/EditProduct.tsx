'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Typography, CircularProgress, Box } from '@mui/material'

// import { getProductById } from '@/libs/api/product.api'

import { Product } from '@/types/app/product'

const UpdateProduct = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  console.log(id)

  // useEffect(() => {
  //   if (!id) {
  //     setError('شناسه محصول یافت نشد')
  //     setLoading(false)

  //     return
  //   }

  //   const fetchProduct = async () => {
  //     try {
  //       const response = await getProductById(Number(id))

  //       setProduct(response.data)
  //     } catch (err) {
  //       setError('خطا در بارگذاری محصول')
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchProduct()
  // }, [id])

  // if (loading) {
  //   return (
  //     <Box display='flex' justifyContent='center' mt={4}>
  //       <CircularProgress />
  //     </Box>
  //   )
  // }

  // if (error || !product) {
  //   return (
  //     <Box mt={4}>
  //       <Typography color='error'>{error || 'محصول یافت نشد'}</Typography>
  //     </Box>
  //   )
  // }

  return (
    <Box mt={4} mx={4}>
      {/* <Typography variant='h4' mb={4}> */}
      {/* ویرایش محصول: {product.name} */}
      {/* </Typography> */}
      {/* <UpdateProductForm initialData={product} /> */}
    </Box>
  )
}

export default UpdateProduct
