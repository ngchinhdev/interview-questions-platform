import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import QuestionCard from "@/components/ui/question-card";
import { Button } from "@/components/ui/button";

interface ModalPreviewProps {
  openText: ReactNode;
}

const ModalPreview = ({ openText }: ModalPreviewProps) => {
  return (
    <Dialog>
      <DialogTrigger>{openText}</DialogTrigger>
      <DialogContent className="sm:max-w-[35%] max-h-[90%]">
        <h1 className="text-center font-medium scroll-m-20 text-3xl tracking-tight lg:text-2xl">
          Your Question Will Be Seen Like This
        </h1>
        <div className="pointer-events-none">
          <QuestionCard />
        </div>
        <div className="flex items-center justify-end">
          <Button variant="outline" className="me-3">
            Cancel
          </Button>
          <Button variant="default">Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalPreview;
