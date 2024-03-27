// MainLayout.test.jsx

import React from "react";
import { render, screen } from "@testing-library/react";
import { MainLayout } from "../../components/main-layout";
import { Navbar } from "../../components/navbar";

describe("<MainLayout />", () => {
  it("Renders its children correctly and includes the Navbar component", () => {
    const childText = "Test Child Content";
    render(
      <MainLayout>
        <div data-testid="children">{childText}</div>
      </MainLayout>
    );

    // Check if the child content is rendered
    expect(screen.getByTestId("children")).toHaveTextContent(childText);
    // Check if the navbar is rendered
    const navbarElement = screen.getByTestId("navbar");
    expect(navbarElement).toBeInTheDocument();
  });
});
