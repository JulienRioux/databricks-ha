import styled from "styled-components";

export const TableComponent = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

export const Thead = styled.thead`
  background-color: #e0e7e9;
`;

export const Th = styled.th`
  padding: 8px;
  text-align: left;
  height: 44px;
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  border-bottom: 1px solid #e0e7e9;

  &:hover {
    background-color: #e0e7e933;
  }
`;

export const Td = styled.td`
  padding: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 44px;
`;
