import { connectToDB } from "@libs/database";
import Language from "@models/language";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const { name, images } = await req.json();

    if (!name || !Array.isArray(images) || images.length === 0) {
        return NextResponse.json({
            message: "Missing required fields."
        }, { status: 400 });
    }

    try {
        await connectToDB();
        const newLanguage = await Language.create({
            name,
            images
        });

        return NextResponse.json({
            message: "Language created successfully.",
            data: newLanguage
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({
            message: "Unknown error."
        }, { status: 500 });
    }
};