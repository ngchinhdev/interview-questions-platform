"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useModalQuestion } from "@components/providers/modal-question-provider";
import { IQuestionResponseData } from "@interfaces/question";
import Answer from "./answer-item";
import LoadingSpinner from "./loading-spinner";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import AnswerBox from "./answer-box";
import { useSession } from "next-auth/react";
import LoginButton from "./login-button";
import { Button } from "./button";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

const getQuestionByID = async (id: string) => {
  try {
    const res = await fetch("http://localhost:3000/api/questions/" + id);
    console.log(id);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return data.data as IQuestionResponseData;
  } catch (error) {
    console.log(error);
  }
};

const ModalQuestionAvailable = () => {
  console.log("re");
  const { isOpen, onOpenChange, curId } = useModalQuestion();
  const { data: session } = useSession();

  const {
    data: question,
    isError,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["question", curId],
    queryFn: () => getQuestionByID(curId),
    enabled: !!curId,
  });

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <VisuallyHidden.Root>
        <DialogTitle>Modal</DialogTitle>
      </VisuallyHidden.Root>
      <DialogDescription></DialogDescription>
      <DialogContent className="max-h-[90%] overflow-y-scroll sm:max-w-[60%]">
        {isLoading ? (
          <LoadingSpinner className="mx-auto" size={50} />
        ) : !question ? (
          <div>Not found</div>
        ) : (
          <div>
            <div className="flex w-full items-center justify-between">
              <div className="flex items-start gap-3">
                <Avatar className="mt-1 h-8 w-8">
                  <AvatarImage src={question.author.image} />
                  <AvatarFallback>
                    {question.author.username.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h6 className="mb-1 flex items-center gap-5 text-base leading-none">
                    <strong>{question.author.username}</strong>
                    <span className="text-sm">&#x2022; 1 day ago</span>
                  </h6>
                  <strong className="text-lg leading-tight">
                    {question.title}
                  </strong>
                </div>
              </div>
              <div className="pr-24">
                <DropdownMenu>
                  <DropdownMenuTrigger className="mr-0 outline-none">
                    <EllipsisVertical className="cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {session?.user.id === question.author._id ? (
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
            </div>
            <div className="mt-3 flex flex-col gap-4 px-11">
              {question.answers && question.answers.length
                ? question.answers?.map((a) => (
                    <Answer answer={a} key={a._id} />
                  ))
                : "Chua ai tra loi"}
              {session?.user ? (
                question.answers?.every(
                  (a) => a.author._id !== session.user.id,
                ) && !isFetching ? (
                  <AnswerBox />
                ) : (
                  ""
                )
              ) : (
                <LoginButton>Đăng nhập để trả lời</LoginButton>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const ModalQuestion = () => {
  const { curId } = useModalQuestion();

  return curId && <ModalQuestionAvailable />;
};

export default ModalQuestion;
