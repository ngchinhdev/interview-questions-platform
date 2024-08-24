import { connectToDB } from "@libs/database";
import { checkValidExistID } from "@libs/helper";
import Question from "@models/question";
import User from "@models/user";
import { NextResponse } from "next/server";

export const PUT = async (req: Request, context: any) => {
    const { questionID } = context.params;
    const { title, authorID: author, tags } = await req.json();

    if (!title || !author || !Array.isArray(tags) || !tags.length || !questionID) {
        return NextResponse.json({
            message: "Missing required fields."
        }, { status: 400 });
    }

    try {
        await connectToDB();
        await checkValidExistID(questionID, Question);
        await checkValidExistID(author, User);

        const updatedQuestion = await Question.findByIdAndUpdate(
            questionID,
            {
                title,
                author,
                tags
            },
            { new: true }
        );

        return NextResponse.json({
            message: 'Question updated successfully.',
            data: updatedQuestion
        }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Invalid request body."
        }, { status: 400 });
    }
};