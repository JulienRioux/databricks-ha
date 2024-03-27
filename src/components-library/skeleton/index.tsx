import { SkeletonComponent } from "./styles";

export const Skeleton = ({ width = "200px", height = "18px" }) => (
  <SkeletonComponent $width={width} $height={height} />
);
