import { connectToDB } from "@libs/database";
import { checkValidExistID } from "@libs/helper";
import Answer from "@models/answer";
import Question from "@models/question";
import User from "@models/user";
import { NextResponse } from "next/server";

export const PUT = async (req: Request, context: any) => {
    const { content, authorID: author, questionID: question } = await req.json();
    const { answerID } = context.params;

    if (!content || !author || !question || !answerID) {
        return NextResponse.json({
            message: "Missing required fields."
        }, { status: 400 });
    }

    try {
        await connectToDB();
        await checkValidExistID(answerID, Answer);
        await checkValidExistID(author, User);
        await checkValidExistID(question, Question);

        const updatedAnswer = await Answer.findByIdAndUpdate(
            answerID,
            {
                content,
                author,
                question,
            },
            { new: true });

        return NextResponse.json({
            message: 'Answer updated successfully.',
            data: updatedAnswer
        }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Invalid request body."
        }, { status: 400 });
    }
};
