"use client";

import {
  API_URLS,
  ITEM_PER_PAGE,
  MAX_GITHUB_ITEMS_AIP_RESPONSE,
} from "@/config";
import { fetcher } from "@/lib/fetcher";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  FC,
  useMemo,
} from "react";
import useSWR from "swr";
import { GithubDataContextState, GithubDataProviderProps } from "./types";

// Initialize the context
export const GithubDataContext = createContext<
  GithubDataContextState | undefined
>(undefined);

// Data provider
export const GithubDataProvider: FC<GithubDataProviderProps> = ({
  children,
}) => {
  // Handling search query
  const [query, setQuery] = useState<string>("");

  // Handling pagination
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Handling selected repo data
  const [selectedRepoData, setSelectedRepoData] = useState<any>(null);

  // Handling repository query api call
  const { data, error, isLoading } = useSWR(
    query
      ? `${API_URLS.repositories}?q=${query}&sort=stars&order=desc&per_page=${ITEM_PER_PAGE}&page=${currentPage}`
      : null,
    fetcher
  );

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  const handleSearch = useCallback((newQuery: string) => {
    setQuery(newQuery);
    // Reset the pagination
    setCurrentPage(1);
    // Reset the selectedRepoData if was set
    setSelectedRepoData(null);
  }, []);

  const handleSelectRepo = useCallback(
    (repoId: number | null) => {
      // Get the repositor data and save it in state
      const repoData =
        data?.items.find(({ id }: { id: number }) => id === repoId) ?? null;

      setSelectedRepoData(repoData);
    },
    [data?.items]
  );

  //   Getting the total number of repositories
  const totalItems = useMemo(() => {
    return data?.total_count ?? 0;
  }, [data]);

  // Calculate the total pages, considering GitHub's API limitation
  const totalPages = useMemo(() => {
    const pages = Math.ceil(totalItems / ITEM_PER_PAGE);
    // Adjust for GitHub's first 1000 search results limitation ("Only the first 1000 search results are available")
    return Math.min(pages, MAX_GITHUB_ITEMS_AIP_RESPONSE / ITEM_PER_PAGE);
  }, [totalItems]);

  // TODO: Cleanup the unnecessary returned value
  return (
    <GithubDataContext.Provider
      value={{
        query,
        setQuery,
        data,
        error,
        isLoading,
        currentPage,
        setCurrentPage,
        handlePageChange,
        handleSearch,
        totalPages,
        selectedRepoData,
        handleSelectRepo,
        setSelectedRepoData,
      }}
    >
      {children}
    </GithubDataContext.Provider>
  );
};

// Creating the hook w/ throwing error if missing provider
export const useGithubData = (): GithubDataContextState => {
  const context = useContext(GithubDataContext);
  if (context === undefined) {
    throw new Error("useGithubData must be used within a GithubDataProvider");
  }
  return context;
};
