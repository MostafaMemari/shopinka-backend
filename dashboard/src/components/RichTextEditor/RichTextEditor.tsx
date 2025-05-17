'use client'

// MUI Imports
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// Third-party Imports
import classnames from 'classnames'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { Placeholder } from '@tiptap/extension-placeholder'
import { TextAlign } from '@tiptap/extension-text-align'
import { Link } from '@tiptap/extension-link'
import { Image } from '@tiptap/extension-image'
import { useEffect, useState } from 'react'

// Components Imports
import EditorToolbar from './EditorToolbar'

// Style Imports
import './styles.css'
import { RichTextEditorProps } from './types'
import { GalleryItem } from '@/types/app/gallery.type'

const RichTextEditor = ({ label, placeholder = 'متن خود را وارد کنید', content = '', onChange, value, height = '250px' }: RichTextEditorProps) => {
  const [open, setOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          class: 'text-primary cursor-pointer'
        }
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded',
          style: 'max-width: 300px;'
        }
      })
    ],
    immediatelyRender: false,
    content: content,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML())
      }
    }
  })

  // Sync editor content with value prop when it changes
  useEffect(() => {
    if (editor && value !== undefined && editor.getHTML() !== value) {
      editor.commands.setContent(value, false)
    }
  }, [editor, value])

  // Handle link dialog
  const handleLinkDialog = () => {
    if (editor) {
      const previousUrl = editor.getAttributes('link').href || ''

      setLinkUrl(previousUrl)
      setOpen(true)
    }
  }

  const handleSaveLink = () => {
    if (editor) {
      if (linkUrl) {
        editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run()
      } else {
        editor.chain().focus().unsetLink().run()
      }

      setOpen(false)
      setLinkUrl('')
    }
  }

  const handleClose = () => {
    setOpen(false)
    setLinkUrl('')
  }

  // Toggle full screen mode
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }

  // Handle Esc key to exit full screen
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullScreen) {
        setIsFullScreen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFullScreen])

  // Handle gallery select
  const handleSelect = (images: GalleryItem[]) => {
    if (editor) {
      images.forEach(image => {
        if (image.fileUrl) {
          editor.chain().focus().setImage({ src: image.fileUrl }).run()
        }
      })
    }
  }

  return (
    <div
      className={classnames({
        'fixed inset-0 z-50 bg-white': isFullScreen,
        'flex flex-col': true
      })}
    >
      {label && !isFullScreen && <Typography className='mbe-2'>{label}</Typography>}
      <Card
        className={classnames('p-0 border shadow-none', {
          'h-full flex flex-col': isFullScreen
        })}
      >
        <CardContent
          className={classnames('p-0', {
            'flex-1 flex flex-col': isFullScreen
          })}
        >
          <EditorToolbar editor={editor} openLinkDialog={handleLinkDialog} toggleFullScreen={toggleFullScreen} isFullScreen={isFullScreen} onSelectImages={handleSelect} />
          <Divider className='mli-6' />
          <EditorContent
            editor={editor}
            className={classnames('overflow-y-auto flex', {
              'flex-1': isFullScreen,
              'min-h-[250px]': !isFullScreen
            })}
            style={{ height: isFullScreen ? 'auto' : height }}
          />
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>مدیریت لینک</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin='dense' label='آدرس لینک' type='url' fullWidth value={linkUrl} onChange={e => setLinkUrl(e.target.value)} placeholder='https://example.com' />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            لغو
          </Button>
          <Button onClick={handleSaveLink} color='primary'>
            ذخیره
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default RichTextEditor
