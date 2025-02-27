"use client";

import React, { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Tiptap, { ITiptapRef } from "../tiptap";
import { Button } from "../button";
import { useSession } from "next-auth/react";
import LoadingSpinner from "./loading-spinner";
import { IAnswer } from "@interfaces/question";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createAnswer, updateAnswer } from "@services/answer";
import { useModalQuestion } from "@hooks/useModalQuestion";
import { useRouter } from "@navigation/navigation";

interface IAnswerBoxProps {
  existedAnswer?: IAnswer;
  onSetIdOpenBoxAnswer: (id: string) => void;
}

const AnswerBox = ({
  existedAnswer,
  onSetIdOpenBoxAnswer,
}: IAnswerBoxProps) => {
  const { data: session } = useSession();
  const { curId, onOpenChange, onChangeCurId } = useModalQuestion();
  const queryClient = useQueryClient();
  const answerRef = useRef<ITiptapRef>(null);
  const router = useRouter();

  const { mutate: addAnswer, isPending: isPendingAdd } = useMutation({
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
    onSettled(data, error, variables, context) {
      onSetIdOpenBoxAnswer("");
      router.refresh();
    },
  });

  const { mutate: editAnswer, isPending: isPendingEdit } = useMutation({
    mutationFn: updateAnswer,
    onSuccess(data, variables, context) {
      console.log(data.data.question);
      queryClient.invalidateQueries({
        queryKey: ["question", data.data.question],
      });
      onSetIdOpenBoxAnswer("");
    },
    onError(error, variables, context) {
      console.log(error);
    },
    onSettled(data, error, variables, context) {
      onSetIdOpenBoxAnswer("");
      router.refresh();
    },
  });

  const handleAddEditAnswer = () => {
    const userID = session?.user.id;
    const content = answerRef.current?.editorValue;

    if (!userID || !curId || !content) {
      console.log("You can not do it");
      return;
    }

    existedAnswer
      ? editAnswer({
          authorID: userID,
          questionID: curId,
          content,
          _id: existedAnswer._id,
        })
      : addAnswer({ authorID: userID, questionID: curId, content });
  };

  if (isPendingAdd || isPendingEdit) {
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
        <div className="float-end mt-3">
          <Button variant={"outline"} onClick={() => onSetIdOpenBoxAnswer("")}>
            Hủy bỏ
          </Button>
          <Button onClick={handleAddEditAnswer} className="ml-3">
            {existedAnswer ? "Cập nhật" : "Trả lời"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnswerBox;
