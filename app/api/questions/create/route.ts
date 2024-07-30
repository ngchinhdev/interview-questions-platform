import { connectToDB } from "@libs/database";
import Question from "@models/question";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const { title, authorID: author, languageID: language, tags } = await req.json();

    if (!title || !author || !language || !Array.isArray(tags) || tags.length === 0) {
        return NextResponse.json({
            message: "Missing required fields."
        }, { status: 400 });
    }

    try {
        await connectToDB();

        const newQuestion = await Question.create({
            title,
            author,
            language,
            tags
        });

        return NextResponse.json({
            message: 'Question created successfully.',
            data: newQuestion
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({
            message: "Invalid request body."
        }, { status: 400 });
    }
};