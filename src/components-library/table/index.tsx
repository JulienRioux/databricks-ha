import { FC } from "react";
import { TableComponent, Thead, Th, Tbody, Tr, Td } from "./styles";
import { TableProps } from "./types";
import { TableSkeleton } from "./skeleton";
import { ITEM_PER_PAGE } from "@/app/page";

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

        {isLoading && (
          <TableSkeleton
            columnsLength={columns?.length}
            rowsLength={ITEM_PER_PAGE}
          />
        )}
      </Tbody>
    </TableComponent>
  );
};
