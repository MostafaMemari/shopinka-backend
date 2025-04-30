interface ISearchItem {
  id: string;
  title: string;
  href: string;
  image?: string;
}

interface ISearchBarProps {
  isMobile?: boolean;
  productItems: ISearchItem[];
  recentSearchItems: ISearchItem[];
}
