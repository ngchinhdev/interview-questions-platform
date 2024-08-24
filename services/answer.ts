import { ICreateAnswer, IUpdateAnswer } from "@interfaces/answer";

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