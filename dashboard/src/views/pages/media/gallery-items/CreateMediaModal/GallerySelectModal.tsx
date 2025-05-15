import React from 'react'
import { Button, Box } from '@mui/material'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import GallerySelect from '@/components/Gallery/GallerySelect'
import CreateGalleryModal from '@/views/pages/media/gallery/CreateGalleryModal'
import { type SelectChangeEvent } from '@mui/material'

interface GallerySelectModalProps {
  open: boolean
  selectedGalleryId: string
  onClose: () => void
  onChange: (event: SelectChangeEvent<string>) => void
}

const GallerySelectModal: React.FC<GallerySelectModalProps> = ({ open, selectedGalleryId, onClose, onChange }) => {
  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title='انتخاب گالری'
      defaultMaxWidth='sm'
      actions={
        <Button onClick={onClose} color='secondary'>
          انصراف
        </Button>
      }
    >
      <Box display='flex' gap={2}>
        <CreateGalleryModal />

        <GallerySelect value={selectedGalleryId} onChange={onChange} enabled={open} />
      </Box>
    </CustomDialog>
  )
}

export default GallerySelectModal
