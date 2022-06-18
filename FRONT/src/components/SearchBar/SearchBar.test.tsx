import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";

const mockedProps = {
  handleChange: jest.fn(),
  handleKeyDown: jest.fn(),
  cityValue: "castelldefels",
  getCityWeather: jest.fn(),
  isBadRequest: false,
};

describe("Given a SearchBar component", () => {
  describe("When is rendered and interactions are made", () => {
    test("Then it should call getCityWeather function after firing the click event from the icon", () => {
      render(<SearchBar {...mockedProps} />);

      fireEvent.click(screen.getByTestId("icon"));

      expect(mockedProps.getCityWeather).toHaveBeenCalled();
    });

    test("Then it should call handleChange and handleKeyDown functions after fill in the input text and pressig Enter", () => {
      render(<SearchBar {...mockedProps} />);
      const searchBar = screen.getByRole("textbox");

      fireEvent.change(searchBar, { target: { value: "Words and Numbers" } });
      fireEvent.keyDown(searchBar, { key: "Enter" });

      expect(mockedProps.handleChange).toHaveBeenCalled();
      expect(mockedProps.handleKeyDown).toHaveBeenCalled();
    });
  });
});
