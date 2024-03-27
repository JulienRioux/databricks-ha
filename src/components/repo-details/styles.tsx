import styled from "styled-components";

export const CloseBtn = styled.button`
  margin: 0;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  font-size: 20px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;

  &:hover {
    background: #2221;
  }
`;

export const DetailsWrapper = styled.div`
  width: 100%;
  border: 1px solid #e0e7e9;
  background: #e0e7e944;
  padding: 20px;
  display: grid;
  gap: 8px;
`;
