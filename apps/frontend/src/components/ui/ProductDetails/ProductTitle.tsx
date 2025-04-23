interface Props {
  title: string;
}

const ProductTitle = ({ title }: Props) => {
  return <h1 className="mb-4 text-lg font-semibold">{title}</h1>;
};

export default ProductTitle;
