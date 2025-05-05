// MUI Imports
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from '@/@core/components/mui/TextField'

type TablePaginationProps = {
  filteredData: any[]
  page: number
  rowsPerPage: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rows: number) => void
}

const TablePaginationComponent = ({ filteredData, page, rowsPerPage, onPageChange, onRowsPerPageChange }: TablePaginationProps) => {
  return (
    <div className='flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2'>
      <Typography color='text.disabled'>
        {`نمایش ${filteredData.length === 0 ? 0 : page * rowsPerPage + 1} تا ${Math.min((page + 1) * rowsPerPage, filteredData.length)} از ${filteredData.length} مورد`}
      </Typography>

      <div className='flex items-center gap-2 max-sm:flex-col sm:flex-row'>
        {/* انتخاب تعداد ردیف‌ها */}
        <div className='flex items-center gap-2'>
          <Typography className='text-sm text-gray-600 whitespace-nowrap'>تعداد در صفحه:</Typography>
          <CustomTextField select value={rowsPerPage} onChange={e => onRowsPerPageChange(Number(e.target.value))} className='flex-auto max-sm:w-full sm:w-[70px]'>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </CustomTextField>
        </div>

        {/* صفحه‌بندی */}
        <Pagination
          shape='rounded'
          color='primary'
          variant='tonal'
          count={Math.ceil(filteredData.length / rowsPerPage)}
          page={page + 1}
          onChange={(_, newPage) => onPageChange(newPage - 1)}
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  )
}

export default TablePaginationComponent
