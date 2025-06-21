'use client'

import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material'
import { Person, Phone, Email, Description, CalendarToday } from '@mui/icons-material'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import { Contact } from '@/types/app/contact.type'
import { formatDate } from '@/utils/formatters'
import { useState } from 'react'

interface ContactDetailsModalProps {
  contact: Contact | null
}

const ContactDetailsModal = ({ contact }: ContactDetailsModalProps) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const DetailRow = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        flexWrap: 'wrap',
        padding: '8px 0',
        borderBottom: '1px solid #e8ecef',
        '&:last-child': { borderBottom: 'none' }
      }}
    >
      {icon}
      <Typography sx={{ fontWeight: 600, color: 'text.secondary', minWidth: '100px' }}>{label}:</Typography>
      <Typography sx={{ wordBreak: 'break-word', color: 'text.primary' }}>{value}</Typography>
    </Box>
  )

  return (
    <>
      <Tooltip title='مشاهده پیام'>
        <IconButton size='small' onClick={handleOpen}>
          <i className='tabler-eye text-gray-500 text-lg' />
        </IconButton>
      </Tooltip>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='جزئیات پیام تماس'
        defaultMaxWidth='sm'
        actions={
          <Button onClick={handleClose} color='secondary' variant='outlined'>
            بستن
          </Button>
        }
      >
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            borderRadius: 2,
            padding: 3,
            border: '1px solid #e0e4e8'
          }}
        >
          <DetailRow label='نام کامل' value={contact?.fullName || '-'} icon={<Person color='primary' fontSize='small' />} />
          <DetailRow label='شماره تماس' value={contact?.phone || '-'} icon={<Phone color='primary' fontSize='small' />} />
          <DetailRow label='ایمیل' value={contact?.email || '-'} icon={<Email color='primary' fontSize='small' />} />
          <DetailRow label='پیام' value={contact?.message || '-'} icon={<Description color='primary' fontSize='small' />} />
          <DetailRow label='تاریخ ارسال' value={formatDate(contact?.createdAt || '')} icon={<CalendarToday color='primary' fontSize='small' />} />
        </Box>
      </CustomDialog>
    </>
  )
}

export default ContactDetailsModal
