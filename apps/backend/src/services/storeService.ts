import Store from "../models/Store"

export const createStoreService = async (data: any) => {
    return await Store.create(data);
};