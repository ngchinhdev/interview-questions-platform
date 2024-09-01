"use client";

import { IModalQuestionContext } from "@interfaces/context";
import { createContext, ReactNode, useContext, useState } from "react";

export const ModalQuestionContext = createContext<IModalQuestionContext>({
  curId: "",
  isOpen: false,
  onOpenChange: () => false,
  onChangeCurId: () => {},
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

export default ModalQuestionProvider;
