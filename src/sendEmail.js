import axios from "axios";
const DOMAIN =
  "https://api.mailgun.net/v3/sandbox7745d45cc6ca44e2b7c66a2597007bde.mailgun.org/messages";

export default async function sendEmail(message) {
  const md = {
    from: "Excited User <mailgun@sandbox7745d45cc6ca44e2b7c66a2597007bde.mailgun.org>",
    to: "<erfan272758@gmail.com>",
    subject: "Alert Subscribe",
    text: message,
  };

  return await axios.post(DOMAIN, md, {
    auth: { username: "api", password: process.env.EMAIL_API_KEY },
    headers: { "content-type": "application/x-www-form-urlencoded" },
  });
}
