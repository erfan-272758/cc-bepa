import "./loadEnv.js";
import { connect } from "mongoose";
import updatePrices from "./src/updatePrices.js";
import alertSubscribers from "./src/alertSubscribers.js";

connect(process.env.MONGO_URL).then(() => {
  console.log("DB Connected");
});

async function main() {
  await updatePrices();
  await alertSubscribers();
}

main();
