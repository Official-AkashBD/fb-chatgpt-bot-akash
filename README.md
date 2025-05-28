# Facebook ChatGPT Bot 🤖 by Akash Khan

এই বট Facebook Personal ID দিয়ে ChatGPT-এর মতো স্বয়ংক্রিয় উত্তর পাঠাতে পারে।

## 👤 Author: Akash Khan

## ⚙️ সেটআপ

1. Facebook session.json তৈরি করো `npx facebook-chat-api` দিয়ে
2. `config.js`-এ OpenAI API key বসাও
3. ইনস্টল করো:
```bash
npm install
```
4. চালাও:
```bash
node index.js
```

## ❗ সতর্কতা

- `session.json` কখনো GitHub-এ আপলোড করো না
- Facebook এটা detect করলে আইডি লক করতে পারে, নিজ দায়িত্বে ব্যবহার করো

## 📁 ফাইল তালিকা

- `index.js` – বট কোড
- `config.js` – OpenAI API কী
- `.gitignore` – গোপন ফাইল বাদ দেওয়ার জন্য
- `README.md` – গাইড
- `package.json` – npm dependencies
