import mongoose from "mongoose";

// mini models

const orderItemsSchema = new mongoose.Schema(
    {

        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },

        quantity: {
            type: Number,
            require: true,
        }

    }
)

const orderSchema = mongoose.Schema(
    {

        orderPrice: {
            type: Number,
            require: true,
        },

        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        orderItams: {
            type: [orderItemsSchema],

        },

        address: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ["Pending", "Cancled", "Delivered"],
            default: "Pending",
        }

    }, { timestamps: true })

const Order = mongoose.model("Order", orderSchema)