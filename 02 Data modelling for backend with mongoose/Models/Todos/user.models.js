import mongoose, { Mongoose } from "mongoose";

const userScheme = new Mongoose.Schema(
    {
        // username: String,
        // email: String,
        // isActive: Boolean,

        username: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
        },

        email: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            require: [true, "Password Must Required"],
        }
    }, { timestamps: true }
)

export const User = mongoose.model("User", userScheme)