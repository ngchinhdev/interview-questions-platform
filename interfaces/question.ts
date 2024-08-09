export interface IQuestionResponseData {
    _id: string;
    title: string;
    tags: string[];
    likes: number;
    author: {
        username: string;
        email: string;
        image: string;
    };
    language: string;
    createdAt: string;
    updatedAt: string;
    answers: {
        content: string;
        author: string;
        likes: number;
        dislikes: number;
        createdAt: string;
        updatedAt: string;
    }[];
} 