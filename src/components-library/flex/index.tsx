import styled from "styled-components";

interface FlexProps {
  $justify?: string;
  $align?: string;
  $direction?: string;
  $gap?: string;
  $width?: string;
  $wrap?: string;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  ${({ $justify }) => $justify && `justify-content: ${$justify};`}
  ${({ $align }) => $align && `align-items: ${$align};`}
  ${({ $direction }) => $direction && `flex-direction: ${$direction};`}
  gap: ${({ $gap }) => $gap ?? "8px"};
  width: ${({ $width }) => ($width ? $width : "100%")};
  flex-wrap: ${({ $wrap }) => ($wrap ? $wrap : "nowrap")};
`;
