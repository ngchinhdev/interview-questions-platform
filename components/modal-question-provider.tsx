"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

const ModalQuestionContext = createContext<{
  curId: string;
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onChangeCurId: Dispatch<SetStateAction<string>>;
}>({
  curId: "",
  isOpen: false,
  onOpenChange: () => false,
  onChangeCurId: () => "",
});

const ModalQuestionProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [curId, setCurId] = useState("");

  return (
    <ModalQuestionContext.Provider
      value={{
        isOpen,
        curId,
        onOpenChange: setIsOpen,
        onChangeCurId: setCurId,
      }}
    >
      {children}
    </ModalQuestionContext.Provider>
  );
};

export const useModalQuestion = () => {
  return useContext(ModalQuestionContext);
};

export default ModalQuestionProvider;
