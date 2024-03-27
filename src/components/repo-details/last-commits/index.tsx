import { Skeleton } from "@/components-library/skeleton";
import useSWR from "swr";
import { Commit } from "./types";

export const LastCommits = ({ fetchUrl }: { fetchUrl: string }) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR<Commit[]>(fetchUrl, fetcher);

  if (!data?.length && !isLoading)
    return <div data-testid="no-last-commits-alert">No commits.</div>;

  const last3Commiters = data?.map(
    (commit) =>
      commit?.author?.login ?? commit?.committer?.login ?? "User not found..."
  );

  return (
    <div>
      {isLoading ? (
        <Skeleton testId="last-commits-skeleton" />
      ) : (
        <span data-testid="last-3-commiters">
          {last3Commiters?.length} last commiters: {last3Commiters?.join(", ")}
        </span>
      )}
    </div>
  );
};
