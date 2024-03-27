import { Skeleton } from "@/components-library/skeleton";
import useSWR from "swr";
import { Commit } from "./types";
import { Alert } from "@/components-library/alert";
import { fetcher } from "@/lib/fetcher";

export const LastCommits = ({ fetchUrl }: { fetchUrl: string }) => {
  const { data, error, isLoading } = useSWR<Commit[]>(fetchUrl, fetcher);

  // Show an error msg if it happens
  if (error) return <Alert>Error while loading commits</Alert>;

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
