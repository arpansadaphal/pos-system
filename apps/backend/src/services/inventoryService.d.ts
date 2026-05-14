import mongoose from "mongoose";
export declare const getInventoryLogsService: () => Promise<(mongoose.Document<unknown, {}, {
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
})[]>;
export declare const getInventorySummaryService: () => Promise<any[]>;
export declare const restockService: (data: any) => Promise<mongoose.Document<unknown, {}, {
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
}>;
export declare const getStockService: (productId: string, storeId: string, session?: any) => Promise<any>;
//# sourceMappingURL=inventoryService.d.ts.map