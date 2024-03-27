import { transformRepoDataToTableData } from "..";

// Mocks for the components, replace with actual imports or mocks as necessary
jest.mock("../styles", () => ({
  RepoLink: "RepoLink",
  DetailButton: "DetailButton",
}));

describe("transformRepoDataToTableData()", () => {
  it("transforms GitHub repo data to table data format", () => {
    const mockRepos = [
      {
        id: 1,
        name: "test-repo-1",
        owner: { login: "test-owner-1" },
        stargazers_count: 5,
        html_url: "http://example.com/test-repo-1",
        full_name: "test-owner-1/test-repo-1",
      },
      {
        id: 2,
        name: "test-repo-2",
        owner: { login: "test-owner-2" },
        stargazers_count: 10,
        html_url: "http://example.com/test-repo-2",
        full_name: "test-owner-2/test-repo-2",
      },
    ];

    const mockHandleSelectRepo = jest.fn();

    const transformedData = transformRepoDataToTableData({
      repos: mockRepos,
      handleSelectRepo: mockHandleSelectRepo,
    });

    // Check that the elemements are as expected
    transformedData.forEach((item, index) => {
      const expectedRepo = mockRepos[index];

      expect(item.key).toEqual(expectedRepo.id);
      expect(item.name).toEqual(expectedRepo.name);
      expect(item.owner).toEqual(expectedRepo.owner.login);
      expect(item.stars).toEqual(expectedRepo.stargazers_count);

      // Check that the link and detail properties are React elements
      expect(item.link?.type).toBe("RepoLink");
      expect(item.link?.props.href).toBe(expectedRepo.html_url);
      expect(item.link?.props.children).toBe(expectedRepo.full_name);

      expect(item.detail?.type).toBe("DetailButton");
      expect(typeof item.detail?.props?.onClick).toBe("function");
    });
  });
});
