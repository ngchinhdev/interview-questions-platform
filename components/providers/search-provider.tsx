"use client";

import { ISearchContext } from "@interfaces/context";
import { createContext, ReactNode, useState } from "react";

export const SearchContext = createContext<ISearchContext>({
  searchValue: "",
  onSetSearchValue: () => {},
});

const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <SearchContext.Provider
      value={{ searchValue, onSetSearchValue: setSearchValue }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
