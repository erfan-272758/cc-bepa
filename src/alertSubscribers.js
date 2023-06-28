import alertModel from "./models/alertSubscription.model.js";
import priceModel from "./models/price.model.js";
import sendEmail from "./sendEmail.js";
export default async function () {
  const alerts = await alertModel.find({});
  const prices = await priceModel.aggregate([
    {
      $match: {
        coin_name: { $in: alerts.map((a) => a.coin_name) },
      },
    },
    {
      $group: {
        _id: "$coin_name",
        docs: { $topN: { n: 2, output: "$$ROOT", sortBy: { createdAt: -1 } } },
      },
    },
    {
      $project: {
        coin_name: "$_id",
        docs: 1,
      },
    },
  ]);

  console.log("after aggregate : ", prices);
  for (const price of prices) {
    const dif =
      Math.abs(
        (price.docs[0].price - price.docs[1].price) / price.docs[1].price
      ) * 100;
    const match_alerts = await alertModel.find({
      coin_name: price.coin_name,
      difference_percentage: { $lte: dif },
    });
    for (const alert of match_alerts) {
      console.log("send email to ", alert.coin_name);
      sendEmail(`Alert for ${alert.coin_name}`)
        .then((res) => {
          console.log("email sended");
        })
        .catch((err) => {
          console.error(
            "email failed",
            err.response?.data?.message,
            err.message
          );
        });
    }
  }
}
