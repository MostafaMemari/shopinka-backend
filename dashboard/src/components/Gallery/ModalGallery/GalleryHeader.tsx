import Box from '@mui/material/Box'
import CustomTextField from '@/@core/components/mui/TextField'
import CreateMediaModal from '@/views/pages/media/gallery-items/CreateMediaModal'
import GallerySelect from '../GallerySelect'
import { type SelectChangeEvent } from '@mui/material'

interface GalleryHeaderProps {
  searchTerm: string
  gallerySelected: string
  onSearchChange: (value: string) => void
  onGalleryChange: (event: SelectChangeEvent<string>) => void
  enabled: boolean
}

const GalleryHeader = ({ searchTerm, gallerySelected, onSearchChange, onGalleryChange, enabled }: GalleryHeaderProps) => {
  return (
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

        <Box sx={{ width: { xs: '100%', sm: 300 } }}>
          <GallerySelect value={gallerySelected} onChange={onGalleryChange} search={searchTerm} enabled={enabled} showAllOption={true} />
        </Box>
      </Box>

      <CustomTextField
        placeholder='جستجو....'
        sx={{
          width: { xs: '100%', sm: 'auto' },
          maxWidth: { sm: 200 }
        }}
        onChange={e => onSearchChange(e.target.value)}
      />
    </Box>
  )
}

export default GalleryHeader
