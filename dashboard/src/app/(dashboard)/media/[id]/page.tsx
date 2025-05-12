import GalleryItemView from '@/views/pages/media/gallery-items/GalleryIemView'
import { type NextPage } from 'next'

type MediaItemsPageProps = {
  params: Promise<{ id: string }>
}

const MediaItems: NextPage<MediaItemsPageProps> = async ({ params }) => {
  const { id } = await params

  return <GalleryItemView galleryId={id} />
}

export default MediaItems
