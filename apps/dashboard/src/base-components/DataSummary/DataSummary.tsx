const DataSummary: React.FC<any> = ({ pagination }) => {
  const calculatePagination = () => {
    const total = pagination?.totalCount || 0;
    const start = (pagination.page - 1) * pagination.limit + 1;
    const end = Math.min(pagination.page * pagination.limit, total);
    return { start, end, total };
  };

  const { start, end, total } = calculatePagination();
  return (
    <div className="hidden mx-auto md:block text-slate-500">
      نمایش {start} تا {end} از {total} داده
    </div>
  );
};

export default DataSummary;
