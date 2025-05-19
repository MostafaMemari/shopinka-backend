import { Autocomplete, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { useState } from 'react'

const keywordsOptions: string[] = []

interface SeoKeywordsInputProps {
  control: any
  errors: any
  setValue: any
  isLoading?: boolean
}

const SeoKeywordsInputWithProps: React.FC<SeoKeywordsInputProps> = ({ control, errors, setValue, isLoading = false }) => {
  const [inputValue, setInputValue] = useState('')

  return (
    <Controller
      name='seo_keywords'
      control={control}
      render={({ field }) => (
        <Autocomplete
          multiple
          freeSolo
          options={keywordsOptions}
          value={field.value || []}
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue)
          }}
          onChange={(_, newValue) => {
            const uniqueValues = Array.from(new Set(newValue.map(v => v.trim()).filter(v => v)))

            setValue('seo_keywords', uniqueValues, { shouldValidate: true })
            field.onChange(uniqueValues)
          }}
          disabled={isLoading}
          renderInput={params => (
            <TextField
              {...params}
              label='کلمات کلیدی سئو'
              placeholder='با Enter یا , اضافه کن'
              error={!!errors.seo_keywords}
              helperText={errors.seo_keywords?.message?.toString()}
              disabled={isLoading}
              onKeyDown={e => {
                if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
                  e.preventDefault()
                  const newKeyword = inputValue.trim()

                  if (Array.isArray(field.value) && !field.value.includes(newKeyword)) {
                    const updated = [...field.value, newKeyword]

                    setValue('seo_keywords', updated, { shouldValidate: true })
                    field.onChange(updated)
                  }

                  setInputValue('')
                }
              }}
            />
          )}
        />
      )}
    />
  )
}

export default SeoKeywordsInputWithProps
