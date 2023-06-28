import "./loadEnv.js";
import { connect, disconnect } from "mongoose";
import updatePrices from "./src/updatePrices.js";
import alertSubscribers from "./src/alertSubscribers.js";

connect(process.env.MONGO_URL).then(() => {
  console.log("DB Connected");
});

async function main() {
  await updatePrices();
  await alertSubscribers();
  await disconnect();
  process.exit(0);
}

main();
