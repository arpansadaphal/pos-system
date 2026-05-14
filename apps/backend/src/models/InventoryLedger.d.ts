import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    type?: "SALE" | "RESTOCK" | null;
    storeId?: mongoose.Types.ObjectId | null;
    change?: number | null;
    productId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    type?: "SALE" | "RESTOCK" | null;
    storeId?: mongoose.Types.ObjectId | null;
    change?: number | null;
    productId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    type?: "SALE" | "RESTOCK" | null;
    storeId?: mongoose.Types.ObjectId | null;
    change?: number | null;
    productId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    type?: "SALE" | "RESTOCK" | null;
    storeId?: mongoose.Types.ObjectId | null;
    change?: number | null;
    productId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    type?: "SALE" | "RESTOCK" | null;
    storeId?: mongoose.Types.ObjectId | null;
    change?: number | null;
    productId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    type?: "SALE" | "RESTOCK" | null;
    storeId?: mongoose.Types.ObjectId | null;
    change?: number | null;
    productId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    type?: "SALE" | "RESTOCK" | null;
    storeId?: mongoose.Types.ObjectId | null;
    change?: number | null;
    productId?: mongoose.Types.ObjectId | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    type?: "SALE" | "RESTOCK" | null;
    storeId?: mongoose.Types.ObjectId | null;
    change?: number | null;
    productId?: mongoose.Types.ObjectId | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=InventoryLedger.d.ts.map