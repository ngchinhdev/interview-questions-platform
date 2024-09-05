import { isValidObjectId, Model } from "mongoose";
import { ReadonlyURLSearchParams } from "next/navigation";

export const checkValidExistID = async (id: string, model: Model<any>) => {
    if (!isValidObjectId(id)) {
        throw new Error(`${model.modelName} ID invalid.`);
    }

    const existedData = await model.findOne({ _id: id });
    if (!existedData) {
        throw new Error(`${model.modelName} not found.`);
    }
};

export const updateSearchQuery = (
    page: number,
    limit: number,
    offset: number,
    searchParams: ReadonlyURLSearchParams,
    pathname: string,
) => {
    const currentParams = new URLSearchParams(
        Array.from(searchParams.entries()),
    );

    offset = (page - 1) * limit;

    currentParams.set("offset", offset.toString());
    currentParams.set("limit", limit.toString());

    const search = currentParams.toString();
    const query = search ? `?${search}` : "";

    return `${pathname}${query}`;
};