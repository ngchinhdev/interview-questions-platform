import { useFormatter } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IAnswer } from "@interfaces/question";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AnswerBox from "./answer-box";
import {
  deleteAnswer,
  dislikeQuestionApi,
  likeAnswerApi,
} from "@services/answer";
import { useModalQuestion } from "@hooks/useModalQuestion";
import { toast } from "@hooks/useToast";
import { cn } from "@libs/utils";

interface IAnswerProps {
  answer: IAnswer;
  idOpenBoxAnswer: string;
  onSetIdOpenBoxAnswer: (id: string) => void;
}

const Answer = ({
  answer,
  idOpenBoxAnswer,
  onSetIdOpenBoxAnswer,
}: IAnswerProps) => {
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

  const {
    mutate: mutateDeleteAnswer,
    data: deletedQuestion,
    isPending: pendingDeleteAnswer,
    isError: errorDeleteAnswer,
  } = useMutation({
    mutationFn: deleteAnswer,
    onSuccess(data, variables, context) {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["question", curId],
      });
    },
    onError(error, variables, context) {
      console.log(error);
    },
  });

  const handleDeleteAnswer = (answerID: string) => {
    const confirm = window.confirm("Bạn chắc chắn muốn xóa?");

    if (!confirm) return;

    mutateDeleteAnswer(answerID);
  };

  const handleToggleLike = () => {
    if (!session?.user) {
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
    <>
      {idOpenBoxAnswer === answer._id && session?.user.id ? (
        <AnswerBox
          existedAnswer={answer}
          onSetIdOpenBoxAnswer={onSetIdOpenBoxAnswer}
        />
      ) : (
        <div className="flex items-start gap-3">
          <Avatar className="mt-1 h-8 w-8">
            <AvatarImage src={answer.author.image} />
            <AvatarFallback>
              {answer.author.username.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h6 className="mb-1 flex items-center gap-5 text-base leading-none">
              <span>{answer.author.username}</span>
              <span className="text-sm">
                &#x2022; &nbsp;{" "}
                {format.relativeTime(new Date(answer.createdAt))}
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
                onClick={() =>
                  session?.user
                    ? handleToggleLike()
                    : toast({
                        title: "Bạn cần đăng nhập để like 👍",
                        className: cn(
                          "top-0 right-0 flex fixed w-fit md:top-4 md:right-4",
                        ),
                      })
                }
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
                onClick={() =>
                  session?.user
                    ? handleToggleDislike()
                    : toast({
                        title: "Bạn cần đăng nhập để dislike 👎",
                        className: cn(
                          "top-0 right-0 flex fixed w-fit md:top-4 md:right-4",
                        ),
                      })
                }
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
          <div className="flex flex-1 justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <EllipsisVertical className="cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {session?.user.id === answer.author._id ? (
                  <>
                    <DropdownMenuItem
                      onClick={() => onSetIdOpenBoxAnswer(answer._id)}
                    >
                      Chỉnh sửa
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDeleteAnswer(answer._id)}
                    >
                      Xóa
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem>Báo cáo</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </>
  );
};

export default Answer;
