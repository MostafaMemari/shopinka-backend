import { Box } from '@mui/material'
import Image from 'next/image'
import Checkbox from '@mui/material/Checkbox'
import UpdateGalleryItemModal from './UpdateGalleryItemModal'
import DetailMediaModal from './DetailMediaModal'

import { GalleryItem } from '@/types/app/gallery.type'

interface MediaGridProps {
  data: GalleryItem[]
  selected: string[]
  handleCheckboxChange: (id: string) => void
}

const MediaGrid = ({ data, selected, handleCheckboxChange }: MediaGridProps) => {
  return (
    <div className='p-6'>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
        {data.map(item => {
          const isChecked = selected.includes(String(item.id))

          return (
            <div key={String(item.id)} className='relative'>
              <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 2, display: 'flex', gap: 1 }}>
                <Checkbox checked={isChecked} onChange={() => handleCheckboxChange(String(item.id))} size='small' />
                <UpdateGalleryItemModal
                  initialData={{
                    ...item,
                    galleryId: String(item.galleryId)
                  }}
                  galleryItemId={String(item.id)}
                />
                <DetailMediaModal file={item} />
              </Box>

              <div className='relative w-full h-48'>
                <Image
                  src={item.fileUrl}
                  alt={item.title}
                  fill
                  className={`object-cover rounded-lg ${isChecked ? 'border-4 border-blue-500' : 'border-none'}`}
                  sizes='(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw'
                  onClick={() => handleCheckboxChange(String(item.id))}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MediaGrid
