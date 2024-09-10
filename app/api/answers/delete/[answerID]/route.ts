import { connectToDB } from "@libs/database";
import { checkValidExistID } from "@libs/helper";
import Answer from "@models/answer";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request, context: any) => {
    const { answerID } = context.params;

    try {
        await connectToDB();
        await checkValidExistID(answerID, Answer);

        const deletedAnswer = await Answer.findByIdAndUpdate(
            answerID,
            {
                isDeleted: true
            },
            { new: true });

        return NextResponse.json({
            message: 'Answer deleted successfully.',
            data: deletedAnswer
        }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Invalid request body."
        }, { status: 400 });
    }
};
