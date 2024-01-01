import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {

        decription : {
            type : String,
            require : true,
            
        },

        name : {
            type : String,
            require : true,
        },

        productImages : {
            type : String,
        },

        price : {
            type : Number,
            default : 0,
        },

        stock : {
            type : Number,
            default : 0,
        },

        category : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Category",
            require : true,
        },

        owner : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            
        },


    }, {timestamps : true})

export const Product = mongoose.model("Product", productSchema)