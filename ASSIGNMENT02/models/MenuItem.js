// This is the collection shown on the PUBLIC read-only menu page.

const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  category: {
    type: String,
    enum: ["Hot Coffee", "Iced Coffee", "Tea", "Specialty", "Food"],
    default: "Hot Coffee",
  },
  basePrice: { type: Number, required: true, min: 0 },
  imagePath: { type: String, default: "/images/default-drink.png" }, // set by multer upload
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MenuItem", MenuItemSchema);