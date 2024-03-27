import { FC } from "react";
import { Skeleton } from "../skeleton";
import { TableComponent, Thead, Th, Tbody, Tr, Td } from "./styles";
import { TableProps } from "./types";

// TODO: Move into a separate file
const TableSkeleton = ({
  columnsLength,
  rowsLength = 10,
}: {
  columnsLength: number;
  rowsLength?: number;
}) =>
  Array.from({ length: rowsLength }, (_, rowIndex) => (
    <Tr key={`table_skeleton_${rowIndex}`}>
      {Array.from({ length: columnsLength }, (_, colIndex) => (
        <Td key={`table_skeleton_${colIndex}_${rowIndex}`}>
          <Skeleton width="60px" />
        </Td>
      ))}
    </Tr>
  ));

export const Table: FC<TableProps> = ({
  columns,
  dataSource,
  rowKey,
  isLoading,
}) => {
  return (
    <TableComponent>
      <Thead>
        <Tr>
          {columns.map((col) => (
            <Th key={col.key}>{col.title}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {!isLoading &&
          dataSource.map((data) => (
            <Tr key={data[rowKey]?.toString()}>
              {columns.map((col) => (
                <Td key={col.key}>{data[col.dataIndex]}</Td>
              ))}
            </Tr>
          ))}

        {isLoading && <TableSkeleton columnsLength={columns?.length} />}
      </Tbody>
    </TableComponent>
  );
};
