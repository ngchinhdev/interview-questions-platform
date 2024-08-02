"use client";

import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import QuestionCard from "@/components/ui/question-card";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";

interface ModalPreviewProps {
  openText: ReactNode;
  onSubmit: () => void;
  data: {
    question: string;
    answer?: string[];
    tags: string[];
  };
}

const ModalPreview = ({ openText, onSubmit, data }: ModalPreviewProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{openText}</DialogTrigger>
      <DialogContent className="sm:max-w-[35%] max-h-[90%]">
        <DialogDescription></DialogDescription>
        <DialogTitle className="text-center font-medium scroll-m-20 text-3xl tracking-tight lg:text-2xl">
          Your Question Will Be Seen Like This
        </DialogTitle>
        <div className="pointer-events-none">
          <QuestionCard
            answers={data.answer}
            question={data.question}
            likes={0}
            tags={data.tags}
          />
        </div>
        <div className="flex items-center justify-end">
          <Button variant="outline" className="me-3">
            Cancel
          </Button>
          <Button variant="default" onClick={onSubmit}>
            Agree
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalPreview;
