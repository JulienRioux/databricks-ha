import { render, screen, fireEvent } from "@testing-library/react";
import { RepoDetails } from "..";
import { useGithubData } from "../../../context/github-data";
import { LastCommits } from "../last-commits";
import { LastFork } from "../last-fork";

// Mock useGithubData and child components
jest.mock("../../../context/github-data", () => ({
  useGithubData: jest.fn(),
}));
jest.mock("../last-commits", () => ({
  LastCommits: jest.fn(() => <div data-testid="last-commit" />),
}));
jest.mock("../last-fork", () => ({
  LastFork: jest.fn(() => <div data-testid="last-fork" />),
}));

describe("<RepoDetails />", () => {
  const setSelectedRepoDataMock = jest.fn();

  beforeEach(() => {
    setSelectedRepoDataMock.mockClear();
  });

  it("Does not render without selected repository data.", () => {
    (useGithubData as jest.Mock).mockReturnValue({
      selectedRepoData: null,
      setSelectedRepoData: setSelectedRepoDataMock,
    });
    const { container } = render(<RepoDetails />);
    expect(container).toBeEmptyDOMElement();
  });

  it("Renders correctly with selected repository data.", () => {
    const repoName = "TestRepo";
    (useGithubData as jest.Mock).mockReturnValue({
      selectedRepoData: {
        name: repoName,
        forks_url: "https://api.github.com/repos/test/forks",
        commits_url: "https://api.github.com/repos/test/commits{/sha}",
      },
      setSelectedRepoData: setSelectedRepoDataMock,
    });
    render(<RepoDetails />);
    expect(screen.getByTestId("details-title")).toHaveTextContent(
      `Details about ${repoName}`
    );
    expect(screen.getByTestId("last-commit")).toBeInTheDocument();
    expect(screen.getByTestId("last-fork")).toBeInTheDocument();
  });

  it("Clears selected repository data on close button click.", () => {
    (useGithubData as jest.Mock).mockReturnValue({
      selectedRepoData: {
        name: "TestRepo",
        forks_url: "https://api.github.com/repos/test/forks",
        commits_url: "https://api.github.com/repos/test/commits{/sha}",
      },
      setSelectedRepoData: setSelectedRepoDataMock,
    });
    render(<RepoDetails />);
    fireEvent.click(screen.getByTestId("close-button"));
    expect(setSelectedRepoDataMock).toHaveBeenCalledWith(null);
  });
});
