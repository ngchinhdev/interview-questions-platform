import { Dispatch, SetStateAction } from "react";

export interface IModalQuestionContext {
    curId: string;
    isOpen: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
    onChangeCurId: Dispatch<SetStateAction<string>>;
}

export interface IFilterContext {
    searchValue: string;
    curPage: number,
    onChangePage: Dispatch<SetStateAction<number>>;
    onSetSearchValue: Dispatch<SetStateAction<string>>;
}