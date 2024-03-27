import { fetcher } from "..";
import axios from "axios";

// Mocking axios module
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetcher", () => {
  // Setting up variables
  const url = "https://api.github.com/search/repositories?q=hello%20world";
  const mockData = { id: 17165658, name: "spark" };
  const token = "github-token";

  beforeAll(() => {
    // Setting up process.env variable for Authorization.
    process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN = token;
  });

  it("Fetches  data from an API", async () => {
    mockedAxios.get.mockResolvedValue({ data: mockData });

    await expect(fetcher(url)).resolves.toEqual(mockData);

    // Making sure axios is being called with the url and the Authorization header.
    expect(axios.get).toHaveBeenCalledWith(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  });

  it("Error from an API", async () => {
    const errorString = "An error occurred";
    mockedAxios.get.mockRejectedValue(new Error(errorString));

    // Making sure fetcher throw an error correctly.
    await expect(fetcher(url)).rejects.toThrow(errorString);
  });

  afterAll(() => {
    // Reset mocks or clear environment variables
    jest.resetAllMocks();
  });
});
