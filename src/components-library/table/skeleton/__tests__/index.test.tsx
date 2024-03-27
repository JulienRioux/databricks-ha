import React, { ReactNode } from "react";
import { render, screen, within } from "@testing-library/react";
import { TableSkeleton } from "..";

// Creating a table wrapper to prevent errors in the console.
const TableSkeletonWrapper = ({ children }: { children: ReactNode }) => (
  <table>
    <tbody>{children}</tbody>
  </table>
);

describe("<TableSkeleton />", () => {
  it("Renders the correct number of rows and columns.", () => {
    const columnsLength = 5;
    const rowsLength = 3;

    render(
      <TableSkeletonWrapper>
        <TableSkeleton columnsLength={columnsLength} rowsLength={rowsLength} />
      </TableSkeletonWrapper>
    );

    // Verify the number of
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(rowsLength);

    // Verify column count per row
    rows.forEach((row) => {
      const cells = within(row).getAllByRole("cell");
      expect(cells).toHaveLength(columnsLength);
    });
  });

  it("Renders 10 rows by default if rowsLength is not provided.", () => {
    const columnsLength = 4;

    render(
      <TableSkeletonWrapper>
        <TableSkeleton columnsLength={columnsLength} />
      </TableSkeletonWrapper>
    );

    // Default rows check
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(10);

    // Verify column count per row
    rows.forEach((row) => {
      const cells = within(row).getAllByRole("cell");
      expect(cells).toHaveLength(columnsLength);
    });
  });
});
