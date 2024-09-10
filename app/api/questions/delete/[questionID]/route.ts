import { connectToDB } from "@libs/database";
import { checkValidExistID } from "@libs/helper";
import Question from "@models/question";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request, context: any) => {
    const { questionID } = context.params;

    try {
        await connectToDB();
        await checkValidExistID(questionID, Question);

        const deletedQuestion = await Question.findByIdAndUpdate(
            questionID,
            {
                isDeleted: true
            },
            { new: true }
        );

        return NextResponse.json({
            message: 'Question deleted successfully.',
            data: deletedQuestion
        }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Invalid request body."
        }, { status: 400 });
    }
};