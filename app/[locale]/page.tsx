import ModalQuestionProvider from "@components/providers/modal-question-provider";
import ModalQuestion from "@components/ui/modal-question";
import QuestionCard from "@components/ui/question-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getQuestions } from "@services/question";
import Search from "@components/ui/search";
import FilterProvider from "@components/providers/filter-provider";
import PaginationCustom from "@components/ui/customs/pagination-custom";

interface IQuestionList {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const QuestionList = async ({ params, searchParams }: IQuestionList) => {
  const questions = await getQuestions(searchParams);

  const isEmpty = !questions || !questions.length;

  return (
    <>
      <ModalQuestionProvider>
        <FilterProvider>
          <h1 className="mx-auto mt-8 w-[80%] scroll-m-20 text-center text-3xl font-extrabold tracking-tight lg:text-4xl">
            Explore & Share
            <br />
            Interview Knowledge and Experience
          </h1>
          <Search />
          <div className="mt-5 flex items-center justify-end">
            <Select>
              <SelectTrigger className="h-[35px] w-[110px] outline-none focus:ring-0">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="questionAsc">Question ascending</SelectItem>
                <SelectItem value="questionDesc">
                  Question descending
                </SelectItem>
                <SelectItem value="dateAsc">Date ascending</SelectItem>
                <SelectItem value="dateDesc">Date descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {isEmpty ? (
            <div>No questions found.</div>
          ) : (
            <>
              <div className="mt-3 grid grid-cols-3 gap-6">
                {questions.map((q) => (
                  <QuestionCard key={q._id} questionData={q} />
                ))}
              </div>
              <PaginationCustom totalRecords={questions.length} />
              <ModalQuestion />
            </>
          )}
        </FilterProvider>
      </ModalQuestionProvider>
    </>
  );
};

export default QuestionList;
