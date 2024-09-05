"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import QuestionCard from "./question-card";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { IQuestionResponseData } from "@interfaces/question";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Dispatch } from "react";

interface ModalPreviewProps {
  isOpen: boolean;
  onOpenChange: Dispatch<React.SetStateAction<boolean>>;
  onSubmit: () => void;
  questionData: IQuestionResponseData;
}

const ModalPreview = ({
  isOpen,
  onOpenChange,
  onSubmit,
  questionData,
}: ModalPreviewProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <VisuallyHidden.Root>
        <DialogTitle>Modal Preview</DialogTitle>
      </VisuallyHidden.Root>
      <DialogContent className="max-h-[90%] sm:max-w-[35%]">
        <DialogDescription></DialogDescription>
        <DialogTitle className="scroll-m-20 text-center text-3xl font-medium tracking-tight lg:text-2xl">
          Your Question Will Be Seen Like This
        </DialogTitle>
        <div className="pointer-events-none">
          <QuestionCard questionData={questionData} />
        </div>
        <div className="flex items-center justify-end">
          <DialogClose asChild>
            <Button variant="outline" className="me-3">
              Cancel
            </Button>
          </DialogClose>

          <Button variant="default" onClick={onSubmit}>
            Agree
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalPreview;
