"use client";

import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Textarea } from "@components/ui/textarea";
import { IQuestionResponseData } from "@interfaces/question";
import ModalPreview from "@components/ui/customs/modal-preview";
import Tiptap, { ITiptapRef } from "./ui/tiptap";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createQuestion,
  getQuestionByID,
  updateQuestion,
} from "@services/question";
import { createAnswer, updateAnswer } from "@services/answer";
import NotFound from "@app/not-found";
import { useRouter } from "@navigation/navigation";

interface IFormCreateProps {
  editId: string;
}

const FormCreate = ({ editId }: IFormCreateProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [statePreview, setStatePreview] = useState<{
    isOpen: boolean;
    previewData: IQuestionResponseData | undefined;
  }>({
    isOpen: false,
    previewData: undefined,
  });
  const { data: session } = useSession();
  const tagRef = useRef<HTMLInputElement>(null);
  const questionRef = useRef<HTMLTextAreaElement>(null);
  const answerRef = useRef<ITiptapRef>(null);

  const { data: editQuestion } = useQuery({
    queryKey: ["question", editId],
    queryFn: () => getQuestionByID(editId),
    enabled: !!editId,
  });

  useEffect(() => {
    if (editQuestion) {
      setTags(editQuestion.tags);
    }
  }, [editQuestion]);

  const {
    mutate: mutateAnswer,
    data: newAnswer,
    isPending: pendingAnswer,
    isError: errorAnswer,
  } = useMutation({
    mutationFn: editQuestion?.answers?.find(
      (a) => a.author._id === session?.user.id,
    )
      ? updateAnswer
      : createAnswer,
    onSuccess(data, variables, context) {
      console.log(data);
    },
    onError(error, variables, context) {
      console.log(error);
    },
  });

  const {
    mutate: mutateQuestion,
    data: newQuestion,
    isPending: pendingQuestion,
    isError: errorQuestion,
  } = useMutation({
    mutationFn: editId ? updateQuestion : createQuestion,
    onSuccess(data, variables, context) {
      if (answerRef.current!.editorValue) {
        console.log(2);
        mutateAnswer({
          authorID: session!.user.id,
          questionID: data.data._id,
          content: answerRef.current!.editorValue,
          _id: editQuestion?.answers?.find(
            (a: any) => a.author._id === session?.user.id,
          )?._id,
        });
      }
    },
    onError(error, variables, context) {
      console.log(error);
    },
  });

  useEffect(() => {
    if (newAnswer || newQuestion) {
      window.location.href = "/";
    }
  }, [newAnswer, newQuestion]);

  async function onSubmit() {
    if (!questionRef.current || !answerRef.current) {
      return;
    }

    if (!session?.user || !questionRef.current.value || !tags.length) {
      return;
    }

    try {
      mutateQuestion({
        authorID: session.user.id,
        title: questionRef.current.value,
        tags,
        _id: editId,
      });

      console.log(newQuestion);
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" ||
      e.key === " " ||
      e.key === "," ||
      e.key === "Tab"
    ) {
      e.preventDefault();
      const newTag = tagRef.current?.value.trim();
      if (newTag && !tags.includes(newTag) && tags.length < 3) {
        setTags((prevTags) => [...prevTags, newTag]);
        if (tagRef.current) {
          tagRef.current.value = "";
        }
      }
    }
  };

  const handleDeleteTag = (tagIndex: number) => {
    setTags((prevTags) => prevTags.filter((_, index) => index !== tagIndex));
  };

  const handleResetForm = () => {
    if (!questionRef.current || !answerRef.current) {
      return;
    }

    questionRef.current.value = "";
    answerRef.current.clearEditorValue();
    setTags([]);
  };

  const handleSetPreviewData = () => {
    if (!questionRef.current || !answerRef.current) {
      return;
    }

    if (!session?.user || !questionRef.current.value || !tags.length) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setStatePreview({
      isOpen: true,
      previewData: {
        _id: "",
        author: {
          _id: session!.user.id!,
          email: session!.user.email!,
          username: session!.user.username!,
          image: session!.user.image!,
        },
        title: questionRef.current!.value,
        likes: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags,
        answers: answerRef.current?.editorValue
          ? [
              {
                _id: "",
                author: {
                  _id: session!.user.id!,
                  email: session!.user.email!,
                  username: session!.user.username!,
                  image: session!.user.image!,
                },
                content: answerRef.current.editorValue,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                dislikes: [],
                likes: [],
              },
            ]
          : [],
      },
    });
  };

  const handleOpenChange = () => {
    setStatePreview({
      ...statePreview,
      isOpen: false,
    });
  };

  if (editId && !editQuestion) {
    return <NotFound />;
  }

  return (
    <div className="mt-5 w-full">
      <div className="w-full gap-1.5">
        <Label
          className="mb-1 inline-block text-sm lg:text-lg"
          htmlFor="question"
        >
          Câu hỏi
        </Label>
        <Textarea
          placeholder="Nhập câu hỏi ở đây"
          id="question"
          name="question"
          defaultValue={editQuestion?.title}
          ref={questionRef}
        />
      </div>
      <div className="mt-3 w-full gap-1.5">
        <Label
          className="mb-1 inline-block text-sm lg:text-lg"
          htmlFor="answer"
        >
          Câu trả lời{" "}
          <span className="text-sm font-normal">(Không bắt buộc)</span>
        </Label>
        <div className="w-full">
          <Tiptap
            ref={answerRef}
            defaultValue={
              editQuestion?.answers?.find(
                (a) => a.author._id === session?.user.id,
              )?.content
            }
          />
        </div>
      </div>
      <div className="mt-3 w-full items-center gap-1.5">
        <Label className="mb-1 inline-block text-sm lg:text-lg" htmlFor="tag">
          Nhãn{" "}
          <span className="text-sm font-normal">(reactjs, nextjs, ...)</span>
        </Label>
        <div className="relative">
          <ul className="absolute left-0 top-0 flex h-10 w-full items-center gap-3 px-3">
            {tags.map((tag, index) => (
              <li
                key={index}
                className="flex items-center rounded-md bg-red-500 px-2 pb-[2px]"
              >
                <span
                  onClick={() => handleDeleteTag(index)}
                  className="me-2 inline-block cursor-pointer"
                >
                  x
                </span>
                <span>{tag}</span>
              </li>
            ))}
            <li className="flex-1">
              <input
                onKeyDown={handleAddTag}
                type="text"
                ref={tagRef}
                disabled={tags.length === 3}
                className="w-full border-none bg-transparent outline-none"
              />
            </li>
          </ul>
          <Input type="text" id="tag" className="pointer-events-none" />
        </div>
      </div>
      <div className="float-end mt-5">
        <Button variant="outline" className="me-3" onClick={handleResetForm}>
          Reset
        </Button>
        <Button variant="default" onClick={handleSetPreviewData}>
          {editId ? "Cập nhật" : "Thêm"}
        </Button>
        <ModalPreview
          isOpen={statePreview.isOpen}
          onOpenChange={handleOpenChange}
          onSubmit={onSubmit}
          questionData={statePreview.previewData!}
        />
      </div>
    </div>
  );
};

export default FormCreate;
