interface Column {
  title: string;
  dataIndex: string;
  key: string;
}

type DataItem = {
  [key: string]: React.ReactNode;
} & {
  key: React.Key | null | undefined;
};

export interface TableProps {
  columns: Column[];
  dataSource: DataItem[];
  rowKey: string;
  isLoading: boolean;
}
