import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
  coin_name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

priceSchema.index({ coin_name: 1, createdAt: 1 }, { name: "coin-name" });

const priceModel = mongoose.model("price", priceSchema, "prices");
export default priceModel;
