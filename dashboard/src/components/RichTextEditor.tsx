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
import type { Editor } from '@tiptap/core'
import { useEffect, useState } from 'react'

// Components Imports
import CustomIconButton from '@core/components/mui/IconButton'

// Style Imports
import '@/libs/styles/tiptapEditor.css'

interface EditorToolbarProps {
  editor: Editor | null
  openLinkDialog: () => void
}

interface RichTextEditorProps {
  label?: string
  placeholder?: string
  content?: string
  onChange?: (content: string) => void
  value?: string
  height?: string // New prop for custom height
}

const EditorToolbar = ({ editor, openLinkDialog }: EditorToolbarProps) => {
  if (!editor) return null

  return (
    <div className='flex flex-wrap gap-x-3 gap-y-1 pbs-6 pbe-4 pli-6'>
      {[
        ['bold', 'tabler-bold'],
        ['underline', 'tabler-underline'],
        ['italic', 'tabler-italic'],
        ['strike', 'tabler-strikethrough']
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
      {['left', 'center', 'right', 'justify'].map(align => (
        <CustomIconButton
          key={align}
          {...(editor.isActive({ textAlign: align }) && { color: 'primary' })}
          variant='tonal'
          size='small'
          onClick={() => editor.chain().focus().setTextAlign(align).run()}
        >
          <i className={classnames(`tabler-align-${align}`, { 'text-textSecondary': !editor.isActive({ textAlign: align }) })} />
        </CustomIconButton>
      ))}
    </div>
  )
}

const RichTextEditor = ({ label, placeholder = 'متن خود را وارد کنید', content = '', onChange, value }: RichTextEditorProps) => {
  const [open, setOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')

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
      editor.commands.setContent(value, false) // false prevents emitting an update event
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

  return (
    <div>
      {label && <Typography className='mbe-2'>{label}</Typography>}
      <Card className='p-0 border shadow-none'>
        <CardContent className='p-0'>
          <EditorToolbar editor={editor} openLinkDialog={handleLinkDialog} />
          <Divider className='mli-6' />
          <EditorContent editor={editor} className={`overflow-y-auto flex min-h-[250px]`} />
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
