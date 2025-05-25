interface CostItem {
  label: string;
  value: string;
  color?: string;
}

interface OrderCostDetailsProps {
  costs: CostItem[];
  shipping: CostItem[];
}

const OrderCostDetails: React.FC<OrderCostDetailsProps> = ({ costs, shipping }) => (
  <div className="mb-8">
    <div className="rounded-lg border p-4 shadow-base">
      <div className="mb-6 flex flex-col gap-4 md:flex-row flex-wrap">
        {costs.map((item, index) => (
          <div key={index} className="flex justify-between gap-x-2 lg:justify-start">
            <div className="text-sm text-text/60 md:text-base">{item.label}</div>
            <div className={item.color || 'text-primary'}>
              <span className="font-bold md:text-lg">{item.value}</span>
              <span className="text-sm md:text-base">تومان</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        {shipping.map((item, index) => (
          <div key={index} className="flex justify-between gap-x-2 lg:justify-start">
            <div className="text-sm text-text/60 md:text-base">{item.label}</div>
            <div className={item.color || 'text-sm text-text/90 md:text-base'}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default OrderCostDetails;
