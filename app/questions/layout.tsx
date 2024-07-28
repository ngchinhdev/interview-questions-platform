import { Metadata } from "next";
import React, { ReactNode } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@components/ui/button";

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
      <div className="mt-9 w-[600px] mx-auto flex gap-3">
        <Input type="text" placeholder="Search questions by tag or username" />
        <Button variant="outline">Search</Button>
      </div>
      {children}
    </>
  );
};

export default QuestionListLayout;
