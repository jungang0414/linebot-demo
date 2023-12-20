const express = require("express");
const app = express();
//導入OpenAi
const openai = require("openai");

// 設置OpenAI的配置
const configuration = new openai.Configuration({
    openAiApiKey: process.env.openAiApiKey, // 確保您已將API密鑰保存在環境變量中
});

const openaiClient = new openai.OpenAI(configuration);


//引用linebot SDK
var linebot = require("linebot");

var bot = linebot({
    channelId: process.env.channelId,
    channelSecret: process.env.channelSecret,
    channelAccessToken: process.env.channelAccessToken,
});

const linebotParser = bot.parser();

//傳送訊息給bot
bot.on("message", async function (event) {
    //event.message.text使用者傳送給bot的訊息
    // const introRegex = /你|誰|介紹|you|yourself|hello|你好|hi/gi;
    // const resumeRegex = /resume|說明|cv/gi;
    // const userText = event.message.text;
    // if (introRegex.test(userText)) {
    //     event.reply(
    //         "你好！"
    //     );
    // } else if (resumeRegex.test(userText)) {
    //     event.reply(
    //         "說明文件"
    //     );
    // } else {
    //     event.reply(
    //         "輸入以下關鍵字! \n\n介紹/說明"
    //     );
    // }

    //GPT
    try {
        const response = await openaiClient.createCompletion({
            model: "gpt-3.5-turbo",
            prompt: event.message.text,
            max_tokens: 50,
            temperature: 0.2,
        });

        const gptResponse = response.data.choices[0].text.trim();
        event.reply(gptResponse);
    } catch (error) {
        console.error("錯誤:", error);
        event.reply("無法處理您的請求");
    }
});

//POST
app.post("/", linebotParser);

//啟動express server
app.listen(process.env.PORT || 3000, () => {
    console.log("Express server start");
});


