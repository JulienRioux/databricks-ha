import { FC } from "react";
import { Flex } from "@/components-library/flex";
import { Skeleton } from "@/components-library/skeleton";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { CloseBtn, DetailsWrapper } from "./styles";

// TODO: Use suspense and move them into separate files

interface Commit {
  author?: { login: string };
  committer?: { login: string };
}

interface LastCommitsProps {
  fetchUrl: string;
}

const LastCommits: FC<LastCommitsProps> = ({ fetchUrl }) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR<Commit[]>(fetchUrl, fetcher);

  const last3Commiters = data?.map(
    (commit) =>
      commit?.author?.login ?? commit?.committer?.login ?? "User not found..."
  );

  return (
    <div>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          {last3Commiters?.length} last commiters: {last3Commiters?.join(", ")}
        </>
      )}
    </div>
  );
};

const UserBio = ({ fetchUrl }: { fetchUrl: string }) => {
  const { data, error, isLoading } = useSWR(fetchUrl, fetcher);

  return (
    <Flex>
      {isLoading ? <Skeleton /> : <span>Bio: {data?.bio ?? "No bio"}</span>}
    </Flex>
  );
};

const LastFork = ({ fetchUrl }: { fetchUrl: string }) => {
  const { data, error, isLoading } = useSWR(fetchUrl, fetcher);

  const user = data?.[0]?.author ?? data?.[0]?.committer;

  const username = user?.login ?? user?.login;

  return (
    <>
      {isLoading ? <Skeleton /> : <div>Last fork: {username}</div>}

      {isLoading ? <Skeleton /> : <UserBio fetchUrl={user?.url} />}
    </>
  );
};

export const RepoDetails = ({ repoData, setRepoId }: any) => {
  // Getting the last item only
  const forkUrl = `${repoData?.forks_url}?per_page=1`;

  // Removing the SHA from URL and getting only the last 3 commits
  const findLastCommitsUrl = `${repoData?.commits_url?.replace(
    "{/sha}",
    ""
  )}?per_page=3`;

  // ?per_page=4
  return (
    <DetailsWrapper>
      <Flex>
        <Flex $direction="column">
          <h4>Details about {repoData?.name}</h4>

          <LastCommits fetchUrl={findLastCommitsUrl} />

          <LastFork fetchUrl={findLastCommitsUrl} />
        </Flex>

        <div>
          <CloseBtn onClick={() => setRepoId(null)}>×</CloseBtn>
        </div>
      </Flex>
    </DetailsWrapper>
  );
};
