export declare const createStoreService: (data: any) => Promise<import("mongoose").Document<unknown, {}, {
    name: string;
    location?: string | null;
    managerId?: import("mongoose").Types.ObjectId | null;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    location?: string | null;
    managerId?: import("mongoose").Types.ObjectId | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
//# sourceMappingURL=storeService.d.ts.map