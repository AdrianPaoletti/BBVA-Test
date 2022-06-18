import React from "react";
import "./SearchBar.scss";

interface SearchBarProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (event: React.KeyboardEvent) => void;
  cityValue: string;
  getCityWeather: () => void;
  isBadRequest: boolean;
}

const SearchBar = ({
  handleChange,
  handleKeyDown,
  cityValue,
  getCityWeather,
  isBadRequest,
}: SearchBarProps) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Introduce el nombre de la ciudad que desea buscar"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={cityValue}
      />
      <i
        className="fa fa-search"
        aria-hidden="true"
        onClick={() => getCityWeather()}
        data-testid="icon"
      ></i>
      {isBadRequest && (
        <p className="search-bar__error">No se ha podido encontrar la ciudad</p>
      )}
    </div>
  );
};

export default SearchBar;
