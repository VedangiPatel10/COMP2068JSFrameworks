// This is the PRIVATE collection: only the logged-in owner can view/edit/delete their own orders. 
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },

  // Customization fields - this is the "order customization" feature
  size: { type: String, enum: ["Small", "Medium", "Large"], default: "Medium" },
  milk: {
    type: String,
    enum: ["Whole", "Skim", "Oat", "Almond", "None"],
    default: "Whole",
  },
  extraShots: { type: Number, default: 0, min: 0, max: 4 },

  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending", "Preparing", "Ready", "Completed", "Cancelled"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);