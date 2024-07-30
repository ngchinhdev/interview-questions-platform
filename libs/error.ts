import { NextResponse } from "next/server";

interface ErrorMessage {
    message: string;
}

function isErrorMessage(error: any): error is ErrorMessage {
    return typeof error?.message === "string";
}

export const errorHandler = async (error: any) => {
    if (isErrorMessage(error)) {
        return NextResponse.json({
            message: error.message
        },
            { status: 404 }
        );
    } else {
        console.error(error);
        return NextResponse.json({
            message: 'Internal server error.'
        },
            { status: 500 }
        );
    }
};