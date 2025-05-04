// MUI Imports
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'

type TablePaginationProps = {
  filteredData: any[]
  page: number
  rowsPerPage: number
  onPageChange: (page: number) => void
}

const TablePaginationComponent = ({ filteredData, page, rowsPerPage, onPageChange }: TablePaginationProps) => {
  return (
    <div className='flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2'>
      <Typography color='text.disabled'>
        {`نمایش ${filteredData.length === 0 ? 0 : page * rowsPerPage + 1} تا ${Math.min((page + 1) * rowsPerPage, filteredData.length)} از ${filteredData.length} مورد`}
      </Typography>
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
  )
}

export default TablePaginationComponent
