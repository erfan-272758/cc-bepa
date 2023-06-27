import mongoose from "mongoose";

const alertSubscriptionSchema = new mongoose.Schema(
  {
    coin_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    difference_percentage: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

alertSubscriptionSchema.index({ coin_name: 1 }, { name: "coin-name" });

const alertSubscriptionModel = mongoose.model(
  "alertSubscription",
  alertSubscriptionSchema,
  "alertSubscriptions"
);
export default alertSubscriptionModel;
