import { connectToDB } from "@libs/database";
import { checkValidExistID } from "@libs/helper";
import Question from "@models/question";
import User from "@models/user";
import { NextResponse } from "next/server";

export const POST = async (req: Request, context: any) => {
    const { authorID } = await req.json();
    const { questionID } = context.params;

    if (!authorID) {
        return NextResponse.json({
            message: "Missing author ID fields."
        }, { status: 400 });
    }

    try {
        await connectToDB();
        await checkValidExistID(authorID, User);
        await checkValidExistID(questionID, Question);

        const updatedLikes = await Question.findByIdAndUpdate(
            authorID,
            { $push: { likes: authorID } },
            { new: true }
        );

        return NextResponse.json({
            message: 'Question likes updated successfully.',
            data: updatedLikes
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Invalid request body."
        }, { status: 400 });
    }
};

export const DELETE = async (req: Request, context: any) => {
    const { authorID } = await req.json();
    const { questionID } = context.params;

    if (!authorID) {
        return NextResponse.json({
            message: "Missing author ID fields."
        }, { status: 400 });
    }

    try {
        await connectToDB();
        await checkValidExistID(authorID, User);
        await checkValidExistID(questionID, Question);

        const deletedLikes = await Question.findByIdAndUpdate(
            authorID,
            { $pull: { likes: authorID } },
            { new: true }
        );

        return NextResponse.json({
            message: 'Question likes deleted successfully.',
            data: deletedLikes
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Invalid request body."
        }, { status: 400 });
    }
};