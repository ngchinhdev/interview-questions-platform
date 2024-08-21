"use client";

import React from "react";
import { FaRegHeart } from "react-icons/fa";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ModalQuestion from "./modal-question";
import { IQuestionResponseData } from "@interfaces/question";
import { useModalQuestion } from "@components/providers/modal-question-provider";
import { useSession } from "next-auth/react";

interface IQuestionCardProps {
  questionData: IQuestionResponseData;
}

const QuestionCard = ({ questionData }: IQuestionCardProps) => {
  const { onOpenChange, onChangeCurId } = useModalQuestion();
  const { data: session } = useSession();

  const handleOpen = (id: string) => {
    if (!id) return;

    onOpenChange(true);
    onChangeCurId(id);
  };

  return (
    <div className="relative rounded-lg border bg-background/95 px-4 py-3">
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
                : "<p>Chưa có câu trả lời</p>",
          }}
        />
      </div>
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
            <span key={tag} className="cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex items-end gap-1">
          <span className="cursor-pointer leading-none">
            {session?.user.id &&
            questionData.likes.length &&
            questionData.likes.includes(session.user.id) ? (
              "💖"
            ) : (
              <FaRegHeart className="inline-block text-red-500" />
            )}{" "}
          </span>
          <span className="leading-none">{questionData.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
