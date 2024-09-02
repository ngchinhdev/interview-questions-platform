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
  const { curPage, onChangePage } = useFilter();

  const totalPages = Math.ceil(totalRecords / PER_PAGE_RECORDS);
  console.log(totalPages);
  return (
    <Pagination className="mt-5">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => onChangePage(curPage > 1 ? curPage - 1 : 1)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive={true}>
            {curPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">{curPage + 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => onChangePage(curPage < 1 ? curPage - 1 : 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationCustom;
