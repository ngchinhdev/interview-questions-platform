import ModalQuestionProvider from "@components/providers/modal-question-provider";
import ModalQuestion from "@components/ui/customs/modal-question";
import QuestionCard from "@components/ui/customs/question-card";
import { getQuestions } from "@services/question";
import Search from "@components/ui/customs/search";
import FilterProvider from "@components/providers/filter-provider";
import PaginationCustom from "@components/ui/customs/pagination-custom";
import SortBy from "@components/ui/customs/sortby";
import MainTitle from "@components/ui/customs/main-title";

interface IQuestionList {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const QuestionList = async ({ params, searchParams }: IQuestionList) => {
  const data = await getQuestions(searchParams);

  const questions = data?.data;

  const isEmpty = !questions || !questions.length;

  return (
    <>
      <ModalQuestionProvider>
        <FilterProvider>
          <MainTitle />
          <Search />
          <div className="mt-5 flex items-center justify-end">
            <SortBy />
          </div>
          {isEmpty ? (
            <div className="py-10">Không tìm thấy câu hỏi nào.</div>
          ) : (
            <>
              <div className="mt-3 grid grid-cols-3 gap-6">
                {questions.map((q) => (
                  <QuestionCard key={q._id} questionData={q} />
                ))}
              </div>
              <PaginationCustom totalRecords={data.totalRecords} />
              <ModalQuestion />
            </>
          )}
        </FilterProvider>
      </ModalQuestionProvider>
    </>
  );
};

export default QuestionList;
