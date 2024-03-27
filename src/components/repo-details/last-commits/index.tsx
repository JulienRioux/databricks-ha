import { Skeleton } from "@/components-library/skeleton";
import useSWR from "swr";

interface Commit {
  author?: { login: string };
  committer?: { login: string };
}

export const LastCommits = ({ fetchUrl }: { fetchUrl: string }) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR<Commit[]>(fetchUrl, fetcher);

  if (!data?.length && !isLoading) return <div>No commits.</div>;

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
