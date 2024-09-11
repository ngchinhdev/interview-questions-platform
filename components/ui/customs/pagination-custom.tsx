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
          <PaginationLink className="w-20 gap-2" onClick={handlePrevPage}>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span>Trước</span>
          </PaginationLink>
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
          <PaginationLink className="w-20 gap-2" onClick={handleNextPage}>
            <span>Sau</span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationCustom;
