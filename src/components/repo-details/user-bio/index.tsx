import { Flex } from "@/components-library/flex";
import { Skeleton } from "@/components-library/skeleton";
import { Alert } from "@/components-library/alert";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export const UserBio = ({ fetchUrl }: { fetchUrl: string }) => {
  const { data, error, isLoading } = useSWR(fetchUrl, fetcher);

  if (error) return <Alert>Error while loading user bio</Alert>;

  return (
    <Flex>
      {isLoading ? (
        <Skeleton testId="user-bio-skeleton" />
      ) : (
        <span data-testid="user-bio">Bio: {data?.bio ?? "No bio"}</span>
      )}
    </Flex>
  );
};
