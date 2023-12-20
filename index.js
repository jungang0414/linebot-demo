const express = require("express");
const app = express();

//引用linebot SDK
var linebot = require("linebot");

var bot = linebot({
    channelId: process.env.channelId,
    channelSecret: process.env.channelSecret,
    channelAccessToken: process.env.channelAccessToken,
});

const linebotParser = bot.parser();

//傳送訊息給bot
bot.on("message", function (event) {
    //event.message.text使用者傳送給bot的訊息
    const introRegex = /你|誰|介紹|you|yourself|hello|你好|hi/gi;
    const resumeRegex = /resume|說明|cv/gi;
    const userText = event.message.text;
    if (introRegex.test(userText)) {
        event.reply(
            "你好！"
        );
    } else if (resumeRegex.test(userText)) {
        event.reply(
            "說明文件"
        );
    } else {
        event.reply(
            "輸入以下關鍵字! \n\n介紹/說明"
        );
    }
});

//POST
app.post("/", linebotParser);

//啟動express server
app.listen(process.env.PORT || 3000, () => {
    console.log("Express server start");
});


