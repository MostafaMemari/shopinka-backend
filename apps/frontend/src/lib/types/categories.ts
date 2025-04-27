export interface ICategory {
  id: number;
  name: string;
  href: string;
  subCategories?: ISubCategory[];
}

export interface ISubCategory {
  id: number;
  name: string;
  href: string;
  subItems?: ISubItem[];
}

export interface ISubItem {
  id: number;
  name: string;
  href: string;
}
