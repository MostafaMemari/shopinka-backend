import { ReactNode } from "react";

export interface PaginationProps extends React.ComponentPropsWithoutRef<"nav"> {
  limit: number;
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  children?: ReactNode;
}

export interface PaginationLinkProps extends React.ComponentPropsWithoutRef<"li"> {
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}
