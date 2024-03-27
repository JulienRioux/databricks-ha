import { render, screen } from "@testing-library/react";
import { LastFork } from "..";
import useSWR from "swr";

// Mock useSWR and UserBio component
jest.mock("swr", () => jest.fn());
jest.mock("../../user-bio", () => ({
  UserBio: jest.fn(() => <div data-testid="mock-user-bio"></div>),
}));

describe("<LastFork />", () => {
  beforeEach(() => {
    (useSWR as jest.Mock).mockClear();
  });

  it("Displays skeletons when loading.", () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });
    render(<LastFork fetchUrl="/test-url" />);

    // There should only be the last fork skeleton
    expect(screen.getByTestId("last-fork-skeleton")).toBeInTheDocument();

    expect(screen.queryByTestId("last-fork-username")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-user-bio")).not.toBeInTheDocument();
  });

  it("Displays no fork message when there is no data.", () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: [],
      error: undefined,
      isLoading: false,
    });
    render(<LastFork fetchUrl="/test-url" />);

    expect(screen.getByTestId("last-fork-no-fork")).toBeInTheDocument();
    // Should not display the last fork skeleton
    expect(screen.queryByTestId("last-fork-skeleton")).not.toBeInTheDocument();
  });

  it("displays last fork and user bio when data is available", () => {
    const username = "test-user";

    const forks = [
      {
        owner: {
          login: username,
          url: "https://api.github.com/users/testuser",
        },
      },
    ];
    (useSWR as jest.Mock).mockReturnValue({
      data: forks,
      error: undefined,
      isLoading: false,
    });
    render(<LastFork fetchUrl="/test-url" />);

    expect(screen.getByTestId("last-fork-username")).toHaveTextContent(
      `Last fork: ${username}`
    );
    expect(screen.getByTestId("mock-user-bio")).toBeInTheDocument();
  });
});
