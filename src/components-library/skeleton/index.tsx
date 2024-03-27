import { SkeletonComponent } from "./styles";

export const Skeleton = ({
  width = "200px",
  height = "18px",
  testId,
}: {
  width?: string;
  height?: string;
  testId?: string;
}) => (
  <SkeletonComponent $width={width} $height={height} data-testid={testId} />
);
