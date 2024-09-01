"use client";

import React, { useEffect } from "react";

import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { useSearch } from "@hooks/useSearch";
import { usePathname, useRouter } from "@navigation/navigation";

const Search = () => {
  const { searchValue, onSetSearchValue } = useSearch();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();

    params.set("search", searchValue);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mx-auto mt-9 flex w-[700px] gap-3">
      <Input
        type="text"
        value={searchValue}
        placeholder="Search questions by tag or username"
        className="h-12 px-6"
        onChange={(e) => onSetSearchValue(e.target.value)}
      />
      <Button variant="default" className="h-12 w-28" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default Search;
