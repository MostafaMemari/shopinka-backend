import { Autocomplete, TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { useState } from 'react'

const keywordsOptions: string[] = []

const SeoKeywordsInputWithContext: React.FC = () => {
  const { control, setValue } = useFormContext()
  const [inputValue, setInputValue] = useState('')

  return (
    <Controller
      name='seo_keywords'
      control={control}
      defaultValue={[]}
      render={({ field, fieldState }) => (
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
            const uniqueValues = Array.from(new Set((newValue ?? []).map(v => v.trim()).filter(v => v.length > 0)))

            setValue('seo_keywords', uniqueValues, { shouldValidate: true })

            field.onChange(uniqueValues)
          }}
          renderInput={params => (
            <TextField
              {...params}
              label='کلمات کلیدی سئو'
              placeholder='با Enter یا , اضافه کن'
              error={!!fieldState.error}
              helperText={fieldState.error?.message?.toString()}
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

export default SeoKeywordsInputWithContext
