import GalleryItemView from '@/views/pages/media/gallery-items/GalleryIemView'

const MediaItems = async ({ params }: { params: { id: string } }) => {
  const { id } = params

  return <GalleryItemView galleryId={id} />
}

export default MediaItems
