import React from "react";
import { FaRegHeart } from "react-icons/fa";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ModalQuestion from "./modal-question";
import { IQuestionResponseData } from "@interfaces/question";

interface IQuestionCardProps {
  questionData: IQuestionResponseData;
}

const QuestionCard = ({ questionData }: IQuestionCardProps) => {
  return (
    <div className="bg-background/95 border relative rounded-lg px-4 py-3">
      <div className="flex gap-3 items-center">
        <Avatar className="w-8 h-8">
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
      <h3 className="flex items-start mt-1 gap-2 leading-tight">
        <span>❓</span>
        <strong className="line-clamp-2">{questionData.title}</strong>
      </h3>
      <p className="mt-2 gap-2 text-[15px] flex items-start leading-tight">
        <span>📋</span>
        <span className="line-clamp-4">
          {questionData.answers && questionData.answers[0].content}
        </span>
      </p>
      <span className="text-xs block mt-2">
        👉{" "}
        <span className="cursor-pointer">
          &nbsp;{" "}
          <span className="underline">
            {questionData.answers && questionData.answers.length > 1
              ? `và ${questionData.answers.length - 1} câu trả lời khác`
              : "Xem chi tiết"}
          </span>
        </span>
      </span>
      <div className="flex items-end justify-between text-[15px]">
        <div className="flex mt-1 items-center gap-2">
          {questionData.tags.map((tag) => (
            <span key={tag} className="cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex items-end gap-1">
          <span className="cursor-pointer leading-none">
            {2 > 0 ? (
              <FaRegHeart className="inline-block text-red-500" />
            ) : (
              "💖"
            )}{" "}
          </span>
          <span className="leading-none">{questionData.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
