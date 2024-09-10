import { connectToDB } from "@libs/database";
import { errorHandler } from "@libs/error";
import { checkValidExistID } from "@libs/helper";
import Answer from "@models/answer";
import { NextResponse } from "next/server";

export const GET = async (req: Request, context: any) => {
    const { answerID } = context.params;

    try {
        await connectToDB();
        await checkValidExistID(answerID, Answer);

        const answer = await Answer.findOne({
            isDeleted: false,
            _id: answerID
        });

        if (!answer) {
            return NextResponse.json({
                message: "Answer not found.",
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "Answer retrieved successfully.",
            data: answer
        }, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
};