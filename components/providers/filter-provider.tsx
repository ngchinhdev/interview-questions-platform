"use client";

import { IFilterContext } from "@interfaces/context";
import { createContext, ReactNode, useState } from "react";

export const FilterContext = createContext<IFilterContext>({
  searchValue: "",
  curPage: 1,
  onSetSearchValue: () => {},
  onChangePage: () => {},
});

const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [curPage, setCurPage] = useState<number>(1);

  return (
    <FilterContext.Provider
      value={{
        searchValue,
        curPage,
        onSetSearchValue: setSearchValue,
        onChangePage: setCurPage,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
