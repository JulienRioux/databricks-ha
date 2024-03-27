"use client";

import Image from "next/image";
import { AppName, NavbarInnerWrapper, NavbarWrapper } from "./styles";

export const Navbar = () => {
  return (
    <NavbarWrapper data-testid="navbar">
      <NavbarInnerWrapper>
        <Image
          src="/databricks-logo.svg"
          alt="Databricks Logo"
          width={160}
          height={23}
          priority
        />

        <AppName>Gihub repository list</AppName>
      </NavbarInnerWrapper>
    </NavbarWrapper>
  );
};
