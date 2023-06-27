import axios from "axios";
import priceModel from "./models/price.model.js";
export default async function () {
  const { data: all_coins } = await axios({
    method: "get",
    baseURL: process.env.COINNEWS_BASE_URL,
    url: "/data",
  });

  const new_price = [];
  for (const coin of all_coins) {
    const { data } = await axios({
      method: "get",
      baseURL: process.env.COINNEWS_BASE_URL,
      url: `/data/${coin}`,
    });
    new_price.push({
      coin_name: coin,
      price: data.value,
      createdAt: data.updated_at,
    });
  }

  await priceModel.create(...new_price);
}
