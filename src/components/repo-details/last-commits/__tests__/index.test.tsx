import { render, screen } from "@testing-library/react";
import { LastCommits } from "..";
import useSWR from "swr";

// Mock useSWR
jest.mock("swr", () => jest.fn());

describe("<LastCommits />", () => {
  const mockFetcher = jest.fn();

  beforeEach(() => {
    (useSWR as jest.Mock).mockClear();
    mockFetcher.mockClear();
  });

  it("Displays skeleton when loading.", () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });
    render(<LastCommits fetchUrl="/test-url" />);
    expect(screen.getByTestId("last-commits-skeleton")).toBeInTheDocument();
    expect(screen.queryByTestId("last-3-commiters")).not.toBeInTheDocument();
  });

  it("Displays no commits message when there are no commits.", () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: [],
      error: undefined,
      isLoading: false,
    });
    render(<LastCommits fetchUrl="/test-url" />);
    expect(screen.queryByTestId("no-last-commits-alert")).toHaveTextContent(
      "No commits."
    );
  });

  it("Displays last 3 committers.", () => {
    const commits = [
      { author: { login: "user1" } },
      { committer: { login: "user2" } },
      { author: { login: "user3" } },
    ];
    (useSWR as jest.Mock).mockReturnValue({
      data: commits,
      error: undefined,
      isLoading: false,
    });
    render(<LastCommits fetchUrl="/test-url" />);

    expect(screen.queryByTestId("last-3-commiters")).toHaveTextContent(
      "3 last commiters: user1, user2, user3"
    );
  });

  it("Displays last 1 committers.", () => {
    const commits = [{ author: { login: "user1" } }];
    (useSWR as jest.Mock).mockReturnValue({
      data: commits,
      error: undefined,
      isLoading: false,
    });
    render(<LastCommits fetchUrl="/test-url" />);

    expect(screen.queryByTestId("last-3-commiters")).toHaveTextContent(
      "1 last commiters: user1"
    );
  });
});
