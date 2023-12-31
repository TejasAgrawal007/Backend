import mongoose, { Mongoose } from "mongoose";

const todoSchema = new Mongoose.Schema(
    {
        content: {
            type: String,
            require: true,
        },

        complate: {
            type: Boolean,
            default: false,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        subTodos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SubTodo",
            },
        ]

    }, { timestampes: true })

export const Todo = mongoose.model("Todo", todoSchema);