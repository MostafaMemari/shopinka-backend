// MUI Imports
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from '@/@core/components/mui/TextField'

type TablePaginationProps = {
  currentPage: number
  totalPages: number
  totalCount: number
  rowsPerPage: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rows: number) => void
  currentPageItemCount: number
}

const TablePaginationComponent = ({ currentPage, totalPages, totalCount, rowsPerPage, onPageChange, onRowsPerPageChange, currentPageItemCount }: TablePaginationProps) => {
  const from = totalCount === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1
  const to = from + currentPageItemCount - 1

  return (
    <div className='flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2'>
      <Typography color='text.disabled'>{`نمایش ${from} تا ${to} از ${totalCount} مورد`}</Typography>

      <div className='flex items-center gap-2 max-sm:flex-col sm:flex-row'>
        <div className='flex items-center gap-2'>
          <Typography className='text-sm text-gray-600 whitespace-nowrap'>تعداد در صفحه:</Typography>
          <CustomTextField select value={rowsPerPage} onChange={e => onRowsPerPageChange(Number(e.target.value))} className='flex-auto max-sm:w-full sm:w-[70px]'>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </CustomTextField>
        </div>

        <Pagination
          shape='rounded'
          color='primary'
          variant='tonal'
          count={totalPages}
          page={currentPage}
          onChange={(_, newPage) => onPageChange(newPage)}
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  )
}

export default TablePaginationComponent
