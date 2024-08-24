import { ICreateQuestion, IQuestionResponseData, IUpdateQuestion } from "@interfaces/question";

export const getQuestionByID = async (id: string) => {
    try {
        const res = await fetch("http://localhost:3000/api/questions/" + id);
        console.log(id);
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        return data.data as IQuestionResponseData;
    } catch (error) {
        console.log(error);
    }
};

export const createQuestion = async (newQuestion: ICreateQuestion) => {
    try {
        const response = await fetch(
            "http://localhost:3000/api/questions/create",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newQuestion),
            },
        );

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
};

export const updateQuestion = async (updateQuestion: IUpdateQuestion) => {
    try {
        const response = await fetch(
            "http://localhost:3000/api/questions/update/" + updateQuestion._id,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateQuestion),
            },
        );

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
};