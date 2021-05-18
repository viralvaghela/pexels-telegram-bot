const { Telegraf } = require('telegraf');
const fetch = require("node-fetch");
const fs = require('fs')
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const BASE_URL = "https://api.pexels.com/v1/search?query=";



bot.start(ctx => {
    //    console.log(ctx.message);
    ctx.replyWithMarkdown("Welcome Dear,Here you can search and Download HD Wallpepers 😎 ");
    ctx.replyWithMarkdown("Type here 👇 what do you want to search ? 🔍 ");

});


var getTotalImages = 5;
async function getImages(img, ctx) {
    await fetch(BASE_URL + img + "&per_page=" + getTotalImages, {
        headers: {
            'Authorization': process.env.API_KEY
        }
    })
        .then((res) => res.json())
        .then((res) => {
            for (var index in res.photos) {
                var images = res.photos[index].src.medium;
                ctx.reply(images);
            }
        })
    // .then((err) => console.log(err));
}


bot.on('text', async (ctx) => {


    var query = ctx.message.text;
    var obj = {
        Searched: query,
        Date: Date(),
        UserName: ctx.message.from.username,
        FirstName: ctx.message.from.first_name,
        LastName: ctx.message.from.last_name,
        ChatId: ctx.message.chat.id

    };

    await fs.appendFile('SenderData.txt', "\n" + JSON.stringify(obj), (err) => {
        console.log(err);
    });
    // console.log(.Searched);

    console.log("Searched for : " + query);
    getImages(query, ctx);

});

bot.launch()