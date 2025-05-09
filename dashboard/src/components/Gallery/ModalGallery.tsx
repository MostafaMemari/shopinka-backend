'use client'

import { useState, useEffect, useRef } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { showToast } from '@/utils/showToast'
import { Gallery, GalleryItem } from '@/types/gallery'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import CircularProgress from '@mui/material/CircularProgress'
import GalleryItemDetails from './GalleryItemDetails'
import CreateMediaModal from '@/components/Gallery/CreateMediaModal'
import CustomTextField from '@/@core/components/mui/TextField'
import GallerySelect from './GallerySelect'
import { type SelectChangeEvent } from '@mui/material'
import { useGalleryItems } from '@/hooks/gallery/useGallery'

interface Props {
  btnLabel: string
  multi?: boolean
  onSelect?: (items: GalleryItem[] | GalleryItem) => void
  initialSelected?: GalleryItem | GalleryItem[] | undefined
}

const ModalGallery = ({ btnLabel, multi = false, onSelect, initialSelected }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const [selectedItems, setSelectedItems] = useState<GalleryItem[]>([])
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [visibleItems, setVisibleItems] = useState<number>(12)
  const [gallerySelected, setGallerySelected] = useState<string>('all')
  const contentRef = useRef<HTMLDivElement>(null)

  const {
    data: galleryItemsData,
    isLoading: isLoadingItems,
    isFetching: isFetchingItems,
    error: errorItems,
    refetch: refetchItems
  } = useGalleryItems({
    enabled: open,
    search: searchTerm,
    galleryId: gallerySelected === 'all' ? undefined : gallerySelected,
    staleTime: 5 * 60 * 1000
  })

  const galleryItems: GalleryItem[] = galleryItemsData?.data?.items || []

  useEffect(() => {
    if (open) {
      if (initialSelected) {
        if (Array.isArray(initialSelected)) {
          setSelectedItems(multi ? initialSelected : initialSelected.slice(0, 1))
        } else {
          setSelectedItems([initialSelected])
        }
      } else {
        setSelectedItems([])
      }
    }
  }, [open, initialSelected, multi])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setActiveItem(null)
    setSelectedItems([])
    setSearchTerm('')
    setGallerySelected('all')
  }

  const handleShowMore = () => {
    setVisibleItems(prev => prev + 12)
  }

  const handleGalleryChange = (event: SelectChangeEvent<string>) => {
    const newGalleryId = event.target.value as string

    setGallerySelected(newGalleryId)
    setSelectedItems([])
    setActiveItem(null)
    refetchItems()
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
      onSelect?.(multi ? selectedItems : selectedItems[0])
      handleClose()
    } else {
      showToast({ type: 'warning', message: 'لطفاً حداقل یک تصویر انتخاب کنید' })
    }
  }

  return (
    <>
      <Button variant='contained' className='max-sm:w-full' sx={{ width: 200, maxWidth: '100%' }} onClick={handleOpen}>
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
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            mb: 4,
            flexWrap: 'wrap'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
              <CreateMediaModal />
            </Box>
            <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
              <GallerySelect value={gallerySelected} onChange={handleGalleryChange} search={searchTerm} enabled={open} />
            </Box>
          </Box>

          <CustomTextField
            placeholder='جستجو....'
            sx={{
              flex: { xs: '1 1 100%', sm: '1 1 auto' },
              maxWidth: { sm: 200 },
              width: { xs: '100%', sm: 'auto' }
            }}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </Box>

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
            {(isLoadingItems || isFetchingItems) && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
              </Box>
            )}
            {errorItems && !isLoadingItems && !isFetchingItems && (
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography color='error' variant='h6'>
                  خطا در بارگذاری تصاویر
                </Typography>
                <Button variant='outlined' onClick={() => refetchItems()} sx={{ mt: 2 }}>
                  تلاش دوباره
                </Button>
              </Box>
            )}
            {!isLoadingItems && !isFetchingItems && galleryItems.length === 0 && (
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant='h6'>هیچ تصویری یافت نشد</Typography>
                <Typography variant='body2' color='text.secondary'>
                  به نظر می‌رسد هیچ تصویری در این گالری وجود ندارد.
                </Typography>
              </Box>
            )}
            {!isLoadingItems && !isFetchingItems && galleryItems.length > 0 && (
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
