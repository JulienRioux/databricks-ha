import styled from "styled-components";

export const StyledInput = styled.input`
  border: 1px solid #618794;
  outline: none;
  padding: 8px 16px;
  font-size: 16px;
  width: 100%;

  &::placeholder {
    color: #2228;
    transition: 0.2s;
  }
`;
