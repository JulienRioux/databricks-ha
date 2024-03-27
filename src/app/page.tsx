"use client";

import { Input } from "@/components-library/input";
import Pagination from "@/components-library/pagination";
import { Table } from "@/components-library/table";
import { RepoDetails } from "@/components/repo-details";
import { fetcher } from "@/lib/fetcher";
import Link from "next/link";
import { SetStateAction, useCallback, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";

const API_URLS = {
  repositories: "https://api.github.com/search/repositories",
};

const HomeWrapper = styled.div`
  display: grid;
  gap: 20px;
`;

const RepoLink = styled(Link)`
  text-decoration: underline;
`;

const DetailButton = styled.button`
  border: none;
  padding: 4px 12px;
  color: #fff;
  border-radius: 0;
  cursor: pointer;
  transition: 0.3s;
  background: #1b3139;

  &:hover {
    background: #618794;
  }
`;

// TODO: Move this inside /lib
type Repository = {
  id: number;
  name: string;
  owner: {
    login: string;
  };
  html_url: string;
  stargazers_count: number;
  full_name: string;
};

// Define a type for the output objects
type TransformedRepository = {
  key: number;
  name: string;
  owner: string;
  stars: number;
  link: JSX.Element;
};

const transformRepoDataToTableData = ({
  repos,
  setRepoId,
}: {
  repos: Repository[];
  setRepoId: (value: number | null) => void;
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
      <DetailButton onClick={() => setRepoId(repo.id)}>Details</DetailButton>
    ),
  }));
};

// TODO: Move this inside its own component
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Owner",
    dataIndex: "owner",
    key: "owner",
  },
  {
    title: "Stars",
    dataIndex: "stars",
    key: "stars",
  },
  {
    title: "Link",
    dataIndex: "link",
    key: "link",
  },
  {
    title: "Details",
    dataIndex: "detail",
    key: "detail",
  },
];

const ITEM_PER_PAGE = 10;

let totalItems = 0;

export default function Home() {
  const [repoId, setRepoId] = useState<number | null>(null);

  //  TODO: Move it inside context
  const [searchString, setSearchString] = useState<string>(
    "apache language:scala"
  );

  const [query, setQuery] = useState<string>("");

  const handleChange = useCallback(
    (e: { target: { value: SetStateAction<string> } }) => {
      setSearchString(e.target.value);
    },
    []
  );

  // TODO: Move this inside its own file
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Reset the setRepoId if it's set
    setRepoId(null);
  };

  const { data, error, isLoading } = useSWR(
    query
      ? `${API_URLS.repositories}?q=${query}&sort=stars&order=desc&per_page=${ITEM_PER_PAGE}&page=${currentPage}`
      : null,
    fetcher
  );

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setQuery(searchString);
    // Reset the pagination
    setCurrentPage(1);
    // Reset the setRepoId if it's set
    setRepoId(null);
  };

  // TODO: Move the pagination logic in its own file
  // TODO: Make it better, this sucks...
  totalItems = data?.total_count ?? totalItems;
  const totalPages = Math.ceil(totalItems / ITEM_PER_PAGE);

  // Preventing this github error: "Only the first 1000 search results are available"
  const restrictedtotalPages =
    totalItems > 1000 ? 1000 / ITEM_PER_PAGE : totalPages;

  const tableData = transformRepoDataToTableData({
    repos: data?.items ?? [],
    setRepoId,
  });

  const HAS_DATA = !!tableData?.length;

  const repoData = data?.items.find(({ id }: { id: number }) => id === repoId);

  return (
    <HomeWrapper>
      <form onSubmit={handleSearch}>
        <Input
          value={searchString}
          onChange={handleChange}
          type="search"
          placeholder="Search..."
        />
      </form>

      {error && <div>Failed to load</div>}

      <Table
        columns={columns}
        dataSource={tableData}
        rowKey="key"
        isLoading={isLoading}
      />

      {HAS_DATA && (
        <div>
          <Pagination
            current={currentPage}
            total={restrictedtotalPages}
            onChange={handlePageChange}
          />
        </div>
      )}

      {repoId && <RepoDetails repoData={repoData} setRepoId={setRepoId} />}
    </HomeWrapper>
  );
}
