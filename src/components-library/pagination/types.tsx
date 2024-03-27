export interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
}
