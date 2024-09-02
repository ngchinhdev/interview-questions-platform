import { connectToDB } from "@libs/database";
import { errorHandler } from "@libs/error";
import Question from "@models/question";
import { NextResponse } from "next/server";

export const GET = async (req: Request, context: any) => {
    const { tag } = context.params;

    try {
        await connectToDB();

        const questions = await Question.aggregate([
            {
                $match: {
                    isDeleted: false,
                    tags: tag
                }
            },
            {
                $lookup: {
                    from: 'Answer',
                    localField: '_id',
                    foreignField: 'question',
                    as: 'answers'
                }
            },
            {
                $addFields: {
                    answers: {
                        $filter: {
                            input: '$answers',
                            as: 'answer',
                            cond: { $eq: ['$$answer.isDeleted', false] }
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: 'User',
                    localField: 'author',
                    foreignField: '_id',
                    as: 'author'
                }
            },
            {
                $unwind: {
                    path: '$author',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    title: 1,
                    author: {
                        username: '$author.username',
                        email: '$author.email',
                        image: '$author.image'
                    },
                    tags: 1,
                    likes: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    answers: {
                        content: 1,
                        author: 1,
                        likes: 1,
                        dislikes: 1,
                        createdAt: 1,
                        updatedAt: 1
                    }
                }
            }
        ]);

        if (!questions.length) {
            return NextResponse.json({
                message: "No questions found."
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "Question retrieved successfully.",
            data: questions,
        }, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
};