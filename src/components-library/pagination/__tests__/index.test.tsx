import { fireEvent, render, screen } from "@testing-library/react";
import Pagination from "..";

// TODO: expect onChange to have been called with...

describe("<Pagination />", () => {
  it("Renders correctly.", () => {
    render(<Pagination current={1} total={5} onChange={jest.fn()} />);
    expect(screen.getByText("←")).toBeInTheDocument();
    expect(screen.getByText("→")).toBeInTheDocument();
  });

  it("Calls onChange with the correct page when a page number is clicked.", () => {
    const handleChange = jest.fn();
    render(<Pagination current={1} total={5} onChange={handleChange} />);
    fireEvent.click(screen.getByText("3"));
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it("The previous button is disabled on the first page and next button is disabled on the last page.", () => {
    // The previous button should be disabled if current is === 1
    const { rerender } = render(
      <Pagination current={1} total={5} onChange={jest.fn()} />
    );
    expect(screen.getByTestId("previous-btn")).toBeDisabled();
    expect(screen.getByTestId("next-btn")).toBeEnabled();

    // The next button should be disabled if current is === 1
    rerender(<Pagination current={5} total={5} onChange={jest.fn()} />);
    expect(screen.getByTestId("next-btn")).toBeDisabled();
    expect(screen.getByTestId("previous-btn")).toBeEnabled();
  });

  it("Clicking previous and next buttons updates the page correctly.", () => {
    const handleChange = jest.fn();
    render(<Pagination current={2} total={5} onChange={handleChange} />);

    fireEvent.click(screen.getByText("←"));
    expect(handleChange).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText("→"));
    expect(handleChange).toHaveBeenLastCalledWith(3);
  });

  it("Shows first page button and dots when current page is 8.", () => {
    render(<Pagination current={8} total={8} onChange={jest.fn()} />);
    // Display the 3 dots and the first pagination button
    expect(screen.getByTestId("first-page-dots")).toBeInTheDocument();
    expect(screen.getByTestId("first-page-button")).toHaveTextContent("1");
  });

  it("Shows last page button and dots when there are pages after the current + 1 page", () => {
    render(<Pagination current={1} total={100} onChange={jest.fn()} />);
    // Display the 3 dots and the last pagination button
    expect(screen.getByTestId("last-page-dots")).toBeInTheDocument();
    expect(screen.getByTestId("last-page-button")).toHaveTextContent("100");
  });

  it("Shows first and last page button and dots when the pages are not in range", () => {
    render(<Pagination current={50} total={100} onChange={jest.fn()} />);
    // Display the 3 dots and the first and last pagination buttons
    expect(screen.getByTestId("first-page-dots")).toBeInTheDocument();
    expect(screen.getByTestId("first-page-button")).toHaveTextContent("1");
    expect(screen.getByTestId("last-page-dots")).toBeInTheDocument();
    expect(screen.getByTestId("last-page-button")).toHaveTextContent("100");
  });

  it("Highlights the current page", async () => {
    render(<Pagination current={3} total={5} onChange={jest.fn()} />);

    // Make sure there is only 1 active pagination btn and that it's the right one
    const activePaginationBtns = screen.getAllByTestId(
      "pagination-btn-is-active"
    );
    expect(activePaginationBtns).toHaveLength(1);
    expect(activePaginationBtns[0]).toHaveTextContent("3");
  });
});
