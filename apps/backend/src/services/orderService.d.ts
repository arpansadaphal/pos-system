import mongoose from "mongoose";
export declare const createOrderService: (data: any) => Promise<mongoose.Document<unknown, {}, {
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
}>;
//# sourceMappingURL=orderService.d.ts.map