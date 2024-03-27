import { render, screen } from "@testing-library/react";
import { UserBio } from "..";
import useSWR from "swr";

// Mock useSWR
jest.mock("swr", () => jest.fn());

describe("UserBio", () => {
  beforeEach(() => {
    (useSWR as jest.Mock).mockClear();
  });

  it("displays skeleton when loading", () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });
    render(<UserBio fetchUrl="/test-url" />);
    expect(screen.getByTestId("user-bio-skeleton")).toBeInTheDocument();
    expect(screen.queryByTestId("user-bio")).not.toBeInTheDocument();
  });

  it("displays user bio when data is available", () => {
    const userData = { bio: "Test bio" };
    (useSWR as jest.Mock).mockReturnValue({
      data: userData,
      error: undefined,
      isLoading: false,
    });
    render(<UserBio fetchUrl="/test-url" />);
    expect(screen.getByTestId("user-bio")).toHaveTextContent("Bio: Test bio");
    // Skeleton should not show up
    expect(screen.queryByTestId("user-bio-skeleton")).not.toBeInTheDocument();
  });

  it('displays "No bio" when bio is not available', () => {
    const userData = {}; // Assuming an empty response or a user without a bio
    (useSWR as jest.Mock).mockReturnValue({
      data: userData,
      error: undefined,
      isLoading: false,
    });
    render(<UserBio fetchUrl="/test-url" />);
    expect(screen.getByTestId("user-bio")).toHaveTextContent("Bio: No bio");
  });
});
