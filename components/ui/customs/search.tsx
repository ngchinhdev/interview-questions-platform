"use client";

import React from "react";

import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { useFilter } from "@hooks/useFilter";
import { usePathname, useRouter } from "@navigation/navigation";

const Search = () => {
  const { searchValue, onSetSearchValue } = useFilter();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = () => {
    if (!searchValue) return;

    const params = new URLSearchParams();

    params.set("search", searchValue);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mx-auto mt-9 flex w-[700px] gap-3">
      <Input
        type="text"
        value={searchValue}
        placeholder="Nhập tag hoặc câu hỏi để tìm kiếm"
        className="h-12 px-6"
        onChange={(e) => onSetSearchValue(e.target.value)}
        onKeyDown={(e) => (e.key === "Enter" ? handleSearch() : {})}
      />
      <Button variant="default" className="h-12 w-28" onClick={handleSearch}>
        Tìm kiếm
      </Button>
    </div>
  );
};

export default Search;
