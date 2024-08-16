import ModalQuestionProvider from "@components/providers/modal-question-provider";
import ModalQuestion from "@components/ui/modal-question";
import QuestionCard from "@components/ui/question-card";
import { type IQuestionResponseData } from "@interfaces/question";
import { Input } from "@/components/ui/input";
import { Button } from "@components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReactNode } from "react";

const getQuestions = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/questions");

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return data.data as IQuestionResponseData[];
  } catch (error) {
    console.log(error);
  }
};

const QuestionList = async ({ children }: { children: ReactNode }) => {
  const questions = await getQuestions();

  console.log(questions);
  if (!questions || !questions.length) {
    return <div>No questions found.</div>;
  }

  return (
    <>
      <ModalQuestionProvider>
        <h1 className="mx-auto mt-8 w-[80%] scroll-m-20 text-center text-3xl font-extrabold tracking-tight lg:text-4xl">
          Explore & Share
          <br />
          Interview Knowledge and Experience
        </h1>
        <div className="mx-auto mt-9 flex w-[700px] gap-3">
          <Input
            type="text"
            placeholder="Search questions by tag or username"
            className="h-12 px-6"
          />
          <Button variant="default" className="h-12 w-28">
            Search
          </Button>
        </div>
        <div className="mt-5 flex items-center justify-end">
          <Select>
            <SelectTrigger className="h-[35px] w-[110px] outline-none focus:ring-0">
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
        <div className="mt-3 grid grid-cols-3 gap-6">
          {questions.map((q) => (
            <QuestionCard key={q._id} questionData={q} />
          ))}
        </div>
        <ModalQuestion />
      </ModalQuestionProvider>
    </>
  );
};

export default QuestionList;
