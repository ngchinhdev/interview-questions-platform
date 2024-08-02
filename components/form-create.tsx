"use client";

import React, { FormEvent, KeyboardEvent, useRef, useState } from "react";

import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import ModalPreview from "@components/ui/modal-preview";
import { Textarea } from "@components/ui/textarea";
import { IQuestion } from "@models/question";

const FormCreate = () => {
  const [tags, setTags] = useState<string[]>([]);
  const tagRef = useRef<HTMLInputElement>(null);
  const questionRef = useRef<HTMLTextAreaElement>(null);
  const answerRef = useRef<HTMLTextAreaElement>(null);

  async function onSubmit() {
    if (!questionRef.current || !answerRef.current) {
      return;
    }

    if (
      !questionRef.current.value ||
      !answerRef.current.value ||
      !tags.length
    ) {
      alert("Thieu");
      return;
    }

    const response = await fetch("http://localhost:9999/api/questions/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authorID: "66acba134295f03261880db4",
        languageID: "66a8852230a52d40386dfd81",
        title: questionRef.current.value,
        tags,
      }),
    });

    const data = await response.json();

    const responseAnswer = await fetch(
      "http://localhost:9999/api/answers/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authorID: "66acba134295f03261880db4",
          questionID: data.data._id,
          content: answerRef.current.value,
        }),
      }
    );

    const newAnswer = await responseAnswer.json();

    console.log(newAnswer);
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

  const isEmptyValue = () => {
    return (
      !questionRef.current?.value || !answerRef.current?.value || !tags.length
    );
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
      <div className="grid w-full gap-1.5 mt-3">
        <Label className="text-sm lg:text-lg" htmlFor="answer">
          Your answer <span className="font-normal text-sm">(Optional)</span>
        </Label>
        <Textarea
          placeholder="Type your answer here"
          className="h-40"
          id="answer"
          name="answer"
          ref={answerRef}
        />
      </div>
      <div className="grid w-full items-center gap-1.5 mt-3">
        <Label className="text-sm lg:text-lg" htmlFor="tag">
          Tags <span className="font-normal text-sm">(#reactjs, #nextjs)</span>
        </Label>
        <div className="relative">
          <ul className="absolute h-10 top-0 left-0 flex items-center px-3 w-full gap-3">
            {tags.map((tag, index) => (
              <li
                key={index}
                className="flex items-center bg-red-500 px-2 rounded-md pb-[2px]"
              >
                <span
                  onClick={() => handleDeleteTag(index)}
                  className="inline-block me-2 cursor-pointer"
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
                className="w-full border-none outline-none bg-transparent"
              />
            </li>
          </ul>
          <Input type="text" id="tag" className="pointer-events-none" />
        </div>
      </div>
      <div className="mt-5 float-end">
        <Button variant="outline" className="me-3">
          Cancel
        </Button>
        {isEmptyValue() ? (
          <Button variant="default" onClick={onSubmit}>
            Create
          </Button>
        ) : (
          <ModalPreview
            openText={<Button variant="default">Create</Button>}
            onSubmit={onSubmit}
            data={{
              question: questionRef.current?.value || "",
              answer: [answerRef.current?.value || ""],
              tags: tags,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default FormCreate;
