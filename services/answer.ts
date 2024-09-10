import { IChangeLikeAnswer, ICreateAnswer, IUpdateAnswer } from "@interfaces/answer";

export const likeAnswerApi = async (likeData: IChangeLikeAnswer) => {
    try {
        const res = await fetch(
            "http://localhost:3000/api/answers/like/" + likeData.answerID,
            {
                method: likeData.method,
                body: JSON.stringify({
                    authorID: likeData.authorID,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const dislikeQuestionApi = async (likeData: IChangeLikeAnswer) => {
    try {
        const res = await fetch(
            "http://localhost:3000/api/answers/dislike/" + likeData.answerID,
            {
                method: likeData.method,
                body: JSON.stringify({
                    authorID: likeData.authorID,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const createAnswer = async (newAnswer: ICreateAnswer) => {
    try {
        const res = await fetch("http://localhost:3000/api/answers/create", {
            method: "POST",
            body: JSON.stringify(newAnswer),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const updateAnswer = async (updateAnswer: IUpdateAnswer) => {
    try {
        const res = await fetch("http://localhost:3000/api/answers/update/" + updateAnswer._id, {
            method: "PUT",
            body: JSON.stringify(updateAnswer),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteAnswer = async (answerID: string) => {
    try {
        const res = await fetch("http://localhost:3000/api/answers/delete/" + answerID, {
            method: "DELETE",
        });

        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};