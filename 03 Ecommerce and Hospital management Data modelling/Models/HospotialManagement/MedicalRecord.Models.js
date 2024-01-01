import mongoose from "mongoose";

const medicalSchema = new mongoose.Schema(
    {

    }, {timestamps : true})

export const Medical = mongoose.model("Medical", medicalSchema);