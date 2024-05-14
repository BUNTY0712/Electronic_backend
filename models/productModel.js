const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productId: {
        type: Number,
        unique: true,
        index: true,
    },

    image: {
        type: String
    },

    price: {
        type: Number
    },

    productName: {
        type: String
    },

    productDescription: {
        type: String
    },
    Brand: {
        type: String
    },

    offerPrice: {
        type: Number
    },

    productVariation:{
        type: String
    }
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

productSchema.pre('save', async function(next){
    try {
        if(!this.isNew){
            return next();
        }
        const latestProduct = await this.constructor.findOne().sort({productId: -1});
        if(latestProduct){
            this.productId = latestProduct.productId + 1;
        }else{
            this.productId = 1;
        }
        next();
    } catch (error) {
        console.error(error); // Log the error
        next(error);
    }
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
