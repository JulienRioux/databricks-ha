import Pagination from "@/components-library/pagination";
import { Table } from "@/components-library/table";
import { useGithubData } from "@/context/github-data";
import { transformRepoDataToTableData } from "./transform-repo-data-to-table-data";
import { Alert } from "../../components-library/alert";

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

export const RepositoriesTable = () => {
  const {
    data,
    error,
    isLoading,
    currentPage,
    handlePageChange,
    totalPages,
    handleSelectRepo,
  } = useGithubData();

  // Transforming the data to display it in the table
  const tableData = transformRepoDataToTableData({
    repos: data?.items ?? [],
    handleSelectRepo,
  });

  return (
    <>
      {error && <Alert data-testid="repo-table-error">Failed to load</Alert>}

      <Table
        columns={columns}
        dataSource={tableData}
        rowKey="key"
        isLoading={isLoading}
      />

      <Pagination
        current={currentPage}
        total={totalPages}
        onChange={handlePageChange}
      />
    </>
  );
};
