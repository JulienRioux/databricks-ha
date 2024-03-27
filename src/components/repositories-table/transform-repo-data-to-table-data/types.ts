import { ReactElement } from "react";

// Define a type for the output objects
export type TransformedRepository = {
  key: number;
  name: string;
  owner: string;
  stars: number;
  link: ReactElement;
  detail: ReactElement;
};
