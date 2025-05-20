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
import { BulletList } from '@tiptap/extension-bullet-list'
import { OrderedList } from '@tiptap/extension-ordered-list'
import { ListItem } from '@tiptap/extension-list-item'
import { Heading } from '@tiptap/extension-heading'
import { TextStyle } from '@tiptap/extension-text-style'
import { CodeBlock } from '@tiptap/extension-code-block'
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

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false
        }
      }),
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
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc pli-6'
        }
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal pli-6'
        }
      }),
      ListItem,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6]
      }),

      TextStyle,
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'bg-gray-100 p-4 rounded'
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

  // Handle Esc key to exit full screen and manage body scroll
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullScreen) {
        setIsFullScreen(false)
      }
    }

    // Disable body scroll in full-screen mode
    if (isFullScreen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    window.addEventListener('keydown', handleKeyDown)

    // Cleanup on unmount or when isFullScreen changes
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
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
      className={classnames('flex flex-col', {
        'fixed inset-0 z-[1400] bg-white': isFullScreen
      })}
    >
      {label && !isFullScreen && <Typography className='mbe-2'>{label}</Typography>}
      <Card
        className={classnames('p-0 border shadow-none', {
          'h-full flex flex-col': isFullScreen
        })}
      >
        <CardContent
          className={classnames('p-0 flex flex-col', {
            'h-full': isFullScreen
          })}
        >
          <EditorToolbar editor={editor} openLinkDialog={handleLinkDialog} toggleFullScreen={toggleFullScreen} isFullScreen={isFullScreen} onSelectImages={handleSelect} />
          <Divider className='mli-6' />
          <div
            className={classnames('flex-1 overflow-y-auto', {
              'h-[250px]': !isFullScreen
            })}
            style={{ height: isFullScreen ? '100%' : height }}
          >
            <EditorContent editor={editor} className='h-full prose max-w-none' />
          </div>
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
