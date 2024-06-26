import styled, { css } from "styled-components";

export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
`;

export const FirstOrLastPageNumber = styled.div`
  display: flex;
  gap: 8px;
  align-items: baseline;
`;

export const Dots = styled.div`
  opacity: 0.5;
`;

export const PageNumber = styled.button<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  min-width: 32px;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s;
  background: none;
  border: none;
  font-size: 16px;

  &:hover {
    background: #1b313922;
  }

  ${(p) =>
    p.$isActive &&
    css`
      background: #1b3139 !important;
      color: #fff !important;
    `}

  &:disabled {
    background: none;
    cursor: not-allowed;
    color: #ccc;
  }
`;
