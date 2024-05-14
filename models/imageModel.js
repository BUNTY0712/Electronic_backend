const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    image: {
      type: String // Specify the type for the image field
    }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const imageModel = mongoose.model("Image", imageSchema);

module.exports = imageModel;
