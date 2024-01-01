 import mongoose from "mongoose";

 const patientRecords = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
        },

        dignonseWith : {
            type : String,
            required : true,
        },

        address : {
            type : String,
            required : true,
        },

        age : {
            type : Number,
            required : true,
        },

        bloodGroup : {
            type : Number,
            required : true,
        },

        gender : {
            type : Number,
            enum : ["Male", "Femal", "Other"],
            required : true,
        },

        addmitedIn : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Hospotial",
        },
    }
    , {timestamps : true})

 export const Patient = mongoose.model("Patient", patientRecords);