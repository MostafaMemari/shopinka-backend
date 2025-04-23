export interface IProduct {
  id: string;
  imageSrc: string;
  title: string;
  productLink: string;
  newPrice: number;
  oldPrice?: number;
  discount?: number;
}
