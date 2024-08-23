import { useFormatter } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IAnswer, IQuestionResponseData } from "@interfaces/question";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { useSession } from "next-auth/react";
import { IChangeLikeAnswer } from "@interfaces/answer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useModalQuestion } from "@components/providers/modal-question-provider";

interface IAnswerProps {
  answer: IAnswer;
}

const likeAnswerApi = async (likeData: IChangeLikeAnswer) => {
  try {
    const res = await fetch(
      "http://localhost:3000/api/answers/like/" + likeData.answerID,
      {
        method: likeData.method,
        body: JSON.stringify({
          authorID: likeData.authorID,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const dislikeQuestionApi = async (likeData: IChangeLikeAnswer) => {
  try {
    const res = await fetch(
      "http://localhost:3000/api/answers/dislike/" + likeData.answerID,
      {
        method: likeData.method,
        body: JSON.stringify({
          authorID: likeData.authorID,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const Answer = ({ answer }: IAnswerProps) => {
  const format = useFormatter();
  const { data: session } = useSession();
  const { curId } = useModalQuestion();
  const queryClient = useQueryClient();

  const isAuthLiked =
    session?.user.id &&
    answer.likes?.length &&
    answer.likes.includes(session.user.id);

  const isAuthDisliked =
    session?.user.id &&
    answer.dislikes?.length &&
    answer.dislikes.includes(session.user.id);

  const { mutate: likeAnswer } = useMutation({
    mutationFn: likeAnswerApi,
    onSuccess(data, variables, context) {
      console.log({ ...data.data });
      queryClient.invalidateQueries({
        queryKey: ["question", curId],
      });
    },
    onError(error, variables, context) {
      console.log(error);
    },
  });

  const { mutate: dislikeAnswer } = useMutation({
    mutationFn: dislikeQuestionApi,
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({
        queryKey: ["question", curId],
      });
      console.log(data);
    },
    onError(error, variables, context) {
      console.log(error);
    },
  });

  const handleToggleLike = () => {
    if (!session?.user) {
      console.log("Chua dang nhap");
      return;
    }

    if (isAuthLiked) {
      likeAnswer({
        authorID: session.user.id,
        answerID: answer._id,
        method: "DELETE",
      });
    } else {
      likeAnswer({
        authorID: session.user.id,
        answerID: answer._id,
        method: "PATCH",
      });
    }
  };

  const handleToggleDislike = () => {
    if (!session?.user) {
      console.log("Chua dang nhap");
      return;
    }

    if (isAuthDisliked) {
      dislikeAnswer({
        authorID: session.user.id,
        answerID: answer._id,
        method: "DELETE",
      });
    } else {
      dislikeAnswer({
        authorID: session.user.id,
        answerID: answer._id,
        method: "PATCH",
      });
    }
  };

  return (
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-3">
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
              onClick={handleToggleLike}
              className={`me-2 rounded-md border border-white px-2 py-1 text-xs transition-all ${
                isAuthLiked
                  ? "font-medium dark:bg-white dark:text-black dark:hover:bg-none"
                  : "dark:hover:bg-red-800"
              }`}
            >
              <span className="me-1">👍</span>
              <span>{answer.likes.length}</span>
            </button>
            <button
              onClick={handleToggleDislike}
              className={`rounded-md border border-white px-2 py-1 text-xs transition-all hover:bg-gray-800 ${
                isAuthDisliked
                  ? "font-medium dark:bg-white dark:text-black dark:hover:bg-none"
                  : "dark:hover:bg-red-800"
              }`}
            >
              <span className="me-1">👎</span>
              <span>{answer.dislikes.length}</span>
            </button>
          </div>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="mr-0 outline-none">
          <EllipsisVertical className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {session?.user.id === answer.author._id ? (
            <>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem>Report</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Answer;
