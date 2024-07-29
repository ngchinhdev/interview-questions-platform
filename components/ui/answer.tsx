import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Answer = () => {
  return (
    <div className="flex gap-3 items-start mb-4">
      <Avatar className="w-8 h-8 mt-1">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <h6 className="text-base flex items-center gap-5 leading-none mb-1">
          <span>nguyenchinh</span>
          <span className="text-sm">&#x2022; 1 day ago</span>
        </h6>
        <p className="text-lg leading-tight">
          State và props khác nhau chỗ nào? State và props khác nhau chỗ nào?
          nào?rops khác nhau chỗ nào? State và props khác nhau chỗ nào? nào?
        </p>
        <div className="mt-2">
          <button
            className={`border rounded-md transition-all me-2 border-white py-1 px-2 text-xs ${
              2 > 0
                ? "dark:bg-white dark:text-black dark:hover:bg-none font-medium"
                : "dark:hover:bg-red-800"
            }`}
          >
            <span className="me-1">👍</span>
            <span>120</span>
          </button>
          <button className="border rounded-md hover:bg-gray-800 transition-all border-white py-1 px-2 text-xs">
            <span className="me-1">👎</span>
            <span>120</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Answer;
