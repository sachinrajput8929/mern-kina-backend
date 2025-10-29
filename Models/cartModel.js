const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  item_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  item_title: { type: String, required: true },
  item_type: { type: String },
  item_quan: { type: Number, default: 1 },
  item_status: { type: Number, default: 1 },
  item_user: { type: String, default: null },
  session_id: { type: String, default: null },
  updated_at: { type: Date, default: Date.now },
});
 

module.exports = mongoose.model("cart", cartSchema);
