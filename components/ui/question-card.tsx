import React from "react";
import { FaRegHeart } from "react-icons/fa";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ModalQuestionProps from "./modal-question";

interface IQuestionCard {
  question: string;
  answers?: string[];
  likes: number;
  tags: string[];
}

const QuestionCard = ({ question, answers, likes, tags }: IQuestionCard) => {
  return (
    <div className="bg-background/95 border relative rounded-lg px-4 py-3">
      <div className="flex gap-3 items-center">
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h6 className="-mb-2 text-sm">nguyenchinh</h6>
          <small className="text-xs">nguy*****hinh@gmail.com</small>
        </div>
      </div>
      <h3 className="flex items-start mt-1 gap-2 leading-tight">
        <span>❓</span>
        <strong className="line-clamp-2">{question}</strong>
      </h3>
      <p className="mt-2 gap-2 text-[15px] flex items-start leading-tight">
        <span>📋</span>
        <span className="line-clamp-4">{answers && answers[0]}</span>
      </p>
      <span className="text-xs block mt-2">
        {answers && answers.length > 1 ? (
          <>
            👉{" "}
            <span className="cursor-pointer">
              &nbsp;{" "}
              <ModalQuestionProps
                openText={
                  <span className="underline">
                    và {answers.length - 1} câu trả lời khác
                  </span>
                }
              />
            </span>
          </>
        ) : (
          <></>
        )}
      </span>
      <div className="flex items-end justify-between text-[15px]">
        <div className="flex mt-1 items-center gap-2">
          {tags.map((tag) => (
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
          <span className="leading-none">{likes}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
