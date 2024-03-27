import { ReactNode } from "react";

// This could be using a stronger typing.
export interface GitHubRepoItems {
  [key: string]: any;
}

interface GitHubApiResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubRepoItems[];
}

// Context data props
export interface GithubDataContextState {
  query: string;
  setQuery: (query: string) => void;
  data: GitHubApiResponse | null;
  error: object | null;
  isLoading: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  handlePageChange: (pageNumber: number) => void;
  handleSearch: (newQuery: string) => void;
  totalPages: number;
  selectedRepoData: GitHubRepoItems | null;
  handleSelectRepo: (repoId: number | null) => void;
  setSelectedRepoData: (data: GitHubRepoItems | null) => void;
}

export interface GithubDataProviderProps {
  children: ReactNode;
}
