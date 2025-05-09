'use client'

// MUI Imports
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { Placeholder } from '@tiptap/extension-placeholder'
import { TextAlign } from '@tiptap/extension-text-align'
import type { Editor } from '@tiptap/core'
import { useFormContext } from 'react-hook-form'

// Components Imports
import CustomIconButton from '@core/components/mui/IconButton'
import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import '@/libs/styles/tiptapEditor.css'

const EditorToolbar = ({ editor }: { editor: Editor | null }) => {
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

const ProductInformation = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  const editor = useEditor({
    extensions: [StarterKit, Placeholder.configure({ placeholder: 'Write something here...' }), TextAlign.configure({ types: ['heading', 'paragraph'] }), Underline],
    immediatelyRender: false,
    content: `<p>Keep your account secure with authentication step.</p>`
  })

  return (
    <Card>
      <CardHeader title='اطلاعات محصول' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid size={{ xs: 12 }}>
            <CustomTextField fullWidth label='نام محصول' placeholder='آیفون ۱۴' {...register('name')} error={!!errors.name} helperText={errors.name?.message?.toString()} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomTextField fullWidth label='کد SKU' placeholder='FXSK123U' {...register('sku')} error={!!errors.sku} helperText={errors.sku?.message?.toString()} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomTextField fullWidth label='اسلاگ' placeholder='iphone-14' {...register('slug')} error={!!errors.slug} helperText={errors.slug?.message?.toString()} />
          </Grid>
        </Grid>

        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <Typography className='mbe-2'>توضیحات (اختیاری)</Typography>
            <Card className='p-0 border shadow-none'>
              <CardContent className='p-0'>
                <EditorToolbar editor={editor} />
                <Divider className='mli-6' />
                <EditorContent editor={editor} className='bs-[135px] overflow-y-auto flex' />
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography className='mbe-2'>توضیحات کوتاه (اختیاری)</Typography>
            <CustomTextField
              fullWidth
              multiline
              rows={2}
              placeholder='توضیحات کوتاه محصول'
              {...register('shortDescription')}
              error={!!errors.shortDescription}
              helperText={errors.shortDescription?.message?.toString()}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ProductInformation
