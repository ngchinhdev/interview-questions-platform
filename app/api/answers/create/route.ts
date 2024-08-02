import { connectToDB } from "@libs/database";
import { checkValidExistID } from "@libs/helper";
import Answer from "@models/answer";
import Question from "@models/question";
import User from "@models/user";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const { content, authorID: author, questionID: question } = await req.json();

    console.log(content, author, question);
    if (!content || !author || !question) {
        return NextResponse.json({
            message: "Missing required fields."
        }, { status: 400 });
    }

    try {
        await connectToDB();
        await checkValidExistID(author, User);
        await checkValidExistID(question, Question);

        const newAnswer = await Answer.create({
            content,
            author,
            question,
        });

        return NextResponse.json({
            message: 'Answer created successfully.',
            data: newAnswer
        }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Invalid request body."
        }, { status: 400 });
    }
};