import mongoose from "mongoose";
declare const _default: mongoose.Model<{
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
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
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
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
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
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
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
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
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
}, unknown, {
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
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
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
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=Product.d.ts.map