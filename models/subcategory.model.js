const mongoose = require("mongoose");

const SubCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("subcategory", SubCategorySchema);
