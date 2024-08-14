import ModalQuestion from "@components/ui/modal-question";
import QuestionCard from "@components/ui/question-card";
import { type IQuestionResponseData } from "@interfaces/question";

const getQuestions = async () => {
  try {
    const res = await fetch("http://localhost:9999/api/questions");

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return data.data as IQuestionResponseData[];
  } catch (error) {
    console.log(error);
  }
};

const QuestionList = async () => {
  const questions = await getQuestions();

  console.log(questions);
  if (!questions || !questions.length) {
    return <div>No questions found.</div>;
  }

  return (
    <>
      <div className="grid mt-3 grid-cols-3 gap-6">
        {questions.map((q) => (
          <QuestionCard key={q._id} questionData={q} />
        ))}
      </div>
      <ModalQuestion />
    </>
  );
};

export default QuestionList;
