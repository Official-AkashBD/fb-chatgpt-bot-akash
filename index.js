const login = require("facebook-chat-api");
const fs = require("fs");

// ✅ তোর দেওয়া Base64 appState
const base64AppState = `WwogICAgewogICAgICAgICJrZXkiOiAiZGJsbiIsCiAgICAgICAgInZhbHVlIjogIiU3QiUyMjEwMDAxMTA5OTI4OTY0MCUyMiUzQ...==`; // সংক্ষিপ্ত করছি, পুরাটা বসিয়ে নিস

// 🔓 Base64 ডিকোড করে appState.json বানায়
const appStateData = Buffer.from(base64AppState, "base64").toString("utf8");
fs.writeFileSync("appState.json", appStateData);

// 🔄 commands.json থেকে কমান্ড লোড করে
const commands = JSON.parse(fs.readFileSync("commands.json", "utf8"));

// 🤖 Facebook bot লগইন করে
login({ appState: JSON.parse(appStateData) }, (err, api) => {
  if (err) {
    console.error("❌ লগইন সমস্যা:", err);
    return;
  }

  console.log("✅ Bot চালু হয়েছে! এখন ম্যাসেজ আসলেই রিপ্লাই দেবে।");

  api.listenMqtt((err, message) => {
    if (err) return console.error(err);

    const text = message.body?.toLowerCase();
    if (!text) return;

    const reply = commands[text];
    if (reply) {
      api.sendMessage(reply, message.threadID);
    }
  });
});
