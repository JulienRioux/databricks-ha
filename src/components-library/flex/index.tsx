import styled from "styled-components";
import { FlexProps } from "./types";

export const Flex = styled.div<FlexProps>`
  display: flex;
  ${({ $justify }) => $justify && `justify-content: ${$justify};`}
  ${({ $align }) => $align && `align-items: ${$align};`}
  ${({ $direction }) => $direction && `flex-direction: ${$direction};`}
  gap: ${({ $gap }) => $gap ?? "8px"};
  width: ${({ $width }) => ($width ? $width : "100%")};
  flex-wrap: ${({ $wrap }) => ($wrap ? $wrap : "nowrap")};
`;
