import { GitHubRepoItems } from "@/context/github-data/types";
import { DetailButton, RepoLink } from "./styles";
import { TransformedRepository } from "./types";

export const transformRepoDataToTableData = ({
  repos,
  handleSelectRepo,
}: {
  repos: GitHubRepoItems[];
  handleSelectRepo: (repoId: number | null) => void;
}): TransformedRepository[] => {
  return repos.map((repo) => ({
    key: repo.id,
    name: repo.name,
    owner: repo.owner.login,
    stars: repo.stargazers_count,
    link: (
      <RepoLink target="_blank" href={repo.html_url}>
        {repo.full_name}
      </RepoLink>
    ),
    detail: (
      <DetailButton onClick={() => handleSelectRepo(repo?.id ?? null)}>
        Details
      </DetailButton>
    ),
  }));
};
