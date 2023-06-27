import "./loadEnv.js";
import mongoose from "mongoose";
import updatePrices from "./src/updatePrices.js";
import alertSubscribers from "./src/alertSubscribers.js";

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("DB Connected");
});

async function main() {
  await updatePrices();
  await alertSubscribers();
}

main();
