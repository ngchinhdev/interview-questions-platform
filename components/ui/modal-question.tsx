import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Answer from "./answer";

interface ModalQuestionProps {
  openText: ReactNode;
}

const ModalQuestion = ({ openText }: ModalQuestionProps) => {
  return (
    <Dialog>
      <DialogTrigger>{openText}</DialogTrigger>
      <DialogContent className="sm:max-w-[60%] overflow-y-scroll max-h-[90%]">
        <div className="flex gap-3 items-start">
          <Avatar className="w-8 h-8 mt-1">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h6 className="text-base flex items-center gap-5 leading-none mb-1">
              <strong>nguyenchinh</strong>
              <span className="text-sm">&#x2022; 1 day ago</span>
            </h6>
            <strong className="text-lg leading-tight">
              State và props khác nhau chỗ nào? State và props khác nhau chỗ
              nào? nào?rops khác nhau chỗ nào? State và props khác nhau chỗ nào?
              nào?
            </strong>
          </div>
        </div>
        <div className="ps-11">
          <Answer />
          <Answer />
          <Answer />
          <Answer />
          <Answer />
          <Answer />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalQuestion;
