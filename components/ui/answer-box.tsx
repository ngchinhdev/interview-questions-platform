"use client";

import React, { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Tiptap, { ITiptapRef } from "./tiptap";
import { Button } from "./button";
import { ICreateAnswer } from "@interfaces/answer";
import { useSession } from "next-auth/react";
import { useModalQuestion } from "@components/providers/modal-question-provider";
import LoadingSpinner from "./loading-spinner";
import { IAnswer } from "@interfaces/question";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createAnswer } from "@services/answer";

interface IAnswerBoxProps {
  existedAnswer?: IAnswer;
}

const AnswerBox = ({ existedAnswer }: IAnswerBoxProps) => {
  const { data: session } = useSession();
  const { curId, onOpenChange, onChangeCurId } = useModalQuestion();
  const queryClient = useQueryClient();
  const answerRef = useRef<ITiptapRef>(null);

  const { mutate: addAnswer, isPending } = useMutation({
    mutationFn: createAnswer,
    onSuccess(data, variables, context) {
      console.log(data.data.question);
      queryClient.invalidateQueries({
        queryKey: ["question", data.data.question],
      });
    },
    onError(error, variables, context) {
      console.log(error);
    },
  });

  const handleAddAnswer = () => {
    const userID = session?.user.id;
    const content = answerRef.current?.editorValue;

    if (!userID || !curId || !content) {
      console.log("You can not do it");
      return;
    }

    addAnswer({ authorID: userID, questionID: curId, content });
  };

  if (isPending) {
    return <LoadingSpinner className="mx-auto" size={50} />;
  }

  return (
    <div className="flex gap-3">
      <Avatar className="mt-1 h-8 w-8">
        <AvatarImage src={session?.user.image} />
        <AvatarFallback>{session?.user.username.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="mt-2 max-w-[660px] flex-1">
        <Tiptap ref={answerRef} defaultValue={existedAnswer?.content} />
        <Button onClick={handleAddAnswer}>Hello</Button>
      </div>
    </div>
  );
};

export default AnswerBox;
