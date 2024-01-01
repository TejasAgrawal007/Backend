import mongoose from "mongoose";

const hospotialSchema = new mongoose.Schema(
    {

        name: {
            type: String,
            required: true,
        },

        address1: {
            type: String,
            required: true,
        },

        address2: {
            type: String,
        },

        city: {
            type: String,

        },

        pincode: {
            type: String,
        },

        spacilizedIn: {
            type: String,
        },

    }, { timestamps: true })

export const Hospotial = mongoose.model("Hospotial", hospotialSchema);