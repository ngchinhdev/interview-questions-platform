"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useFilter } from "@hooks/useFilter";

const PER_PAGE_RECORDS = 9;

interface IPaginationCustom {
  totalRecords: number;
}

const PaginationCustom = ({ totalRecords }: IPaginationCustom) => {
  const { curPage, onSetCurPage } = useFilter();

  const totalPages = Math.ceil(totalRecords / PER_PAGE_RECORDS);

  const handleNextPage = () => {
    if (curPage < totalPages) {
      onSetCurPage(curPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (curPage > 1) {
      onSetCurPage(curPage - 1);
    }
  };

  const handleSetCurPage = (page: number) => {
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
