import { connectToDB } from "@libs/database";
import Question from "@models/question";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectToDB();
        const questions = await Question.find({ isDeleted: false });

        if (!questions.length) {
            return NextResponse.json({
                message: "No questions found.",
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "Questions retrieved successfully.",
            data: questions
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Unknown error."
        }, { status: 500 });
    }
};