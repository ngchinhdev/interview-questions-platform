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

export const getPaginationQuery = () => {
    const params = new URLSearchParams(window?.location.search);
    const offsetParam = params.get("offset");
    const limitParam = params.get("limit");
    const offset = offsetParam ? +offsetParam : 0;
    const limit = limitParam ? +limitParam : 9;
    console.log(limit, offset);
    const page = offset / limit + 1;

    return { offset, limit, page };
};

export const updateSearchQuery = (
    page: number,
    searchParams: ReadonlyURLSearchParams,
    pathname: string,
    sort?: string,
) => {
    let { limit, offset } = getPaginationQuery();

    const currentParams = new URLSearchParams(
        Array.from(searchParams.entries()),
    );

    offset = (page - 1) * limit;

    currentParams.set("offset", offset.toString());
    currentParams.set("limit", limit.toString());
    if (sort) {
        currentParams.set("sort", sort.toString());
    }

    const search = currentParams.toString();
    const query = search ? `?${search}` : "";

    return `${pathname}${query}`;
};