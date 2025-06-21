'use client'

import { Box, Typography } from '@mui/material'
import tableStyles from '@core/styles/table.module.css'
import { Contact } from '@/types/app/contact.type'
import RemoveContactModal from './RemoveContactModal'
import ContactDetailsModal from './ContactDetailsModal'
import { truncateText } from '@/utils/formatters'

const DesktopContactTable = ({ contacts }: { contacts: Contact[] }) => {
  return (
    <div className='overflow-x-auto'>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <th>نام کامل</th>
            <th>شماره تماس</th>
            <th>ایمیل</th>
            <th>پیام</th>
            <th>تاریخ</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length === 0 ? (
            <tr>
              <td colSpan={6} className='text-center'>
                داده‌ای موجود نیست
              </td>
            </tr>
          ) : (
            contacts.map(contact => (
              <tr key={contact.id}>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {truncateText(contact.fullName, 30)}
                  </Typography>
                </td>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {contact.phone || '-'}
                  </Typography>
                </td>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {contact.email || '-'}
                  </Typography>
                </td>
                <td>
                  <Typography className='font-medium line-clamp-2 max-w-[250px] text-ellipsis overflow-hidden' color='text.primary'>
                    {truncateText(contact.message, 50)}
                  </Typography>
                </td>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {new Date(contact.createdAt).toLocaleDateString('fa-IR')}
                  </Typography>
                </td>
                <td>
                  <Box display='flex' alignItems='center' gap={1}>
                    <ContactDetailsModal contact={contact} />
                    <RemoveContactModal id={contact.id} />
                  </Box>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DesktopContactTable
