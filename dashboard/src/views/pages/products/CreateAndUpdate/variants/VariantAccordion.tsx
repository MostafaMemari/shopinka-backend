import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import SaveIcon from '@mui/icons-material/Save'
import VariantInformation from './sections/VariantInformation'
import VariantRestock from './sections/VariantRestock'
import VariantPricing from './sections/VariantPricing'
import VariantImage from './sections/VariantImage'
import { ProductVariant } from '@/types/app/productVariant.type'
import RemoveProductVariantModal from './RemoveProductVariantModal'

type VariantAccordionProps = {
  variant: ProductVariant
  expanded: boolean
  onChange: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, updatedFields: Partial<ProductVariant>) => void
}

const VariantAccordion = ({ variant, expanded, onChange, onDelete, onUpdate }: VariantAccordionProps) => {
  const handleSaveVariant = () => {
    console.log(`Saved Variant (Accordion ${variant.id}):`, variant)
  }

  return (
    <Accordion expanded={expanded} onChange={() => onChange(String(variant.id ?? ''))} sx={{ mb: 2, border: '1px solid', borderColor: 'divider' }}>
      <AccordionSummary expandIcon={<i className='tabler-chevron-down' />} sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <RemoveProductVariantModal id={Number(variant.id)}>
            <Tooltip title='حذف متغیر'>
              <IconButton size='small' color='error'>
                <DeleteOutlineIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          </RemoveProductVariantModal>
          <Tooltip title='ثبت متغیر'>
            <IconButton size='small' color='primary' onClick={handleSaveVariant} sx={{ mr: 2 }}>
              <SaveIcon fontSize='small' />
            </IconButton>
          </Tooltip>
          <Typography>{(variant.attributeValues ?? []).map(av => av.name).join(', ') || 'متغیر جدید'}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12 }}>
                <VariantInformation variant={variant} onUpdate={fields => onUpdate(String(variant.id ?? ''), fields)} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <VariantRestock variant={variant} onUpdate={fields => onUpdate(String(variant.id ?? ''), fields)} />
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12 }}>
                <VariantPricing variant={variant} onUpdate={fields => onUpdate(String(variant.id ?? ''), fields)} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <VariantImage variant={variant} onUpdate={fields => onUpdate(String(variant.id ?? ''), fields)} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

export default VariantAccordion
