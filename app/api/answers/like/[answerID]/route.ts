import { connectToDB } from "@libs/database";
import { checkValidExistID } from "@libs/helper";
import Answer from "@models/answer";
import User from "@models/user";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request, context: any) => {
    const { authorID } = await req.json();
    const answerID = context.params?.answerID;

    if (!authorID || !answerID) {
        return NextResponse.json({
            message: "Missing required fields."
        }, { status: 400 });
    }
    try {
        await connectToDB();
        await checkValidExistID(authorID, User);
        await checkValidExistID(answerID, Answer);

        const updatedLikes = await Answer.findByIdAndUpdate(
            answerID,
            {
                $push: { likes: authorID },
                $pull: { dislikes: authorID },
            },
            { new: true }
        );

        const author = await User.findOne({ _id: updatedLikes.author }).lean();

        return NextResponse.json({
            message: 'Answer likes updated successfully.',
            data: {
                ...updatedLikes.toObject(),
                author
            }
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
    const answerID = context.params?.answerID;

    if (!authorID || !answerID) {
        return NextResponse.json({
            message: "Missing required fields."
        }, { status: 400 });
    }

    try {
        await connectToDB();
        await checkValidExistID(authorID, User);
        await checkValidExistID(answerID, Answer);

        const updatedLikes = await
            Answer.findByIdAndUpdate(
                answerID,
                {
                    $pull: { likes: authorID },
                },
                { new: true }
            );

        const author = await User.findOne({ _id: updatedLikes.author }).lean();

        return NextResponse.json({
            message: 'Answer likes updated successfully.',
            data: {
                ...updatedLikes.toObject(),
                author
            }
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Invalid request body."
        }, { status: 400 });
    }
};