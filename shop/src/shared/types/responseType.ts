import { pager } from './paginationType';

export type Response<T> = {
  pager: pager;
  items: T;
};
