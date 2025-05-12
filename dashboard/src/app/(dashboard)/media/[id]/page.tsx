import { getItemGalleries } from '@/libs/api/galleyItem'
import GalleryItemView from '@/views/pages/media/item/GalleryIemView'

const MediaItems = async ({ params }: { params: { id: string } }) => {
  const { id } = await params

  return <GalleryItemView galleryId={id} />
}

export default MediaItems
