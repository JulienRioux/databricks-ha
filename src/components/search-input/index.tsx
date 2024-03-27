import { Input } from "@/components-library/input";
import { useGithubData } from "@/context/github-data";
import { SetStateAction, useCallback, useState } from "react";

export const SearchInput = () => {
  const { handleSearch } = useGithubData();

  const [searchString, setSearchString] = useState<string>(
    "apache language:scala"
  );

  const handleChange = useCallback(
    (e: { target: { value: SetStateAction<string> } }) => {
      setSearchString(e.target.value);
    },
    []
  );

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleSearch(searchString);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={searchString}
        onChange={handleChange}
        type="search"
        placeholder="Search..."
        autoFocus
      />
    </form>
  );
};
