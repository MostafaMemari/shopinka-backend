'use client'

// MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { Box, CardContent, Chip } from '@mui/material'

// Component Imports

import RemoveAttributeModal from './RemoveAttributeModal'
import UpdateAttributeModal from './UpdateAttributeModal'
import RemoveAttributeValueModal from './RemoveAttributeValueModal'
import CreateAttributeValueModal from './CreateAttributeValueModal'

// API Import
import { AttributeType, Attribute } from '@/types/productAttributes'

const MobileAttributeCard = ({ data, paginatedData }: { data: Attribute[]; paginatedData: Attribute[] }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
    {paginatedData.length === 0 ? (
      <Typography textAlign='center' color='text.secondary'>
        داده‌ای موجود نیست
      </Typography>
    ) : (
      paginatedData.map(row => (
        <Card
          key={row.id}
          sx={{
            p: 2,
            bgcolor: 'background.paper',
            border: 1,
            borderColor: 'divider',
            '&:hover': {
              bgcolor: 'action.hover'
            },
            transition: 'background-color 0.2s'
          }}
        >
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <Typography variant='h6' fontWeight='medium' color='text.primary' mb={2}>
              {row.name}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
              <Typography variant='body2' color='text.secondary'>
                <strong>نوع:</strong> {row.type === AttributeType.BUTTON ? 'دکمه' : 'رنگ'}
              </Typography>
              <Box>
                <Typography variant='body2' color='text.secondary' mb={1}>
                  <strong>متغییر ها:</strong>
                </Typography>
                {!!row.values?.length ? (
                  row.type === AttributeType.COLOR ? (
                    <Box display='flex' flexWrap='wrap' alignItems='center' gap={1}>
                      {row.values.map(item => (
                        <RemoveAttributeValueModal key={item.id} id={item.id}>
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
                                {item.name}
                              </Box>
                            }
                            color='secondary'
                            variant='outlined'
                            deleteIcon={<i className='tabler-trash-x' />}
                            sx={{ direction: 'rtl', margin: '2px' }}
                          />
                        </RemoveAttributeValueModal>
                      ))}
                      <CreateAttributeValueModal attributeName={row.name} attributeId={row.id} attributeType={row.type} />
                    </Box>
                  ) : (
                    <Box display='flex' flexWrap='wrap' alignItems='center' gap={1}>
                      {row.values.map(item => (
                        <RemoveAttributeValueModal key={item.id} id={item.id}>
                          <Chip label={item.name} color='secondary' variant='outlined' deleteIcon={<i className='tabler-trash-x' />} sx={{ direction: 'rtl', margin: '2px' }} />
                        </RemoveAttributeValueModal>
                      ))}
                      <CreateAttributeValueModal attributeName={row.name} attributeId={row.id} attributeType={row.type} />
                    </Box>
                  )
                ) : (
                  <CreateAttributeValueModal attributeName={row.name} attributeId={row.id} attributeType={row.type} />
                )}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <RemoveAttributeModal id={row.id} />
              <UpdateAttributeModal initialData={row} />
            </Box>
          </CardContent>
        </Card>
      ))
    )}
  </Box>
)

export default MobileAttributeCard
