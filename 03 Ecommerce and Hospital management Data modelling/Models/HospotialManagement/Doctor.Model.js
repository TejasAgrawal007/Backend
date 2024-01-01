import mongoose from "mongoose";

// mini Models

const doctorSchame = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        salary: {
            type: String,
            required: true,
        },

        qualification: {
            type: String,
            required: true,
        },

        expericeInYears: {
            type: Number,
            default: 0,
        },

        worksInHospotials: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Hospotials",
            }
        ]
    }
    , { timestamps: true })

export const Doctor = mongoose.model("Doctor", doctorSchame)