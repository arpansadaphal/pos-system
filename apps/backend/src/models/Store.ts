import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
    {
        name: {type: String, required: true },
        location: String,
        managerId:{
           type: mongoose.Schema.Types.ObjectId,
           ref: "User", 
        },
        
    },
    {timestamps : true},
);

export default mongoose.model("Store", storeSchema);