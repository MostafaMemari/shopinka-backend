interface ProductPropertiesProps {
  title?: string;
  properties?: { [key: string]: string }[];
}

export const ProductProperties = ({ title = "ویژگی های محصول", properties }: ProductPropertiesProps) => {
  if (!properties || properties.length === 0) return null;

  return (
    <div>
      <p className="mb-6 font-medium">{title}</p>
      <ul className="space-y-4">
        {properties.map((property, index) => {
          const [label, value] = Object.entries(property)[0];
          return (
            <li key={index} className="flex gap-x-2">
              <div className="min-w-fit text-text/60">{label} :</div>
              <div className="text-text/90">{value}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
