import { Dispatch, SetStateAction } from "react";

export interface IModalQuestionContext {
    curId: string;
    isOpen: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
    onChangeCurId: Dispatch<SetStateAction<string>>;
}

export interface ISearchContext {
    searchValue: string;
    onSetSearchValue: Dispatch<SetStateAction<string>>;
}