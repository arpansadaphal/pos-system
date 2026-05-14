import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    role: "CASHIER" | "MANAGER" | "ADMIN";
    isActive: boolean;
    name?: string | null;
    password?: string | null;
    email?: string | null;
    storeId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    role: "CASHIER" | "MANAGER" | "ADMIN";
    isActive: boolean;
    name?: string | null;
    password?: string | null;
    email?: string | null;
    storeId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    role: "CASHIER" | "MANAGER" | "ADMIN";
    isActive: boolean;
    name?: string | null;
    password?: string | null;
    email?: string | null;
    storeId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    role: "CASHIER" | "MANAGER" | "ADMIN";
    isActive: boolean;
    name?: string | null;
    password?: string | null;
    email?: string | null;
    storeId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    role: "CASHIER" | "MANAGER" | "ADMIN";
    isActive: boolean;
    name?: string | null;
    password?: string | null;
    email?: string | null;
    storeId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    role: "CASHIER" | "MANAGER" | "ADMIN";
    isActive: boolean;
    name?: string | null;
    password?: string | null;
    email?: string | null;
    storeId?: mongoose.Types.ObjectId | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    role: "CASHIER" | "MANAGER" | "ADMIN";
    isActive: boolean;
    name?: string | null;
    password?: string | null;
    email?: string | null;
    storeId?: mongoose.Types.ObjectId | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    role: "CASHIER" | "MANAGER" | "ADMIN";
    isActive: boolean;
    name?: string | null;
    password?: string | null;
    email?: string | null;
    storeId?: mongoose.Types.ObjectId | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=User.d.ts.map