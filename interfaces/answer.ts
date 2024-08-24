export interface ICreateAnswer {
    authorID: string,
    questionID: string,
    content: string;
}

export interface IUpdateAnswer extends ICreateAnswer {
    _id?: string;
}

export interface IChangeLikeAnswer {
    authorID: string,
    answerID: string;
    method: "PATCH" | "DELETE";
}
