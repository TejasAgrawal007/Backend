import mongoose from "mongoose";

const categoriesSchema = mongoose.model(
    {

        name: {
            type: String,
            require: true,
        },

    }, { timestamps: true })


export const Category = mongoose.model("Category", categoriesSchema);