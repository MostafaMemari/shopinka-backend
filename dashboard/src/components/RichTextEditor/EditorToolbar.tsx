'use client'

// MUI Imports
import { useState } from 'react'
import classnames from 'classnames'
import CustomIconButton from '@core/components/mui/IconButton'

// Components Imports
import ModalGallery from '../Gallery/ModalGallery/ModalGallery'

// Types
import { EditorToolbarProps } from './types'
import { GalleryItem } from '@/types/app/gallery.type'

const EditorToolbar = ({ editor, openLinkDialog, toggleFullScreen, isFullScreen, onSelectImages }: EditorToolbarProps) => {
  const [selectedImages, setSelectedImages] = useState<GalleryItem[]>([])

  if (!editor) return null

  const handleSelect = (items: GalleryItem | GalleryItem[]) => {
    const images = Array.isArray(items) ? items : [items]

    setSelectedImages(images)
    onSelectImages(images)
  }

  return (
    <div className='flex flex-wrap gap-x-3 gap-y-1 pbs-6 pbe-4 pli-6'>
      {[
        ['bold', 'tabler-bold'],
        ['underline', 'tabler-underline'],
        ['italic', 'tabler-italic'],
        ['strike', 'tabler-strikethrough'],
        ['code', 'tabler-code']
      ].map(([type, icon]) => (
        <CustomIconButton
          key={type}
          {...(editor.isActive(type) && { color: 'primary' })}
          variant='tonal'
          size='small'
          onClick={() => (editor.chain().focus() as any)[`toggle${type.charAt(0).toUpperCase() + type.slice(1)}`]().run()}
        >
          <i className={classnames(icon, { 'text-textSecondary': !editor.isActive(type) })} />
        </CustomIconButton>
      ))}
      <CustomIconButton {...(editor.isActive('link') && { color: 'primary' })} variant='tonal' size='small' onClick={openLinkDialog}>
        <i className={classnames('tabler-link', { 'text-textSecondary': !editor.isActive('link') })} />
      </CustomIconButton>
      {['left', 'center', 'right'].map(align => (
        <CustomIconButton
          key={align}
          {...(editor.isActive({ textAlign: align }) && { color: 'primary' })}
          variant='tonal'
          size='small'
          onClick={() => editor.chain().focus().setTextAlign(align).run()}
        >
          <i
            className={classnames(`tabler-align-${align}`, {
              'text-textSecondary': !editor.isActive({ textAlign: align })
            })}
          />
        </CustomIconButton>
      ))}
      {/* Heading Buttons */}
      {(
        [
          ['heading1', 'tabler-h-1', { level: 1 as const }],
          ['heading2', 'tabler-h-2', { level: 2 as const }],
          ['heading3', 'tabler-h-3', { level: 3 as const }],
          ['heading4', 'tabler-h-4', { level: 4 as const }],
          ['heading5', 'tabler-h-5', { level: 5 as const }],
          ['heading6', 'tabler-h-6', { level: 6 as const }]
        ] as const
      ).map(([type, icon, attrs]) => (
        <CustomIconButton
          key={`heading-${type}`}
          {...(editor.isActive('heading', attrs) && { color: 'primary' })}
          variant='tonal'
          size='small'
          onClick={() => editor.chain().focus().toggleHeading(attrs).run()}
        >
          <i
            className={classnames(icon, {
              'text-textSecondary': !editor.isActive('heading', attrs)
            })}
          />
        </CustomIconButton>
      ))}
      {/* List Buttons */}
      {[
        ['bulletList', 'tabler-list'],
        ['orderedList', 'tabler-list-numbers']
      ].map(([type, icon]) => (
        <CustomIconButton
          key={type}
          {...(editor.isActive(type) && { color: 'primary' })}
          variant='tonal'
          size='small'
          onClick={() => (editor.chain().focus() as any)[`toggle${type.charAt(0).toUpperCase() + type.slice(1)}`]().run()}
        >
          <i className={classnames(icon, { 'text-textSecondary': !editor.isActive(type) })} />
        </CustomIconButton>
      ))}

      <CustomIconButton variant='tonal' size='small' onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <i className='tabler-minus' />
      </CustomIconButton>
      <CustomIconButton variant='tonal' size='small' onClick={() => editor.chain().focus().undo().run()} {...(!editor.can().chain().focus().undo().run() && { disabled: true })}>
        <i className='tabler-arrow-back-up' />
      </CustomIconButton>
      <CustomIconButton variant='tonal' size='small' onClick={() => editor.chain().focus().redo().run()} {...(!editor.can().chain().focus().redo().run() && { disabled: true })}>
        <i className='tabler-arrow-forward-up' />
      </CustomIconButton>
      <ModalGallery btnLabel='انتخاب تصاویر' multi initialSelected={selectedImages} onSelect={handleSelect}>
        <CustomIconButton variant='tonal' size='small'>
          <i className={classnames('tabler-photo', 'text-textSecondary')} />
        </CustomIconButton>
      </ModalGallery>
      <CustomIconButton variant='tonal' size='small' onClick={toggleFullScreen} {...(isFullScreen && { color: 'primary' })}>
        <i
          className={classnames(isFullScreen ? 'tabler-minimize' : 'tabler-maximize', {
            'text-textSecondary': !isFullScreen
          })}
        />
      </CustomIconButton>
    </div>
  )
}

export default EditorToolbar
