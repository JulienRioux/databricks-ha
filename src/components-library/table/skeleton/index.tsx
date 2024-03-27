import { Skeleton } from "@/components-library/skeleton";
import { Tr, Td } from "../styles";

export const TableSkeleton = ({
  columnsLength,
  rowsLength = 10,
}: {
  columnsLength: number;
  rowsLength?: number;
}) =>
  Array.from({ length: rowsLength }, (_, rowIndex) => (
    <Tr key={`table_skeleton_${rowIndex}`} data-testid="table-skeleton-row">
      {Array.from({ length: columnsLength }, (_, colIndex) => (
        <Td key={`table_skeleton_${colIndex}_${rowIndex}`}>
          <Skeleton width="60px" />
        </Td>
      ))}
    </Tr>
  ));
