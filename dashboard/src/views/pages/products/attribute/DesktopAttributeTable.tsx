'use client'

// MUI Imports
import Typography from '@mui/material/Typography'
import { Box, Chip } from '@mui/material'

// Component Imports
import RemoveAttributeModal from './RemoveAttributeModal'
import UpdateAttributeModal from './UpdateAttributeModal'
import RemoveAttributeValueModal from './attributeValue/RemoveAttributeValueModal'
import CreateAttributeValueModal from './attributeValue/CreateAttributeValueModal'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// API Import
import { AttributeType, Attribute } from '@/types/app/productAttributes.type'
import UpdateAttributeValuesModal from './attributeValue/UpdateAttributeValuesModal'
import { Fragment } from 'react'

const DesktopAttributeTable = ({ data }: { data: Attribute[] }) => {
  return (
    <>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>نام ویژگی</th>
              <th>نوع</th>
              <th>متغییر ها</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.id}>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {row.name}
                  </Typography>
                </td>
                <td>
                  <Typography>{row.type === AttributeType.BUTTON ? 'دکمه' : 'رنگ'}</Typography>
                </td>
                <td>
                  {!!row.values?.length ? (
                    row.type === AttributeType.COLOR ? (
                      <Box display='flex' flexWrap='wrap' alignItems='center' gap={1}>
                        {row.values.map(item => (
                          <Fragment key={item.id}>
                            <Chip
                              label={
                                <Box display='flex' alignItems='center' gap={1}>
                                  <Box
                                    sx={{
                                      width: 10,
                                      height: 10,
                                      borderRadius: '50%',
                                      backgroundColor: item.colorCode || '#999',
                                      border: theme => `1px solid ${theme.palette.divider}`
                                    }}
                                  />

                                  <UpdateAttributeValuesModal
                                    attributeType={row.type}
                                    initialData={{
                                      ...item,
                                      id: String(item.id),
                                      buttonLabel: item.buttonLabel ?? undefined,
                                      attributeId: String(item.attributeId)
                                    }}
                                  />

                                  <div className='mt-1'>
                                    <RemoveAttributeValueModal id={item.id} />
                                  </div>
                                </Box>
                              }
                              color='secondary'
                              variant='outlined'
                              sx={{ direction: 'rtl', margin: '2px' }}
                            />
                          </Fragment>
                        ))}
                        <CreateAttributeValueModal attributeName={row.name} attributeId={row.id} attributeType={row.type} />
                      </Box>
                    ) : (
                      <Box display='flex' flexWrap='wrap' alignItems='center' gap={1}>
                        {row.values.map(item => (
                          <Fragment key={item.id}>
                            <Chip
                              label={
                                <Box display='flex' alignItems='center' gap={1}>
                                  <UpdateAttributeValuesModal
                                    attributeType={row.type}
                                    initialData={{
                                      ...item,
                                      id: String(item.id),
                                      buttonLabel: item.buttonLabel ?? undefined,
                                      attributeId: String(item.attributeId)
                                    }}
                                  />
                                  <div className='mt-1'>
                                    <RemoveAttributeValueModal id={item.id} />
                                  </div>
                                </Box>
                              }
                              color='secondary'
                              variant='outlined'
                              sx={{ direction: 'rtl', margin: '2px' }}
                            />
                          </Fragment>
                        ))}
                        <CreateAttributeValueModal attributeName={row.name} attributeId={row.id} attributeType={row.type} />
                      </Box>
                    )
                  ) : (
                    <CreateAttributeValueModal attributeName={row.name} attributeId={row.id} attributeType={row.type} />
                  )}
                </td>
                <td>
                  <Box display='flex' alignItems='center' gap={2}>
                    <RemoveAttributeModal id={row.id} />

                    <UpdateAttributeModal initialData={row} />
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default DesktopAttributeTable
