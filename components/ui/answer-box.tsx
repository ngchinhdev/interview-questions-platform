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

const addNewAnswer = async (answer: ICreateAnswer) => {
  try {
    const res = await fetch("http://localhost:3000/api/answers/create", {
      method: "POST",
      body: JSON.stringify(answer),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

interface IAnswerBoxProps {
  existedAnswer?: IAnswer;
}

const AnswerBox = ({ existedAnswer }: IAnswerBoxProps) => {
  const { data: session } = useSession();
  const { curId, onOpenChange, onChangeCurId } = useModalQuestion();
  const queryClient = useQueryClient();
  const answerRef = useRef<ITiptapRef>(null);

  const { mutate: addAnswer, isPending } = useMutation({
    mutationFn: addNewAnswer,
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
    <div className="mt-2">
      <Tiptap ref={answerRef} defaultValue={existedAnswer?.content} />
      <Button onClick={handleAddAnswer}>Hello</Button>
    </div>
  );
};

export default AnswerBox;
