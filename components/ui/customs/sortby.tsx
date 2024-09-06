import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SortBy = () => {
  return (
    <Select>
      <SelectTrigger className="h-[35px] w-[160px] outline-none focus:ring-0">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="likes">Top questions</SelectItem>
        <SelectItem value="newest">Newest first</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortBy;
