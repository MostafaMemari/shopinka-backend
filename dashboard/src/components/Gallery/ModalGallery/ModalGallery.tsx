'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { debounce, type SelectChangeEvent } from '@mui/material'
import { GalleryItem } from '@/types/app/gallery.type'
import { useGalleryItems } from '@/hooks/reactQuery/useGallery'
import GalleryItemDetails from './GalleryItemDetails'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import { showToast } from '@/utils/showToast'
import GalleryHeader from './GalleryHeader'
import GalleryContent from './GalleryContent'

interface Props {
  btnLabel?: string
  multi?: boolean
  onSelect?: (items: GalleryItem[] | GalleryItem) => void
  initialSelected?: GalleryItem | GalleryItem[] | undefined
  children?: React.ReactNode
}

const ModalGallery = ({ btnLabel, multi = false, onSelect, initialSelected, children }: Props) => {
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
    params: {
      galleryId: gallerySelected === 'all' ? undefined : gallerySelected,
      title: searchTerm
    },
    staleTime: 5 * 60 * 1000
  })

  const galleryItems: GalleryItem[] = galleryItemsData?.data?.items || []

  const debouncedSetSearchTerm = useCallback((value: string) => {
    const debouncedFn = debounce((val: string) => {
      setSearchTerm(val)
    }, 500)

    debouncedFn(value)
  }, [])

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

  const handleOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
    setActiveItem(null)
    setSelectedItems([])
    setSearchTerm('')
    setGallerySelected('all')
  }

  const handleGalleryChange = (event: SelectChangeEvent<string>) => {
    const newGalleryId = event.target.value as string

    setGallerySelected(newGalleryId)
    setSelectedItems([])
    setActiveItem(null)
    refetchItems()
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
      <div onClick={handleOpen} className='cursor-pointer'>
        {children || (
          <Button variant='contained' className='max-sm:w-full' sx={{ width: 200, maxWidth: '100%' }} onClick={handleOpen}>
            {btnLabel}
          </Button>
        )}
      </div>

      <CustomDialog
        open={open}
        width='95vw'
        height='95vh'
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
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <GalleryHeader searchTerm={searchTerm} gallerySelected={gallerySelected} onSearchChange={debouncedSetSearchTerm} onGalleryChange={handleGalleryChange} enabled={open} />
          <Box ref={contentRef} tabIndex={-1} sx={{ display: 'flex', flex: 1, flexDirection: { xs: 'column', sm: 'row' }, overflow: 'hidden' }}>
            <GalleryContent
              galleryItems={galleryItems}
              isLoading={isLoadingItems || isFetchingItems}
              error={errorItems}
              visibleItems={visibleItems}
              selectedItems={selectedItems}
              onShowMore={() => setVisibleItems(prev => prev + 12)}
              onItemClick={item => {
                if (multi) {
                  const isSelected = selectedItems.some(i => i.id === item.id)
                  const updatedItems = isSelected ? selectedItems.filter(i => i.id !== item.id) : [...selectedItems, item]

                  setSelectedItems(updatedItems)
                  setActiveItem(updatedItems.length > 0 ? updatedItems[updatedItems.length - 1] : null)
                } else {
                  setSelectedItems([item])
                  setActiveItem(item)
                }
              }}
              onRetry={refetchItems}
            />
            <GalleryItemDetails activeItem={activeItem} setActiveItem={setActiveItem} multi={multi} selectedItems={selectedItems} />
          </Box>
        </Box>
      </CustomDialog>
    </>
  )
}

export default ModalGallery
