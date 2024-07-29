import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import ModalPreview from "@components/ui/modal-preview";
import { Textarea } from "@components/ui/textarea";
import React from "react";

const CreateQuestion = () => {
  return (
    <div>
      <div className="w-1/2">
        <h1 className="mt-8 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
          Contribute Question
        </h1>
        <p className="mt-2">
          Đóng góp câu hỏi và giải pháp của bạn giúp nhiều người có thêm kiến
          thức và sự chuẩn bị cho buổi phỏng vấn
        </p>
        <div className="mt-5">
          <div className="grid w-full gap-1.5">
            <Label className="text-sm lg:text-lg" htmlFor="question">
              Your question
            </Label>
            <Textarea placeholder="Type your question here" id="question" />
          </div>
          <div className="grid w-full gap-1.5 mt-3">
            <Label className="text-sm lg:text-lg" htmlFor="answer">
              Your answer{" "}
              <span className="font-normal text-sm">(Optional)</span>
            </Label>
            <Textarea
              placeholder="Type your answer here"
              className="h-40"
              id="answer"
            />
          </div>
          <div className="grid w-full items-center gap-1.5 mt-3">
            <Label className="text-sm lg:text-lg" htmlFor="tag">
              Tags{" "}
              <span className="font-normal text-sm">(#reactjs #nextjs)</span>
            </Label>
            <Input type="text" id="tag" placeholder="Some tags here" />
          </div>
          <div className="mt-5 float-end">
            <Button variant="outline" className="me-3">
              Cancel
            </Button>
            <ModalPreview
              openText={<Button variant="default">Create</Button>}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuestion;
