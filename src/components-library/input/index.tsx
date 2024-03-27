import { FC } from "react";
import { StyledInput } from "./styles";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// Update the component to a TypeScript functional component
export const Input: FC<InputProps> = (props) => {
  return <StyledInput {...props} />;
};
