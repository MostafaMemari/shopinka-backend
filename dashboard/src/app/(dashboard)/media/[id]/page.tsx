import { getItemGalleries } from '@/libs/api/galleyItem'
import GalleryItemView from '@/views/pages/media/item/GalleryIemView'
import { notFound } from 'next/navigation'

const MediaItems = async ({ params }: { params: { id: string } }) => {
  const { id } = await params

  const res = await getItemGalleries({ galleryId: id, sortBy: 'updatedAt' })

  const items = res?.data?.items?.flat()

  // if (!items || items.length === 0) {
  //   notFound()
  // }

  return <GalleryItemView data={items} />
}

export default MediaItems
