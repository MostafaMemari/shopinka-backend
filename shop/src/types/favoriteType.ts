import { Pager } from './pagerType';

export interface FavoriteItem {
  id: number;
  userId: number;
  productId: number;
  createdAt: string;
  product: {
    id: number;
    name: string;
    slug: string;
    mainImage: {
      fileUrl: string;
    };
  };
}

export interface FavoriteResponse {
  items: FavoriteItem[];
  pager: Pager;
}
