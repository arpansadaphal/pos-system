export declare const createProductService: (data: any) => Promise<mongoose.Document<unknown, {}, {
    name: string;
    variants: mongoose.Types.DocumentArray<{
        size?: string | null;
        color?: string | null;
        sku?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        size?: string | null;
        color?: string | null;
        sku?: string | null;
    }, {}, {}> & {
        size?: string | null;
        color?: string | null;
        sku?: string | null;
    }>;
    price?: number | null;
    category?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    variants: mongoose.Types.DocumentArray<{
        size?: string | null;
        color?: string | null;
        sku?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        size?: string | null;
        color?: string | null;
        sku?: string | null;
    }, {}, {}> & {
        size?: string | null;
        color?: string | null;
        sku?: string | null;
    }>;
    price?: number | null;
    category?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
import mongoose from "mongoose";
export declare const getProductsService: (query: any) => Promise<{}>;
export declare const updateProductService: (id: string, data: any) => Promise<mongoose.Document<unknown, {}, {
    name: string;
    variants: mongoose.Types.DocumentArray<{
        size?: string | null;
        color?: string | null;
        sku?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        size?: string | null;
        color?: string | null;
        sku?: string | null;
    }, {}, {}> & {
        size?: string | null;
        color?: string | null;
        sku?: string | null;
    }>;
    price?: number | null;
    category?: string | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    variants: mongoose.Types.DocumentArray<{
        size?: string | null;
        color?: string | null;
        sku?: string | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        size?: string | null;
        color?: string | null;
        sku?: string | null;
    }, {}, {}> & {
        size?: string | null;
        color?: string | null;
        sku?: string | null;
    }>;
    price?: number | null;
    category?: string | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const deleteProductService: (id: string) => Promise<{
    message: string;
}>;
//# sourceMappingURL=productService.d.ts.map