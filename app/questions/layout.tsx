import { Metadata } from "next";
import React, { ReactNode } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const metadata: Metadata = {
  title: "ReactJS | Questions",
  description: "This is layout of Interview Questions Platform",
};

const QuestionListLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <h1 className="mt-8 text-center scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl w-[80%] mx-auto">
        Explore & Share
        <br />
        Interview Knowledge and Experience
      </h1>
      <div className="mt-9 w-[700px] mx-auto flex gap-3">
        <Input
          type="text"
          placeholder="Search questions by tag or username"
          className="h-12 px-6"
        />
        <Button variant="default" className="h-12 w-28">
          Search
        </Button>
      </div>
      <div className="flex items-center mt-5 justify-end">
        <Select>
          <SelectTrigger className="w-[110px] focus:ring-0 outline-none h-[35px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="questionAsc">Question ascending</SelectItem>
            <SelectItem value="questionDesc">Question descending</SelectItem>
            <SelectItem value="dateAsc">Date ascending</SelectItem>
            <SelectItem value="dateDesc">Date descending</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {children}
    </>
  );
};

export default QuestionListLayout;
