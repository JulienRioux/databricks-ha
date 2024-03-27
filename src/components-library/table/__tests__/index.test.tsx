import React from "react";
import { render, screen } from "@testing-library/react";
import { Table } from "..";
import { ITEM_PER_PAGE } from "@/app/page";
import { COLUMNS_MOCK, DATA_SOURCE_MOCK } from "./__fixtures__";

describe("<Table />", () => {
  it("Render the table component.", () => {
    render(
      <Table
        columns={COLUMNS_MOCK}
        dataSource={DATA_SOURCE_MOCK}
        rowKey="id"
        isLoading={false}
      />
    );
    expect(screen.getByRole("table")).toBeInTheDocument();

    // Should not render the loading skeleton.
    // eslint-disable-next-line testing-library/prefer-presence-queries
    expect(screen.queryByTestId("table-skeleton-row")).not.toBeInTheDocument();
  });

  it("Renders the number of columns correctly.", () => {
    render(
      <Table
        columns={COLUMNS_MOCK}
        dataSource={DATA_SOURCE_MOCK}
        rowKey="id"
        isLoading={false}
      />
    );
    const tableHeaders = screen.getAllByRole("columnheader");
    expect(tableHeaders).toHaveLength(COLUMNS_MOCK.length);
  });

  it("Renders the number of rows correctly.", () => {
    render(
      <Table
        columns={COLUMNS_MOCK}
        dataSource={DATA_SOURCE_MOCK}
        rowKey="id"
        isLoading={false}
      />
    );
    const tableRows = screen.getAllByRole("row");
    // The first row is the header row, so total rows should be DATA_SOURCE_MOCK.length + 1
    expect(tableRows).toHaveLength(DATA_SOURCE_MOCK.length + 1);
  });

  it("Displays loading skeleton when prop isLoading === true.", () => {
    render(
      <Table
        columns={COLUMNS_MOCK}
        dataSource={DATA_SOURCE_MOCK}
        rowKey="id"
        isLoading={true}
      />
    );
    // Expect to have 10 table rows of skeletons
    expect(screen.getAllByTestId("table-skeleton-row")).toHaveLength(
      ITEM_PER_PAGE
    );
  });

  it("Displays the data in cells correctly", () => {
    render(
      <Table
        columns={COLUMNS_MOCK}
        dataSource={DATA_SOURCE_MOCK}
        rowKey="id"
        isLoading={false}
      />
    );

    // Check if the first data item's name and age are rendered correctly
    expect(screen.getByText(DATA_SOURCE_MOCK[0].name)).toBeInTheDocument();
    expect(
      screen.getByText(DATA_SOURCE_MOCK[0].age.toString())
    ).toBeInTheDocument();

    expect(screen.getByText(DATA_SOURCE_MOCK[1].name)).toBeInTheDocument();
    expect(
      screen.getByText(DATA_SOURCE_MOCK[1].age.toString())
    ).toBeInTheDocument();
  });
});
