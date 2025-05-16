import type { Editor } from '@tiptap/core'
import { GalleryItem } from '@/types/app/gallery.type'

export interface EditorToolbarProps {
  editor: Editor | null
  openLinkDialog: () => void
  toggleFullScreen: () => void
  isFullScreen: boolean
  onSelectImages: (images: GalleryItem[]) => void
}

export interface RichTextEditorProps {
  label?: string
  placeholder?: string
  content?: string
  onChange?: (content: string) => void
  value?: string
  height?: string
}
