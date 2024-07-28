import React from "react";

import QuestionCard from "@components/ui/question-card";

const QuestionList = () => {
  return (
    <div className="grid mt-9 grid-cols-3 gap-8">
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
    </div>
  );
};

export default QuestionList;
