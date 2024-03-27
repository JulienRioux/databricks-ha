"use client";

import { RepoDetails } from "@/components/repo-details";
import { RepositoriesTable } from "@/components/repositories-table";
import { SearchInput } from "@/components/search-input";
import { HomeWrapper } from "./styles";

export default function Home() {
  return (
    <HomeWrapper>
      <SearchInput />

      <RepositoriesTable />

      <RepoDetails />
    </HomeWrapper>
  );
}
