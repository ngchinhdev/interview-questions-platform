"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useFilter } from "@hooks/useFilter";
import { getPaginationQuery, updateSearchQuery } from "@libs/helper";
import { usePathname, useRouter } from "@navigation/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface IPaginationCustom {
  totalRecords: number;
}

const PaginationCustom = ({ totalRecords }: IPaginationCustom) => {
  const { curPage, onSetCurPage } = useFilter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  let { limit, offset } = getPaginationQuery();
  const totalPages = Math.ceil(totalRecords / (limit ? +limit : 9));

  useEffect(() => {
    onSetCurPage(offset / limit + 1);
  }, []);

  const handleNextPage = () => {
    if (curPage < totalPages) {
      const newUrl = updateSearchQuery(curPage + 1, searchParams, pathname);
      router.push(newUrl);
      onSetCurPage(curPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (curPage > 1) {
      const newUrl = updateSearchQuery(curPage - 1, searchParams, pathname);
      router.push(newUrl);
      onSetCurPage(curPage - 1);
    }
  };

  const handleSetCurPage = (page: number) => {
    const newUrl = updateSearchQuery(page, searchParams, pathname);
    router.push(newUrl);
    onSetCurPage(page);
  };

  return (
    <Pagination className="mt-5">
      <PaginationContent>
        <PaginationItem className="cursor-pointer">
          <PaginationPrevious onClick={handlePrevPage} />
        </PaginationItem>
        {Array.from({ length: totalPages }).map((_, i) => (
          <PaginationItem className="cursor-pointer" key={i}>
            <PaginationLink
              onClick={() => handleSetCurPage(i + 1)}
              isActive={i + 1 === curPage ? true : false}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem className="cursor-pointer">
          <PaginationNext onClick={handleNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationCustom;
