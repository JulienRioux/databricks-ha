// RepositoriesTable.test.js

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RepositoriesTable } from "..";
import { useGithubData } from "@/context/github-data";
import { ITEM_PER_PAGE } from "@/config";

jest.mock("../transform-repo-data-to-table-data/styles", () => ({
  RepoLink: "RepoLink",
  DetailButton: "DetailButton",
}));

const DATA_MOCK = {
  total_count: 1,
  incomplete_results: false,
  items: [
    {
      id: 201785634,
      name: "aasdfaa",
      full_name: "tekkenmin7/aasdfaa",
      private: false,
      owner: {
        login: "tekkenmin7",
      },
      stargazers_count: 9292,
    },
  ],
};

// Mock useGithubData and child components
jest.mock("../../../context/github-data", () => ({
  useGithubData: jest.fn(),
}));

describe("<RepositoriesTable />", () => {
  it("Displays skeletons when data is loading", () => {
    (useGithubData as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      currentPage: 1,
      handlePageChange: jest.fn(),
      totalPages: 0,
      handleSelectRepo: jest.fn(),
    });

    render(<RepositoriesTable />);
    expect(screen.getAllByTestId("table-skeleton-row")).toHaveLength(
      ITEM_PER_PAGE
    );
  });

  it("Displays error", () => {
    (useGithubData as jest.Mock).mockReturnValue({
      data: undefined,
      error: new Error("Error"),
      isLoading: false,
      currentPage: 1,
      handlePageChange: jest.fn(),
      totalPages: 0,
      handleSelectRepo: jest.fn(),
    });

    render(<RepositoriesTable />);
    expect(screen.getByTestId("repo-table-error")).toHaveTextContent(
      "Failed to load"
    );
    expect(screen.queryAllByTestId("table-skeleton-row")).toHaveLength(0);
  });

  it("Displays table if there is data", () => {
    (useGithubData as jest.Mock).mockReturnValue({
      data: DATA_MOCK,
      error: undefined,
      isLoading: false,
      currentPage: 1,
      handlePageChange: jest.fn(),
      totalPages: 0,
      handleSelectRepo: jest.fn(),
    });

    render(<RepositoriesTable />);

    // Make sure the elements are in the dom
    expect(screen.getByText(DATA_MOCK.items[0].name)).toBeInTheDocument();
    expect(screen.getByText(DATA_MOCK.items[0].full_name)).toBeInTheDocument();
    expect(
      screen.getByText(DATA_MOCK.items[0].stargazers_count)
    ).toBeInTheDocument();
  });
});
