import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Navbar } from "../index";

describe("Navbar component", () => {
  it("Check if the image is rendered with the correct attributes correctly", () => {
    render(<Navbar />);

    // Alt text
    const logoImage = screen.getByRole("img", { name: /Databricks Logo/i });
    // Image src, width and height
    expect(logoImage).toHaveAttribute("src", "/databricks-logo.svg");
    expect(logoImage).toHaveAttribute("width", "160");
    expect(logoImage).toHaveAttribute("height", "23");

    // Check if the application name is displayed
    const appName = screen.getByText(/gihub repository list/i);
    expect(appName).toBeInTheDocument();
  });
});
