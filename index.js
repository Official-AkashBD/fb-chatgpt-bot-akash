// 📁 Project: Facebook Personal ID ChatGPT Bot (Unofficial)

const login = require("facebook-chat-api");
const axios = require("axios");
const fs = require("fs");

const appState = require("./session.json"); // Keep this file secret!

const OPENAI_API_KEY = require("./config.js").OPENAI_API_KEY;

async function askChatGPT(message) {
  try {
    const res = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant in Bengali." },
          { role: "user", content: message }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    return res.data.choices[0].message.content.trim();
  } catch (err) {
    console.error("OpenAI error:", err.response?.data || err);
    return "দুঃখিত, আমি এখন উত্তর দিতে পারছি না। পরে আবার চেষ্টা করুন।";
  }
}

login({ appState }, (err, api) => {
  if (err) return console.error(err);
  console.log("🤖 Facebook ChatGPT Bot is running...");

  api.listenMqtt(async (err, message) => {
    if (err) return console.error(err);

    if (message.type === "message" && message.body) {
      console.log("📩 Message from:", message.senderID);
      console.log("📨 Text:", message.body);

      const reply = await askChatGPT(message.body);
      api.sendMessage(reply, message.threadID);
    }
  });
});
