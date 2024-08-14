export interface IQuestionResponseData {
    _id: string;
    title: string;
    tags: string[];
    likes: number;
    author: {
        _id: string;
        username: string;
        email: string;
        image: string;
    };
    language: string;
    createdAt: string;
    updatedAt: string;
    answers: IAnswer[];
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
    likes: number;
    dislikes: number;
    createdAt: string;
    updatedAt: string;
}
