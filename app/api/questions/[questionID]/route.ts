import { connectToDB } from "@libs/database";
import { errorHandler } from "@libs/error";
import { checkValidExistID } from "@libs/helper";
import Answer from "@models/answer";
import Question from "@models/question";
import { NextResponse } from "next/server";

export const GET = async (req: Request, context: any) => {
    const { questionID } = context.params;

    try {
        await connectToDB();
        await checkValidExistID(questionID, Question);

        const question = await Question
            .findOne({
                isDeleted: false,
                _id: questionID
            })
            .populate({
                path: 'author',
                select: "username email image"
            });

        const answers = await Answer
            .find({ question: questionID, isDeleted: false })
            .populate({
                path: 'author',
                select: "username email image"
            });

        if (!question) {
            return NextResponse.json({
                message: "Question not found.",
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "Question retrieved successfully.",
            data: {
                ...question.toObject(),
                answers
            }
        }, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
};