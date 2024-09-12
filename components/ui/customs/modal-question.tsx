"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Answer from "./answer-item";
import LoadingSpinner from "./loading-spinner";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import AnswerBox from "./answer-box";
import { useSession } from "next-auth/react";
import LoginButton from "./login-button";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { deleteQuestion, getQuestionByID } from "@services/question";
import { Link, useRouter } from "@navigation/navigation";
import { useEffect, useState } from "react";
import { useModalQuestion } from "@hooks/useModalQuestion";
import { useFormatter } from "next-intl";

const ModalQuestionAvailable = () => {
  const [idOpenBoxAnswer, setIdOpenBoxAnswer] = useState("");
  const { isOpen, onOpenChange, curId } = useModalQuestion();
  const { data: session } = useSession();
  const router = useRouter();
  const format = useFormatter();

  useEffect(() => {
    if (!isOpen) {
      setIdOpenBoxAnswer("");
    }
  }, [isOpen]);

  useEffect(() => {
    setIdOpenBoxAnswer("");
  }, [curId]);

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

  const {
    mutate: mutateDeleteQuestion,
    data: deletedQuestion,
    isPending: pendingDeleteQuestion,
    isError: errorDeleteQuestion,
  } = useMutation({
    mutationFn: deleteQuestion,
    onSuccess(data, variables, context) {
      console.log(data);
      onOpenChange(false);
      router.refresh();
    },
    onError(error, variables, context) {
      console.log(error);
    },
  });

  const handleDeleteQuestion = (questionID: string) => {
    const confirm = window.confirm("Bạn chắc chắn muốn xóa?");

    if (!confirm) return;

    mutateDeleteQuestion(questionID);
  };

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
          <div>Không tìm thấy</div>
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
                    <span className="text-sm">
                      &#x2022; &nbsp;{" "}
                      {format.relativeTime(new Date(question.createdAt))}
                    </span>
                  </h6>
                  <strong className="text-lg leading-tight">
                    {question.title}
                  </strong>
                  {session?.user &&
                    question.answers?.every(
                      (a) => a.author._id !== session.user.id,
                    ) &&
                    !idOpenBoxAnswer && (
                      <p
                        className="mt-1 flex items-center"
                        onClick={() => setIdOpenBoxAnswer("tempID")}
                      >
                        ✍️{" "}
                        <span className="cursor-pointer underline">
                          Trả lời ngay
                        </span>
                      </p>
                    )}
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
                        <Link href={`/form/edit/${question._id}`}>
                          <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteQuestion(question._id)}
                        >
                          Xóa
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <DropdownMenuItem className="cursor-pointer">
                        {session?.user.id ? (
                          <span>Báo cáo</span>
                        ) : (
                          <LoginButton className="flex h-fit w-full justify-start !border-none bg-transparent !px-0 !py-0 hover:bg-transparent">
                            Báo cáo
                          </LoginButton>
                        )}
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="mt-3 flex flex-col gap-4 px-11">
              {question.answers && question.answers.length
                ? question.answers?.map((a) => (
                    <Answer
                      onSetIdOpenBoxAnswer={setIdOpenBoxAnswer}
                      idOpenBoxAnswer={idOpenBoxAnswer}
                      answer={a}
                      key={a._id}
                    />
                  ))
                : "Chưa có câu trả lời"}
              {idOpenBoxAnswer &&
                !question.answers?.find(
                  (a) => a.author._id === session?.user.id,
                ) && <AnswerBox onSetIdOpenBoxAnswer={setIdOpenBoxAnswer} />}
              {!session?.user && (
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
