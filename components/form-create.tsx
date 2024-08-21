"use client";

import React, { KeyboardEvent, useRef, useState } from "react";
import { useSession } from "next-auth/react";

import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Textarea } from "@components/ui/textarea";
import { IQuestionResponseData } from "@interfaces/question";
import ModalPreview from "@components/ui/modal-preview";
import Tiptap, { ITiptapRef } from "./ui/tiptap";

const FormCreate = () => {
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

  async function onSubmit() {
    if (!questionRef.current || !answerRef.current) {
      return;
    }

    if (!session?.user || !questionRef.current.value || !tags.length) {
      alert("Thieu");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/questions/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            authorID: session.user.id,
            title: questionRef.current.value,
            tags,
          }),
        },
      );

      const data = await response.json();

      if (answerRef.current.editorValue) {
        const responseAnswer = await fetch(
          "http://localhost:3000/api/answers/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              authorID: session.user.id,
              questionID: data.data._id,
              content: answerRef.current.editorValue,
            }),
          },
        );

        const newAnswer = await responseAnswer.json();

        console.log(newAnswer);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === " ") {
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

  return (
    <div className="mt-5">
      <div className="grid w-full gap-1.5">
        <Label className="text-sm lg:text-lg" htmlFor="question">
          Your question
        </Label>
        <Textarea
          placeholder="Type your question here"
          id="question"
          name="question"
          ref={questionRef}
        />
      </div>
      <div className="mt-3 grid w-full gap-1.5">
        <Label className="text-sm lg:text-lg" htmlFor="answer">
          Your answer <span className="text-sm font-normal">(Optional)</span>
        </Label>
        {/* <Textarea
          placeholder="Type your answer here"
          className="h-40"
          id="answer"
          name="answer"
          ref={answerRef}
        /> */}
        <Tiptap ref={answerRef} />
      </div>
      <div className="mt-3 grid w-full items-center gap-1.5">
        <Label className="text-sm lg:text-lg" htmlFor="tag">
          Tags <span className="text-sm font-normal">(#reactjs, #nextjs)</span>
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
                <span className="">{tag}</span>
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
          Create
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
