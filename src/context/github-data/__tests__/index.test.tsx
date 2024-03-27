import { render, act, screen } from "@testing-library/react";
import { useGithubData, GithubDataProvider } from "..";
import { ReactElement } from "react";

// Utility function to render components with the GithubDataProvider context
const renderWithProvider = (component: ReactElement) => {
  return {
    ...render(<GithubDataProvider>{component}</GithubDataProvider>),
  };
};

jest.mock("swr", () =>
  jest.fn(() => ({ data: null, error: null, isLoading: false }))
);

describe("GithubDataContext", () => {
  it("Provides context values correctly to consuming components.", () => {
    const ConsumerComponent = () => {
      const { query, totalPages } = useGithubData();
      return <div>{`Query: ${query}, Total Pages: ${totalPages}`}</div>;
    };

    renderWithProvider(<ConsumerComponent />);
    expect(screen.getByText(/Query: , Total Pages: 0/)).toBeInTheDocument();
  });

  it("Updates context values correctly using provided functions.", () => {
    const TestComponent = () => {
      const { query, handleSearch } = useGithubData();

      return (
        <div>
          <div>{`Query: ${query}`}</div>
          <button onClick={() => handleSearch("test query")}>
            Update Query
          </button>
        </div>
      );
    };

    renderWithProvider(<TestComponent />);
    act(() => {
      screen.getByText("Update Query").click();
    });
    expect(screen.getByText(/Query: test query/)).toBeInTheDocument();
  });

  it("Updates currentPage correctly using handlePageChange.", () => {
    const TestComponent = () => {
      const { currentPage, handlePageChange } = useGithubData();

      return (
        <div>
          <div>{`Current Page: ${currentPage}`}</div>
          <button
            data-testid="next-page-button"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next Page
          </button>

          <button
            onClick={() => handlePageChange(5)}
            data-testid="page-5-button"
          >
            5
          </button>
        </div>
      );
    };

    renderWithProvider(<TestComponent />);
    expect(screen.getByText(/Current Page: 1/)).toBeInTheDocument();

    act(() => {
      screen.getByTestId("next-page-button").click();
    });
    expect(screen.getByText(/Current Page: 2/)).toBeInTheDocument();

    act(() => {
      screen.getByTestId("page-5-button").click();
    });
    expect(screen.getByText(/Current Page: 5/)).toBeInTheDocument();
  });
});
