export interface IQuestionResponseData {
    _id: string;
    title: string;
    tags: string[];
    likes: string[];
    author: {
        _id: string;
        username: string;
        email: string;
        image: string;
    };
    createdAt: string;
    updatedAt: string;
    answers?: IAnswer[];
}

export interface IAnswer {
    _id: string;
    content: string;
    author: {
        _id: string;
        username: string;
        email: string;
        image: string;
    };
    likes: string[];
    dislikes: string[];
    createdAt: string;
    updatedAt: string;
}

export interface IChangeLikeQuestion {
    authorID: string,
    questionID: string;
    method: "PATCH" | "DELETE";
}
