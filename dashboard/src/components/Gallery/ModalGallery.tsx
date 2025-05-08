'use client'

import { useState, useEffect, useRef } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { showToast } from '@/utils/showToast'
import { GalleryItem } from '@/types/gallery'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import { useGallery } from '@/hooks/gallery/useGallery'
import CircularProgress from '@mui/material/CircularProgress'
import GalleryItemDetails from './GalleryItemDetails'

interface Props {
  btnLabel: string
  multi?: boolean
  onSelect?: (items: GalleryItem[] | GalleryItem) => void
}

const ModalGallery = ({ btnLabel, multi = false, onSelect }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const [selectedItems, setSelectedItems] = useState<GalleryItem[]>([])
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [visibleItems, setVisibleItems] = useState<number>(12)
  const contentRef = useRef<HTMLDivElement>(null)

  const { data, isLoading, isFetching, error, refetch } = useGallery({
    enabled: open,
    search: searchTerm,
    staleTime: 5 * 60 * 1000
  })

  const handleOpen = () => {
    setOpen(true)
    refetch()
  }

  const handleClose = () => {
    setOpen(false)
    setActiveItem(null)
    setSelectedItems([])
    setSearchTerm('')
  }

  const handleShowMore = () => {
    setVisibleItems(prev => prev + 12)
  }

  const handleItemClick = (item: GalleryItem) => {
    if (multi) {
      const isSelected = selectedItems.some(i => i.id === item.id)
      let updatedItems: GalleryItem[]

      if (isSelected) {
        updatedItems = selectedItems.filter(i => i.id !== item.id)
      } else {
        updatedItems = [...selectedItems, item]
      }

      setSelectedItems(updatedItems)
      setActiveItem(updatedItems.length > 0 ? updatedItems[updatedItems.length - 1] : null)
    } else {
      setSelectedItems([item])
      setActiveItem(item)
    }
  }

  const handleSelect = () => {
    if (selectedItems.length > 0) {
      onSelect?.(selectedItems)
      handleClose()
    } else {
      showToast({ type: 'warning', message: 'لطفاً حداقل یک تصویر انتخاب کنید' })
    }
  }

  const galleryItems: GalleryItem[] = data?.data?.items || []

  useEffect(() => {
    if (open && contentRef.current) {
      contentRef.current.focus()
    }
  }, [open])

  return (
    <>
      <Button variant='contained' className='max-sm:w-full' onClick={handleOpen}>
        {btnLabel}
      </Button>

      <CustomDialog
        open={open}
        defaultMaxWidth='lg'
        onClose={handleClose}
        title='گالری تصاویر'
        actions={
          <Box sx={{ display: 'flex', gap: 2, px: { xs: 2, sm: 4 }, py: 2 }}>
            <Button onClick={handleClose} color='secondary'>
              بستن
            </Button>
            <Button variant='contained' onClick={handleSelect} disabled={selectedItems.length === 0}>
              انتخاب ({selectedItems.length})
            </Button>
          </Box>
        }
      >
        <Box
          ref={contentRef}
          tabIndex={-1}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            height: '100%',
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              p: { xs: 2, sm: 4 }
            }}
          >
            {(isLoading || isFetching) && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%'
                }}
              >
                <CircularProgress />
              </Box>
            )}

            {error && !isLoading && !isFetching && (
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography color='error' variant='h6'>
                  خطا در بارگذاری تصاویر
                </Typography>
                <Button variant='outlined' onClick={() => refetch()} sx={{ mt: 2 }}>
                  تلاش دوباره
                </Button>
              </Box>
            )}

            {!isLoading && !isFetching && galleryItems.length === 0 && (
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant='h6'>هیچ تصویری یافت نشد</Typography>
                <Typography variant='body2' color='text.secondary'>
                  به نظر می‌رسد هیچ تصویری در این گالری وجود ندارد.
                </Typography>
              </Box>
            )}

            {!isLoading && !isFetching && galleryItems.length > 0 && (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                  gap: { xs: 2, sm: 4 }
                }}
              >
                {galleryItems.slice(0, visibleItems).map((item: GalleryItem) => (
                  <Box
                    key={item.id}
                    sx={{
                      position: 'relative',
                      height: 150,
                      border: selectedItems.some(i => i.id === item.id) ? '2px solid blue' : '1px solid',
                      borderColor: selectedItems.some(i => i.id === item.id) ? 'primary.main' : 'divider',
                      borderRadius: 1,
                      cursor: 'pointer',
                      overflow: 'hidden'
                    }}
                    onClick={() => handleItemClick(item)}
                  >
                    <Image src={item.fileUrl} alt={item.title} fill style={{ objectFit: 'cover' }} sizes='(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw' />
                  </Box>
                ))}
              </Box>
            )}

            {galleryItems.length > visibleItems && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button variant='outlined' onClick={handleShowMore}>
                  نمایش بیشتر
                </Button>
              </Box>
            )}
          </Box>

          <GalleryItemDetails activeItem={activeItem} setActiveItem={setActiveItem} multi={multi} selectedItems={selectedItems} />
        </Box>
      </CustomDialog>
    </>
  )
}

export default ModalGallery
