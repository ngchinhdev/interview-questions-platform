import { isValidObjectId, Model } from "mongoose";

export const checkValidExistID = async (id: string, model: Model<any>) => {
    if (!isValidObjectId(id)) {
        throw new Error(`${model.modelName} ID invalid.`);
    }

    const existedData = await model.findOne({ _id: id });
    if (!existedData) {
        throw new Error(`${model.modelName} not found.`);
    }
};