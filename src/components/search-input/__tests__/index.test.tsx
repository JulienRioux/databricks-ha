import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { SearchInput } from "..";
import {
  GithubDataProvider,
  useGithubData,
} from "../../../context/github-data";

// Mock useGithubData hook
jest.mock("../../../context/github-data", () => ({
  ...jest.requireActual("../../../context/github-data"),
  useGithubData: jest.fn(() => ({
    handleSearch: jest.fn(),
  })),
}));

describe("<SearchInput/>", () => {
  beforeEach(() => {
    // Resetting the mocks before each tests
    jest.clearAllMocks();
    const mockedUseGithubData =
      require("../../../context/github-data").useGithubData;
    mockedUseGithubData.mockReturnValue({
      handleSearch: jest.fn(),
    });
  });

  it("calls handleSearch with the input value when the form is submitted", async () => {
    render(
      <GithubDataProvider>
        <SearchInput />
      </GithubDataProvider>
    );

    const inputElement = screen.getByTestId("search-input");

    // Type an input and press enters.
    await userEvent.type(inputElement, "test{enter}");

    expect(useGithubData().handleSearch).toHaveBeenCalledWith("test");
  });
});
