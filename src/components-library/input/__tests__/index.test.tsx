import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "..";

describe("Input Component", () => {
  it("Renders input correctly.", () => {
    render(<Input />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  it("Enter text as expected.", async () => {
    render(<Input />);
    const TEXT_TO_TYPE = "Hello world";
    const inputElement = screen.getByRole("textbox");
    await userEvent.type(inputElement, TEXT_TO_TYPE);
    expect(inputElement).toHaveValue(TEXT_TO_TYPE);
  });

  it("Passes custom props to the input element.", () => {
    const placeholderText = "Enter text here";
    render(<Input placeholder={placeholderText} />);
    const inputElement = screen.getByPlaceholderText(placeholderText);
    expect(inputElement).toBeInTheDocument();
  });

  it("Calls onChange handler when text is entered", async () => {
    const onChangeMock = jest.fn();
    const TEXT_TO_TYPE = "Hello world";
    render(<Input onChange={onChangeMock} />);
    const inputElement = screen.getByRole("textbox");
    await userEvent.type(inputElement, TEXT_TO_TYPE);
    // onChange should be called once for each character entered
    expect(onChangeMock).toHaveBeenCalledTimes(TEXT_TO_TYPE.length);
  });
});
