import styled from "styled-components";

export const SkeletonComponent = styled.div<{
  $width: string;
  $height: string;
}>`
  height: ${(p) => p.$height};
  width: ${(p) => p.$width};
  background: #1b313944;
  border-radius: 0;
`;
