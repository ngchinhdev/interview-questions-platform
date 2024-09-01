import { useContext } from "react";
import { ModalQuestionContext } from "@components/providers/modal-question-provider";

export const useModalQuestion = () => {
    const context = useContext(ModalQuestionContext);

    if (!context) {
        throw new Error('useModalQuestion must be used within a ModalQuestionProvider');
    }

    return context;
};