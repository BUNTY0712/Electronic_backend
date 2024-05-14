const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    id:{
        type: Number,
        unique: true,
        index: true
    },
  
    userName: {
        type: String,
    },

    email: {
        type: String,
    },

    password: {
        type: String,
    },

 
},
{timestamps: {createdAt: "created_at", updatedAt: "updated_at"}}
);

userSchema.pre('save', async function(next) {
    try {
        if (!this.isNew) {
            return next(); // If not a new document, skip auto-increment logic
        }
        const latestid = await this.constructor.findOne({}, {}, { sort: { id: -1 } }); // Find the document with the highest ratingId
        if (latestid) {
            this.id = latestRating.id + 1; // Increment the ratingId
        } else {
            this.id = 1; 
        }
        next();
    } catch (error) {
        console.error(error); // Log the error
        next(error);
    }
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;