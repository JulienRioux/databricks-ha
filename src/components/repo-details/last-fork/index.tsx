import { Skeleton } from "@/components-library/skeleton";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { UserBio } from "../user-bio";

export const LastFork = ({ fetchUrl }: { fetchUrl: string }) => {
  const { data, error, isLoading } = useSWR(fetchUrl, fetcher);

  const user = data?.[0]?.owner;

  const username = user?.login ?? "User not found...";

  if (!isLoading && !data?.length) {
    return <div data-testid="last-fork-no-fork">No fork...</div>;
  }

  return (
    <>
      {isLoading ? (
        <Skeleton testId="last-fork-skeleton" />
      ) : (
        <div data-testid="last-fork-username">Last fork: {username}</div>
      )}

      {user && <UserBio fetchUrl={user?.url} />}

      {isLoading && <Skeleton testId="user-bio-skeleton" />}
    </>
  );
};
