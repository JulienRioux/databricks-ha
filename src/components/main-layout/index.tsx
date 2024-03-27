"use client";

import { ReactNode } from "react";
import { MainLayoutWrapper, Content } from "./styles";
import { Navbar } from "../navbar";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <MainLayoutWrapper>
      <Navbar />
      <Content>{children}</Content>
    </MainLayoutWrapper>
  );
};
