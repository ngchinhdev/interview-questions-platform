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

// export const hideEmailByStars = (email: string) => {
//     const lastPart = email.slice(11);
//     const firstPart = email.slice(0, email.length - 1);


// };