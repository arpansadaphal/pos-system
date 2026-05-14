import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    status: string;
    storeId?: mongoose.Types.ObjectId | null;
    totalAmount?: number | null;
    cashierId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    status: string;
    storeId?: mongoose.Types.ObjectId | null;
    totalAmount?: number | null;
    cashierId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    status: string;
    storeId?: mongoose.Types.ObjectId | null;
    totalAmount?: number | null;
    cashierId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    status: string;
    storeId?: mongoose.Types.ObjectId | null;
    totalAmount?: number | null;
    cashierId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    status: string;
    storeId?: mongoose.Types.ObjectId | null;
    totalAmount?: number | null;
    cashierId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    status: string;
    storeId?: mongoose.Types.ObjectId | null;
    totalAmount?: number | null;
    cashierId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    status: string;
    storeId?: mongoose.Types.ObjectId | null;
    totalAmount?: number | null;
    cashierId?: mongoose.Types.ObjectId | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    status: string;
    storeId?: mongoose.Types.ObjectId | null;
    totalAmount?: number | null;
    cashierId?: mongoose.Types.ObjectId | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=Order.d.ts.map