import React from "react";
import { render, screen } from "@testing-library/react";
import { Skeleton } from "..";

describe("Skeleton Component", () => {
  it("Renders with default width and height correctly.", () => {
    render(<Skeleton testId="skeleton" />);
    const skeletonElement = screen.getByTestId("skeleton");
    expect(skeletonElement).toHaveStyle(`width: 200px`);
    expect(skeletonElement).toHaveStyle(`height: 18px`);
  });

  it("Renders custom width and height correctly.", () => {
    const customWidth = "100px";
    const customHeight = "50px";
    render(
      <Skeleton width={customWidth} height={customHeight} testId="skeleton" />
    );
    const skeletonElement = screen.getByTestId("skeleton");
    expect(skeletonElement).toHaveStyle(`width: ${customWidth}`);
    expect(skeletonElement).toHaveStyle(`height: ${customHeight}`);
  });
});
