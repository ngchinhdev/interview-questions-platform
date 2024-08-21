import { useFormatter } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IAnswer } from "@interfaces/question";

interface IAnswerProps {
  answer: IAnswer;
}

const Answer = ({ answer }: IAnswerProps) => {
  const format = useFormatter();

  return (
    <div className="mb-4 flex items-start gap-3">
      <Avatar className="mt-1 h-8 w-8">
        <AvatarImage src={answer.author.image} />
        <AvatarFallback>{answer.author.username.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div>
        <h6 className="mb-1 flex items-center gap-5 text-base leading-none">
          <span>{answer.author.username}</span>
          <span className="text-sm">
            &#x2022; {format.relativeTime(new Date(answer.createdAt))}
          </span>
        </h6>
        <p
          className="text-lg leading-tight"
          dangerouslySetInnerHTML={{
            __html:
              answer && answer?.content
                ? answer.content
                : "<p>Chưa có câu trả lời</p>",
          }}
        />
        <div className="mt-2">
          <button
            className={`me-2 rounded-md border border-white px-2 py-1 text-xs transition-all ${
              2 > 0
                ? "font-medium dark:bg-white dark:text-black dark:hover:bg-none"
                : "dark:hover:bg-red-800"
            }`}
          >
            <span className="me-1">👍</span>
            <span>{answer.likes}</span>
          </button>
          <button className="rounded-md border border-white px-2 py-1 text-xs transition-all hover:bg-gray-800">
            <span className="me-1">👎</span>
            <span>{answer.dislikes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Answer;
