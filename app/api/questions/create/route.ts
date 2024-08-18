import { connectToDB } from "@libs/database";
import { checkValidExistID } from "@libs/helper";
import Question from "@models/question";
import User from "@models/user";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const { title, authorID: author, tags } = await req.json();

    if (!title || !author || !Array.isArray(tags) || !tags.length) {
        return NextResponse.json({
            message: "Missing required fields."
        }, { status: 400 });
    }

    try {
        await connectToDB();
        await checkValidExistID(author, User);

        const newQuestion = await Question.create({
            title,
            author,
            tags
        });

        return NextResponse.json({
            message: 'Question created successfully.',
            data: newQuestion
        }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Invalid request body."
        }, { status: 400 });
    }
};