// buat discord bot menggunakan openai api yang dapat berinteraksi dengan discord server
require("dotenv").config();

// bersiap utk terhubung dengan discord api
const { Client, GatewayIntentBits } = require("discord.js");
// init client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
// bersiap terhubung ke open ai api
const { Configuration, OpenAIApi } = require("openai");
// init konfig api
const configuration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_KEY,
});
// init koneksi
const openai = new OpenAIApi(configuration);
// cek ketika pesan terkirim dari discord
client.on("messageCreate", async function (message) {
  try {
    if (message.author.bot) return;
    // // console.log(message.content);
    // message.reply(`Kamu bilang: ${message.content}`);\
    const gptResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `kodekan adalah AI Chat bot yang dapat di gunakan untuk membantu proses belajar ngoding. \n\
        Kodekan-bot: Halo apa kabar ? \n\
         ${message.author.username}: ${message.content} \n\
          Kodekan-bot:`,
      temperature: 0.9,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ["Kodekan Chat Bot:", "satria efriyadi:"],
    });
    message.reply(`${gptResponse.data.choices[0].text}`);
    return;
  } catch (err) {
    console.error(err);
  }
});
// log bot ke discord
client.login(process.env.DISCORD_TOKEN);
console.log("chat-bot online");
