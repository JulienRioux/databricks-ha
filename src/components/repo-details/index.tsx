import { Flex } from "@/components-library/flex";
import { CloseBtn, DetailsWrapper } from "./styles";
import { useGithubData } from "@/context/github-data";
import { LastFork } from "./last-fork";
import { LastCommits } from "./last-commits";

export const RepoDetails = () => {
  const { selectedRepoData, setSelectedRepoData } = useGithubData();

  // Getting the last fork only
  const forkUrl = `${selectedRepoData?.forks_url}?per_page=1`;

  // Removing the SHA from URL and getting only the last 3 commits
  const findLastCommitsUrl = `${selectedRepoData?.commits_url?.replace(
    "{/sha}",
    ""
  )}?per_page=3`;

  // Don't show the details if there is no selected repository
  if (!selectedRepoData) return null;

  return (
    <DetailsWrapper>
      <Flex>
        <Flex $direction="column">
          <h4 data-testid="details-title">
            Details about {selectedRepoData?.name}
          </h4>

          <LastCommits fetchUrl={findLastCommitsUrl} />

          <LastFork fetchUrl={forkUrl} />
        </Flex>

        <div>
          <CloseBtn
            data-testid="close-button"
            onClick={() => setSelectedRepoData(null)}
          >
            ×
          </CloseBtn>
        </div>
      </Flex>
    </DetailsWrapper>
  );
};
