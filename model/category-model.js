// const mongoose = require("mongoose");

// const categorySchema = new mongoose.Schema(
//   {
//     categoryName: {
//       type: String,
//       required: true,
//     //   trim: true,
//     },
//     categoryImage: {
//       type: String, // we will store the image path or filename
//       required: true,
//     },
//     categoryDescription: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Category", categorySchema);



const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    subCategoryNames: {
      type: [String],
      required: true,
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
