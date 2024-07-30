import { connectToDB } from "@libs/database";
import Language from "@models/language";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectToDB();
        const languages = await Language.find({ isDeleted: false });

        if (!languages.length) {
            return NextResponse.json({
                message: "No languages found.",
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "Languages retrieved successfully.",
            data: languages
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "Unknown error."
        }, { status: 500 });
    }
};