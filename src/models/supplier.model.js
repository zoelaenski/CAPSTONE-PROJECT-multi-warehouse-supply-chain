const mongoose = require("mongoose") ;

const supplierSchema = new mongoose . Schema(
    {
        name: {
            type: String ,
            required: true ,
        } ,
        contactPerson: {
            type: String ,
            required: true,
        } ,
        email: { 
            type: String ,
            required: true ,
            unique: true ,
        } ,
        phone: {
            type: String ,
            required: true,
        } ,
        address: {
            type: String ,
        },
        productsSupplied: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
        ],
        rating: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
     },
     { timestamps: true}
    );

    module.exports = mongoose.model("Supplier", supplierSchema);