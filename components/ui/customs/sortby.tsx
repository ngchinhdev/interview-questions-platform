"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getPaginationQuery, updateSearchQuery } from "@libs/helper";
import { usePathname, useRouter } from "@navigation/navigation";
import { useSearchParams } from "next/navigation";

const SortBy = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSort = (valueSort: string) => {
    const { page } = getPaginationQuery();

    const newUrl = updateSearchQuery(page, searchParams, pathname, valueSort);

    router.push(newUrl);
  };

  return (
    <Select onValueChange={(value) => handleSort(value)}>
      <SelectTrigger className="h-[35px] w-[130px] outline-none focus:ring-0">
        <SelectValue placeholder="Lọc theo" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="hot">Hot nhất</SelectItem>
        <SelectItem value="newest">Mới nhất</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortBy;
