import Link from "next/link";
import styled from "styled-components";

export const RepoLink = styled(Link)`
  text-decoration: underline;
`;

export const DetailButton = styled.button`
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
