import { FC } from "react";
import { StyledInput } from "./styles";
import { InputProps } from "./types";

// Update the component to a TypeScript functional component
export const Input: FC<InputProps> = (props) => {
  return <StyledInput {...props} />;
};
