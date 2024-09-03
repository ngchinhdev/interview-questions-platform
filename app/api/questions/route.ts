import { connectToDB } from "@libs/database";
import Question from "@models/question";
import { NextResponse } from "next/server";

export const GET = async (req: Request, context: any) => {
    const url = new URL(req.url);

    let limit = url.searchParams.get('limit');
    let offset = url.searchParams.get('offset');

    if (!limit) {
        limit = '9';
    }

    if (!offset) {
        offset = '0';
    }

    try {
        await connectToDB();
        const totalRecords = await Question.countDocuments();
        const questionsWithAnswers = await Question.aggregate([
            {
                $match: { isDeleted: false }
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
            },
            {
                $skip: +offset
            },
            {
                $limit: +limit
            }
        ]);

        if (!questionsWithAnswers.length) {
            return NextResponse.json({
                message: "No questions found."
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "Questions retrieved successfully.",
            data: questionsWithAnswers,
            totalRecords
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Unknown error."
        }, { status: 500 });
    }
};

// {
//     "title": "What is your name?",
//     "authorID": "",
//     "languageID": "66a8852230a52d40386dfd81",
//     "tags": ["#name", "#reactjs"]
// }