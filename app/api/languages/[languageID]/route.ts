import { connectToDB } from "@libs/database";
import { errorHandler } from "@libs/error";
import { checkValidExistID } from "@libs/helper";
import Language from "@models/language";
import { NextResponse } from "next/server";

export const GET = async (req: Request, context: any) => {
    const { languageID } = context.params;

    try {
        await checkValidExistID(languageID, Language);
        await connectToDB();

        const language = await Language.findOne({
            isDeleted: false,
            _id: languageID
        });

        if (!language) {
            return NextResponse.json({
                message: "Language not found.",
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "Language retrieved successfully.",
            data: language
        }, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
};