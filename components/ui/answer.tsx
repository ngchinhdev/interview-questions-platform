import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IAnswer } from "@interfaces/question";

interface IAnswerProps {
  answer: IAnswer;
}

const Answer = ({ answer }: IAnswerProps) => {
  return (
    <div className="flex gap-3 items-start mb-4">
      <Avatar className="w-8 h-8 mt-1">
        <AvatarImage src={answer.author.image} />
        <AvatarFallback>{answer.author.username.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div>
        <h6 className="text-base flex items-center gap-5 leading-none mb-1">
          <span>{answer.author.username}</span>
          <span className="text-sm">&#x2022; 1 day ago</span>
        </h6>
        <p className="text-lg leading-tight">{answer.content}</p>
        <div className="mt-2">
          <button
            className={`border rounded-md transition-all me-2 border-white py-1 px-2 text-xs ${
              2 > 0
                ? "dark:bg-white dark:text-black dark:hover:bg-none font-medium"
                : "dark:hover:bg-red-800"
            }`}
          >
            <span className="me-1">👍</span>
            <span>{answer.likes}</span>
          </button>
          <button className="border rounded-md hover:bg-gray-800 transition-all border-white py-1 px-2 text-xs">
            <span className="me-1">👎</span>
            <span>{answer.dislikes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Answer;
