"use client";

import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IQuestionResponseData } from "@interfaces/question";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { likeQuestion as likeQuestionApi } from "@services/question";
import { useModalQuestion } from "@hooks/useModalQuestion";
import { useFilter } from "@hooks/useFilter";
import { usePathname, useRouter } from "@navigation/navigation";
import { useToast } from "@hooks/useToast";
import { cn } from "@libs/utils";

interface IQuestionCardProps {
  questionData: IQuestionResponseData;
}

const QuestionCard = ({ questionData }: IQuestionCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const { onOpenChange, onChangeCurId } = useModalQuestion();
  const { data: session } = useSession();
  const { onSetSearchValue } = useFilter();
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (session?.user && questionData.likes.length) {
      setIsLiked(questionData.likes.includes(session.user.id));
    }

    setLikes(questionData.likes.length);
  }, [questionData.likes, session?.user]);

  const { mutate: likeQuestion } = useMutation({
    mutationFn: likeQuestionApi,
    onSuccess(data, variables, context) {
      isLiked ? setIsLiked(false) : setIsLiked(true);
      setLikes(data.data.likes.length);
      console.log(data);
    },
    onError(error, variables, context) {
      console.log(error);
    },
  });

  const handleOpen = (id: string) => {
    if (!id) return;

    onOpenChange(true);
    onChangeCurId(id);
  };

  const handleToggleLike = () => {
    if (!session?.user) {
      return;
    }

    if (isLiked) {
      likeQuestion({
        authorID: session.user.id,
        questionID: questionData._id,
        method: "DELETE",
      });
    } else {
      likeQuestion({
        authorID: session.user.id,
        questionID: questionData._id,
        method: "PATCH",
      });
    }
  };

  const handleClickTag = (tag: string) => {
    const params = new URLSearchParams();

    params.set("tag", tag);

    router.push(`${pathname}?${params.toString()}`);

    onSetSearchValue(tag);
  };

  return (
    <div className="relative flex flex-col justify-between rounded-lg border bg-background/95 px-4 py-3">
      <div>
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={questionData.author.image} />
            <AvatarFallback>
              {questionData.author.username.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h6 className="-mb-2 text-sm">{questionData.author.username}</h6>
            <small className="text-xs">{questionData.author.email}</small>
          </div>
        </div>
        <h3 className="mt-1 flex items-start gap-2 leading-tight">
          <span>❓</span>
          <strong className="line-clamp-2">{questionData.title}</strong>
        </h3>
        <div className="mt-2 flex items-start gap-2 text-[15px] leading-tight">
          <span>📋</span>
          <div
            className="line-clamp-4"
            dangerouslySetInnerHTML={{
              __html:
                questionData?.answers && questionData.answers[0]?.content
                  ? questionData.answers[0].content
                  : "<p>Câu hỏi này hiện chưa có câu trả lời</p>",
            }}
          />
        </div>
      </div>
      <div>
        <span className="mt-2 block text-xs">
          👉{" "}
          <span className="cursor-pointer">
            &nbsp;{" "}
            <span
              className="underline"
              onClick={() => handleOpen(questionData._id)}
            >
              {questionData.answers && questionData.answers.length > 1
                ? `và ${questionData.answers.length - 1} câu trả lời khác`
                : "Xem chi tiết"}
            </span>
          </span>
        </span>
        <div className="flex items-end justify-between text-[15px]">
          <div className="mt-1 flex items-center gap-2">
            {questionData.tags.map((tag) => (
              <span
                key={tag}
                className="cursor-pointer"
                onClick={() => handleClickTag(tag)}
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex items-end gap-1">
            <span className="cursor-pointer leading-none">
              {isLiked ? (
                <span onClick={handleToggleLike}>💖</span>
              ) : (
                <FaRegHeart
                  className="inline-block text-red-500"
                  onClick={() =>
                    session?.user
                      ? handleToggleLike()
                      : toast({
                          title: "Bạn cần đăng nhập để tym 💖",
                          className: cn(
                            "top-0 right-0 flex fixed w-fit md:top-4 md:right-4",
                          ),
                        })
                  }
                />
              )}{" "}
            </span>
            <span className="leading-none">{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
