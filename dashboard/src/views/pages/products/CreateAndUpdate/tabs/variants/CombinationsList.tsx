import React, { memo, useMemo } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { VariantCombination, Attribute } from '@/types/app/productAttributes'
import EmptyPlaceholder from '@/components/EmptyPlaceholder'
import { Box } from '@mui/material'

interface CombinationsListProps {
  combinations: VariantCombination[]
  selectedCombinations: string[]
  attributes: Attribute[]
  onCombinationSelect: (combinationKey: string, value: string) => void
}

const CombinationsList = ({ combinations, selectedCombinations, attributes, onCombinationSelect }: CombinationsListProps) => {
  const selectedValueIds = useMemo(() => {
    const ids: number[] = []

    selectedCombinations.forEach(combinationKey => {
      const combination = combinations.find(comb => {
        const key = Object.entries(comb)
          .map(([attrName, value]) => `${attrName}:${value}`)
          .join('|')

        return key === combinationKey
      })

      if (combination) {
        Object.entries(combination).forEach(([attrName, value]) => {
          const attribute = attributes.find(attr => attr.name === attrName)

          if (attribute) {
            const valueObj = attribute.values.find(val => val.name === value)

            if (valueObj) {
              ids.push(valueObj.id)
            }
          }
        })
      }
    })

    return Array.from(new Set(ids))
  }, [combinations, selectedCombinations, attributes])

  if (combinations.length === 0) {
    return <EmptyPlaceholder text='هیچ ترکیبی موجود نیست' width={'100%'} />
  }

  const attributeNames = Array.from(new Set(combinations.flatMap(combination => Object.keys(combination))))

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 1 }}>
      <Table sx={{ minWidth: 300 }}>
        <TableHead>
          <TableRow>
            {attributeNames.map(attrName => (
              <TableCell key={attrName} sx={{ fontWeight: 'bold' }}>
                {attrName}
              </TableCell>
            ))}
            <TableCell align='right' sx={{ fontWeight: 'bold' }}>
              وضعیت
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {combinations.map((combination, index) => {
            const combinationKey = Object.entries(combination)
              .map(([attrName, value]) => `${attrName}:${value}`)
              .join('|')

            return (
              <TableRow
                key={combinationKey}
                sx={{
                  '&:hover': { bgcolor: 'action.hover' },
                  '&:last-child td, &:last-child th': { border: 0 }
                }}
              >
                {attributeNames.map(attrName => (
                  <TableCell key={attrName}>
                    <Typography variant='body1' fontWeight='medium'>
                      {combination[attrName] || '-'}
                    </Typography>
                  </TableCell>
                ))}
                <TableCell align='right'>
                  <FormControlLabel
                    label={
                      <Typography variant='body2' color='text.secondary'>
                        {selectedCombinations.includes(combinationKey) ? 'فعال' : 'غیرفعال'}
                      </Typography>
                    }
                    labelPlacement='start'
                    control={
                      <Switch
                        checked={selectedCombinations.includes(combinationKey)}
                        onChange={e => onCombinationSelect(combinationKey, e.target.checked ? 'active' : 'inactive')}
                        color='primary'
                        size='small'
                      />
                    }
                    sx={{ mr: 1 }}
                  />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default memo(CombinationsList)
