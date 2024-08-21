"use client";

import React, { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import Tiptap, { ITiptapRef } from "./tiptap";
import { Button } from "./button";
import { ICreateAnswer } from "@interfaces/answer";
import { useSession } from "next-auth/react";
import { useModalQuestion } from "@components/providers/modal-question-provider";

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
  } catch (error) {
    console.log(error);
  }
};

const AnswerBox = () => {
  const { data: session } = useSession();
  const { curId } = useModalQuestion();
  const answerRef = useRef<ITiptapRef>(null);
  const { mutate: addAnswer } = useMutation({
    mutationFn: addNewAnswer,
    onSuccess(data, variables, context) {
      console.log(data);
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

  return (
    <div className="mt-2">
      <Tiptap ref={answerRef} />
      <Button onClick={handleAddAnswer}>Hello</Button>
    </div>
  );
};

export default AnswerBox;
